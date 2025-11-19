-- ============================================================================
-- SOCIAL MEDIA TRAINING MANUAL - DATABASE SCHEMA
-- ============================================================================
-- Stores 2,520 insights from 795 video scripts organized into 12 categories
-- ============================================================================

-- Categories table (12 main sections)
CREATE TABLE IF NOT EXISTS training_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  insight_count INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insights table (2,520 video script insights)
CREATE TABLE IF NOT EXISTS training_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES training_categories(id) ON DELETE CASCADE,
  insight_number INTEGER NOT NULL UNIQUE,
  content TEXT NOT NULL,
  category_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User bookmarks (optional feature)
CREATE TABLE IF NOT EXISTS training_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Can link to auth system later
  insight_id UUID REFERENCES training_insights(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, insight_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_insights_category ON training_insights(category_id);
CREATE INDEX IF NOT EXISTS idx_insights_number ON training_insights(insight_number);
CREATE INDEX IF NOT EXISTS idx_insights_content_search ON training_insights USING gin(to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON training_bookmarks(user_id);

-- Full-text search function
CREATE OR REPLACE FUNCTION search_training_insights(search_query TEXT)
RETURNS TABLE (
  id UUID,
  category_id UUID,
  insight_number INTEGER,
  content TEXT,
  category_name TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ti.id,
    ti.category_id,
    ti.insight_number,
    ti.content,
    ti.category_name,
    ts_rank(to_tsvector('english', ti.content), plainto_tsquery('english', search_query)) as rank
  FROM training_insights ti
  WHERE to_tsvector('english', ti.content) @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC, ti.insight_number ASC;
END;
$$ LANGUAGE plpgsql;

-- Verification queries
SELECT 'Training Categories Table' as table_name, COUNT(*) as row_count FROM training_categories
UNION ALL
SELECT 'Training Insights Table', COUNT(*) FROM training_insights;
