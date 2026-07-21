import React from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { startAudioExperience } = useAudio();

  const handleStart = () => {
    startAudioExperience();
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-50/95 backdrop-blur-md overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 text-center border border-ink-900/10 shadow-xl overflow-hidden"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-ink-500 block mb-3">
          21 de Julio de 2023 — 2026
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-3 tracking-tight">
          Nuestra Historia
        </h1>

        <p className="text-sm text-ink-700 mb-8 leading-relaxed font-light">
          Tres años compartiendo momentos, risas y aventuras juntos.
        </p>

        <button
          onClick={handleStart}
          className="w-full py-3.5 px-6 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-sm shadow-md flex items-center justify-center gap-2.5 mx-auto transition-all cursor-pointer group"
        >
          <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
          <span>Comenzar Recorrido</span>
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-ink-500">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Sube el volumen de tu dispositivo</span>
        </div>
      </motion.div>
    </div>
  );
};
