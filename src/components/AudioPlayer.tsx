import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { SONGS, SongTrack } from '../data/storyData';
import { Play, Pause, Volume2, VolumeX, Music, Disc, ChevronUp, Sparkles } from 'lucide-react';
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
    setVolume,
    playSong,
    seekTo
  } = useAudio();

  const [showSelector, setShowSelector] = useState(false);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md">
      {/* Song selector dropdown */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 glass-panel rounded-2xl p-3 shadow-2xl border border-gold-300/30 overflow-hidden"
          >
            <div className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Canciones del Recorrido
              </span>
              <button
                onClick={() => setShowSelector(false)}
                className="text-rose-300 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
              {Object.values(SONGS).map((song: SongTrack) => (
                <button
                  key={song.id}
                  onClick={() => {
                    playSong(song);
                    setShowSelector(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                    currentSong?.id === song.id
                      ? 'bg-rose-600/40 text-amber-200 font-medium border border-rose-500/50'
                      : 'hover:bg-rose-950/60 text-rose-100/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <Disc className={`w-4 h-4 text-amber-300 shrink-0 ${currentSong?.id === song.id && isPlaying ? 'animate-spin-slow' : ''}`} />
                    <div className="truncate">
                      <p className="truncate font-serif text-sm">{song.title}</p>
                      <p className="text-[10px] text-rose-300/70">{song.artist}</p>
                    </div>
                  </div>
                  {currentSong?.id === song.id && isPlaying && (
                    <div className="flex items-end gap-0.5 h-3 shrink-0">
                      <span className="w-0.5 h-3 bg-amber-400 animate-pulse"></span>
                      <span className="w-0.5 h-2 bg-amber-300 animate-pulse delay-75"></span>
                      <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse delay-150"></span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating player bar */}
      <div className="glass-panel rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2 border border-gold-300/30">
        {/* Vinyl Disc & Track Info */}
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="flex items-center gap-3 min-w-0 flex-1 text-left group"
        >
          <div className="relative shrink-0">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr from-rose-900 to-amber-700 flex items-center justify-center border border-amber-300/40 shadow-md ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <Disc className="w-5 h-5 text-amber-200" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-rose-950 flex items-center justify-center">
              <ChevronUp className={`w-2 h-2 text-rose-950 transition-transform ${showSelector ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-serif text-amber-100 truncate group-hover:text-amber-300 transition-colors">
              {currentSong?.title || 'Seleccionar Canción'}
            </p>
            <p className="text-[10px] text-rose-300/70 truncate">
              {currentSong?.artist}
            </p>
          </div>
        </button>

        {/* Progress Bar (Visible on mid+ or expandable) */}
        <div className="hidden sm:flex flex-col gap-1 w-24 shrink-0 px-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="w-full h-1 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[9px] text-rose-300/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause & Mute Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleMute}
            className="p-2 text-rose-200 hover:text-amber-300 transition-colors rounded-full hover:bg-rose-900/50"
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-rose-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border border-amber-300/50"
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-rose-950" />
            ) : (
              <Play className="w-4 h-4 fill-rose-950 translate-x-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
