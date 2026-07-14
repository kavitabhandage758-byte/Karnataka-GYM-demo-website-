import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, ShieldAlert, X } from 'lucide-react';

export default function Footer() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Check LocalStorage on mount for cookie consent
  useEffect(() => {
    const consent = localStorage.getItem('jairaj-gym-cookie-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('jairaj-gym-cookie-consent', 'accepted');
    setShowCookieBanner(false);
  };

  return (
    <>
      <footer id="footer" className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            {/* BRANDING */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-electric-orange rounded-lg flex items-center justify-center font-display font-black text-white text-sm transform -rotate-12">
                  J
                </div>
                <span className="font-display font-black text-lg tracking-tight text-white uppercase">
                  JAIRAJ<span className="text-electric-orange"> GYM</span>
                </span>
              </div>
              <p className="text-neutral-500 leading-relaxed max-w-sm">
                Belagavi's premier fitness destination designed to support ultimate physical transformation parameters through certified biomechanics and premium imported grade equipment.
              </p>
              
              {/* Social Channels */}
              <div className="flex gap-3 pt-2">
                <a 
                  id="link-footer-instagram"
                  href="https://instagram.com/jairajfitnessgym_nehrunagar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-electric-orange text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={14} />
                </a>
                <a 
                  id="link-footer-facebook"
                  href="https://facebook.com/100063805495002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-electric-orange text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Facebook Profile"
                >
                  <Facebook size={14} />
                </a>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-display font-bold text-white uppercase text-[10px] tracking-widest mb-4">Core Sections</h4>
                <ul className="space-y-2.5 text-neutral-500 font-medium">
                  <li><a href="#about" className="hover:text-white transition-colors">Why Gym?</a></li>
                  <li><a href="#programs" className="hover:text-white transition-colors">Our Programs</a></li>
                  <li><a href="#membership" className="hover:text-white transition-colors">Pricing Plans</a></li>
                  <li><a href="#trainers" className="hover:text-white transition-colors">Master Coaches</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display font-bold text-white uppercase text-[10px] tracking-widest mb-4">Legalities</h4>
                <ul className="space-y-2.5 text-neutral-500 font-medium">
                  <li><a href="#about" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#membership" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">Refund Policy</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ Support</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM COPYRIGHT */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 font-medium text-[10px] uppercase tracking-wider">
            <span>© 2026 Jairaj Fitness Gym. All Rights Reserved.</span>
            <span>Created for Elite Belagavi Athletics</span>
          </div>

        </div>
      </footer>

      {/* COMPLIANCE COOKIE CONSENT BANNER */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            id="cookie-consent-banner"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-45 bg-neutral-950 border border-neutral-800 p-4 md:p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-black text-electric-orange tracking-widest uppercase flex items-center gap-1">
                <ShieldAlert size={12} /> Privacy Parameters
              </span>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Jairaj Fitness Gym uses standard cookies to optimize your dynamic BMI calculation matrices and local habit checkoff schedules.
              </p>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0">
              <button
                id="btn-cookies-accept-all"
                onClick={handleAcceptCookies}
                className="bg-electric-orange hover:bg-electric-orange-hover text-white text-[10px] font-bold px-3 py-2 rounded-lg uppercase tracking-wider cursor-pointer transition-colors"
              >
                Accept All
              </button>
              <button
                id="btn-cookies-dismiss"
                onClick={() => setShowCookieBanner(false)}
                className="text-neutral-500 hover:text-white p-2"
                aria-label="Dismiss cookie notice"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
