-- ============================================================================
-- CREATOR GENIUS PLATFORM - DATABASE SCHEMAS
-- Three separate systems: Social Media Manual, Client Analyzer, Blueprint Generator
-- ============================================================================

-- ============================================================================
-- SYSTEM 1: SOCIAL MEDIA MANUAL
-- ============================================================================

CREATE TABLE sm_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX idx_sm_insights_domain ON sm_insights(domain);
CREATE INDEX idx_sm_insights_status ON sm_insights(status);
CREATE INDEX idx_sm_insights_priority ON sm_insights(priority);

CREATE TABLE sm_video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_url TEXT NOT NULL,
  video_name TEXT,
  transcript TEXT NOT NULL,
  caption TEXT,
  processed BOOLEAN DEFAULT false,
  insights_extracted BOOLEAN DEFAULT false,
  insight_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sm_insight_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  related_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sm_insight_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES sm_insights(id) ON DELETE CASCADE,
  old_text TEXT,
  new_text TEXT,
  change_type TEXT NOT NULL,
  changed_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- SYSTEM 2: CLIENT ANALYZER
-- ============================================================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  niche TEXT NOT NULL,
  description TEXT,
  social_handles JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE client_content (
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

CREATE INDEX idx_client_content_client ON client_content(client_id);

CREATE TABLE client_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  pattern_type TEXT NOT NULL,
  pattern_name TEXT NOT NULL,
  template_text TEXT NOT NULL,
  variables JSONB NOT NULL,
  examples TEXT[],
  source_post_ids UUID[],
  occurrence_count INTEGER,
  avg_performance JSONB,
  use_cases TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_patterns_client ON client_patterns(client_id);
CREATE INDEX idx_client_patterns_type ON client_patterns(pattern_type);

CREATE TABLE client_visuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  content_id UUID REFERENCES client_content(id) ON DELETE CASCADE,
  visual_elements TEXT[],
  text_overlays JSONB,
  composition JSONB,
  colors JSONB,
  emotional_tone TEXT,
  pattern_matches UUID[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE client_hooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  hook_text TEXT NOT NULL,
  hook_type TEXT,
  template_version TEXT,
  variables JSONB,
  source_post_id UUID REFERENCES client_content(id),
  performance_score DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_hooks_client ON client_hooks(client_id);

CREATE TABLE client_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  posts_analyzed INTEGER,
  patterns_found INTEGER,
  hooks_extracted INTEGER,
  visuals_analyzed INTEGER,
  processing_time INTEGER,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- SYSTEM 3: BLUEPRINT GENERATOR
-- ============================================================================

CREATE TABLE bp_projects (
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

CREATE TABLE bp_research_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL,
  source_file TEXT,
  content JSONB,
  analyzed BOOLEAN DEFAULT false,
  analysis_results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_research_project ON bp_research_data(project_id);

CREATE TABLE bp_content_ideas (
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

CREATE INDEX idx_ideas_project ON bp_content_ideas(project_id);
CREATE INDEX idx_ideas_status ON bp_content_ideas(status);

CREATE TABLE bp_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE,
  content_idea_id UUID REFERENCES bp_content_ideas(id),
  blueprint_number INTEGER,
  title TEXT NOT NULL,
  internal_title TEXT,
  video_goal TEXT,
  target_audience TEXT,
  hook_spoken TEXT,
  hook_overlay TEXT,
  script_table JSONB,
  script_teleprompter TEXT,
  caption_instagram TEXT,
  caption_tiktok TEXT,
  caption_youtube TEXT,
  caption_x TEXT,
  caption_threads TEXT,
  caption_linkedin TEXT,
  youtube_title TEXT,
  overlay_text TEXT,
  seo_keywords TEXT[],
  broll_prompts JSONB,
  post_type TEXT,
  sub_niche TEXT,
  reference_links TEXT[],
  creative_notes TEXT,
  knowledge_sources JSONB,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_blueprints_project ON bp_blueprints(project_id);
CREATE INDEX idx_blueprints_idea ON bp_blueprints(content_idea_id);

CREATE TABLE bp_knowledge_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blueprint_id UUID REFERENCES bp_blueprints(id) ON DELETE CASCADE,
  source_system TEXT NOT NULL,
  source_id UUID,
  reference_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bp_client_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  company TEXT,
  business_overview TEXT,
  primary_goals TEXT[],
  key_metrics TEXT,
  demographics TEXT,
  psychographics TEXT,
  customer_journey TEXT,
  common_challenges TEXT,
  brand_personality TEXT,
  tone_voice TEXT,
  unique_value TEXT,
  visual_guidelines TEXT,
  current_platforms JSONB,
  resonating_content TEXT,
  main_competitors TEXT[],
  doing_well_accounts TEXT,
  admired_brands TEXT,
  comfortable_featuring_people TEXT,
  upcoming_campaigns TEXT,
  primary_keywords TEXT[],
  secondary_keywords TEXT,
  seo_goals TEXT,
  current_challenges TEXT,
  expectations TEXT,
  completion_percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_intake_project ON bp_client_intake(project_id);
