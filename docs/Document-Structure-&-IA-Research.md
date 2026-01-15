# Document Structure & IA Research

<aside>
🎯

**Research Question:** How do different user segments (technical vs. non-technical) naturally structure and organize application documentation — and is there a delta between what works well for humans vs. what works well for AI?

</aside>

---

# Background & Context

Artifact's core thesis is that **the document is the interface**. Users describe what they want in natural language, and the system interprets that intent. This makes document structure fundamentally an **information architecture (IA) problem** — and arguably the #1 UX issue to solve.

Key assumptions to test:

- Software professionals (PMs, BAs, Designers) may structure ideas differently than non-technical users
- The structure imposed by current processes may not reflect how people *naturally* think
- There may be a gap between document structures that are intuitive for humans vs. effective for AI interpretation
- Or — we may find alignment, which would be a significant product insight

This research will directly inform:

- Artifact's core document experience
- DxD (Design by Discovery) methodology
- AI prompt engineering and interpretation layer

---

# Research Objectives

1. **Understand natural mental models** — How do different user segments naturally organize application concepts?
2. **Identify the delta** — Is there a meaningful difference between technical and non-technical approaches?
3. **Test human vs. AI alignment** — Does a structure that works well for humans also work well for AI (and vice versa)?
4. **Inform terminology** — What do people call things? How do they label? What vocabulary resonates?
5. **Validate or invalidate assumptions** — Surface unexpected patterns that could reshape the product

---

# Target Segments

| Segment | Description | Recruiting Notes |
| --- | --- | --- |
| **Technical-adjacent** | PMs, BAs, Designers — familiar with software process | Easier to source; may have process-imposed biases |
| **Non-technical** | Small business owners, tradespeople, creators | Harder to recruit; may reveal more natural patterns |
| **Software engineers** | Developers, architects | Control group — how do builders think? |

---

# Proposed Methods

## Phase 1: Card Sort Exercise

**Stimulus choice:** Pick applications non-technical users would understand and could imagine needing to build:

- A **todo app** — universally understood, simple domain
- A **booking system** — appointments, reservations, availability
- Avoid Twitter-level complexity for non-technical participants

**Two test variants:**

| Variant | Description | What it reveals |
| --- | --- | --- |
| **A: Blank slate** | Participant describes the app from scratch in their own words | Natural mental models, vocabulary, unprompted structure |
| **B: Card sort** | Participant is given cards with features/concepts and asked to organize them | How they categorize and relate given concepts |

