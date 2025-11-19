# 🚀 Quick Start Guide

## Why Nothing Works

**The issue:** You don't have a `.env.local` file with your Supabase and API credentials. All API calls are failing because they're using placeholder values.

---

## Step 1: Configure Environment Variables

### 1.1 Create `.env.local` file

```bash
cp .env.example .env.local
```

### 1.2 Edit `.env.local` with your real credentials

Open `.env.local` and replace the placeholder values:

```env
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# Get this from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_actual_openai_key_here

# Optional - only needed if using Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# App URL (keep as-is for local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

---

## Step 2: Set Up Database Tables

### 2.1 Go to Supabase SQL Editor

1. Open your Supabase dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**

### 2.2 Run SQL scripts in this order:

#### A. Core Blueprint Tables

Copy and paste the contents of `database-blueprint-only.sql`:

```bash
cat database-blueprint-only.sql
```

**OR** use the full schema (includes Social Media Manual tables):

```bash
cat database-schema.sql
```

Click **Run** in Supabase.

#### B. Project-Specific Research (adds project_id to research)

Copy and paste the contents of `database-schema-update-project-research.sql`:

```bash
cat database-schema-update-project-research.sql
```

Click **Run** in Supabase.

#### C. Training Manual Tables (for 2,520 insights)

Copy and paste the contents of `database-training-manual.sql`:

```bash
cat database-training-manual.sql
```

Click **Run** in Supabase.

### 2.3 Verify Tables Were Created

Go to **Table Editor** in Supabase and verify these tables exist:

**Blueprint Generator:**
- `bp_projects`
- `bp_client_intake`
- `bp_client_knowledge`

**Social Media Manual:**
- `sm_video_transcripts` (with `project_id` column)
- `sm_insights`

**Training Manual:**
- `training_categories`
- `training_insights`

---

## Step 3: Test the Application

### 3.1 Start the dev server

```bash
npm run dev
```

### 3.2 Open http://localhost:3000

### 3.3 Test each feature:

#### ✅ Homepage
- Click each of the 3 system cards
- Verify no 404 errors

#### ✅ Blueprint Generator (`/blueprints`)
1. Click **"New Project"**
2. Fill out project name (e.g., "Test Project")
3. Click **"Create Project"**
4. Verify it creates and redirects to project page

#### ✅ Social Media Manual (`/social-media-manual`)
1. Click **"Transcribe Video"**
2. Try uploading a video URL (requires OpenAI API key)
3. Check **"Browse Transcripts"** to see list
4. Check **"Training Manual"** to upload the training file

#### ✅ Client Analyzer (`/client-analyzer`)
- Page should load (currently has empty state)

---

## Step 4: Upload Training Manual (Optional)

If you have the `Social_Media_Training_FINAL.md` file:

1. Go to `/social-media-manual/training`
2. Click **"Upload Training Manual"**
3. Select the markdown file
4. Wait for import (imports 2,520 insights across 12 categories)
5. Use search and category filters to explore insights

---

## Common Issues

### Issue: "Failed to load projects"
**Solution:** Check that:
- `.env.local` exists with real Supabase credentials
- `bp_projects` table exists in Supabase
- Service role key is correct (not anon key)

### Issue: "Transcription failed"
**Solution:**
- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify it starts with `sk-`
- Check your OpenAI account has credits

### Issue: Database errors
**Solution:**
- Run all 3 SQL scripts in Supabase SQL Editor
- Check Table Editor to verify tables exist
- Look at Supabase logs for specific errors

### Issue: 404 errors
**Solution:**
- Verify the build succeeded: `npm run build`
- Check routes exist in `app/` directory
- Restart dev server

---

## Summary of Working Features

### 1. **Blueprint Generator** (`/blueprints`)
- ✅ Create projects (real database)
- ✅ Client intake form (27 questions with auto-save)
- ✅ Client knowledge base (full CRUD)
- ✅ Brand overview generator
- ✅ Project-specific ViralFindr research upload

### 2. **Social Media Manual** (`/social-media-manual`)
- ✅ Video transcription (OpenAI Whisper)
- ✅ Browse transcripts
- ✅ Training manual (2,520 searchable insights)

### 3. **Client Analyzer** (`/client-analyzer`)
- ✅ Landing page (features coming soon)

---

## Next Steps

Once everything is working:

1. **Upload Training Manual** - Go to `/social-media-manual/training` and upload your markdown file
2. **Create a Project** - Go to `/blueprints` and create your first project
3. **Upload ViralFindr Data** - Go to `/blueprints/[projectId]/research` and upload competitor research
4. **Fill Client Intake** - Go to `/blueprints/[projectId]/intake` and complete the 27-question form
5. **Generate Brand Overview** - AI will create brand overview from intake responses

---

## Need Help?

Check these files for detailed documentation:
- `SETUP_DATABASE.md` - Detailed database setup
- `WORKING_FEATURES.md` - Complete list of functional features
- `PROJECT_SPECIFIC_RESEARCH.md` - How project-specific research works
- `TRAINING_MANUAL_INTEGRATION.md` - Training manual architecture

All code is functional - no placeholders. Every API route has real database operations, error handling, and loading states.
