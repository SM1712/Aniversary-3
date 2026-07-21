import React, { useState, useEffect } from 'react';
import { CHAPTERS, MediaItem } from '../data/storyData';
import { Shuffle, Sparkles, Check, Grid, Film, Layers, LayoutGrid } from 'lucide-react';

export type CollageLayout = 'polaroid' | 'grid' | 'filmstrip' | 'scattered' | 'tint';

interface CollageOption {
  id: CollageLayout;
  name: string;
  icon: React.ElementType;
}

const COLLAGE_OPTIONS: CollageOption[] = [
  { id: 'polaroid', name: 'Polaroid Mosaico', icon: Layers },
  { id: 'grid', name: 'Grilla Editorial', icon: LayoutGrid },
  { id: 'filmstrip', name: 'Tira de Película', icon: Film },
  { id: 'scattered', name: 'Disperso Cómplice', icon: Grid },
];

export const WallpaperGenerator: React.FC = () => {
  const allImages = CHAPTERS.flatMap(chap => chap.items.filter(item => item.type === 'image'));

  const [layout, setLayout] = useState<CollageLayout>('polaroid');
  const [selectedPhotos, setSelectedPhotos] = useState<MediaItem[]>([]);
  const [applied, setApplied] = useState(false);

  // Shuffle photos helper
  const shufflePhotos = () => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setSelectedPhotos(shuffled.slice(0, 10));
  };

  useEffect(() => {
    shufflePhotos();
  }, []);

  const handleApplyToPage = () => {
    // Modify body background or set css custom variable
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-1 text-xs font-mono uppercase tracking-widest text-ink-500">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Crea tu propio Fondo Collage de Fotos</span>
        </div>

        <p className="text-xs text-ink-500 font-light mb-6">
          Un collage vivo con tus recuerdos reales rodeando el mensaje de aniversario.
        </p>

        {/* Live Collage Preview Canvas */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-6 border border-ink-900/10 bg-stone-900 flex items-center justify-center">

          {/* LAYOUT 1: POLAROID MOSAIC */}
          {layout === 'polaroid' && (
            <div className="absolute inset-0 bg-stone-950 p-4 grid grid-cols-4 sm:grid-cols-5 gap-3 opacity-90 overflow-hidden items-center justify-center">
              {selectedPhotos.slice(0, 10).map((photo, index) => {
                const rotation = (index % 3 === 0 ? -4 : index % 2 === 0 ? 5 : -2);
                return (
                  <div
                    key={photo.id + index}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="bg-white p-1.5 pb-5 rounded shadow-lg transition-transform hover:scale-105"
                  >
                    <img
                      src={photo.url}
                      alt="recuerdo"
                      className="w-full aspect-square object-cover rounded-sm"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* LAYOUT 2: GRID EDITORIAL */}
          {layout === 'grid' && (
            <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-5 gap-1 bg-stone-900 opacity-75">
              {selectedPhotos.slice(0, 10).map((photo, index) => (
                <div key={photo.id + index} className="w-full h-full overflow-hidden">
                  <img
                    src={photo.url}
                    alt="recuerdo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* LAYOUT 3: FILMSTRIP */}
          {layout === 'filmstrip' && (
            <div className="absolute inset-0 bg-stone-950 flex flex-col justify-between p-2">
              <div className="flex gap-2 overflow-hidden py-1 border-y border-stone-700 bg-stone-900/80">
                {selectedPhotos.slice(0, 5).map((photo, index) => (
                  <div key={photo.id + index} className="w-24 h-20 shrink-0 rounded overflow-hidden border border-white/20">
                    <img src={photo.url} alt="film" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 overflow-hidden py-1 border-y border-stone-700 bg-stone-900/80 justify-end">
                {selectedPhotos.slice(5, 10).map((photo, index) => (
                  <div key={photo.id + index} className="w-24 h-20 shrink-0 rounded overflow-hidden border border-white/20">
                    <img src={photo.url} alt="film" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LAYOUT 4: SCATTERED ORGÁNICO */}
          {layout === 'scattered' && (
            <div className="absolute inset-0 bg-stone-900 p-4 relative overflow-hidden">
              {selectedPhotos.slice(0, 8).map((photo, index) => {
                const positions = [
                  'top-2 left-2 w-28 sm:w-36',
                  'top-3 right-4 w-32 sm:w-40',
                  'bottom-2 left-4 w-30 sm:w-36',
                  'bottom-3 right-2 w-28 sm:w-36',
                  'top-1/2 left-1 -translate-y-1/2 w-24 sm:w-32',
                  'top-1/2 right-1 -translate-y-1/2 w-24 sm:w-32',
                ];
                const pos = positions[index % positions.length];
                return (
                  <div key={photo.id + index} className={`absolute ${pos} bg-white p-1 rounded-xl shadow-2xl border border-white/30`}>
                    <img src={photo.url} alt="recuerdo" className="w-full h-20 sm:h-24 object-cover rounded-lg" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Dark Contrast Vignette Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

          {/* FIXED CENTERED EMBLEM: "Feliz Aniversario N°3" */}
          <div className="relative z-20 p-6 sm:p-8 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-900/10 shadow-2xl text-center max-w-xs sm:max-w-sm mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-stone-900 text-white text-[10px] font-mono uppercase tracking-widest mb-2">
              21 de Julio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-1">
              Feliz Aniversario N°3
            </h2>
            <p className="text-xs text-stone-600 font-mono">
              21 de Julio de 2023 — 2026
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          {/* Layout Selectors */}
          {COLLAGE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => setLayout(opt.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  layout === opt.id
                    ? 'bg-ink-900 text-white border-ink-900 shadow-sm'
                    : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.name}</span>
              </button>
            );
          })}

          {/* Shuffle Photos Button */}
          <button
            onClick={shufflePhotos}
            className="px-4 py-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium text-xs border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Cambiar fotos aleatoriamente"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Mezclar Fotos</span>
          </button>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyToPage}
          className="px-6 py-2.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          {applied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Fondo de Collage Seleccionado!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Guardar Configuración de Fondo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
