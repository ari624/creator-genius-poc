// ============================================================================
// SYSTEM 1: SOCIAL MEDIA MANUAL TYPES
// ============================================================================

export interface SMInsight {
  id: string;
  domain: string;
  sub_domains: string[];
  insight_text: string;
  insight_type: string;
  specificity: string;
  platforms: string[];
  priority: string;
  confidence: string;
  status: string;
  added_date: string;
  updated_date: string;
  superseded_by?: string;
  source_type?: string;
  source_reference?: string;
  video_url?: string;
  rating?: number;
  application?: string;
  tags: string[];
  created_at: string;
}

export interface SMVideoTranscript {
  id: string;
  video_url: string;
  video_name?: string;
  transcript: string;
  caption?: string;
  processed: boolean;
  insights_extracted: boolean;
  insight_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// SYSTEM 2: CLIENT ANALYZER TYPES
// ============================================================================

export interface Client {
  id: string;
  name: string;
  niche: string;
  description?: string;
  social_handles?: Record<string, string>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ClientContent {
  id: string;
  client_id: string;
  post_url?: string;
  video_url?: string;
  display_url?: string;
  caption?: string;
  script?: string;
  hashtags: string[];
  post_date?: string;
  likes?: number;
  comments?: number;
  views?: number;
  shares?: number;
  created_at: string;
}

export interface ClientPattern {
  id: string;
  client_id: string;
  pattern_type: string;
  pattern_name: string;
  template_text: string;
  variables: Record<string, any>;
  examples: string[];
  source_post_ids: string[];
  occurrence_count?: number;
  avg_performance?: Record<string, any>;
  use_cases: string[];
  notes?: string;
  created_at: string;
}

export interface ClientHook {
  id: string;
  client_id: string;
  hook_text: string;
  hook_type?: string;
  template_version?: string;
  variables?: Record<string, any>;
  source_post_id?: string;
  performance_score?: number;
  created_at: string;
}

export interface ClientVisual {
  id: string;
  client_id: string;
  content_id: string;
  visual_elements: string[];
  text_overlays?: Record<string, any>;
  composition?: Record<string, any>;
  colors?: Record<string, any>;
  emotional_tone?: string;
  pattern_matches: string[];
  created_at: string;
}

// ============================================================================
// SYSTEM 3: BLUEPRINT GENERATOR TYPES
// ============================================================================

export interface BPProject {
  id: string;
  name: string;
  client_name?: string;
  industry?: string;
  status: string;
  brand_overview?: BrandOverview;
  gpt_system_notes?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BrandOverview {
  brand_name: string;
  primary_niche: string;
  sub_niches: string[];
  industry: string;
  target_audience: string;
  brand_voice: string;
  key_products: Array<{ name: string; description: string; url?: string }>;
  unique_selling_points: string[];
  goals: string[];
  content_pillars: string[];
}

export interface BPResearchData {
  id: string;
  project_id: string;
  data_type: string;
  source_file?: string;
  content: Record<string, any>;
  analyzed: boolean;
  analysis_results?: Record<string, any>;
  created_at: string;
}

export interface BPContentIdea {
  id: string;
  project_id: string;
  idea_number: number;
  internal_title: string;
  topic: string;
  clickbait_overlay: string;
  hook_sentence: string;
  keywords: string[];
  products_mentioned: Array<{ name: string; url: string }>;
  context_notes?: string;
  sub_niche?: string;
  post_type: 'value-only' | 'soft-engagement-cta' | 'hard-conversion-cta';
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ScriptRow {
  a_roll: string;
  b_roll: string;
}

export interface BRollPrompt {
  scene_description: string;
  recommended_tool: string;
  prompt: string;
}

export interface BPBlueprint {
  id: string;
  project_id: string;
  content_idea_id?: string;
  blueprint_number?: number;
  title: string;
  internal_title?: string;
  video_goal?: string;
  target_audience?: string;
  hook_spoken?: string;
  hook_overlay?: string;
  script_table: ScriptRow[];
  script_teleprompter: string;
  caption_instagram?: string;
  caption_tiktok?: string;
  caption_youtube?: string;
  caption_x?: string;
  caption_threads?: string;
  caption_linkedin?: string;
  youtube_title?: string;
  overlay_text?: string;
  seo_keywords: string[];
  broll_prompts: BRollPrompt[];
  post_type?: string;
  sub_niche?: string;
  reference_links: string[];
  creative_notes?: string;
  knowledge_sources?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BPClientIntake {
  id: string;
  project_id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  company?: string;
  business_overview?: string;
  primary_goals?: string[];
  key_metrics?: string;
  demographics?: string;
  psychographics?: string;
  customer_journey?: string;
  common_challenges?: string;
  brand_personality?: string;
  tone_voice?: string;
  unique_value?: string;
  visual_guidelines?: string;
  current_platforms?: Record<string, { followers: number; engagement: string }>;
  resonating_content?: string;
  main_competitors?: string[];
  doing_well_accounts?: string;
  admired_brands?: string;
  comfortable_featuring_people?: string;
  upcoming_campaigns?: string;
  primary_keywords?: string[];
  secondary_keywords?: string;
  seo_goals?: string;
  current_challenges?: string;
  expectations?: string;
  completion_percentage: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type Domain =
  | 'Hooks'
  | 'Content Formats'
  | 'Algorithms & Distribution'
  | 'Engagement Strategies'
  | 'Monetization'
  | 'Audience Growth'
  | 'Content Creation'
  | 'Platform-Specific'
  | 'Analytics & Metrics'
  | 'Trends & Timing'
  | 'Visual Design'
  | 'Copywriting'
  | 'Community Management'
  | 'Collaboration'
  | 'Tools & Resources';
