import Link from 'next/link';
import { Plus, FolderOpen } from 'lucide-react';

export default function BlueprintsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-dark mb-2">Blueprint Generator</h1>
          <p className="text-lg text-text-medium">
            Create production-ready content with AI-powered blueprints
          </p>
        </div>
        <Link
          href="/blueprints/new"
          className="flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">New Project</span>
        </Link>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-text-dark mb-6">Production Workflow</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              1
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Create Project</h3>
            <p className="text-sm text-text-medium">Set up your project</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              2
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Brand Overview</h3>
            <p className="text-sm text-text-medium">Define brand & audience</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              3
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Content Ideas</h3>
            <p className="text-sm text-text-medium">Generate & review ideas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              4
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Blueprints</h3>
            <p className="text-sm text-text-medium">Full scripts & captions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              5
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Export</h3>
            <p className="text-sm text-text-medium">Download deliverables</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-3xl p-16 shadow-lg text-center">
        <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-dark mb-2">No Projects Yet</h3>
        <p className="text-text-medium mb-6">
          Create your first project to start generating content blueprints
        </p>
        <Link
          href="/blueprints/new"
          className="inline-flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Create First Project</span>
        </Link>
      </div>
    </div>
  );
}
