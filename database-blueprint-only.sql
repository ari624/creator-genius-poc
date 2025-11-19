-- ============================================================================
-- BLUEPRINT GENERATOR - ESSENTIAL TABLES ONLY
-- Run this in Supabase SQL Editor if you only need the Blueprint system
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
-- VERIFICATION QUERIES
-- ============================================================================

-- Check all tables were created
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name LIKE 'bp_%'
ORDER BY table_name;

-- Expected output:
-- bp_blueprints (25 columns)
-- bp_client_intake (29 columns)
-- bp_client_knowledge (7 columns)
-- bp_content_ideas (16 columns)
-- bp_knowledge_references (5 columns)
-- bp_projects (9 columns)
-- bp_research_data (8 columns)
