import React from 'react';
import { Heart, Film, Camera, Mail, Calendar, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  activeTab: 'movie' | 'gallery' | 'letter';
  setActiveTab: (tab: 'movie' | 'gallery' | 'letter') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { currentSong, isPlaying } = useAudio();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-burgundy-950/80 border-b border-rose-500/20 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md border border-amber-300/40">
            <Heart className="w-5 h-5 text-rose-950 fill-rose-950" />
          </div>
          <div>
            <span className="font-serif font-bold text-sm sm:text-base gold-gradient-text block leading-none">
              Nuestros 3 Años
            </span>
            <span className="text-[10px] text-rose-300/70 font-cursive block">
              21 de Julio de 2023 - 2026
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-rose-950/80 p-1 rounded-full border border-rose-500/30">
          <button
            onClick={() => setActiveTab('movie')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'movie'
                ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-rose-950 shadow-md'
                : 'text-rose-200/80 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Película</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-rose-950 shadow-md'
                : 'text-rose-200/80 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Galería</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
