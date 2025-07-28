import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    content: 'All In International transformed our brand identity completely. Their attention to detail and creative vision exceeded all expectations.',
    result: '300% increase in brand recognition',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Urban Fashion',
    content: 'The branded merchandise quality is exceptional. Our customers love the premium feel and modern design aesthetics.',
    result: '250% boost in customer engagement',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'Green Energy Co.',
    content: 'Professional video production that captured our vision perfectly. The team delivers luxury-level results every time.',
    result: '400% improvement in conversion rates',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    company: 'Startup Labs',
    content: 'From concept to execution, they delivered beyond what we imagined. True creative partners in every sense.',
    result: '180% increase in social media reach',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 gradient-text">
            Client Success Stories
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Discover how we've helped brands achieve extraordinary results
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      weight="fill"
                      className="text-primary mx-1"
                    />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="mb-6">
                  <div className="text-lg font-medium text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentIndex].company}
                  </div>
                </div>

                <div className="inline-block px-6 py-3 bg-primary/20 rounded-full border border-primary/30">
                  <span className="text-primary font-medium">
                    {testimonials[currentIndex].result}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="neuro-button p-4 hover:scale-110 smooth-transition"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} weight="light" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full smooth-transition ${
                    index === currentIndex
                      ? 'bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="neuro-button p-4 hover:scale-110 smooth-transition"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}