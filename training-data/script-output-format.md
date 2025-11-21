# GPT SYSTEM NOTE — SCRIPT OUTPUT FORMAT

This document defines the EXACT format for outputting video scripts in the Blueprint Generator system.

---

## SCRIPT STRUCTURE

Every script must include these components in this exact order:

### 1. TELEPROMPTER SCRIPT (Code Block)

**Purpose:** Clean, copy-pasteable script for the creator to read

**Format:**
```
[Hook line - exactly as it should be spoken]

[Body paragraph 1 - natural speaking flow]

[Body paragraph 2]

[Body paragraph 3]

[CTA or closing line]
```

**Rules:**
- NO stage directions or action cues
- NO B-roll notes
- NO [pause] or [beat] markers
- Just the spoken words, naturally formatted
- Use line breaks between major thoughts
- Must be in a markdown code block for easy copying

**Example:**
```
You're losing money every single day because of this one mistake.

Most people think they need to post 5 times a day to grow. Wrong. What you actually need is one great piece of content that hits the algorithm just right.

Here's what that looks like: strong hook, clear value in the first 3 seconds, and a reason to watch until the end. That's it.

Stop overthinking it. Start doing it.
```

---

### 2. A-ROLL / B-ROLL TABLE

**Purpose:** Shot-by-shot breakdown for video editors

**Format:** Markdown table with two columns

| A-ROLL (Spoken) | B-ROLL (Visual) |
|-----------------|-----------------|
| [Exact words spoken] | [Specific visual instruction] |
| [Next line or section] | [What to show on screen] |

**A-Roll Column Rules:**
- Copy the exact words from the teleprompter script
- Break into logical sections (usually 1-3 sentences per row)
- Each row = one shot or scene

**B-Roll Column Rules:**
- Be SPECIFIC, not vague
- ✅ Good: "Show hands typing on laptop keyboard, close-up"
- ❌ Bad: "Footage of working"
- Include camera angles if important (close-up, wide shot, over-shoulder)
- Mention on-screen text overlays if applicable
- Mention products if being shown
- Use actionable language: "Cut to...", "Show...", "Zoom in on..."

**Example:**

| A-ROLL (Spoken) | B-ROLL (Visual) |
|-----------------|-----------------|
| You're losing money every single day because of this one mistake. | Creator talking to camera, serious expression. Text overlay: "ONE MISTAKE" |
| Most people think they need to post 5 times a day to grow. Wrong. | Cut to screen recording showing a calendar with too many posts marked. Shake head on "Wrong." |
| What you actually need is one great piece of content that hits the algorithm just right. | Show analytics dashboard with one viral post highlighted, green arrow pointing up |
| Here's what that looks like: strong hook, clear value in the first 3 seconds, and a reason to watch until the end. | Split screen: 3 sections showing "Hook", "Value", "Payoff" with examples |
| Stop overthinking it. Start doing it. | Back to creator talking to camera, confident expression. End screen with CTA |

---

### 3. PLATFORM-SPECIFIC CAPTIONS (Code Blocks)

**Purpose:** Copy-paste ready captions optimized for each platform

Each caption must be in its own markdown code block with a clear label.

**Required Platforms:**
1. Instagram
2. TikTok
3. YouTube (description)
4. X (Twitter)
5. Threads
6. LinkedIn (if brand is B2B or professional)

**Format:**

```
**INSTAGRAM CAPTION**
[Hook in first line before "more" cutoff]

[Body with line breaks for readability]

[CTA]

[3-5 relevant hashtags]
```

```
**TIKTOK CAPTION**
[2-3 sentence caption, hook in first 5 words]
[2-3 trending hashtags]
```

```
**YOUTUBE DESCRIPTION**
[SEO-optimized description]

Timestamps:
0:00 - [Section]
0:15 - [Section]

[Links to products/resources]

[Hashtags]
```

