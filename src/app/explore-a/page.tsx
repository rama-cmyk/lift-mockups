'use client';

import { ChevronRight, Plus, Zap } from 'lucide-react';
import Link from 'next/link';

/* ───── Mock Data ───── */
const holdToEarnCampaigns = [
  {
    name: 'Deposit WLD on Morpho',
    apy: '4.25',
    protocol: 'Morpho',
    status: 'Earning',
    claimCountdown: '2h 45m',
    claimProgress: 0.31,
    image: '/morpho.svg',
    readyToClaim: false,
    aggregated: true,
  },
  {
    name: 'Supply USDC on Aave',
    apy: '5.60',
    protocol: 'Aave',
    status: 'Earning',
    claimCountdown: '',
    claimProgress: 1,
    image: '/aave.png',
    readyToClaim: true,
  },
  {
    name: 'Stake ETH on Lido',
    apy: '3.10',
    protocol: 'Lido',
    status: 'Earning',
    claimCountdown: '3h 58m',
    claimProgress: 0.01,
    image: '/lido.jpg',
    readyToClaim: false,
  },
];

const pendingClaims = [
  {
    name: 'Supply DAI on Credit',
    lastReward: '$0.85',
    protocol: 'Credit',
    image: '/credit.png',
  },
];

const singleClaimRewards = [
  {
    name: 'Borrow on Morpho',
    reward: 'Get 5% back',
    stat: '$50 claimed',
    image: '/morpho.svg',
  },
  {
    name: 'Borrow on Credit',
    reward: 'Get 5% back',
    stat: '$7 claimed',
    image: '/credit.png',
  },
  {
    name: 'Swap on Odos',
    reward: 'Earn $0.25',
    stat: '$890 claimed',
    image: '/odos.png',
    bgBlack: true,
  },
];

/* ───── Progress Ring ───── */
function MiniProgressRing({
  progress,
  size = 36,
  color = 'green',
}: {
  progress: number;
  size?: number;
  color?: 'green' | 'blue';
}) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const bgStroke = color === 'blue' ? '#DBEAFE' : '#E8F5E9';
  const fgStroke = color === 'blue' ? '#3B82F6' : '#56B548';

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgStroke}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={fgStroke}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───── Project Icon ───── */
function ProjectIcon({ src, bgBlack }: { src: string; bgBlack?: boolean }) {
  return (
    <div
      className={`w-12 h-12 rounded-[10px] overflow-hidden shrink-0 flex items-center justify-center ${bgBlack ? 'bg-black' : ''}`}
    >
      <img
        src={src}
        alt=""
        className={
          bgBlack ? 'w-7 h-7 object-contain' : 'w-full h-full object-cover'
        }
      />
    </div>
  );
}

