import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { galleryData } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { name: 'All Photos', key: 'all' },
    { name: 'Gym Interior', key: 'interior' },
    { name: 'Equipment', key: 'equipment' },
    { name: 'Workouts', key: 'workouts' },
    { name: 'Transformations', key: 'transformations' },
    { name: 'Events', key: 'events' },
  ];

  const filteredItems = galleryData.filter(item => {
    return activeFilter === 'all' || item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    // Find item index in the filtered list
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : (prev as number) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : (prev as number) + 1));
  };

  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Explore Our Facilities</span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
              GYM GALLERY
            </h2>
            <p className="text-sm text-neutral-400">
              Browse our luxury MG Road training floor, specialized Olympic power lifting grids, steam bath amenities, and dynamic group session turf tracks.
            </p>
          </div>
        </div>

        {/* Filter Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-neutral-900 pb-5">
          {filters.map((filter) => (
            <button
              id={`btn-gallery-filter-${filter.key}`}
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter.key 
                  ? 'bg-electric-orange text-white shadow-md shadow-electric-orange/15' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                id={`gallery-item-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(idx)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-800/80 bg-neutral-900 cursor-pointer gallery-zoom group"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <Maximize2 className="text-electric-orange absolute top-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300" size={18} />
                  <span className="text-[10px] uppercase font-bold text-electric-orange tracking-widest block mb-0.5">{item.category}</span>
                  <h4 className="font-display font-bold text-white text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-neutral-900/40 border border-neutral-900 rounded-2xl max-w-sm mx-auto mt-6">
            <ImageIcon className="mx-auto text-neutral-600 mb-2" size={24} />
            <p className="text-xs text-neutral-400 font-semibold">No media items in this filter</p>
          </div>
        )}

      </div>

      {/* DETAILED LIGHTBOX COMPONENT */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            
            {/* Backdrop Close Click */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Top Bar with Description and Close Button */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 p-2 md:p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
              <div className="text-left pr-4">
                <span className="text-[10px] uppercase font-bold text-electric-orange tracking-widest block leading-none mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="font-display text-white text-xs md:text-sm font-semibold truncate leading-none">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
              <button
                id="btn-close-lightbox"
                onClick={closeLightbox}
                className="text-neutral-400 hover:text-white p-1.5 hover:bg-neutral-900 rounded-full cursor-pointer transition-colors shrink-0"
                aria-label="Close image lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Previous Button */}
            <button
              id="btn-prev-lightbox"
              onClick={handlePrev}
              className="absolute left-4 z-10 bg-black/50 border border-white/5 hover:bg-neutral-900 text-white p-3 rounded-full cursor-pointer transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Active Image */}
            <motion.div
              id="lightbox-image-container"
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[75vh] md:max-h-[80vh] aspect-auto overflow-hidden rounded-xl border border-neutral-800"
            >
              <img 
                src={filteredItems[lightboxIndex].image} 
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-full object-contain mx-auto select-none"
              />
            </motion.div>

            {/* Next Button */}
            <button
              id="btn-next-lightbox"
              onClick={handleNext}
              className="absolute right-4 z-10 bg-black/50 border border-white/5 hover:bg-neutral-900 text-white p-3 rounded-full cursor-pointer transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom Counter Index */}
            <div className="absolute bottom-6 bg-neutral-900/85 px-4 py-1.5 rounded-full border border-neutral-800 text-neutral-400 text-[10px] font-mono tracking-wider">
              {lightboxIndex + 1} / {filteredItems.length} PHOTO
            </div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
