# 🎓 Creator Genius Platform

A complete Next.js 14 application with **THREE integrated systems** for social media content creation, client analysis, and blueprint generation.

## 🚀 Overview

The Creator Genius Platform combines three powerful systems:

1. **📚 Social Media Manual** - Internal knowledge base about social media marketing
2. **👥 Client Analyzer** - Analyze any client's content in their niche
3. **📋 Blueprint Generator** - Production content creation tool (POC)

## 🏗️ Architecture

### Three Separate But Connected Systems

**System 1: Social Media Manual**
- YOUR internal knowledge base about social media marketing
- Transcribe videos ABOUT social media → extract insights
- 15 domains (hooks, formats, algorithm, engagement, etc.)
- Used to train AI and inform System 3

**System 2: Client Analyzer**
- Analyze ANY client's completed content (any niche)
- Extract patterns, hooks, visuals specific to THEIR niche
- Each client is separate (fitness, real estate, etc.)
- Patterns can inform System 3 for similar clients

**System 3: Blueprint Generator (POC)**
- PRODUCTION tool for creating content
- Uses knowledge from System 1 (social media best practices)
- Can reference System 2 data (client patterns for similar industries)
- Workflow: Research → Content Ideas → Approval → Blueprints
- Generates: Content Idea Calendars, Blueprints, Scripts, Captions

**Connections:**
- System 3 can query System 1 for best practices
- System 3 can query System 2 for industry-specific patterns
- System 1 & 2 feed knowledge TO System 3
- All three share same UI theme but distinct sections

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Creator Genius brand colors)
- **Database:** Supabase (THREE separate schemas)
- **AI:** Anthropic SDK (Claude), OpenAI SDK (Whisper + GPT-4 Vision)
- **Export:** xlsx library (Excel exports)
- **UI Components:** Lucide React icons, Sonner toasts, Framer Motion (swipe gestures)
- **Rendering:** React Markdown

## 🎨 Brand Colors

**Primary Palette:**
- Purple Light: `#8B7CF6`
- Purple Medium: `#6D5ACF`
- Purple Dark: `#553C9A`
- Primary Gradient: `linear-gradient(135deg, #8B7CF6 0%, #6D5ACF 50%, #553C9A 100%)`

**Accent Colors:**
- Accent Blue: `#6366F1`
- Light Purple Accent: `#A78BFA`

**Design System:**
- Border Radius: 16px (standard), 24px (large elements)
- Shadows: Subtle, layered with varying opacity
- Gradients: Always 135-degree angle

## 🚦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database

Run the SQL schema in your Supabase project:

```bash
# Copy contents of database-schema.sql to Supabase SQL Editor and run
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
creator-genius-platform/
├── app/                              # Next.js App Router
│   ├── manual/                       # System 1: Social Media Manual
│   ├── clients/                      # System 2: Client Analyzer
│   └── blueprints/                   # System 3: Blueprint Generator
│       └── [projectId]/
│           └── ideas/page.tsx        # 🔥 Content Idea Calendar (swipe interface)
│
├── components/
│   ├── Navbar.tsx
│   ├── CodeBlock.tsx                 # Copyable code blocks
│   ├── ScriptTable.tsx               # A-roll/B-roll table
│   └── blueprints/
│       └── ContentIdeaCard.tsx       # 🔥 Swipeable card component
│
├── lib/
│   ├── supabase.ts                   # Database client
│   ├── anthropic.ts                  # Claude AI
│   ├── openai.ts                     # Whisper + GPT-4 Vision
│   ├── gpt-system-notes.ts           # Training data
│   └── types.ts                      # TypeScript types
│
└── training-data/                    # GPT system notes (static files)
    ├── hook-creation-rules.md
    ├── caption-optimization-rules.md
    ├── brand-overview-format.md
    ├── blueprint-output-format.md
    └── proven-blueprints.md
```

## 🗄️ Database Schemas

Three separate database sections in Supabase:

### System 1: Social Media Manual
- `sm_insights` - Marketing insights across 15 domains
- `sm_video_transcripts` - Video transcriptions
- `sm_insight_relationships` - Related insights
- `sm_insight_versions` - Version history

