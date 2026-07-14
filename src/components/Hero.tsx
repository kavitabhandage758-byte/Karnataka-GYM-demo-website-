import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, MessageSquare, Dumbbell, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onOpenBookingModal: (program?: string, plan?: string) => void;
}

export default function Hero({ onOpenBookingModal }: HeroProps) {
  const handleScrollToCalculators = () => {
    const element = document.getElementById('calculators');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Cinematic Image Slide/Zoom */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85" 
          alt="Jairaj Fitness Gym Training Floor" 
          className="w-full h-full object-cover object-center opacity-45"
        />
      </div>

      {/* Floating abstract orange orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-electric-orange/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 rounded-full bg-electric-orange/10 blur-3xl pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Animated Upper Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 border border-neutral-800 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric-orange animate-pulse" />
              BELAGAVI'S PREMIER FITNESS DESTINATION
            </motion.div>

            {/* Main Display Typography */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 20 }}
                className="font-display font-black text-4xl sm:text-6xl xl:text-7xl text-white tracking-tight leading-[1.05]"
              >
                BECOME <br className="hidden sm:inline" />
                <span className="text-gradient-orange">STRONGER</span> THAN <br className="sm:hidden" />
                YESTERDAY
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed"
              >
                Train with certified coaches, imported equipment, personalized fitness plans, nutrition guidance, and a motivating community. Elevate your performance today.
              </motion.p>
            </div>

            {/* CTA Interactive buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                id="btn-hero-join-now"
                onClick={() => onOpenBookingModal()}
                className="bg-electric-orange hover:bg-electric-orange-hover text-white text-xs font-black py-4 px-8 rounded-lg uppercase tracking-wider shadow-lg shadow-electric-orange/20 transition-all cursor-pointer flex items-center gap-2 group"
              >
                Join Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-free-trial"
                onClick={() => onOpenBookingModal('Functional Training', 'Free Session Trial')}
                className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-black py-4 px-6 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                Book Free Trial <Play size={14} fill="currentColor" />
              </button>

              <a
                id="btn-hero-whatsapp"
                href="https://wa.me/917795559029?text=Hello%20Jairaj%20Fitness%20Gym%2C%20I%20would%20like%20to%20know%20more%20about%20your%20membership%20plans."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-650 hover:bg-green-700 text-white text-xs font-bold py-4 px-6 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border border-green-500/20"
              >
                Contact on WhatsApp <MessageSquare size={14} fill="currentColor" />
              </a>
            </motion.div>

            {/* Quick Metrics ribbon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-900 max-w-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0">
                  <Dumbbell className="text-electric-orange" size={16} />
                </div>
                <div>
                  <span className="block font-display font-bold text-white text-sm">Panatta™</span>
                  <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Imported Gear</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-electric-orange" size={16} />
                </div>
                <div>
                  <span className="block font-display font-bold text-white text-sm">25+ Certified</span>
                  <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Master Coaches</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="text-electric-orange" size={16} />
                </div>
                <div>
                  <span className="block font-display font-bold text-white text-sm">Steam/Sauna</span>
                  <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Luxury Recovery</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Side visual Card/Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 25 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-neutral-800 bg-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" 
                alt="Trainer Coaching Athlete"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl border border-white/5 space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-electric-orange font-bold">Featured Program</span>
                <h4 className="font-display font-bold text-white text-sm">Athletic Power CrossFit</h4>
                <p className="text-[11px] text-neutral-400">High volume Olympic metrics to build real raw cardiovascular stamina.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
