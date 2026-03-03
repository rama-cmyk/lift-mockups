'use client';

import Link from 'next/link';

const screens = [
  {
    href: '/explore-a-idle',
    label: 'Idle Explore',
    description:
      "User is browsing campaigns they haven't joined yet. Discovery and opportunity.",
    color: '#a1a1aa',
  },
  {
    href: '/detail-a-idle',
    label: 'Idle Detail',
    description:
      'Campaign detail before depositing. APY breakdown, how it works, and CTA to deposit.',
    color: '#a1a1aa',
  },
  {
    href: '/explore-a',
    label: 'Earning Explore',
    description:
      'User is actively earning. Countdowns, progress, and deposit-more option on each card.',
    color: '#56B548',
  },
  {
    href: '/detail-c',
    label: 'Earning Detail',
    description:
      'Campaign detail while earning. APY breakdown, progress, stepper, and claim button.',
    color: '#56B548',
  },
];

export default function LiftIndex() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Lift Redesign
        </h1>
        <p className="text-[#a1a1aa] text-base mb-8">
          Hold-to-Earn experience in the Lift miniapp. Two user states — idle
          (browsing) and earning (active) — across explore and detail screens.
        </p>

        {/* Problems */}
        <div className="rounded-xl border border-[#27272a] bg-[#111113] p-5 mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a1a1aa] mb-3">
            Problems to Solve
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-red-400 shrink-0">1.</span>
              <span className="text-[#d4d4d8]">
                Users can&apos;t tell if APY comes from the protocol or Boost
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-red-400 shrink-0">2.</span>
              <span className="text-[#d4d4d8]">
                Hold-to-earn rows look identical to single-claim rows
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-red-400 shrink-0">3.</span>
              <span className="text-[#d4d4d8]">
                No way to deposit more while actively earning
              </span>
            </div>
          </div>
        </div>

        {/* All Screens */}
        <h2 className="text-lg font-semibold mb-4">Screens</h2>
        <div className="grid gap-3 mb-10">
          {screens.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-4 rounded-xl border border-[#27272a] bg-[#111113] p-4 hover:border-[#3f3f46] transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{s.label}</p>
                <p className="text-sm text-[#a1a1aa] mt-0.5">{s.description}</p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#a1a1aa] shrink-0"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
