# Creator Genius Platform - Quick Reference Guide

## Database Tables Summary (16 Total)

### Blueprint Generator (7 tables)
- `bp_projects` - Project metadata
- `bp_client_intake` - 27-question client intake form (progress tracking)
- `bp_client_knowledge` - Client knowledge base entries (7 types)
- `bp_research_data` - Uploaded research files (ViralFindr)
- `bp_content_ideas` - AI-generated content ideas
- `bp_blueprints` - Production-ready content with scripts & captions
- `bp_knowledge_references` - Links blueprints to knowledge sources

### Social Media Manual (4 tables)
- `sm_insights` - 2,520+ social media insights
- `sm_video_transcripts` - Transcribed video content
- `sm_insight_relationships` - Insight connections
- `sm_insight_versions` - Change history tracking

### Training Manual (3 tables)
- `training_categories` - 12 knowledge categories
- `training_insights` - 2,520 numbered insights with full-text search
- `training_bookmarks` - User bookmarks (future)

### Client Analyzer (2 tables)
- `clients` - Client profiles (future)
- `client_content` - Client's published content (future)

---

## API Endpoints (13 Total)

### Blueprint API (8 endpoints)
- `GET /blueprints/projects` - List all projects
- `POST /blueprints/projects` - Create project
- `GET /blueprints/intake?projectId={id}` - Load intake form
- `POST /blueprints/intake` - Save intake form (auto-saves every 30s)
- `POST /blueprints/generate-brand-overview` - AI brand generation (Claude)
- `GET /blueprints/knowledge?projectId={id}` - List knowledge entries
- `POST /blueprints/knowledge` - Create knowledge entry
- `GET/PUT/DELETE /blueprints/knowledge/[id]` - Manage knowledge
- `GET /blueprints/research?projectId={id}` - List research files & videos
- `POST /blueprints/research` - Upload research file
- `POST /blueprints/research/transcribe-video` - Transcribe for project

### Social Media Manual API (2 endpoints)
- `POST /manual/transcribe` - Transcribe video (global)
- `GET /manual/transcribe` - List all transcripts

### Training Manual API (3 endpoints)
- `POST /training/import` - Import markdown file (2,520 insights)
- `GET /training/import` - Check import status
- `GET /training/categories` - List all categories
- `GET /training/insights` - Search insights with full-text search

---

## Pages Overview

### Public Pages
```
/                          → Home (platform overview)
/blueprints                → Projects hub
/blueprints/[id]           → Project dashboard
/blueprints/[id]/intake    → 27-question intake form (ACTIVE)
/blueprints/[id]/brand-overview → Brand profile (COMING SOON)
/blueprints/[id]/research  → ViralFindr upload
/blueprints/[id]/knowledge → Knowledge base management
/blueprints/[id]/ideas     → Content ideas (COMING SOON)
/blueprints/[id]/create-blueprint → Blueprint creation (COMING SOON)
/blueprints/[id]/library   → Blueprint library (COMING SOON)
/blueprints/[id]/export    → Export deliverables (COMING SOON)
/blueprints/[id]/settings  → Project settings (COMING SOON)

/client-analyzer           → Client analyzer (COMING SOON)

/social-media-manual       → Training manual hub
/social-media-manual/training → Search 2,520 insights (ACTIVE)
/social-media-manual/transcribe → Video transcription (ACTIVE)
/social-media-manual/browse → Transcript browser
```

---

## AI Integrations

### Anthropic Claude
- **Model**: claude-sonnet-4-20250514
- **Usage**: Brand overview generation
- **Function**: `createClaudeMessage()` or `streamClaudeMessage()`
- **Output**: Structured JSON with brand strategy (name, niches, voice, USPs, goals)

### OpenAI
- **Models**: whisper-1 (transcription), gpt-4o (vision analysis)
- **Usage**: Video transcription, image analysis
- **Functions**: `transcribeAudio()`, `analyzeImage()`, `extractTextFromImage()`

---

## File Processing

### Training Manual Import
- **Input**: Markdown file (.md)
- **Format**: `## Category Name` + `### 1. Insight content`
- **Output**: training_categories + training_insights
- **Special**: Full-text search index on content

### ViralFindr Upload
- **Input**: CSV/Excel file
- **Processing**: Extract video URLs + metadata
- **Output**: bp_research_data (JSONB) + video list for transcription
- **Metadata**: views, likes, comments, shares, platform, date, niche

### Video Transcription
- **Input**: Video URL
- **Processing**: Download → Whisper API → Store transcript
- **Output**: sm_video_transcripts with full transcription
- **Endpoints**: Global `/manual/transcribe` or Project `/blueprints/research/transcribe-video`

---

## Key Features

