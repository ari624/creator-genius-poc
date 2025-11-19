# PROJECT-SPECIFIC RESEARCH - ViralFindr Upload

## ✅ FULLY FUNCTIONAL FEATURE

Upload and process ViralFindr data for EACH INDIVIDUAL PROJECT. Each client gets their own isolated research dataset.

---

## 🎯 CONCEPT

**Problem**: A pet probiotic brand shouldn't see real estate research, and vice versa.

**Solution**: Research data is tied to `project_id`. Each project has its own:
- ViralFindr Excel/CSV uploads
- Transcribed competitor videos
- Performance metrics
- Niche-specific insights

---

## 📊 WORKFLOW

### Step 1: Create a Project
```
1. Go to /blueprints
2. Click "New Project"
3. Enter: Name: "Koby Pet Probiotics"
4. Client: "Koby", Industry: "Pet Health"
5. Project created with unique UUID
```

### Step 2: Upload ViralFindr Data
```
1. Go to /blueprints/{projectId}/research
2. Click upload area
3. Select ViralFindr Excel/CSV file
4. System parses file and finds video URLs
5. Shows list of videos ready to transcribe
```

### Step 3: Transcribe Videos
```
1. Click "Transcribe" on individual video
   OR
2. Click "Transcribe All" for batch processing
3. Each video:
   - Downloads from URL
   - Transcribes with OpenAI Whisper
   - Saves with project_id association
   - Stores metadata (views, likes, creator, etc.)
```

### Step 4: View Project Research
```
1. See all transcribed videos for THIS project only
2. View stats: creator, platform, views, likes
3. All data isolated to this project
```

---

## 🗄️ DATABASE CHANGES

### Added to `sm_video_transcripts`:

```sql
-- Makes videos PROJECT-SPECIFIC
ALTER TABLE sm_video_transcripts
ADD COLUMN project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE;

-- Video metadata from ViralFindr
ADD COLUMN video_creator TEXT,
ADD COLUMN video_views BIGINT,
ADD COLUMN video_likes INTEGER,
ADD COLUMN video_comments INTEGER,
ADD COLUMN video_shares INTEGER,
ADD COLUMN video_saves INTEGER,
ADD COLUMN video_platform TEXT,
ADD COLUMN video_date TIMESTAMP,
ADD COLUMN niche TEXT,
ADD COLUMN source_file TEXT;

-- Index for fast project queries
CREATE INDEX idx_sm_transcripts_project ON sm_video_transcripts(project_id);
```

### Added to `sm_insights` (future use):

```sql
-- Makes insights PROJECT-SPECIFIC
ALTER TABLE sm_insights
ADD COLUMN project_id UUID REFERENCES bp_projects(id) ON DELETE CASCADE;

CREATE INDEX idx_sm_insights_project ON sm_insights(project_id);
```

**Run this SQL**: `database-schema-update-project-research.sql`

---

## 📁 EXPECTED EXCEL/CSV FORMAT

### Required Column:
- `video_url` (or `url` or `link`)

### Optional Columns:
- `video_name` or `name` - Video title
- `creator` or `author` - Creator name
- `platform` - TikTok, Instagram, YouTube, etc.
- `views` - View count (number)
- `likes` - Like count (number)
- `comments` - Comment count (number)
- `shares` - Share count (number)
- `saves` - Save count (number)
- `niche` or `category` - Content category
- `date` - Publication date

### Example CSV:
```csv
video_url,video_name,creator,platform,views,likes,niche
https://example.com/video1.mp4,Best Pet Tips,PetExpert,TikTok,1500000,120000,Pet Care
https://example.com/video2.mp4,Dog Training 101,DogWhisperer,Instagram,850000,65000,Pet Training
```

---

## 🚀 API ENDPOINTS

### GET `/api/blueprints/research?projectId={uuid}`
**Purpose**: Fetch research data for a specific project

**Returns**:
```json
{
  "success": true,
  "researchFiles": [
    {
      "id": "...",
      "source_file": "viralfindr-pet-niche.xlsx",
      "data_type": "viralfindr",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "videos": [
    {
      "id": "...",
      "video_url": "https://...",
      "video_name": "Pet Tips Video",
      "video_creator": "PetExpert",
      "transcript": "Full transcript...",
      "video_views": 1500000,
      "video_likes": 120000,
      "processed": true,
      "source_file": "viralfindr-pet-niche.xlsx"
    }
  ]
}
```

### POST `/api/blueprints/research`
**Purpose**: Upload and parse ViralFindr file

**Body**:
```json
{
  "projectId": "project-uuid",
  "fileName": "viralfindr-pet-niche.xlsx",
  "fileType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "data": [
    {
      "video_url": "https://...",
      "video_name": "...",
      "creator": "...",
      "views": 1500000
    }
  ]
}
```

**Returns**:
```json
{
  "success": true,
  "researchFile": { "id": "...", ... },
  "videoCount": 25,
  "videoUrls": ["https://...", "https://..."]
}
```

### POST `/api/blueprints/research/transcribe-video`
**Purpose**: Transcribe a single video with project association

**Body**:
```json
{
  "projectId": "project-uuid",
  "videoUrl": "https://example.com/video.mp4",
  "videoName": "Pet Tips Video",
  "videoCreator": "PetExpert",
  "videoViews": 1500000,
  "videoLikes": 120000,
  "videoPlatform": "TikTok",
  "niche": "Pet Care",
  "sourceFile": "viralfindr-pet-niche.xlsx"
}
```

