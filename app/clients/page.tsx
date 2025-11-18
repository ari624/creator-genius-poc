import Link from 'next/link';
import { Plus, Users } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-dark mb-2">Client Analyzer</h1>
          <p className="text-lg text-text-medium">
            Analyze client content and extract winning patterns
          </p>
        </div>
        <Link
          href="/clients/new"
          className="flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">New Client</span>
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-text-dark mb-2">Pattern Recognition</h3>
          <p className="text-sm text-text-medium">
            Extract content patterns, templates, and formulas from successful posts
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-text-dark mb-2">Hook Analysis</h3>
          <p className="text-sm text-text-medium">
            Identify high-performing hooks and opening strategies
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-text-dark mb-2">Visual Breakdown</h3>
          <p className="text-sm text-text-medium">
            Analyze composition, colors, overlays, and visual elements
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-3xl p-16 shadow-lg text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-dark mb-2">No Clients Yet</h3>
        <p className="text-text-medium mb-6">
          Add your first client to start analyzing their content
        </p>
        <Link
          href="/clients/new"
          className="inline-flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add First Client</span>
        </Link>
      </div>
    </div>
  );
}
