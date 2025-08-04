import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CheckCircle, Users, Clock, CurrencyDollar, Globe, Heart } from 'phosphor-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: Users,
    title: '1000+ Satisfied Clients',
    description: 'Trusted by businesses across Rwanda and beyond'
  },
  {
    icon: Clock,
    title: 'Fast Production & Delivery',
    description: 'Quick turnaround times without compromising quality'
  },
  {
    icon: CurrencyDollar,
    title: 'Affordable Bulk Pricing',
    description: 'Cost-effective solutions for all budget sizes'
  },
  {
    icon: Heart,
    title: 'In-House Creative Team',
    description: 'Passionate designers and strategists under one roof'
  },
  {
    icon: Globe,
    title: 'Kigali-Based, Africa-Wide Reach',
    description: 'Local expertise with continental impact'
  }
];

export default function WhyChooseUs() {
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
              Why Choose Us
            </motion.h1>
            
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <blockquote className="text-3xl md:text-4xl font-light mb-8 text-foreground/80 italic">
                "People don't just remember logos — they remember experiences. We give them both."
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reasons.map((reason, index) => (
                <AnimatedSection key={reason.title} delay={index * 0.1}>
                  <GlassCard className="text-center h-full">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <reason.icon size={32} className="text-primary" weight="light" />
                    </div>
                    
                    <div className="flex items-center justify-center mb-4">
                      <CheckCircle size={20} className="text-accent mr-2" weight="fill" />
                      <h3 className="text-xl font-medium text-foreground">
                        {reason.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <GlassCard className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                  Ready to Elevate Your Brand?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join over 1000 satisfied clients who trust us with their branding needs.
                </p>
                <motion.button
                  onClick={() => window.open('https://wa.me/250780111110', '_blank')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                </motion.button>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}