### System 2: Client Analyzer
- `clients` - Client profiles
- `client_content` - Posts and content
- `client_patterns` - Extracted patterns
- `client_hooks` - Hook templates
- `client_visuals` - Visual analysis

### System 3: Blueprint Generator
- `bp_projects` - Projects
- `bp_research_data` - Research uploads
- `bp_content_ideas` - **Content Idea Calendar** 🔥
- `bp_blueprints` - Full blueprints
- `bp_knowledge_references` - System 1 & 2 connections

See `database-schema.sql` for complete schemas.

## 🎯 System 3: Blueprint Generator Workflow

### Production Workflow

1. **Create Project** → Set up brand and goals
2. **Build Brand Overview** → Define niche, audience, voice
3. **Upload Research** → ViralFindr data or manual entry
4. **Generate Content Ideas** → High-level concept calendar
5. **Review Ideas** → Swipe interface (approve/reject/edit) 🔥
6. **Export Approved Ideas** → Excel spreadsheet
7. **Generate Full Blueprints** → From approved ideas
8. **Library & Export** → Download all deliverables

### 🔥 Content Idea Calendar (Key Feature)

**Idea Structure:**
- Internal title (file naming)
- Topic (1-2 sentence description)
- Clickbait overlay (3-6 words)
- Hook sentence (mass-first, niche-later)
- Keywords (3-5 SEO terms)
- Products mentioned (name + URL)
- Context notes (script details, sources)
- Sub-niche
- Post type (value-only, soft-cta, hard-cta)

**Swipe Review Interface:**
- Swipe Left / Press ← : Reject
- Swipe Right / Press → : Approve
- Swipe Up / Press ↑ : Edit
- Space: Skip to next

## 📋 Blueprint Output

Full blueprints include:
- Script table (A-roll | B-roll)
- Teleprompter script (copyable)
- Platform captions (Instagram, TikTok, YouTube, X, Threads, LinkedIn)
- YouTube title (SEO-optimized)
- Overlay text
- SEO keywords
- B-roll AI prompts (with tool recommendations)
- Reference links
- Creative notes

All outputs in **copyable code blocks** for easy production use.

## 🎨 Components

### Shared Components

**CodeBlock**
```tsx
<CodeBlock
  code={scriptText}
  title="Teleprompter Script"
  language="text"
/>
```

**ScriptTable**
```tsx
<ScriptTable rows={scriptRows} />
```

### Blueprint Components

**ContentIdeaCard** (Swipeable)
```tsx
<ContentIdeaCard
  idea={contentIdea}
  onApprove={() => handleApprove(idea.id)}
  onReject={() => handleReject(idea.id)}
  onEdit={() => handleEdit(idea.id)}
/>
```

## 🔌 API Routes

### Generate Content Ideas
`POST /api/blueprints/generate-ideas`

### Update Content Idea
`POST /api/blueprints/update-idea`

### Generate Blueprint from Idea
`POST /api/blueprints/generate-blueprint-from-idea`

### Export Ideas to Excel
`POST /api/blueprints/export-ideas`

## 📚 GPT System Notes

Training data files in `/training-data`:
- Hook Creation Rules (mass-first, niche-later)
- Caption Optimization Rules (platform-specific)
- Brand Overview Format
- Blueprint Output Format
- Proven Blueprint Structures

These inform all AI-generated content.

## 🎯 Key Features

✅ Three integrated systems with shared knowledge
✅ Swipeable content idea review (Tinder-style)
✅ Excel export for content calendars
✅ Full blueprint generation with scripts & captions
✅ Platform-specific caption optimization
✅ B-roll AI prompts with tool recommendations
✅ Copyable code blocks for all outputs
✅ Brand color system throughout
✅ Responsive design
✅ Toast notifications
✅ Keyboard shortcuts

## 🚀 Deployment

Deploy to Vercel:

```bash
# Connect your repo to Vercel
# Add environment variables in Vercel dashboard
# Deploy
```

## 📖 Documentation

- **Hook Rules:** See `/training-data/hook-creation-rules.md`
- **Caption Rules:** See `/training-data/caption-optimization-rules.md`
- **Blueprint Format:** See `/training-data/blueprint-output-format.md`
- **Database Schema:** See `database-schema.sql`

## 📝 License

MIT License

---

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, Supabase, Claude AI, and Framer Motion.
