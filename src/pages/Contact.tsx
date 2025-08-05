import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeuroButton } from '@/components/ui/NeuroButton';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { EnvelopeSimple, Phone, MapPin, WhatsappLogo, InstagramLogo } from 'phosphor-react';

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/250780111110', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/allin_production', '_blank');
  };

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
                        <Phone size={24} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Call Us</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+250780111110" className="text-primary hover:underline">
                            +250 780 111 110
                          </a>
                        </p>
                        <p className="text-muted-foreground">Available 24/7 for urgent projects</p>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                        <WhatsappLogo size={24} weight="light" className="text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">WhatsApp</h3>
                        <p className="text-muted-foreground">
                          <a href="https://wa.me/250780111110" className="text-green-500 hover:underline">
                            +250 780 111 110
                          </a>
                        </p>
                        <p className="text-muted-foreground">Quick responses and file sharing</p>
                        <NeuroButton 
                          size="sm" 
                          onClick={handleWhatsAppClick}
                          className="mt-2"
                        >
                          WhatsApp Us
                        </NeuroButton>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                        <InstagramLogo size={24} weight="light" className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Instagram</h3>
                        <p className="text-muted-foreground">
                          <a href="https://instagram.com/allin_production" className="text-pink-500 hover:underline">
                            @allin_production
                          </a>
                        </p>
                        <p className="text-muted-foreground">See our latest work and projects</p>
                        <NeuroButton 
                          size="sm" 
                          onClick={handleInstagramClick}
                          className="mt-2"
                        >
                          Follow Us
                        </NeuroButton>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <EnvelopeSimple size={24} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-2">Email Us</h3>
                        <p className="text-muted-foreground">info@allininternational.com</p>
                        <p className="text-muted-foreground">For detailed project discussions</p>
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