import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <TestimonialsSection />
      <MissionSection />
      <FAQSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
