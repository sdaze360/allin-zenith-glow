import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeuroButton } from '@/components/ui/NeuroButton';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { EnvelopeSimple, Phone, MapPin } from 'phosphor-react';

export default function Contact() {
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
                Contact Us
              </h1>
              <p className="text-xl opacity-80 max-w-3xl mx-auto">
                Ready to elevate your brand? Let's start a conversation about your next project.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <AnimatedSection delay={0.2}>
                <GlassCard>
                  <h2 className="text-3xl font-light mb-8 text-foreground">Get In Touch</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <NeuroButton size="lg" className="w-full">
                      Send Message
                    </NeuroButton>
                  </form>
                </GlassCard>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="space-y-8">
                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <EnvelopeSimple size={24} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Email Us</h3>
                        <p className="text-muted-foreground">hello@allininternational.com</p>
                        <p className="text-muted-foreground">support@allininternational.com</p>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <Phone size={24} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Call Us</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-muted-foreground">Mon - Fri, 9AM - 6PM EST</p>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <MapPin size={24} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Visit Us</h3>
                        <p className="text-muted-foreground">123 Creative Street</p>
                        <p className="text-muted-foreground">New York, NY 10001</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}