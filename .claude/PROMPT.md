# Ralph Loop Prompt: Ryan Walters Controversy Timeline Visualization

## Objective
Create an enhanced, production-ready Vercel single-page data visualization for the Ryan Walters controversy timeline based on wireframe analysis and data visualization best practices.

## Context
- **Wireframe Source:** `wireframe_visual_01_walters_timeline.html`
- **Original Design Score:** 89/100
- **Target Aesthetic:** Glassmorphism + Minimalist with modern Next.js/React implementation
- **Stack:** TypeScript + React + Tailwind CSS + Next.js

## Phase 1: Analysis (First Iteration Only)

If `src/components/TimelineVisualization.tsx` does NOT exist:

1. **Use data-visualization-critic skill** to analyze the wireframe:
   - Evaluate narrative structure (are titles finding-focused?)
   - Assess visual hierarchy (do key events stand out?)
   - Review evidence integration (are sources cited?)
   - Check context communication (is "13-month early exit" prominent?)
   - Identify temporal progression (do time gaps show escalation?)

2. **Output analysis to:** `analysis/visualization-critique.md`

## Phase 2: Design (Every Iteration)

Use **ui-ux-pro-max skill** to inform design decisions:
- Modern professional typography (Poppins + Open Sans)
- SaaS analytics color palette (Trust blue #2563EB, Alert red #EF4444)
- Glassmorphism cards with 80% opacity backdrops
- Minimalist whitespace and subtle gradients

## Phase 3: Implementation (Every Iteration)

### Component Structure
Create/update `src/components/TimelineVisualization.tsx` with:

**Must Have Features:**
- ✅ Finding-focused narrative titles (not neutral descriptions)
- ✅ Proportional spacing between events (gap = months elapsed)
- ✅ Visual severity indicators (border-l-2/4/6 based on severity)
- ✅ Color-coded categories (Red=Controversy, Blue=Policy, Amber=Legal, Purple=Resignation)
- ✅ Evidence badges with source types (📰 News, ⚖️ Court, 📋 Official)
- ✅ Expandable evidence sections per event
- ✅ Context callout banner (top-sticky, highlighting 13-month early exit)
- ✅ Category filter buttons (All / Controversies / Policies / Legal)
- ✅ Enhanced stats panel with controversy frequency metrics
- ✅ Scroll fade-in animations (respect prefers-reduced-motion)
- ✅ Glassmorphic card design with backdrop-blur

**Accessibility Requirements:**
- ARIA labels for interactive elements
- Color contrast ≥ 4.5:1 (WCAG AA)
- Keyboard navigation support
- Respects prefers-reduced-motion media query
- Descriptive alt text for icons/imagery

**Event Data Structure:**
```typescript
interface TimelineEvent {
  id: string
  date: string
  monthsFromStart: number
  title: string
  narrative: string  // Finding-focused
  description: string
  category: 'controversy' | 'policy' | 'legal' | 'resignation'
  icon: string  // SVG or emoji (prefer SVG for production)
  impact: string
  severity: 1 | 2 | 3  // 1=low, 2=medium, 3=critical
  evidence: {
    type: 'news' | 'court' | 'official'
    source: string
    metric?: string
  }[]
}
```

### Styling Standards
- Use Tailwind CSS utilities (no custom CSS except animations)
- Responsive breakpoints: 320px, 768px, 1024px, 1440px
- Color palette from SaaS analytics template
- Font: Poppins (headings) + Open Sans (body) via Google Fonts
- Shadows: Use Tailwind shadow classes (shadow-md, shadow-lg)
- Spacing: 4-unit base (4px), 6-unit gaps between major sections

### Interactive Features
- **Expand/Collapse:** Click cards to reveal full evidence sections
- **Filter:** Toggle category buttons to filter timeline
- **Scroll Effects:** Cards fade in with staggered timing (respect reduced-motion)
- **Hover States:** Shadow/scale transforms on cards (no layout shift)
- **Dark Mode:** Full support with sufficient contrast

## Phase 4: Integration (Every Iteration)

### File Structure
```
src/
  components/
    TimelineVisualization.tsx  (main component)
  app/
    page.tsx  (imports TimelineVisualization)
  styles/
    globals.css  (Google Fonts imports)
analysis/
  visualization-critique.md  (analysis results)
```

### Dependencies Required
- react (latest)
- tailwindcss (latest)
- lucide-react (icons)
- typescript

### Configuration
- `tailwind.config.ts` must include font families:
  ```js
  fontFamily: {
    heading: ['Poppins', 'sans-serif'],
    body: ['Open Sans', 'sans-serif'],
  }
  ```
- Animations enabled in Tailwind config
- Dark mode supported

## Phase 5: Quality Checks (Every Iteration)

### Visual Quality
- [ ] No emoji icons used (replace with Lucide React icons)
- [ ] Consistent icon set from Lucide
- [ ] Hover states don't cause layout shift
- [ ] Cards visible in both light and dark modes
- [ ] Animations smooth (150-300ms duration)

### Functionality
- [ ] All events render correctly with proper spacing
- [ ] Filter buttons work and update display
- [ ] Expand/collapse works on all events
- [ ] Timeline line connects all events
- [ ] Stats panel displays accurate counts

### Responsiveness
- [ ] Mobile (320px): Single column, readable text
- [ ] Tablet (768px): Timeline properly laid out
- [ ] Desktop (1024px+): Full layout with proper spacing
- [ ] No horizontal scroll at any breakpoint

### Accessibility
- [ ] Color contrast ≥ 4.5:1 for all text
- [ ] ARIA labels on buttons and interactive elements
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] prefers-reduced-motion respected (no animations)
- [ ] Focus states visible

