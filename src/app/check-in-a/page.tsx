'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

/* ───── Page ───── */
export default function CheckInA() {
  const [claimed, setClaimed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const readyPositions = positions.filter((p) => p.ready);
  const totalNum = readyPositions.reduce((s, p) => s + p.claimableNum, 0);
  const totalFormatted = `$${totalNum.toFixed(2)}`;


  function handleClaim() {
    setShowDrawer(true);
    setClaimed(true);
  }

  useEffect(() => {
    if (showDrawer) {
      const t = setTimeout(() => setShowDrawer(false), 4500);
      return () => clearTimeout(t);
    }
  }, [showDrawer]);

  return (
    <div className="phone-frame">
      <div className="phone-screen relative">
        <div className="phone-screen-inner pb-28">

          {/* Header row */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/explore-a"
                className="w-9 h-9 rounded-full bg-[#F3F4F4] flex items-center justify-center shrink-0"
              >
                <ArrowLeft strokeWidth={2} size={20} className="text-black" />
              </Link>
              <h1 className="text-[26px] font-bold text-black tracking-tight">
                Check In
              </h1>
            </div>
          </div>

          {/* Hero total */}
          <div className="px-5 pt-3 pb-6 flex flex-col items-center">
            <p className="text-[52px] font-bold text-black tracking-[-1px] leading-none">
              {totalFormatted}
            </p>
            <p className="text-[14px] text-[#9CA2AD] font-medium mt-2">
              Available to claim
            </p>
          </div>


          {/* Positions */}
          <div className="px-5 pt-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9CA2AD] mb-1">
              Your rewards
            </p>
            {readyPositions.map((pos, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-3.5 ${i < readyPositions.length - 1 ? 'border-b border-[#F3F4F4]' : ''}`}
              >
                <div className="w-10 h-10 rounded-[10px] overflow-hidden shrink-0">
                  <img src={pos.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[14px] text-black tracking-[-0.14px]">
                    {pos.name}
                  </p>
                  <p className="text-[12px] font-semibold text-[#56B548] mt-0.5">
                    {pos.apy}% APY
                  </p>
                </div>
                <span className="font-bold text-[16px] text-black shrink-0">{pos.claimable}</span>
              </div>
            ))}
          </div>

          {/* Sponsored card */}
          <div className="px-5 pt-3 pb-1">
            <div className="flex items-center gap-3 py-3 px-3.5 rounded-xl bg-[#FAFAFA] border border-[#EFEFEF]">
              <div className="w-9 h-9 rounded-[10px] bg-black overflow-hidden flex items-center justify-center shrink-0">
                <img src="/odos.png" alt="Odos" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-[13px] text-black tracking-[-0.13px]">
                    Odos
                  </p>
                  <span className="text-[10px] font-medium text-[#C0C7D0] tracking-wide">Sponsored</span>
                </div>
                <p className="text-[12px] text-[#9CA2AD] font-medium mt-0.5 leading-snug">
                  Best-in-class DEX aggregator on Base
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-white">
                <span className="text-[12px] font-semibold text-black">Visit</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#111113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky bottom button */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 pb-7 bg-gradient-to-t from-white from-[72%] to-transparent pointer-events-none">
          <button
            onClick={handleClaim}
            disabled={claimed}
            className="w-full h-14 rounded-full flex items-center justify-center gap-2 pointer-events-auto transition-opacity"
            style={{ background: '#111113', opacity: claimed ? 0.45 : 1 }}
          >
            <span className="font-semibold text-[17px] tracking-[-0.17px] text-white">
              {claimed ? 'Claimed ✓' : 'Claim All'}
            </span>
          </button>
        </div>

        {/* Post-claim drawer */}
        <AnimatePresence>
          {showDrawer && (
            <>
              <motion.div
                className="absolute inset-0 bg-black/25 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDrawer(false)}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-30 px-6 pb-8 pt-4"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              >
                {/* Handle */}
                <div className="w-10 h-1 bg-[#E5E5E5] rounded-full mx-auto mb-5" />

                {/* Checkmark */}
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className="w-[72px] h-[72px] rounded-full bg-[#56B548] flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(86,181,72,0.4)]"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.08 }}
                  >
                    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                      <path d="M2 12L11 21L30 2" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-[15px] text-[#9CA2AD] font-medium">You claimed</p>
                  <p className="text-[38px] font-bold text-black tracking-tight leading-tight mt-0.5">
                    {totalFormatted}
                  </p>
                </div>

                {/* Breakdown */}
                <div className="rounded-xl border border-[#F0F0F0] overflow-hidden mb-4">
                  {readyPositions.map((pos, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 ${i < readyPositions.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[6px] overflow-hidden">
                          <img src={pos.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[14px] font-medium text-black">{pos.name}</span>
                      </div>
                      <span className="text-[14px] font-semibold text-black">{pos.claimable}</span>
                    </div>
                  ))}
                </div>

                {/* Next window */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#f0faf0] rounded-xl mb-5">
                  <span className="text-[13px] font-medium text-[#3d8a34]">Next claim opens in</span>
                  <span className="text-[13px] font-bold text-[#3d8a34]">3h 42m</span>
                </div>

                <p className="text-[13px] text-[#9CA2AD] font-medium text-center">
                  Your reward tokens are now in your wallet
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
