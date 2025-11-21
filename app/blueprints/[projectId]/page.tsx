'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  Circle,
  ArrowRight,
  Database,
  Sparkles,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client_name: string | null;
  industry: string | null;
  status: string;
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const response = await fetch(`/api/blueprints/projects`);
      const result = await response.json();
      if (result.success) {
        const found = result.projects?.find((p: Project) => p.id === projectId);
        setProject(found || null);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-hero border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/blueprints" className="hover:text-purple-600">Projects</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{project?.name || 'Project'}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {project?.name || 'Project Dashboard'}
          </h1>
          {project?.client_name && (
            <p className="text-lg text-gray-600">Client: {project.client_name}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">

        {/* Step-by-Step Workflow */}
        <div className="bg-white rounded-2xl p-8 shadow-elegant-lg border border-gray-100 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Getting Started - Follow These Steps</h2>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <Link href={`/blueprints/${projectId}/intake`}>
              <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Complete Client Intake Form</h3>
                  <p className="text-gray-600 text-sm">Answer 27 questions about your client's business, audience, and goals</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Step 2 */}
            <Link href={`/blueprints/${projectId}/research`}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Upload ViralFindr Research</h3>
                  <p className="text-gray-600 text-sm">Upload your Excel/CSV file with competitor video data for this client's niche</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Step 3 */}
            <Link href={`/blueprints/${projectId}/brand-overview`}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Generate Brand Overview</h3>
                  <p className="text-gray-600 text-sm">AI creates a comprehensive brand profile from your intake data</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Step 4 */}
            <Link href={`/blueprints/${projectId}/ideas`}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Generate Content Ideas</h3>
                  <p className="text-gray-600 text-sm">AI generates content ideas based on research and brand profile</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Step 5 */}
            <Link href={`/blueprints/${projectId}/create-blueprint`}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Create Full Blueprints</h3>
                  <p className="text-gray-600 text-sm">Generate complete scripts, captions, and B-roll prompts for each idea</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Access Cards */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Client Intake */}
          <Link href={`/blueprints/${projectId}/intake`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <ClipboardList className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Client Intake Form</h3>
              <p className="text-gray-600 text-sm">27-question form to gather all client information</p>
            </div>
          </Link>

          {/* Research Data */}
          <Link href={`/blueprints/${projectId}/research`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <Upload className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">ViralFindr Upload</h3>
              <p className="text-gray-600 text-sm">Upload competitor research for this client's niche</p>
            </div>
          </Link>

          {/* Brand Overview */}
          <Link href={`/blueprints/${projectId}/brand-overview`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <FileText className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Brand Overview</h3>
              <p className="text-gray-600 text-sm">AI-generated brand profile and strategy</p>
            </div>
          </Link>

          {/* Knowledge Base */}
          <Link href={`/blueprints/${projectId}/knowledge`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <Database className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Knowledge Base</h3>
              <p className="text-gray-600 text-sm">Store client talks, products, and expertise</p>
            </div>
          </Link>

          {/* Content Ideas */}
          <Link href={`/blueprints/${projectId}/ideas`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <Lightbulb className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Content Ideas</h3>
              <p className="text-gray-600 text-sm">Generate and review content ideas</p>
            </div>
          </Link>

          {/* Create Blueprint */}
          <Link href={`/blueprints/${projectId}/create-blueprint`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <FileEdit className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Create Blueprint</h3>
              <p className="text-gray-600 text-sm">Full scripts, captions, and B-roll prompts</p>
            </div>
          </Link>

          {/* Blueprint Library */}
          <Link href={`/blueprints/${projectId}/library`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <BookOpen className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Blueprint Library</h3>
              <p className="text-gray-600 text-sm">View all created blueprints</p>
            </div>
          </Link>

          {/* Export */}
          <Link href={`/blueprints/${projectId}/export`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <Download className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Export</h3>
              <p className="text-gray-600 text-sm">Download all deliverables</p>
            </div>
          </Link>

          {/* Settings */}
          <Link href={`/blueprints/${projectId}/settings`}>
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg hover:shadow-elegant-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200 h-full group">
              <Settings className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Settings</h3>
              <p className="text-gray-600 text-sm">Configure project preferences</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
