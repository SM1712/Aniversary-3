import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_REASONS } from '../data/storyData';
import { RefreshCw } from 'lucide-react';

export const ReasonGenerator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const handleNextReason = () => {
    const nextIdx = (index + 1) % LOVE_REASONS.length;
    setIndex(nextIdx);
    setKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-4">
      <div className="bg-white rounded-2xl p-6 text-center border border-ink-900/10 shadow-sm">
        <span className="text-[10px] uppercase font-mono tracking-widest text-ink-500 block mb-3">
          Razones
        </span>

        <div className="min-h-[60px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="font-serif text-base sm:text-lg text-ink-900 italic font-medium"
            >
              "{LOVE_REASONS[index]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNextReason}
          className="px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-900 font-medium text-xs border border-ink-900/10 flex items-center justify-center gap-2 mx-auto transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Siguiente Razón ({index + 1}/{LOVE_REASONS.length})</span>
        </button>
      </div>
    </div>
  );
};
