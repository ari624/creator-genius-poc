// ============================================================================
// GPT SYSTEM NOTES - Training Data for Blueprint Generator
// ============================================================================

export const GPT_SYSTEM_NOTES = {
  hookCreationRules: `
HOOK CREATION RULES:

1. MASS-FIRST, NICHE-LATER PRINCIPLE
   - Hook must appeal to BROAD audience first
   - Niche reveal happens in the script, NOT the hook
   - Example: "You're losing money" (mass) vs "Tennis players are losing money" (too niche)

2. EMOTION + CURIOSITY GAP
   - Trigger one of: fear, shock, aspiration, confusion, intrigue
   - Leave something unanswered to drive watch time
   - Example: "This mistake is costing you thousands" (fear + curiosity)

3. NO HYPER-NICHE TERMS IN HOOK
   - Unless universally understood, keep technical terms OUT
   - Example: Bad: "Your periodization is wrong", Good: "Your workout plan is backwards"

4. CLICKBAIT OVERLAY (3-6 words)
   - Short, bold, scroll-stopping
   - Should work WITHOUT context
   - Example: "One Simple Mistake", "Stop Doing This", "5 Things You Need"

5. HOOK FORMATS THAT WORK:
   - Problem identification: "You're doing X wrong"
   - Contrarian: "Everything you know about X is backwards"
   - Listicle promise: "5 things that will change your X"
   - Time-based: "In 30 days, you'll see X"
   - If/Then: "If you're struggling with X, watch this"
   - Secret reveal: "The one thing nobody tells you about X"
`,

  captionOptimizationRules: `
CAPTION OPTIMIZATION RULES:

1. PLATFORM-SPECIFIC FORMATTING:

   INSTAGRAM:
   - Hook in first line (before "more" cutoff)
   - Use line breaks for readability
   - 3-5 relevant hashtags (not spammy)
   - Emoji sparingly (1-2 per section)
   - CTA at the end
   - Boilerplate: "Drop a 🔥 if this helped!"

   TIKTOK:
   - Super short (2-3 sentences)
   - Hook in first 5 words
   - Trending hashtags (2-3)
   - Boilerplate: "Follow for more [niche] tips"

   YOUTUBE:
   - SEO-optimized description
   - Timestamps if applicable
   - Links to products/resources
   - Call to action (subscribe, comment)
   - Hashtags in description

   X (TWITTER):
   - Concise, punchy
   - Thread format if needed
   - Question to drive engagement
   - No hashtags (looks spammy)

   THREADS:
   - Similar to X but more conversational
   - Can be longer
   - Emoji OK
   - Use thread format for depth

   LINKEDIN:
   - Professional tone
   - Story-based if possible
   - Value-forward
   - Subtle CTA
   - No boilerplate phrases

2. ENGAGEMENT TRIGGERS:
   - Ask a question
   - Controversial take (if appropriate)
   - Tag someone who needs this
   - Save/share if helpful
   - Comment your experience

3. CTA LEVELS:
   - Value-only: No CTA, just value
   - Soft engagement: "Follow for more", "Save this", "Tag a friend"
   - Hard conversion: "Link in bio", "DM me to learn more", "Shop now"
`,

  blueprintOutputFormat: `
BLUEPRINT OUTPUT FORMAT:

1. HEADER SECTION:
   - Blueprint number
   - Internal title (file naming)
   - Public title
   - Video goal
   - Target audience
   - Hook (spoken)
   - Hook (overlay text)

2. SCRIPT TABLE (A-roll | B-roll):
   - Two columns: spoken words (A-roll) | visual instructions (B-roll)
   - Each row is one scene/section
   - B-roll should be specific and actionable
   - Include timing notes if critical

3. TELEPROMPTER SCRIPT:
   - Full script in code block for easy copy/paste
   - No stage directions, just spoken words
   - Natural flow with pauses indicated

4. CAPTIONS (in separate code blocks):
   - Instagram caption
   - TikTok caption
   - YouTube description
   - X (Twitter) caption
   - Threads caption
   - LinkedIn caption
   - Each optimized for platform

5. YOUTUBE TITLE:
   - SEO-optimized
   - 60 characters or less
   - Includes main keyword
   - Clickable but not misleading

6. OVERLAY TEXT:
   - List of text overlays to appear on screen
   - Numbered list with timing notes

7. SEO KEYWORDS:
   - 5-10 keywords
   - Mix of broad and specific
   - Based on research and niche

8. B-ROLL AI PROMPTS:
   - For each B-roll section, provide:
     * Scene description
     * Recommended tool (RunwayML, Midjourney, Pexels, etc.)
     * Specific prompt to use

9. REFERENCE LINKS:
   - Any source material
   - Product links
   - Related content

10. CREATIVE NOTES:
    - Any additional context
    - Optional variations
    - Production tips
`,

  brandOverviewFormat: `
BRAND OVERVIEW FORMAT:

The brand overview is the foundation of all content. It must include:

1. BRAND NAME: Official name

2. PRIMARY NICHE: The main category (e.g., "Fitness", "Real Estate", "Tennis")

3. SUB-NICHES (exactly 5):
   - Specific content pillars within the main niche
   - Example for Fitness: "Muscle Building", "Fat Loss", "Nutrition", "Supplements", "Home Workouts"
   - These are used for content distribution

4. INDUSTRY: Broader category (e.g., "Health & Wellness", "Sports", "Business")

5. TARGET AUDIENCE:
   - Demographics (age, gender, location)
   - Psychographics (goals, pain points, interests)
   - Experience level (beginner, intermediate, advanced)

6. BRAND VOICE:
   - Tone (professional, casual, motivational, educational, etc.)
   - Style (direct, storytelling, humorous, etc.)
   - Do's and Don'ts

7. KEY PRODUCTS (3-5):
   - Product name
   - Brief description
   - Link (if available)

8. UNIQUE SELLING POINTS (3-5):
   - What makes this brand different
   - Competitive advantages
   - Core value propositions

9. GOALS:
   - Audience growth targets
   - Engagement goals
   - Conversion objectives
   - Content consistency goals

10. CONTENT PILLARS:
    - Main themes for content
    - How they map to sub-niches
    - Content distribution strategy
`,

  provenBlueprints: `
PROVEN BLUEPRINT STRUCTURES:

1. LISTICLE FORMAT (5 Things, 3 Secrets, etc.):
   - Hook: "The [number] [things] that will [benefit]"
   - Structure: Intro → Item 1 → Item 2 → Item 3... → Recap → CTA
   - Each item: Name it → Explain it → Why it matters
   - Works for: Educational, value-only content

2. PROBLEM-SOLUTION FORMAT:
   - Hook: "If you're struggling with [problem], watch this"
   - Structure: Identify problem → Consequences → Solution → How to implement → CTA
   - Works for: Relatable pain points, product pitches

3. TRANSFORMATION FORMAT:
   - Hook: "How I went from [before] to [after]"
   - Structure: Starting point → Obstacles → Discovery → Action → Results → CTA
   - Works for: Personal stories, testimonials

4. MISTAKE FORMAT:
   - Hook: "You're making this mistake with [topic]"
   - Structure: Common approach → Why it's wrong → What to do instead → Results → CTA
   - Works for: Contrarian takes, correcting misconceptions

5. TUTORIAL FORMAT:
   - Hook: "Here's how to [achieve result] in [timeframe]"
   - Structure: Overview → Step 1 → Step 2 → Step 3 → Common mistakes → CTA
   - Works for: How-to, educational, skill-building

6. COMPARISON FORMAT:
   - Hook: "[Option A] vs [Option B]: Which is better?"
   - Structure: Intro both → Option A pros/cons → Option B pros/cons → Verdict → CTA
   - Works for: Product reviews, strategy comparisons

7. MYTH-BUSTING FORMAT:
   - Hook: "Everything you know about [topic] is wrong"
   - Structure: Common belief → Why it's a myth → Truth → Evidence → CTA
   - Works for: Contrarian content, educational
`,
};

// Helper function to get all system notes as a single prompt
export function getAllSystemNotes(): string {
  return Object.values(GPT_SYSTEM_NOTES).join('\n\n---\n\n');
}

// Helper function to get specific system note
export function getSystemNote(key: keyof typeof GPT_SYSTEM_NOTES): string {
  return GPT_SYSTEM_NOTES[key];
}
