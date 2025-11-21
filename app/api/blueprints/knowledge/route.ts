import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch all knowledge entries for a project
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('bp_client_knowledge')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching knowledge entries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch knowledge entries' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error in GET /api/blueprints/knowledge:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new knowledge entry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, title, entry_type, content, tags } = body;

    // Validate required fields
    if (!projectId || !title || !entry_type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, title, entry_type, content' },
        { status: 400 }
      );
    }

    // Validate entry_type
    const validTypes = [
      'talk/transcript',
      'product/service',
      'expertise-area',
      'voice-example',
      'story/experience',
      'past-content',
      'other',
    ];

    if (!validTypes.includes(entry_type)) {
      return NextResponse.json(
        { error: `Invalid entry_type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('bp_client_knowledge')
      .insert({
        project_id: projectId,
        title,
        entry_type,
        content,
        tags: tags || [],
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating knowledge entry:', error);
      return NextResponse.json(
        { error: 'Failed to create knowledge entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error in POST /api/blueprints/knowledge:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
