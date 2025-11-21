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
} from '@/components/Icon';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  // This would normally fetch project data from the database
  const projectName = 'Sample Project';

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-text-dark mb-3">{projectName}</h1>
        <p className="text-xl text-gray-600">Blueprint Generator Project Dashboard</p>
      </div>

      {/* Workflow Progress */}
      <div className="bg-white rounded-2xl p-10 shadow-xl mb-12">
        <h2 className="text-3xl font-bold text-text-dark mb-8">Production Workflow</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Client Intake</h3>
            <p className="text-base text-gray-600">Gather information</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Brand Overview</h3>
            <p className="text-base text-gray-600">Define brand & audience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Content Ideas</h3>
            <p className="text-base text-gray-600">Generate & review</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Blueprints</h3>
            <p className="text-base text-gray-600">Full production</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Client Intake */}
        <Link href={`/blueprints/${projectId}/intake`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <div className="flex items-center justify-between mb-6">
              <ClipboardList className="w-10 h-10 text-purple-medium" />
              <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                New
              </span>
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Client Intake Form</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Comprehensive 27-question form to gather all client information
            </p>
          </div>
        </Link>

        {/* Brand Overview */}
        <Link href={`/blueprints/${projectId}/brand-overview`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <FileText className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Brand Overview</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Define niche, audience, voice, and brand identity
            </p>
          </div>
        </Link>

        {/* Client Knowledge Base */}
        <Link href={`/blueprints/${projectId}/knowledge`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <div className="flex items-center justify-between mb-6">
              <Database className="w-10 h-10 text-purple-medium" />
              <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                New
              </span>
            </div>
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Client Knowledge Base</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Store client talks, products, stories, and expertise
            </p>
          </div>
        </Link>

        {/* Research Data */}
        <Link href={`/blueprints/${projectId}/research`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <Upload className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Research Data</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Upload ViralFindr data or manual research
            </p>
          </div>
        </Link>

        {/* Content Ideas */}
        <Link href={`/blueprints/${projectId}/ideas`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <Lightbulb className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Content Ideas</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Generate and review ideas with swipe interface
            </p>
          </div>
        </Link>

        {/* Create Blueprint */}
        <Link href={`/blueprints/${projectId}/create-blueprint`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <FileEdit className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Create Blueprint</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Generate full blueprints with scripts and captions
            </p>
          </div>
        </Link>

        {/* Blueprint Library */}
        <Link href={`/blueprints/${projectId}/library`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <BookOpen className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Blueprint Library</h3>
            <p className="text-base text-gray-600 leading-relaxed">View and manage all blueprints</p>
          </div>
        </Link>

        {/* Settings */}
        <Link href={`/blueprints/${projectId}/settings`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <Settings className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Project Settings</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Configure GPT system notes and preferences
            </p>
          </div>
        </Link>

        {/* Export */}
        <Link href={`/blueprints/${projectId}/export`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-light h-full hover-lift">
            <Download className="w-10 h-10 text-purple-medium mb-6" />
            <h3 className="font-bold text-text-dark mb-3 text-2xl">Export</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Download all deliverables and reports
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
