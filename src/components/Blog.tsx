import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, X, BookOpen, ArrowRight, Search, Filter } from 'lucide-react';
import { articlesData } from '../data';
import { Article } from '../types';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Training', 'Fat Loss', 'Nutrition'];

  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20 md:py-28 relative overflow-hidden bg-neutral-950">
      
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-electric-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-electric-orange uppercase tracking-widest block">Scientific Lifestyle Hub</span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
              FITNESS BLOG
            </h2>
            <p className="text-sm text-neutral-400">
              Unlock performance secrets, nutrient timing formulas, and metabolic science write-ups from our active master coaches.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
            <input
              id="input-blog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-neutral-900 border border-neutral-800 text-xs px-10 py-3 rounded-lg text-white outline-none focus:border-electric-orange placeholder-neutral-500 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-neutral-900 pb-5">
          <span className="text-xs font-bold text-neutral-500 flex items-center gap-1 uppercase mr-2">
            <Filter size={12} /> Category:
          </span>
          {categories.map(cat => (
            <button
              id={`btn-blog-category-${cat.toLowerCase()}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-electric-orange text-white' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.article
              id={`blog-card-${article.id}`}
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl border border-neutral-800/80 overflow-hidden flex flex-col justify-between glass-card-hover group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  
                  {/* Category tag */}
                  <span className="absolute bottom-4 left-4 bg-electric-orange text-white text-[9px] font-black uppercase px-2.5 py-1 rounded shadow-md">
                    {article.category}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-3">
                  {/* Date and Author */}
                  <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-electric-orange transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0 border-t border-neutral-900/40 mt-auto flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono">
                  <User size={11} /> By {article.author}
                </span>
                <span className="text-electric-orange group-hover:translate-x-1.5 transition-transform duration-350 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  Read More <ArrowRight size={13} />
                </span>
              </div>

            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center p-12 bg-neutral-900/30 border border-neutral-900 rounded-2xl max-w-sm mx-auto">
            <h4 className="font-display text-white font-semibold text-sm">No articles match your query</h4>
            <p className="text-xs text-neutral-500 mt-1">Try another keyword or resetting the category tabs.</p>
          </div>
        )}

      </div>

      {/* DETAILED ARTICLE READER DRAWERS MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              id="article-reader-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div
              id="article-reader-body"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl glass-card border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                id="btn-close-article-modal"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-neutral-850 p-1.5 rounded-full cursor-pointer transition-colors"
                aria-label="Close article reader"
              >
                <X size={18} />
              </button>

              <div className="space-y-5">
                
                {/* Meta details */}
                <div className="space-y-2 pr-8">
                  <div className="flex flex-wrap gap-3 items-center text-[10px] text-neutral-500 font-mono uppercase">
                    <span className="bg-electric-orange text-white px-2 py-0.5 rounded font-black tracking-wider">{selectedArticle.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {selectedArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {selectedArticle.readTime}</span>
                  </div>
                  <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium">By {selectedArticle.author} — Karnataka Gym head Staff</p>
                </div>

                {/* Cover Photo */}
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-900 bg-neutral-900">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Body Content */}
                <div className="text-xs md:text-sm text-neutral-300 space-y-4 leading-relaxed whitespace-pre-line border-t border-neutral-900 pt-4">
                  {selectedArticle.content}
                </div>

                {/* Footer close */}
                <div className="pt-4 border-t border-neutral-900 flex justify-end">
                  <button
                    id="btn-close-article-bottom"
                    onClick={() => setSelectedArticle(null)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Finish Reading
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
