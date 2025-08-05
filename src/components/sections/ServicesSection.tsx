import React from 'react';
import { Printer, Palette, Globe, VideoCamera, Crown } from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';
import { NeuroButton } from '../ui/NeuroButton';

const services = [
  {
    id: 1,
    name: 'Laser Printing',
    icon: Printer,
    description: 'High-quality laser printing services for business cards, brochures, banners, and custom merchandise. Precision printing with vibrant colors and professional finishes.',
    image: '/src/assets/laser-printing.jpg', // We'll need to add this image
    features: ['Business Cards', 'Brochures', 'Banners', 'Custom Merchandise']
  },
  {
    id: 2,
    name: 'Graphic Design',
    icon: Palette,
    description: 'Creative graphic design solutions including logos, brand identity, marketing materials, and digital assets. Professional designs that capture your brand essence.',
    image: '/src/assets/graphic-design.jpg', // We'll need to add this image
    features: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Digital Assets']
  },
  {
    id: 3,
    name: 'Web Design',
    icon: Globe,
    description: 'Modern, responsive web design that creates engaging user experiences. From landing pages to full e-commerce solutions with cutting-edge design trends.',
    image: '/src/assets/web-design.jpg', // We'll need to add this image
    features: ['Responsive Design', 'E-commerce', 'Landing Pages', 'UI/UX Design']
  },
  {
    id: 4,
    name: 'Video Production',
    icon: VideoCamera,
    description: 'Professional video production services including corporate videos, promotional content, social media videos, and event coverage with cinematic quality.',
    image: '/src/assets/video-production.jpg', // We'll need to add this image
    features: ['Corporate Videos', 'Promotional Content', 'Social Media', 'Event Coverage']
  },
  {
    id: 5,
    name: 'Branding',
    icon: Crown,
    description: 'Comprehensive branding solutions that build strong brand identities. From strategy to implementation across all touchpoints for lasting brand impact.',
    image: '/src/assets/branding.jpg', // We'll need to add this image
    features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Implementation']
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 gradient-text">
            Our Services
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Comprehensive creative solutions to elevate your brand and bring your vision to life
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <GlassCard className="text-center group h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-2xl mb-6 flex-shrink-0">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <IconComponent size={64} className="text-primary" weight="light" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-light mb-4 text-foreground">
                      {service.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 flex-1">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-primary mb-3">What we offer:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {service.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <NeuroButton 
                      size="sm" 
                      className="mt-auto w-full"
                      onClick={() => window.location.href = '/products-services'}
                    >
                      Learn More
                    </NeuroButton>
                  </div>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
} 