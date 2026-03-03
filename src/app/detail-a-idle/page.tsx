'use client';

import {
  ArrowDownToLine,
  ArrowLeft,
  Gift,
  MoreHorizontal,
  Timer,
} from 'lucide-react';
import Link from 'next/link';

/* ───── Mock Data ───── */
const campaign = {
  name: 'Deposit WLD on Morpho',
  protocol: 'Morpho',
  rewardToken: 'WLD',
  remaining: '163.78',
  estEnd: 'Feb 27, 2026',
  participants: '2.4k',
  apy: {
    total: '4.25',
    base: '3.21',
    boost: '1.04',
  },
};

/* ───── Detail Row ───── */
function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <span className="font-medium text-[15px] text-[#72767f] tracking-[-0.225px] flex-1 min-w-0">
        {label}
      </span>
      <span className="font-medium text-[15px] text-black tracking-[-0.225px] shrink-0">
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-[#F3F4F4]" />;
}

/* ───── 3-Step Visual (all upcoming) ───── */
function EarnCycleStepper() {
  const steps = [
    { icon: ArrowDownToLine, label: 'Deposit', desc: 'Add funds' },
    { icon: Timer, label: 'Hold', desc: 'Earn rewards' },
    { icon: Gift, label: 'Claim', desc: 'Every 4 hours' },
  ];

  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between px-6">
        {/* Connector lines */}
        <div className="absolute left-6 right-6 top-[28px] flex">
          <div className="flex-1 flex items-center px-[28px]">
            <div className="flex-1 h-[2.5px] border-t-[2.5px] border-dashed border-[#E5E5E5]" />
          </div>
          <div className="flex-1 flex items-center px-[28px]">
            <div className="flex-1 h-[2.5px] border-t-[2.5px] border-dashed border-[#E5E5E5]" />
          </div>
        </div>

        {/* Step columns — all upcoming */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center relative z-10"
            style={{ width: 80 }}
          >
            <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center bg-white border-[2.5px] border-[#E5E5E5]">
              <step.icon size={24} className="text-[#9CA2AD]" strokeWidth={2} />
            </div>
            <span className="text-[13px] font-semibold mt-2.5 text-center text-[#9CA2AD]">
              {step.label}
            </span>
            <span className="text-[11px] text-[#9CA2AD] font-medium mt-0.5 text-center">
              {step.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── Page ───── */
export default function DetailAIdle() {
  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="phone-screen-inner flex flex-col">
          {/* Navigation link */}
          <div className="px-5 pt-3">
            <Link href="/" className="text-[13px] text-[#9CA2AD] font-medium">
              &larr; All mockups
            </Link>
          </div>

          {/* Header bar */}
          <div className="flex items-center justify-between w-full px-6 pt-4">
            <Link
              href="/explore-a-idle"
              className="w-10 h-10 rounded-full bg-[#ebecef] flex items-center justify-center"
            >
              <ArrowLeft strokeWidth={2} size={24} className="text-black" />
            </Link>
            <button className="px-4 py-2.5 rounded-full border border-[#ebecef] bg-white">
              <span className="font-semibold text-[15px] text-black tracking-[-0.15px]">
                Share & Earn
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-5 pb-32">
            {/* Hero: icon + title */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="w-16 h-16 rounded-[10px] overflow-hidden">
                <img
                  src="/morpho.svg"
                  alt="Morpho"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-semibold text-[20px] text-black tracking-[-0.2px]">
                  {campaign.name}
                </h1>
                <p className="text-[14px] text-[#72767f] font-medium mt-1">
                  on {campaign.protocol}
                </p>
              </div>
            </div>

            {/* APY Hero — total with breakdown */}
            <div className="flex flex-col items-center py-6 mb-2">
              <p className="text-[56px] font-bold text-[#56B548] tracking-tight leading-none">
                {campaign.apy.total}%
              </p>
              <p className="text-[14px] text-[#9CA2AD] font-medium mt-1.5">
                Total APY
              </p>
              <p className="text-[13px] text-[#72767f] font-medium mt-1">
                {campaign.participants} users earning
              </p>
            </div>

            {/* APY Breakdown Card */}
            <div className="rounded-xl border border-[#F3F4F4] bg-[#FAFFFE] p-4 mb-4">
              <h2 className="font-semibold text-[13px] text-[#7E8795] uppercase tracking-[0.06em] mb-3">
                APY Breakdown
              </h2>
              <div className="flex flex-col gap-3">
                {/* Morpho base APY */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] overflow-hidden">
                      <img
                        src="/morpho.svg"
                        alt="Morpho"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-[15px] text-black">
                      {campaign.protocol} Base APY
                    </span>
                  </div>
                  <span className="font-semibold text-[15px] text-black">
                    {campaign.apy.base}%
                  </span>
                </div>
                <div className="h-px bg-[#F3F4F4]" />
                {/* Boost reward on top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#56B548]/15 flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path d="M5 1L1 3.5L5 6L9 3.5L5 1Z" fill="#56B548" />
                        <path
                          d="M1 6.5L5 9L9 6.5"
                          stroke="#56B548"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-[15px] text-black">
                      Boost Reward
                    </span>
                  </div>
                  <span className="font-semibold text-[15px] text-[#56B548]">
                    +{campaign.apy.boost}%
                  </span>
                </div>
                <div className="h-px bg-[#F3F4F4]" />
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[15px] text-black">
                    Total APY
                  </span>
                  <span className="font-bold text-[17px] text-[#56B548]">
                    {campaign.apy.total}%
                  </span>
                </div>
              </div>
            </div>

            <Divider />

            {/* How it works */}
            <div className="my-5">
              <h2 className="font-semibold text-[15px] text-black tracking-[-0.15px] mb-4 text-center">
                How it works
              </h2>
              <EarnCycleStepper />
              <p className="text-[13px] text-[#72767f] font-medium mt-4 text-center leading-relaxed">
                Deposit your tokens and start earning.
                <br />
                Rewards unlock every 4 hours.
              </p>
            </div>

            <Divider />

            {/* Campaign Stats */}
            <div className="flex flex-col gap-3 my-4">
              <DetailRow label="Reward Token" value={campaign.rewardToken} />
              <DetailRow
                label="Remaining"
                value={`${campaign.remaining} ${campaign.rewardToken}`}
              />
              <DetailRow label="Est. End" value={campaign.estEnd} />
            </div>
          </div>

          {/* Bottom Bar — CTA to deposit */}
          <div className="sticky bottom-0 w-full bg-gradient-to-t from-white from-[69%] to-transparent px-6 py-3 pb-6">
            <div className="flex items-center gap-3">
              <button className="h-14 flex-1 rounded-full bg-[#181818] flex items-center justify-center">
                <span className="font-semibold text-[17px] tracking-[-0.17px] text-white">
                  Deposit to Start Earning
                </span>
              </button>
              <button className="h-14 w-14 bg-white rounded-full flex items-center justify-center border border-[#ebecef] shrink-0">
                <MoreHorizontal size={23} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
