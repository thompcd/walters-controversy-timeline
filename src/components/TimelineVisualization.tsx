'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface TimelineEvent {
  id: string
  date: string
  monthsFromStart: number
  title: string
  narrative: string
  description: string
  category: 'controversy' | 'policy' | 'legal' | 'resignation'
  icon: React.ReactNode
  impact: string
  severity: 1 | 2 | 3
  evidence: {
    type: 'news' | 'court' | 'official'
    source: string
    metric?: string
  }[]
}

const events: TimelineEvent[] = [
  {
    id: '1',
    date: 'JAN 2023',
    monthsFromStart: 0,
    title: 'Inauguration & Teacher Pay Removal',
    narrative: 'Opening Move: Immediately Attacks Teacher Pay Despite 3,000+ Shortage',
    description:
      'Walters sworn in alongside AG Gentner Drummond (who would later become vocal critic). At first State Board of Education meeting, leads members to remove teacher pay raise from proposed budget despite critical 3,000+ teacher shortage.',
    category: 'controversy',
    icon: '📌',
    impact: 'Sets confrontational tone on day one; alienates educators',
    severity: 1,
    evidence: [
      {
        type: 'official',
        source: 'State Board Meeting Minutes',
        metric: 'Pay raise removal during budget debate',
      },
      {
        type: 'official',
        source: 'OSDE Teacher Shortage Records',
        metric: '3,000+ teacher positions unfilled',
      },
    ],
  },
  {
    id: '2',
    date: 'JULY 2023',
    monthsFromStart: 6,
    title: '"Terrorist Organization" Comment',
    narrative: 'Escalation: Teachers Union Attacked With Extreme Rhetoric',
    description:
      'Calls Oklahoma teachers union a "terrorist organization," drawing national condemnation from educators and civil rights groups. Doubles down on rhetoric in subsequent interviews. Comment later satirized by The Onion.',
    category: 'controversy',
    icon: '💥',
    impact: 'Relationship with teachers irreparably damaged; national media attention',
    severity: 3,
    evidence: [
      {
        type: 'news',
        source: 'NPR Education Report',
        metric: '48+ National news outlets covered',
      },
      {
        type: 'official',
        source: 'Public Statements Archive',
        metric: '3 follow-up statements doubling down',
      },
      {
        type: 'news',
        source: 'The Onion Satirical Response',
        metric: 'National satirical coverage',
      },
    ],
  },
  {
    id: '3',
    date: 'AUG 2023',
    monthsFromStart: 7,
    title: 'Bomb Threats Linked to Walters Rhetoric',
    narrative: 'Violence Incitement: Retweets Raichik, School Receives Bomb Threats',
    description:
      'Retweets edited video from Libs of TikTok creator Chaya Raichik attacking Union Public Schools librarian. Walters adds caption: "Woke ideology is real and I am here to stop it." Result: Multiple bomb threats against schools.',
    category: 'controversy',
    icon: '💣',
    impact: 'At least 21 bomb threats linked to Libs of TikTok posts; Rep. Dollens calls for impeachment',
    severity: 3,
    evidence: [
      {
        type: 'news',
        source: 'Oklahoma News Reports',
        metric: '21 bomb threats linked to Raichik posts',
      },
      {
        type: 'official',
        source: 'School Safety Records',
        metric: 'Multiple consecutive days of threats to Union Schools',
      },
      {
        type: 'news',
        source: 'Rep. Mickey Dollens Statement',
        metric: 'Called for Walters\' impeachment for inciting violence',
      },
    ],
  },
  {
    id: '4',
    date: 'AUG 2023',
    monthsFromStart: 7,
    title: 'First Ethics Violations Assessed',
    narrative: 'Financial Accountability Begins: $7,800 Ethics Fine Assessed',
    description:
      'Oklahoma Ethics Commission orders Walters to pay $7,800 for filing campaign reports late 14 times during 2022 campaign. First of multiple ethics violations.',
    category: 'legal',
    icon: '⚖️',
    impact: 'First ethics violation; sets pattern of financial penalties',
    severity: 1,
    evidence: [
      {
        type: 'court',
        source: 'Oklahoma Ethics Commission Decision',
        metric: '$7,800 fine for 14 late campaign filings',
      },
    ],
  },
  {
    id: '5',
    date: 'JAN 2024',
    monthsFromStart: 12,
    title: 'Chaya Raichik Appointed to Library Committee',
    narrative: 'Crisis Appointment: Hires Unqualified Raichik to Library Committee',
    description:
      'Appoints Chaya Raichik (Brooklyn real estate agent with no educational background) to Library Media Advisory Committee despite her posts being linked to 21 bomb threats. Violates OSDE\'s own rules requiring committee members be "representative of the people to be served."',
    category: 'policy',
    icon: '📚',
    impact: 'Rep. Dollens calls her "unqualified and disqualified"; national outcry from library advocates',
    severity: 3,
    evidence: [
      {
        type: 'official',
        source: 'OSDE Committee Appointment Records',
        metric: 'Raichik appointed to Library Media Advisory Committee',
      },
      {
        type: 'news',
        source: 'EveryLibrary Petition Launch',
        metric: 'Major petition to remove her from committee',
      },
      {
        type: 'official',
        source: 'Rep. Mickey Dollens Statement',
        metric: '"Not only unqualified to serve, but should be disqualified"',
      },
    ],
  },
  {
    id: '6',
    date: 'FEB 8, 2024',
    monthsFromStart: 13,
    title: 'Nex Benedict\'s Death',
    narrative: 'National Crisis: 16-Year-Old Nonbinary Student Dies After School Bullying',
    description:
      'Nex Benedict, 16-year-old Indigenous (Choctaw Nation) nonbinary student at Owasso High School, dies by suicide one day after physical altercation with three girls. Family reports months of relentless bullying related to gender identity. U.S. Department of Education launches investigation.',
    category: 'controversy',
    icon: '🚩',
    impact: '350+ organizations demand Walters\' removal; national vigils held; Vice President Harris responds',
    severity: 3,
    evidence: [
      {
        type: 'official',
        source: 'Medical Examiner Report',
        metric: 'Suicide by combined medication toxicity; documented bullying',
      },
      {
        type: 'news',
        source: 'New York Times - Walters Response',
        metric: 'Walters refuses to change anti-LGBTQ+ policies',
      },
      {
        type: 'official',
        source: 'Joint Letter to Oklahoma Legislature',
        metric: '350+ organizations (Trevor Project, NAACP, HRC, etc.) demand removal',
      },
      {
        type: 'news',
        source: 'Vice President Kamala Harris',
        metric: '"My heart goes out to Nex Benedict\'s family, friends, and community"',
      },
    ],
  },
  {
    id: '7',
    date: 'FEB 27, 2024',
    monthsFromStart: 13,
    title: 'Public Condemnation at Board Meeting',
    narrative: 'Accountability Moment: Sean Cummings Directly Blames Walters for Bullying',
    description:
      'Sean Cummings addresses State Board, directly linking Walters\' rhetoric and Raichik appointment to hostile school environment. Speech goes viral, highlighting connection between superintendent\'s statements and student bullying.',
    category: 'controversy',
    icon: '📢',
    impact: 'Speech becomes viral; national attention on rhetoric-violence connection',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'State Board Meeting Video Record',
        metric: 'Cummings\' testimony goes viral',
      },
      {
        type: 'news',
        source: 'National Media Coverage',
        metric: 'Connection between rhetoric and student safety highlighted',
      },
    ],
  },
  {
    id: '8',
    date: 'JUNE 27, 2024',
    monthsFromStart: 17,
    title: 'Bible Mandate Announced',
    narrative: 'Constitutional Crisis: Bible Mandate Sparks Legal Challenge',
    description:
      'Orders all public schools (grades 5-12) to teach Bible as historical and literary text. Requests $3 million+ in state funds for classroom Bibles. Decision defies Oklahoma Supreme Court ruling on church-state separation made just days earlier.',
    category: 'policy',
    icon: '📖',
    impact: 'Multiple lawsuits filed immediately; ACLU challenges constitutionality',
    severity: 3,
    evidence: [
      {
        type: 'court',
        source: 'ACLU Legal Challenge',
        metric: 'Separation of church-state violation alleged',
      },
      {
        type: 'news',
        source: 'Education Week',
        metric: '$3.1M+ budget request for classroom Bibles',
      },
      {
        type: 'official',
        source: 'Parent Lawsuits',
        metric: 'Parents sue: "weaponizes teachers to pressure religious conformity"',
      },
    ],
  },
  {
    id: '9',
    date: 'JULY 2024',
    monthsFromStart: 18,
    title: 'Trump Bibles Missing Constitutional Amendments',
    narrative: 'Audit Disaster: Purchased Bibles Missing 13th-27th Amendments',
    description:
      'State purchases 500 Trump-branded "God Bless the USA" Bibles at ~$60 each (~$30,000 taxpayer money). Critical problem: Bibles missing Constitutional Amendments 11-27, including 13th (slavery abolition), 14th (equal protection), 19th (women\'s suffrage), and 24th (voting rights ban).',
    category: 'policy',
    icon: '⚠️',
    impact: 'National media outrage over taxpayer-funded incomplete Constitutions',
    severity: 3,
    evidence: [
      {
        type: 'news',
        source: 'National Education Media',
        metric: 'Missing amendments 11-27; includes abolishing slavery amendment',
      },
      {
        type: 'official',
        source: 'Bible Publisher Statement',
        metric: '"Only included original founding fathers\' documents"',
      },
    ],
  },
  {
    id: '10',
    date: 'JULY 2024',
    monthsFromStart: 18,
    title: 'TV Nudity Scandal',
    narrative: 'Credibility Damage: Questionable Content Allegedly Displayed in Official Meeting',
    description:
      'Board members Becky Carson and Ryan Deatherage report seeing nude women on TV from 1985 film "The Protector" in Walters\' office during official State Board meeting. Walters denies, calls allegations "desperate lies."',
    category: 'controversy',
    icon: '📺',
    impact: 'Investigation launched; reputation further damaged despite September 2025 clearance',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'Oklahoma County DA Investigation',
        metric: 'Sheriff\'s office investigates; insufficient evidence for charges',
      },
      {
        type: 'official',
        source: 'Walters\' Response',
        metric: 'Called allegations "desperate lies"',
      },
    ],
  },
  {
    id: '11',
    date: 'AUG 2024',
    monthsFromStart: 19,
    title: 'Federal Investigation Called by Republican',
    narrative: 'Federal Oversight: GOP Lawmaker Calls for DOE Investigation',
    description:
      'Republican state Rep. Mark McBride calls for federal Department of Education investigation into Walters\' spending of federal and state money. Growing Republican opposition to leadership.',
    category: 'legal',
    icon: '🔍',
    impact: 'Republican allies turn against Walters; federal scrutiny begins',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'Rep. Mark McBride Public Statement',
        metric: 'Republican calls for federal investigation',
      },
      {
        type: 'news',
        source: 'GOP Criticism Documentation',
        metric: 'Financial missteps and delayed school security funds cited',
      },
    ],
  },
  {
    id: '12',
    date: 'NOV 2024',
    monthsFromStart: 22,
    title: 'Trump Prayer Video Mandate',
    narrative: 'Authority Crisis: Mandates Prayer Video Against Legal Authority',
    description:
      'Emails school superintendents requiring all students watch video of Walters praying for "President Trump\'s Team" with accusations against political opponents. AG Drummond publicly states Walters lacks legal authority; school districts determine curriculum, not superintendent\'s office.',
    category: 'policy',
    icon: '🙏',
    impact: 'Attorney General openly contradicts superintendent\'s authority',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'AG Gentner Drummond Statement',
        metric: 'Explicit denial of Walters\' legal authority',
      },
      {
        type: 'official',
        source: 'Oklahoma Law Review',
        metric: 'School districts, not superintendent, determine curriculum',
      },
    ],
  },
  {
    id: '13',
    date: 'JAN 2025',
    monthsFromStart: 24,
    title: 'Deep State Accusation Against Governor',
    narrative: 'Republican Split: Walters Calls Governor Stitt "Deep State"',
    description:
      'Gov. Stitt opposes Walters\' proposal to request citizenship status of enrolling children. Walters responds by calling governor "deep state" and part of "so-called deep state conspiracy against Trump." Massive break between Republican allies.',
    category: 'controversy',
    icon: '⚔️',
    impact: 'Unprecedented split between GOP governor and superintendent',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'Walters\' Social Media Statement',
        metric: 'Called governor "deep state conspiracy"',
      },
      {
        type: 'news',
        source: 'Political Analysis',
        metric: 'Stitt (NGA chair) initially supported Walters, now openly opposes',
      },
    ],
  },
  {
    id: '14',
    date: 'FEB 2025',
    monthsFromStart: 25,
    title: 'Governor Fires Supporting Board Members',
    narrative: 'Political Fracture: Governor Abandons Educational Leadership Ally',
    description:
      'Gov. Kevin Stitt fires three State Board of Education members who supported Walters. Cites "Disappointing NAEP scores" and "needless political drama." Public split between Republican governor and superintendent.',
    category: 'controversy',
    icon: '⚔️',
    impact: 'Board restructure; loss of key allies; Oklahoma\'s education image damaged',
    severity: 3,
    evidence: [
      {
        type: 'official',
        source: 'Governor\'s Office Announcement',
        metric: 'Three board members fired mid-term',
      },
      {
        type: 'news',
        source: 'Political Analysis',
        metric: 'Walters "alienated everyone in state leadership" - OU professor',
      },
    ],
  },
  {
    id: '15',
    date: 'FEB 2025',
    monthsFromStart: 25,
    title: 'Supreme Court Overturns Social Studies Standards',
    narrative: 'Legal Defeat: Court Blocks Controversial Curriculum Changes',
    description:
      'Oklahoma Supreme Court blocks controversial social studies standards requiring teaching "election discrepancies" and COVID "Chinese lab" origin. Rules Walters violated Open Meetings Act by changing standards without public notice.',
    category: 'legal',
    icon: '⚖️',
    impact: 'Major policy defeat; back to 2019 standards; legal authority questioned',
    severity: 3,
    evidence: [
      {
        type: 'court',
        source: 'Oklahoma Supreme Court Decision',
        metric: 'Unanimous ruling against Walters for Open Meetings Act violation',
      },
      {
        type: 'official',
        source: 'Court Records',
        metric: 'Standards reverted to 2019; process violation confirmed',
      },
    ],
  },
  {
    id: '16',
    date: 'AUG 2025',
    monthsFromStart: 31,
    title: 'Total Ethics Violations Settled',
    narrative: 'Final Tally: $23,300 Paid for Multiple Ethics Violations',
    description:
      'Total of $23,300 paid to settle ethics complaints: $7,800 (Aug 2023) + $4,200 settlement (March 2024, assessed $6,600) + $11,300 additional. Violations include campaign finance, late filings, partisan use of state social media. Multiple investigations ongoing.',
    category: 'legal',
    icon: '💰',
    impact: 'Highest ethics violation payments in state education history',
    severity: 2,
    evidence: [
      {
        type: 'court',
        source: 'Oklahoma Ethics Commission Records',
        metric: '$23,300 total settlement for multiple violations',
      },
      {
        type: 'official',
        source: 'Campaign Finance Audit',
        metric: 'Late filings, partisan social media use documented',
      },
    ],
  },
  {
    id: '17',
    date: 'SEPT 24, 2025',
    monthsFromStart: 32,
    title: 'Resignation Announced on Fox News',
    narrative: 'End Game: Announces Resignation 14+ Months Early',
    description:
      'Announces on national television (Fox News @ Night) that he will resign to become CEO of Teacher Freedom Alliance, the anti-union organization he promoted while in office. Vows to "destroy the teachers unions" and "build an army of teachers to defeat the teachers unions."',
    category: 'resignation',
    icon: '🚪',
    impact: 'Republican AG calls tenure "an embarrassment"; national attention to resignation',
    severity: 3,
    evidence: [
      {
        type: 'news',
        source: 'Fox News @ Night',
        metric: 'Resignation broadcast nationally before informing Oklahoma',
      },
      {
        type: 'official',
        source: 'AG Gentner Drummond Statement',
        metric: '"Ever witnessed never-ending scandal... an embarrassment to our state"',
      },
      {
        type: 'news',
        source: 'AFT President Randi Weingarten',
        metric: '"Today is a good day for Oklahoma\'s kids"',
      },
    ],
  },
  {
    id: '18',
    date: 'SEPT 30, 2025',
    monthsFromStart: 33,
    title: 'Official Resignation & Policy Reversal Begins',
    narrative: 'Conclusion: Early Exit After 33 Months of Turmoil',
    description:
      'Leaves office with 14+ months remaining in term. Lindel Fields appointed interim superintendent. Fields immediately begins reversing controversial policies: ends Bible mandate, cancels "woke test," conducts educator and parent surveys.',
    category: 'resignation',
    icon: '✋',
    impact: 'Successor\'s first actions confirm damage of Walters\' tenure',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'State Education Department',
        metric: 'Fields immediately reverses Bible mandate and woke test',
      },
      {
        type: 'official',
        source: 'New Superintendent Statements',
        metric: '"Focus on reading, writing, and arithmetic"',
      },
    ],
  },
  {
    id: '19',
    date: 'OCT 1, 2025',
    monthsFromStart: 33,
    title: 'Attorney General Orders Full Tenure Audit',
    narrative: 'Accountability Escalates: AG Demands Comprehensive Financial Audit',
    description:
      'AG Gentner Drummond formally requests financial audit of Walters\' entire tenure from first day to last. AG\'s office sends press release BEFORE formal request—unprecedented move. Previous grand jury called Walters\' pandemic relief fund handling "indefensible."',
    category: 'legal',
    icon: '🔍',
    impact: 'Comprehensive investigation of spending; potential additional legal consequences',
    severity: 3,
    evidence: [
      {
        type: 'official',
        source: 'AG Gentner Drummond Press Release',
        metric: 'Formal audit request; unprecedented pre-announcement',
      },
      {
        type: 'official',
        source: '2024 Grand Jury Finding',
        metric: '"Indefensible" pandemic fund handling; "blew past fiscal guardrails"',
      },
      {
        type: 'official',
        source: 'State Auditor Cindy Byrd',
        metric: 'Will conduct comprehensive financial review',
      },
    ],
  },
  {
    id: '20',
    date: 'OCT 8, 2025',
    monthsFromStart: 34,
    title: 'Latest Ethics Investigation Launched',
    narrative: 'Ongoing Accountability: New Probe Into Office Resource Misuse',
    description:
      'Ethics Commission announces investigation into Walters using state office resources to repeatedly promote Teacher Freedom Alliance—the anti-union organization he left his post to join. Democratic lawmaker alleges use of public resources for personal/future employer promotion.',
    category: 'legal',
    icon: '⚖️',
    impact: 'Post-resignation investigation; additional ethics violations alleged',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'Rep. Mickey Dollens Complaint',
        metric: 'Alleged use of state resources for future employer promotion',
      },
      {
        type: 'official',
        source: 'Ethics Commission Investigation Announcement',
        metric: 'New investigation launched; already paid $23,300 this year',
      },
    ],
  },
]

