import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../context/AudioContext';
import { SONGS } from '../data/storyData';

export const LoveLetterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSong } = useAudio();

  const handleOpen = () => {
    setIsOpen(true);
    playSong(SONGS[4], true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#d97706', '#292524'],
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 text-center">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-900 mb-2">
          Un mensaje final
        </h3>

        <p className="text-xs sm:text-sm text-ink-700 max-w-md mx-auto mb-5 font-light">
          Para cerrar este recorrido de 3 años...
        </p>

        <button
          onClick={handleOpen}
          className="px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          Abrir Mensaje de Aniversario
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-2xl text-left"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 text-ink-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-rose-600 font-mono mb-4 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                <Music className="w-3.5 h-3.5 animate-pulse" />
                <span>Sonando ahora: <strong>La que me gusta a mí</strong> — Los Amigos Invisibles</span>
              </div>

              <div className="mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
                  Feliz 3er Aniversario
                </h2>
                <p className="text-xs text-ink-500 font-mono">
                  21 de Julio de 2023 — 21 de Julio de 2026
                </p>
              </div>

              <div className="space-y-3.5 text-ink-800 text-sm leading-relaxed font-light">
                <p>
                  Hoy cumplimos 3 años juntos. Mirar atrás y recorrer estas fotos me hace recordar lo afortunado que soy por tenerte en mi vida.
                </p>
                <p>
                  Desde el 21 de julio de 2023 hemos compartido momentos inolvidables, risas y la tranquilidad de saber que estamos juntos en esto.
                </p>
                <p className="font-serif italic text-ink-900 text-base border-l-2 border-rose-500 pl-3 py-0.5">
                  "Como dice la canción que suena justo ahora: no importa el tiempo que pase, tú sigues siendo la que me gusta a mí."
                </p>
                <p>
                  Te amo muchísimo. ¡Feliz aniversario!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink-900/10 text-right">
                <p className="font-cursive text-xl text-ink-900">
                  Con todo mi amor 💖
                </p>
                <p className="text-[10px] text-ink-500 font-mono mt-0.5">
                  21 de Julio, 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
