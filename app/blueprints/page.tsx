'use client';

import Link from 'next/link';
import { Plus, FolderOpen, Sparkles, Lightbulb, FileText, Download, ArrowRight } from '@/components/Icon';

export default function BlueprintsPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Hero Section */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 gradient-primary opacity-10 rounded-3xl blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center space-x-2 bg-white border border-purple-light rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-purple-medium" />
                <span className="text-sm font-semibold text-purple-dark">Production Tool</span>
              </div>
              <Link
                href="/blueprints/new"
                className="flex items-center space-x-3 px-8 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold hover-lift"
              >
                <Plus className="w-6 h-6" />
                <span>New Project</span>
              </Link>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
              Blueprint
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Generator</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Production tool for creating content. Generate idea calendars, review with swipe interface, and create full blueprints with scripts, captions, and B-roll prompts.
            </p>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-purple-50 mb-16">
          <h2 className="text-4xl font-bold text-text-dark mb-12">Production Workflow</h2>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative w-20 h-20 rounded-2xl gradient-primary text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Create Project</h3>
              <p className="text-base text-gray-600 leading-relaxed">Set up your project and define goals</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative w-20 h-20 rounded-2xl gradient-primary text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Brand Overview</h3>
              <p className="text-base text-gray-600 leading-relaxed">Define brand identity & target audience</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative w-20 h-20 rounded-2xl gradient-primary text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Content Ideas</h3>
              <p className="text-base text-gray-600 leading-relaxed">Generate & review ideas with swipe UI</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative w-20 h-20 rounded-2xl gradient-primary text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Blueprints</h3>
              <p className="text-base text-gray-600 leading-relaxed">Full scripts, captions & B-roll prompts</p>
            </div>

            <div className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative w-20 h-20 rounded-2xl gradient-primary text-white flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  5
                </div>
              </div>
              <h3 className="font-bold text-text-dark mb-3 text-xl">Export</h3>
              <p className="text-base text-gray-600 leading-relaxed">Download deliverables for production</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">AI-Powered Ideas</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Generate 30-day content calendars based on your brand, niche, and proven patterns
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Complete Blueprints</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get full scripts, optimized captions, and detailed B-roll prompts for every piece
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Download className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Production Ready</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Export everything in formats ready for your video editor and content team
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-20 shadow-xl border border-purple-50 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-2xl" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <FolderOpen className="w-14 h-14 text-purple-medium" />
              </div>
            </div>
            <h3 className="text-5xl font-bold text-text-dark mb-6">No Projects Yet</h3>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Create your first project to start generating content blueprints. Our AI-powered workflow will guide you through creating professional content from start to finish.
            </p>
            <Link
              href="/blueprints/new"
              className="inline-flex items-center space-x-3 px-12 py-6 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-xl font-semibold hover-lift group"
            >
              <Plus className="w-7 h-7" />
              <span>Create First Project</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