/* ───── Page ───── */
export default function ExploreA() {
  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="phone-screen-inner">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <Link href="/" className="text-[13px] text-[#9CA2AD] font-medium">
              &larr; All mockups
            </Link>
            <span className="text-[11px] text-[#9CA2AD] font-medium uppercase tracking-wider">
              Earning
            </span>
          </div>

          {/* Lifetime earnings */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-[14px] text-[#72767f] font-medium">
              Lifetime earnings
            </p>
            <p className="text-[32px] font-semibold text-black tracking-tight">
              $20.93
            </p>
          </div>

          {/* Explore rewards header */}
          <div className="px-5 pt-6 pb-2">
            <h2 className="text-[21px] font-medium tracking-[-0.63px] text-black">
              Explore rewards
            </h2>
            <div className="flex gap-1 items-center mt-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="7.5"
                  stroke="black"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="9"
                  cy="9"
                  rx="3"
                  ry="7.5"
                  stroke="black"
                  strokeWidth="1.2"
                />
                <path d="M1.5 9H16.5" stroke="black" strokeWidth="1.2" />
              </svg>
              <p className="text-[15px] text-black tracking-[-0.15px]">
                $75 claimed in past day
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 pt-4 pb-2 flex gap-2 overflow-x-auto hide-scrollbar">
            <button className="shrink-0 px-4 rounded-full h-[38px] text-[15px] font-semibold tracking-[-0.15px] bg-black text-white border border-black">
              Trending
            </button>
            <button className="shrink-0 px-4 rounded-full h-[38px] text-[15px] font-semibold tracking-[-0.15px] bg-transparent text-black border border-[#E5E5E5]">
              DeFi
            </button>
            <button className="shrink-0 px-4 rounded-full h-[38px] text-[15px] font-semibold tracking-[-0.15px] bg-transparent text-black border border-[#E5E5E5]">
              Highest Reward
            </button>
            <button className="shrink-0 px-4 rounded-full h-[38px] text-[15px] font-semibold tracking-[-0.15px] bg-transparent text-black border border-[#E5E5E5]">
              Recent
            </button>
          </div>

          {/* HOLD TO EARN — Section */}
          <div className="px-5 pt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7E8795] mb-3">
              Hold to earn
            </p>

            {/* ELEVATED CARDS */}
            <div className="flex flex-col gap-2.5">
              {holdToEarnCampaigns.map((campaign, i) => (
                <Link key={i} href="/detail-c">
                  <div className="bg-[#f0faf0] rounded-2xl border border-[#56B548]/10 overflow-hidden">
                    <div className="flex gap-3 items-center p-3.5 pb-2.5">
                      <div className="w-10 h-10 rounded-[8px] overflow-hidden shrink-0">
                        <img
                          src={campaign.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[14px] text-black tracking-[-0.14px] truncate">
                          {campaign.name}
                        </p>
                        <p className="text-[12px] text-[#72767f] font-medium mt-0.5">
                          on {campaign.protocol}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="flex items-center gap-0.5 justify-end">
                          {campaign.aggregated && (
                            <Zap className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" strokeWidth={2.5} />
                          )}
                          <p className="text-[18px] font-bold text-[#56B548] tracking-tight leading-none">
                            {campaign.apy}%
                          </p>
                        </div>
                        <p className="text-[11px] text-[#72767f] font-medium mt-0.5">
                          APY
                        </p>
                      </div>
                    </div>
                    {/* Bottom bar — claim countdown + deposit action */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#56B548]/8 border-t border-[#56B548]/10">
                      <div className="flex items-center gap-1.5">
                        <MiniProgressRing
                          progress={campaign.claimProgress}
                          size={18}
                        />
                        <span className="text-[12px] font-semibold text-[#3d8a34]">
                          {campaign.readyToClaim
                            ? 'Ready to claim!'
                            : `Claim in ${campaign.claimCountdown}`}
                        </span>
                      </div>
                      {campaign.readyToClaim ? (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black">
                          <span className="text-[11px] font-semibold text-white">
                            Claim
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#56B548]/25 bg-white/60">
                          <Plus
                            className="w-3 h-3 text-[#3d8a34]"
                            strokeWidth={2.5}
                          />
                          <span className="text-[11px] font-semibold text-[#3d8a34]">
                            Deposit
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PENDING CLAIMS — Section */}
          <div className="px-5 pt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7E8795] mb-3">
              Pending claims
            </p>

            <div className="flex flex-col gap-2.5">
              {pendingClaims.map((campaign, i) => (
                <div
                  key={i}
                  className="bg-[#EFF6FF] rounded-2xl border border-[#3B82F6]/10 overflow-hidden"
                >
                  <div className="flex gap-3 items-center p-3.5 pb-2.5">
                    <div className="w-10 h-10 rounded-[8px] overflow-hidden shrink-0">
                      <img
                        src={campaign.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] text-black tracking-[-0.14px] truncate">
                        {campaign.name}
                      </p>
                      <p className="text-[12px] text-[#72767f] font-medium mt-0.5">
                        on {campaign.protocol}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[18px] font-bold text-[#3B82F6] tracking-tight leading-none">
                        {campaign.lastReward}
                      </p>
                      <p className="text-[11px] text-[#72767f] font-medium mt-0.5">
                        unclaimed
                      </p>
                    </div>
                  </div>
                  {/* Bottom bar — ready to claim */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#3B82F6]/8 border-t border-[#3B82F6]/10">
                    <div className="flex items-center gap-1.5">
                      <MiniProgressRing progress={1} size={18} color="blue" />
                      <span className="text-[12px] font-semibold text-[#2563EB]">
                        Ready to claim!
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black">
                      <span className="text-[11px] font-semibold text-white">
                        Claim
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SINGLE-CLAIM REWARDS — Section */}
          <div className="px-5 pt-6 pb-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7E8795] mb-3">
              Single-claim rewards
            </p>

            <div className="flex flex-col gap-[17px]">
              {singleClaimRewards.map((reward, i) => (
                <div key={i} className="flex gap-3 items-center w-full">
                  <ProjectIcon src={reward.image} bgBlack={reward.bgBlack} />
                  <div className="flex flex-col gap-1 flex-1 min-w-0 justify-center">
                    <p className="font-semibold text-[15px] text-black tracking-[-0.15px] truncate">
                      {reward.name}
                    </p>
                    <p className="text-[14px] text-[#56B548] font-[500] tracking-[-0.14px] leading-none">
                      {reward.reward}
                      <span className="text-[#9CA2AD]"> · {reward.stat}</span>
                    </p>
                  </div>
                  <ChevronRight
                    className="w-[18px] h-[18px] text-black shrink-0"
                    strokeWidth={2.5}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
