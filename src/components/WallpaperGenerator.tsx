import React, { useState, useEffect } from 'react';
import { CHAPTERS, MediaItem } from '../data/storyData';
import { Shuffle, Sparkles, Check, Smartphone, Monitor, Heart, Download, Loader2 } from 'lucide-react';

export type ShapeMode = 'number3' | 'heart' | 'polaroid' | 'grid';
export type DeviceFormat = 'mobile' | 'desktop';

export const WallpaperGenerator: React.FC = () => {
  const allImages = CHAPTERS.flatMap(chap => chap.items.filter(item => item.type === 'image'));

  const [shape, setShape] = useState<ShapeMode>('number3');
  const [deviceFormat, setDeviceFormat] = useState<DeviceFormat>('mobile');
  const [selectedPhotos, setSelectedPhotos] = useState<MediaItem[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const shufflePhotos = () => {
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setSelectedPhotos(shuffled.slice(0, 18));
  };

  useEffect(() => {
    shufflePhotos();
  }, []);

  // Grid coordinates defining a true Number "3" shape (4 columns x 6 rows)
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

  // HD PNG Export Generator
  const downloadHDPng = async () => {
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const isMobile = deviceFormat === 'mobile';

      // 1080x1920 Full HD Mobile format, or 1920x1080 Desktop
      canvas.width = isMobile ? 1080 : 1920;
      canvas.height = isMobile ? 1920 : 1080;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark background fill
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0c0a09');
      grad.addColorStop(0.5, '#1c1917');
      grad.addColorStop(1, '#0c0a09');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load all selected photo images into HTML Image elements
      const loadedImages = await Promise.all(
        selectedPhotos.map(
          (photo) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => resolve(img);
              img.onerror = () => resolve(img);
              img.src = photo.url;
            })
        )
      );

      // Draw grid shapes onto HD Canvas
      const cols = shape === 'heart' ? 5 : 4;
      const rows = 6;
      const marginX = isMobile ? 120 : (canvas.width - 700) / 2;
      const startY = isMobile ? 320 : 120;
      const cellWidth = (canvas.width - marginX * 2) / cols;
      const cellSize = cellWidth - 16;

      const gridMatrix = shape === 'heart' ? heartGrid : number3Grid;

      gridMatrix.forEach((cell, idx) => {
        const img = loadedImages[idx % loadedImages.length];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const x = marginX + cell.c * cellWidth + 8;
        const y = startY + cell.r * cellWidth + 8;

        ctx.save();
        // Draw rounded rectangle clip
        ctx.beginPath();
        const r = 24;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + cellSize, y, x + cellSize, y + cellSize, r);
        ctx.arcTo(x + cellSize, y + cellSize, x, y + cellSize, r);
        ctx.arcTo(x, y + cellSize, x, y, r);
        ctx.arcTo(x, y, x + cellSize, y, r);
        ctx.closePath();
        ctx.clip();

        // Object cover image fit
        const scale = Math.max(cellSize / img.naturalWidth, cellSize / img.naturalHeight);
        const nw = img.naturalWidth * scale;
        const nh = img.naturalHeight * scale;
        const nx = x + (cellSize - nw) / 2;
        const ny = y + (cellSize - nh) / 2;

        ctx.drawImage(img, nx, ny, nw, nh);
        ctx.restore();

        // Subtle white border around each photo card
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 4;
        ctx.stroke();
      });

      // Draw Pure Floating Typography Overlay at bottom
      const textY = isMobile ? canvas.height - 220 : canvas.height - 100;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.font = 'bold 54px Georgia, serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fillText('Feliz Aniversario N°3', canvas.width / 2, textY);

      ctx.font = '28px monospace';
      ctx.fillStyle = '#d6d3d1';
      ctx.shadowBlur = 8;
      ctx.fillText('21 de Julio de 2023 — 2026', canvas.width / 2, textY + 60);

      // Export to high-res PNG download
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Aniversario-N3-Fondo-${deviceFormat}.png`;
      link.href = dataUrl;
      link.click();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.log('Error exporting PNG:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ink-900/10 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-1 text-xs font-mono uppercase tracking-widest text-ink-500">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Fondo de Pantalla de Aniversario</span>
        </div>

        <p className="text-xs text-ink-500 font-light mb-6">
          Collage en forma del número 3 o corazón. Puedes descargarlo en formato PNG HD para tu celular o pantalla.
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

          {/* PURE FLOATING TYPOGRAPHY */}
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

        {/* HD PNG Download Button */}
        <button
          onClick={downloadHDPng}
          disabled={downloading}
          className="px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generando PNG en HD...</span>
            </>
          ) : downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Fondo Descargado en Máxima Calidad!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Descargar Fondo PNG en HD</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
