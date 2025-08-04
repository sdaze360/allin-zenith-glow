import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { AppleButton } from '@/components/ui/AppleButton';
import { X, Play, Image as ImageIcon, VideoCamera } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  {
    id: 1,
    type: 'image',
    title: 'BK Arena Branded Merchandise',
    category: 'Branded Products',
    image: '/api/placeholder/600/400',
    description: 'Complete merchandise line for Rwanda\'s premier sports venue'
  },
  {
    id: 2,
    type: 'video',
    title: 'Heineken Campaign Video',
    category: 'Video Production',
    image: '/api/placeholder/600/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Creative campaign video for Heineken Rwanda launch'
  },
  {
    id: 3,
    type: 'image',
    title: 'RDB Corporate Identity',
    category: 'Brand Design',
    image: '/api/placeholder/600/400',
    description: 'Logo design and brand guidelines for Rwanda Development Board'
  },
  {
    id: 4,
    type: 'image',
    title: 'Marriott Hotel Amenities',
    category: 'Branded Products',
    image: '/api/placeholder/600/400',
    description: 'Luxury branded amenities for Marriott Hotel Kigali'
  },
  {
    id: 5,
    type: 'video',
    title: 'MTN Event Coverage',
    category: 'Event Video',
    image: '/api/placeholder/600/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Professional event coverage and highlights reel'
  },
  {
    id: 6,
    type: 'image',
    title: 'Canal+ Promotional Items',
    category: 'Branded Products',
    image: '/api/placeholder/600/400',
    description: 'Custom promotional items for Canal+ subscription campaign'
  },
  {
    id: 7,
    type: 'image',
    title: 'RRA Annual Report Design',
    category: 'Print Design',
    image: '/api/placeholder/600/400',
    description: 'Professional annual report design for Rwanda Revenue Authority'
  },
  {
    id: 8,
    type: 'video',
    title: 'Product Photography Showcase',
    category: 'Photography',
    image: '/api/placeholder/600/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Behind-the-scenes of our product photography process'
  }
];

const categories = ['All', 'Branded Products', 'Video Production', 'Brand Design', 'Event Video', 'Print Design', 'Photography'];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: typeof portfolioItems[0]) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <WhatsAppFloat />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center">
          <div className="container mx-auto">
            <motion.h1
              className="text-6xl md:text-8xl font-light mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Portfolio
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover our latest work in branding, product design, and creative media production. 
              Each project tells a unique story of collaboration and creativity.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-foreground hover:bg-white/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              layout
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div onClick={() => openLightbox(item)}>
                      <GlassCard className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-2xl mb-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          {item.type === 'video' ? (
                            <Play size={48} className="text-white" weight="fill" />
                          ) : (
                            <ImageIcon size={48} className="text-white" weight="light" />
                          )}
                        </div>
                        
                        {/* Type indicator */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                          {item.type === 'video' ? (
                            <VideoCamera size={16} className="text-white" weight="fill" />
                          ) : (
                            <ImageIcon size={16} className="text-white" weight="light" />
                          )}
                        </div>
                      </div>
                      
                      <div className="text-primary text-sm font-medium mb-2">
                        {item.category}
                      </div>
                      
                      <h3 className="text-xl font-medium mb-3 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                      </GlassCard>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <GlassCard className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                  Inspired by Our Work?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Let's create something amazing together. Contact us to start your project.
                </p>
                <AppleButton 
                  onClick={() => window.open('https://wa.me/250780111110', '_blank')}
                  variant="primary"
                  size="lg"
                >
                  Start Your Project
                </AppleButton>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-full bg-white dark:bg-card rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              
              {lightboxItem.type === 'video' ? (
                <div className="aspect-video">
                  <iframe
                    src={lightboxItem.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={lightboxItem.title}
                  />
                </div>
              ) : (
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              )}
              
              <div className="p-6">
                <div className="text-primary text-sm font-medium mb-2">
                  {lightboxItem.category}
                </div>
                <h3 className="text-2xl font-medium mb-3 text-foreground">
                  {lightboxItem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {lightboxItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}