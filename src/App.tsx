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
import { FloralDivider } from './components/FloralDecorations';
import { motion, AnimatePresence } from 'framer-motion';

export const AppContent: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'movie' | 'gallery'>('movie');

  return (
    <div className="relative min-h-screen pb-24 text-ink-900 bg-cream-50 overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Soft Petals Overlay */}
      <PetalsCanvas />

      {/* Welcome Screen Onboarding */}
      <AnimatePresence>
        {!hasStarted && (
          <WelcomeScreen onStart={() => setHasStarted(true)} />
        )}
      </AnimatePresence>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
        {/* Minimal Hero Header */}
        <section className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-500 block">
            Aniversario
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
            Nuestros 3 Años Juntos
          </h1>
          <p className="text-sm text-ink-700 font-light max-w-md mx-auto">
            21 de Julio de 2023 — 21 de Julio de 2026
          </p>

          <AnniversaryCounter />
        </section>

        <FloralDivider />

        {/* View Tabs */}
        <section>
          {activeTab === 'movie' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <InteractiveMovie onFinishJourney={() => setActiveTab('gallery')} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MemoryGallery />
            </motion.div>
          )}
        </section>

        <FloralDivider />

        {/* Reason Generator */}
        <section>
          <ReasonGenerator />
        </section>

        {/* Love Letter Modal Banner */}
        <section>
          <LoveLetterModal />
        </section>
      </main>

      <footer className="mt-12 text-center text-xs text-ink-500 py-6 border-t border-ink-900/10">
        <p className="font-mono text-[11px]">21.07.2023 — 21.07.2026</p>
      </footer>

      {/* Persistent Minimal Audio Player */}
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
