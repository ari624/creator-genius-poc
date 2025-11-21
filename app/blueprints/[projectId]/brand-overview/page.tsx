'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText } from '@/components/Icon';

export default function BrandOverviewPage() {
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
          <FileText className="w-10 h-10 text-purple-medium" />
          <h1 className="text-4xl font-bold text-text-dark">Brand Overview</h1>
        </div>
        <p className="text-lg text-text-medium">
          Define your client's niche, audience, voice, and brand identity
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-purple-medium" />
          </div>
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Brand Overview - Coming Soon
          </h2>
          <p className="text-text-medium mb-6">
            This page will allow you to define and manage your client's brand overview,
            including their primary niche, sub-niches, target audience, brand voice, and
            unique value propositions. This information will be used to generate
            personalized content across all blueprints.
          </p>
          <div className="bg-purple-light/10 rounded-2xl p-6 text-left">
            <h3 className="font-semibold text-text-dark mb-3">Features in Development:</h3>
            <ul className="space-y-2 text-text-medium">
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>AI-powered brand overview generation from intake form</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>5 sub-niche categories with detailed descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Voice and tone definition with examples</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Audience profile and keyword strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-medium">•</span>
                <span>Content pillar recommendations</span>
              </li>
            </ul>
          </div>
          <Link
            href={`/blueprints/${projectId}/intake`}
            className="mt-6 inline-block gradient-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Complete Intake Form First
          </Link>
        </div>
      </div>
    </div>
  );
}
