'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lightbulb } from '@/components/Icon';

export default function ContentIdeasPage() {
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
          <Lightbulb className="w-10 h-10 text-purple-medium" />
          <h1 className="text-4xl font-bold text-text-dark">Content Ideas</h1>
        </div>
        <p className="text-lg text-text-medium">
          Generate and review content ideas with swipe interface
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="w-10 h-10 text-purple-medium" />
          </div>
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Content Ideas - Coming Soon
          </h2>
          <p className="text-text-medium mb-6">
            This page will feature an AI-powered content idea generator with a Tinder-style
            swipe interface. Review, approve, reject, or edit content ideas before turning
            them into full blueprints.
          </p>
          <div className="bg-purple-light/10 rounded-2xl p-6 text-left">
            <h3 className="font-semibold text-text-dark mb-3">Features in Development:</h3>
            <ul className="space-y-2 text-text-medium">
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>AI-generated content ideas based on brand and research</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Swipe right to approve, left to reject, up to edit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Hook optimization using mass-first, niche-later principle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Keyword integration and SEO optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Export approved ideas to Excel calendar format</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
