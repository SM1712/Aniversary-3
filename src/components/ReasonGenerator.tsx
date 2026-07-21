import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_REASONS } from '../data/storyData';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReasonGenerator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const handleNextReason = () => {
    const nextIdx = (index + 1) % LOVE_REASONS.length;
    setIndex(nextIdx);
    setKey(prev => prev + 1);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#fda4af', '#fde047', '#f43f5e'],
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 text-center border-rose-500/30 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Razones por las que te amo
        </div>

        <div className="min-h-[90px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-lg sm:text-2xl text-amber-100 italic font-medium leading-relaxed"
            >
              "{LOVE_REASONS[index]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNextReason}
          className="px-6 py-3 rounded-full bg-rose-900/80 hover:bg-rose-800 text-amber-200 font-semibold text-xs sm:text-sm border border-amber-300/40 flex items-center justify-center gap-2 mx-auto transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-amber-300" />
          <span>Siguiente Razón de Amor (#{index + 1})</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </button>
      </div>
    </div>
  );
};
