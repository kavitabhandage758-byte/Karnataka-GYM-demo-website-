import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Please provide an email';
    else if (!emailRegex.test(formData.email.trim())) newErrors.email = 'Enter a valid email address';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Please provide your phone number';
    else if (!phoneRegex.test(formData.phone.trim().replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.message.trim()) newErrors.message = 'Please write a brief message';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});

    // Reset success banner after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950 border-t border-neutral-900/40">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Get In Touch</span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            CONTACT US
          </h2>
          <p className="text-sm text-neutral-400">
            Have a custom training program proposal or timing request? Write to us directly or visit our luxury gym floor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMN 1: CONTACT CARD DETAILS & MAP */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="glass-card p-6 rounded-2xl border border-neutral-800 space-y-6">
              
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider border-b border-neutral-900 pb-3">
                Karnataka Gym MG Road
              </h3>

              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex items-start gap-4 text-xs">
                  <div className="w-9 h-9 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-electric-orange">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-white uppercase text-[9px] tracking-wider mb-0.5">Physical Gym Address</span>
                    <p className="text-neutral-400 leading-normal">
                      Karnataka Gym, MG Road, Bengaluru, Karnataka - 560001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 text-xs">
                  <div className="w-9 h-9 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-electric-orange">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-white uppercase text-[9px] tracking-wider mb-0.5">Call Desk Coordination</span>
                    <a href="tel:+919876543210" className="text-neutral-400 hover:text-white transition-colors block">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 text-xs">
                  <div className="w-9 h-9 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-electric-orange">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-white uppercase text-[9px] tracking-wider mb-0.5">Corporate Email</span>
                    <a href="mailto:info@karnatakagym.com" className="text-neutral-400 hover:text-white transition-colors block">
                      info@karnatakagym.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 text-xs border-t border-neutral-900/60 pt-4">
                  <div className="w-9 h-9 bg-neutral-950 border border-neutral-850 rounded-lg flex items-center justify-center shrink-0 text-electric-orange">
                    <Clock size={16} />
                  </div>
                  <div className="w-full">
                    <span className="block font-bold text-white uppercase text-[9px] tracking-wider mb-1">Weekly Operating Hours</span>
                    <div className="flex justify-between text-neutral-400 font-mono text-[11px] leading-relaxed">
                      <span>Mon – Sat:</span>
                      <span className="text-white font-bold">5:00 AM – 11:00 PM</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 font-mono text-[11px] leading-relaxed mt-0.5">
                      <span>Sunday:</span>
                      <span className="text-white font-bold">6:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map Frame */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-video h-[200px] shrink-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9714349942735!2d77.60838181180214!3d12.973656387280838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e41fa80c1%3A0xc49d012423efef!2sM%20G%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale invert contrast-110 opacity-75"
                allowFullScreen={false}
                loading="lazy"
                title="Karnataka Gym Google Map MG Road Bengaluru"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* COLUMN 2: PREMIUM MESSAGE SUBMISSION FORM */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">Send Direct Query</h3>
                <p className="text-xs text-neutral-400 mt-1">Our customer service team is active 24/7 to resolve member concerns.</p>
              </div>

              {/* Success notification */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-green-950/40 border border-green-500/30 flex items-center gap-3 text-green-300 mb-6"
                  >
                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-xs uppercase tracking-wider">Message Sent Successfully!</p>
                      <p className="text-[11px] text-green-400/90 leading-tight">Thank you. Our MG Road coordinator will email/call you within 2-4 working hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Full Name *</label>
                  <input
                    id="input-contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full bg-neutral-900/60 border ${errors.name ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Email Address *</label>
                    <input
                      id="input-contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@gmail.com"
                      className={`w-full bg-neutral-900/60 border ${errors.email ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Phone Number *</label>
                    <input
                      id="input-contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-neutral-900/60 border ${errors.phone ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors duration-200`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    id="textarea-contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your fitness targets, query, or customized class timings..."
                    className={`w-full bg-neutral-900/60 border ${errors.message ? 'border-red-500' : 'border-neutral-800'} focus:border-electric-orange rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors duration-200 resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.message}</p>
                  )}
                </div>

                <button
                  id="btn-contact-submit"
                  type="submit"
                  className="w-full bg-electric-orange hover:bg-electric-orange-hover text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-electric-orange/15 cursor-pointer mt-4"
                >
                  Send Message <Send size={13} />
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
