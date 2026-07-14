import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Dumbbell, Award, Flame, ShieldAlert, Users } from 'lucide-react';

function Counter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500; // ms
      // dynamic increment based on size
      const increment = Math.ceil(end / 50); 
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-5 bg-neutral-950/40 border border-neutral-900 rounded-2xl glass-card-hover">
      <span className="block text-3xl md:text-4xl font-display font-black text-white font-mono tracking-tight text-gradient-orange">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="block text-[10px] uppercase text-neutral-400 font-bold tracking-wider mt-1.5 leading-snug">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const whyFeatures = [
    'Certified Trainers',
    'Imported Equipment',
    'Nutrition Support',
    'Personal Training',
    'Group Sessions',
    'HIIT Workouts',
    'Functional Training',
    'Cardio Zone',
    'Weight Training',
    'Steam & Locker Facility'
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          
          {/* Left: Creative Graphic Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-800">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80" 
                alt="Why Jairaj Fitness Gym?" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Overlay quote card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 glass-card rounded-xl border border-white/5 space-y-2">
                <p className="text-xs text-neutral-300 italic">
                  "At Jairaj Fitness Gym, we believe fitness is more than lifting weights—it is building confidence, discipline, and a healthier lifestyle."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-electric-orange rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">Jairaj Gym Core Philosophy</span>
                </div>
              </div>
            </div>

            {/* Accent border floating behind */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-electric-orange rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-electric-orange rounded-br-xl pointer-events-none" />
          </div>

          {/* Right: Text and Feature Checklist */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">About Jairaj Fitness Gym</span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
                WHY JAIRAJ FITNESS GYM?
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                At Jairaj Fitness Gym, we believe fitness is more than lifting weights—it's building confidence, discipline, and a healthier lifestyle. Our expert trainers, modern facilities, and customized workout plans help every member achieve their goals safely and efficiently. Located in Belagavi, we provide an elite environment for true physical transformations, fully loaded with all the imported grade equipment.
              </p>
            </div>

            {/* Checklist of 10 Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {whyFeatures.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-neutral-900/40 p-3 rounded-xl border border-neutral-900 hover:border-neutral-800 transition-all group cursor-default"
                >
                  <div className="w-6 h-6 bg-electric-orange/15 rounded-full flex items-center justify-center text-electric-orange group-hover:bg-electric-orange group-hover:text-white transition-colors">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* LIVE STATISTICS SECTION (Counters) */}
        <div className="pt-20 border-t border-neutral-900 mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Real-Time Performance Metrics</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight mt-1">Our Journey in Numbers</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Counter value={5240} suffix="+" label="Active Gym Members" />
            <Counter value={15000} suffix="+" label="1-on-1 PT Sessions" />
            <Counter value={25} suffix="+" label="Certified Coaches" />
            <Counter value={2000} suffix="+" label="Transformation Stories" />
            <Counter value={20} suffix="+" label="Years of Experience" />
          </div>
        </div>

      </div>
    </section>
  );
}
