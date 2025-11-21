'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function ExportPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href={`/blueprints/${projectId}`}
        className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Project
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Download className="w-10 h-10 text-purple-medium" />
          <h1 className="text-4xl font-bold text-text-dark">Export</h1>
        </div>
        <p className="text-lg text-text-medium">
          Download all deliverables and reports
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-6">
            <Download className="w-10 h-10 text-purple-medium" />
          </div>
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Export - Coming Soon
          </h2>
          <p className="text-text-medium mb-6">
            This page will provide various export options for your content. Download
            blueprints, scripts, captions, calendars, and reports in multiple formats.
          </p>
          <div className="bg-purple-light/10 rounded-2xl p-6 text-left">
            <h3 className="font-semibold text-text-dark mb-3">Features in Development:</h3>
            <ul className="space-y-2 text-text-medium">
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Excel export for content idea calendars</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>PDF export for individual blueprints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>ZIP download of all project files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>CSV export for captions and metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Custom report generation with analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
