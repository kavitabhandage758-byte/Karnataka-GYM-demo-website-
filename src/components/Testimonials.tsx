import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoSlide = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearAutoSlide();
  }, [isPlaying]);

  const handlePrev = () => {
    clearAutoSlide();
    setCurrentIndex(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    clearAutoSlide();
    setCurrentIndex(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeReview = testimonialsData[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 relative overflow-hidden bg-neutral-950"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background aesthetics */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Title */}
        <div className="max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Client Feedback</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            TESTIMONIALS
          </h2>
          <p className="text-sm text-neutral-400">
            Hear directly from our active Bengaluru athletes and professionals who have unlocked sustainable, physical wellness.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative glass-card border border-neutral-800/80 p-6 md:p-12 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Large Quote decorative icon */}
          <div className="absolute top-6 left-6 text-neutral-800 pointer-events-none opacity-20">
            <Quote size={80} strokeWidth={1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              id={`testimonial-active-slide-${activeReview.id}`}
              key={currentIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 relative z-10"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    fill={i < Math.floor(activeReview.rating) ? "#ff5500" : "transparent"} 
                    className={i < Math.floor(activeReview.rating) ? "text-electric-orange" : "text-neutral-700"} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-neutral-200 leading-relaxed italic max-w-2xl mx-auto">
                "{activeReview.review}"
              </p>

              {/* Client Profile */}
              <div className="flex flex-col items-center space-y-2 pt-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-electric-orange/40 bg-neutral-900 shadow-md">
                  <img 
                    src={activeReview.image} 
                    alt={activeReview.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">{activeReview.name}</h4>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mt-0.5">{activeReview.role}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              id="btn-testimonials-prev"
              onClick={handlePrev}
              className="bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white p-2 rounded-full border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              id="btn-testimonials-next"
              onClick={handleNext}
              className="bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white p-2 rounded-full border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, idx) => (
            <button
              id={`btn-testimonials-indicator-${idx}`}
              key={idx}
              onClick={() => {
                clearAutoSlide();
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-electric-orange w-6' : 'bg-neutral-800 hover:bg-neutral-700'}`}
              aria-label={`Go to testimonial slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
