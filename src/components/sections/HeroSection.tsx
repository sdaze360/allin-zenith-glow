import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeuroButton } from '../ui/NeuroButton';
import heroImage from '@/assets/hero-image.jpg';
import officeImage from '@/assets/office-image.jpg';

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroImage, officeImage];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000); // 15 seconds per image
    
    return () => clearInterval(interval);
  }, []);
  
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ marginTop: '3rem' }}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={images[currentImageIndex]}
              alt={`All In International - Slide ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Theme-aware overlay: only show in dark mode */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 dark:from-background/80 dark:via-background/40 dark:to-background/80" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 dark:from-background/50 dark:via-transparent dark:to-background/50" />
      </div>

      {/* Floating Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
        <motion.h1
          className="text-6xl md:text-8xl font-light mb-10 gradient-text leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }} 
        >
          Creative Media
          <br />
          <span className="text-primary mt-4 block">Redefined</span>
        </motion.h1>

        <motion.p
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        >
          <span className="inline-block text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 drop-shadow-md text-foreground px-8 py-6 rounded-2xl bg-white/80 dark:bg-transparent leading-relaxed">
            All In International Production Ltd is a dynamic creative media and production agency
            devoted to breaking boundaries through visual storytelling and branded content.
            <br /><br />
            Rooted in innovation, collaboration, and excellence, All In transforms bold concepts
            into powerful, high-quality visuals and merchandise that resonate across industries.
            <br /><br />
            Our goal is to create a holistic brand guideline that captures the essence of All In's
            cross-border creativity, strategic focus, and relentless pursuit of quality.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        >
          <NeuroButton
            size="lg"
            onClick={scrollToServices}
            className="transform hover:scale-110 drop-shadow-lg"
          >
            Explore Our Services
          </NeuroButton>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm bg-background/20">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}