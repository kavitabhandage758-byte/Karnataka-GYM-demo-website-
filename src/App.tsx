import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Calculators from './components/Calculators';
import InteractiveWidgets from './components/InteractiveWidgets';
import Membership from './components/Membership';
import Transformations from './components/Transformations';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bookingState, setBookingState] = useState({
    isOpen: false,
    prefilledProgram: '',
    prefilledPlan: ''
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
      }
      return next;
    });
  };

  const handleOpenBookingModal = (program: string = '', plan: string = '') => {
    setBookingState({
      isOpen: true,
      prefilledProgram: program,
      prefilledPlan: plan
    });
  };

  const handleCloseBookingModal = () => {
    setBookingState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white antialiased selection:bg-electric-orange selection:text-white">
      
      {/* Header Sticky Navigation */}
      <Navbar 
        onOpenBookingModal={handleOpenBookingModal} 
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Hero Welcome Slide */}
      <Hero onOpenBookingModal={handleOpenBookingModal} />

      {/* About Section with scrolling stats counters */}
      <About />

      {/* Core Programs grid with Search and Intensities */}
      <Programs />

      {/* Premium Multi-tab Calculators Hub */}
      <Calculators />

      {/* Tabata Workout Timer and Progress Logger dashboard */}
      <InteractiveWidgets />

      {/* Membership Pricing Levels & deep table list */}
      <Membership onOpenBookingModal={handleOpenBookingModal} />

      {/* Before / After member transformation slider handle */}
      <Transformations />

      {/* Auto-sliding client review carousel */}
      <Testimonials />

      {/* Frequently Asked Questions accordion */}
      <FAQ />

      {/* Contact information details, map embed, query submission form */}
      <Contact />

      {/* Copyright footer, newsletter input, privacy rules, cookie consent */}
      <Footer />

      {/* GLOBAL DISMISSABLE BOOKING DIALOG OVERLAY */}
      <BookingForm 
        isOpen={bookingState.isOpen}
        onClose={handleCloseBookingModal}
        preselectedProgram={bookingState.prefilledProgram}
        preselectedPlan={bookingState.prefilledPlan}
      />

    </div>
  );
}
