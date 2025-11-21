import Link from 'next/link';
import { Users, ArrowRight, Target, Eye, Zap, Clock } from 'lucide-react';

export default function ClientAnalyzerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Client Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
            specific to their industry and audience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* Features Preview */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Coming</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-elegant-lg border border-gray-100">
            <Target className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Pattern Recognition</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Extract content patterns, templates, and formulas from successful posts in any niche
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-elegant-lg border border-gray-100">
            <Eye className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Hook Analysis</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Identify high-performing hooks and opening strategies that grab attention
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-elegant-lg border border-gray-100">
            <Zap className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Visual Breakdown</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Analyze composition, colors, overlays, and visual elements that drive engagement
            </p>
          </div>
        </div>

        {/* Current Alternative */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-10 shadow-elegant-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">Use Blueprint Generator Instead</h2>
              <p className="text-white/90 text-lg mb-4">
                For now, client analysis is integrated into the Blueprint Generator workflow.
                Create a project and upload ViralFindr research to analyze competitor content.
              </p>
              <Link
                href="/blueprints"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Go to Blueprint Generator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-elegant-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <Clock className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Development Status</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Blueprint Generator - Fully functional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Social Media Manual - Fully functional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-700">Client Analyzer - Coming soon (use Blueprint Generator for now)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