**Returns**:
```json
{
  "success": true,
  "transcript": {
    "id": "...",
    "project_id": "project-uuid",
    "video_url": "https://...",
    "transcript": "Full transcript text...",
    "processed": true
  }
}
```

---

## 💻 FRONTEND FEATURES

### Upload Area
- Drag and drop or click to upload
- Accepts `.xlsx`, `.xls`, `.csv` files
- Parses file client-side with SheetJS (xlsx)
- Shows column mapping help
- Loading state during processing

### Videos Ready to Transcribe
- Lists all videos found in upload
- Shows video name and URL
- Individual "Transcribe" button per video
- "Transcribe All" button for batch
- Progress indicators
- Removes from list after transcription

### Transcribed Videos Grid
- Shows all videos for THIS PROJECT only
- Displays metadata: creator, platform, views, likes
- Visual indicators (checkmark for processed)
- Source file tracking
- Date transcribed

---

## 🧪 TESTING

### Test Project-Specific Isolation:

```
1. Create Project A: "Pet Probiotics"
2. Upload pet niche ViralFindr data
3. Transcribe 5 pet videos
4. Check sm_video_transcripts - all have project A's ID

5. Create Project B: "Real Estate Agent"
6. Upload real estate ViralFindr data
7. Transcribe 5 real estate videos
8. Check sm_video_transcripts - all have project B's ID

9. Go to Project A research page
   → See ONLY pet videos (5 videos)

10. Go to Project B research page
    → See ONLY real estate videos (5 videos)

✅ Projects are completely isolated!
```

### SQL Verification:

```sql
-- Check videos for Project A
SELECT
  video_name,
  video_creator,
  niche,
  video_views
FROM sm_video_transcripts
WHERE project_id = 'project-a-uuid'
ORDER BY created_at DESC;

-- Check videos for Project B
SELECT
  video_name,
  video_creator,
  niche,
  video_views
FROM sm_video_transcripts
WHERE project_id = 'project-b-uuid'
ORDER BY created_at DESC;

-- Verify no cross-contamination
SELECT project_id, COUNT(*) as video_count
FROM sm_video_transcripts
GROUP BY project_id;
```

---

## 🔧 SETUP REQUIRED

### 1. Update Database Schema

Run in Supabase SQL Editor:

```sql
-- Copy entire contents of database-schema-update-project-research.sql
-- Execute
```

### 2. Verify Columns Added

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'sm_video_transcripts'
  AND column_name IN ('project_id', 'video_creator', 'niche')
ORDER BY column_name;
```

Should show:
- project_id | uuid
- video_creator | text
- niche | text
- (+ other new columns)

### 3. Environment Variables

Already configured if you set up earlier features:

```env
OPENAI_API_KEY=sk-your-key-here  # Required for transcription
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 📦 DEPENDENCIES

**Already installed**:
- `xlsx` (SheetJS) - Excel/CSV parsing

**No new packages needed!**

---

## ⚡ QUICK START

```bash
# 1. Update database
# Run database-schema-update-project-research.sql in Supabase

# 2. Restart dev server
npm run dev

# 3. Test the feature
# - Create a project
# - Go to /blueprints/{projectId}/research
# - Upload a ViralFindr file
# - Click "Transcribe All"
```

---

## 🎬 USE CASES

### Pet Probiotic Brand:
```
Project: "Koby Pet Probiotics Q1 2024"
Upload: ViralFindr export of top pet health videos
Result: 50 transcribed pet industry videos
        All tied to Koby's project
        Used for generating Koby's content
```

### Real Estate Agent:
```
Project: "John Doe Luxury Homes"
Upload: ViralFindr export of top real estate videos
Result: 30 transcribed real estate videos
        All tied to John's project
        Used for generating John's content
```

### Fitness Coach:
```
Project: "FitLife Coaching Program"
Upload: ViralFindr export of top fitness videos
Result: 75 transcribed fitness videos
        All tied to FitLife's project
        Used for generating FitLife's content
```

**Each project gets its own research. No mixing!**

---

## 🚨 IMPORTANT NOTES

1. **Project-Specific**: Videos are ONLY accessible to the project they belong to
2. **Batch Processing**: "Transcribe All" processes videos sequentially with 1s delay
3. **OpenAI Costs**: Each video transcription costs $0.006/minute (Whisper pricing)
4. **File Size**: Excel/CSV parsing happens client-side (no file upload limits)
5. **Rate Limits**: OpenAI has rate limits - batch carefully for large files
6. **Deletion**: If project is deleted, all research data is cascade deleted

---

## ✅ SUMMARY

**What Works**:
- ✅ Upload Excel/CSV with ViralFindr data
- ✅ Parse file and extract video URLs
- ✅ Transcribe videos with OpenAI Whisper
- ✅ Save with project_id association
- ✅ Display project-specific videos
- ✅ Store complete metadata (views, likes, creator, etc.)
- ✅ Batch transcription with "Transcribe All"
- ✅ Individual video transcription
- ✅ Loading states and error handling
- ✅ Project isolation (no cross-contamination)

**Database Tables Updated**:
- ✅ `sm_video_transcripts` - Added project_id + metadata columns
- ✅ `sm_insights` - Added project_id (for future use)
- ✅ `bp_research_data` - Stores uploaded file metadata

**This is PRODUCTION-READY with full project isolation!**
