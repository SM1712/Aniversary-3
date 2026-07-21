import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X, Music, Gift, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../context/AudioContext';
import { SONGS } from '../data/storyData';

export const LoveLetterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSong } = useAudio();

  const handleOpen = () => {
    setIsOpen(true);
    // Play requested finale song "La que me gusta a mi"
    playSong(SONGS[4], true);

    // Trigger romantic confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fde047', '#fda4af', '#be123c'],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
      {/* Interactive Wax Envelope Banner */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-panel rounded-3xl p-8 border border-amber-300/40 shadow-2xl relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">
          🌹
        </div>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 to-amber-500 border border-amber-300/50 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
          <Mail className="w-8 h-8 text-rose-950" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          Una Carta Especial para <span className="gold-gradient-text">Ti</span>
        </h3>

        <p className="text-sm text-rose-200/90 max-w-md mx-auto mb-6 font-light">
          Tengo algo muy especial que decirte sobre estos 3 años juntos...
        </p>

        <button
          onClick={handleOpen}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-rose-950 font-bold text-base shadow-xl hover:shadow-rose-600/40 flex items-center justify-center gap-2.5 mx-auto transition-all cursor-pointer border border-amber-200/60"
        >
          <Gift className="w-5 h-5 text-rose-950" />
          <span>Abrir Carta de Aniversario</span>
          <Sparkles className="w-4 h-4 text-rose-950" />
        </button>
      </motion.div>

      {/* Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-burgundy-950/95 backdrop-blur-2xl p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-gradient-to-b from-[#2b0712] to-[#180309] rounded-3xl p-6 sm:p-10 border border-amber-300/50 shadow-2xl overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rose-950/80 text-rose-200 hover:text-white border border-rose-500/40 flex items-center justify-center z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Music Banner */}
              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono mb-4 bg-rose-950/80 p-2.5 rounded-xl border border-rose-500/30">
                <Music className="w-4 h-4 animate-spin-slow text-amber-300" />
                <span>Sonando ahora: <strong>La que me gusta a mí</strong> — Los Amigos Invisibles</span>
              </div>

              {/* Letter Header */}
              <div className="text-center mb-6">
                <span className="text-4xl">🌹</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text mt-2">
                  Feliz 3er Aniversario
                </h2>
                <p className="font-cursive text-xl text-rose-300">
                  21 de Julio de 2023 — 21 de Julio de 2026
                </p>
              </div>

              {/* Letter Body */}
              <div className="space-y-4 text-rose-100/90 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  <strong className="text-amber-200 font-serif text-lg">Mi vida hermosa,</strong>
                </p>
                <p>
                  Hoy llegamos a nuestro tercer aniversario juntos. Mirar atrás y recorrer cada foto, cada sonrisa guardada y cada video de nosotros me hace darme cuenta de lo verdaderamente afortunado que soy por tenerte en mi vida.
                </p>
                <p>
                  Desde aquel 21 de julio de 2023, mi mundo tomó un color diferente. Hemos cambiado, hemos crecido, hemos aprendido el uno del otro y hemos superado cualquier momento tomados de la mano.
                </p>
                <p>
                  Gracias por ser mi refugio en los días difíciles, por tu risa que ilumina todo, por tus abrazos sinceros y por amar cada parte de mí.
                </p>
                <p className="font-serif italic text-amber-200 text-base sm:text-lg border-l-2 border-amber-400 pl-4 py-1">
                  "Como dice la canción que suena en este momento... no importa cuánto tiempo pase ni qué depare el camino, tú sigues siendo y siempre serás la que me gusta a mí."
                </p>
                <p>
                  Te amo con todo mi corazón y prometo seguir haciendo de tus días un lugar lleno de amor, sonrisas y complicidad.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-4 border-t border-rose-500/20 text-right">
                <p className="font-cursive text-2xl text-amber-300">
                  Con todo mi amor para siempre 💖
                </p>
                <p className="text-xs text-rose-300/70 font-mono mt-1">
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
