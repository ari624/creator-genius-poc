import Link from 'next/link';
import { Video, FileText, Search, Download } from 'lucide-react';

export default function ManualPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-2">Social Media Manual</h1>
        <p className="text-lg text-text-medium">
          Your internal knowledge base for social media marketing insights
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/manual/transcribe">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light">
            <Video className="w-8 h-8 text-purple-medium mb-3" />
            <h3 className="font-semibold text-text-dark mb-1">Transcribe Video</h3>
            <p className="text-sm text-text-medium">Convert videos to text</p>
          </div>
        </Link>

        <Link href="/manual/ingest">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light">
            <FileText className="w-8 h-8 text-purple-medium mb-3" />
            <h3 className="font-semibold text-text-dark mb-1">Extract Insights</h3>
            <p className="text-sm text-text-medium">Process transcripts</p>
          </div>
        </Link>

        <Link href="/manual/browse">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light">
            <Search className="w-8 h-8 text-purple-medium mb-3" />
            <h3 className="font-semibold text-text-dark mb-1">Browse Insights</h3>
            <p className="text-sm text-text-medium">View all insights</p>
          </div>
        </Link>

        <Link href="/manual/export">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light">
            <Download className="w-8 h-8 text-purple-medium mb-3" />
            <h3 className="font-semibold text-text-dark mb-1">Export Data</h3>
            <p className="text-sm text-text-medium">Download insights</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-text-dark mb-6">Knowledge Base Stats</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <div className="text-4xl font-bold text-purple-dark mb-2">0</div>
            <div className="text-text-medium">Total Insights</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <div className="text-4xl font-bold text-purple-dark mb-2">0</div>
            <div className="text-text-medium">Videos Processed</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <div className="text-4xl font-bold text-purple-dark mb-2">15</div>
            <div className="text-text-medium">Domains</div>
          </div>
        </div>
      </div>
    </div>
  );
}
