'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  Video,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Play,
} from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

interface ResearchFile {
  id: string;
  source_file: string;
  data_type: string;
  analyzed: boolean;
  created_at: string;
  content: any;
}

interface VideoTranscript {
  id: string;
  video_url: string;
  video_name: string | null;
  video_creator: string | null;
  video_platform: string | null;
  transcript: string;
  processed: boolean;
  video_views: number | null;
  video_likes: number | null;
  created_at: string;
  source_file: string | null;
}

export default function ResearchPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [researchFiles, setResearchFiles] = useState<ResearchFile[]>([]);
  const [videos, setVideos] = useState<VideoTranscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [transcribingVideoId, setTranscribingVideoId] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // Load research data
  const loadResearchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blueprints/research?projectId=${projectId}`);
      const result = await response.json();

      if (result.success) {
        setResearchFiles(result.researchFiles || []);
        setVideos(result.videos || []);
      } else {
        toast.error('Failed to load research data');
      }
    } catch (error) {
      console.error('Error loading research data:', error);
      toast.error('Failed to load research data');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadResearchData();
  }, [loadResearchData]);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setFileName(file.name);

      // Parse Excel/CSV file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setParsedData(jsonData);

      // Upload to database
      const response = await fetch('/api/blueprints/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          fileName: file.name,
          fileType: file.type,
          data: jsonData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`File uploaded! Found ${result.videoCount} videos to process.`);
        loadResearchData();
      } else {
        toast.error(result.error || 'Failed to upload file');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
      event.target.value = ''; // Reset input
    }
  };

  // Transcribe a single video
  const handleTranscribeVideo = async (row: any) => {
    const videoUrl = row.video_url || row.url || row.link;
    if (!videoUrl) {
      toast.error('No video URL found in this row');
      return;
    }

    try {
      setTranscribingVideoId(videoUrl);

      const response = await fetch('/api/blueprints/research/transcribe-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          videoUrl,
          videoName: row.video_name || row.name || null,
          videoCreator: row.creator || row.author || null,
          videoViews: row.views || null,
          videoLikes: row.likes || null,
          videoComments: row.comments || null,
          videoShares: row.shares || null,
          videoSaves: row.saves || null,
          videoPlatform: row.platform || null,
          videoDate: row.date || null,
          niche: row.niche || row.category || null,
          sourceFile: fileName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Video transcribed successfully!');
        loadResearchData();
        // Remove from parsed data
        setParsedData((prev) => prev?.filter((item) => {
          const url = item.video_url || item.url || item.link;
          return url !== videoUrl;
        }) || null);
      } else {
        toast.error(result.error || 'Failed to transcribe video');
      }
    } catch (error: any) {
      console.error('Error transcribing video:', error);
      toast.error(error.message || 'Failed to transcribe video');
    } finally {
      setTranscribingVideoId(null);
    }
  };

  // Transcribe all videos
  const handleTranscribeAll = async () => {
    if (!parsedData || parsedData.length === 0) {
      toast.error('No videos to transcribe');
      return;
    }

    toast.info(`Starting transcription of ${parsedData.length} videos...`);

    for (const row of parsedData) {
      await handleTranscribeVideo(row);
      // Small delay between requests to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    toast.success('All videos transcribed!');
  };

  const formatNumber = (num: number | null) => {
    if (!num) return 'N/A';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href={`/blueprints/${projectId}`}
        className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Project
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Upload className="w-10 h-10 text-purple-medium" />
          <h1 className="text-4xl font-bold text-text-dark">Research Data</h1>
        </div>
        <p className="text-lg text-text-medium">
          Upload ViralFindr Excel/CSV with competitor videos for this project
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-text-dark mb-4">Upload ViralFindr Data</h2>
        <p className="text-text-medium mb-6">
          Upload an Excel or CSV file containing video URLs. The system will transcribe each video
          and save it as project-specific research.
        </p>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-purple-medium mb-3 animate-spin" />
                <p className="text-sm text-text-medium">Processing file...</p>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-12 h-12 text-purple-medium mb-3" />
                <p className="mb-2 text-sm text-text-dark font-semibold">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-text-medium">Excel (.xlsx, .xls) or CSV (.csv)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-semibold text-blue-900 mb-2">Expected Columns:</h3>
          <p className="text-sm text-blue-800">
            <strong>Required:</strong> video_url (or url/link)
          </p>
          <p className="text-sm text-blue-800 mt-1">
            <strong>Optional:</strong> video_name, creator, platform, views, likes, comments,
            shares, niche, category
          </p>
        </div>
      </div>

      {/* Parsed Data - Ready to Transcribe */}
      {parsedData && parsedData.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-text-dark">
                Videos Ready to Transcribe
              </h2>
              <p className="text-text-medium">{parsedData.length} videos found in upload</p>
            </div>
            <button
              onClick={handleTranscribeAll}
              disabled={transcribingVideoId !== null}
              className="px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold"
            >
              {transcribingVideoId ? 'Transcribing...' : 'Transcribe All'}
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {parsedData.map((row, index) => {
              const videoUrl = row.video_url || row.url || row.link;
              const isTranscribing = transcribingVideoId === videoUrl;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-light transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-text-dark">
                      {row.video_name || row.name || `Video ${index + 1}`}
                    </p>
                    <p className="text-sm text-text-medium truncate">{videoUrl}</p>
                  </div>
                  <button
                    onClick={() => handleTranscribeVideo(row)}
                    disabled={isTranscribing}
                    className="ml-4 px-4 py-2 bg-purple-medium text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isTranscribing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transcribing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Transcribe
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transcribed Videos */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="inline-block animate-spin h-12 w-12 text-purple-medium mb-4" />
          <p className="text-text-medium">Loading research data...</p>
        </div>
      ) : videos.length === 0 && !parsedData ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
          <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-text-dark mb-2">No Research Data Yet</h3>
          <p className="text-text-medium">Upload a ViralFindr file to get started</p>
        </div>
      ) : videos.length > 0 ? (
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            Transcribed Videos ({videos.length})
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-purple-light transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-medium" />
                    <h3 className="font-semibold text-text-dark">
                      {video.video_name || 'Untitled Video'}
                    </h3>
                  </div>
                  {video.processed && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>

                {video.video_creator && (
                  <p className="text-sm text-text-medium mb-1">
                    Creator: {video.video_creator}
                  </p>
                )}

                {video.video_platform && (
                  <p className="text-sm text-text-medium mb-1">
                    Platform: {video.video_platform}
                  </p>
                )}

                {video.video_views && (
                  <p className="text-sm text-text-medium mb-1">
                    Views: {formatNumber(video.video_views)}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-3">
                  Transcribed: {formatDate(video.created_at)}
                </p>

                {video.source_file && (
                  <p className="text-xs text-gray-500">Source: {video.source_file}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
