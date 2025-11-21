'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, Sparkles, CheckCircle2 } from '@/components/Icon';
import { toast } from 'sonner';

interface IntakeFormData {
  // Contact Information
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;

  // Business Overview
  business_overview: string;
  primary_goals: string[];
  key_metrics: string;

  // Target Audience
  demographics: string;
  psychographics: string;
  customer_journey: string;
  common_challenges: string;

  // Brand Identity
  brand_personality: string;
  tone_voice: string;
  unique_value: string;
  visual_guidelines: string;

  // Social Media
  current_platforms: Record<string, { followers: string; engagement: string }>;
  resonating_content: string;

  // Competitors
  main_competitors: string[];
  doing_well_accounts: string;
  admired_brands: string;

  // Content Strategy
  comfortable_featuring_people: string;
  upcoming_campaigns: string;

  // SEO
  primary_keywords: string[];
  secondary_keywords: string;
  seo_goals: string;

  // Challenges & Expectations
  current_challenges: string;
  expectations: string;
}

const GOAL_OPTIONS = [
  'Increase brand awareness',
  'Generate leads',
  'Drive sales',
  'Build community',
  'Educate audience',
  'Establish thought leadership',
];

const PLATFORM_OPTIONS = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X (Twitter)', 'Facebook'];

export default function ClientIntakePage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  const [formData, setFormData] = useState<IntakeFormData>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    company: '',
    business_overview: '',
    primary_goals: [],
    key_metrics: '',
    demographics: '',
    psychographics: '',
    customer_journey: '',
    common_challenges: '',
    brand_personality: '',
    tone_voice: '',
    unique_value: '',
    visual_guidelines: '',
    current_platforms: {},
    resonating_content: '',
    main_competitors: [],
    doing_well_accounts: '',
    admired_brands: '',
    comfortable_featuring_people: '',
    upcoming_campaigns: '',
    primary_keywords: [],
    secondary_keywords: '',
    seo_goals: '',
    current_challenges: '',
    expectations: '',
  });

  const [progress, setProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Calculate completion percentage
  const calculateProgress = useCallback((data: IntakeFormData) => {
    const fields = [
      data.first_name,
      data.last_name,
      data.email,
      data.company,
      data.business_overview,
      data.primary_goals.length > 0,
      data.key_metrics,
      data.demographics,
      data.psychographics,
      data.customer_journey,
      data.common_challenges,
      data.brand_personality,
      data.tone_voice,
      data.unique_value,
      Object.keys(data.current_platforms).length > 0,
      data.resonating_content,
      data.main_competitors.length > 0,
      data.doing_well_accounts,
      data.comfortable_featuring_people,
      data.primary_keywords.length > 0,
      data.seo_goals,
      data.current_challenges,
      data.expectations,
    ];

    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }, []);

  // Load existing intake data
  useEffect(() => {
    const loadIntakeData = async () => {
      try {
        const response = await fetch(`/api/blueprints/intake?projectId=${projectId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.intake) {
            setFormData({
              ...formData,
              ...data.intake,
              primary_goals: data.intake.primary_goals || [],
              main_competitors: data.intake.main_competitors || [],
              primary_keywords: data.intake.primary_keywords || [],
              current_platforms: data.intake.current_platforms || {},
            });
          }
        }
      } catch (error) {
        console.error('Error loading intake data:', error);
      }
    };

    loadIntakeData();
  }, [projectId]);

  // Update progress when form data changes
  useEffect(() => {
    const newProgress = calculateProgress(formData);
    setProgress(newProgress);
  }, [formData, calculateProgress]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (progress > 0) {
        handleSave(true);
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [formData, progress]);

  const handleSave = async (silent = false) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/blueprints/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          ...formData,
          completion_percentage: progress,
        }),
      });

      if (response.ok) {
        setLastSaved(new Date());
        if (!silent) {
          toast.success('Draft saved successfully');
        }
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateBrandOverview = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/blueprints/generate-brand-overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (response.ok) {
        toast.success('Brand overview generated successfully!');
        router.push(`/blueprints/${projectId}/brand-overview`);
      } else {
        throw new Error('Failed to generate');
      }
    } catch (error) {
      toast.error('Failed to generate brand overview');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateField = (field: keyof IntakeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      primary_goals: prev.primary_goals.includes(goal)
        ? prev.primary_goals.filter((g) => g !== goal)
        : [...prev.primary_goals, goal],
    }));
  };

  const updatePlatform = (platform: string, field: 'followers' | 'engagement', value: string) => {
    setFormData((prev) => ({
      ...prev,
      current_platforms: {
        ...prev.current_platforms,
        [platform]: {
          ...prev.current_platforms[platform],
          [field]: value,
        },
      },
    }));
  };

  const addCompetitor = () => {
    setFormData((prev) => ({
      ...prev,
      main_competitors: [...prev.main_competitors, ''],
    }));
  };

  const updateCompetitor = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      main_competitors: prev.main_competitors.map((c, i) => (i === index ? value : c)),
    }));
  };

  const removeCompetitor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      main_competitors: prev.main_competitors.filter((_, i) => i !== index),
    }));
  };

  const addKeyword = () => {
    setFormData((prev) => ({
      ...prev,
      primary_keywords: [...prev.primary_keywords, ''],
    }));
  };

  const updateKeyword = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      primary_keywords: prev.primary_keywords.map((k, i) => (i === index ? value : k)),
    }));
  };

  const removeKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      primary_keywords: prev.primary_keywords.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-dark mb-2">Client Intake Form</h1>
        <p className="text-lg text-text-medium">
          Please provide detailed information to help us create the perfect content strategy
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Completion Progress</span>
          <span className="text-sm font-bold text-purple-dark">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="gradient-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {lastSaved && (
          <p className="text-xs text-gray-500 mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Form */}
      <form className="space-y-8">
        {/* Section 1: Contact Information */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              1
            </span>
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => updateField('first_name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => updateField('last_name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company/Brand Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                placeholder="Acme Inc."
              />
            </div>
          </div>
        </div>

        {/* Section 2: Business Overview */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              2
            </span>
            Business Overview
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe your business in 2-3 sentences *
              </label>
              <textarea
                value={formData.business_overview}
                onChange={(e) => updateField('business_overview', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What does your business do? Who do you serve? What makes you unique?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Primary Goals (Select all that apply) *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-purple-light transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.primary_goals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                      className="w-5 h-5 text-purple-medium rounded focus:ring-purple-light"
                    />
                    <span className="text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Key Metrics for Success *
              </label>
              <textarea
                value={formData.key_metrics}
                onChange={(e) => updateField('key_metrics', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="How do you measure success? (e.g., followers, engagement rate, conversions, revenue)"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Target Audience */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              3
            </span>
            Target Audience
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Demographics *
              </label>
              <textarea
                value={formData.demographics}
                onChange={(e) => updateField('demographics', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Age range, gender, location, income level, education, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Psychographics *
              </label>
              <textarea
                value={formData.psychographics}
                onChange={(e) => updateField('psychographics', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Interests, values, lifestyle, goals, pain points, behaviors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Journey
              </label>
              <textarea
                value={formData.customer_journey}
                onChange={(e) => updateField('customer_journey', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="How do customers typically discover you and make a purchase decision?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Common Challenges *
              </label>
              <textarea
                value={formData.common_challenges}
                onChange={(e) => updateField('common_challenges', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What problems or challenges does your target audience face?"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Brand Identity */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              4
            </span>
            Brand Identity
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand Personality *
              </label>
              <textarea
                value={formData.brand_personality}
                onChange={(e) => updateField('brand_personality', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="If your brand was a person, how would you describe them? (e.g., professional, playful, inspiring, authoritative)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tone of Voice *
              </label>
              <textarea
                value={formData.tone_voice}
                onChange={(e) => updateField('tone_voice', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="How should your brand communicate? Formal or casual? Serious or humorous? Educational or entertaining?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unique Value Proposition *
              </label>
              <textarea
                value={formData.unique_value}
                onChange={(e) => updateField('unique_value', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What makes your brand different from competitors? Why should customers choose you?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visual Guidelines
              </label>
              <textarea
                value={formData.visual_guidelines}
                onChange={(e) => updateField('visual_guidelines', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Brand colors, fonts, imagery style, logo usage guidelines"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Social Media Presence */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              5
            </span>
            Social Media Presence
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Current Platforms *
              </label>
              <div className="space-y-4">
                {PLATFORM_OPTIONS.map((platform) => (
                  <div key={platform} className="flex items-center space-x-4">
                    <div className="w-32">
                      <span className="text-sm font-medium text-gray-700">{platform}</span>
                    </div>
                    <input
                      type="text"
                      value={formData.current_platforms[platform]?.followers || ''}
                      onChange={(e) => updatePlatform(platform, 'followers', e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-medium focus:outline-none transition-colors"
                      placeholder="Followers"
                    />
                    <input
                      type="text"
                      value={formData.current_platforms[platform]?.engagement || ''}
                      onChange={(e) => updatePlatform(platform, 'engagement', e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-medium focus:outline-none transition-colors"
                      placeholder="Avg. Engagement Rate"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What content is currently resonating? *
              </label>
              <textarea
                value={formData.resonating_content}
                onChange={(e) => updateField('resonating_content', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Which posts/videos get the most engagement? What topics or formats work best?"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Competitors & Inspiration */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              6
            </span>
            Competitors & Inspiration
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Main Competitors *
              </label>
              <div className="space-y-3">
                {formData.main_competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={competitor}
                      onChange={(e) => updateCompetitor(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                      placeholder="Competitor name or @handle"
                    />
                    <button
                      type="button"
                      onClick={() => removeCompetitor(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCompetitor}
                  className="px-4 py-2 text-purple-medium hover:bg-purple-50 rounded-xl transition-colors text-sm font-semibold"
                >
                  + Add Competitor
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Accounts Doing Well in Your Niche *
              </label>
              <textarea
                value={formData.doing_well_accounts}
                onChange={(e) => updateField('doing_well_accounts', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="List social media accounts in your niche that are crushing it. What do they do well?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brands You Admire (Any Industry)
              </label>
              <textarea
                value={formData.admired_brands}
                onChange={(e) => updateField('admired_brands', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Which brands (in or out of your industry) inspire you? Why?"
              />
            </div>
          </div>
        </div>

        {/* Section 7: Content Strategy */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              7
            </span>
            Content Strategy
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Are you comfortable featuring people in your content? *
              </label>
              <select
                value={formData.comfortable_featuring_people}
                onChange={(e) => updateField('comfortable_featuring_people', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
              >
                <option value="">Select an option</option>
                <option value="yes-founder">Yes, I (the founder) will appear on camera</option>
                <option value="yes-team">Yes, team members will appear</option>
                <option value="yes-ugc">Yes, we'll use user-generated content</option>
                <option value="prefer-not">Prefer not to show faces</option>
                <option value="no-voiceover">No, voiceover + B-roll only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upcoming Campaigns or Launches
              </label>
              <textarea
                value={formData.upcoming_campaigns}
                onChange={(e) => updateField('upcoming_campaigns', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Any upcoming product launches, campaigns, or seasonal promotions we should plan content around?"
              />
            </div>
          </div>
        </div>

        {/* Section 8: SEO & Keywords */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              8
            </span>
            SEO & Keywords
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Primary Keywords *
              </label>
              <div className="space-y-3">
                {formData.primary_keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => updateKeyword(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors"
                      placeholder="e.g., digital marketing, fitness tips, real estate investing"
                    />
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 text-purple-medium hover:bg-purple-50 rounded-xl transition-colors text-sm font-semibold"
                >
                  + Add Keyword
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Secondary Keywords
              </label>
              <textarea
                value={formData.secondary_keywords}
                onChange={(e) => updateField('secondary_keywords', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="Additional keywords or phrases related to your business (comma separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SEO Goals *
              </label>
              <textarea
                value={formData.seo_goals}
                onChange={(e) => updateField('seo_goals', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What do you want to rank for? What search terms bring you the most valuable traffic?"
              />
            </div>
          </div>
        </div>

        {/* Section 9: Challenges & Expectations */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center mr-3 text-sm">
              9
            </span>
            Challenges & Expectations
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Content Challenges *
              </label>
              <textarea
                value={formData.current_challenges}
                onChange={(e) => updateField('current_challenges', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What challenges are you facing with content creation? (e.g., lack of time, running out of ideas, low engagement, inconsistent posting)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expectations & Success Criteria *
              </label>
              <textarea
                value={formData.expectations}
                onChange={(e) => updateField('expectations', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-medium focus:outline-none transition-colors resize-none"
                placeholder="What does success look like to you? What are your expectations from this content strategy?"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-background-light py-6">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateBrandOverview}
            disabled={progress < 50 || isGenerating}
            className="flex items-center space-x-2 px-6 py-3 gradient-primary text-white rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">
              {isGenerating ? 'Generating...' : 'Generate Brand Overview'}
            </span>
          </button>
        </div>

        {progress < 50 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Complete at least 50% of the form to generate the brand
              overview. Current progress: {progress}%
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
