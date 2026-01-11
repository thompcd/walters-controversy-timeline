# Event Data Template for Ryan Walters Timeline

This document provides a template for researchers adding new events to the timeline visualization.

## Data Structure Required

Each event needs the following information:

```typescript
{
  id: string                    // Unique identifier (e.g., '11', '12')
  date: string                  // Month and Year (e.g., 'JAN 2023', 'SEPT 24, 2025')
  monthsFromStart: number       // Number of months since January 2023 (used for proportional spacing)
  title: string                 // Brief event description (for display purposes)
  narrative: string             // Finding-focused title emphasizing significance/impact
  description: string           // 1-2 sentence explanation of what happened
  category: string              // Type: 'controversy' | 'policy' | 'legal' | 'resignation'
  icon: string                  // Emoji representation (e.g., '📌', '💥', '📖')
  impact: string                // 1-sentence summary of consequences/implications
  severity: number              // Severity level: 1 (low) | 2 (medium) | 3 (critical)
  evidence: [                   // Array of sources supporting the claim
    {
      type: string              // 'news' | 'court' | 'official'
      source: string            // Name of the source/document
      metric?: string           // Optional: specific data point or quote
    }
  ]
}
```

---

## Field Descriptions & Guidelines

### `id`
- **Purpose**: Unique identifier for sorting/filtering
- **Format**: String (number as string, e.g., '11')
- **Example**: '11'
- **Notes**: Should be sequential; used internally only

### `date`
- **Purpose**: Display the date on the timeline
- **Format**: 'MMM YYYY' or 'MMM DD, YYYY' format
- **Examples**: 'JAN 2023', 'SEPT 24, 2025', 'MARCH 15, 2024'
- **Notes**: Used for visual label; keeps consistent with existing events

### `monthsFromStart`
- **Purpose**: Calculate proportional spacing between events
- **Format**: Number (months since January 2023 = month 0)
- **Calculation**:
  - January 2023 = 0
  - February 2023 = 1
  - December 2023 = 11
  - January 2024 = 12
  - January 2025 = 24
  - September 2025 = 32
- **Example**: Sept 2025 = 32 months
- **Notes**: Accurate numbers create realistic visual spacing showing escalation

### `title`
- **Purpose**: Secondary descriptor (mostly for internal use)
- **Format**: Brief phrase
- **Example**: 'Board Member Resignation'
- **Notes**: Can be identical to `narrative` or more neutral

### `narrative`
- **Purpose**: Finding-focused headline emphasizing significance
- **Format**: Starts with action word or outcome (e.g., 'Escalation:', 'Crisis:', 'Victory:', 'Collapse:')
- **Examples**:
  - 'Escalation: Teachers Union Attacked With Extreme Rhetoric'
  - 'Constitutional Crisis: Bible Mandate Sparks Legal Challenge'
  - 'Political Fracture: Governor Abandons Educational Leadership Ally'
- **Guidelines**:
  - Emphasizes the "so what" not the "what"
  - Guides reader to understand significance immediately
  - 8-15 words optimal
  - Action-oriented language

### `description`
- **Purpose**: Detailed explanation of the event
- **Format**: 1-2 sentences, conversational tone
- **Example**:
  ```
  'Gov. Kevin Stitt fires three State Board members who supported Walters.
   Cites poor academic performance and political turmoil.'
  ```
- **Guidelines**:
  - Who did what, when, why (essential context)
  - Keep it concise but complete
  - Avoid jargon; assume general audience
  - 40-80 words

