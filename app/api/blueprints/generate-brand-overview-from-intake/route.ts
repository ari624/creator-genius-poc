import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClaudeMessage } from '@/lib/anthropic';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Load intake data
    const { data: intake, error: intakeError } = await supabaseAdmin
      .from('bp_client_intake')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (intakeError || !intake) {
      return NextResponse.json(
        { error: 'Intake data not found. Please complete the intake form first.' },
        { status: 404 }
      );
    }

    // Check if at least 50% complete
    if (intake.completion_percentage < 50) {
      return NextResponse.json(
        { error: 'Please complete at least 50% of the intake form before generating the brand overview.' },
        { status: 400 }
      );
    }

    // Read brand overview format from training data
    const formatFilePath = join(process.cwd(), 'training-data', 'brand-overview-format.md');
    let brandOverviewFormat = '';

    try {
      brandOverviewFormat = readFileSync(formatFilePath, 'utf-8');
    } catch (fileError) {
      console.warn('Could not read brand-overview-format.md, using default format');
      brandOverviewFormat = `
Brand Overview Format:
- brand_name
- primary_niche
- sub_niches (5 items)
- industry
- target_audience
- brand_voice
- key_products
- unique_selling_points
- goals
- content_pillars
      `;
    }

    // Generate brand overview with Claude
    const prompt = `You are a brand strategist creating a comprehensive brand overview from client intake data.

TRAINING DATA - BRAND OVERVIEW FORMAT:
${brandOverviewFormat}

CLIENT INTAKE DATA:
${JSON.stringify(intake, null, 2)}

TASK:
Using the brand overview format provided in the training data and the client intake information, create a detailed brand overview in JSON format.

REQUIREMENTS:
- Follow the structure specified in the training data format
- Base all information on the client intake data provided
- The 5 sub-niches should be distinct content categories within the primary niche
- Brand voice should reflect the personality and tone described in the intake
- Include 3-5 key products if mentioned in the intake
- Goals should be concrete and measurable
- Ensure the unique selling points are clearly differentiated from competitors

OUTPUT:
Return ONLY valid JSON matching this structure:

{
  "brand_name": "string",
  "primary_niche": "string (main category like 'Fitness', 'Real Estate', 'SaaS')",
  "sub_niches": ["string", "string", "string", "string", "string"],
  "industry": "string (broader category)",
  "target_audience": {
    "demographics": "string",
    "psychographics": "string",
    "experience_level": "string"
  },
  "brand_voice": {
    "tone": "string",
    "style": "string",
    "dos": ["string", "string", "string"],
    "donts": ["string", "string", "string"]
  },
  "key_products": [
    {
      "name": "string",
      "description": "string",
      "url": "string (optional)"
    }
  ],
  "unique_selling_points": ["string", "string", "string"],
  "goals": ["string", "string", "string"],
  "content_pillars": ["string", "string", "string", "string", "string"]
}

Generate the brand overview now.`;

    const response = await createClaudeMessage(prompt, undefined, 4096);

    // Parse the response
    let brandOverview;
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        brandOverview = JSON.parse(jsonMatch[0]);
      } else {
        brandOverview = JSON.parse(response);
      }
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      console.error('Response:', response);
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    // Update project with brand overview
    const { data: project, error: updateError } = await supabaseAdmin
      .from('bp_projects')
      .update({
        brand_overview: brandOverview,
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      brand_overview: brandOverview,
      project,
    });
  } catch (error) {
    console.error('Error generating brand overview from intake:', error);
    return NextResponse.json(
      { error: 'Failed to generate brand overview' },
      { status: 500 }
    );
  }
}
