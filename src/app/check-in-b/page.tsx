'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
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

/* ───── Mini Progress Ring ───── */
function MiniProgressRing({ progress, size = 18 }: { progress: number; size?: number }) {
  const strokeWidth = 2.5;
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

/* ───── Animated Count-Up ───── */
function CountUp({ target, duration = 800 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return <>${value.toFixed(2)}</>;
}

/* ───── Orbit Hero ───── */
function OrbitHero({ total }: { total: string }) {
  // Node positions relative to center (dx, dy in px)
  const nodes = [
    { pos: positions[0], dx: 90, dy: -62 },
    { pos: positions[1], dx: 90, dy: 62 },
    { pos: positions[2], dx: -88, dy: 0 },
  ];
  // For SVG lines: container is ~390px wide (430 - 2*20px padding), 220px tall
  // Center: (195, 110)
  const cx = 195;
  const cy = 110;

  return (
    <div className="mx-5 relative rounded-2xl overflow-hidden h-[220px] bg-gradient-to-br from-[#0a1f0a] to-[#143314]">
      {/* Ambient glow + lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="harvestGlow" cx="50%" cy="50%" r="35%">
            <stop offset="0%" stopColor="#56B548" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#56B548" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="harvestGlowInner" cx="50%" cy="50%" r="15%">
            <stop offset="0%" stopColor="#7cdc6f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#56B548" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx={cx} cy={cy} r="70" fill="url(#harvestGlow)" />
        <circle cx={cx} cy={cy} r="30" fill="url(#harvestGlowInner)" />

        {/* Lines to orbit nodes */}
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + n.dx}
            y2={cy + n.dy}
            stroke="#2d6b26"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        ))}

        {/* Center pulse rings */}
        <motion.circle
          cx={cx} cy={cy} r="18"
          stroke="#56B548" strokeWidth="1" fill="none"
          animate={{ opacity: [0.5, 0], scale: [0.8, 2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </svg>

      {/* Orbit node avatars — absolute positioned relative to center */}
      <div className="absolute inset-0">
        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${n.dx}px), calc(-50% + ${n.dy}px))`,
            }}
          >
            <motion.div
              className={`w-11 h-11 rounded-full overflow-hidden border-2 bg-[#0a1f0a] ${n.pos.ready ? 'border-[#56B548]' : 'border-[#2d6b26]'}`}
              style={{ opacity: n.pos.ready ? 1 : 0.45 }}
              animate={n.pos.ready ? {
                boxShadow: [
                  '0 0 0px rgba(86,181,72,0)',
                  '0 0 14px rgba(86,181,72,0.7)',
                  '0 0 0px rgba(86,181,72,0)',
                ],
              } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <img src={n.pos.image} alt="" className="w-full h-full object-cover" />
            </motion.div>
            {/* Claimable label below ready nodes */}
            {n.pos.ready && (
              <p className="text-[11px] font-bold text-[#8fcc86] text-center mt-1 leading-none">
                {n.pos.claimable}
              </p>
            )}
            {!n.pos.ready && (
              <p className="text-[10px] font-medium text-[#2d6b26] text-center mt-1 leading-none">
                {n.pos.countdown}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Center amount */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          className="w-3 h-3 rounded-full bg-[#56B548] mb-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="text-white/60 text-[12px] font-medium tracking-wide">Ready to claim</p>
        <p className="text-white text-[32px] font-bold tracking-tight leading-none mt-0.5">
          {total}
        </p>
      </div>
    </div>
  );
}

/* ───── Page ───── */
export default function CheckInB() {
  const [claimed, setClaimed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const readyPositions = positions.filter((p) => p.ready);
  const totalNum = readyPositions.reduce((s, p) => s + p.claimableNum, 0);
  const totalFormatted = `$${totalNum.toFixed(2)}`;

  function handleClaim() {
    setShowDrawer(true);
    setClaimed(true);
  }

  return (
    <div className="phone-frame">
      <div className="phone-screen relative">
        <div className="phone-screen-inner pb-28">

          {/* Top nav */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <Link href="/explore-a" className="text-[13px] text-[#9CA2AD] font-medium">
              &larr; Explore
            </Link>
            <span className="text-[10px] text-[#9CA2AD] font-semibold uppercase tracking-wider">
              Direction B · Harvest
            </span>
          </div>

          {/* Orbit hero */}
          <OrbitHero total={totalFormatted} />

          {/* Section header */}
          <div className="px-5 pt-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7E8795] mb-3">
              Your Positions
            </p>

            {/* Position cards */}
            <div className="flex flex-col gap-2.5">
              {positions.map((campaign, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden ${campaign.ready ? 'bg-[#f0faf0] border-[#56B548]/15' : 'bg-white border-[#F0F0F0]'}`}
                >
                  <div className="flex gap-3 items-center p-3.5 pb-2.5">
                    <div className="w-10 h-10 rounded-[8px] overflow-hidden shrink-0">
                      <img src={campaign.image} alt="" className="w-full h-full object-cover" />
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
                      <p className="text-[11px] text-[#72767f] font-medium mt-0.5">APY</p>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between px-3.5 py-2 border-t ${campaign.ready ? 'bg-[#56B548]/8 border-[#56B548]/10' : 'bg-[#F9F9F9] border-[#F0F0F0]'}`}>
                    <div className="flex items-center gap-1.5">
                      <MiniProgressRing progress={campaign.claimProgress} size={18} />
                      <span className={`text-[12px] font-semibold ${campaign.ready ? 'text-[#3d8a34]' : 'text-[#9CA2AD]'}`}>
                        {campaign.ready ? `${campaign.claimable} ready!` : `Claim in ${campaign.countdown}`}
                      </span>
                    </div>
                    {campaign.ready ? (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black">
                        <span className="text-[11px] font-semibold text-white">Claim</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#56B548]/25 bg-white/60">
                        <Plus className="w-3 h-3 text-[#3d8a34]" strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold text-[#3d8a34]">Deposit</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Featured Vault — partner card */}
              <div className="rounded-2xl overflow-hidden bg-[#0d1d10] border border-[#2d6b26]/40 relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-[#3B82F6] text-white px-1.5 h-[16px] leading-none inline-flex items-center rounded">
                    Featured
                  </span>
                </div>
                <div className="flex gap-3 items-center p-3.5 pb-2.5">
                  <div className="w-10 h-10 rounded-[8px] bg-black overflow-hidden shrink-0 flex items-center justify-center">
                    <img src="/odos.png" alt="Odos" className="w-7 h-7 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 pr-12">
                    <p className="font-semibold text-[14px] text-white tracking-[-0.14px] truncate">
                      Swap on Odos
                    </p>
                    <p className="text-[12px] text-[#56B548]/70 font-medium mt-0.5">
                      Earn more on every swap
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[18px] font-bold text-[#56B548] tracking-tight leading-none">
                      5.60%
                    </p>
                    <p className="text-[11px] text-[#56B548]/60 font-medium mt-0.5">USDC APY</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2 border-t border-[#2d6b26]/30 bg-[#0a1a0c]">
                  <span className="text-[12px] font-medium text-[#56B548]/60">Boost partner vault</span>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#56B548]/15 border border-[#56B548]/25">
                    <span className="text-[11px] font-semibold text-[#56B548]">Earn more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating harvest button */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 pb-7 bg-gradient-to-t from-white from-[72%] to-transparent pointer-events-none">
          <button
            onClick={handleClaim}
            disabled={claimed}
            className="w-full h-14 rounded-full flex flex-col items-center justify-center pointer-events-auto transition-opacity"
            style={{ background: '#111113', opacity: claimed ? 0.45 : 1 }}
          >
            <span className="font-semibold text-[17px] tracking-[-0.17px] text-white leading-none">
              {claimed ? 'Harvested ✓' : `Harvest ${totalFormatted}`}
            </span>
            {!claimed && (
              <span className="text-[11px] text-white/40 font-medium mt-0.5">
                3 positions · next in 3h 42m
              </span>
            )}
          </button>
        </div>

        {/* Post-claim harvest drawer */}
        <AnimatePresence>
          {showDrawer && (
            <>
              <motion.div
                className="absolute inset-0 bg-black/40 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDrawer(false)}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-t-[28px] z-30 px-6 pb-8 pt-5 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #143314 100%)' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              >
                {/* Handle */}
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                {/* Count-up amount */}
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className="w-[68px] h-[68px] rounded-full bg-[#56B548] flex items-center justify-center mb-4 shadow-[0_0_32px_rgba(86,181,72,0.5)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.06 }}
                  >
                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
                      <path d="M2 11L10 19L28 2" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-white/60 text-[14px] font-medium">Harvested today</p>
                  <p className="text-white text-[40px] font-bold tracking-tight leading-none mt-1">
                    <CountUp target={totalNum} duration={900} />
                  </p>
                </div>

                {/* Lifetime + Streak */}
                <div className="rounded-xl border border-white/10 bg-white/5 divide-y divide-white/10 mb-5">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[13px] font-medium text-white/60">Lifetime earnings</span>
                    <span className="text-[14px] font-bold text-white">$23.40</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[16px]">🔥</span>
                      <span className="text-[13px] font-medium text-white/60">Daily streak</span>
                    </div>
                    <span className="text-[14px] font-bold text-[#56B548]">3 days — keep it up!</span>
                  </div>
                </div>

                {/* Partner nudge — post-claim, never pre-claim */}
                <p className="text-center text-[13px] font-medium text-white/40">
                  Deposit more to earn faster →{' '}
                  <span className="text-[#56B548] font-semibold">Morpho</span>
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
