import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Load existing intake data
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const { data: intake, error } = await supabaseAdmin
      .from('bp_client_intake')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is OK
      throw error;
    }

    return NextResponse.json({ intake: intake || null });
  } catch (error) {
    console.error('Error loading intake data:', error);
    return NextResponse.json(
      { error: 'Failed to load intake data' },
      { status: 500 }
    );
  }
}

// POST - Save/update intake data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectId,
      first_name,
      last_name,
      phone,
      email,
      company,
      business_overview,
      primary_goals,
      key_metrics,
      demographics,
      psychographics,
      customer_journey,
      common_challenges,
      brand_personality,
      tone_voice,
      unique_value,
      visual_guidelines,
      current_platforms,
      resonating_content,
      main_competitors,
      doing_well_accounts,
      admired_brands,
      comfortable_featuring_people,
      upcoming_campaigns,
      primary_keywords,
      secondary_keywords,
      seo_goals,
      current_challenges,
      expectations,
      completion_percentage,
    } = body;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Check if intake already exists
    const { data: existing } = await supabaseAdmin
      .from('bp_client_intake')
      .select('id')
      .eq('project_id', projectId)
      .single();

    const intakeData = {
      project_id: projectId,
      first_name,
      last_name,
      phone,
      email,
      company,
      business_overview,
      primary_goals,
      key_metrics,
      demographics,
      psychographics,
      customer_journey,
      common_challenges,
      brand_personality,
      tone_voice,
      unique_value,
      visual_guidelines,
      current_platforms,
      resonating_content,
      main_competitors,
      doing_well_accounts,
      admired_brands,
      comfortable_featuring_people,
      upcoming_campaigns,
      primary_keywords,
      secondary_keywords,
      seo_goals,
      current_challenges,
      expectations,
      completion_percentage,
      status: completion_percentage >= 100 ? 'completed' : 'draft',
      updated_at: new Date().toISOString(),
    };

    let result;

    if (existing) {
      // Update existing intake
      const { data, error } = await supabaseAdmin
        .from('bp_client_intake')
        .update(intakeData)
        .eq('project_id', projectId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new intake
      const { data, error } = await supabaseAdmin
        .from('bp_client_intake')
        .insert(intakeData)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ intake: result, success: true });
  } catch (error) {
    console.error('Error saving intake data:', error);
    return NextResponse.json(
      { error: 'Failed to save intake data' },
      { status: 500 }
    );
  }
}
