import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Search, Dumbbell, ArrowRight, Phone } from 'lucide-react';
import { programsData, trainersData, articlesData } from '../data';

interface NavbarProps {
  onOpenBookingModal: (program?: string, plan?: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ onOpenBookingModal, isDarkMode, onToggleDarkMode }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: string; title: string; linkId: string }[]>([]);

  // Track scroll for sticky border and scroll-to-top presence
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Programs', id: 'programs' },
    { name: 'Membership', id: 'membership' },
    { name: 'Calculators', id: 'calculators' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
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

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results: { type: string; title: string; linkId: string }[] = [];

    // Search Programs
    programsData.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        results.push({ type: 'Program', title: p.title, linkId: 'programs' });
      }
    });

    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);

  const handleSearchResultClick = (linkId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setTimeout(() => {
      handleScrollTo(linkId);
    }, 100);
  };

  return (
    <>
      <nav
        id="main-sticky-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 shadow-lg border-b border-neutral-900/50 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div 
              id="navbar-logo"
              onClick={() => handleScrollTo('home')} 
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 bg-electric-orange rounded-xl flex items-center justify-center shadow-lg shadow-electric-orange/20 transition-transform group-hover:scale-105">
                <Dumbbell className="text-white transform -rotate-45" size={20} />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-white block leading-none">
                  JAIRAJ<span className="text-electric-orange"> FITNESS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500 block mt-0.5">
                  BELAGAVI EST. 2005
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-5">
              {navLinks.map((link) => (
                <button
                  id={`nav-link-desktop-${link.id}`}
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="text-neutral-400 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions Panel */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search button */}
              <button
                id="btn-nav-search"
                onClick={() => setIsSearchOpen(true)}
                className="text-neutral-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                aria-label="Search website"
              >
                <Search size={16} />
              </button>

              {/* Theme Toggle */}
              <button
                id="btn-nav-theme-toggle"
                onClick={onToggleDarkMode}
                className="text-neutral-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle theme mode"
              >
                {isDarkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
              </button>

              {/* Join Now Button */}
              <button
                id="btn-nav-join-now"
                onClick={() => onOpenBookingModal()}
                className="bg-electric-orange hover:bg-electric-orange-hover text-white text-xs font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider shadow-md shadow-electric-orange/15 transition-all cursor-pointer"
              >
                Join Now
              </button>
            </div>

            {/* Hamburger Mobile Menu Control */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                id="btn-nav-mobile-search"
                onClick={() => setIsSearchOpen(true)}
                className="text-neutral-400 p-2 rounded-lg"
              >
                <Search size={18} />
              </button>
              <button
                id="btn-nav-mobile-theme"
                onClick={onToggleDarkMode}
                className="text-neutral-400 p-2 rounded-lg"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                id="btn-nav-hamburger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-400 p-2 rounded-lg hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-neutral-950 border-b border-neutral-900 mt-2 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                {navLinks.map((link) => (
                  <button
                    id={`nav-link-mobile-${link.id}`}
                    key={link.id}
                    onClick={() => handleScrollTo(link.id)}
                    className="text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 text-left border-b border-neutral-900 last:border-0"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  id="btn-nav-mobile-join-now"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className="w-full bg-electric-orange text-white text-xs font-bold py-3 px-4 rounded-lg uppercase tracking-wider text-center mt-3"
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24">
            <motion.div
              id="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              id="search-overlay-box"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-xl glass-card rounded-2xl border border-neutral-800 p-5 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                <Search className="text-electric-orange" size={18} />
                <input
                  id="input-nav-search-query"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programs, trainers, pricing plans..."
                  className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
                  autoFocus
                />
                <button
                  id="btn-close-search"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-neutral-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="mt-3">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest mb-2 pl-2">Matching Queries</p>
                    {searchResults.map((res, i) => (
                      <button
                        id={`btn-search-result-${i}`}
                        key={i}
                        onClick={() => handleSearchResultClick(res.linkId)}
                        className="w-full flex items-center justify-between hover:bg-neutral-900 p-2.5 rounded-lg text-xs text-neutral-300 transition-colors cursor-pointer group"
                      >
                        <span>{res.title}</span>
                        <span className="text-[10px] bg-neutral-950 text-electric-orange border border-electric-orange/10 px-2 py-0.5 rounded font-semibold uppercase tracking-wider group-hover:bg-electric-orange group-hover:text-white">
                          {res.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-xs text-neutral-500">
                    No results found for "{searchQuery}". Try searching for 'Strength', 'HIIT', or 'Elite'.
                  </div>
                ) : (
                  <div className="p-4 text-left text-xs text-neutral-500 space-y-1">
                    <p className="font-semibold uppercase text-[9px] text-neutral-400 tracking-wider mb-2">Try quick searches:</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSearchQuery('HIIT')} className="bg-neutral-900 hover:text-white px-2.5 py-1 rounded text-[10px] font-semibold border border-neutral-800">HIIT</button>
                      <button onClick={() => setSearchQuery('Strength')} className="bg-neutral-900 hover:text-white px-2.5 py-1 rounded text-[10px] font-semibold border border-neutral-800">Strength</button>
                      <button onClick={() => setSearchQuery('Elite')} className="bg-neutral-900 hover:text-white px-2.5 py-1 rounded text-[10px] font-semibold border border-neutral-800">Elite Plan</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="btn-scroll-to-top"
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-30 bg-electric-orange hover:bg-electric-orange-hover text-white p-3 rounded-full shadow-lg hover:shadow-electric-orange/30 border border-white/10 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowRight className="transform -rotate-90" size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        id="floating-whatsapp-action-bubble"
        href="https://wa.me/917795559029?text=Hello%20Jairaj%20Fitness%20Gym%2C%20I%20would%20like%20to%20know%20more%20about%20your%20membership%20plans."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-30 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg shadow-green-500/20 hover:scale-105 transition-all border border-white/10 flex items-center justify-center cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <Phone size={18} className="transform rotate-0" />
        <span className="hidden md:inline-block max-w-0 group-hover:max-w-xs transition-all duration-300 font-bold text-[10px] uppercase ml-1.5 whitespace-nowrap overflow-hidden">
          WhatsApp Support
        </span>
      </a>
    </>
  );
}
