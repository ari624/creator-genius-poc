-- ============================================================================
-- CREATOR GENIUS PLATFORM - COMPLETE DATABASE SETUP
-- Run this ONCE in Supabase SQL Editor to create all tables
-- ============================================================================

-- ============================================================================
-- PART 1: BLUEPRINT GENERATOR TABLES
-- ============================================================================

-- Projects table (required for all blueprint features)
CREATE TABLE IF NOT EXISTS bp_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client_name TEXT,
  industry TEXT,
  status TEXT DEFAULT 'active',
  brand_overview JSONB,
  gpt_system_notes JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Client Intake Form (27-question form for gathering client information)
CREATE TABLE IF NOT EXISTS bp_client_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE UNIQUE,

  -- Contact Information
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  company TEXT,

  -- Business Overview
  business_overview TEXT,
  primary_goals TEXT[],
  key_metrics TEXT,

  -- Target Audience
  demographics TEXT,
  psychographics TEXT,
  customer_journey TEXT,
  common_challenges TEXT,

  -- Brand Identity
  brand_personality TEXT,
  tone_voice TEXT,
  unique_value TEXT,
  visual_guidelines TEXT,

  -- Social Media Presence
  current_platforms JSONB,
  resonating_content TEXT,

  -- Competitors & Inspiration
  main_competitors TEXT[],
  doing_well_accounts TEXT,
  admired_brands TEXT,

  -- Content Strategy
  comfortable_featuring_people TEXT,
  upcoming_campaigns TEXT,

  -- SEO & Keywords
  primary_keywords TEXT[],
  secondary_keywords TEXT,
  seo_goals TEXT,

  -- Challenges & Expectations
  current_challenges TEXT,
  expectations TEXT,

  -- Metadata
  completion_percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_intake_project ON bp_client_intake(project_id);

-- Client Knowledge Base (stores talks, products, stories, expertise)
CREATE TABLE IF NOT EXISTS bp_client_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  entry_type TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_project ON bp_client_knowledge(project_id);

-- Research Data (ViralFindr uploads, manual research)
CREATE TABLE IF NOT EXISTS bp_research_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL,
  source_file TEXT,
  content JSONB,
  analyzed BOOLEAN DEFAULT false,
  analysis_results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_research_project ON bp_research_data(project_id);

-- Content Ideas (generated ideas for review/approval)
CREATE TABLE IF NOT EXISTS bp_content_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  idea_number INTEGER,
  internal_title TEXT NOT NULL,
  topic TEXT NOT NULL,
  clickbait_overlay TEXT NOT NULL,
  hook_sentence TEXT NOT NULL,
  keywords TEXT[],
  products_mentioned JSONB,
  context_notes TEXT,
  sub_niche TEXT,
  post_type TEXT,
  status TEXT DEFAULT 'pending',
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ideas_project ON bp_content_ideas(project_id);
CREATE INDEX IF NOT EXISTS idx_ideas_status ON bp_content_ideas(status);

