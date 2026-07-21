import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, Chapter, MediaItem } from '../data/storyData';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

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

  // Preload next 3 images for instant switching without lag
  useEffect(() => {
    const items = currentChapter.items;
    for (let i = 1; i <= 3; i++) {
      const nextIdx = (currentItemIndex + i) % items.length;
      if (items[nextIdx].type === 'image') {
        const img = new Image();
        img.src = items[nextIdx].url;
      }
    }
  }, [currentChapterIndex, currentItemIndex]);

  // Sync song with current chapter smoothly
  useEffect(() => {
    if (currentChapter.song) {
      playSong(currentChapter.song, false);
    }
  }, [currentChapterIndex]);

  // Auto advance timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentItem.type === 'video') return;

    const timer = setTimeout(() => {
      handleNext();
    }, 6000);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentChapterIndex, currentItemIndex, currentItem]);

  const handleNext = () => {
    if (currentItemIndex < currentChapter.items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentItemIndex(0);
    } else {
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
      className={`relative w-full max-w-4xl mx-auto rounded-2xl bg-white border border-ink-900/10 shadow-lg overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 max-w-none rounded-none border-none' : ''
      }`}
    >
      {/* Chapter Tabs */}
      <div className="p-3 bg-cream-100 border-b border-ink-900/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          {CHAPTERS.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => {
                setCurrentChapterIndex(idx);
                setCurrentItemIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentChapterIndex === idx
                  ? 'bg-ink-900 text-white font-semibold shadow-sm'
                  : 'text-ink-700 hover:bg-white/80'
              }`}
            >
              {chap.title}
            </button>
          ))}
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-full text-ink-700 hover:bg-white transition-colors shrink-0"
          title="Pantalla Completa"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Media Viewport */}
      <div className="relative w-full h-[420px] sm:h-[500px] bg-stone-950 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.url}
                alt={currentItem.date}
                className="max-w-full max-h-full object-contain select-none"
              />
            ) : (
              <video
                src={currentItem.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
                onEnded={handleNext}
              />
            )}

            {/* Clean Date Badge Only */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-white text-xs font-mono tracking-wide shadow-md">
                {currentItem.date}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Control Footer */}
      <div className="p-3 bg-white border-t border-ink-900/10 flex items-center justify-between gap-3 text-xs text-ink-700">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-900 font-medium transition-colors"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-ink-900" />
              <span>Auto</span>
            </>
          )}
        </button>

        <span className="font-mono text-ink-500">
          {currentItemIndex + 1} de {currentChapter.items.length}
        </span>
      </div>
    </div>
  );
};
