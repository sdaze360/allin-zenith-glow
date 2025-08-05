import React from 'react';
import { 
  InstagramLogo, 
  TwitterLogo, 
  LinkedinLogo, 
  FacebookLogo,
  EnvelopeSimple,
  Phone,
  MapPin
} from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Footer() {
  const socialLinks = [
    { icon: InstagramLogo, href: 'https://instagram.com/allin_production', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <footer className="py-16 px-6 border-t border-border/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <AnimatedSection className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-light gradient-text mb-4">
                All In International
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Revolutionizing brand experiences through exceptional creative media 
                and premium products. Your vision, our expertise, extraordinary results.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={20} weight="light" className="text-primary" />
                <a href="tel:+250780111110" className="text-muted-foreground hover:text-primary smooth-transition">+250 780 111 110</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} weight="light" className="text-primary" />
                <a href="https://wa.me/250780111110" className="text-muted-foreground hover:text-primary smooth-transition">WhatsApp: +250 780 111 110</a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramLogo size={20} weight="light" className="text-primary" />
                <a href="https://instagram.com/allin_production" className="text-muted-foreground hover:text-primary smooth-transition">@allin_production</a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h4 className="text-xl font-light text-foreground mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary smooth-transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h4 className="text-xl font-light text-foreground mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="neuro-button p-3 hover:scale-110 smooth-transition"
                  aria-label={social.label}
                >
                  <social.icon size={20} weight="light" className="text-primary" />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.6} className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 All In International. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}