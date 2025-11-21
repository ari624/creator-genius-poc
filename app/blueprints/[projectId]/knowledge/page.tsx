'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { BPClientKnowledge } from '@/lib/types';
import { Plus, Search, Edit2, Trash2, X, Tag as TagIcon } from '@/components/Icon';
import { toast } from '@/lib/toast';

const ENTRY_TYPES = [
  { value: 'talk/transcript', label: 'Talk/Transcript', color: 'bg-blue-100 text-blue-700' },
  { value: 'product/service', label: 'Product/Service', color: 'bg-green-100 text-green-700' },
  { value: 'expertise-area', label: 'Expertise Area', color: 'bg-purple-100 text-purple-700' },
  { value: 'voice-example', label: 'Voice Example', color: 'bg-pink-100 text-pink-700' },
  { value: 'story/experience', label: 'Story/Experience', color: 'bg-orange-100 text-orange-700' },
  { value: 'past-content', label: 'Past Content', color: 'bg-teal-100 text-teal-700' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-700' },
];

export default function KnowledgeBasePage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [entries, setEntries] = useState<BPClientKnowledge[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<BPClientKnowledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BPClientKnowledge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    entry_type: 'talk/transcript' as BPClientKnowledge['entry_type'],
    content: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  // Load entries
  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blueprints/knowledge?projectId=${projectId}`);
      const result = await response.json();

      if (result.success) {
        setEntries(result.data || []);
      } else {
        toast.error('Failed to load knowledge entries');
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      toast.error('Failed to load knowledge entries');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Filter and search entries
  useEffect(() => {
    let filtered = entries;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((entry) => entry.entry_type === filterType);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query) ||
          entry.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredEntries(filtered);
  }, [entries, filterType, searchQuery]);

  // Open modal for new entry
  const handleAddNew = () => {
    setEditingEntry(null);
    setFormData({
      title: '',
      entry_type: 'talk/transcript',
      content: '',
      tags: [],
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (entry: BPClientKnowledge) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      entry_type: entry.entry_type,
      content: entry.content,
      tags: entry.tags || [],
    });
    setIsModalOpen(true);
  };

  // Handle save (create or update)
  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      if (editingEntry) {
        // Update existing entry
        const response = await fetch(`/api/blueprints/knowledge/${editingEntry.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          toast.success('Knowledge entry updated');
          loadEntries();
          setIsModalOpen(false);
        } else {
          toast.error(result.error || 'Failed to update entry');
        }
      } else {
        // Create new entry
        const response = await fetch('/api/blueprints/knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            ...formData,
          }),
        });

        const result = await response.json();

        if (result.success) {
          toast.success('Knowledge entry created');
          loadEntries();
          setIsModalOpen(false);
        } else {
          toast.error(result.error || 'Failed to create entry');
        }
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error('Failed to save entry');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blueprints/knowledge/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Knowledge entry deleted');
        loadEntries();
      } else {
        toast.error(result.error || 'Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const getEntryTypeColor = (type: string) => {
    return ENTRY_TYPES.find((t) => t.value === type)?.color || 'bg-gray-100 text-gray-700';
  };

  const getEntryTypeLabel = (type: string) => {
    return ENTRY_TYPES.find((t) => t.value === type)?.label || type;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-2">Client Knowledge Base</h1>
        <p className="text-lg text-text-medium">
          Store key information about your client to inform content generation
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium w-5 h-5" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
            >
              <option value="all">All Types</option>
              {ENTRY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Add Button */}
            <button
              onClick={handleAddNew}
              className="gradient-primary text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Entry
            </button>
          </div>
        </div>
      </div>

      {/* Entries List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-medium"></div>
          <p className="text-text-medium mt-4">Loading knowledge entries...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
          <p className="text-text-medium text-lg mb-4">
            {searchQuery || filterType !== 'all'
              ? 'No entries match your filters'
              : 'No knowledge entries yet'}
          </p>
          {!searchQuery && filterType === 'all' && (
            <button
              onClick={handleAddNew}
              className="gradient-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Entry
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-light"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-dark text-lg mb-2">{entry.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEntryTypeColor(entry.entry_type)}`}>
                    {getEntryTypeLabel(entry.entry_type)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 text-purple-medium hover:bg-purple-light/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <p className="text-text-medium text-sm mb-4 line-clamp-3">{entry.content}</p>

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs flex items-center gap-1"
                    >
                      <TagIcon className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-dark">
                {editingEntry ? 'Edit Knowledge Entry' : 'Add Knowledge Entry'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                  placeholder="e.g., Client's TED Talk on Leadership"
                />
              </div>

              {/* Entry Type */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Entry Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.entry_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      entry_type: e.target.value as BPClientKnowledge['entry_type'],
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                >
                  {ENTRY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium resize-none"
                  placeholder="Enter the knowledge content here... (transcripts, product details, stories, etc.)"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-medium"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-medium text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-text-dark rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                {editingEntry ? 'Update Entry' : 'Create Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
