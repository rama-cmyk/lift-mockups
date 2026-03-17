'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ───── Mock Data ───── */
const positions = [
  {
    name: 'Morpho USDC',
    protocol: 'Morpho',
    apy: '4.25',
    image: '/morpho.svg',
    claimable: '$1.62',
    claimableNum: 1.62,
    ready: true,
    countdown: null,
    claimProgress: 1,
  },
  {
    name: 'Aave ETH',
    protocol: 'Aave',
    apy: '3.10',
    image: '/aave.png',
    claimable: '$0.85',
    claimableNum: 0.85,
    ready: true,
    countdown: null,
    claimProgress: 1,
  },
  {
    name: 'Lido stETH',
    protocol: 'Lido',
    apy: '2.80',
    image: '/lido.jpg',
    claimable: '$0.32',
    claimableNum: 0.32,
    ready: false,
    countdown: '1h 10m',
    claimProgress: 0.22,
  },
];

const ecosystemCards = [
  {
    name: 'Aave V3 USDC Market',
    protocol: 'Aave',
    image: '/aave.png',
    metric: '5.20% APY',
    headline: 'New supply rate just increased on Base',
    gradient: 'from-[#1a1a4e] to-[#2d2d8c]',
    tag: 'DeFi Lending',
  },
  {
    name: 'Morpho Blue',
    protocol: 'Morpho',
    image: '/morpho.svg',
    metric: '6.80% APY',
    headline: 'Curated vault now open for USDC deposits',
    gradient: 'from-[#1a2e1a] to-[#2d5c2d]',
    tag: 'Yield Vault',
  },
  {
    name: 'Lido stETH Staking',
    protocol: 'Lido',
    image: '/lido.jpg',
    metric: '3.10% APY',
    headline: 'Liquid ETH staking — unstake anytime',
    gradient: 'from-[#1a1e2e] to-[#2d3a5c]',
    tag: 'Liquid Staking',
  },
  {
    name: 'Odos Smart Router',
    protocol: 'Odos',
    image: '/odos.png',
    metric: 'Best rates',
    headline: 'Save on every swap with optimized routing',
    gradient: 'from-[#1a0d0d] to-[#3a1a1a]',
    tag: 'DEX Aggregator',
    bgBlack: true,
  },
];

