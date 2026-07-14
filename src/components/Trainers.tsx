import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, MessageSquare, Award, Star } from 'lucide-react';
import { trainersData } from '../data';

export default function Trainers() {
  
  const handleBookTrainerWhatsApp = (trainerName: string) => {
    const msg = `Hello Jairaj Fitness Gym, I would like to book a personal training consultation with Coach ${trainerName}. Please share coach block timings.`;
    window.open(`https://wa.me/917795559029?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleMessageTrainerWhatsApp = (trainerName: string) => {
    const msg = `Hello, I would like to send a direct query to Coach ${trainerName} regarding fitness/nutrition parameters.`;
    window.open(`https://wa.me/917795559029?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="trainers" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Elite Coaching Staff</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            MEET OUR TRAINERS
          </h2>
          <p className="text-sm text-neutral-400">
            Learn from regional champions and certified physical scientists dedicated to biomechanical safety, nutrition precision, and high motivation.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersData.map((trainer) => (
            <motion.div
              id={`trainer-card-${trainer.id}`}
              key={trainer.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between glass-card-hover group"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-electric-orange/90 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                    {trainer.experience} XP
                  </div>

                  {/* Social media overlays */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-electric-orange uppercase tracking-wider font-extrabold block">
                        {trainer.role}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white leading-tight">
                        {trainer.name}
                      </h3>
                    </div>

                    {/* Socials Icons */}
                    <div className="flex gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-lg border border-white/5">
                      {trainer.socials.instagram && (
                        <a href={trainer.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white" aria-label="Instagram">
                          <Instagram size={14} />
                        </a>
                      )}
                      {trainer.socials.facebook && (
                        <a href={trainer.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white" aria-label="Facebook">
                          <Facebook size={14} />
                        </a>
                      )}
                      {trainer.socials.twitter && (
                        <a href={trainer.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white" aria-label="Twitter">
                          <Twitter size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Description Panel */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-neutral-400 leading-relaxed italic">
                    "{trainer.bio}"
                  </p>

                  {/* Specializations list */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-500 block">SPECIALIZATION</span>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialization.map((spec, i) => (
                        <span key={i} className="text-[9px] bg-neutral-900 border border-neutral-850 text-neutral-300 px-2 py-0.5 rounded-md font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking & Messaging Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-neutral-900/40 mt-auto">
                <button
                  id={`btn-trainer-book-${trainer.id}`}
                  onClick={() => handleBookTrainerWhatsApp(trainer.name)}
                  className="bg-electric-orange hover:bg-electric-orange-hover text-white py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-colors"
                >
                  Book PT
                </button>
                <button
                  id={`btn-trainer-msg-${trainer.id}`}
                  onClick={() => handleMessageTrainerWhatsApp(trainer.name)}
                  className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:text-white text-neutral-400 py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-colors flex items-center justify-center gap-1"
                >
                  <MessageSquare size={10} /> Message
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