## Iteration Workflow

**For each iteration:**

1. Check if analysis exists; if not, generate it
2. Review current implementation for gaps
3. Implement missing features or improve existing ones
4. Run quality checks
5. Commit changes with clear message
6. Output completion status

**Improvement priorities:**
1. Narrative structure (finding-focused titles, context callouts)
2. Visual hierarchy (severity indicators, card emphasis)
3. Evidence integration (citations, source badges)
4. Accessibility and responsiveness
5. Polish and refinement (animations, spacing)

## Success Criteria

**Component must provide:**
✅ All 10 timeline events rendered with proper data
✅ Finding-focused narrative titles matching improved prompt
✅ Proportional spacing showing time gaps between events
✅ Visual severity indicators (border thickness varies)
✅ Color-coded categories with legend
✅ Evidence sections expandable per event
✅ Context banner highlighting 13-month early exit
✅ Working filter by category
✅ Stats panel showing controversy frequency
✅ Smooth animations respecting prefers-reduced-motion
✅ Full responsive design (320px-1440px)
✅ WCAG AA accessibility compliance
✅ Production-ready code for Vercel deployment

## Completion Promise

When ALL quality checks pass and component is production-ready:

<promise>TIMELINE VISUALIZATION COMPLETE</promise>

---

## Notes for Claude

- You are seeing this prompt repeatedly in a Ralph Loop
- Check existing files (`src/components/TimelineVisualization.tsx`) to understand what's been done
- Improve iteratively based on what you see in the codebase
- Each iteration should build on previous work, not restart
- Focus on highest-impact improvements first
- Commit after each substantial improvement
- Output visible progress indicator before exiting

**Current Iteration Status:**
- If no component exists: Create initial implementation
- If component exists: Review and improve specific gaps identified in quality checks
- When production-ready: Output completion promise

---

**Metadata:**
- Created: 2026-01-11
- Framework: Next.js 14+ with TypeScript
- Styling: Tailwind CSS 3.4+
- Runtime: Node.js 18+
- Deployment Target: Vercel
