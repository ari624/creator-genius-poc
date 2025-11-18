import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClaudeMessage } from '@/lib/anthropic';

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

    // Generate brand overview with Claude
    const prompt = `You are a brand strategist creating a comprehensive brand overview from client intake data.

INTAKE DATA:
${JSON.stringify(intake, null, 2)}

TASK:
Create a detailed brand overview in JSON format with the following structure:

{
  "brand_name": "string",
  "primary_niche": "string (main category like 'Fitness', 'Real Estate', 'SaaS')",
  "sub_niches": ["string", "string", "string", "string", "string"] (exactly 5 specific content pillars),
  "industry": "string (broader category)",
  "target_audience": {
    "demographics": "string (age, gender, location, income, education)",
    "psychographics": "string (goals, pain points, interests, values)",
    "experience_level": "string (beginner, intermediate, advanced, or mixed)"
  },
  "brand_voice": {
    "tone": "string (professional, casual, motivational, educational, etc.)",
    "style": "string (direct, storytelling, humorous, authoritative, etc.)",
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

GUIDELINES:
- Be specific and actionable
- Base everything on the intake data provided
- The 5 sub-niches should be distinct content categories within the primary niche
- Content pillars should align with the sub-niches
- Brand voice should reflect the personality and tone described in the intake
- Include 3-5 key products if mentioned in the intake
- Goals should be concrete and measurable
- Make sure the USPs are clearly differentiated from competitors

Return ONLY valid JSON, no additional text.`;

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
    console.error('Error generating brand overview:', error);
    return NextResponse.json(
      { error: 'Failed to generate brand overview' },
      { status: 500 }
    );
  }
}
