import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Heart } from 'lucide-react';
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
          Un mensaje especial
        </h3>

        <p className="text-xs sm:text-sm text-ink-700 max-w-md mx-auto mb-5 font-light">
          Tengo una carta para ti sobre estos 3 años...
        </p>

        <button
          onClick={handleOpen}
          className="px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
        >
          <Heart className="w-4 h-4 fill-white text-white" />
          <span>Abrir Carta de Aniversario</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-2xl text-left my-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 text-ink-900 flex items-center justify-center hover:bg-cream-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-rose-700 font-mono mb-5 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                <Music className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                <span>Sonando ahora: <strong>La que me gusta a mí</strong> — Los Amigos Invisibles</span>
              </div>

              <div className="mb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
                  Feliz 3er Aniversario
                </h2>
                <p className="text-xs text-ink-500 font-mono">
                  21 de Julio de 2023 — 21 de Julio de 2026
                </p>
              </div>

              {/* Exact User Provided Letter Body */}
              <div className="space-y-4 text-ink-800 text-sm sm:text-base leading-relaxed font-light font-serif">
                <p>
                  Hola amor, ya han pasado 3 años en los que ademas de no aprender a escribir cartas me sorprende lo mucho que cada día me puedo sentir mejor a tu lado, lo que me deja pensando por horas porque siempre vuelvo al primer día aquel 21 de julio de 2023 y pienso "si ya era feliz entonces que puedde describir lo que siento ahora?"
                </p>
                <p>
                  La verdad? Creo que aún no existe una palabra así, al menos no en español o en ingles, creo que no hay infinito lo suficientemente grande en el que pueda entrar todo el amor que tengo por ti, sabes que cada día es especial, con altos y bajos, medianos e inciertos, pero siempre contigo, siempre pensando en ti y hace ya 3 años, mas de 3 años en realidad por temas con años viciestos y eso, bueno ya tu sa jeje...
                </p>
                <p>
                  Espero que lo pases bonito de verdad, no sé si te gustara esta reinvensión de mis cartas pero espero que te parezca por lo menos curiosa, le puse musiquita que te gusta, incluida nuestra canción que es la que esta sonando ahorita mismo, te amo mucho, eres mi vida entera, feliz aniversario y vamos por muchos mas.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink-900/10 text-right">
                <p className="font-cursive text-2xl text-ink-900">
                  Para siempre tuyo 💖
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
