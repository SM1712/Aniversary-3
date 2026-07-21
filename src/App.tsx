import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { PetalsCanvas } from './components/PetalsCanvas';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { AnniversaryCounter } from './components/AnniversaryCounter';
import { InteractiveMovie } from './components/InteractiveMovie';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveLetterModal } from './components/LoveLetterModal';
import { ReasonGenerator } from './components/ReasonGenerator';
import { AudioPlayer } from './components/AudioPlayer';
import { FloralCornerTopLeft, FloralDivider } from './components/FloralDecorations';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower2, ChevronDown } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'movie' | 'gallery' | 'letter'>('movie');

  return (
    <div className="relative min-h-screen pb-28 text-rose-100 overflow-x-hidden selection:bg-rose-600 selection:text-white">
      {/* Background Falling Petals Canvas */}
      <PetalsCanvas />

      {/* Elegant Floral Corners */}
      <FloralCornerTopLeft className="fixed top-0 left-0 z-20 opacity-60" />
      <FloralCornerTopLeft className="fixed top-0 right-0 z-20 opacity-60 -scale-x-100" />

      {/* Welcome Screen (Onboarding overlay) */}
      <AnimatePresence>
        {!hasStarted && (
          <WelcomeScreen onStart={() => setHasStarted(true)} />
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8 space-y-10 sm:space-y-16">
        {/* Hero Banner / Counter */}
        <section className="text-center space-y-4 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/60 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-medium shadow-lg"
          >
            <Flower2 className="w-4 h-4 text-rose-400" />
            <span>21 de Julio de 2023 — 21 de Julio de 2026</span>
            <Flower2 className="w-4 h-4 text-rose-400" />
          </motion.div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Nuestros <span className="gold-gradient-text">3 Años</span> de Amor
          </h1>
          <p className="font-cursive text-2xl sm:text-3xl text-rose-300">
            "Para siempre tú: La que me gusta a mí"
          </p>

          <AnniversaryCounter />
        </section>

        <FloralDivider />

        {/* Tab Views */}
        <section>
          {activeTab === 'movie' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Experiencia Audiovisual
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Película Interactiva de Nuestra Historia
                </h2>
                <p className="text-xs sm:text-sm text-rose-200/80 font-light">
                  Siéntate, relájate y escucha la música mientras recordamos cada etapa juntos.
                </p>
              </div>

              <InteractiveMovie onFinishJourney={() => setActiveTab('gallery')} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryGallery />
            </motion.div>
          )}
        </section>

        <FloralDivider />

        {/* Interactive Features: Reason Generator */}
        <section>
          <ReasonGenerator />
        </section>

        {/* Love Letter Modal Banner (Grand finale) */}
        <section>
          <LoveLetterModal />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-rose-300/60 space-y-2 py-6 border-t border-rose-500/20">
        <div className="flex items-center justify-center gap-1">
          <span>Hecho con todo el amor del mundo por nuestro Aniversario</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>
        <p className="font-mono text-[10px]">21.07.2023 — 21.07.2026</p>
      </footer>

      {/* Persistent Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}
