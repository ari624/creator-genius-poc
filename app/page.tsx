import Link from 'next/link';
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Hero Section */}
      <div className="text-center mb-24 py-16">
        <h1 className="text-6xl font-bold text-text-dark mb-6 leading-tight">
          Welcome to Creator Genius Platform
        </h1>
        <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Three powerful systems integrated into one platform: Build your social media knowledge base,
          analyze client content patterns, and generate production-ready content blueprints.
        </p>
      </div>

      {/* Three Systems */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {/* System 1: Social Media Manual */}
        <Link href="/social-media-manual" className="group">
          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light hover-lift">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-8">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark mb-5">
              Social Media Manual
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your internal knowledge base about social media marketing. Transcribe videos, extract insights
              across 15 domains, and build your AI training data.
            </p>
            <div className="flex items-center text-purple-medium font-semibold text-lg group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-6 h-6 ml-2" />
            </div>
          </div>
        </Link>

        {/* System 2: Client Analyzer */}
        <Link href="/client-analyzer" className="group">
          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light hover-lift">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark mb-5">
              Client Analyzer
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
              specific to their industry and audience.
            </p>
            <div className="flex items-center text-purple-medium font-semibold text-lg group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-6 h-6 ml-2" />
            </div>
          </div>
        </Link>

        {/* System 3: Blueprint Generator */}
        <Link href="/blueprints" className="group">
          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light hover-lift">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-8">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark mb-5">
              Blueprint Generator
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Production tool for creating content. Generate idea calendars, review with swipe interface,
              and create full blueprints with scripts, captions, and B-roll prompts.
            </p>
            <div className="flex items-center text-purple-medium font-semibold text-lg group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-6 h-6 ml-2" />
            </div>
          </div>
        </Link>
      </div>

      {/* Workflow Overview */}
      <div className="bg-white rounded-2xl p-12 shadow-xl">
        <h2 className="text-4xl font-bold text-text-dark mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-dark font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-text-dark">Build Knowledge</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Use the Social Media Manual to transcribe videos and extract insights about hooks, formats,
              algorithms, and more. Build your internal knowledge base.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-dark font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-text-dark">Analyze Patterns</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Use the Client Analyzer to study successful content in any niche. Extract patterns, hooks,
              and visual strategies that work for specific industries.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-dark font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-text-dark">Generate Content</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Use the Blueprint Generator to create production-ready content. Generate ideas, review with
              swipe interface, and output full blueprints with everything needed for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
