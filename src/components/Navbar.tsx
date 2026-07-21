import React from 'react';

interface NavbarProps {
  activeTab: 'movie' | 'gallery';
  setActiveTab: (tab: 'movie' | 'gallery') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-cream-50/80 border-b border-ink-900/10 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div>
          <span className="font-serif font-bold text-base text-ink-900 block leading-none">
            21.07.2023 — 2026
          </span>
          <span className="text-[10px] text-ink-500 font-mono block">
            3 Años Juntos
          </span>
        </div>

        <nav className="flex items-center gap-1 bg-white p-1 rounded-full border border-ink-900/10 shadow-sm">
          <button
            onClick={() => setActiveTab('movie')}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
              activeTab === 'movie'
                ? 'bg-ink-900 text-white font-semibold'
                : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            Película
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-ink-900 text-white font-semibold'
                : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            Galería
          </button>
        </nav>
      </div>
    </header>
  );
};
