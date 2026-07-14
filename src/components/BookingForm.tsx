import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { programsData } from '../data';

interface BookingFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedProgram?: string;
  preselectedPlan?: string;
}

export default function BookingForm({ isOpen = false, onClose, preselectedProgram = '', preselectedPlan = '' }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    program: preselectedProgram || 'Strength Training',
    membershipPlan: preselectedPlan || 'Premium',
    preferredTiming: 'Morning (06:00 AM - 09:00 AM)',
    date: '',
    specialRequirements: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync props changes if program/plan changes
  React.useEffect(() => {
    if (preselectedProgram) {
      setFormData(prev => ({ ...prev, program: preselectedProgram }));
    }
    if (preselectedPlan) {
      setFormData(prev => ({ ...prev, membershipPlan: preselectedPlan }));
    }
  }, [preselectedProgram, preselectedPlan]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!phoneRegex.test(formData.phone.trim().replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(ageNum) || ageNum < 12 || ageNum > 90) {
      newErrors.age = 'Age must be between 12 and 90';
    }

    if (!formData.date) newErrors.date = 'Preferred Start Date is required';
    else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Clear validation error on type
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      program: 'Strength Training',
      membershipPlan: 'Premium',
      preferredTiming: 'Morning (06:00 AM - 09:00 AM)',
      date: '',
      specialRequirements: '',
      agreeToTerms: false
    });
    setErrors({});
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSuccess(true);

    // Format WhatsApp message
    const message = `Hello Jairaj Fitness Gym, I would like to book a session/membership!

*BOOKING DETAILS:*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.fullName}
📞 *Phone:* ${formData.phone}
✉️ *Email:* ${formData.email}
🎂 *Age / Gender:* ${formData.age} yrs / ${formData.gender}
🏋️ *Program:* ${formData.program}
💎 *Membership Plan:* ${formData.membershipPlan}
⏰ *Preferred Timing:* ${formData.preferredTiming}
📅 *Start Date:* ${formData.date}
📝 *Special Requests:* ${formData.specialRequirements || 'None'}
━━━━━━━━━━━━━━━━━━━━
Thank you. Please confirm my premium booking slot!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917795559029?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      if (onClose) onClose();
      handleReset();
    }, 1500);
  };

  const formFields = (
    <form id="booking-form-element" onSubmit={handleSubmit} className="space-y-4">
      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-green-950/40 border border-green-500/40 flex items-center gap-3 text-green-300"
        >
          <CheckCircle2 className="text-green-500 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-sm">Booking Confirmed!</p>
            <p className="text-xs text-green-400/95">Redirecting you to WhatsApp to complete details...</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            <User size={13} className="text-electric-orange" /> Full Name *
          </label>
          <input
            id="input-fullname"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full bg-neutral-900 border ${errors.fullName ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            <Phone size={13} className="text-electric-orange" /> Phone Number *
          </label>
          <input
            id="input-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 7795559029"
            className={`w-full bg-neutral-900 border ${errors.phone ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email */}
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            <Mail size={13} className="text-electric-orange" /> Email *
          </label>
          <input
            id="input-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. ramesh@gmail.com"
            className={`w-full bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            Age *
          </label>
          <input
            id="input-age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 25"
            className={`w-full bg-neutral-900 border ${errors.age ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            Gender
          </label>
          <select
            id="select-gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-colors duration-200"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Program Selection */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            Workout Program
          </label>
          <select
            id="select-program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-colors duration-200"
          >
            {programsData.map(p => (
              <option key={p.id} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* Membership Tier */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            Membership Plan
          </label>
          <select
            id="select-membership"
            name="membershipPlan"
            value={formData.membershipPlan}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-colors duration-200"
          >
            <option value="Starter (₹999/month)">Starter Tier (₹999/mo)</option>
            <option value="Premium (₹1999/month)">Premium Tier (₹1999/mo)</option>
            <option value="Elite (₹3499/month)">Elite Luxury Tier (₹3499/mo)</option>
            <option value="Free Session Trial">Free 1-Day Trial Session</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preferred Timing */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            <Clock size={13} className="text-electric-orange" /> Preferred Timing
          </label>
          <select
            id="select-timing"
            name="preferredTiming"
            value={formData.preferredTiming}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-colors duration-200"
          >
            <option value="Early Bird (05:00 AM - 07:00 AM)">Early Bird (05:00 AM - 07:00 AM)</option>
            <option value="Morning (07:00 AM - 10:00 AM)">Morning (07:00 AM - 10:00 AM)</option>
            <option value="Mid-day (10:00 AM - 04:00 PM)">Mid-day (10:00 AM - 04:00 PM)</option>
            <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
            <option value="Night (07:00 PM - 11:00 PM)">Night (07:00 PM - 11:00 PM)</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar size={13} className="text-electric-orange" /> Target Start Date *
          </label>
          <input
            id="input-date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full bg-neutral-900 border ${errors.date ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-colors duration-200`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.date}</p>
          )}
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <label className="block text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
          <FileText size={13} className="text-electric-orange" /> Special Physical Requests or Medical Conditions
        </label>
        <textarea
          id="textarea-special"
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows={2}
          placeholder="e.g. Spinal posture, specific knee sensitivity, sport training..."
          className="w-full bg-neutral-900 border border-neutral-800 focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200 resize-none"
        ></textarea>
      </div>

      {/* Agreement T&C */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            id="checkbox-terms"
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 accent-electric-orange w-4 h-4 rounded"
          />
          <span className="text-xs text-neutral-400 leading-normal">
            I certify that all details above are accurate and I agree to the <span className="text-electric-orange hover:underline">Jairaj Fitness Gym liability waivers</span> and safety terms.
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.agreeToTerms}</p>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-3">
        <button
          id="btn-confirm-booking"
          type="submit"
          className="flex-1 bg-electric-orange hover:bg-electric-orange-hover text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide uppercase transition-colors duration-200 shadow-md shadow-electric-orange/15 cursor-pointer"
        >
          Confirm Premium Booking Slot
        </button>
        <button
          id="btn-reset-booking"
          type="button"
          onClick={handleReset}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 px-4 rounded-lg font-bold text-sm tracking-wide uppercase transition-colors duration-200 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );

  if (!isOpen) {
    // Inline rendering (standard section element)
    return (
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-neutral-800/80">
        <div className="mb-6">
          <h3 className="font-display font-semibold text-xl md:text-2xl text-white">Join the Jairaj Fitness Gym Elite</h3>
          <p className="text-xs text-neutral-400 mt-1">Submit your details. This redirects instantly to prefill a WhatsApp message to book your membership desk immediately.</p>
        </div>
        {formFields}
      </div>
    );
  }

  // Modal rendering
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="booking-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content container */}
        <motion.div
          id="booking-modal-body"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-3xl glass-card border border-neutral-800 rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-2xl shadow-electric-orange/10"
        >
          <button
            id="btn-close-booking-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-neutral-800 p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6 pr-8">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">Reserve Your Gym Experience</h3>
            <p className="text-xs text-neutral-400 mt-1">Book a custom plan. Our team will automatically finalize your card membership on site once we verify your secure prefilled WhatsApp slots.</p>
          </div>

          {formFields}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
