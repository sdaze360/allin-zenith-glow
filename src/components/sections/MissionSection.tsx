import React from 'react';
import { Lightbulb, Target, Users, Rocket } from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';

const missionPoints = [
  {
    icon: Target,
    title: 'Precision Excellence',
    description: 'Every project crafted with meticulous attention to detail and unwavering quality standards.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Innovation',
    description: 'Pushing boundaries with cutting-edge design and revolutionary creative solutions.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Building lasting relationships through transparent collaboration and shared success.',
  },
  {
    icon: Rocket,
    title: 'Future-Forward',
    description: 'Anticipating trends and delivering solutions that keep our clients ahead of the curve.',
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-24 px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 gradient-text">
            Our Mission
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto mb-8">
            To revolutionize brand experiences through exceptional creative media and premium products, 
            empowering businesses to connect with their audiences in meaningful, impactful ways.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {missionPoints.map((point, index) => (
            <AnimatedSection key={point.title} delay={index * 0.2}>
              <GlassCard className="text-center h-full">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4">
                    <point.icon size={32} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-foreground">
                    {point.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.8} className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <h3 className="text-3xl font-light mb-6 text-foreground">
                Why We Built All In International
              </h3>
              <p className="text-lg opacity-80 leading-relaxed">
                In a world saturated with generic content and mass-produced merchandise, we saw an opportunity 
                to create something extraordinary. All In International was born from the belief that every brand 
                deserves to stand out with premium quality, innovative design, and authentic storytelling. 
                We're not just a service provider – we're creative partners dedicated to elevating your brand 
                to new heights of excellence and recognition.
              </p>
            </GlassCard>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}