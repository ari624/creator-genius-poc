'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Transcript {
  id: string;
  video_url: string;
  video_name: string | null;
  transcript: string;
  processed: boolean;
  insights_extracted: boolean;
  insight_count: number;
  created_at: string;
}

export default function BrowseTranscriptsPage() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);

  useEffect(() => {
    loadTranscripts();
  }, []);

  const loadTranscripts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/manual/transcribe');
      const result = await response.json();

      if (result.success) {
        setTranscripts(result.transcripts || []);
      } else {
        toast.error('Failed to load transcripts');
      }
    } catch (error) {
      console.error('Error loading transcripts:', error);
      toast.error('Failed to load transcripts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-dark mb-2">Browse Transcripts</h1>
          <p className="text-lg text-text-medium">View and manage all transcribed videos</p>
        </div>
        <Link
          href="/social-media-manual/transcribe"
          className="px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
        >
          + Transcribe Video
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="inline-block animate-spin h-12 w-12 text-purple-medium mb-4" />
          <p className="text-text-medium">Loading transcripts...</p>
        </div>
      ) : transcripts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-text-dark mb-2">No Transcripts Yet</h3>
          <p className="text-text-medium mb-6">
            Start by transcribing your first video to build your knowledge base
          </p>
          <Link
            href="/social-media-manual/transcribe"
            className="inline-flex px-8 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
          >
            Transcribe First Video
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {transcripts.map((transcript) => (
            <div
              key={transcript.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-light cursor-pointer"
              onClick={() => setSelectedTranscript(transcript)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-medium" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">
                      {transcript.video_name || 'Untitled Video'}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(transcript.created_at)}
                    </div>
                  </div>
                </div>
                {transcript.insights_extracted && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {transcript.insight_count} insights
                  </span>
                )}
              </div>

              <p className="text-sm text-text-medium mb-4 line-clamp-3">
                {truncateText(transcript.transcript)}
              </p>

              <a
                href={transcript.video_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm text-purple-medium hover:text-purple-dark font-semibold"
              >
                View Source Video
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Transcript Modal */}
      {selectedTranscript && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTranscript(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text-dark mb-2">
                {selectedTranscript.video_name || 'Untitled Video'}
              </h2>
              <div className="flex items-center gap-4 text-sm text-text-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedTranscript.created_at)}
                </div>
                <a
                  href={selectedTranscript.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-medium hover:text-purple-dark font-semibold"
                >
                  Source Video
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-text-dark mb-3">Transcript:</h3>
              <p className="text-text-dark whitespace-pre-wrap leading-relaxed">
                {selectedTranscript.transcript}
              </p>
            </div>

            <button
              onClick={() => setSelectedTranscript(null)}
              className="w-full px-6 py-3 border-2 border-gray-300 text-text-dark rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
