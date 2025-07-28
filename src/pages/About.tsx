import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-light mb-8 gradient-text">
                About Us
              </h1>
              <p className="text-xl opacity-80 max-w-3xl mx-auto">
                We are passionate creators, innovative thinkers, and brand storytellers 
                dedicated to bringing your vision to life through exceptional media and products.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <AnimatedSection delay={0.2}>
                <GlassCard>
                  <h2 className="text-3xl font-light mb-6 text-foreground">Our Story</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Founded in 2020, All In International emerged from a simple belief: 
                    every brand deserves to tell its story in the most compelling way possible. 
                    What started as a small creative studio has evolved into a comprehensive 
                    media production and branded merchandise powerhouse.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our journey began with a mission to bridge the gap between creativity 
                    and commerce, helping brands not just communicate, but truly connect 
                    with their audiences through premium quality and innovative design.
                  </p>
                </GlassCard>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <GlassCard>
                  <h2 className="text-3xl font-light mb-6 text-foreground">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To be the global leader in creative brand experiences, setting new 
                    standards for quality, innovation, and client satisfaction in the 
                    creative media and branded merchandise industry.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where every brand, regardless of size, has access 
                    to world-class creative solutions that drive meaningful engagement 
                    and lasting impact.
                  </p>
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}