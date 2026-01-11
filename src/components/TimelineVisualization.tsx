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
    title: 'Inauguration & Immediate Controversy',
    narrative: 'First Move: Budget Attack on Teachers Sets Confrontational Tone',
    description:
      'Walters sworn in as State Superintendent. At first board meeting, leads members to remove teacher pay raise from proposed budget despite critical teacher shortage.',
    category: 'controversy',
    icon: '📌',
    impact: 'First month sets confrontational tone',
    severity: 1,
    evidence: [
      {
        type: 'official',
        source: 'State Board Meeting Minutes',
        metric: 'Pay raise removal: 1st official action',
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
      'Calls Oklahoma teachers union a "terrorist organization," drawing national condemnation from educators and civil rights groups. Doubles down on rhetoric in subsequent interviews.',
    category: 'controversy',
    icon: '💥',
    impact: 'Relationship with teachers irreparably damaged',
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
    ],
  },
  {
    id: '3',
    date: 'JUNE 2024',
    monthsFromStart: 17,
    title: 'Bible Mandate Announced',
    narrative: 'Constitutional Crisis: Bible Mandate Sparks Legal Challenge',
    description:
      'Orders all public schools to teach Bible in grades 5-12. Requests $3M+ for Trump-branded Bibles. Bibles discovered missing Constitutional amendments 11-27.',
    category: 'policy',
    icon: '📖',
    impact: 'Multiple lawsuits filed; separation of church-state violations alleged',
    severity: 3,
    evidence: [
      {
        type: 'court',
        source: 'ACLU Legal Challenge',
        metric: '2 lawsuits filed immediately',
      },
      {
        type: 'news',
        source: 'Education Week',
        metric: '$3.1M budget request documented',
      },
    ],
  },
  {
    id: '4',
    date: 'JULY 2024',
    monthsFromStart: 18,
    title: 'TV Nudity Scandal',
    narrative: 'Credibility Damage: Questionable Content Allegedly Displayed in Official Meeting',
    description:
      'Board members report seeing inappropriate content from 1985 film in Walters\' office during official meeting. Walters denies allegations.',
    category: 'controversy',
    icon: '📺',
    impact: 'Investigation launched; credibility questioned',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'State Investigation Report',
        metric: 'Cleared but damaged credibility',
      },
    ],
  },
  {
    id: '5',
    date: 'NOV 2024',
    monthsFromStart: 22,
    title: 'Mandatory Trump Prayer Video',
    narrative: 'Authority Overreach: Attorney General Blocks Prayer Mandate',
    description:
      'Emails school superintendents requiring students watch video of Walters praying for political figures. Districts question legal authority.',
    category: 'policy',
    icon: '🙏',
    impact: 'Attorney General says Walters lacks legal authority',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'AG Public Statement',
        metric: 'Explicit authority denial',
      },
    ],
  },
  {
    id: '6',
    date: 'FEB 2025',
    monthsFromStart: 25,
    title: 'Stitt Fires Board Members',
    narrative: 'Political Fracture: Governor Abandons Educational Leadership Ally',
    description:
      'Gov. Kevin Stitt fires three State Board members who supported Walters. Cites poor academic performance and political turmoil.',
    category: 'controversy',
    icon: '⚔️',
    impact: 'Public split between Republican governor and superintendent',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'Governor\'s Public Statement',
        metric: 'Ally becomes adversary',
      },
    ],
  },
  {
    id: '7',
    date: 'FEB 2025',
    monthsFromStart: 25,
    title: 'Supreme Court Overturns Social Studies Standards',
    narrative: 'Legal Defeat: Court Blocks Controversial Curriculum Changes',
    description:
      'Oklahoma Supreme Court blocks controversial social studies standards. Rules Walters violated Open Meetings Act.',
    category: 'legal',
    icon: '⚖️',
    impact: 'Major policy defeat; back to 2019 standards',
    severity: 3,
    evidence: [
      {
        type: 'court',
        source: 'Oklahoma Supreme Court Decision',
        metric: 'Unanimous ruling against Walters',
      },
    ],
  },
  {
    id: '8',
    date: 'AUG 2025',
    monthsFromStart: 31,
    title: 'Ethics Violation Settlements',
    narrative: 'Financial & Reputational Cost: Ethics Violations Settled',
    description:
      'Pays $23,300 to settle ethics complaints over campaign finance violations and misuse of state resources.',
    category: 'legal',
    icon: '💰',
    impact: 'Financial penalties; reputation further damaged',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'State Ethics Commission',
        metric: '$23,300 settlement + multiple ongoing investigations',
      },
    ],
  },
  {
    id: '9',
    date: 'SEPT 24, 2025',
    monthsFromStart: 32,
    title: 'Resignation Announced on Fox News',
    narrative: 'End Game: Announces Resignation 14+ Months Early',
    description:
      'Announces on Fox News that he will resign to become CEO of Teacher Freedom Alliance, an anti-union organization he promoted while in office.',
    category: 'resignation',
    icon: '🚪',
    impact: 'Republican AG calls tenure "an embarrassment"',
    severity: 3,
    evidence: [
      {
        type: 'news',
        source: 'Fox News @ Night',
        metric: 'Resignation broadcast nationally',
      },
    ],
  },
  {
    id: '10',
    date: 'SEPT 30, 2025',
    monthsFromStart: 33,
    title: 'Walters Officially Resigns',
    narrative: 'Conclusion: Early Exit After 33 Months of Turmoil',
    description:
      'Leaves office with 14+ months remaining in term. Lindel Fields appointed interim superintendent, immediately begins reversing controversial policies.',
    category: 'resignation',
    icon: '✋',
    impact: 'New ethics investigation launched over conflict of interest',
    severity: 2,
    evidence: [
      {
        type: 'official',
        source: 'State Education Department',
        metric: 'Successor begins policy reversal',
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
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Grade</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">D</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                State Academic Achievement 2024-25 (Lowest in Decade)
              </p>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Count</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">7</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Major Controversies (~1 every 4.7 months)
              </p>
            </div>

            <div className="rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Losses</p>
              <p className="text-3xl md:text-4xl font-bold mb-2">2</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Court Losses (Supreme Court overturned policies)
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
                <li>📊 Avg Controversy: Every 10.5 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
