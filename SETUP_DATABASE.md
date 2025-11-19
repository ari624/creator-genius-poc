# Database Setup Guide - Creator Genius Platform

## Issue: Client Intake Form Won't Save Data

The intake form loads but fails to save because the database tables need to be created in Supabase and environment variables need to be configured.

---

## Step 1: Create Database Tables in Supabase

### Option A: Run Complete Schema (Recommended for First Setup)

1. **Go to your Supabase project** at https://supabase.com/dashboard
2. **Navigate to**: SQL Editor (left sidebar)
3. **Click**: "New Query"
4. **Copy and paste** the entire contents of `database-schema.sql` from this repository
5. **Click**: "Run" or press `Ctrl+Enter`

This will create all tables for all three systems:
- Social Media Manual (sm_*)
- Client Analyzer (clients*)
- Blueprint Generator (bp_*)

### Option B: Create Only Blueprint Tables (If Manual & Analyzer tables exist)

If you only need the Blueprint Generator tables, run this SQL:

```sql
-- Blueprint Generator Tables
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

CREATE TABLE IF NOT EXISTS bp_client_intake (
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

CREATE INDEX IF NOT EXISTS idx_client_intake_project ON bp_client_intake(project_id);

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

CREATE TABLE IF NOT EXISTS bp_blueprints (
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

CREATE INDEX IF NOT EXISTS idx_blueprints_project ON bp_blueprints(project_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_idea ON bp_blueprints(content_idea_id);

CREATE TABLE IF NOT EXISTS bp_knowledge_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blueprint_id UUID REFERENCES bp_blueprints(id) ON DELETE CASCADE,
  source_system TEXT NOT NULL,
  source_id UUID,
  reference_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Step 2: Verify Tables Were Created

In Supabase SQL Editor, run:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'bp_%'
ORDER BY table_name;
```

**Expected output:**
- bp_blueprints
- bp_client_intake
- bp_client_knowledge
- bp_content_ideas
- bp_knowledge_references
- bp_projects
- bp_research_data

---

## Step 3: Create a Test Project

The intake form requires a project to exist. Create one:

```sql
INSERT INTO bp_projects (id, name, client_name, industry, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Test Project', 'Test Client', 'Technology', 'active')
ON CONFLICT (id) DO NOTHING;
```

Then navigate to: `/blueprints/00000000-0000-0000-0000-000000000001/intake`

---

## Step 4: Set Up Environment Variables

### For Local Development:

1. **Create `.env.local` file** in the project root (next to `package.json`)
2. **Copy** the contents from `.env.example`
3. **Fill in** your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
ANTHROPIC_API_KEY=your_anthropic_key (optional for now)
OPENAI_API_KEY=your_openai_key (optional for now)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find Supabase keys:**
1. Go to your Supabase project
2. Click **Settings** (gear icon, bottom left)
3. Click **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### For Vercel Deployment:

1. **Go to** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add these variables:**

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://YOUR_PROJECT_ID.supabase.co | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your_anon_key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | your_service_role_key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | https://your-app.vercel.app | Production |

3. **Redeploy** your application after adding the variables

---

## Step 5: Test the Connection

### Option 1: Check Browser Console

1. **Open** the intake form page: `/blueprints/[projectId]/intake`
2. **Press** `F12` to open Developer Tools
3. **Click** the "Console" tab
4. **Fill in** some form fields
5. **Click** "Save Draft"
6. **Look for errors** in the console:
   - ✅ Success: "Draft saved successfully"
   - ❌ Error: Check the error message (likely "Failed to save intake data")

### Option 2: Check Network Tab

1. **Open** Developer Tools (`F12`)
2. **Click** "Network" tab
3. **Fill in** form fields and click "Save Draft"
4. **Look for** a request to `/api/blueprints/intake`
5. **Click** on the request to see:
   - **Status**: Should be `200 OK`
   - **Response**: Should show `{"intake": {...}, "success": true}`
   - **If status is 500**: Check the response for error details

### Option 3: Verify Data in Supabase

After saving the form, check if data was inserted:

```sql
SELECT * FROM bp_client_intake
WHERE project_id = '00000000-0000-0000-0000-000000000001';
```

---

## Troubleshooting

### Error: "Failed to save intake data"

**Check:**
1. ✅ Environment variables are set correctly
2. ✅ Tables exist in Supabase
3. ✅ The project exists in `bp_projects` table
4. ✅ Check browser console for detailed error
5. ✅ Check Vercel deployment logs for server-side errors

### Error: "Project ID is required"

**Solution:** Make sure you're accessing the intake form with a valid project ID in the URL:
- Format: `/blueprints/{projectId}/intake`
- Example: `/blueprints/test/intake` or `/blueprints/00000000-0000-0000-0000-000000000001/intake`

### Error: Foreign key constraint violation

**Cause:** No matching project in `bp_projects` table

**Solution:** Create a project first:
```sql
INSERT INTO bp_projects (id, name)
VALUES ('your-project-id-here', 'Your Project Name');
```

### Form saves but data doesn't persist

**Check:**
1. Clear your browser cache
2. Check Supabase Table Editor to verify data exists
3. Check if GET request is loading data correctly in Network tab

---

## Testing Checklist

- [ ] All BP tables created in Supabase
- [ ] Environment variables set (local or Vercel)
- [ ] Test project created in bp_projects
- [ ] Intake form loads at `/blueprints/[projectId]/intake`
- [ ] Form fields are editable
- [ ] "Save Draft" button works (check console)
- [ ] Data appears in Supabase `bp_client_intake` table
- [ ] Progress percentage calculates correctly
- [ ] Auto-save works (wait 30 seconds after editing)
- [ ] Reload page and verify data persists

---

## Quick Verification Script

Run this in Supabase SQL Editor to verify everything:

```sql
-- 1. Check tables exist
SELECT COUNT(*) as bp_table_count
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'bp_%';
-- Should return: 7

-- 2. Check test project exists
SELECT id, name FROM bp_projects LIMIT 5;

-- 3. Check if any intake data was saved
SELECT project_id, company, completion_percentage, created_at
FROM bp_client_intake
ORDER BY created_at DESC
LIMIT 5;

-- 4. Check foreign key relationships
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name LIKE 'bp_%'
ORDER BY tc.table_name;
```

---

## Next Steps After Database Setup

Once the intake form is saving correctly:

1. ✅ Fill out the intake form (at least 50% complete)
2. ✅ Click "Generate Brand Overview" button
3. ✅ Test the Knowledge Base at `/blueprints/[projectId]/knowledge`
4. ✅ Start building out the other Blueprint features

---

## Need Help?

If you're still experiencing issues:

1. **Check Vercel deployment logs** for server-side errors
2. **Check browser console** for client-side errors
3. **Verify Supabase is online** and accessible
4. **Test the Supabase connection** directly in their dashboard
5. **Ensure your Supabase project is on a paid plan** if you exceed free tier limits
