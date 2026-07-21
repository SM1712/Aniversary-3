import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, Chapter, MediaItem } from '../data/storyData';
import { Camera, Film, Heart, ZoomIn, X, Calendar, Sparkles } from 'lucide-react';

export const MemoryGallery: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(0); // 0 = All
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const allMediaItems = CHAPTERS.flatMap(chap => chap.items);

  const filteredItems = selectedChapterId === 0
    ? allMediaItems
    : CHAPTERS.find(c => c.id === selectedChapterId)?.items || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-900/50 border border-rose-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Camera className="w-3.5 h-3.5" />
          Álbum de Recuerdos
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          Nuestra Galería de <span className="gold-gradient-text">Momentos</span>
        </h2>
        <p className="text-sm text-rose-200/80 max-w-xl mx-auto font-light">
          Haz clic en cualquier imagen o video para revivir cada detalle de nuestra historia.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setSelectedChapterId(0)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedChapterId === 0
                ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-rose-950 font-bold shadow-md'
                : 'glass-card text-rose-200/80 hover:text-white hover:border-amber-300/40'
            }`}
          >
            Todos los Recuerdos ({allMediaItems.length})
          </button>
          {CHAPTERS.map(chap => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapterId(chap.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedChapterId === chap.id
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-rose-950 font-bold shadow-md'
                  : 'glass-card text-rose-200/80 hover:text-white hover:border-amber-300/40'
              }`}
            >
              Cap. {chap.id} ({chap.items.length})
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveMedia(item)}
              className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-rose-500/20 group cursor-pointer shadow-lg"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video src={item.url} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute w-12 h-12 rounded-full bg-rose-600/80 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Film className="w-6 h-6" />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-rose-900/80 text-amber-300">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-300 font-mono block">
                    {item.date}
                  </span>
                  <h4 className="text-xs font-serif font-bold text-white truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 z-50 bg-burgundy-950/95 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-panel rounded-3xl p-4 sm:p-6 border-amber-300/30 shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-rose-950/80 text-rose-200 hover:text-white border border-rose-500/40 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media viewer */}
              <div className="max-h-[60vh] sm:max-h-[70vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black mb-4">
                {activeMedia.type === 'image' ? (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={activeMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain"
                  />
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                    {activeMedia.title}
                  </h3>
                  <span className="text-xs text-rose-300 font-mono">
                    {activeMedia.date}
                  </span>
                </div>
                <p className="text-sm text-rose-100/90 leading-relaxed font-light">
                  {activeMedia.caption}
                </p>
                {activeMedia.quote && (
                  <div className="pt-2 border-t border-rose-500/20 italic text-amber-300 text-sm font-serif">
                    "{activeMedia.quote}"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
