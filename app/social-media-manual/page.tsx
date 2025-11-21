import Link from 'next/link';
import { Video, Search, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function SocialMediaManualPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Social Media Manual</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Your internal knowledge base for social media marketing. Access training insights,
            transcribe videos, and build your content expertise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* Featured: Training Manual */}
        <div className="mb-12">
          <Link href="/social-media-manual/training">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-10 shadow-elegant-2xl hover:shadow-elegant-xl transition-all cursor-pointer hover:scale-[1.01] transform">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white">Training Manual</h2>
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-4">
                    Search through 2,520 insights from 795 video script analyses across 12 categories
                  </p>
                  <div className="flex items-center gap-4 text-white/80">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                      2,520 Insights
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                      12 Categories
                    </span>
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                      Full-Text Search
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </Link>
        </div>

        {/* Tools Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Transcribe Video */}
          <Link href="/social-media-manual/transcribe">
            <div className="bg-white rounded-2xl p-8 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-xl">Transcribe Video</h3>
                  <p className="text-gray-600 mb-4">
                    Convert any video URL to text using AI-powered transcription (OpenAI Whisper)
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Start Transcribing <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Browse Transcripts */}
          <Link href="/social-media-manual/browse">
            <div className="bg-white rounded-2xl p-8 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-xl">Browse Transcripts</h3>
                  <p className="text-gray-600 mb-4">
                    View and search through all your transcribed videos and extracted content
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Library <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-10 shadow-elegant-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Upload Training File</h3>
              <p className="text-gray-600 text-sm">
                Go to Training Manual and upload your markdown file with all 2,520 insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Search & Filter</h3>
              <p className="text-gray-600 text-sm">
                Use full-text search and category filters to find relevant insights quickly
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Apply to Content</h3>
              <p className="text-gray-600 text-sm">
                Copy insights directly into your content creation workflow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