### Active Features (Fully Implemented)
✅ Project management (create, list, view)
✅ 27-question client intake form with auto-save & progress tracking
✅ Brand overview generation (Claude AI) - requires 50%+ completion
✅ Knowledge base management (7 types of entries)
✅ Research file upload & parsing (ViralFindr)
✅ Video transcription (OpenAI Whisper)
✅ Training manual import (2,520 insights, 12 categories)
✅ Full-text search on training insights
✅ Category filtering & pagination

### Coming Soon
🚧 Content ideas generation
🚧 Blueprint creation with scripts & captions (6 platforms)
🚧 Blueprint library & management
🚧 Export functionality
🚧 Client analyzer (pattern recognition, hook analysis)
🚧 Project settings

---

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# AI Services
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

---

## Data Flow

### Single Project Workflow
```
1. Create Project
   ↓
2. Complete Intake (27 questions)
   ↓
3. Generate Brand Overview (Claude AI)
   ↓
4. Upload ViralFindr Research
   ↓
5. Transcribe Competitor Videos (Whisper)
   ↓
6. Build Knowledge Base (7 entry types)
   ↓
7. Generate Content Ideas (AI) [COMING SOON]
   ↓
8. Create Blueprints (Scripts + 6 captions) [COMING SOON]
   ↓
9. Export Deliverables [COMING SOON]
```

---

## Critical Code Locations

### Database
- Schema: `/DATABASE_SETUP_COMPLETE.sql`
- Client: `/lib/supabase.ts`
- Types: `/lib/types.ts`

### API Routes
- Blueprint: `/app/api/blueprints/*/route.ts`
- Training: `/app/api/training/*/route.ts`
- Manual: `/app/api/manual/*/route.ts`

### Pages
- Projects: `/app/blueprints/page.tsx`
- Intake: `/app/blueprints/[projectId]/intake/page.tsx`
- Training: `/social-media-manual/training/page.tsx`

### AI Integration
- Claude: `/lib/anthropic.ts`
- OpenAI: `/lib/openai.ts`

---

## Test Workflow

1. **Create Project**: `/blueprints` → "New Project"
2. **Fill Intake**: `/blueprints/[id]/intake` → Fill 50%+ → Auto-save
3. **Generate Brand**: Click "Generate Brand Overview" (requires 50%)
4. **Add Knowledge**: `/blueprints/[id]/knowledge` → Add entry
5. **Upload Research**: `/blueprints/[id]/research` → Upload CSV/Excel
6. **Transcribe**: Upload video URL → Transcribe with Whisper
7. **Search Training**: `/social-media-manual/training` → Search insights

---

## Limits & Constraints

- **Intake Form**: 27 questions, requires 50%+ for brand generation
- **Training Insights**: 2,520 total, 12 categories, full-text search with pagination (50 per page)
- **Video Transcription**: Downloads from URL, converts to File object, sends to Whisper
- **Research Upload**: Stores entire JSONB, extracts video URLs automatically
- **Auto-save**: Intake form saves every 30 seconds if progress > 0

---

## Storage Details

### JSONB Fields
- `bp_projects.brand_overview` - AI-generated brand strategy
- `bp_projects.gpt_system_notes` - Claude system prompts
- `bp_client_intake.current_platforms` - {platform: {followers, engagement}}
- `bp_research_data.content` - Entire parsed CSV/Excel as array
- `bp_blueprints.script_table` - [{a_roll, b_roll}]
- `bp_blueprints.broll_prompts` - [{scene_description, recommended_tool, prompt}]
- `clients.social_handles` - {platform: handle}

### Text Arrays
- `bp_client_intake.primary_goals[]`
- `bp_client_intake.main_competitors[]`
- `bp_client_intake.primary_keywords[]`
- `bp_client_knowledge.tags[]`
- `sm_insights.sub_domains[]`
- `sm_insights.platforms[]`
- `sm_insights.tags[]`
- `client_content.hashtags[]`

---

## Performance Considerations

- **Full-text search**: Uses PostgreSQL `tsvector` index on training_insights.content
- **Pagination**: Training insights paginated at 50 per page
- **Auto-save**: Debounced every 30 seconds on intake form
- **Indexes**: Strategic indexes on project_id, status, domain for fast queries
- **JSONB Storage**: Entire research files stored as JSONB (flexible but slower)

---

## Security Notes (Current POC)

- No authentication implemented (public demo)
- Supabase admin key used in API routes
- Project isolation by projectId (not enforced at DB level)
- Environment variables for API keys required

---

**Last Updated**: November 21, 2025
**Total Codebase Lines**: ~1000+ lines documented
**Database Tables**: 16
**API Endpoints**: 13
**Pages**: 11+ (with placeholders for coming soon features)
