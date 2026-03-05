'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import HoldToEarnExplainer from '../../components/HoldToEarnExplainer';

/* ───── Mock Data ───── */
const holdToEarnCampaigns = [
  {
    name: 'Deposit WLD on Morpho',
    apy: '1.04',
    protocol: 'Morpho',
    participants: '2.4k',
    image: '/morpho.svg',
  },
  {
    name: 'Supply USDC on Aave',
    apy: '3.21',
    protocol: 'Aave',
    participants: '5.1k',
    image: '/aave.png',
  },
  {
    name: 'Stake ETH on Lido',
    apy: '0.85',
    protocol: 'Lido',
    participants: '1.8k',
    image: '/lido.jpg',
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

/* ───── Flowing Token (cycles image each loop) ───── */
const tokenImages = ['/ETH.png', '/DAI.png', '/USDT.png', '/HYPE.png', '/USDC.png', '/aave.png', '/WLD.png'];
const tokenTimes = [0, 0.1, 0.85, 1];

function FlowingToken({ slot, startIndex }: { slot: { x: number[]; y: number[]; duration: number; delay: number; size: number }; startIndex: number }) {
  const [imgIdx, setImgIdx] = useState(startIndex);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    const wait = (isFirst ? slot.delay : 0) + slot.duration;
    const timer = setTimeout(() => {
      setImgIdx((prev) => (prev + 1) % tokenImages.length);
      setIsFirst(false);
    }, wait * 1000);
    return () => clearTimeout(timer);
  }, [imgIdx, isFirst, slot.delay, slot.duration]);

  return (
    <motion.div
      key={imgIdx}
      className="absolute left-1/2 top-[44%] z-10"
      style={{ marginLeft: -slot.size / 2, marginTop: -slot.size / 2 }}
      initial={{ x: slot.x[0], y: slot.y[0], opacity: 0, scale: 0.5 }}
      animate={{
        x: slot.x,
        y: slot.y,
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 0.85, 0.1],
      }}
      transition={{
        duration: slot.duration,
        delay: isFirst ? slot.delay : 0,
        times: tokenTimes,
        ease: 'linear',
      }}
    >
      <div
        className="rounded-full overflow-hidden shadow-[0_0_8px_rgba(86,181,72,0.3)] bg-white"
        style={{ width: slot.size, height: slot.size }}
      >
        <img src={tokenImages[imgIdx]} alt="" className="w-full h-full object-cover" />
      </div>
    </motion.div>
  );
}