```
**X (TWITTER) CAPTION**
[Concise, punchy, no hashtags]
```

```
**THREADS CAPTION**
[Similar to X but more conversational, can be longer]
```

```
**LINKEDIN CAPTION** (if applicable)
[Professional tone, story-based, value-forward, subtle CTA]
```

**Rules:**
- Follow Caption Optimization Rules 2025 (see caption-optimization-rules.md)
- Each must be in a code block for easy copying
- Optimize for each platform's specific audience and algorithm
- Include 4 keywords total: 2 niche authority + 2 video-specific
- NO banned hashtags (#biztips, #girlboss, etc.)

---

### 4. YOUTUBE TITLE

**Format:**
```
**YOUTUBE TITLE:** [60 characters or less, SEO-optimized, includes main keyword]
```

**Rules:**
- 60 characters maximum
- Include primary keyword
- Clickable but not misleading
- Use title case
- NO clickbait that doesn't match content

**Examples:**
- ✅ "How to Grow on Instagram in 2024 (Without Posting 5X/Day)"
- ✅ "The One Marketing Mistake Costing You Thousands"
- ❌ "You Won't BELIEVE What Happened Next!!!" (too vague, clickbait)
- ❌ "My super long title that goes on forever and gets cut off in search results" (too long)

---

### 5. ON-SCREEN TEXT OVERLAYS

**Purpose:** Text that appears on the video itself

**Format:**
```
**ON-SCREEN TEXT OVERLAYS:**
1. [0:00-0:03] "ONE MISTAKE"
2. [0:15-0:18] "STOP POSTING 5X A DAY"
3. [0:30-0:35] "Quality > Quantity"
```

**Rules:**
- Use timestamps for when text should appear
- Keep it short: 2-6 words maximum
- ALL CAPS for emphasis, or Sentence Case for softer tone
- Align with A-roll script timing
- Should reinforce or emphasize spoken words, not replace them

---

### 6. SEO KEYWORDS

**Format:**
```
**SEO KEYWORDS:**
- [keyword 1]
- [keyword 2]
- [keyword 3]
- [keyword 4]
- [keyword 5]
```

**Rules:**
- 5-10 keywords
- Must include 2 niche authority keywords (from Brand Overview)
- Must include 2 video-specific keywords
- Mix of broad and specific
- Based on research data (ViralFindr, competitor analysis)
- Match search intent

**Example:**
```
**SEO KEYWORDS:**
- social media marketing (niche authority)
- content strategy (niche authority)
- Instagram growth tips (video-specific)
- posting frequency (video-specific)
- algorithm tips
- viral content
```

---

### 7. B-ROLL AI GENERATION PROMPTS (Optional but Recommended)

**Purpose:** Help creators generate B-roll using AI tools when original footage isn't available

**Format:**
```
**B-ROLL AI PROMPTS:**

Scene 1 (0:05-0:10): Calendar overwhelm
- Tool: Midjourney / RunwayML
- Prompt: "A digital calendar completely filled with colorful social media post icons, overwhelming and chaotic, modern UI design, clean aesthetic, 16:9 aspect ratio"

Scene 2 (0:20-0:25): Analytics success
- Tool: RunwayML / Pexels (stock alternative)
- Prompt: "Analytics dashboard showing one post with exponential growth, green upward arrow, clean modern interface, professional business aesthetic"
```

**Rules:**
- Include scene description and timestamp
- Recommend specific tools (RunwayML, Midjourney, Pexels, Storyblocks)
- Provide exact prompt for AI generation
- Mention aspect ratio (usually 9:16 for vertical video)
- Include aesthetic/style notes

---

## GPT INSTRUCTIONS FOR SCRIPT GENERATION

When generating a script:

1. **Always start with the teleprompter script in a code block** - this is the most important deliverable

2. **Create the A-roll/B-roll table next** - break the script into shots with specific visual instructions

3. **Generate platform-specific captions** - optimize for each platform's unique requirements

4. **Include all required components:**
   - Teleprompter script (code block)
   - A-roll/B-roll table
   - Platform captions (code blocks for each)
   - YouTube title
   - On-screen text overlays with timestamps
   - SEO keywords (5-10)
   - B-roll AI prompts (if applicable)

5. **Use the Brand Overview for:**
   - Voice and tone
   - Niche authority keywords
   - Target audience language
   - Brand personality

6. **Use the Content Idea for:**
   - Hook sentence (use exactly as provided)
   - Topic and context
   - Keywords
   - Products to mention
   - Sub-niche focus

7. **Follow Hook Creation Rules:**
   - Mass-first, niche-later principle
   - Hook in first 3-5 seconds of A-roll
   - Matches clickbait overlay from content idea

8. **Follow Caption Optimization Rules:**
   - Platform-specific formatting
   - 4 keywords total (2 niche + 2 video-specific)
   - No banned hashtags
   - Appropriate CTAs based on post type

9. **Script Length Guidelines:**
   - 30-60 second video: 75-150 words
   - 60-90 second video: 150-200 words
   - 90+ second video: 200-300 words

10. **Make it copyable:**
    - All scripts and captions in code blocks
    - Clean formatting
    - No extra commentary mixed in

---

## COMPLETE SCRIPT OUTPUT TEMPLATE

Use this as your template when generating scripts:

---

### TELEPROMPTER SCRIPT

```
[Full script here - clean, no stage directions, ready to read]
```

---

### A-ROLL / B-ROLL TABLE

| A-ROLL (Spoken) | B-ROLL (Visual) |
|-----------------|-----------------|
| [Line 1] | [Specific visual instruction] |
| [Line 2] | [Specific visual instruction] |
| [Line 3] | [Specific visual instruction] |

---

### CAPTIONS

```
**INSTAGRAM CAPTION**
[Caption here]
```

```
**TIKTOK CAPTION**
[Caption here]
```

```
**YOUTUBE DESCRIPTION**
[Description here]
```

```
**X (TWITTER) CAPTION**
[Caption here]
```

```
**THREADS CAPTION**
[Caption here]
```

```
**LINKEDIN CAPTION** (if applicable)
[Caption here]
```

---

### YOUTUBE TITLE

**YOUTUBE TITLE:** [Title here - 60 chars or less]

---

### ON-SCREEN TEXT OVERLAYS

1. [0:00-0:03] "[TEXT]"
2. [0:15-0:20] "[TEXT]"
3. [0:30-0:35] "[TEXT]"

---

### SEO KEYWORDS

- keyword 1
- keyword 2
- keyword 3
- keyword 4
- keyword 5

---

### B-ROLL AI PROMPTS (Optional)

**Scene 1 (timestamp):** [Description]
- Tool: [Recommended tool]
- Prompt: "[Exact prompt]"

**Scene 2 (timestamp):** [Description]
- Tool: [Recommended tool]
- Prompt: "[Exact prompt]"

---

## QUALITY CHECKLIST

Before delivering a script, verify:

- ✅ Teleprompter script is in a code block
- ✅ A-roll matches teleprompter exactly
- ✅ B-roll is specific and actionable
- ✅ All 6 platform captions included (or 5 if not B2B)
- ✅ YouTube title is 60 characters or less
- ✅ On-screen overlays have timestamps
- ✅ SEO keywords include 2 niche + 2 video-specific
- ✅ Hook follows mass-first, niche-later principle
- ✅ Voice/tone matches Brand Overview
- ✅ Products mentioned (if applicable)
- ✅ Everything is copyable (code blocks used correctly)

---

✅ **GPT FINAL REMINDER:**

The teleprompter script is the most important output. Make it clean, natural, and copy-paste ready. Everything else supports the creator in producing the video, but the script is what they'll perform. Prioritize clarity and deliverability.
