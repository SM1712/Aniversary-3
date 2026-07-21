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
    setSelectedPhotos(shuffled.slice(0, 16));
  };

  useEffect(() => {
    shufflePhotos();
  }, []);

  const handleApplyToPage = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-1 text-xs font-mono uppercase tracking-widest text-ink-500">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Fondo de Pantalla de Aniversario</span>
        </div>

        <p className="text-xs text-ink-500 font-light mb-6">
          Collage en forma de 3, corazón o libre, optimizado para teléfono móvil y pantalla.
        </p>

        {/* Device Format Switcher (Celular 9:16 vs Desktop) */}
        <div className="flex items-center justify-center gap-2 mb-4">
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
          className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl mb-6 border border-ink-900/15 bg-stone-950 flex items-center justify-center transition-all duration-500 ${
            deviceFormat === 'mobile'
              ? 'w-[280px] sm:w-[320px] aspect-[9/16]'
              : 'w-full aspect-[16/9]'
          }`}
        >
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 opacity-95" />

          {/* MODE 1: FORMA N°3 (NUMBER 3 COLLAGE SHAPE) */}
          {shape === 'number3' && (
            <div className="relative inset-0 w-full h-full p-4 flex flex-col justify-between items-center z-10">
              {/* Top Arc of 3 */}
              <div className="flex justify-center gap-1.5 w-full">
                {selectedPhotos.slice(0, 3).map((photo, i) => (
                  <div key={photo.id + i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md border border-white/20 rotate-[-3deg]">
                    <img src={photo.url} alt="recuerdo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Middle Bar of 3 */}
              <div className="flex justify-end gap-1.5 w-3/4 self-end pr-4">
                {selectedPhotos.slice(3, 5).map((photo, i) => (
                  <div key={photo.id + i} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md border border-white/20 rotate-[4deg]">
                    <img src={photo.url} alt="recuerdo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Bottom Arc of 3 */}
              <div className="flex justify-center gap-1.5 w-full">
                {selectedPhotos.slice(5, 8).map((photo, i) => (
                  <div key={photo.id + i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md border border-white/20 rotate-[-2deg]">
                    <img src={photo.url} alt="recuerdo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 2: HEART SHAPE */}
          {shape === 'heart' && (
            <div className="relative inset-0 w-full h-full p-4 flex flex-col items-center justify-center z-10">
              {/* Top row of heart (2 lobes) */}
              <div className="flex justify-center gap-3 mb-2">
                <div className="flex gap-1">
                  {selectedPhotos.slice(0, 2).map((photo, i) => (
                    <div key={photo.id + i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-white/30">
                      <img src={photo.url} alt="heart" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  {selectedPhotos.slice(2, 4).map((photo, i) => (
                    <div key={photo.id + i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-white/30">
                      <img src={photo.url} alt="heart" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle row of heart */}
              <div className="flex justify-center gap-1 mb-2">
                {selectedPhotos.slice(4, 8).map((photo, i) => (
                  <div key={photo.id + i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-white/30">
                    <img src={photo.url} alt="heart" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Bottom tip of heart */}
              <div className="flex justify-center gap-1">
                {selectedPhotos.slice(8, 10).map((photo, i) => (
                  <div key={photo.id + i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-white/30">
                    <img src={photo.url} alt="heart" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 3: POLAROIDS LIBRES */}
          {shape === 'polaroid' && (
            <div className="relative inset-0 w-full h-full p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 items-center justify-center z-10 overflow-hidden">
              {selectedPhotos.slice(0, 6).map((photo, index) => {
                const rotation = (index % 2 === 0 ? -4 : 4);
                return (
                  <div
                    key={photo.id + index}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    className="bg-white p-1.5 pb-4 rounded-lg shadow-xl"
                  >
                    <img src={photo.url} alt="recuerdo" className="w-full aspect-square object-cover rounded" />
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 4: GRID LIMPIA */}
          {shape === 'grid' && (
            <div className="relative inset-0 w-full h-full p-2 grid grid-cols-3 gap-1.5 z-10 opacity-90">
              {selectedPhotos.slice(0, 9).map((photo, index) => (
                <div key={photo.id + index} className="w-full h-full rounded-lg overflow-hidden border border-white/20">
                  <img src={photo.url} alt="grid" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Minimalist Floating Overlay Typography (Non-blocking, elegant) */}
          <div className="absolute bottom-5 inset-x-4 z-20 text-center pointer-events-none">
            <div className="inline-block bg-black/65 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl">
              <span className="font-serif font-bold text-sm sm:text-base tracking-wide block">
                Feliz Aniversario N°3
              </span>
              <span className="text-[10px] text-stone-300 font-mono block">
                21 de Julio de 2023 — 2026
              </span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setShape('number3')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              shape === 'number3'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-cream-50 text-ink-700 hover:bg-cream-100 border-ink-900/10'
            }`}
          >
            Forma N°3
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
              <span>¡Configuración de Fondo Guardada!</span>
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
