import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import OpenAI from 'openai';

// POST - Transcribe a single video for a project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectId,
      videoUrl,
      videoName,
      videoCreator,
      videoViews,
      videoLikes,
      videoComments,
      videoShares,
      videoSaves,
      videoPlatform,
      videoDate,
      niche,
      sourceFile,
    } = body;

    if (!projectId || !videoUrl) {
      return NextResponse.json(
        { error: 'projectId and videoUrl are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Download the video/audio file
    let audioBuffer;
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }
      audioBuffer = await response.arrayBuffer();
    } catch (error: any) {
      console.error('Error downloading video:', error);
      return NextResponse.json(
        { error: `Failed to download video: ${error.message}` },
        { status: 400 }
      );
    }

    // Convert to File object for Whisper API
    const audioFile = new File([audioBuffer], 'audio.mp4', { type: 'video/mp4' });

    // Transcribe using OpenAI Whisper
    let transcription;
    try {
      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        response_format: 'text',
      });

      transcription = response as unknown as string;
    } catch (error: any) {
      console.error('Error transcribing video:', error);
      return NextResponse.json(
        { error: `Transcription failed: ${error.message}` },
        { status: 500 }
      );
    }

    // Save to database with project_id
    const { data, error: dbError } = await supabaseAdmin
      .from('sm_video_transcripts')
      .insert({
        project_id: projectId,
        video_url: videoUrl,
        video_name: videoName || null,
        transcript: transcription,
        video_creator: videoCreator || null,
        video_views: videoViews || null,
        video_likes: videoLikes || null,
        video_comments: videoComments || null,
        video_shares: videoShares || null,
        video_saves: videoSaves || null,
        video_platform: videoPlatform || null,
        video_date: videoDate || null,
        niche: niche || null,
        source_file: sourceFile || null,
        processed: true,
        insights_extracted: false,
        insight_count: 0,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error saving transcript:', dbError);
      return NextResponse.json(
        { error: 'Failed to save transcript to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      transcript: data,
    });
  } catch (error: any) {
    console.error('Error in POST /api/blueprints/research/transcribe-video:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
