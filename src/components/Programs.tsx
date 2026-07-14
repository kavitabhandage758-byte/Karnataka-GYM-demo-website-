import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, Flame, HeartPulse, Zap, TrendingDown, Sparkles, 
  Leaf, Activity, Bike, ShieldAlert, UserRound, Heart, Swords, 
  Trophy, Search, Filter, X, ArrowUpRight, MessageCircle, Music, Apple
} from 'lucide-react';
import { programsData } from '../data';
import { Program } from '../types';

// Dynamic icon mapper to keep bundle clean and safe
const getProgramIcon = (iconName: string) => {
  const props = { className: "text-electric-orange", size: 24 };
  switch (iconName) {
    case 'Dumbbell': return <Dumbbell {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'HeartPulse': return <HeartPulse {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'TrendingDown': return <TrendingDown {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'Leaf': return <Leaf {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Bike': return <Bike {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'UserRound': return <UserRound {...props} />;
    case 'Heart': return <Heart {...props} />;
    case 'Swords': return <Swords {...props} />;
    case 'Trophy': return <Trophy {...props} />;
    case 'Music': return <Music {...props} />;
    case 'Apple': return <Apple {...props} />;
    default: return <Dumbbell {...props} />;
  }
};

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIntensity, setActiveIntensity] = useState<string>('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const intensities = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filteredPrograms = programsData.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntensity = activeIntensity === 'All' || p.intensity === activeIntensity;
    return matchesSearch && matchesIntensity;
  });

  const handleBookProgramWhatsApp = (programTitle: string) => {
    const msg = `Hello Jairaj Fitness Gym, I would like to book a slot for the program: "${programTitle}". Please share slot timings.`;
    window.open(`https://wa.me/917795559029?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="programs" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Core Classes & Trainings</span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
              OUR PROGRAMS
            </h2>
            <p className="text-sm text-neutral-400">
              Select from our 14 professionally curated training pathways. Each program is engineered for safe movement progression and optimal calorie burn rates.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              id="input-program-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs..."
              className="w-full bg-neutral-900/80 border border-neutral-800 text-xs px-10 py-3 rounded-lg text-white outline-none focus:border-electric-orange placeholder-neutral-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Intensity Level Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-neutral-900 pb-5">
          <span className="text-xs font-bold text-neutral-500 flex items-center gap-1 uppercase mr-2">
            <Filter size={12} /> Filter Level:
          </span>
          {intensities.map((level) => (
            <button
              id={`btn-program-filter-${level.toLowerCase()}`}
              key={level}
              onClick={() => setActiveIntensity(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeIntensity === level ? 'bg-electric-orange text-white shadow-md shadow-electric-orange/15' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                id={`program-card-${program.id}`}
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-2xl border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between glass-card-hover group"
              >
                <div>
                  {/* Icon and tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-800/60 rounded-xl flex items-center justify-center group-hover:border-electric-orange/30 group-hover:bg-electric-orange/5 transition-colors">
                      {getProgramIcon(program.iconName)}
                    </div>
                    <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800">
                      {program.intensity}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 tracking-tight group-hover:text-electric-orange transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-3 mb-4 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* duration stat */}
                  <div className="text-[11px] text-neutral-500 font-mono flex items-center justify-between py-1 border-y border-neutral-900/60">
                    <span>DURATION:</span>
                    <span className="text-white font-bold">{program.duration}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      id={`btn-program-learn-${program.id}`}
                      onClick={() => setSelectedProgram(program)}
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 py-2.5 px-3 rounded-lg text-xs font-bold transition-all hover:text-white cursor-pointer"
                    >
                      Learn More
                    </button>
                    <button
                      id={`btn-program-book-${program.id}`}
                      onClick={() => handleBookProgramWhatsApp(program.title)}
                      className="bg-electric-orange/10 border border-electric-orange/20 hover:bg-electric-orange text-electric-orange hover:text-white p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer"
                      title="Book via WhatsApp"
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <div className="text-center p-12 bg-neutral-900/30 border border-neutral-900 rounded-2xl max-w-md mx-auto">
            <Search className="mx-auto text-neutral-600 mb-3 animate-pulse" size={32} />
            <h4 className="font-display text-white font-semibold text-sm">No matching programs found</h4>
            <p className="text-xs text-neutral-500 mt-1">Try relaxing your search terms or selecting 'All' in the level filter menu.</p>
          </div>
        )}

      </div>

      {/* DETAILED MODAL POPUP */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="program-details-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="program-details-body"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg glass-card border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                id="btn-close-program-modal"
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-full"
              >
                <X size={18} />
              </button>

              {/* Icon / Tag */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 bg-electric-orange/15 rounded-xl flex items-center justify-center text-electric-orange shrink-0 border border-electric-orange/20">
                  {getProgramIcon(selectedProgram.iconName)}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl md:text-2xl text-white leading-none">{selectedProgram.title}</h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1 block">Level: {selectedProgram.intensity}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedProgram.description}
                </p>

                {/* Benefits checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-electric-orange uppercase tracking-wider">Primary Physical Benefits</h4>
                  <div className="grid grid-cols-1 gap-2 bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-900">
                    {selectedProgram.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-orange shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Class parameters */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-950 p-3.5 rounded-xl border border-neutral-900 font-mono">
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase">Class Length</span>
                    <span className="text-white font-bold block mt-0.5">{selectedProgram.duration}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase">Safety Equipment</span>
                    <span className="text-white font-bold block mt-0.5">Fully Included</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex gap-3 pt-2">
                  <button
                    id="btn-modal-program-close"
                    onClick={() => setSelectedProgram(null)}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close Parameters
                  </button>
                  <button
                    id="btn-modal-program-book"
                    onClick={() => {
                      handleBookProgramWhatsApp(selectedProgram.title);
                      setSelectedProgram(null);
                    }}
                    className="flex-1 bg-electric-orange hover:bg-electric-orange-hover text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-electric-orange/15"
                  >
                    Book Class <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