-- Blueprints (final production-ready content)
CREATE TABLE IF NOT EXISTS bp_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  content_idea_id UUID REFERENCES bp_content_ideas(id),
  blueprint_number INTEGER,
  title TEXT NOT NULL,
  internal_title TEXT,

  -- Video Production
  video_goal TEXT,
  target_audience TEXT,
  hook_spoken TEXT,
  hook_overlay TEXT,
  script_table JSONB,
  script_teleprompter TEXT,

  -- Platform-Specific Captions
  caption_instagram TEXT,
  caption_tiktok TEXT,
  caption_youtube TEXT,
  caption_x TEXT,
  caption_threads TEXT,
  caption_linkedin TEXT,

  -- Additional Content
  youtube_title TEXT,
  overlay_text TEXT,
  seo_keywords TEXT[],
  broll_prompts JSONB,

  -- Metadata
  post_type TEXT,
  sub_niche TEXT,
  reference_links TEXT[],
  creative_notes TEXT,
  knowledge_sources JSONB,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blueprints_project ON bp_blueprints(project_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_idea ON bp_blueprints(content_idea_id);

-- Knowledge References (links blueprints to knowledge sources)
CREATE TABLE IF NOT EXISTS bp_knowledge_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blueprint_id UUID REFERENCES bp_blueprints(id) ON DELETE CASCADE,
  source_system TEXT NOT NULL,
  source_id UUID,
  reference_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- PART 2: SOCIAL MEDIA MANUAL TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS sm_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  sub_domains TEXT[],
  insight_text TEXT NOT NULL,
  insight_type TEXT NOT NULL,
  specificity TEXT NOT NULL,
  platforms TEXT[],
  priority TEXT NOT NULL,
  confidence TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'current',
  added_date TIMESTAMP DEFAULT NOW(),
  updated_date TIMESTAMP DEFAULT NOW(),
  superseded_by UUID REFERENCES sm_insights(id),
  source_type TEXT,
  source_reference TEXT,
  video_url TEXT,
  rating INTEGER,
  application TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sm_insights_domain ON sm_insights(domain);
CREATE INDEX IF NOT EXISTS idx_sm_insights_status ON sm_insights(status);
CREATE INDEX IF NOT EXISTS idx_sm_insights_priority ON sm_insights(priority);
CREATE INDEX IF NOT EXISTS idx_sm_insights_project ON sm_insights(project_id);

CREATE TABLE IF NOT EXISTS sm_video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_name TEXT,
  transcript TEXT NOT NULL,
  caption TEXT,
  processed BOOLEAN DEFAULT false,
  insights_extracted BOOLEAN DEFAULT false,
  insight_count INTEGER DEFAULT 0,
  -- ViralFindr metadata
  video_creator TEXT,
  video_views BIGINT,
  video_likes INTEGER,
  video_comments INTEGER,
  video_shares INTEGER,
  video_saves INTEGER,
  video_platform TEXT,
  video_date TIMESTAMP,
  niche TEXT,
  source_file TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sm_transcripts_project ON sm_video_transcripts(project_id);

CREATE TABLE IF NOT EXISTS sm_insight_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  related_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sm_insight_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  old_text TEXT,
  new_text TEXT,
  change_type TEXT NOT NULL,
  changed_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- PART 3: TRAINING MANUAL TABLES (2,520 Insights)
-- ============================================================================

CREATE TABLE IF NOT EXISTS training_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  insight_count INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS training_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES training_categories(id) ON DELETE CASCADE,
  insight_number INTEGER NOT NULL UNIQUE,
  content TEXT NOT NULL,
  category_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_insights_category ON training_insights(category_id);
CREATE INDEX IF NOT EXISTS idx_insights_content_search ON training_insights USING gin(to_tsvector('english', content));

CREATE TABLE IF NOT EXISTS training_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES training_insights(id) ON DELETE CASCADE,
  user_id TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- PART 4: CLIENT ANALYZER TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  niche TEXT NOT NULL,
  description TEXT,
  social_handles JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  post_url TEXT,
  video_url TEXT,
  display_url TEXT,
  caption TEXT,
  script TEXT,
  hashtags TEXT[],
  post_date TIMESTAMP,
  likes INTEGER,
  comments INTEGER,
  views INTEGER,
  shares INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_content_client ON client_content(client_id);

-- ============================================================================
-- VERIFICATION: Check all tables were created
-- ============================================================================

SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND (table_name LIKE 'bp_%' OR table_name LIKE 'sm_%' OR table_name LIKE 'training_%' OR table_name = 'clients' OR table_name = 'client_content')
ORDER BY table_name;

-- Expected tables:
-- bp_blueprints
-- bp_client_intake
-- bp_client_knowledge
-- bp_content_ideas
-- bp_knowledge_references
-- bp_projects
-- bp_research_data
-- client_content
-- clients
-- sm_insight_relationships
-- sm_insight_versions
-- sm_insights
-- sm_video_transcripts
-- training_bookmarks
-- training_categories
-- training_insights
