import Link from 'next/link';
import { BookOpen, Users, FileText, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                All-in-One Content Creation Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Creator Genius
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three powerful systems working together: Build your social media knowledge base,
              analyze client content patterns, and generate production-ready blueprints.
            </p>
          </div>
        </div>
      </div>

      {/* Three Systems */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {/* System 1: Social Media Manual */}
          <Link href="/social-media-manual" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-elegant-lg hover:shadow-elegant-2xl transition-all duration-300 h-full border border-gray-100 hover:border-purple-200 hover-lift">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Social Media Manual
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Your internal knowledge base about social media marketing. Transcribe videos, extract insights
                across 15 domains, and build your AI training data.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* System 2: Client Analyzer */}
          <Link href="/client-analyzer" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-elegant-lg hover:shadow-elegant-2xl transition-all duration-300 h-full border border-gray-100 hover:border-purple-200 hover-lift">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Client Analyzer
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
                specific to their industry and audience.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* System 3: Blueprint Generator */}
          <Link href="/blueprints" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-elegant-lg hover:shadow-elegant-2xl transition-all duration-300 h-full border border-gray-100 hover:border-purple-200 hover-lift">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Blueprint Generator
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Production tool for creating content. Generate idea calendars, review with swipe interface,
                and create full blueprints with scripts, captions, and B-roll prompts.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Workflow Overview */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 sm:p-14 shadow-elegant-xl border border-purple-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A seamless workflow from knowledge gathering to content creation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 font-bold text-2xl shadow-lg">
                    1
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Knowledge</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Use the Social Media Manual to transcribe videos and extract insights about hooks, formats,
                algorithms, and more. Build your internal knowledge base.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 font-bold text-2xl shadow-lg">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Analyze Patterns</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Use the Client Analyzer to study successful content in any niche. Extract patterns, hooks,
                and visual strategies that work for specific industries.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 font-bold text-2xl shadow-lg">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Generate Content</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Use the Blueprint Generator to create production-ready content. Generate ideas, review with
                swipe interface, and output full blueprints with everything needed for production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
