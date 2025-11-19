'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, FolderOpen, Calendar, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  client_name: string | null;
  industry: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function BlueprintsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    client_name: '',
    industry: '',
  });

  // Load projects
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blueprints/projects');
      const result = await response.json();

      if (result.success) {
        setProjects(result.projects || []);
      } else {
        toast.error('Failed to load projects');
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    try {
      setCreating(true);
      const response = await fetch('/api/blueprints/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Project created successfully!');
        setIsModalOpen(false);
        setFormData({ name: '', client_name: '', industry: '' });
        // Redirect to the new project
        router.push(`/blueprints/${result.project.id}`);
      } else {
        toast.error(result.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-text-dark mb-3">Blueprint Generator</h1>
          <p className="text-xl text-gray-600">
            Create production-ready content with AI-powered blueprints
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-3 px-8 py-4 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold hover-lift"
        >
          <Plus className="w-6 h-6" />
          <span>New Project</span>
        </button>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white rounded-2xl p-10 shadow-xl mb-12">
        <h2 className="text-3xl font-bold text-text-dark mb-8">Production Workflow</h2>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Create Project</h3>
            <p className="text-base text-gray-600">Set up your project</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Brand Overview</h3>
            <p className="text-base text-gray-600">Define brand & audience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Content Ideas</h3>
            <p className="text-base text-gray-600">Generate & review ideas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Blueprints</h3>
            <p className="text-base text-gray-600">Full scripts & captions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              5
            </div>
            <h3 className="font-bold text-text-dark mb-2 text-lg">Export</h3>
            <p className="text-base text-gray-600">Download deliverables</p>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-medium"></div>
          <p className="text-text-medium mt-4">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-20 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-12 h-12 text-purple-medium" />
            </div>
            <h3 className="text-4xl font-bold text-text-dark mb-4">No Projects Yet</h3>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Create your first project to start generating content blueprints. Our AI-powered workflow will guide you through creating professional content from start to finish.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-3 px-10 py-5 gradient-primary text-white rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-xl font-semibold hover-lift"
            >
              <Plus className="w-6 h-6" />
              <span>Create First Project</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/blueprints/${project.id}`}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-light hover-lift block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="font-bold text-text-dark text-xl mb-2">{project.name}</h3>

              {project.client_name && (
                <p className="text-text-medium text-sm mb-1">Client: {project.client_name}</p>
              )}

              {project.industry && (
                <p className="text-text-medium text-sm mb-3">Industry: {project.industry}</p>
              )}

              <div className="flex items-center text-xs text-gray-500 mt-4">
                <Calendar className="w-4 h-4 mr-1" />
                Created {formatDate(project.created_at)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-dark">Create New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                  placeholder="e.g., Summer Campaign 2024"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                  placeholder="e.g., Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                  placeholder="e.g., Technology, Fashion, Finance"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-text-dark rounded-xl hover:bg-gray-50 transition-colors"
                disabled={creating}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={creating || !formData.name.trim()}
                className="flex-1 px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
