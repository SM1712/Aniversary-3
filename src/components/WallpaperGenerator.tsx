import React, { useState, useEffect } from 'react';
import { CHAPTERS, MediaItem } from '../data/storyData';
import { Shuffle, Sparkles, Check, Smartphone, Monitor, Heart } from 'lucide-react';

export type ShapeMode = 'number3' | 'heart' | 'polaroid' | 'grid';
export type DeviceFormat = 'mobile' | 'desktop';

export const WallpaperGenerator: React.FC = () => {
  const allImages = CHAPTERS.flatMap(chap => chap.items.filter(item => item.type === 'image'));

  const [shape, setShape] = useState<ShapeMode>('number3');
  const [deviceFormat, setDeviceFormat] = useState<DeviceFormat>('mobile');
  const [selectedPhotos, setSelectedPhotos] = useState<MediaItem[]>([]);
  const [applied, setApplied] = useState(false);

  const shufflePhotos = () => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setSelectedPhotos(shuffled.slice(0, 18));
  };

  useEffect(() => {
    shufflePhotos();
  }, []);

  const handleApplyToPage = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  // Grid coordinates defining a true Number "3" shape
  const number3Grid = [
    { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 },
    { r: 1, c: 3 },
    { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
    { r: 3, c: 3 },
    { r: 4, c: 3 },
    { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 },
  ];

  // Grid coordinates defining a Heart shape
  const heartGrid = [
    { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 3 }, { r: 0, c: 4 },
    { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 },
    { r: 4, c: 2 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-1 text-xs font-mono uppercase tracking-widest text-ink-500">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Fondo de Pantalla de Aniversario</span>
        </div>

        <p className="text-xs text-ink-500 font-light mb-6">
          Collage en forma del número 3 o corazón, optimizado para teléfono móvil (9:16) y pantalla.
        </p>

        {/* Device Format Switcher */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <button
            onClick={() => setDeviceFormat('mobile')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all border ${
              deviceFormat === 'mobile'
                ? 'bg-ink-900 text-white border-ink-900 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Formato Celular (9:16)</span>
          </button>

          <button
            onClick={() => setDeviceFormat('desktop')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all border ${
              deviceFormat === 'desktop'
                ? 'bg-ink-900 text-white border-ink-900 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Formato Escritorio</span>
          </button>
        </div>

        {/* Live Wallpaper Frame Container */}
        <div
          className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl mb-6 border border-ink-900/20 bg-stone-950 flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 ${
            deviceFormat === 'mobile'
              ? 'w-[300px] sm:w-[340px] aspect-[9/16]'
              : 'w-full aspect-[16/9]'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 opacity-95" />

          {/* REAL NUMBER 3 SHAPE MATRIX */}
          {shape === 'number3' && (
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
              <div className="grid grid-cols-4 gap-1.5 w-full max-w-[260px] sm:max-w-[300px] mx-auto py-2">
                {Array.from({ length: 24 }).map((_, slotIndex) => {
                  const r = Math.floor(slotIndex / 4);
                  const c = slotIndex % 4;
                  const isPart = number3Grid.some(cell => cell.r === r && cell.c === c);
                  const photoIndex = number3Grid.findIndex(cell => cell.r === r && cell.c === c);

                  if (!isPart) {
                    return <div key={slotIndex} className="w-full aspect-square opacity-0 pointer-events-none" />;
                  }

                  const photo = selectedPhotos[photoIndex % selectedPhotos.length];

                  return (
                    <div
                      key={slotIndex}
                      className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/20 hover:scale-105 transition-transform"
                    >
                      {photo && (
                        <img
                          src={photo.url}
                          alt="3 shape"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REAL HEART SHAPE MATRIX */}
          {shape === 'heart' && (
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
              <div className="grid grid-cols-5 gap-1.5 w-full max-w-[260px] sm:max-w-[300px] mx-auto py-2">
                {Array.from({ length: 25 }).map((_, slotIndex) => {
                  const r = Math.floor(slotIndex / 5);
                  const c = slotIndex % 5;
                  const isPart = heartGrid.some(cell => cell.r === r && cell.c === c);
                  const photoIndex = heartGrid.findIndex(cell => cell.r === r && cell.c === c);

                  if (!isPart) {
                    return <div key={slotIndex} className="w-full aspect-square opacity-0 pointer-events-none" />;
                  }

                  const photo = selectedPhotos[photoIndex % selectedPhotos.length];

                  return (
                    <div
                      key={slotIndex}
                      className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/20 hover:scale-105 transition-transform"
                    >
                      {photo && (
                        <img
                          src={photo.url}
                          alt="heart shape"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* POLAROID LIBRES */}
          {shape === 'polaroid' && (
            <div className="relative z-10 w-full h-full p-2 grid grid-cols-3 gap-2 items-center justify-center overflow-hidden">
              {selectedPhotos.slice(0, 9).map((photo, index) => {
                const rotation = (index % 3 === 0 ? -4 : index % 2 === 0 ? 3 : -2);
                return (
                  <div
                    key={photo.id + index}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="bg-white p-1 pb-3 rounded-lg shadow-xl"
                  >
                    <img src={photo.url} alt="polaroid" className="w-full aspect-square object-cover rounded" />
                  </div>
                );
              })}
            </div>
          )}

          {/* MOSAICO GRID */}
          {shape === 'grid' && (
            <div className="relative z-10 w-full h-full p-1.5 grid grid-cols-3 gap-1.5 opacity-90">
              {selectedPhotos.slice(0, 9).map((photo, index) => (
                <div key={photo.id + index} className="w-full h-full rounded-xl overflow-hidden border border-white/20">
                  <img src={photo.url} alt="grid" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* PURE FLOATING TYPOGRAPHY (No box, no capsule, no borders) */}
          <div className="relative z-20 text-center pt-2 pointer-events-none drop-shadow-lg">
            <h3 className="font-serif font-semibold text-sm sm:text-base text-white tracking-wide block">
              Feliz Aniversario N°3
            </h3>
            <p className="text-[10px] text-stone-300 font-mono block mt-0.5">
              21 de Julio de 2023 — 2026
            </p>
          </div>
        </div>

        {/* Shape Selection Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setShape('number3')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              shape === 'number3'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            Forma N°3 Real
          </button>

          <button
            onClick={() => setShape('heart')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1 border ${
              shape === 'heart'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Forma Corazón</span>
          </button>

          <button
            onClick={() => setShape('polaroid')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              shape === 'polaroid'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            Polaroids Libres
          </button>

          <button
            onClick={() => setShape('grid')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              shape === 'grid'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            Mosaico 3x3
          </button>

          {/* Shuffle Button */}
          <button
            onClick={shufflePhotos}
            className="px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-900 font-medium text-xs border border-ink-900/10 flex items-center gap-1.5 transition-colors cursor-pointer"
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
              <span>¡Fondo Guardado!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Guardar Fondo de Pantalla</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
