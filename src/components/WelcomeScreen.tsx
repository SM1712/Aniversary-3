import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Play, Flower2, Music2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950 overflow-hidden">
      {/* Radial background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-lg w-full glass-panel rounded-3xl p-8 sm:p-10 text-center border-amber-300/30 shadow-2xl overflow-hidden"
      >
        {/* Animated Heart Badge */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-rose-600/40 rounded-full blur-md"
          />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-800 to-rose-600 border border-amber-300/50 flex items-center justify-center shadow-lg relative z-10">
            <Heart className="w-10 h-10 text-amber-200 fill-amber-200/40" />
          </div>
        </div>

        {/* Subtitle / Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Nuestros 3 Años Juntos
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
          Un Viaje Por Nuestra <span className="gold-gradient-text">Historia</span>
        </h1>

        <p className="font-cursive text-xl sm:text-2xl text-rose-200 mb-6">
          21 de Julio de 2023 — 21 de Julio de 2026
        </p>

        <p className="text-sm sm:text-base text-rose-100/80 mb-8 leading-relaxed font-light">
          "Cada foto guarda la risa que me arregló un día difícil y el abrazo que me hizo sentir en casa. Prepárate para revivir nuestros mejores momentos..."
        </p>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-rose-950 font-bold text-base sm:text-lg shadow-xl hover:shadow-rose-600/40 flex items-center justify-center gap-3 mx-auto transition-all border border-amber-200/60 group cursor-pointer"
        >
          <Play className="w-5 h-5 fill-rose-950 group-hover:translate-x-0.5 transition-transform" />
          <span>Comenzar Nuestra Historia</span>
          <Flower2 className="w-5 h-5 text-rose-950" />
        </motion.button>

        {/* Sound Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-rose-300/70">
          <Music2 className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span>Sube el volumen para disfrutar la música de cada etapa</span>
        </div>
      </motion.div>
    </div>
  );
};