Running both variants lets us compare *generative* thinking (what do they come up with?) vs. *organizational* thinking (how do they structure what's given?).

## Phase 2: Follow-up Conversations

- Semi-structured interviews to understand *why* they organized things a certain way
- Probe for vocabulary, mental models, and assumptions
- ~30 min per session

## Phase 3: AI Interpretation Testing

Take participant-generated outputs and run them through AI to see how well it can interpret and expand on ambiguous human input.

**Metrics that matter:**

| Metric | Description |
| --- | --- |
| **Accuracy** | Does AI correctly interpret what the person meant? |
| **Completeness** | Does AI flesh out the full product scope? |
| **Robustness** | Does AI surface concerns the person didn't know to ask about? (security, edge cases, error handling) |
| **Unknown unknowns** | Does AI ask clarifying questions the person lacks the knowledge to anticipate? |

**The real test:** Can AI take something ambiguous from a person who doesn't fully understand software and turn it into something robust — both functionally complete and secure?

## Phase 4: Synthesis & Patterns

- Cross-segment analysis
- Identify convergent patterns (what everyone does)
- Identify divergent patterns (where segments differ)
- Develop recommendations for Artifact's document experience

---

# 🔨 Research App Proposal

<aside>
🛠️

**Core question:** How far is natural human expression from what Arnold needs — and what's the translation cost?

Arnold requires structured specs: **entities, properties, relationships, views, actions**. Users describe apps in natural language. This research measures the gap.

</aside>

---

## 🎨 Frontend Design Prompt (for Gemini / Vibe-Coding)

<aside>
📝

**Copy this prompt to generate the frontend.** It captures Artifact's brand identity while keeping the research app focused and non-distracting.

</aside>

▼ **Expand to view full prompt**

```
BUILD A RESEARCH SURVEY APP FOR ARTIFACT
========================================

I need you to build a multi-screen research survey app that captures how people 
naturally describe software. The app should feel like it belongs to Artifact’s 
brand—visually impressive but not distracting. The focus is on capturing 
high-quality text responses.

1. OVERALL VIBE
---------------
The app should feel like a beautifully typeset research instrument. Think: 
Typeform’s elegance meets Stripe’s clarity meets a design manifesto.

- "Editorial Modernism" — like a high-end design publication, not a code editor
- "Futurism through restraint" — minimal structure with strange warmth
- "Surgical calm" — clarity so clean it borders on spiritual
- Generous whitespace — let the content breathe
- One question/section visible at a time — reduce cognitive load

This is NOT a typical survey. It should feel considered, intentional, and 
respectful of the participant’s time.

2. COLOR PALETTE
----------------
PRIMARY PALETTE
  Background:        #0D0D0D (near-black)
  Surface:           #1A1A1A (card/input backgrounds)
  Border:            #2A2A2A (subtle dividers)
  
  Text Primary:      #FAFAFA (off-white)
  Text Secondary:    #A0A0A0 (muted gray)
  Text Tertiary:     #666666 (subtle labels)

ACCENTS (use sparingly)
  Primary Accent:    #E0FF4F (electric lime) — for CTAs, active states
  Secondary:         #4FFFE0 (mint/cyan) — for progress, success
  Tertiary:          #FF4F8E (coral pink) — for warnings, optional

USAGE RULES
  - Dark background throughout — easy on the eyes for extended writing
  - Accent colors ONLY for interactive elements (buttons, focus states)
  - Never use accents for large areas — they should pop, not dominate
  - Input fields: slightly lighter surface (#1A1A1A) with subtle border

3. TYPOGRAPHY
-------------
FONT STACK
  Display/Headlines: Space Grotesk (or Satoshi)
                     Bold weight, tight letter-spacing
                     Used for: screen titles, hero text
  
  Body:              Inter (or Geist Sans)
                     Regular/Medium weights
                     Line-height: 1.6 (generous)
                     Used for: questions, descriptions, UI elements
  
  Accent Mono:       JetBrains Mono (or Geist Mono)
                     Used for: word count, technical labels
                     NOT just for code—used stylistically

SIZE SCALE
  Screen Title:      32-40px (one per screen, top)
  Question Text:     20-24px (the actual questions)
  Body/Description:  16-18px (helper text, explanations)
  Labels:            14px (input labels, captions)
  Micro:             12px (word count, timestamps)

4. LAYOUT PRINCIPLES
--------------------
DESKTOP (primary)
  - Centered content container: max-width 680px
  - Generous vertical padding: 80-120px top/bottom per screen
  - One primary question or section per screen
  - Progress indicator: subtle, top of screen
  - Navigation: bottom-right, single primary CTA

MOBILE (optimized)
  - Full-width with 24px horizontal padding
  - Reduced vertical padding: 40-60px
  - Touch-friendly input fields: min-height 48px
  - Sticky bottom CTA button
  - Same one-screen-at-a-time pattern

GENERAL
  - Empty space as reverence — don’t crowd the screen
  - Alignment as ritual — everything perfectly aligned
  - No sidebars, no distractions
  - Smooth transitions between screens (fade + slight slide)

5. COMPONENT SPECIFICATIONS
---------------------------

PROGRESS BAR
  - Position: top of screen, full width
  - Height: 3px
  - Background: #2A2A2A (track)
  - Fill: #E0FF4F (lime accent)
  - No text percentage — just the visual
  - Animate smoothly on screen change

BUTTONS
  Primary CTA:
    - Background: #E0FF4F (lime)
    - Text: #0D0D0D (black)
    - Padding: 16px 32px
    - Border-radius: 8px
    - Font: Medium weight, 16px
    - Hover: brightness increases 10%
    - Disabled: opacity 0.4, no hover effect
  
  Secondary/Skip:
    - Background: transparent
    - Text: #A0A0A0 (muted)
    - Border: 1px solid #2A2A2A
    - Hover: border color brightens

TEXT INPUTS
  Single-line:
    - Background: #1A1A1A
    - Border: 1px solid #2A2A2A
    - Border-radius: 8px
    - Padding: 16px
    - Focus: border color #E0FF4F (lime)
    - Placeholder: #666666
  
  Textarea (for intent capture):
    - Same styling as single-line
    - Min-height: 200px
    - Expandable (grows with content)
    - Word count in bottom-right corner (monospace, muted)

SELECT/RADIO GROUPS
  - Vertical stack of options
  - Each option: full-width card style
  - Background: #1A1A1A
  - Border: 1px solid #2A2A2A
  - Padding: 16px 20px
  - Gap between options: 12px
  - Selected state: border #E0FF4F, subtle glow
  - Hover: border color brightens slightly

CHECKBOX (consent)
  - Custom styled, not browser default
  - Size: 24px square
  - Border: 2px solid #2A2A2A
  - Checked: filled #E0FF4F with checkmark
  - Label: inline, clickable

6. SCREEN-BY-SCREEN SPECS
-------------------------

SCREEN 1: WELCOME & CONSENT
  Layout:
    - Centered content
    - Large headline at top: "Help us understand how people naturally describe software"
    - 2-3 sentences of explanation below
    - Consent checkbox with label
    - Primary CTA: "Continue" (disabled until checked)
  
  Visual notes:
    - This is the first impression — should feel welcoming, not clinical
    - Subtle Artifact branding (small logo or wordmark in corner)
    - Maybe a very subtle animated gradient in background (barely perceptible)

SCREEN 2: PARTICIPANT INTAKE
  Layout:
    - Title: "Tell us a bit about yourself"
    - Four questions, vertically stacked:
      1. First name (text input)
      2. Work type (radio group with 4 options)
      3. Spec experience (radio group with 3 options)
      4. Vibe-coding experience (radio group with 4 options)
    - Primary CTA: "Continue"
  
  Visual notes:
    - Questions should feel conversational, not form-like
    - Generous spacing between question groups (40px+)
    - Labels above inputs, not floating

SCREEN 3: STIMULUS INTRODUCTION
  Layout:
    - Title: "Imagine an app you wish existed"
    - Descriptive paragraph setting the scene
    - Familiarity check (radio group)
    - Primary CTA: "I’m ready to describe it"
  
  Visual notes:
    - This is the bridge to the main task — build anticipation
    - Slightly more visual interest (maybe a subtle icon or illustration)
    - The description should feel like a creative prompt, not instructions

SCREEN 4: INTENT CAPTURE (THE CORE)
  Layout:
    - Title: "Describe the app you wish existed"
    - Subtitle: "Write as much or as little as you want. There’s no right or wrong answer."
    - Large textarea (min-height 200px, expandable)
    - Word count in bottom-right of textarea (monospace, muted)
    - Expandable "Need a hint?" section below (collapsed by default)
    - Primary CTA: "Submit & Continue"
  
  Visual notes:
    - This is the most important screen — minimize distractions
    - The textarea should feel inviting, like a blank page waiting to be written on
    - Ample vertical space above and below
    - The word count should be unobtrusive (just informational)
    - No validation errors — accept whatever they write

SCREEN 7: REFLECTION & WRAP-UP
  Layout:
    - Title: "Almost done — a few quick reflections"
    - Questions:
      1. Difficulty rating (5-point scale, visual selector)
      2. Vocabulary gap (Yes/No/Unsure radio)
      3. If yes, what felt hard? (conditional text input)
      4. Anything else? (optional textarea)
      5. Follow-up interest (Yes/No radio)
      6. If yes, email (conditional email input)
    - Primary CTA: "Submit"
  
  Visual notes:
    - Lighter cognitive load — these are quick questions
    - The 5-point scale should be visual (circles or buttons, not a dropdown)
    - Conditional fields should animate in smoothly
    - Email field should feel optional, not required

SCREEN 8: THANK YOU
  Layout:
    - Centered content
    - Large headline: "Thank you!"
    - Confirmation message
    - Optional: Link to learn more about Artifact
  
  Visual notes:
    - This should feel like a satisfying conclusion
    - Maybe a subtle animation (checkmark, confetti-lite, or just a fade-in)
    - Include a small Artifact wordmark/logo

7. ANIMATIONS & TRANSITIONS
---------------------------
SCREEN TRANSITIONS
  - Type: Fade + slight slide up
  - Duration: 0.4s
  - Easing: ease-out
  - Progress bar animates in sync

INPUT FOCUS
  - Border color transitions smoothly (0.2s)
  - Subtle glow effect on focus

BUTTON HOVER
  - Brightness/color shift: 0.15s ease

CONDITIONAL FIELDS
  - Slide down + fade in: 0.3s ease-out
  - Height animates smoothly (no jump)

BACKGROUND (optional)
  - Very slow gradient shift (60s+ cycle)
  - Opacity: 5-10% (barely perceptible)
  - Purpose: adds depth without distraction

DO NOT:
  - Use bouncy animations
  - Add loading spinners unless truly loading
  - Animate every element — restraint is key

8. RESPONSIVE BEHAVIOR
----------------------
BREAKPOINTS
  Desktop:   1024px+ (full experience)
  Tablet:    768px - 1023px
  Mobile:    < 768px

MOBILE ADJUSTMENTS
  - Reduce headline sizes (32px → 24px)
  - Full-width buttons (sticky at bottom)
  - Tighter vertical padding
  - Touch-friendly tap targets (min 48px)
  - Progress bar remains at top

9. ACCESSIBILITY
----------------
- All interactive elements keyboard-navigable
- Focus states clearly visible (lime border)
- Sufficient color contrast (WCAG AA minimum)
- Form labels associated with inputs
- Error states announced to screen readers
- Reduced motion option (disable transitions)

10. TECH STACK
--------------
RECOMMENDED
  Framework:    Next.js 14+ or SvelteKit
  Styling:      Tailwind CSS
  Animations:   Framer Motion (React) or native CSS
  Backend:      PocketBase (SQLite)
  Hosting:      Zo Computer (or Vercel)

FONT LOADING
  - Use next/font or self-hosted for reliability
  - Preload display font
  - System font fallback stack

11. BRAND ALIGNMENT CHECKLIST
-----------------------------
☐ Dark background throughout (#0D0D0D)
☐ Electric lime (#E0FF4F) for primary CTAs only
☐ Generous whitespace — content breathes
☐ One question/section per screen
☐ Typography hierarchy clear and consistent
☐ Transitions smooth but not flashy
☐ Feels like Artifact — "futurism through restraint"
☐ Surgical calm — clarity without coldness
☐ Visually impressive but not distracting

12. SAMPLE CONTENT
------------------
Use these exact strings for building:

Welcome headline:
"Help us understand how people naturally describe software"

Welcome description:
"We’re researching how different people think about and describe 
applications. This will take 10-15 minutes. Your responses help 
us build better tools."

Consent checkbox:
"I understand my responses will be used for research purposes 
and may be anonymized and shared."

Intent capture prompt:
"Describe the app you wish existed. Write as much or as little 
as you want. There’s no right or wrong answer — we just want to 
understand how you naturally think about it."

Hint prompts (collapsed by default):
- "What would you do with this app?"
- "What information would it keep track of?"
- "How would it look or feel to use?"

Thank you message:
"Thank you! Your responses have been saved."

========================================
END OF PROMPT
========================================
```

## The Real Research Question

Artifact's workflow is **Write → Plan → Build → Review**. In the "Write" phase, users describe what they want. Arnold (the documentation engine) must:

1. Parse that natural language
2. Ask clarifying questions
3. Build a structured JSON specification with entities, properties, relationships, views, and actions

The research question is: **How much work does Arnold have to do?**

- Do people naturally think in terms of entities and properties?
- Do they mention relationships explicitly, or does Arnold have to infer them?
- Do they think about views (list, form, detail) or just "the app"?
- What do they NOT mention that Arnold must surface? (security, error handling, delete flows, edge cases)

This directly informs how Arnold should be designed — and whether DxD's thesis ("discover, don't specify") is validated.

---

## App Flow: Screen-by-Screen Specification

### Screen 1: Welcome & Consent

**Purpose:** Set expectations, establish trust, capture consent.

**UI Elements:**

- Hero text: *"Help us understand how people naturally describe software"*
- Brief explanation (2-3 sentences): *"We're researching how different people think about and describe applications. This will take 10-15 minutes. Your responses help us build better tools."*
- Consent checkbox: *"I understand my responses will be used for research purposes and may be anonymized and shared."*
- **[Continue]** button (disabled until consent checked)

**Data captured:**

- `consent_given` (boolean)
- `consent_timestamp` (datetime)

---

### Screen 2: Participant Intake

**Purpose:** Capture segment classification and control variables. Keep friction low.

<aside>
⚡

**Design decision:** Email is collected at the end (Screen 7), not here. Early email collection increases drop-off.

</aside>

**Questions:**

| **Question** | **Input Type** |
| --- | --- |
| What's your first name? | Text input |
| Which best describes your work? | Single select |
| Have you ever written requirements, specs, or user stories for software? | Single select |
| Have you ever used a "vibe coding" tool (Cursor, Lovable, Bolt, Replit Agent, etc.)? | Single select |

**Data captured:** All fields stored in `participants` table (email added later from Screen 7).

---

### Screen 3: Stimulus Introduction

**Purpose:** Present the scenario and prime the participant.

<aside>
💡

**Language matters:** Avoid "build a software app" — this triggers software anxiety in non-technical users. Use "describe an app you wish existed" instead.

</aside>

**UI Elements:**

- **MVP:** Single stimulus only (Todo App). Second stimulus (Booking System) added in Phase 2.
- Context paragraph:
    - *"Imagine an app you wish existed — something to help you track tasks, mark them complete, maybe organize them. Don't worry about technical details or how it would be built. Just describe what you'd want it to do and how you'd want to use it."*
- **Familiarity check:** "How familiar are you with todo apps?"
    - Very familiar (I use one regularly)
    - Somewhat familiar
    - Not very familiar

**Data captured:**

- `stimulus` (enum: todo_app) — single stimulus for MVP
- `stimulus_familiarity` (enum)

---

### Screen 4: Intent Capture (Primary Data Source)

**Purpose:** Capture natural language description of desired application. This is the core research artifact.

**UI Elements:**

- Prompt text: *"Describe the app you wish existed. Write as much or as little as you want. There's no right or wrong answer — we just want to understand how you naturally think about it."*
- Large textarea (min-height: 200px, expandable)
- Word count indicator (live, non-judgmental: "127 words")
- Timer running in background (not shown to user)
- Optional: "Need a hint?" expandable with soft prompts:
    - "What would you do with this app?"
    - "What information would it keep track of?"
    - "How would it look or feel to use?"
- **[Submit & Continue]** button

**Data captured:**

- `raw_text` (text) — **primary research artifact**
- `word_count` (int, computed)
- `time_spent_seconds` (int)
- `started_at`, `submitted_at` (timestamps)
- `hint_expanded` (boolean)

<aside>
🚫

**Deferred:** Keystroke telemetry adds engineering cost with minimal interpretive value. Removed from MVP.

</aside>

---

### Screen 5: Clarifying Questions (Simulating Arnold)

<aside>
⏳

**Phase 1 feature.** This screen is deferred from Phase 0 MVP. Add after baseline behavior is understood.

</aside>

**Purpose:** Test how participants respond to structured follow-up questions — simulating what Arnold would ask.

**UI Elements:**

- Introduction: *"Thanks! Now imagine an AI assistant read your description and wants to make sure it understands. Here are a few clarifying questions:"*
- Display **max 3 questions** dynamically based on what's **missing** from their response
- Each question has a text input for response
- **[Skip this section]** link (tracks opt-out)
- **[Submit & Continue]** button

**Clarifying Question Constraints:**

- **Max 3 questions per user** — avoid survey fatigue
- **Trigger only on missing critical spec dimensions** — prioritize learning gaps, not completeness
- **Avoid edge-case probing** in early versions — use those later once baseline behavior is understood

**Priority Question Categories (ask only when absent):**

| **Priority** | **If missing...** | **Ask...** |
| --- | --- | --- |
| 1 | No entities mentioned | "What are the main 'things' in your app? (e.g., tasks, lists, categories)" |
| 2 | No actions mentioned | "What would you want to do with this app? (e.g., add, complete, organize)" |
| 3 | No views mentioned | "How would you want to see your tasks? (e.g., a list, a calendar, grouped by project)" |

**Deferred questions (Phase 2+):**

- Properties / attributes
- Relationships between entities
- User types / permissions
- Edge cases / error handling

**Data captured:**

- `clarifying_questions_shown` (array of question IDs)
- `clarifying_responses` (JSON object: `\\\\\\\{question_id: response_text\\\\\\\}`)
- `clarifying_skipped` (boolean)

---

### Screen 6: Card Sort (Variant B)

<aside>
⏳

**Phase 2 feature.** Card sort introduces friction and dropout risk. Defer until core intent capture patterns are understood.

</aside>

**Purpose:** Test organizational thinking with pre-defined concepts.

**Rationale for deferral:**

- Card sort adds UX complexity and engineering overhead
- Risk of dropout mid-session
- Intent capture (Screen 4) provides 80% of learning value
- Card sort is more useful once we know what patterns to probe

**When to add:**

- After Phase 0 analysis reveals specific organizational questions
- When we want to compare generative vs. organizational thinking

**UI Elements (for Phase 2):**

- **Card deck** (draggable cards with concept labels):
    - Entity cards: User, Task, Project, Category, Tag
    - Property cards: Title, Description, Due Date, Status, Priority
    - View cards: List View, Calendar View, Dashboard, Kanban Board
    - Action cards: Create, Edit, Delete, Complete, Archive, Search
    - Pattern cards: Login, Notifications, Reminders, Permissions
- **Drop zones** (user-created categories with editable labels)
- Move sequence tracked in background

**Data captured (Phase 2):**

- `final_state` (JSON: `\\\\\\\{category_name: \\\\\\\[card_ids\\\\\\\]\\\\\\\}`)
- `move_sequence` (JSON array)
- `category_names` (array of strings)

---

### Screen 7: Reflection & Wrap-up

**Purpose:** Capture meta-cognition, collect optional email, and close the loop.

**Questions:**

| **Question** | **Input Type** |
| --- | --- |
| How easy or hard was it to describe the app you wanted? | 5-point scale (Very easy → Very hard) |
| Did you feel like you were missing vocabulary or concepts? | Yes / No / Unsure |
| If yes, what felt hard to express? | Text |
| Anything else you'd like to share? | Text |
| Would you be open to a 15-minute follow-up conversation? | Yes / No |
| If yes, what's your email? | Email input |

<aside>
📧

**Email collected here, not at intake.** This reduces drop-off and increases completion rate. Email is optional even for follow-up opt-ins.

</aside>

**Data captured:** All fields stored in `session_feedback` table. Email linked back to `participants` record.

---

### Screen 8: Thank You

**Purpose:** Confirm completion, provide next steps.

**UI Elements:**

- Confirmation message: *"Thank you! Your responses have been saved."*
- If opted into follow-up: *"We'll reach out soon to schedule a brief conversation."*
- Optional: Share link to Artifact or DxD for interested participants

---

## Tech Stack (Updated for Zo Computer Deployment)

<aside>
🖥️

**Deployment target:** Zo Computer — a personal AI cloud server with one-click deploy and built-in hosting.

PocketBase is ideal here: single binary, SQLite-backed, no external database dependencies.

</aside>

| **Layer** | **Technology** |
| --- | --- |
| **Frontend** | Next.js (React) or SvelteKit |
| **Drag-and-drop** | dnd-kit (React) or svelte-dnd-action (Svelte) |
| **Backend / Database** | **PocketBase** (SQLite) |
| **Auth** | PocketBase Auth (email/password or OAuth) |
| **Hosting** | Zo Computer |
| **Analysis** | Export to CSV → Python/Jupyter or Google Sheets |

### Why PocketBase + Zo Computer?

- **Single file deployment:** PocketBase is one executable + one `.db` file. No Postgres, no Redis, no external services.
- **Built-in admin UI:** Review submissions, export data, manage participants without building an admin panel.
- **Real-time capable:** If we want live dashboards or collaboration features later, PocketBase supports it.
- **SQLite performance:** For read-heavy research data (capture once, analyze many times), SQLite is fast and simple.
- **Zo Computer fit:** Zo is designed for exactly this — deploy a backend, host a frontend, own your data. No vendor lock-in.

---

## Data Model (PocketBase Collections)

```
// COLLECTION: participants
participants {
  id: string (auto)
  name: string
  email: string (optional) // collected at end, not intake
  segment: select ["technical-adjacent", "non-technical", "engineer", "other"]
  segment_other: string (optional)
  has_written_specs: select ["regularly", "occasionally", "rarely_never"]
  vibe_coding_experience: select ["extensive", "a_little", "know_not_used", "dont_know"]
  consent_given: boolean
  consent_timestamp: datetime
  created_at: datetime (auto)
  open_to_followup: boolean
}

// COLLECTION: sessions
sessions {
  id: string (auto)
  participant: relation -> participants
  stimulus: select ["todo_app", "booking_system"]
  stimulus_familiarity: select ["very_familiar", "somewhat_familiar", "not_familiar"]
  variant: select ["intent_capture", "card_sort", "both"]
  started_at: datetime
  completed_at: datetime
  duration_seconds: number
}

// COLLECTION: intent_responses
intent_responses {
  id: string (auto)
  session: relation -> sessions
  raw_text: text
  word_count: number
  time_spent_seconds: number
  hint_expanded: boolean
  // keystroke_data removed - deferred from MVP
  submitted_at: datetime
}

// COLLECTION: clarifying_responses  
clarifying_responses {
  id: string (auto)
  session: relation -> sessions
  questions_shown: json // array of question IDs
  responses: json // {question_id: response_text}
  skipped: boolean
  submitted_at: datetime
}

// COLLECTION: card_sort_responses
card_sort_responses {
  id: string (auto)
  session: relation -> sessions
  final_state: json // {category_name: [card_ids]}
  move_sequence: json // [{timestamp, card_id, from, to}]
  category_names: json // ["Category 1", "Category 2", ...]
  time_spent_seconds: number
  submitted_at: datetime
}

// COLLECTION: session_feedback
session_feedback {
  id: string (auto)
  session: relation -> sessions
  difficulty_rating: number (1-5)
  felt_vocabulary_gap: select ["yes", "no", "unsure"]
  vocabulary_gap_details: text (optional)
  open_feedback: text (optional)
  submitted_at: datetime
}
```

---

## Data Ingestion Flow

### Real-time capture during session:

```
[User lands on app]
        ↓
[Screen 1: Consent] → consent_given, consent_timestamp
        ↓
[Screen 2: Intake] → CREATE participants record
        ↓
[Screen 3: Stimulus] → CREATE sessions record (links to participant)
        ↓
[Screen 4: Intent Capture]
        ↓ (on submit)
        → CREATE intent_responses record
        → Start background timer for keystroke analysis (optional)
        ↓
[Screen 5: Clarifying Questions]
        ↓ (on submit or skip)
        → CREATE clarifying_responses record
        ↓
[Screen 6: Card Sort]
        ↓ (on submit)
        → CREATE card_sort_responses record
        ↓
[Screen 7: Reflection]
        ↓ (on submit)
        → CREATE session_feedback record
        → UPDATE sessions record (completed_at, duration_seconds)
        ↓
[Screen 8: Thank You]
```

### Post-capture analysis pipeline:

```
[Export from PocketBase (CSV or direct SQLite query)]
        ↓
[Python/Jupyter notebook]
        ↓
[For each intent_response.raw_text]:
    → Run NLP extraction (entities, properties, relationships, views, actions)
    → Compute derived metrics (entity_count, property_count, etc.)
    → Score completeness vs. Arnold's required spec elements
        ↓
[Store derived metrics back to PocketBase or analysis DB]
        ↓
[Generate cross-segment comparison reports]
```

---

## Backend Requirements Summary

For the app to work, PocketBase needs:

1. **Collections created** per the data model above
2. **API rules configured:**
    - Participants: Create (public), Read/Update/Delete (admin only)
    - Sessions: Create (authenticated or public with participant ID), Read (admin)
    - All response collections: Create (public with session ID), Read (admin)
3. **Email configuration** (optional): For magic link auth or follow-up emails
4. **CORS settings:** Allow requests from frontend domain
5. **Backup strategy:** Periodic SQLite file backup (can use Litestream for continuous backup)

---

## Value Hypotheses to Validate

This research primarily tests three hypotheses:

### 1. Human Starting Point

**Expected patterns by segment:**

| **Segment** | **Expected Pattern** |
| --- | --- |
| Non-technical users | Lead with **outcomes and actions** ("I want to check things off") |
| Engineers | Lead with **structure** ("There's a Task entity with properties...") |
| PMs / Designers | Mix both — outcomes + some structural thinking |

### 2. Arnold Inference Load

**Likely universal omissions** (things people won't mention that Arnold must infer):

- Permissions / access control
- Error handling
- Multi-user conflicts
- Deletion semantics
- Data validation

These gaps directly inform Arnold's **default inference behavior** and **guardrail logic**.

### 3. Document-as-Interface Thesis

**Success criteria:**

Users can:

- Describe intent naturally
- Answer limited clarifying questions
- Produce usable structured specs

**If validated:** Artifact's core positioning is strengthened — documents can be the interface.

**If invalidated:** We learn what scaffolding or structure users need to express intent.

---

## Sample Size Targets

Initial learning does not require large datasets.

**Phase 0 targets:**

| **Segment** | **Target n** |
| --- | --- |
| Non-technical | 10 |
| Technical-adjacent (PM/BA/Designer) | 10 |
| Engineers | 10 |
| **Total** | **30** |

This is sufficient to observe structural pattern differences and validate core assumptions. Statistical significance is not the goal — pattern recognition is.

---

## Build Phases

<aside>
🎯

**Guiding principle:** Engineering discipline here is restraint. Your leverage comes from intent capture quality, clarification UX, and inference gap measurement — not from perfect instrumentation.

**Ship small. Learn fast. Then scale.**

</aside>

### Phase 0: Weekend MVP

**Goal:** Extract maximum learning with minimum system complexity.

**Build:**

- [ ]  Screen 1: Consent
- [ ]  Screen 2: Intake (no email)
- [ ]  Screen 3: Todo stimulus only
- [ ]  Screen 4: Freeform intent capture
- [ ]  Screen 7: Reflection (with optional email)
- [ ]  Screen 8: Thank you
- [ ]  PocketBase backend with core collections
- [ ]  CSV export

**Recruit:** 15–30 users across segments.

**Analyze:** Manual qualitative review.

### Phase 1: Iteration

**Trigger:** After Phase 0 analysis reveals patterns.

**Add:**

- [ ]  Screen 5: Clarifying question logic (max 3 questions)
- [ ]  Arnold-style interpretation pass (GPT-based extractor)
- [ ]  Structured extraction: entities, actions, views, missing assumptions

**Recruit:** Additional 15–30 users.

**Analyze:** Compare pre/post clarification completeness.

### Phase 2: Expansion

**Trigger:** After Phase 1 validates clarification value.

**Add:**

- [ ]  Screen 6: Card sort interface
- [ ]  Second stimulus (booking system)
- [ ]  Automated scoring pipeline
- [ ]  Visualization dashboards
- [ ]  Move sequence replay

**Recruit:** Broader sample for statistical patterns.

---

## AI Interpretation Testing (Lightweight)

<aside>
🤖

**MVP approach:** Avoid building full scoring infrastructure early. Manual qualitative review is sufficient initially.

</aside>

**For each response:**

1. Run through Arnold prototype or GPT-based extractor
2. Extract:
    - Entities mentioned
    - Actions mentioned
    - Views mentioned
    - Missing assumptions (what Arnold would need to infer)
3. Score completeness vs. Arnold's required spec elements
4. Compare scores by segment

**Automated scoring pipelines** should follow after patterns stabilize.

---

# Tooling & Data Collection

<aside>
💡

**Summary:** The research app described above replaces the need for third-party card sort tools. Discord remains useful for recruiting and community engagement.

</aside>

**Discord as a channel:**

- Reference: Zo Computer's Discord as a model for community-driven research
- Use Discord for recruiting, async participation, and gathering signals

---

# Open Questions

- [x]  ~~What known applications should we use for the card sort?~~ → **Todo app for MVP, booking system for Phase 2**
- [x]  ~~What's a reasonable sample size per segment?~~ → **10 per segment (30 total) for Phase 0**
- [ ]  How do we operationalize "works well for AI"? (accuracy, completeness, robustness, unknown unknowns)
- [ ]  Can we run this async via the web app, or do we need live sessions for some participants?
- [ ]  What's the best recruiting channel for non-technical users? (Discord? Personal network?)

---

# Roles & Ownership

| Role | Owner | Notes |
| --- | --- | --- |
| Research Lead | Chris | Erica no longer available; Chris taking over |
| Study Design Guidance | Dr. Design (Garren) | Card sort + IA expertise |
| Non-technical Recruiting | Chris | Has contacts in this segment |
| Technical Recruiting | Team | Easier to source |
| App Development | Chris | Building custom vibe-coded research app |

---

# Next Steps

### Immediate (Phase 0)

- [ ]  Build Phase 0 MVP (1-2 focused vibe-coding sessions)
- [ ]  Deploy to Zo Computer
- [ ]  Recruit 10 non-technical users (Chris' contacts)
- [ ]  Recruit 10 technical-adjacent users (team network)
- [ ]  Recruit 10 engineers (team network)
- [ ]  Run sessions and collect responses
- [ ]  Manual qualitative analysis of intent capture data

### After Phase 0

- [ ]  Synthesize patterns by segment
- [ ]  Identify universal omissions (Arnold inference load)
- [ ]  Decide whether to proceed to Phase 1 (clarifying questions)
- [ ]  Document findings in this page

---

# Prior Art: Project Bluebird

[Project Bluebird](https://www.notion.so/Project-Bluebird-2aa95117d24d80829bfad93e8050b3db?pvs=21) is directly relevant prior work. It tested a **Discovery Spec** template — a structured format for describing a Twitter clone — and ran it through multiple AI agents (ChatGPT Agent → Kimi K2 → Cursor/Claude).

**Key insight:** The Discovery Spec represents *one* way to structure application intent. It's highly engineered — entities, relationships, workflows, acceptance tests, etc. The question this research asks: **Do non-technical users naturally think this way?**

Bluebird gives us:

- A baseline structured format to compare against
- Evidence of how AI interprets structured specs
- A test case (Twitter) we could reuse as a stimulus

**Open question:** Should the card sort use the same Twitter/Bluebird stimulus, or something simpler? Twitter is complex — might overwhelm non-technical participants.

---

# Related Resources

- [Project Bluebird](https://www.notion.so/Project-Bluebird-2aa95117d24d80829bfad93e8050b3db?pvs=21) — prior Discovery Spec experiment
- DxD methodology and principles
- Artifact Orientation docs
- Zo Computer's Discord (reference model for community-driven research)