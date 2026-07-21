import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, Chapter, MediaItem } from '../data/storyData';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, Quote, Film, Maximize2, Minimize2, Music, Heart } from 'lucide-react';

interface InteractiveMovieProps {
  onFinishJourney?: () => void;
}

export const InteractiveMovie: React.FC<InteractiveMovieProps> = ({ onFinishJourney }) => {
  const { playSong } = useAudio();

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentChapter: Chapter = CHAPTERS[currentChapterIndex];
  const currentItem: MediaItem = currentChapter.items[currentItemIndex];

  // Sync song with current chapter
  useEffect(() => {
    if (currentChapter.song) {
      playSong(currentChapter.song, false);
    }
  }, [currentChapterIndex]);

  // Auto advance item every 6 seconds in auto mode (if item is not a playing video)
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentItem.type === 'video') return; // Don't auto advance videos until they finish

    const timer = setTimeout(() => {
      handleNext();
    }, 6500);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentChapterIndex, currentItemIndex, currentItem]);

  const handleNext = () => {
    if (currentItemIndex < currentChapter.items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentItemIndex(0);
    } else {
      // Reached the end of the journey!
      if (onFinishJourney) onFinishJourney();
    }
  };

  const handlePrev = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setCurrentItemIndex(CHAPTERS[currentChapterIndex - 1].items.length - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.log(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border border-amber-300/30 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 max-w-none rounded-none border-none' : 'min-h-[550px] sm:min-h-[620px]'
      }`}
    >
      {/* Top Bar / Chapter Indicator */}
      <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-burgundy-950/90 via-burgundy-950/40 to-transparent flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-xs font-serif uppercase tracking-widest text-amber-200">
            Capítulo {currentChapter.id}: {currentChapter.title}
          </span>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1.5 bg-rose-950/60 p-1 rounded-full border border-rose-500/30">
          {CHAPTERS.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => {
                setCurrentChapterIndex(idx);
                setCurrentItemIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-[11px] transition-all font-medium ${
                currentChapterIndex === idx
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-rose-950 font-bold shadow-md'
                  : 'text-rose-200/70 hover:text-white'
              }`}
            >
              Cap. {chap.id}
            </button>
          ))}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-rose-950/60 text-rose-200 hover:text-amber-300 border border-rose-500/30 transition-colors"
          title="Modo Pantalla Completa"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Screen (Media Display with Transitions) */}
      <div className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] bg-black flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.url}
                alt={currentItem.title}
                className="w-full h-full object-contain sm:object-cover animate-kenburns select-none"
              />
            ) : (
              <video
                src={currentItem.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                onEnded={handleNext}
              />
            )}

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/95 via-transparent to-burgundy-950/30 pointer-events-none" />

            {/* Emotional Quote Overlay */}
            {currentItem.quote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute top-16 sm:top-20 inset-x-4 sm:inset-x-12 z-20 text-center pointer-events-none"
              >
                <div className="inline-block glass-panel px-4 sm:px-6 py-2.5 rounded-2xl border-amber-300/40 shadow-xl max-w-xl mx-auto">
                  <div className="flex items-center justify-center gap-2 text-amber-300 mb-1">
                    <Quote className="w-3.5 h-3.5 rotate-180" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold">Momento EspeciaL</span>
                    <Quote className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-serif italic text-sm sm:text-lg text-white font-medium drop-shadow-md">
                    "{currentItem.quote}"
                  </p>
                </div>
              </motion.div>
            )}

            {/* Bottom Photo Details */}
            <div className="absolute bottom-16 sm:bottom-20 inset-x-4 sm:inset-x-8 z-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-4 sm:p-5 rounded-2xl border-rose-500/30 max-w-2xl"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-amber-200">
                    {currentItem.title}
                  </h4>
                  <span className="text-xs text-rose-300/80 font-mono bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-500/30">
                    {currentItem.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light">
                  {currentItem.caption}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Arrow Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-panel border border-amber-300/30 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 text-amber-200" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-panel border border-amber-300/30 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl"
        >
          <ChevronRight className="w-6 h-6 text-amber-200" />
        </button>
      </div>

      {/* Bottom Interactive Navigation & Progress Bar */}
      <div className="p-4 bg-burgundy-950/90 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Playback status / Counter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/60 hover:bg-rose-800/80 text-amber-200 text-xs font-semibold border border-rose-500/40 transition-colors"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-amber-200" />
                <span>Pausar Modo Cine</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-amber-200" />
                <span>Auto-Reproducir</span>
              </>
            )}
          </button>
          <span className="text-xs text-rose-300/70 font-mono">
            {currentItemIndex + 1} / {currentChapter.items.length}
          </span>
        </div>

        {/* Chapter Progress Indicators */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {currentChapter.items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentItemIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentItemIndex === idx
                  ? 'w-6 bg-gradient-to-r from-amber-300 to-rose-500'
                  : 'w-2 bg-rose-900/60 hover:bg-rose-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
