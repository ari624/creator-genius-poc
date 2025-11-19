import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch all projects
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('bp_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projects: data,
    });
  } catch (error) {
    console.error('Error in GET /api/blueprints/projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, client_name, industry } = body;

    // Validate required field
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('bp_projects')
      .insert({
        name: name.trim(),
        client_name: client_name?.trim() || null,
        industry: industry?.trim() || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: data,
    });
  } catch (error) {
    console.error('Error in POST /api/blueprints/projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
