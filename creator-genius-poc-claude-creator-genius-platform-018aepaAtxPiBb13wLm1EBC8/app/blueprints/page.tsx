import Link from 'next/link';
import { Plus, FolderOpen } from 'lucide-react';

export default function BlueprintsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-text-dark mb-3">Blueprint Generator</h1>
          <p className="text-xl text-gray-600">
            Create production-ready content with AI-powered blueprints
          </p>
        </div>
        <Link
          href="/blueprints/new"
          className="flex items-center space-x-3 px-8 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold hover-lift"
        >
          <Plus className="w-6 h-6" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white rounded-2xl p-10 shadow-xl mb-12">
        <h2 className="text-3xl font-bold text-text-dark mb-8">Production Workflow</h2>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Create Project</h3>
            <p className="text-base text-gray-600">Set up your project</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Brand Overview</h3>
            <p className="text-base text-gray-600">Define brand & audience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Content Ideas</h3>
            <p className="text-base text-gray-600">Generate & review ideas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Blueprints</h3>
            <p className="text-base text-gray-600">Full scripts & captions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              5
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Export</h3>
            <p className="text-base text-gray-600">Download deliverables</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl p-20 shadow-xl text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-12 h-12 text-purple-medium" />
          </div>
          <h3 className="text-4xl font-bold text-text-dark mb-4">No Projects Yet</h3>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Create your first project to start generating content blueprints. Our AI-powered workflow will guide you through creating professional content from start to finish.
          </p>
          <Link
            href="/blueprints/new"
            className="inline-flex items-center space-x-3 px-10 py-5 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-xl font-semibold hover-lift"
          >
            <Plus className="w-6 h-6" />
            <span>Create First Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
