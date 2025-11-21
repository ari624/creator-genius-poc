# Creator Genius Platform - Comprehensive Specification

## Platform Overview

Creator Genius is an all-in-one content creation platform built with Next.js that integrates three powerful systems:

1. **Social Media Manual** - Internal knowledge base with 2,520 insights across 12 categories
2. **Client Analyzer** - Pattern recognition and analysis tool for client content (coming soon)
3. **Blueprint Generator** - Production-ready content creation workflow with AI

---

## 1. DATABASE SCHEMA & TABLES

### Architecture
- **Database**: Supabase (PostgreSQL)
- **Location**: `/lib/supabase.ts` (Client and Admin connections)
- **Setup**: `DATABASE_SETUP_COMPLETE.sql` (Master schema file)

### Core Tables

#### 1.1 Blueprint Generator Tables

**bp_projects** (Projects Management)
- `id` (UUID, PK)
- `name` (TEXT, Required)
- `client_name` (TEXT, Optional)
- `industry` (TEXT, Optional)
- `status` (TEXT, Default: 'active')
- `brand_overview` (JSONB) - Stores AI-generated brand strategy
- `gpt_system_notes` (JSONB) - Claude system prompts
- `created_at`, `updated_at` (Timestamps)

**bp_client_intake** (27-Question Form)
- `id` (UUID, PK)
- `project_id` (UUID, FK, UNIQUE) - Links to bp_projects
- **Contact Section**: first_name, last_name, phone, email, company
- **Business Section**: business_overview, primary_goals[], key_metrics
- **Audience Section**: demographics, psychographics, customer_journey, common_challenges
- **Brand Section**: brand_personality, tone_voice, unique_value, visual_guidelines
- **Social Section**: current_platforms (JSONB), resonating_content
- **Competitors Section**: main_competitors[], doing_well_accounts, admired_brands
- **Content Section**: comfortable_featuring_people, upcoming_campaigns
- **SEO Section**: primary_keywords[], secondary_keywords, seo_goals
- **Challenges Section**: current_challenges, expectations
- `completion_percentage` (INTEGER, Default: 0)
- `status` (TEXT, Default: 'draft')
- `created_at`, `updated_at` (Timestamps)
- **Index**: `idx_client_intake_project` on project_id

**bp_client_knowledge** (Knowledge Base Entries)
- `id` (UUID, PK)
- `project_id` (UUID, FK)
- `title` (TEXT, Required)
- `entry_type` (TEXT, Required) - Values: 'talk/transcript', 'product/service', 'expertise-area', 'voice-example', 'story/experience', 'past-content', 'other'
- `content` (TEXT, Required)
- `tags` (TEXT[])
- `created_at`, `updated_at` (Timestamps)
- **Index**: `idx_knowledge_project` on project_id

**bp_research_data** (Research Files & Data)
- `id` (UUID, PK)
- `project_id` (UUID, FK)
- `data_type` (TEXT, Required) - e.g., 'viralfindr'
- `source_file` (TEXT) - Original filename
- `content` (JSONB) - Parsed CSV/Excel data
- `analyzed` (BOOLEAN, Default: false)
- `analysis_results` (JSONB) - AI analysis output
- `created_at` (Timestamp)
- **Index**: `idx_research_project` on project_id

**bp_content_ideas** (AI-Generated Content Ideas)
- `id` (UUID, PK)
- `project_id` (UUID, FK)
- `idea_number` (INTEGER)
- `internal_title` (TEXT, Required)
- `topic` (TEXT, Required)
- `clickbait_overlay` (TEXT, Required) - Attention-grabbing text
- `hook_sentence` (TEXT, Required) - Opening line
- `keywords` (TEXT[])
- `products_mentioned` (JSONB) - [{name, url}]
- `context_notes` (TEXT)
- `sub_niche` (TEXT)
- `post_type` (TEXT) - 'value-only', 'soft-engagement-cta', 'hard-conversion-cta'
- `status` (TEXT, Default: 'pending') - 'pending', 'approved', 'rejected'
- `reviewed_at` (Timestamp)
- `created_at`, `updated_at` (Timestamps)
- **Indexes**: `idx_ideas_project` on project_id, `idx_ideas_status` on status

