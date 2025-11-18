import Link from 'next/link';
import {
  FileText,
  Upload,
  Lightbulb,
  FileEdit,
  BookOpen,
  Settings,
  Download,
  ClipboardList,
  CheckCircle2,
  Clock,
  Database,
} from 'lucide-react';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  // This would normally fetch project data from the database
  const projectName = 'Sample Project';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-2">{projectName}</h1>
        <p className="text-lg text-text-medium">Blueprint Generator Project Dashboard</p>
      </div>

      {/* Workflow Progress */}
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-text-dark mb-6">Production Workflow</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Client Intake</h3>
            <p className="text-xs text-text-medium">Gather information</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Brand Overview</h3>
            <p className="text-xs text-text-medium">Define brand & audience</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Content Ideas</h3>
            <p className="text-xs text-text-medium">Generate & review</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-text-dark mb-1">Blueprints</h3>
            <p className="text-xs text-text-medium">Full production</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client Intake */}
        <Link href={`/blueprints/${projectId}/intake`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <div className="flex items-center justify-between mb-4">
              <ClipboardList className="w-8 h-8 text-purple-medium" />
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                New
              </span>
            </div>
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Client Intake Form</h3>
            <p className="text-sm text-text-medium">
              Comprehensive 27-question form to gather all client information
            </p>
          </div>
        </Link>

        {/* Brand Overview */}
        <Link href={`/blueprints/${projectId}/brand-overview`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <FileText className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Brand Overview</h3>
            <p className="text-sm text-text-medium">
              Define niche, audience, voice, and brand identity
            </p>
          </div>
        </Link>

        {/* Client Knowledge Base */}
        <Link href={`/blueprints/${projectId}/knowledge`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-purple-medium" />
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                New
              </span>
            </div>
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Client Knowledge Base</h3>
            <p className="text-sm text-text-medium">
              Store client talks, products, stories, and expertise
            </p>
          </div>
        </Link>

        {/* Research Data */}
        <Link href={`/blueprints/${projectId}/research`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <Upload className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Research Data</h3>
            <p className="text-sm text-text-medium">
              Upload ViralFindr data or manual research
            </p>
          </div>
        </Link>

        {/* Content Ideas */}
        <Link href={`/blueprints/${projectId}/ideas`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <Lightbulb className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Content Ideas</h3>
            <p className="text-sm text-text-medium">
              Generate and review ideas with swipe interface
            </p>
          </div>
        </Link>

        {/* Create Blueprint */}
        <Link href={`/blueprints/${projectId}/create-blueprint`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <FileEdit className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Create Blueprint</h3>
            <p className="text-sm text-text-medium">
              Generate full blueprints with scripts and captions
            </p>
          </div>
        </Link>

        {/* Blueprint Library */}
        <Link href={`/blueprints/${projectId}/library`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <BookOpen className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Blueprint Library</h3>
            <p className="text-sm text-text-medium">View and manage all blueprints</p>
          </div>
        </Link>

        {/* Settings */}
        <Link href={`/blueprints/${projectId}/settings`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <Settings className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Project Settings</h3>
            <p className="text-sm text-text-medium">
              Configure GPT system notes and preferences
            </p>
          </div>
        </Link>

        {/* Export */}
        <Link href={`/blueprints/${projectId}/export`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full">
            <Download className="w-8 h-8 text-purple-medium mb-4" />
            <h3 className="font-semibold text-text-dark mb-2 text-lg">Export</h3>
            <p className="text-sm text-text-medium">
              Download all deliverables and reports
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
