import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { Star, Lightbulb, Users, Rocket, Palette } from 'phosphor-react';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Team Section - now appears first */}
        <div className="container mx-auto mt-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 gradient-text">Meet Our Team</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              The passionate people behind All In International.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <GlassCard className="flex flex-col items-center text-center">
              <img src="/team-ceo.jpg" alt="CEO" className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-primary shadow-lg" />
              <h3 className="text-2xl font-semibold mb-2">Alex Johnson</h3>
              <p className="text-primary text-lg font-medium mb-1">Chief Executive Officer</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center">
              <img src="/team-creative.svg" alt="Creative Director" className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-primary shadow-lg bg-white p-2" />
              <h3 className="text-2xl font-semibold mb-2">Jamie Lee</h3>
              <p className="text-primary text-lg font-medium mb-1">Creative Director</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center">
              <img src="/team-production.svg" alt="Production Lead" className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-primary shadow-lg bg-white p-2" />
              <h3 className="text-2xl font-semibold mb-2">Morgan Smith</h3>
              <p className="text-primary text-lg font-medium mb-1">Production Lead</p>
            </GlassCard>
          </div>
        </div>
        {/* About Us Section - now appears after team */}
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
        {/* Why Choose Us Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="container mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 gradient-text">Why Choose Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover what sets All In International apart and why brands trust us to elevate their story.
              </p>
              <blockquote className="italic text-lg md:text-xl text-primary font-medium max-w-3xl mx-auto border-l-4 border-primary pl-6 mb-8">
                "We don't just give your brand a logo—we create an experience that your audience will remember."
              </blockquote>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <AnimatedSection delay={0.1}>
                <GlassCard className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4 mx-auto">
                    <Star size={32} weight="fill" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">Unmatched Quality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We deliver only the highest quality media and merchandise, ensuring your brand always shines.
                  </p>
                </GlassCard>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <GlassCard className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4 mx-auto">
                    <Palette size={32} weight="fill" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">Logo & Brand Experience</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We craft not just logos, but immersive brand experiences that resonate with your audience.
                  </p>
                </GlassCard>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <GlassCard className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4 mx-auto">
                    <Users size={32} weight="fill" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">Client Partnership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe in true collaboration, working closely with you every step of the way.
                  </p>
                </GlassCard>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <GlassCard className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4 mx-auto">
                    <Rocket size={32} weight="fill" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">Future-Ready</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We anticipate trends and deliver solutions that keep your brand ahead of the curve.
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