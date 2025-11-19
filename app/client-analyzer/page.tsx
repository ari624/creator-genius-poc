import Link from 'next/link';
import { Plus, Users } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-text-dark mb-3">Client Analyzer</h1>
          <p className="text-xl text-gray-600">
            Analyze client content and extract winning patterns
          </p>
        </div>
        <Link
          href="/client-analyzer/new"
          className="flex items-center space-x-3 px-8 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold hover-lift"
        >
          <Plus className="w-6 h-6" />
          <span>New Client</span>
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="font-bold text-text-dark mb-3 text-xl">Pattern Recognition</h3>
          <p className="text-base text-gray-600 leading-relaxed">
            Extract content patterns, templates, and formulas from successful posts
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="font-bold text-text-dark mb-3 text-xl">Hook Analysis</h3>
          <p className="text-base text-gray-600 leading-relaxed">
            Identify high-performing hooks and opening strategies
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="font-bold text-text-dark mb-3 text-xl">Visual Breakdown</h3>
          <p className="text-base text-gray-600 leading-relaxed">
            Analyze composition, colors, overlays, and visual elements
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-2xl p-20 shadow-xl text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-purple-medium" />
          </div>
          <h3 className="text-4xl font-bold text-text-dark mb-4">No Clients Yet</h3>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Add your first client to start analyzing their content and discovering what works in their niche
          </p>
          <Link
            href="/client-analyzer/new"
            className="inline-flex items-center space-x-3 px-10 py-5 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-xl font-semibold hover-lift"
          >
            <Plus className="w-6 h-6" />
            <span>Add First Client</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
