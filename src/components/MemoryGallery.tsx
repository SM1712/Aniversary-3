import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, Chapter, MediaItem } from '../data/storyData';
import { Film, X } from 'lucide-react';

export const MemoryGallery: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(0);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const allMediaItems = CHAPTERS.flatMap(chap => chap.items);
  const filteredItems = selectedChapterId === 0
    ? allMediaItems
    : CHAPTERS.find(c => c.id === selectedChapterId)?.items || [];

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* Chapter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedChapterId(0)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedChapterId === 0
              ? 'bg-ink-900 text-white font-semibold shadow-sm'
              : 'bg-white text-ink-700 hover:bg-cream-100 border border-ink-900/10'
          }`}
        >
          Todas las fotos ({allMediaItems.length})
        </button>
        {CHAPTERS.map(chap => (
          <button
            key={chap.id}
            onClick={() => setSelectedChapterId(chap.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedChapterId === chap.id
                ? 'bg-ink-900 text-white font-semibold shadow-sm'
                : 'bg-white text-ink-700 hover:bg-cream-100 border border-ink-900/10'
            }`}
          >
            {chap.title} ({chap.items.length})
          </button>
        ))}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setActiveMedia(item)}
              className="relative aspect-square rounded-xl overflow-hidden bg-white border border-ink-900/10 group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.date}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="relative w-full h-full bg-stone-900 flex items-center justify-center">
                  <video src={item.url} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute w-10 h-10 rounded-full bg-white/90 text-ink-900 flex items-center justify-center shadow-md">
                    <Film className="w-5 h-5" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-ink-900/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono opacity-90 block">{item.date}</span>
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[65vh] w-full flex items-center justify-center bg-stone-950 rounded-xl overflow-hidden mb-3">
                {activeMedia.type === 'image' ? (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.date}
                    className="max-w-full max-h-[65vh] object-contain"
                  />
                ) : (
                  <video
                    src={activeMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[65vh] object-contain"
                  />
                )}
              </div>

              <div className="text-center">
                <span className="text-xs text-ink-600 font-mono">
                  {activeMedia.date}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