### `category`
- **Purpose**: Color-code and filter events
- **Options**:
  - `'controversy'` - Scandals, conflicts, harmful rhetoric (Red: #EF4444)
  - `'policy'` - Official decisions, mandates, proposals (Blue: #3B82F6)
  - `'legal'` - Court battles, ethics violations, settlements (Amber: #F59E0B)
  - `'resignation'` - Departure, succession events (Purple: #9C27B0)
- **Guidelines**: Choose the primary category if event spans multiple types

### `icon`
- **Purpose**: Visual emoji indicator for the timeline dot
- **Format**: Single emoji
- **Examples**:
  - Controversy: 💥, 🔴, ⚔️
  - Policy: 📖, 🙏, 📋
  - Legal: ⚖️, 💰, 📜
  - Resignation: 🚪, ✋, 🏁
- **Guidelines**: Choose an icon that intuitively represents the event

### `impact`
- **Purpose**: 1-sentence summary of consequences
- **Format**: Consequence-focused statement
- **Examples**:
  - 'Relationship with teachers irreparably damaged'
  - 'Multiple lawsuits filed; separation of church-state violations alleged'
  - 'Major policy defeat; back to 2019 standards'
- **Guidelines**:
  - Answers: "What happened as a result?"
  - Include quantitative data if available (numbers, percentages)
  - 10-15 words

### `severity`
- **Purpose**: Visual emphasis on timeline (affects border thickness and shadow)
- **Options**:
  - `1` - Routine/low impact (border-left-2)
  - `2` - Significant/medium impact (border-left-4)
  - `3` - Critical/major impact (border-left-6 with heavy shadow)
- **Guidelines**:
  - Consider public attention, legal consequences, educational impact
  - Major scandals, court losses, resignations = 3
  - Policy announcements, investigations = 2
  - Routine bureaucratic actions = 1

### `evidence` Array
- **Purpose**: Provide verifiable sources for each claim
- **Format**: Array of objects with `type`, `source`, and optional `metric`

#### Evidence `type` Options:
- `'news'` (📰): News articles, media reports
- `'court'` (⚖️): Court documents, legal rulings, judge statements
- `'official'` (📋): Government statements, official records, board minutes

#### Evidence `source`:
- **Format**: Name of source/document
- **Examples**:
  - 'NPR Education Report'
  - 'Oklahoma Supreme Court Decision'
  - 'State Board Meeting Minutes'
- **Guidelines**: Be specific enough for someone to find the source

#### Evidence `metric`:
- **Format**: Specific data point, quote, or quantification (optional)
- **Examples**:
  - '48+ National news outlets covered'
  - '2 lawsuits filed immediately'
  - 'Unanimous ruling against Walters'
- **Guidelines**:
  - Adds credibility with specifics
  - Optional but recommended
  - 5-10 words maximum

---

## Complete Example: How to Add a New Event

### Scenario: A new controversy emerges in October 2024

**Research Phase:**
- Find the date: October 15, 2024
- Calculate monthsFromStart: Jan 2023 = 0, so Oct 2024 = 21 months
- Gather 2-3 credible sources
- Understand the consequences
- Identify the finding (what this reveals about Walters' tenure)

**Data Entry:**

```typescript
{
  id: '5b',  // Inserted between existing events
  date: 'OCT 15, 2024',
  monthsFromStart: 21,
  title: 'Social Media Scandal',
  narrative: 'Public Relations Crisis: Inappropriate Comments Spark Backlash',
  description:
    'Walters posts controversial statements on official state education social media accounts. ' +
    'Education advocates and parents demand apology and accountability.',
  category: 'controversy',
  icon: '📱',
  impact: 'Public confidence eroded; state superintendent office credibility questioned',
  severity: 2,
  evidence: [
    {
      type: 'news',
      source: 'Oklahoma Education News',
      metric: '25+ retweets calling for resignation'
    },
    {
      type: 'official',
      source: 'State Education Department Social Media Archive',
      metric: 'Posts deleted within 6 hours'
    },
    {
      type: 'news',
      source: 'Local News Channel 5',
      metric: 'Coverage aired on evening broadcast'
    }
  ]
}
```

---

## Research Checklist for New Events

When researching a potential new event, verify:

- [ ] **Date is accurate**: Cross-reference multiple sources
- [ ] **monthsFromStart is calculated correctly**: Double-check month count
- [ ] **Event is significant**: Ask: "Would educated Oklahomans know about this?"
- [ ] **Category is appropriate**: Only one primary category selected
- [ ] **Narrative is finding-focused**: Emphasizes significance, not just facts
- [ ] **Description is complete**: Answers who/what/when/why
- [ ] **Impact is clear**: States consequences, not just the event
- [ ] **Severity is justified**: Consistent with similar events
- [ ] **Evidence is verifiable**: Sources can be located and confirmed
- [ ] **At least 2 sources**: Credible, independent sources preferred
- [ ] **No personal opinion**: Sticks to documented facts

---

## Data Entry Tips

### Writing Finding-Focused Narratives
❌ **Avoid**: 'Superintendent Makes Statement'
✅ **Better**: 'Public Backlash: Statement Fails to Satisfy Critics'

❌ **Avoid**: 'New Policy Announced'
✅ **Better**: 'Educational Crisis: Policy Threatens Student Achievement'

### Choosing Severity Levels
**Severity 1** (Low):
- Routine board meetings
- Standard policy announcements
- Minor staffing changes

**Severity 2** (Medium):
- Controversial policy proposals
- Investigations launched
- Public criticism
- Ethics complaints filed

**Severity 3** (Critical):
- Court losses
- Major scandals
- Resignation announcements
- Superintendent under serious threat

### Evidence Type Selection
- **News**: Used for public scandals, media coverage, widespread awareness
- **Court**: Used for legal actions, settlements, rulings, lawsuits
- **Official**: Used for government records, board minutes, official statements

---

## File Location

When ready to add events to the timeline:

**File**: `src/components/TimelineVisualization.tsx`
**Location**: Lines 24-300 (the `events` array)

Add new events in **chronological order** by `monthsFromStart` value.

---

## Contact & Questions

For questions about:
- **Data requirements**: Check this template
- **Finding research sources**: See specific event examples (lines 24-300)
- **Implementation**: Review component comments in TimelineVisualization.tsx

---

**Last Updated**: 2026-01-11
**Template Version**: 1.0