/* ───── Mini Progress Ring ───── */
function MiniRing({ progress, size = 16 }: { progress: number; size?: number }) {
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E8F5E9" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#56B548" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

/* ───── Page ───── */
export default function CheckInC() {
  const [activeTab, setActiveTab] = useState<'positions' | 'ecosystem'>('positions');
  const [claimed, setClaimed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastExpanded, setToastExpanded] = useState(false);

  const readyPositions = positions.filter((p) => p.ready);
  const totalNum = readyPositions.reduce((s, p) => s + p.claimableNum, 0);
  const totalFormatted = `$${totalNum.toFixed(2)}`;

  function handleClaim() {
    setShowToast(true);
    setClaimed(true);
  }

  useEffect(() => {
    if (showToast && !toastExpanded) {
      const t = setTimeout(() => setShowToast(false), 3200);
      return () => clearTimeout(t);
    }
  }, [showToast, toastExpanded]);

  return (
    <div className="phone-frame">
      <div className="phone-screen relative">
        <div className="phone-screen-inner pb-28">

          {/* Top nav */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1">
            <Link href="/explore-a" className="text-[13px] text-[#9CA2AD] font-medium">
              &larr; Explore
            </Link>
            <span className="text-[10px] text-[#9CA2AD] font-semibold uppercase tracking-wider">
              Direction C · Bulletin
            </span>
          </div>

          {/* Compact header strip */}
          <div className="flex items-center justify-between px-5 pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#111113] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" />
                  <circle cx="7" cy="7" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-black tracking-[-0.13px]">
                  0x3f4a…b21c
                </p>
                <p className="text-[11px] text-[#9CA2AD] font-medium">3 active positions</p>
              </div>
            </div>
            {!claimed ? (
              <div className="px-3 py-1.5 rounded-full bg-[#56B548]/12 border border-[#56B548]/25 flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#56B548]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[13px] font-bold text-[#3d8a34]">{totalFormatted} ready</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-full bg-[#F3F4F4] flex items-center gap-1.5">
                <span className="text-[13px] font-medium text-[#9CA2AD]">Claimed ✓</span>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="px-5 pb-3">
            <div className="flex gap-1 p-1 bg-[#F5F5F5] rounded-full">
              {(['positions', 'ecosystem'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 relative h-9 rounded-full text-[14px] font-semibold tracking-[-0.14px] transition-colors"
                  style={{ color: activeTab === tab ? '#111113' : '#9CA2AD' }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabPill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab === 'positions' ? 'My Positions' : 'Ecosystem'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === 'positions' && (
              <motion.div
                key="positions"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="px-5"
              >
                {/* Column headers */}
                <div className="flex items-center gap-3 px-1 py-1.5 mb-1">
                  <div className="w-7 shrink-0" />
                  <p className="flex-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#9CA2AD]">
                    Campaign
                  </p>
                  <p className="w-16 text-right text-[11px] font-semibold uppercase tracking-[0.07em] text-[#9CA2AD]">
                    APY
                  </p>
                  <p className="w-16 text-right text-[11px] font-semibold uppercase tracking-[0.07em] text-[#9CA2AD]">
                    Status
                  </p>
                  <div className="w-14 shrink-0" />
                </div>

                <div className="rounded-xl border border-[#F0F0F0] overflow-hidden">
                  {positions.map((pos, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3.5 py-3 ${i < positions.length - 1 ? 'border-b border-[#F5F5F5]' : ''} ${pos.ready ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                    >
                      {/* Logo */}
                      <div className="w-7 h-7 rounded-[6px] overflow-hidden shrink-0">
                        <img src={pos.image} alt="" className="w-full h-full object-cover" />
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[13px] text-black tracking-[-0.13px] truncate">
                          {pos.name}
                        </p>
                        <p className="text-[11px] text-[#9CA2AD] font-medium">{pos.protocol}</p>
                      </div>

                      {/* APY */}
                      <div className="w-16 text-right shrink-0">
                        <p className="font-bold text-[14px] text-[#56B548]">{pos.apy}%</p>
                      </div>

                      {/* Status ring + text */}
                      <div className="w-16 flex items-center justify-end gap-1 shrink-0">
                        <MiniRing progress={pos.claimProgress} size={16} />
                        <span className={`text-[11px] font-semibold ${pos.ready ? 'text-[#56B548]' : 'text-[#9CA2AD]'}`}>
                          {pos.ready ? 'Ready' : pos.countdown}
                        </span>
                      </div>

                      {/* Claim pill */}
                      <div className="w-14 flex justify-end shrink-0">
                        {pos.ready ? (
                          <button className="px-2.5 py-1 rounded-full bg-[#111113] flex items-center">
                            <span className="text-[11px] font-semibold text-white">Claim</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#C0C7D0] font-medium">—</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total row */}
                <div className="flex items-center justify-between px-3.5 py-3 mt-2 rounded-xl bg-[#f0faf0] border border-[#56B548]/15">
                  <span className="text-[13px] font-semibold text-[#3d8a34]">Total claimable</span>
                  <span className="text-[16px] font-bold text-[#56B548]">{totalFormatted}</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'ecosystem' && (
              <motion.div
                key="ecosystem"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="px-5"
              >
                <p className="text-[12px] font-medium text-[#9CA2AD] mb-4 leading-relaxed">
                  Curated DeFi opportunities from Boost partners.
                </p>

                <div className="flex flex-col gap-3">
                  {ecosystemCards.map((card, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl overflow-hidden bg-gradient-to-br ${card.gradient} relative`}
                    >
                      {/* Sponsored label */}
                      <span className="absolute top-3 right-3 text-[10px] font-medium text-white/40 tracking-wide">
                        Sponsored
                      </span>

                      <div className="p-4 pb-3">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className={`w-9 h-9 rounded-[8px] overflow-hidden shrink-0 flex items-center justify-center ${card.bgBlack ? 'bg-black' : 'bg-white/10'}`}>
                            <img
                              src={card.image}
                              alt={card.protocol}
                              className={card.bgBlack ? 'w-6 h-6 object-contain' : 'w-full h-full object-cover'}
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">
                              {card.tag}
                            </span>
                            <p className="text-white font-bold text-[15px] tracking-[-0.15px] leading-tight">
                              {card.name}
                            </p>
                          </div>
                        </div>

                        <p className="text-[13px] text-white/60 font-medium leading-relaxed mb-3">
                          {card.headline}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                            <span className="text-[13px] font-bold text-[#56B548]">
                              {card.metric}
                            </span>
                          </div>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                            <span className="text-[12px] font-semibold text-white">Explore</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Sticky claim button — only on positions tab */}
        <AnimatePresence>
          {activeTab === 'positions' && !claimed && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-5 py-4 pb-7 bg-gradient-to-t from-white from-[72%] to-transparent pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
            >
              <button
                onClick={handleClaim}
                className="w-full h-14 rounded-full flex items-center justify-center pointer-events-auto"
                style={{ background: '#111113' }}
              >
                <span className="font-semibold text-[17px] tracking-[-0.17px] text-white">
                  Claim All
                </span>
                <span className="font-semibold text-[17px] tracking-[-0.17px] text-[#56B548] ml-2">
                  · {totalFormatted}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="absolute bottom-6 left-4 right-4 z-30"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            >
              {!toastExpanded ? (
                <div
                  className="bg-[#111113] rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer shadow-xl shadow-black/30"
                  onClick={() => setToastExpanded(true)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#56B548] flex items-center justify-center shrink-0">
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white">Claimed {totalFormatted}</p>
                      <p className="text-[12px] text-white/40 font-medium">Tap for receipt</p>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </div>
              ) : (
                <div className="bg-[#111113] rounded-2xl overflow-hidden shadow-xl shadow-black/30">
                  <div className="px-5 pt-4 pb-3 border-b border-white/8">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[16px] font-bold text-white">Receipt</p>
                      <button onClick={() => { setToastExpanded(false); setShowToast(false); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {readyPositions.map((pos, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-[5px] overflow-hidden">
                            <img src={pos.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[13px] font-medium text-white/70">{pos.name}</span>
                        </div>
                        <span className="text-[13px] font-bold text-white">{pos.claimable}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-[13px] font-semibold text-white/40">Total</span>
                    <span className="text-[16px] font-bold text-[#56B548]">{totalFormatted}</span>
                  </div>
                  <div className="px-5 pb-4">
                    <p className="text-[12px] text-white/30 font-medium text-center">
                      Explore the{' '}
                      <button
                        onClick={() => { setActiveTab('ecosystem'); setToastExpanded(false); setShowToast(false); }}
                        className="text-[#56B548] font-semibold"
                      >
                        Ecosystem tab
                      </button>{' '}
                      to earn more →
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
