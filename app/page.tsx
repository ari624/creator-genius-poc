import Link from 'next/link';
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-text-dark mb-4">
          Welcome to Creator Genius Platform
        </h1>
        <p className="text-xl text-text-medium max-w-3xl mx-auto">
          Three powerful systems integrated into one platform: Build your social media knowledge base,
          analyze client content patterns, and generate production-ready content blueprints.
        </p>
      </div>

      {/* Three Systems */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* System 1: Social Media Manual */}
        <Link href="/manual" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Social Media Manual
            </h2>
            <p className="text-text-medium mb-6">
              Your internal knowledge base about social media marketing. Transcribe videos, extract insights
              across 15 domains, and build your AI training data.
            </p>
            <div className="flex items-center text-purple-medium font-semibold group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </Link>

        {/* System 2: Client Analyzer */}
        <Link href="/clients" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Client Analyzer
            </h2>
            <p className="text-text-medium mb-6">
              Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
              specific to their industry and audience.
            </p>
            <div className="flex items-center text-purple-medium font-semibold group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </Link>

        {/* System 3: Blueprint Generator */}
        <Link href="/blueprints" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-purple-light">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Blueprint Generator
            </h2>
            <p className="text-text-medium mb-6">
              Production tool for creating content. Generate idea calendars, review with swipe interface,
              and create full blueprints with scripts, captions, and B-roll prompts.
            </p>
            <div className="flex items-center text-purple-medium font-semibold group-hover:translate-x-2 transition-transform">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </Link>
      </div>

      {/* Workflow Overview */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-text-dark mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-dark font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-text-dark">Build Knowledge</h3>
            </div>
            <p className="text-text-medium">
              Use the Social Media Manual to transcribe videos and extract insights about hooks, formats,
              algorithms, and more. Build your internal knowledge base.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-dark font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-text-dark">Analyze Patterns</h3>
            </div>
            <p className="text-text-medium">
              Use the Client Analyzer to study successful content in any niche. Extract patterns, hooks,
              and visual strategies that work for specific industries.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-dark font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-text-dark">Generate Content</h3>
            </div>
            <p className="text-text-medium">
              Use the Blueprint Generator to create production-ready content. Generate ideas, review with
              swipe interface, and output full blueprints with everything needed for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