**bp_blueprints** (Production-Ready Content)
- `id` (UUID, PK)
- `project_id` (UUID, FK)
- `content_idea_id` (UUID, FK) - References bp_content_ideas
- `blueprint_number` (INTEGER)
- `title` (TEXT, Required)
- `internal_title` (TEXT)
- **Video Production**: video_goal, target_audience, hook_spoken, hook_overlay, script_table (JSONB), script_teleprompter
- **Platform Captions**: caption_instagram, caption_tiktok, caption_youtube, caption_x, caption_threads, caption_linkedin
- **Additional Content**: youtube_title, overlay_text, seo_keywords[], broll_prompts (JSONB), reference_links[]
- **Metadata**: post_type, sub_niche, creative_notes, knowledge_sources (JSONB), status
- `created_at`, `updated_at` (Timestamps)
- **Indexes**: `idx_blueprints_project` on project_id, `idx_blueprints_idea` on content_idea_id

**bp_knowledge_references** (Blueprint to Knowledge Links)
- `id` (UUID, PK)
- `blueprint_id` (UUID, FK)
- `source_system` (TEXT, Required) - System identifier
- `source_id` (UUID) - Reference to source
- `reference_type` (TEXT) - Type of reference
- `created_at` (Timestamp)

#### 1.2 Social Media Manual Tables

**sm_insights** (2,520+ Insights Database)
- `id` (UUID, PK)
- `project_id` (UUID, FK, Optional) - Links to blueprint project
- `domain` (TEXT, Required) - Category like 'Hooks', 'Copywriting', etc.
- `sub_domains` (TEXT[]) - Subcategories
- `insight_text` (TEXT, Required) - The actual insight content
- `insight_type` (TEXT, Required)
- `specificity` (TEXT, Required)
- `platforms` (TEXT[]) - Applicable platforms
- `priority` (TEXT, Required)
- `confidence` (TEXT, Required)
- `status` (TEXT, Default: 'current') - 'current', 'superseded'
- `added_date`, `updated_date` (Timestamps)
- `superseded_by` (UUID, FK) - Points to newer version
- `source_type` (TEXT) - Source identifier
- `source_reference` (TEXT)
- `video_url` (TEXT)
- `rating` (INTEGER)
- `application` (TEXT)
- `tags` (TEXT[])
- `created_at` (Timestamp)
- **Indexes**: `idx_sm_insights_domain`, `idx_sm_insights_status`, `idx_sm_insights_priority`, `idx_sm_insights_project`

**sm_video_transcripts** (Transcribed Video Content)
- `id` (UUID, PK)
- `project_id` (UUID, FK, Optional)
- `video_url` (TEXT, Required)
- `video_name` (TEXT)
- `transcript` (TEXT, Required) - Full transcription
- `caption` (TEXT) - Auto-generated caption
- `processed` (BOOLEAN, Default: false)
- `insights_extracted` (BOOLEAN, Default: false)
- `insight_count` (INTEGER, Default: 0)
- **ViralFindr Metadata**: video_creator, video_views, video_likes, video_comments, video_shares, video_saves, video_platform, video_date, niche, source_file
- `created_at`, `updated_at` (Timestamps)
- **Index**: `idx_sm_transcripts_project` on project_id

**sm_insight_relationships** (Insight Connections)
- `id` (UUID, PK)
- `insight_id` (UUID, FK)
- `related_id` (UUID, FK)
- `relationship_type` (TEXT, Required)
- `created_at` (Timestamp)

**sm_insight_versions** (Insight Change History)
- `id` (UUID, PK)
- `insight_id` (UUID, FK)
- `old_text` (TEXT)
- `new_text` (TEXT)
- `change_type` (TEXT, Required)
- `changed_at` (Timestamp)

#### 1.3 Training Manual Tables

**training_categories** (Knowledge Categories)
- `id` (UUID, PK)
- `name` (TEXT, Required)
- `slug` (TEXT, UNIQUE, Required)
- `insight_count` (INTEGER, Default: 0)
- `order_index` (INTEGER, Required)
- `created_at` (Timestamp)

