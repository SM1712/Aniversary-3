import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { SONGS, SongTrack } from '../data/storyData';
import { Play, Pause, Volume2, VolumeX, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    playSong,
  } = useAudio();

  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
      {/* Song selector dropdown */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-2 bg-white rounded-2xl p-2.5 shadow-xl border border-ink-900/10 overflow-hidden"
          >
            <div className="text-[10px] uppercase font-mono tracking-widest text-ink-500 mb-1.5 px-2 flex justify-between items-center">
              <span>Banda Sonora</span>
              <button onClick={() => setShowSelector(false)} className="text-ink-400 hover:text-ink-900">✕</button>
            </div>
            <div className="space-y-1">
              {Object.values(SONGS).map((song: SongTrack) => (
                <button
                  key={song.id}
                  onClick={() => {
                    playSong(song);
                    setShowSelector(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    currentSong?.id === song.id
                      ? 'bg-cream-100 font-semibold text-ink-900'
                      : 'hover:bg-cream-50 text-ink-700'
                  }`}
                >
                  <span className="truncate">{song.title}</span>
                  <span className="text-[10px] text-ink-500 shrink-0 ml-2">{song.artist}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating player bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-ink-900/10 flex items-center justify-between gap-3">
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
        >
          <div className="w-7 h-7 rounded-full bg-cream-100 border border-ink-900/10 flex items-center justify-center shrink-0">
            <ChevronUp className={`w-3.5 h-3.5 text-ink-700 transition-transform ${showSelector ? 'rotate-180' : ''}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-serif font-medium text-ink-900 truncate">
              {currentSong?.title}
            </p>
            <p className="text-[10px] text-ink-500 truncate">
              {currentSong?.artist}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 text-ink-700 hover:text-ink-900 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-ink-900 text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
