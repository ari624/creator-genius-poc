'use client';

import Link from 'next/link';
import { Video, FileText, Search, Download, Sparkles, Zap } from '@/components/Icon';
import { useEffect, useState } from 'react';

export default function ManualPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Hero Section */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 gradient-primary opacity-10 rounded-3xl blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center space-x-2 bg-white border border-purple-light rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple-medium" />
              <span className="text-sm font-semibold text-purple-dark">Your Knowledge Base</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
              Social Media
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Manual</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Build and manage your internal knowledge base for social media marketing. Extract insights from videos, organize by domain, and power your AI with training data.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/manual/transcribe" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift h-full">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Transcribe Video</h3>
              <p className="text-base text-gray-600 leading-relaxed">Convert video content into structured text and extract key insights</p>
              <div className="mt-5 flex items-center text-purple-medium font-semibold group-hover:translate-x-1 transition-transform">
                Get Started
                <Zap className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          <Link href="/manual/ingest" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift h-full">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Import Training Data</h3>
              <p className="text-base text-gray-600 leading-relaxed">Upload markdown files and structured data to your knowledge base</p>
              <div className="mt-5 flex items-center text-purple-medium font-semibold group-hover:translate-x-1 transition-transform">
                Get Started
                <Zap className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          <Link href="/manual/browse" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift h-full">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Browse Insights</h3>
              <p className="text-base text-gray-600 leading-relaxed">Explore all insights organized by domain and category</p>
              <div className="mt-5 flex items-center text-purple-medium font-semibold group-hover:translate-x-1 transition-transform">
                Get Started
                <Zap className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          <Link href="/manual/export" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift h-full">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Export & Sync</h3>
              <p className="text-base text-gray-600 leading-relaxed">Download your knowledge base or sync with external systems</p>
              <div className="mt-5 flex items-center text-purple-medium font-semibold group-hover:translate-x-1 transition-transform">
                Get Started
                <Zap className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-purple-50">
          <h2 className="text-4xl font-bold text-text-dark mb-12">Knowledge Base Stats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-10 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative">
                <div className="text-6xl font-bold text-transparent bg-gradient-primary bg-clip-text mb-3">
                  {mounted ? '0' : '0'}
                </div>
                <div className="text-lg text-gray-600 font-medium">Total Insights</div>
                <div className="text-sm text-gray-500 mt-2">Collected and organized</div>
              </div>
            </div>

            <div className="relative p-10 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative">
                <div className="text-6xl font-bold text-transparent bg-gradient-primary bg-clip-text mb-3">
                  {mounted ? '0' : '0'}
                </div>
                <div className="text-lg text-gray-600 font-medium">Videos Processed</div>
                <div className="text-sm text-gray-500 mt-2">Transcribed & analyzed</div>
              </div>
            </div>

            <div className="relative p-10 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="relative">
                <div className="text-6xl font-bold text-transparent bg-gradient-primary bg-clip-text mb-3">
                  15
                </div>
                <div className="text-lg text-gray-600 font-medium">Knowledge Domains</div>
                <div className="text-sm text-gray-500 mt-2">Hooks, formats, algorithms & more</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-primary rounded-3xl p-12 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">AI-Powered Extraction</h3>
            <p className="text-lg text-white opacity-90 leading-relaxed mb-6">
              Automatically extract and categorize insights from video transcripts using advanced AI. Your knowledge base grows smarter with every upload.
            </p>
            <ul className="space-y-3 text-white opacity-90">
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>Automatic domain classification</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>Intelligent insight summarization</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span>Cross-reference related insights</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-12 border-2 border-purple-light shadow-xl">
            <h3 className="text-3xl font-bold text-text-dark mb-4">Train Your AI</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Use your knowledge base to power the Blueprint Generator. The more insights you collect, the better your AI-generated content.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="font-bold text-purple-medium">→</span>
                <span>Contextualized content generation</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-purple-medium">→</span>
                <span>Smarter hook recommendations</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-purple-medium">→</span>
                <span>Industry-specific insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
