'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function TranscribeVideoPage() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [videoName, setVideoName] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleTranscribe = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    try {
      setIsTranscribing(true);
      setTranscript(null);

      const response = await fetch('/api/manual/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: videoUrl.trim(),
          video_name: videoName.trim() || null,
        }),
      });

      const result = await response.json();

      if (result.success && result.transcript) {
        toast.success('Video transcribed successfully!');
        setTranscript(result.transcript.transcript);
        setVideoUrl('');
        setVideoName('');
      } else {
        toast.error(result.error || 'Failed to transcribe video');
      }
    } catch (error: any) {
      console.error('Error transcribing video:', error);
      toast.error(error.message || 'Failed to transcribe video');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleViewTranscripts = () => {
    router.push('/social-media-manual/browse');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-2">Transcribe Video</h1>
        <p className="text-lg text-text-medium">
          Convert video content to text using AI-powered transcription
        </p>
      </div>

      {/* Transcription Form */}
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
              placeholder="https://example.com/video.mp4"
              disabled={isTranscribing}
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: MP4, MP3, WAV, M4A
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Video Name (Optional)
            </label>
            <input
              type="text"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
              placeholder="e.g., Gary Vee Marketing Tips"
              disabled={isTranscribing}
            />
          </div>

          <button
            onClick={handleTranscribe}
            disabled={isTranscribing || !videoUrl.trim()}
            className="w-full px-6 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Transcribing... (This may take a few minutes)
              </>
            ) : (
              <>
                <Video className="w-6 h-6" />
                Transcribe Video
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transcription Result */}
      {transcript && (
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-dark">Transcription Complete</h2>
              <p className="text-text-medium">Your video has been transcribed successfully</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto">
            <p className="text-text-dark whitespace-pre-wrap leading-relaxed">{transcript}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setTranscript(null)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-text-dark rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Transcribe Another
            </button>
            <button
              onClick={handleViewTranscripts}
              className="flex-1 px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
            >
              View All Transcripts
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-blue-900 mb-2">How it works:</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Enter the URL of your video file (must be publicly accessible)</li>
          <li>Click "Transcribe Video" and wait for the AI to process it</li>
          <li>The transcript will be saved to your knowledge base automatically</li>
          <li>You can then extract insights from the transcript</li>
        </ol>
      </div>
    </div>
  );
}