const categoryColors = {
  controversy: {
    dot: 'bg-red-500',
    card: 'border-red-500 bg-red-50/50 dark:bg-red-950/20',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    text: 'text-red-700 dark:text-red-400',
    button: 'bg-red-500 hover:bg-red-600',
  },
  policy: {
    dot: 'bg-blue-500',
    card: 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    text: 'text-blue-700 dark:text-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  legal: {
    dot: 'bg-amber-500',
    card: 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    text: 'text-amber-700 dark:text-amber-400',
    button: 'bg-amber-500 hover:bg-amber-600',
  },
  resignation: {
    dot: 'bg-purple-500',
    card: 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    text: 'text-purple-700 dark:text-purple-400',
    button: 'bg-purple-500 hover:bg-purple-600',
  },
}

const severityStyles = {
  1: 'border-l-2',
  2: 'border-l-4',
  3: 'border-l-6 shadow-lg',
}

export default function TimelineVisualization() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const filteredEvents = filterCategory
    ? events.filter((e) => e.category === filterCategory)
    : events

  const categoryStats = {
    controversy: events.filter((e) => e.category === 'controversy').length,
    policy: events.filter((e) => e.category === 'policy').length,
    legal: events.filter((e) => e.category === 'legal').length,
    resignation: events.filter((e) => e.category === 'resignation').length,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header Banner */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
          <h1 className="text-2xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-1 md:mb-2 tracking-tight">
            The Ryan Walters Era
          </h1>
          <p className="text-xs md:text-lg text-slate-600 dark:text-slate-400 font-body mb-3 md:mb-4 font-light">
            A Timeline of Controversy, Policy Crisis, and Early Exit
          </p>

          {/* Context Callout - Elegant Cards */}
          <div className="flex gap-2 md:gap-4 text-xs md:text-sm mb-4 md:mb-6 flex-wrap">
            <div className="px-3 py-2 md:px-4 md:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <p className="font-heading font-semibold text-slate-900 dark:text-white text-xs md:text-sm">
                ⏰ 13 Months Early
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xs font-body">
                Abandoned 14+ months remaining
              </p>
            </div>
            <div className="px-3 py-2 md:px-4 md:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <p className="font-heading font-semibold text-slate-900 dark:text-white text-xs md:text-sm">
                📊 1 Crisis Every 10 Days
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xs font-body">
                ~40x typical frequency
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <button
              onClick={() => setFilterCategory(null)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border ${
                !filterCategory
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-300 text-white shadow-md border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
              style={!filterCategory ? {background: 'linear-gradient(145deg, #50bff5 10%, #31f5e3 100%)'} : {}}
            >
              All ({events.length})
            </button>
            <button
              onClick={() => setFilterCategory('controversy')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border ${
                filterCategory === 'controversy'
                  ? 'bg-red-500 text-white shadow-md border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              Controversy ({categoryStats.controversy})
            </button>
            <button
              onClick={() => setFilterCategory('policy')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border ${
                filterCategory === 'policy'
                  ? 'bg-blue-500 text-white shadow-md border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              Policy ({categoryStats.policy})
            </button>
            <button
              onClick={() => setFilterCategory('legal')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border ${
                filterCategory === 'legal'
                  ? 'bg-amber-500 text-white shadow-md border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              Legal ({categoryStats.legal})
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-20">
        <div className="relative">
          {/* Timeline Line - Elegant Gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-300 to-emerald-300" style={{background: 'linear-gradient(180deg, #50bff5 0%, #31f5e3 100%)'}}></div>

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {filteredEvents.map((event, index) => {
              const colors = categoryColors[event.category]
              const isExpanded = expandedId === event.id
              const proportionalGap =
                index > 0
                  ? (event.monthsFromStart - filteredEvents[index - 1].monthsFromStart) * 12
                  : 0

              return (
                <div
                  key={event.id}
                  className={`relative pl-20 md:pl-24 ${!prefersReducedMotion ? 'animate-fadeIn' : ''}`}
                  style={{
                    marginTop: proportionalGap ? `${proportionalGap * 2}px` : '0',
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full ${colors.dot} ring-4 ring-white dark:ring-slate-800 shadow-md cursor-pointer transition-transform duration-300 hover:scale-110`}
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setExpandedId(isExpanded ? null : event.id)
                      }
                    }}
                    aria-expanded={isExpanded}
                    aria-label={`Timeline event: ${event.narrative}`}
                  >
                    <span className="text-lg md:text-2xl">{event.icon}</span>
                  </div>

                  {/* Event Card */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                    className={`w-full text-left transition-all duration-300 ${
                      !prefersReducedMotion
                        ? 'hover:shadow-xl hover:scale-105'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div
                      className={`rounded-lg backdrop-blur-sm border-2 p-4 md:p-6 ${colors.card} ${severityStyles[event.severity]} cursor-pointer group`}
                    >
                      {/* Date Badge */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors.badge} mb-3`}
                      >
                        {event.date}
                      </span>

                      {/* Finding-Focused Title */}
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        {event.narrative}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Impact Statement */}
                      <p className={`text-sm font-semibold ${colors.text} mb-4`}>
                        💡 Impact: {event.impact}
                      </p>

                      {/* Evidence Summary */}
                      <div className="flex gap-2 flex-wrap mb-4">
                        {event.evidence.map((ev, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white/60 dark:bg-slate-700/60 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs"
                          >
                            {ev.type === 'news' && '📰'}
                            {ev.type === 'court' && '⚖️'}
                            {ev.type === 'official' && '📋'} {ev.source}
                          </span>
                        ))}
                      </div>

                      {/* Expand Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {event.evidence.length} source
                          {event.evidence.length !== 1 ? 's' : ''}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded Evidence Section */}
                    {isExpanded && (
                      <div
                        className={`mt-3 ml-6 p-4 md:p-6 bg-white/60 dark:bg-slate-700/60 rounded-lg border border-slate-200 dark:border-slate-600 backdrop-blur-sm ${
                          !prefersReducedMotion ? 'animate-slideDown' : ''
                        }`}
                      >
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                          Evidence & Details:
                        </h4>
                        <ul className="space-y-3">
                          {event.evidence.map((ev, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-700 dark:text-slate-300 border-l-2 border-slate-300 dark:border-slate-600 pl-3"
                            >
                              <p className="font-semibold text-slate-900 dark:text-white">
                                {ev.type === 'news'
                                  ? '📰 News Source'
                                  : ev.type === 'court'
                                    ? '⚖️ Court Document'
                                    : '📋 Official Record'}
                              </p>
                              <p className="text-slate-700 dark:text-slate-300 mt-1">
                                {ev.source}
                              </p>
                              {ev.metric && (
                                <p className="text-amber-700 dark:text-amber-400 font-medium mt-2">
                                  → {ev.metric}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Panel - Elegant Gradient */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 md:mb-12 text-slate-900 dark:text-white">Controversy Index</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Test Scores</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">D</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                State Academic Achievement Score 2024-25
              </p>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Count</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">8</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Major Controversies (~1 every 4.1 months)
              </p>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Losses</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">1</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Supreme Court Decision (Blocked controversial curriculum)
              </p>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Settlements</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">$23K</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Ethics Violations (Campaign finance + misuse)
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold mb-4 text-slate-900 dark:text-white">Event Breakdown</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>🔴 Controversies & Conflicts</span>
                  <span className="font-bold">{categoryStats.controversy}</span>
                </li>
                <li className="flex justify-between">
                  <span>📋 Policy Decisions</span>
                  <span className="font-bold">{categoryStats.policy}</span>
                </li>
                <li className="flex justify-between">
                  <span>⚖️ Legal Issues</span>
                  <span className="font-bold">{categoryStats.legal}</span>
                </li>
                <li className="flex justify-between">
                  <span>🚪 Resignation</span>
                  <span className="font-bold">{categoryStats.resignation}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold mb-4 text-slate-900 dark:text-white">Timeline Facts</h3>
              <ul className="space-y-2 text-sm">
                <li>📅 Duration: 33 months (Jan 2023 - Sept 2025)</li>
                <li>⏰ Expected: 48 months (4-year term)</li>
                <li>❌ Early Exit: 14+ months remaining</li>
                <li>📊 Avg Crisis Frequency: Every 50 days (~7 weeks)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sources Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-slate-900 dark:text-white">Research Sources</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-8 max-w-2xl">
            This timeline is compiled from publicly available news reports, court documents, government records, and official statements from credible sources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Major News & Media */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">📰 Major News Outlets</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><a href="https://www.pbs.org/newshour" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PBS NewsHour</a></li>
                <li><a href="https://www.nbcnews.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NBC News</a></li>
                <li><a href="https://www.msnbc.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MSNBC</a></li>
                <li><a href="https://www.npr.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NPR</a></li>
                <li><a href="https://www.thehill.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The Hill</a></li>
                <li><a href="https://www.74million.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The 74 Million</a></li>
              </ul>
            </div>

            {/* Oklahoma Local & State */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">🏛️ Oklahoma Sources</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><a href="https://www.kosu.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">KOSU (Oklahoma NPR)</a></li>
                <li><a href="https://www.oklahomawatch.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Oklahoma Watch</a></li>
                <li><a href="https://www.oklahomavoice.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Oklahoma Voice</a></li>
                <li>KOCO, KOKH, Fox 23 (Local TV News)</li>
                <li><a href="https://okappleseed.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Oklahoma Appleseed Center</a></li>
                <li><a href="https://www.wikipedia.org/wiki/Ryan_Walters_(politician)" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia: Ryan Walters</a></li>
              </ul>
            </div>

            {/* Legal & Government */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">⚖️ Legal & Government</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>Oklahoma Supreme Court Decisions</li>
                <li>Oklahoma Ethics Commission Records</li>
                <li>State Education Department (OSDE)</li>
                <li>Oklahoma Attorney General Statements</li>
                <li>State Board of Education Minutes</li>
                <li>U.S. Department of Education</li>
              </ul>
            </div>

            {/* Advocacy & Civil Rights */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">🤝 Advocacy Organizations</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><a href="https://www.thetrevorproject.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The Trevor Project</a></li>
                <li><a href="https://www.hrc.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Human Rights Campaign</a></li>
                <li><a href="https://www.naacp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NAACP</a></li>
                <li><a href="https://www.glaad.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GLAAD</a></li>
                <li><a href="https://www.everylibrary.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">EveryLibrary</a></li>
                <li><a href="https://www.aclu.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ACLU</a></li>
              </ul>
            </div>

            {/* K-12 & Education */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">📚 Education Sources</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><a href="https://www.k12dive.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">K-12 Dive</a></li>
                <li><a href="https://www.edweek.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Education Week</a></li>
                <li><a href="https://www.aft.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">American Federation of Teachers</a></li>
                <li>National Education Association</li>
                <li>Teacher Freedom Alliance</li>
                <li>Freedom Foundation</li>
              </ul>
            </div>

            {/* Media & Analysis */}
            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-3 text-lg">📺 News & Analysis</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><a href="https://www.nytimes.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">New York Times</a></li>
                <li><a href="https://www.advocate.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The Advocate</a></li>
                <li><a href="https://www.foxnews.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Fox News</a></li>
                <li><a href="https://www.theonion.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">The Onion</a></li>
                <li>Black Wall Street Times</li>
                <li>Freedom Oklahoma</li>
              </ul>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Data Sources Note:</span> All events are sourced from publicly available documents including news reports, court records, official government statements, and verified media coverage. Multiple sources were used for significant events to ensure accuracy and provide comprehensive context.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
