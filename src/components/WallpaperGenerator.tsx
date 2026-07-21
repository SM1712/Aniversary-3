import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, Check, Download, Image as ImageIcon } from 'lucide-react';

export interface WallpaperStyle {
  id: string;
  name: string;
  bgClass: string;
  textClass: string;
  subtextClass: string;
  borderClass: string;
  badgeClass: string;
  pageBgColor: string;
}

export const WALLPAPER_STYLES: WallpaperStyle[] = [
  {
    id: 'lino-cream',
    name: 'Lino Marfil',
    bgClass: 'bg-[#FAF8F5]',
    textClass: 'text-stone-900 font-serif',
    subtextClass: 'text-stone-500 font-mono',
    borderClass: 'border-stone-900/10',
    badgeClass: 'bg-stone-900 text-white',
    pageBgColor: '#FAF8F5',
  },
  {
    id: 'dark-velvet',
    name: 'Terciopelo Oscuro',
    bgClass: 'bg-gradient-to-b from-[#2B0712] to-[#180309]',
    textClass: 'text-amber-200 font-serif',
    subtextClass: 'text-rose-300/80 font-mono',
    borderClass: 'border-amber-300/30',
    badgeClass: 'bg-amber-400 text-stone-950 font-semibold',
    pageBgColor: '#180309',
  },
  {
    id: 'pastel-sunset',
    name: 'Atardecer Pastel',
    bgClass: 'bg-gradient-to-tr from-[#FDE68A] via-[#FCA5A5] to-[#F472B6]',
    textClass: 'text-stone-900 font-serif',
    subtextClass: 'text-stone-800/80 font-mono',
    borderClass: 'border-white/40',
    badgeClass: 'bg-white/80 text-stone-900 backdrop-blur-md',
    pageBgColor: '#FCA5A5',
  },
  {
    id: 'midnight-star',
    name: 'Noche Azul',
    bgClass: 'bg-gradient-to-b from-[#0F172A] to-[#020617]',
    textClass: 'text-sky-100 font-serif',
    subtextClass: 'text-sky-300/70 font-mono',
    borderClass: 'border-sky-400/20',
    badgeClass: 'bg-sky-500 text-white',
    pageBgColor: '#020617',
  },
  {
    id: 'gold-rose',
    name: 'Rosa & Oro',
    bgClass: 'bg-gradient-to-tr from-[#FFF1F2] via-[#FFE4E6] to-[#FEF3C7]',
    textClass: 'text-rose-950 font-serif',
    subtextClass: 'text-amber-700/80 font-mono',
    borderClass: 'border-rose-300/40',
    badgeClass: 'bg-rose-900 text-amber-100',
    pageBgColor: '#FFF1F2',
  },
];

interface WallpaperGeneratorProps {
  onApplyTheme?: (style: WallpaperStyle) => void;
}

export const WallpaperGenerator: React.FC<WallpaperGeneratorProps> = ({ onApplyTheme }) => {
  const [selectedStyle, setSelectedStyle] = useState<WallpaperStyle>(WALLPAPER_STYLES[0]);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (onApplyTheme) {
      onApplyTheme(selectedStyle);
    }
    document.body.style.backgroundColor = selectedStyle.pageBgColor;
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-ink-500">
          <Palette className="w-4 h-4 text-ink-700" />
          <span>Crea tu propio Fondo de Aniversario</span>
        </div>

        <p className="text-xs text-ink-500 font-light mb-6">
          Selecciona un estilo para personalizar el fondo de la página.
        </p>

        {/* Live Wallpaper Preview Frame */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-6 transition-all duration-500 border border-ink-900/10 flex items-center justify-center">
          <div className={`absolute inset-0 transition-all duration-500 ${selectedStyle.bgClass}`} />

          {/* Centered Emblem (Fixed "Feliz Aniversario N°3") */}
          <div className="relative z-10 p-6 text-center max-w-xs">
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest mb-3 ${selectedStyle.badgeClass}`}>
              21 de Julio
            </span>

            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${selectedStyle.textClass}`}>
              Feliz Aniversario N°3
            </h2>

            <p className={`text-xs ${selectedStyle.subtextClass}`}>
              21 de Julio de 2023 — 2026
            </p>
          </div>
        </div>

        {/* Style Selector Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          {WALLPAPER_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                selectedStyle.id === style.id
                  ? 'bg-ink-900 text-white border-ink-900 shadow-sm'
                  : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
              }`}
            >
              <span className={`w-3 h-3 rounded-full border border-black/10 ${style.bgClass}`} />
              <span>{style.name}</span>
            </button>
          ))}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="px-6 py-2.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          {applied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Fondo Aplicado a la Página!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Aplicar este Fondo a la Página</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
