-- ============================================================================
-- UPDATE: Make Research Data PROJECT-SPECIFIC
-- ============================================================================
-- This update adds project_id to video transcripts and insights tables
-- so each project has its own isolated research dataset
-- ============================================================================

-- Add project_id to sm_video_transcripts
ALTER TABLE sm_video_transcripts
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE;

-- Add project_id to sm_insights
ALTER TABLE sm_insights
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE;

-- Create indexes for faster project-specific queries
CREATE INDEX IF NOT EXISTS idx_sm_transcripts_project ON sm_video_transcripts(project_id);
CREATE INDEX IF NOT EXISTS idx_sm_insights_project ON sm_insights(project_id);

-- Add video metadata columns for ViralFindr data
ALTER TABLE sm_video_transcripts
ADD COLUMN IF NOT EXISTS video_creator TEXT,
ADD COLUMN IF NOT EXISTS video_views BIGINT,
ADD COLUMN IF NOT EXISTS video_likes INTEGER,
ADD COLUMN IF NOT EXISTS video_comments INTEGER,
ADD COLUMN IF NOT EXISTS video_shares INTEGER,
ADD COLUMN IF NOT EXISTS video_saves INTEGER,
ADD COLUMN IF NOT EXISTS video_platform TEXT,
ADD COLUMN IF NOT EXISTS video_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS niche TEXT,
ADD COLUMN IF NOT EXISTS source_file TEXT;

-- Update bp_research_data to include more metadata
COMMENT ON TABLE bp_research_data IS 'Stores uploaded ViralFindr Excel/CSV files and processing status';

-- Verification query
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'sm_video_transcripts'
  AND column_name IN ('project_id', 'video_creator', 'niche', 'source_file')
ORDER BY column_name;

-- Expected result: All 4 columns should exist
