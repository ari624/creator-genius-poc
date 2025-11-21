'use client';

import Link from 'next/link';
import { Plus, Users, TrendingUp, Eye, Target, Sparkles, ArrowRight } from 'lucide-react';

export default function ClientsPage() {
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
                <span className="text-sm font-semibold text-purple-dark">Content Intelligence</span>
              </div>
              <Link
                href="/clients/new"
                className="flex items-center space-x-3 px-8 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold hover-lift"
              >
                <Plus className="w-6 h-6" />
                <span>New Client</span>
              </Link>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
              Client
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Analyzer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Analyze client content in any niche. Extract patterns, hooks, and visual strategies that drive real engagement and results.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Pattern Recognition</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Extract content patterns, templates, and formulas from successful posts that consistently perform well
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Hook Analysis</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Identify high-performing hooks and opening strategies that capture attention in the first 3 seconds
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-transparent hover:border-purple-light transition-all duration-300 group hover-lift">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Visual Breakdown</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Analyze composition, colors, overlays, and visual elements that make content scroll-stopping
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-primary rounded-3xl p-12 text-white shadow-xl mb-16">
          <h2 className="text-4xl font-bold mb-8">How Client Analysis Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-4 opacity-80">01</div>
              <h3 className="text-2xl font-bold mb-3">Add Client</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Input client details and their social media content. Our AI starts analyzing immediately.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-4 opacity-80">02</div>
              <h3 className="text-2xl font-bold mb-3">AI Analysis</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                We extract patterns, hooks, visual strategies, and content formulas specific to their niche.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-4 opacity-80">03</div>
              <h3 className="text-2xl font-bold mb-3">Get Insights</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Use insights to inform Blueprint Generator and create content that matches proven patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-20 shadow-xl border border-purple-50 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 gradient-primary opacity-10 rounded-full blur-2xl" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <Users className="w-14 h-14 text-purple-medium" />
              </div>
            </div>
            <h3 className="text-5xl font-bold text-text-dark mb-6">No Clients Yet</h3>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Add your first client to start analyzing their content and discovering what works in their niche. Get data-driven insights to power your content strategy.
            </p>
            <Link
              href="/clients/new"
              className="inline-flex items-center space-x-3 px-12 py-6 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-xl font-semibold hover-lift group"
            >
              <Plus className="w-7 h-7" />
              <span>Add First Client</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
