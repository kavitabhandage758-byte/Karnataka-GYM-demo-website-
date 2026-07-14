import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, Flame, TrendingDown, Sparkles, Scale } from 'lucide-react';
import { transformationsData } from '../data';

export default function Transformations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100

  const activeStory = transformationsData[activeIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseFloat(e.target.value));
  };

  return (
    <section id="transformations" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Proven Real Results</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            TRANSFORMATION STORIES
          </h2>
          <p className="text-sm text-neutral-400">
            Slide and compare the visual shifts of our Belagavi members who trusted the Jairaj Fitness Gym training system.
          </p>
        </div>

        {/* Member Selector Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {transformationsData.map((t, idx) => (
            <button
              id={`btn-transformation-tab-${idx}`}
              key={t.id}
              onClick={() => {
                setActiveIndex(idx);
                setSliderPosition(50); // reset slider
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeIndex === idx 
                  ? 'bg-electric-orange border-electric-orange text-white shadow-md shadow-electric-orange/15' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {t.name} ({t.duration})
            </button>
          ))}
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: The Interactive Slider Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Slider Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 select-none shadow-2xl">
              
              {/* BEFORE IMAGE (Always visible underneath or clipped) */}
              <img 
                src={activeStory.beforeImg} 
                alt="Before" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-90"
              />
              <div className="absolute top-4 left-4 z-10 bg-black/75 px-3 py-1 rounded text-[10px] font-mono tracking-wider font-extrabold text-red-500 border border-red-500/10">
                BEFORE
              </div>

              {/* AFTER IMAGE (Clipped overlay) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src={activeStory.afterImg} 
                  alt="After" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-105"
                  style={{ width: '100%', height: '100%' }} // ensure correct scaling
                />
                <div className="absolute top-4 left-4 z-10 bg-black/75 px-3 py-1 rounded text-[10px] font-mono tracking-wider font-extrabold text-green-400 border border-green-500/10">
                  AFTER
                </div>
              </div>

              {/* SLIDER LINE & HANDLE */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-electric-orange z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-electric-orange text-white border border-white/20 rounded-full flex items-center justify-center shadow-lg pointer-events-auto">
                  <ArrowLeftRight size={14} />
                </div>
              </div>

              {/* INVISIBLE RANGE INPUT OVERLAY */}
              <input 
                id="input-transformation-slider"
                type="range" 
                min="0" 
                max="100" 
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Before after comparison slider"
              />

            </div>

            <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-4 flex items-center gap-1.5 leading-none">
              <ArrowLeftRight size={12} className="text-electric-orange" /> Drag or swipe handle left/right to compare
            </p>

          </div>

          {/* Right: Metrics Counters & Details */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">{activeStory.duration} Case Study</span>
              <h3 className="font-display font-black text-3xl text-white tracking-tight">{activeStory.name}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                By following a macro-calculated nutritional diet plan engineered by Coach Anjali and participating in 4 compound strength training sets per week, this member achieved visual symmetry and rapid fat deduction metrics safely.
              </p>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              {/* Weight Change */}
              <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex items-center gap-3.5">
                <div className="w-10 h-10 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-red-500">
                  <Scale size={18} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider font-extrabold text-neutral-500">WEIGHT PATH</span>
                  <span className="block font-mono font-extrabold text-white text-sm md:text-base mt-0.5">
                    {activeStory.beforeWeight} → {activeStory.afterWeight}
                  </span>
                </div>
              </div>

              {/* Muscle Gained */}
              <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex items-center gap-3.5">
                <div className="w-10 h-10 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-green-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider font-extrabold text-neutral-500">MUSCLE GAIN</span>
                  <span className="block font-mono font-extrabold text-green-400 text-sm md:text-base mt-0.5">
                    {activeStory.muscleGained}
                  </span>
                </div>
              </div>

              {/* Fat Reduced */}
              <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex items-center gap-3.5 col-span-2">
                <div className="w-10 h-10 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-electric-orange">
                  <TrendingDown size={18} />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider font-extrabold text-neutral-500">FAT METRICS</span>
                  <span className="block font-mono font-extrabold text-electric-orange text-sm md:text-base mt-0.5">
                    Reduced Body Fat ratio by {activeStory.fatReduced}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
