import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch a single knowledge entry by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from('bp_client_knowledge')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Knowledge entry not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching knowledge entry:', error);
      return NextResponse.json(
        { error: 'Failed to fetch knowledge entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error in GET /api/blueprints/knowledge/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a knowledge entry
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, entry_type, content, tags } = body;

    // Validate at least one field to update
    if (!title && !entry_type && !content && !tags) {
      return NextResponse.json(
        { error: 'At least one field must be provided to update' },
        { status: 400 }
      );
    }

    // Validate entry_type if provided
    if (entry_type) {
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
    }

    // Build update object with only provided fields
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title;
    if (entry_type !== undefined) updateData.entry_type = entry_type;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = tags;

    const { data, error } = await supabaseAdmin
      .from('bp_client_knowledge')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Knowledge entry not found' },
          { status: 404 }
        );
      }
      console.error('Error updating knowledge entry:', error);
      return NextResponse.json(
        { error: 'Failed to update knowledge entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error in PUT /api/blueprints/knowledge/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a knowledge entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('bp_client_knowledge')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting knowledge entry:', error);
      return NextResponse.json(
        { error: 'Failed to delete knowledge entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Knowledge entry deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/blueprints/knowledge/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
