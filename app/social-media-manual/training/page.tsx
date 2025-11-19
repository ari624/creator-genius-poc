'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Filter, Copy, Check, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  insight_count: number;
  order_index: number;
}

interface Insight {
  id: string;
  category_id: string;
  insight_number: number;
  content: string;
  category_name: string;
}

export default function TrainingManualPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [importStatus, setImportStatus] = useState<{imported: boolean, categoryCount: number, insightCount: number} | null>(null);

  // Load categories and check import status
  useEffect(() => {
    loadCategories();
    checkImportStatus();
  }, []);

  // Load insights when filters change
  useEffect(() => {
    loadInsights();
  }, [selectedCategories, searchQuery, page]);

  const checkImportStatus = async () => {
    try {
      const response = await fetch('/api/training/import');
      const result = await response.json();
      setImportStatus(result);
    } catch (error) {
      console.error('Error checking import status:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/training/categories');
      const result = await response.json();

      if (result.success) {
        setCategories(result.categories || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const loadInsights = async () => {
    try {
      setSearchLoading(true);
      const params = new URLSearchParams();

      if (selectedCategories.length > 0) {
        params.set('categories', selectedCategories.join(','));
      }

      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }

      params.set('page', page.toString());
      params.set('limit', '50');

      const response = await fetch(`/api/training/insights?${params}`);
      const result = await response.json();

      if (result.success) {
        setInsights(result.insights || []);
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error('Error loading insights:', error);
      toast.error('Failed to load insights');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setPage(1);
  };

  const copyInsight = async (insight: Insight) => {
    try {
      await navigator.clipboard.writeText(`[Insight #${insight.insight_number}]\n\n${insight.content}`);
      setCopiedId(insight.id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileContent = await file.text();

      const response = await fetch('/api/training/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileContent,
          fileName: file.name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Imported ${result.categoriesImported} categories and ${result.insightsImported} insights!`);
        loadCategories();
        loadInsights();
        checkImportStatus();
      } else {
        toast.error(result.error || 'Failed to import file');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setLoading(false);
      event.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-purple-medium" />
      </div>
    );
  }

  // Import screen if no data
  if (!importStatus?.imported) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <BookOpen className="w-20 h-20 text-purple-medium mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-text-dark mb-2">Social Media Training Manual</h1>
          <p className="text-lg text-text-medium">
            Import your training manual to access 2,520 insights from 795 video scripts
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Import Training Manual</h2>

          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-purple-medium mb-3" />
              <p className="mb-2 text-sm text-text-dark font-semibold">
                Click to upload Social_Media_Training_FINAL.md
              </p>
              <p className="text-xs text-text-medium">Markdown file (.md)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".md"
              onChange={handleFileUpload}
            />
          </label>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2">Expected Format:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 12 main categories (## CATEGORY NAME)</li>
              <li>• 2,520 numbered insights (### NUMBER.)</li>
              <li>• Video script transcripts as insight content</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <BookOpen className="w-10 h-10 text-purple-medium" />
          <h1 className="text-4xl font-bold text-text-dark">Social Media Training Manual</h1>
        </div>
        <p className="text-lg text-text-medium">
          {importStatus?.insightCount.toLocaleString()} insights from {categories.length} categories
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium w-5 h-5" />
            <input
              type="text"
              placeholder="Search all insights..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-medium focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-light transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>
                {selectedCategories.length === 0
                  ? 'All Categories'
                  : `${selectedCategories.length} Selected`}
              </span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'bg-purple-medium text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.insight_count})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {searchLoading ? (
        <div className="text-center py-12">
          <Loader2 className="inline-block animate-spin h-12 w-12 text-purple-medium mb-4" />
          <p className="text-text-medium">Searching insights...</p>
        </div>
      ) : insights.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
          <p className="text-text-medium text-lg">
            {searchQuery || selectedCategories.length > 0
              ? 'No insights match your search'
              : 'No insights available'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-light cursor-pointer"
                onClick={() => setSelectedInsight(insight)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                      #{insight.insight_number}
                    </span>
                    <span className="text-sm text-text-medium">{insight.category_name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyInsight(insight);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedId === insight.id ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                <p className="text-text-dark line-clamp-4 leading-relaxed">
                  {insight.content}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-text-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                    Insight #{selectedInsight.insight_number}
                  </span>
                  <span className="text-text-medium">{selectedInsight.category_name}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyInsight(selectedInsight);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-medium text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                {copiedId === selectedInsight.id ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-text-dark whitespace-pre-wrap leading-relaxed">
                {selectedInsight.content}
              </p>
            </div>

            <button
              onClick={() => setSelectedInsight(null)}
              className="w-full mt-6 px-6 py-3 border-2 border-gray-300 text-text-dark rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
