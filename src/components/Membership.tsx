import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Flame, Zap, Award } from 'lucide-react';
import { membershipData } from '../data';

interface MembershipProps {
  onOpenBookingModal: (program?: string, plan?: string) => void;
}

export default function Membership({ onOpenBookingModal }: MembershipProps) {
  
  // Custom comparison details
  const comparisonRows = [
    { name: 'Gym Floor & Weight Access', starter: 'Full', premium: 'Full', elite: 'Full' },
    { name: 'Locker & Shower Facility', starter: 'Standard', premium: 'Premium', elite: 'Luxury Private' },
    { name: 'Cardio Zones & Equipment', starter: 'Yes', premium: 'Yes', elite: 'Unlimited Priority' },
    { name: 'Fitness assessment', starter: 'Initial Only', premium: 'Monthly', elite: 'Weekly Body Composition' },
    { name: 'HIIT & Group Classes', starter: 'No', premium: 'Yes (Unlimited)', elite: 'Yes (Unlimited)' },
    { name: 'Steam Bath & Sauna Access', starter: 'Add-on (₹200)', premium: 'Yes', elite: 'Yes (VIP Lounge)' },
    { name: 'Custom Diet Advising', starter: 'No', premium: 'Starter Guide', elite: '1-on-1 Macro Consultation' },
    { name: 'Dedicated Personal Trainer', starter: 'No', premium: 'No', elite: '2 Sessions / Week Included' },
    { name: 'Priority Machine Booking', starter: 'No', premium: 'No', elite: 'Yes' },
    { name: 'Complimentary Brand Merch', starter: 'No', premium: 'No', elite: 'Custom Bottle & Tee' },
  ];

  return (
    <section id="membership" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background accents */}
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Choose Your Level</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            MEMBERSHIP TIERS
          </h2>
          <p className="text-sm text-neutral-400">
            Choose a plan that aligns with your timeline and commitment. No hidden activation charges or sign-up fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {membershipData.map((tier) => (
            <motion.div
              id={`membership-card-${tier.id}`}
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`glass-card p-8 rounded-2xl border flex flex-col justify-between relative transition-all ${
                tier.isPopular 
                  ? 'border-electric-orange/40 shadow-xl shadow-electric-orange/5 bg-neutral-900/60' 
                  : 'border-neutral-800 bg-neutral-900/30'
              } glass-card-hover group`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-electric-orange text-white text-[9px] uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded-full shadow-md shadow-electric-orange/20 flex items-center gap-1">
                  <Flame size={11} fill="currentColor" /> MOST POPULAR
                </div>
              )}

              <div>
                {/* Tier Name */}
                <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest block mb-1">
                  {tier.name} tier
                </span>
                
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-display font-black text-white">₹{tier.price}</span>
                  <span className="text-neutral-500 font-mono text-xs uppercase font-semibold">/ {tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 border-b border-neutral-900 pb-5">
                  {tier.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <div className="w-5 h-5 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-electric-orange">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <button
                id={`btn-membership-join-${tier.id}`}
                onClick={() => onOpenBookingModal('', tier.isPopular ? 'Premium (₹1999/month)' : tier.id === 'elite' ? 'Elite (₹3499/month)' : 'Starter (₹999/month)')}
                className={`w-full py-3 px-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all cursor-pointer ${
                  tier.isPopular
                    ? 'bg-electric-orange hover:bg-electric-orange-hover text-white shadow-md shadow-electric-orange/15'
                    : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white border border-neutral-700'
                }`}
              >
                {tier.id === 'elite' ? 'Become Elite' : 'Join Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="border border-neutral-900 rounded-2xl overflow-hidden bg-neutral-950/45">
          <div className="p-6 md:p-8 bg-neutral-900/40 border-b border-neutral-900">
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-wide uppercase flex items-center gap-2">
              <ShieldCheck className="text-electric-orange" size={20} /> Deep Tier Comparison Table
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Explore exactly what you unlock with each membership tier</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-950 border-b border-neutral-900 font-display text-[10px] text-neutral-500 uppercase font-black tracking-widest">
                  <th className="p-4 md:p-5">FEATURES & BENCHMARKS</th>
                  <th className="p-4 md:p-5 text-center">STARTER (₹999)</th>
                  <th className="p-4 md:p-5 text-center text-electric-orange">PREMIUM (₹1999)</th>
                  <th className="p-4 md:p-5 text-center">ELITE (₹3499)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-xs">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-neutral-300">{row.name}</td>
                    <td className="p-4 md:p-5 text-center text-neutral-400 font-mono font-medium">{row.starter}</td>
                    <td className="p-4 md:p-5 text-center text-white font-mono font-bold">{row.premium}</td>
                    <td className="p-4 md:p-5 text-center text-electric-orange font-mono font-bold">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
