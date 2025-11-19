import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch research data for a project
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

    // Fetch research files
    const { data: researchFiles, error: filesError } = await supabaseAdmin
      .from('bp_research_data')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (filesError) {
      console.error('Error fetching research files:', filesError);
      return NextResponse.json(
        { error: 'Failed to fetch research files' },
        { status: 500 }
      );
    }

    // Fetch transcribed videos for this project
    const { data: videos, error: videosError } = await supabaseAdmin
      .from('sm_video_transcripts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (videosError) {
      console.error('Error fetching videos:', videosError);
      return NextResponse.json(
        { error: 'Failed to fetch videos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      researchFiles: researchFiles || [],
      videos: videos || [],
    });
  } catch (error) {
    console.error('Error in GET /api/blueprints/research:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Upload and process research file
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, fileName, fileType, data } = body;

    if (!projectId || !fileName || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, fileName, data' },
        { status: 400 }
      );
    }

    // Save research file metadata
    const { data: researchFile, error: fileError } = await supabaseAdmin
      .from('bp_research_data')
      .insert({
        project_id: projectId,
        data_type: 'viralfindr',
        source_file: fileName,
        content: data,
        analyzed: false,
      })
      .select()
      .single();

    if (fileError) {
      console.error('Error saving research file:', fileError);
      return NextResponse.json(
        { error: 'Failed to save research file' },
        { status: 500 }
      );
    }

    // Extract video URLs from the data
    const videoUrls: string[] = [];
    if (Array.isArray(data)) {
      data.forEach((row: any) => {
        if (row.video_url || row.url || row.link) {
          const url = row.video_url || row.url || row.link;
          if (url && typeof url === 'string' && url.trim()) {
            videoUrls.push(url.trim());
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      researchFile,
      videoCount: videoUrls.length,
      videoUrls,
    });
  } catch (error: any) {
    console.error('Error in POST /api/blueprints/research:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