**training_insights** (2,520 Insights)
- `id` (UUID, PK)
- `category_id` (UUID, FK)
- `insight_number` (INTEGER, UNIQUE, Required)
- `content` (TEXT, Required) - Insight from script analysis
- `category_name` (TEXT, Required)
- `created_at` (Timestamp)
- **Indexes**: `idx_insights_category`, `idx_insights_content_search` (Full-text search GIN)

**training_bookmarks** (User Bookmarks)
- `id` (UUID, PK)
- `insight_id` (UUID, FK)
- `user_id` (TEXT)
- `notes` (TEXT)
- `created_at` (Timestamp)

#### 1.4 Client Analyzer Tables

**clients** (Client Profiles)
- `id` (UUID, PK)
- `name` (TEXT, Required)
- `niche` (TEXT, Required)
- `description` (TEXT)
- `social_handles` (JSONB) - {platform: handle}
- `status` (TEXT, Default: 'active')
- `created_at`, `updated_at` (Timestamps)

**client_content** (Client's Published Content)
- `id` (UUID, PK)
- `client_id` (UUID, FK)
- `post_url` (TEXT)
- `video_url` (TEXT)
- `display_url` (TEXT) - Thumbnail/image URL
- `caption` (TEXT)
- `script` (TEXT)
- `hashtags` (TEXT[])
- `post_date` (Timestamp)
- `likes`, `comments`, `views`, `shares` (INTEGER)
- `created_at` (Timestamp)
- **Index**: `idx_client_content_client` on client_id

---

## 2. API ENDPOINTS & FUNCTIONALITY

### Base URL
All endpoints prefixed with `/api/`

### 2.1 Blueprint Generator API

#### Projects Management
**GET /blueprints/projects**
- Fetch all projects
- Response: `{success: boolean, projects: BPProject[]}`

**POST /blueprints/projects**
- Create new project
- Body: `{name: string, client_name?: string, industry?: string}`
- Response: `{success: boolean, project: BPProject}`

#### Client Intake Form
**GET /blueprints/intake?projectId={id}**
- Load existing intake data
- Response: `{intake: BPClientIntake | null}`

**POST /blueprints/intake**
- Save/update intake form (27 questions)
- Body: `{projectId: string, ...intakeFields, completion_percentage: number}`
- Auto-saves every 30 seconds
- Marks as 'completed' at 100%
- Response: `{intake: BPClientIntake, success: boolean}`

#### Brand Overview Generation
**POST /blueprints/generate-brand-overview**
- AI-powered brand overview from intake data
- Uses: Claude Sonnet 4 (Anthropic)
- Requirements: Intake must be 50%+ complete
- Body: `{projectId: string}`
- Returns: `{brand_overview: BrandOverview, project: BPProject, success: true}`
- **Output Structure**:
  ```json
  {
    "brand_name": "string",
    "primary_niche": "string",
    "sub_niches": ["string", "string", "string", "string", "string"],
    "industry": "string",
    "target_audience": {
      "demographics": "string",
      "psychographics": "string",
      "experience_level": "string"
    },
    "brand_voice": {
      "tone": "string",
      "style": "string",
      "dos": ["string", "string", "string"],
      "donts": ["string", "string", "string"]
    },
    "key_products": [{"name": "string", "description": "string", "url": "string"}],
    "unique_selling_points": ["string", "string", "string"],
    "goals": ["string", "string", "string"],
    "content_pillars": ["string", "string", "string", "string", "string"]
  }
  ```

#### Knowledge Base
**GET /blueprints/knowledge?projectId={id}**
- Fetch all knowledge entries for a project
- Response: `{success: boolean, data: BPClientKnowledge[]}`

**POST /blueprints/knowledge**
- Create new knowledge entry
- Body: `{projectId: string, title: string, entry_type: string, content: string, tags?: string[]}`
- Valid types: 'talk/transcript', 'product/service', 'expertise-area', 'voice-example', 'story/experience', 'past-content', 'other'
- Response: `{success: boolean, data: BPClientKnowledge}`

**GET /blueprints/knowledge/[id]**
- Fetch single knowledge entry
- Response: `{success: boolean, data: BPClientKnowledge}`

**PUT /blueprints/knowledge/[id]**
- Update knowledge entry
- Body: `{title?: string, entry_type?: string, content?: string, tags?: string[]}`
- Response: `{success: boolean, data: BPClientKnowledge}`

**DELETE /blueprints/knowledge/[id]**
- Delete knowledge entry
- Response: `{success: boolean, message: string}`

#### Research Data Management
**GET /blueprints/research?projectId={id}**
- Fetch all research files and transcribed videos
- Response: `{success: boolean, researchFiles: BPResearchData[], videos: SMVideoTranscript[]}`

**POST /blueprints/research**
- Upload and parse research file (CSV/Excel)
- Body: `{projectId: string, fileName: string, fileType?: string, data: any[]}`
- Extracts video URLs from uploaded data
- Response: `{success: boolean, researchFile: BPResearchData, videoCount: number, videoUrls: string[]}`

**POST /blueprints/research/transcribe-video**
- Transcribe single video for project
- Uses: OpenAI Whisper
- Body: `{projectId: string, videoUrl: string, videoName?: string, videoCreator?: string, videoViews?: number, videoLikes?: number, videoComments?: number, videoShares?: number, videoSaves?: number, videoPlatform?: string, videoDate?: string, niche?: string, sourceFile?: string}`
- Response: `{success: boolean, transcript: SMVideoTranscript}`

### 2.2 Social Media Manual API

#### Video Transcription
**POST /manual/transcribe**
- Transcribe video from URL (global, not project-specific)
- Uses: OpenAI Whisper
- Body: `{video_url: string, video_name?: string}`
- Response: `{success: boolean, transcript: SMVideoTranscript}`

**GET /manual/transcribe**
- Fetch all transcripts (global)
- Response: `{success: boolean, transcripts: SMVideoTranscript[]}`

### 2.3 Training Manual API

#### Import & Management
**POST /training/import**
- Upload and parse training manual markdown file
- Clears existing data and reimports
- Body: `{fileContent: string, fileName: string}`
- **Parsing Logic**: 
  - Categories: `## CATEGORY NAME` headers
  - Insights: `### NUMBER. Content` format
  - Creates training_categories and training_insights
- Response: `{success: boolean, categoriesImported: number, insightsImported: number, fileName: string}`

**GET /training/import**
- Check import status
- Response: `{success: boolean, imported: boolean, categoryCount: number, insightCount: number}`

#### Category & Insight Retrieval
**GET /training/categories**
- Fetch all categories ordered by index
- Response: `{success: boolean, categories: TrainingCategory[]}`

**GET /training/insights?search={query}&categories={ids}&page={n}&limit={limit}**
- Search and filter insights with full-text search
- Parameters:
  - `search` (optional): Full-text search query
  - `categories` (optional): Comma-separated category IDs
  - `page` (default: 1)
  - `limit` (default: 50)
- Response: `{success: boolean, insights: TrainingInsight[], total: number, page: number, limit: number, totalPages: number}`

---

## 3. PAGES & FUNCTIONALITY

### 3.1 Navigation Structure

```
/                           → Home (Platform Overview)
/blueprints                 → Blueprint Projects Hub
/blueprints/[projectId]     → Project Dashboard
  /intake                   → 27-Question Intake Form
  /brand-overview           → Brand Profile (AI-Generated)
  /research                 → ViralFindr Upload & Management
  /knowledge                → Client Knowledge Base
  /ideas                    → Content Ideas (Coming Soon)
  /create-blueprint         → Blueprint Generator (Coming Soon)
  /library                  → Blueprint Library (Coming Soon)
  /export                   → Export Deliverables (Coming Soon)
  /settings                 → Project Settings (Coming Soon)
/client-analyzer            → Client Analysis Tool (Coming Soon)
/social-media-manual        → Training Manual Hub
  /training                 → Training Manual Search & Import
  /transcribe               → Video Transcription Tool
  /browse                   → Transcript Browser
```

### 3.2 Page Details

#### Home Page (`/`)
- **Purpose**: Platform introduction and navigation
- **Components**:
  - Hero section with feature overview
  - 3-system cards (Social Media Manual, Client Analyzer, Blueprint Generator)
  - "How It Works" workflow (Build Knowledge → Analyze Patterns → Generate Content)
  - Navigation to all three systems

#### Blueprint Pages

**Projects Hub (`/blueprints`)**
- Lists all projects with pagination/grid
- Create new project modal
- Project cards show: name, client, industry, status, creation date
- Quick access to project dashboard

**Project Dashboard (`/blueprints/[projectId]`)**
- Header with project info and breadcrumb
- Step-by-step workflow guide (5 steps)
- Grid of tool cards for quick access to all features
- Status tracking

**Intake Form (`/blueprints/[projectId]/intake`)**
- **27 Questions** organized in 9 sections:
  1. Contact Information (5 fields)
  2. Business Overview (3 fields)
  3. Target Audience (4 fields)
  4. Brand Identity (4 fields)
  5. Social Media Presence (2 fields)
  6. Competitors & Inspiration (3 fields)
  7. Content Strategy (2 fields)
  8. SEO & Keywords (3 fields)
  9. Challenges & Expectations (2 fields)
- Features:
  - Real-time progress tracking (0-100%)
  - Auto-save every 30 seconds
  - Last saved timestamp
  - Button to generate brand overview (requires 50%+ completion)

**Brand Overview (`/blueprints/[projectId]/brand-overview`)**
- Status: Coming Soon (placeholder page)
- Will display AI-generated brand profile
- Editable sections for brand definition

**Research (`/blueprints/[projectId]/research`)**
- Upload ViralFindr Excel/CSV files
- File parsing and video URL extraction
- Video transcription interface
- List of transcribed videos with metadata
- ViralFindr data fields: views, likes, comments, shares, saves, platform, date

**Knowledge Base (`/blueprints/[projectId]/knowledge`)**
- Add knowledge entries (7 types)
- List all entries with search/filter
- Edit/delete functionality
- Tags support
- Stores: talks, products, expertise, voice examples, stories, past content

**Social Media Manual Pages**

**Training Manual (`/social-media-manual/training`)**
- Import markdown file (2,520 insights, 12 categories)
- Full-text search across all insights
- Category filter pills
- Grid of insight cards (2-column layout)
- Click to expand details modal
- Copy to clipboard button for each insight
- Pagination (50 per page)

**Transcribe Video (`/social-media-manual/transcribe`)**
- Input: Video URL
- Uses OpenAI Whisper API
- Displays full transcription
- Browse transcripts tool
- Global transcripts (not project-specific)

**Browse Transcripts (`/social-media-manual/browse`)**
- View all transcribed videos
- Search and filter functionality
- Display video metadata
- Link to full transcripts

**Client Analyzer (`/client-analyzer`)**
- Status: Coming Soon
- Planned features:
  - Pattern Recognition (hooks, templates, formulas)
  - Hook Analysis (high-performing openings)
  - Visual Breakdown (composition, colors, overlays)

---

## 4. DATA FLOW BETWEEN SYSTEMS

### 4.1 Single Project Workflow

```
Create Project → Complete Intake → Generate Brand Overview
                                          ↓
                    Upload ViralFindr Research Data
                                          ↓
                      Transcribe Competitor Videos
                                          ↓
                         Build Knowledge Base
                                          ↓
                      Generate Content Ideas (AI)
                                          ↓
                        Review & Create Blueprints
                                          ↓
                          Export Deliverables
```

### 4.2 System Interactions

#### Blueprint Generator ↔ Social Media Manual
- **Connection**: Knowledge sources
- **Data Flow**: 
  - insights from sm_insights can be referenced in bp_blueprints
  - transcripts from sm_video_transcripts linked via bp_knowledge_references
  - insights inform content ideas via context

#### Blueprint Generator ↔ Client Analyzer
- **Connection**: Not yet implemented
- **Planned**: Extract patterns from client content to inform blueprint generation

#### Social Media Manual → Training Manual
- **Connection**: Independent but complementary
- **Data Flow**:
  - Training Manual: 2,520 global insights (12 categories)
  - Social Media Manual: Project-specific insights from videos
  - Cross-reference: Training insights inform Social Media Manual insights

### 4.3 Data Persistence Flow

```
Input Layer:
  - Client Intake Form → bp_client_intake
  - ViralFindr CSV → bp_research_data
  - Video URL → sm_video_transcripts (via Whisper API)
  - Knowledge Entry → bp_client_knowledge

Processing Layer:
  - Intake (50%+) → Claude generates brand overview
  - Research videos → Whisper transcribes
  - Transcripts → Ready for insight extraction

Storage Layer:
  - bp_projects (project metadata)
  - bp_blueprints (final content output)
  - sm_insights (insights from transcripts)
  - training_insights (global knowledge base)
```

---

## 5. AI/LLM INTEGRATIONS

### 5.1 Anthropic Claude Integration

**Location**: `/lib/anthropic.ts`

**Model**: `claude-sonnet-4-20250514` (Claude Sonnet 4)

**Functions**:

1. **createClaudeMessage(prompt, systemPrompt?, maxTokens?)**
   - Non-streaming API call
   - Parameters:
     - `prompt` (string): User message
     - `systemPrompt` (string, optional): System instructions
     - `maxTokens` (number, default: 4096): Response length limit
   - Returns: `Promise<string>` (Full response text)
   - Error handling: Checks for ANTHROPIC_API_KEY env var

2. **streamClaudeMessage(prompt, systemPrompt?, onChunk?, maxTokens?)**
   - Streaming API call for real-time responses
   - Parameters:
     - `onChunk` (function, optional): Callback for each chunk
   - Returns: `Promise<string>` (Full response text)
   - Use cases: Long-form content generation with progressive UI updates

**Usage in Platform**:
- **Brand Overview Generation** (`POST /blueprints/generate-brand-overview`)
  - Prompt: 2-3 message template with intake data
  - Output: Structured JSON with brand strategy
  - Max tokens: 4096

**Environment Variable Required**:
```
ANTHROPIC_API_KEY=sk-ant-...
```

### 5.2 OpenAI Integration

**Location**: `/lib/openai.ts`

**Models Used**:
- `whisper-1` - Audio transcription
- `gpt-4o` - Vision/image analysis

**Functions**:

1. **transcribeAudio(audioFile: File | Blob, language?: string)**
   - Transcribes audio/video files
   - Returns: `Promise<string>` (Transcription text)
   - Used in: Video transcription endpoints

2. **analyzeImage(imageUrl: string, prompt: string)**
   - GPT-4 Vision analysis of images
   - Returns: `Promise<string>` (Analysis text)

3. **analyzeImages(images: string[], prompt: string)**
   - Batch image analysis
   - Returns: `Promise<string>` (Combined analysis)

4. **extractTextFromImage(imageUrl: string)**
   - OCR functionality
   - Returns: `Promise<string>` (Extracted text)

**Usage in Platform**:
- **Video Transcription** (`POST /manual/transcribe`, `POST /blueprints/research/transcribe-video`)
  - Model: Whisper-1
  - Input: Video URL → Downloaded as ArrayBuffer → File object
  - Output: Transcription text
  - Stored in: sm_video_transcripts.transcript

**Environment Variable Required**:
```
OPENAI_API_KEY=sk-...
```

### 5.3 API Error Handling

Both integrations include:
- API key validation (throws error if missing)
- Network error handling (fetch failures)
- Response parsing validation
- Detailed error logging

---

## 6. FILE UPLOAD & PROCESSING

### 6.1 Training Manual Import

**Location**: `/api/training/import` (POST)

**File Type**: Markdown (.md)

**Processing**:
```
Raw Markdown File
      ↓
[Parse markdown content]
      ↓
Extract categories (## headers)
Extract insights (### NUMBER. format)
      ↓
Clear existing training_categories
Clear existing training_insights
      ↓
Insert parsed categories
Insert parsed insights (numbered sequentially)
      ↓
{success, categoriesImported, insightsImported}
```

**Expected Format**:
```markdown
## Category Name 1
### 1. First insight content
### 2. Second insight content
...

## Category Name 2
### N. Insight content
...
```

**Data Stored**:
- training_categories: name, slug, insight_count, order_index
- training_insights: insight_number (1-2520), content, category_id, category_name

### 6.2 ViralFindr Research Upload

**Location**: `/api/blueprints/research` (POST)

**File Types**: CSV, Excel

**Processing**:
```
Excel/CSV File Upload
      ↓
[Client reads file in browser]
      ↓
[Client sends JSON payload with parsed data]
      ↓
Extract video_url from rows (looks for video_url, url, or link fields)
      ↓
Save to bp_research_data (entire dataset as JSONB)
      ↓
Return video URLs for transcription
      ↓
{success, researchFile, videoCount, videoUrls}
```

**Data Fields Extracted**:
- Video URLs (from video_url, url, or link columns)
- Creator name
- View count, likes, comments, shares, saves
- Platform (TikTok, YouTube, Instagram, etc.)
- Post date
- Niche
- Source file name

**Data Stored**:
- bp_research_data: project_id, data_type='viralfindr', source_file, content (JSONB array)

### 6.3 Video Transcription Processing

**Location**: `/api/manual/transcribe`, `/api/blueprints/research/transcribe-video` (POST)

**Processing**:
```
Video URL Input
      ↓
[Validate URL provided]
      ↓
[Fetch video file from URL]
      ↓
[Convert to ArrayBuffer]
      ↓
[Create File object (audio.mp4)]
      ↓
[Call OpenAI Whisper API]
      ↓
[Receive transcription text]
      ↓
[Store in database]
      ↓
{success, transcript: SMVideoTranscript}
```

**Endpoints**:
1. **Global Transcription** (`/api/manual/transcribe`)
   - Project: None (global)
   - Storage: sm_video_transcripts (without project_id)

2. **Project Transcription** (`/api/blueprints/research/transcribe-video`)
   - Project: Specific project_id
   - Metadata: Includes ViralFindr fields
   - Storage: sm_video_transcripts (with project_id and metadata)

**Error Handling**:
- Network errors during download
- Whisper API failures
- Database save failures
- Missing API key validation

---

## 7. AUTHENTICATION & SECURITY

### Current Implementation
- **Authentication**: Not implemented (public demo)
- **Database Access**: Uses Supabase service role key for API routes (server-side)
- **Client Isolation**: Project-based filtering in queries (not enforced at DB level)

### Supabase Clients

**File**: `/lib/supabase.ts`

```typescript
// Client-side (browser)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Server-side (API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
```

**Environment Variables Required**:
```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

---

## 8. FRONTEND ARCHITECTURE

### Framework & Libraries
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React (icons)
- **Notifications**: Sonner (toast notifications)
- **Routing**: Next.js useRouter, useParams

### Client Components
- **Location**: `/components/`

1. **Navbar** - Navigation header
2. **CodeBlock** - Code display component
3. **ScriptTable** - Video script table display
4. **ContentIdeaCard** - Idea card display component

### Page Organization
- All pages use client-side rendering (`'use client'` directive)
- State management with React hooks (useState, useEffect)
- Form handling with controlled components
- Real-time validation and auto-save

---

## 9. KEY FEATURES & WORKFLOWS

### 9.1 Blueprint Generator Workflow

1. **Create Project**
   - Enter project name, client name, industry
   - Creates bp_projects record

2. **Complete Intake Form**
   - 27 questions across 9 sections
   - Auto-save every 30 seconds
   - Progress tracking (0-100%)
   - Requires 50%+ for brand overview generation

3. **Generate Brand Overview**
   - Sends intake data to Claude
   - Claude generates structured brand profile
   - 5 sub-niches, voice, USPs, goals, content pillars
   - Stores in bp_projects.brand_overview

4. **Upload Research Data**
   - ViralFindr Excel/CSV upload
   - Extracts video URLs
   - Stores full dataset for later analysis

5. **Transcribe Videos**
   - Downloads video from URL
   - Whisper transcription
   - Stores with metadata

6. **Build Knowledge Base**
   - Add 7 types of knowledge entries
   - Tags and search support
   - Referenced in blueprints

7. **Generate Content Ideas** (Coming Soon)
   - AI generates ideas from brand + research
   - Creates bp_content_ideas records

8. **Create Blueprints** (Coming Soon)
   - Full scripts with A-roll/B-roll
   - Platform-specific captions (6 platforms)
   - SEO keywords, overlay text, B-roll prompts
   - References knowledge sources

9. **Export** (Coming Soon)
   - Download all deliverables
   - Multiple formats

### 9.2 Social Media Manual Workflow

1. **Import Training Manual**
   - Upload 2,520-insight markdown file
   - Parse into 12 categories
   - Full-text indexing

2. **Search Insights**
   - Full-text search across content
   - Filter by category
   - Pagination (50 per page)

3. **Browse Insights**
   - View, expand, copy insights
   - Modal detail view
   - One-click copy to clipboard

4. **Transcribe Videos**
   - Paste video URL
   - Whisper transcription
   - View and search transcripts
   - Browse transcript library

### 9.3 Client Analyzer (Future)

- Analyze client content in specific niches
- Extract patterns, hooks, visual strategies
- Support for pattern recognition
- Hook performance analysis
- Visual element breakdown

---

## 10. TYPE DEFINITIONS

**Key Interfaces** (from `/lib/types.ts`):

```typescript
interface BPProject {
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

interface BPClientIntake {
  id: string;
  project_id: string;
  first_name?: string;
  // ... 25 more fields
  completion_percentage: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface BPBlueprint {
  id: string;
  project_id: string;
  blueprint_number?: number;
  title: string;
  script_table: ScriptRow[];
  script_teleprompter: string;
  caption_instagram?: string;
  caption_tiktok?: string;
  caption_youtube?: string;
  caption_x?: string;
  caption_threads?: string;
  caption_linkedin?: string;
  // ... 10+ more fields
  status: string;
  created_at: string;
  updated_at: string;
}

interface SMInsight {
  id: string;
  domain: string;
  sub_domains: string[];
  insight_text: string;
  platforms: string[];
  priority: string;
  confidence: string;
  status: string;
  // ... additional fields
}

interface TrainingInsight {
  id: string;
  category_id: string;
  insight_number: number;
  content: string;
  category_name: string;
  created_at: string;
}
```

---

## 11. ENVIRONMENT SETUP

### Required Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# AI Services
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup
1. Run `DATABASE_SETUP_COMPLETE.sql` in Supabase SQL Editor
2. Creates 16 tables with indexes
3. Sets up schema for all three systems

### Local Development
```bash
npm install
npm run dev
# Access at http://localhost:3000
```

---

## 12. CURRENT STATUS & ROADMAP

### Fully Implemented
✅ Home page with platform overview
✅ Blueprint Generator
   - Project creation
   - 27-question intake form with auto-save
   - Brand overview generation (Claude AI)
   - Knowledge base management
   - Research data upload and parsing
   - Video transcription
✅ Social Media Manual
   - Training manual import (2,520 insights)
   - Full-text search
   - Category filtering
   - Video transcription
✅ Database schema (16 tables)
✅ API endpoints (13 routes)

### In Development / Coming Soon
🚧 Client Analyzer (placeholder page)
🚧 Content ideas generation
🚧 Blueprint creation & editing
🚧 Blueprint library viewing
🚧 Export functionality
🚧 Project settings

### Not Yet Implemented
❌ User authentication
❌ Multi-user collaboration
❌ Webhook integrations
❌ Analytics dashboard
❌ API rate limiting

---

## 13. DEPLOYMENT

### Technology Stack
- **Frontend**: Next.js (Vercel optimal)
- **Database**: Supabase (PostgreSQL)
- **APIs**: Anthropic, OpenAI
- **Hosting**: Vercel, AWS, or similar

### Deployment Checklist
- [ ] Set all environment variables in deployment platform
- [ ] Run DATABASE_SETUP_COMPLETE.sql in Supabase
- [ ] Test Anthropic API connectivity
- [ ] Test OpenAI API connectivity
- [ ] Configure CORS if needed
- [ ] Set up error logging
- [ ] Configure backup strategy

---

## Summary

The Creator Genius Platform is a sophisticated content creation system with:

- **16 database tables** organizing projects, intake forms, research, content, transcripts, and training data
- **13 API endpoints** handling CRUD operations, file processing, and AI integration
- **3 integrated systems** working in harmony for comprehensive content creation
- **2 LLM integrations** (Claude for generation, OpenAI Whisper for transcription)
- **Rich UI** with real-time validation, auto-save, and progressive disclosure

The platform enables users to transform client information into production-ready video content blueprints with scripts, captions for 6 platforms, B-roll prompts, and SEO optimization—all powered by AI analysis of brand strategy, market research, and knowledge bases.

