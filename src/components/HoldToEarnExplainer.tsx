'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const tokenImages = ['/ETH.png', '/DAI.png', '/USDT.png', '/HYPE.png', '/USDC.png', '/aave.png', '/WLD.png'];

/* ─── Page 1: Just Hold ─── */
function StepJustHold() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Wallet graphic */}
      <div className="relative w-[260px] h-[180px] mb-10">
        {/* Wallet glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Wallet border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-white/15"
          animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Wallet interior gradient */}
        <div
          className="absolute inset-[1px] rounded-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
        {/* Wallet label */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <span className="text-[10px] text-white/30 font-medium tracking-wider uppercase">Your Wallet</span>
        </div>
        {/* Floating tokens inside wallet */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[200px] h-[100px]">
            {tokenImages.map((src, i) => {
              const positions = [
                { x: 20, y: 10 },
                { x: 80, y: 5 },
                { x: 140, y: 15 },
                { x: 50, y: 55 },
                { x: 110, y: 50 },
                { x: 160, y: 55 },
                { x: 10, y: 60 },
              ];
              const pos = positions[i];
              const size = i < 3 ? 38 : 34;
              return (
                <motion.div
                  key={src}
                  className="absolute"
                  style={{ left: pos.x, top: pos.y, width: size, height: size }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6 - (i % 3) * 2, 0, 4 + (i % 2) * 2, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.3 + i * 0.12, duration: 0.4 },
                    scale: { delay: 0.3 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 200 },
                    y: { delay: 0.3 + i * 0.12 + 0.5, duration: 3 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div
                    className="rounded-full overflow-hidden shadow-[0_0_12px_rgba(255,255,255,0.1)] bg-white"
                    style={{ width: size, height: size }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Text */}
      <motion.h2
        className="text-white text-[22px] font-bold tracking-[-0.3px] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Just Hold
      </motion.h2>
      <motion.p
        className="text-white/50 text-[14px] text-center mt-2 leading-snug"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        Keep tokens in your wallet —{'\n'}no staking, no locking
      </motion.p>
    </div>
  );
}

/* ─── Page 2: Rewards Flow to You ─── */
function StepRewardsFlow() {
  const streams = [
    { d: 'M-20,40 Q80,50 195,145', duration: 3.8, delay: 0, len: 0.7 },
    { d: 'M-20,120 Q90,110 195,145', duration: 2.2, delay: 1.5, len: 0.35 },
    { d: 'M-20,200 Q80,180 195,145', duration: 3.2, delay: 0.7, len: 0.55 },
    { d: 'M-20,260 Q100,220 195,145', duration: 4.0, delay: 2.8, len: 0.8 },
    { d: 'M60,-20 Q130,70 195,145', duration: 2.6, delay: 0.3, len: 0.4 },
    { d: 'M195,-20 Q195,60 195,145', duration: 3.4, delay: 1.9, len: 0.65 },
    { d: 'M330,-20 Q260,70 195,145', duration: 2.0, delay: 3.5, len: 0.3 },
    { d: 'M410,40 Q300,50 195,145', duration: 3.6, delay: 0.5, len: 0.7 },
    { d: 'M410,120 Q310,130 195,145', duration: 2.4, delay: 2.2, len: 0.35 },
    { d: 'M410,200 Q300,180 195,145', duration: 4.2, delay: 1.1, len: 0.85 },
    { d: 'M410,260 Q290,220 195,145', duration: 2.8, delay: 3.0, len: 0.45 },
    { d: 'M100,310 Q150,230 195,145', duration: 3.0, delay: 0.9, len: 0.5 },
    { d: 'M290,310 Q240,230 195,145', duration: 3.5, delay: 2.5, len: 0.6 },
  ];

  /* Multiple rewards can be visible at once — spread across 3 vertical lanes
     (left-high, right-mid, left-low) so they never overlap.
     Each lane staggers by ~2s so 2-3 show simultaneously. */
  const rewardTexts = [
    { x: -50, yStart: -10, delay: 0.6, text: '+$4.20' },
    { x: 40, yStart: 15, delay: 1.4, text: '+$12.50' },
    { x: -35, yStart: 35, delay: 2.2, text: '+$8.75' },
    { x: 50, yStart: -5, delay: 3.4, text: '+$6.30' },
    { x: -45, yStart: 20, delay: 4.2, text: '+$15.00' },
    { x: 35, yStart: 40, delay: 5.0, text: '+$9.80' },
    { x: -40, yStart: -15, delay: 6.2, text: '+$11.25' },
    { x: 45, yStart: 10, delay: 7.0, text: '+$7.50' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Stream animation area */}
      <div className="relative w-[310px] h-[260px] mb-8">
        <svg width="390" height="290" viewBox="0 0 390 290" className="absolute -left-[40px] -top-[15px]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="explainer-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="explainer-glow-inner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <motion.circle
            cx="195" cy="145" r="80"
            fill="url(#explainer-glow)"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Stream lines */}
          {streams.map((s, i) => (
            <motion.path
              key={i}
              d={s.d}
              stroke="#ffffff"
              strokeWidth={1.5}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: [0, s.len, s.len, 0],
                pathOffset: [0, 0, 1 - s.len, 1],
                opacity: [0, 0.15, 0.1, 0],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Center orb */}
          <motion.circle
            cx="195" cy="145" r="16"
            fill="url(#explainer-glow-inner)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="195" cy="145" r="6"
            fill="#ffffff"
            opacity={0.8}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Pulse ring */}
          <motion.circle
            cx="195" cy="145" r="16"
            fill="none"
            stroke="#ffffff"
            strokeWidth={1}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </svg>

        {/* Floating reward text — 2-3 visible at once, spread across different positions */}
        {rewardTexts.map((rt, i) => (
          <motion.span
            key={i}
            className="absolute text-white/70 text-[13px] font-bold pointer-events-none"
            style={{ left: '50%', top: '50%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, x: rt.x, y: rt.yStart }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              y: [rt.yStart, rt.yStart - 18, rt.yStart - 32, rt.yStart - 50],
              x: rt.x,
            }}
            transition={{ duration: 2.2, delay: rt.delay, repeat: Infinity, repeatDelay: rewardTexts.length * 0.8, ease: 'easeOut' }}
          >
            {rt.text}
          </motion.span>
        ))}
      </div>

      {/* Text */}
      <motion.h2
        className="text-white text-[22px] font-bold tracking-[-0.3px] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Rewards Flow to You
      </motion.h2>
      <motion.p
        className="text-white/50 text-[14px] text-center mt-2 leading-snug"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        Earn automatically while you hold
      </motion.p>
    </div>
  );
}

/* ─── Page 3: Hold More, Earn More ─── */
function StepHoldMoreEarnMore() {
  const tiers = [
    { tokens: 2, label: '$100', rate: '1.2%', barWidth: 80, delay: 0.6 },
    { tokens: 4, label: '$1,000', rate: '3.5%', barWidth: 160, delay: 1.2 },
    { tokens: 6, label: '$10,000', rate: '8.0%', barWidth: '100%', delay: 1.8 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Tier bars */}
      <div className="w-full max-w-[300px] mb-10 space-y-5">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: tier.delay, duration: 0.5, ease: 'easeOut' }}
          >
            {/* Label row */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                {/* Token stack */}
                <div className="flex -space-x-2">
                  {tokenImages.slice(0, tier.tokens).map((src, j) => (
                    <motion.div
                      key={j}
                      className="rounded-full overflow-hidden bg-white border border-[#222]"
                      style={{ width: 18, height: 18, zIndex: tier.tokens - j }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: tier.delay + 0.1 + j * 0.06, duration: 0.3, type: 'spring', stiffness: 250 }}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-white/40 text-[12px] font-medium">{tier.label}</span>
              </div>
              <motion.span
                className="text-white font-bold text-[15px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tier.delay + 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                {tier.rate}
              </motion.span>
            </div>
            {/* Bar */}
            <div className="w-full h-[8px] rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,${0.12 + i * 0.08}) 0%, rgba(255,255,255,${0.25 + i * 0.12}) 100%)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: tier.barWidth }}
                transition={{ delay: tier.delay + 0.15, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.h2
        className="text-white text-[22px] font-bold tracking-[-0.3px] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Hold More, Earn More
      </motion.h2>
      <motion.p
        className="text-white/50 text-[14px] text-center mt-2 leading-snug"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        Bigger holdings unlock higher rates
      </motion.p>
    </div>
  );
}

/* ─── Page 4: Watch It Grow ─── */
function StepWatchItGrow() {
  const milestones = [
    { pct: 17, amount: '$12', delay: 1.0, label: 'Day 1' },
    { pct: 50, amount: '$47', delay: 2.0, label: 'Week 1' },
    { pct: 83, amount: '$98', delay: 3.0, label: 'Month 1' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Timeline graphic */}
      <div className="relative w-full max-w-[300px] mb-12 h-[180px] flex items-end">
        {/* Timeline track */}
        <div className="relative w-full">
          {/* Background track */}
          <div className="w-full h-[6px] rounded-full bg-white/10" />

          {/* Animated fill bar — fills once to last milestone and stays */}
          <motion.div
            className="absolute top-0 left-0 h-[6px] rounded-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, delay: 0.5, ease: 'easeOut' }}
          />

          {/* Milestones */}
          {milestones.map((m, i) => (
            <div key={i}>
              {/* Dot on track */}
              <motion.div
                className="w-3 h-3 rounded-full bg-white border-2 border-[#111] absolute -top-[3px]"
                style={{ left: `${m.pct}%`, marginLeft: -6 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                transition={{ delay: m.delay, duration: 0.4, type: 'spring', stiffness: 300 }}
              />
              {/* Amount badge above — wrapper handles centering, inner motion handles animation */}
              <div
                className="absolute whitespace-nowrap"
                style={{ left: `${m.pct}%`, top: -60, transform: 'translateX(-50%)' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: m.delay + 0.15, duration: 0.4, type: 'spring', stiffness: 200 }}
                >
                  <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-center">
                    <span className="text-white text-[16px] font-bold">{m.amount}</span>
                  </div>
                  <div className="w-px h-[24px] bg-white/20 mx-auto" />
                </motion.div>
              </div>
              {/* Sparkle */}
              <motion.div
                className="absolute"
                style={{ left: `${m.pct}%`, top: -8, marginLeft: -8 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: [0, 180] }}
                transition={{ delay: m.delay + 0.1, duration: 0.6 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="#ffffff" opacity="0.6" />
                </svg>
              </motion.div>
              {/* Time label below */}
              <span
                className="absolute text-[10px] text-white/30 whitespace-nowrap"
                style={{ left: `${m.pct}%`, top: 16, transform: 'translateX(-50%)' }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <motion.h2
        className="text-white text-[22px] font-bold tracking-[-0.3px] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Watch It Grow
      </motion.h2>
      <motion.p
        className="text-white/50 text-[14px] text-center mt-2 leading-snug"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        The longer you hold, the more you earn
      </motion.p>
    </div>
  );
}

/* ─── Page 4: Claim Anytime ─── */
function StepClaimAnytime({ onClose }: { onClose: () => void }) {
  /* Perfect circular arrangement — 14 tokens evenly spaced on a circle,
     alternating large and small for rhythm and depth. */
  const count = 14;
  const radius = 105;
  const allTokens = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const isLarge = i % 2 === 0;
    return {
      src: tokenImages[i % tokenImages.length],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: isLarge ? 32 : 18,
      delay: 0.8 + i * 0.05,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Burst graphic */}
      <div className="relative w-[300px] h-[300px] mb-6 flex items-center justify-center">
        {/* Burst rings */}
        <motion.div
          className="absolute w-[120px] h-[120px] rounded-full border border-white/15"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.5], opacity: [0.4, 0] }}
          transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[120px] h-[120px] rounded-full border border-white/10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 3.5], opacity: [0.2, 0] }}
          transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
        />

        {/* Particle dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const dist = 80 + (i % 3) * 30;
          return (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
              style={{ left: '50%', top: '50%', marginLeft: -3, marginTop: -3 }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(a) * dist,
                y: Math.sin(a) * dist,
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{ delay: 0.7 + i * 0.04, duration: 1.0, ease: 'easeOut' }}
            />
          );
        })}

        {/* All tokens — mixed big and small in a circular layout */}
        {allTokens.map((t, i) => {
          const isSmall = t.size < 24;
          return (
            <motion.div
              key={`t-${i}`}
              className="absolute"
              style={{ left: '50%', top: '50%', marginLeft: -t.size / 2, marginTop: -t.size / 2 }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: t.x,
                y: t.y,
                scale: [0, 1.15, 1],
                opacity: [0, isSmall ? 0.55 : 1, isSmall ? 0.55 : 1],
              }}
              transition={{
                delay: t.delay,
                duration: 0.7,
                type: 'spring',
                stiffness: 120,
                damping: 12,
              }}
            >
              <motion.div
                animate={{ y: [0, isSmall ? -3 : -4, 0, isSmall ? 2 : 3, 0] }}
                transition={{ delay: t.delay + 0.8, duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  className="rounded-full overflow-hidden bg-white"
                  style={{
                    width: t.size,
                    height: t.size,
                    boxShadow: isSmall ? '0 0 6px rgba(255,255,255,0.08)' : '0 0 10px rgba(255,255,255,0.1)',
                  }}
                >
                  <img src={t.src} alt="" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center claim button */}
        <motion.div
          className="relative z-10 bg-white rounded-2xl px-6 py-3 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-black font-bold text-[15px]">Claim</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.h2
        className="text-white text-[22px] font-bold tracking-[-0.3px] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Claim Every 4 Hours
      </motion.h2>
      <motion.p
        className="text-white/50 text-[14px] text-center mt-2 leading-snug"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        Rewards unlock on a 4-hour cycle
      </motion.p>

      {/* CTA */}
      <motion.button
        className="mt-8 bg-white text-black font-bold text-[15px] rounded-full px-8 py-3.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        onClick={onClose}
      >
        Got it
      </motion.button>
    </div>
  );
}

/* ─── Main Overlay ─── */
const steps = ['Just Hold', 'Rewards Flow', 'Hold More', 'Watch It Grow', 'Claim'];

export default function HoldToEarnExplainer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);

  // Reset step when opening
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col"
          style={{
            background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 40%, #0a0a0a 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top bar: Skip */}
          <div className="flex justify-end px-5 pt-5 pb-2">
            <button
              className="text-white/40 text-[13px] font-medium flex items-center gap-0.5 active:text-white/60 transition-colors"
              onClick={onClose}
            >
              {isLast ? 'Close' : 'Skip'}
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step content */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="absolute inset-0"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {step === 0 && <StepJustHold />}
                {step === 1 && <StepRewardsFlow />}
                {step === 2 && <StepHoldMoreEarnMore />}
                {step === 3 && <StepWatchItGrow />}
                {step === 4 && <StepClaimAnytime onClose={onClose} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: dots + next button */}
          <div className="px-6 pb-8 pt-4 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === step ? 20 : 6,
                    height: 6,
                    backgroundColor: i === step ? '#ffffff' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Next button */}
            {!isLast && (
              <motion.button
                className="bg-white text-black font-semibold text-[14px] rounded-full pl-5 pr-4 py-2.5 flex items-center gap-1 active:scale-95 transition-transform"
                onClick={() => setStep((s) => s + 1)}
                whileTap={{ scale: 0.95 }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