/* ───── Hold to Earn Banner ───── */
function HoldToEarnBanner({ onClick }: { onClick?: () => void }) {
  /* Stream paths — continuously flow from edges toward center orb */
  const streams = [
    { d: 'M-10,20 Q60,25 155,68', duration: 4.0, delay: 0, len: 0.8 },
    { d: 'M-10,70 Q80,65 155,68', duration: 2.0, delay: 1.7, len: 0.3 },
    { d: 'M-10,120 Q70,100 155,68', duration: 3.2, delay: 3.8, len: 0.55 },
    { d: 'M30,-10 Q90,40 155,68', duration: 2.4, delay: 0.9, len: 0.35 },
    { d: 'M155,-10 Q155,30 155,68', duration: 3.6, delay: 2.5, len: 0.7 },
    { d: 'M320,20 Q240,25 155,68', duration: 1.8, delay: 0.3, len: 0.25 },
    { d: 'M320,68 Q240,68 155,68', duration: 3.0, delay: 4.1, len: 0.5 },
    { d: 'M320,130 Q230,100 155,68', duration: 4.2, delay: 1.2, len: 0.85 },
    { d: 'M80,166 Q120,120 155,68', duration: 2.2, delay: 3.0, len: 0.3 },
    { d: 'M240,166 Q200,110 155,68', duration: 3.4, delay: 2.1, len: 0.65 },
  ];
  /* Token animation slots — images cycle automatically via FlowingToken */
  const tokenSlots = [
    { x: [-190, -130, -50, 0], y: [-48, -46, -22, 0], duration: 3.2, delay: 0, size: 28 },
    { x: [155, 110, 40, 0], y: [-53, -42, -18, 0], duration: 3.5, delay: 0.6, size: 26 },
    { x: [-125, -90, -35, 0], y: [-88, -65, -28, 0], duration: 3.8, delay: 1.2, size: 24 },
    { x: [155, 115, 42, 0], y: [62, 48, 18, 0], duration: 3.4, delay: 1.8, size: 26 },
    { x: [-190, -130, -45, 0], y: [2, -2, -6, 0], duration: 3.6, delay: 2.4, size: 24 },
    { x: [155, 108, 35, 0], y: [-88, -62, -24, 0], duration: 3.3, delay: 3.0, size: 22 },
    { x: [-140, -95, -32, 0], y: [62, 46, 16, 0], duration: 3.7, delay: 3.6, size: 24 },
    { x: [130, 90, 28, 0], y: [20, 16, 6, 0], duration: 3.5, delay: 4.2, size: 22 },
  ];

  return (
    <div className="px-5 pt-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1f0a] to-[#143314] h-[156px] cursor-pointer" onClick={onClick}>
        <svg
          viewBox="0 0 310 156"
          fill="none"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="glow" cx="155" cy="68" r="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#56B548" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#56B548" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glowInner" cx="155" cy="68" r="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7cdc6f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#56B548" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="155" cy="68" r="65" fill="url(#glow)" />
          <circle cx="155" cy="68" r="24" fill="url(#glowInner)" />
          {/* Stream lines — flowing toward center orb */}
          {streams.map((s, i) => (
            <motion.path
              key={i}
              d={s.d}
              stroke="#2d6b26"
              strokeWidth={1.5}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: [0, s.len, s.len, 0],
                pathOffset: [0, 0, 1 - s.len, 1],
                opacity: [0, 0.25, 0.2, 0],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
          <motion.circle
            cx="155"
            cy="68"
            r="10"
            fill="#56B548"
            animate={{ scale: [1, 1.12, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="155" cy="68" r="5" fill="#a3f09a" />
          <motion.circle
            cx="155"
            cy="68"
            r="18"
            stroke="#56B548"
            strokeWidth={1}
            fill="none"
            animate={{ opacity: [0.4, 0], scale: [0.8, 1.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </svg>

        {/* Flowing token avatars — image cycles each loop */}
        {tokenSlots.map((slot, i) => (
          <FlowingToken key={i} slot={slot} startIndex={i % tokenImages.length} />
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-4 pt-8 bg-gradient-to-t from-[#0a1f0a]/90 to-transparent z-20">
          <p className="text-white font-bold text-[17px] tracking-[-0.17px] leading-tight flex items-center gap-1.5">
            Hold to Earn
            <span className="text-[10px] font-bold uppercase tracking-wide bg-[#3B82F6] text-white px-1.5 h-[16px] leading-none inline-flex items-center rounded">NEW</span>
          </p>
          <p className="text-[#8fcc86] text-[13px] font-medium mt-0.5">
            Hold tokens. Get paid. It's that easy.
          </p>
        </div>
        <div className="absolute bottom-4 right-4 z-20">
          <ChevronRight className="w-5 h-5 text-white/50" strokeWidth={2} />
        </div>
      </div>
    </div>
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
export default function ExploreAIdle() {
  const [showExplainer, setShowExplainer] = useState(false);

  return (
    <div className="phone-frame">
      <div className="phone-screen relative">
        <div className="phone-screen-inner">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <Link href="/" className="text-[13px] text-[#9CA2AD] font-medium">
              &larr; All mockups
            </Link>
            <span className="text-[11px] text-[#9CA2AD] font-medium uppercase tracking-wider">
              Direction A · Idle
            </span>
          </div>

          {/* Lifetime earnings */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-[14px] text-[#72767f] font-medium">
              Lifetime earnings
            </p>
            <p className="text-[32px] font-semibold text-black tracking-tight">
              $0.00
            </p>
          </div>

          {/* Hold to Earn announcement banner */}
          <HoldToEarnBanner onClick={() => setShowExplainer(true)} />

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

            {/* ELEVATED CARDS — Idle state: no earning badge, no countdown */}
            <div className="flex flex-col gap-2.5">
              {holdToEarnCampaigns.map((campaign, i) => (
                <Link key={i} href="/detail-a-idle">
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
                        <p className="text-[18px] font-bold text-[#56B548] tracking-tight leading-none">
                          {campaign.apy}%
                        </p>
                        <p className="text-[11px] text-[#72767f] font-medium mt-0.5">
                          APY
                        </p>
                      </div>
                    </div>
                    {/* Bottom bar — discovery state instead of earning state */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#56B548]/5 border-t border-[#56B548]/10">
                      <span className="text-[12px] font-medium text-[#72767f]">
                        {campaign.participants} earning
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] font-semibold text-[#3d8a34]">
                          Start earning
                        </span>
                        <ChevronRight
                          className="w-3.5 h-3.5 text-[#3d8a34]"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
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
        <HoldToEarnExplainer open={showExplainer} onClose={() => setShowExplainer(false)} />
      </div>
    </div>
  );
}
