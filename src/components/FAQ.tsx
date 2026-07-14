import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Clear Answers</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-neutral-400">
            Have queries regarding timing, policies, or gear? Here are rapid answers to our prospective Jairaj Fitness Gym members.
          </p>
        </div>

        {/* Accordion Panels */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                id={`faq-panel-${idx}`}
                key={faq.id}
                className="glass-card rounded-2xl border border-neutral-800 overflow-hidden transition-colors hover:border-neutral-700/80"
              >
                {/* Header Button */}
                <button
                  id={`btn-faq-trigger-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <HelpCircle className="text-electric-orange shrink-0" size={18} />
                    <span className="font-display font-bold text-xs md:text-sm text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`text-neutral-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-electric-orange' : ''}`} 
                    size={16} 
                  />
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-container-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 md:p-6 pt-0 border-t border-neutral-900/60 text-xs text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
