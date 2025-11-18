import Link from 'next/link';
import { Video, FileText, Search, Download } from 'lucide-react';

export default function ManualPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-text-dark mb-3">Social Media Manual</h1>
        <p className="text-xl text-gray-600">
          Your internal knowledge base for social media marketing insights
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <Link href="/manual/transcribe">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift">
            <Video className="w-10 h-10 text-purple-medium mb-5" />
            <h3 className="font-bold text-text-dark mb-2 text-xl">Transcribe Video</h3>
            <p className="text-base text-gray-600">Convert videos to text</p>
          </div>
        </Link>

        <Link href="/manual/ingest">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift">
            <FileText className="w-10 h-10 text-purple-medium mb-5" />
            <h3 className="font-bold text-text-dark mb-2 text-xl">Extract Insights</h3>
            <p className="text-base text-gray-600">Process transcripts</p>
          </div>
        </Link>

        <Link href="/manual/browse">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift">
            <Search className="w-10 h-10 text-purple-medium mb-5" />
            <h3 className="font-bold text-text-dark mb-2 text-xl">Browse Insights</h3>
            <p className="text-base text-gray-600">View all insights</p>
          </div>
        </Link>

        <Link href="/manual/export">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light hover-lift">
            <Download className="w-10 h-10 text-purple-medium mb-5" />
            <h3 className="font-bold text-text-dark mb-2 text-xl">Export Data</h3>
            <p className="text-base text-gray-600">Download insights</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold text-text-dark mb-8">Knowledge Base Stats</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <div className="text-5xl font-bold text-purple-dark mb-3">0</div>
            <div className="text-lg text-gray-600 font-medium">Total Insights</div>
          </div>
          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <div className="text-5xl font-bold text-purple-dark mb-3">0</div>
            <div className="text-lg text-gray-600 font-medium">Videos Processed</div>
          </div>
          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <div className="text-5xl font-bold text-purple-dark mb-3">15</div>
            <div className="text-lg text-gray-600 font-medium">Domains</div>
          </div>
        </div>
      </div>
    </div>
  );
}
