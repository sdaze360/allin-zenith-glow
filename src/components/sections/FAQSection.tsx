import React, { useState } from 'react';
import { Plus, Minus } from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: 'What services does All In International offer?',
    answer: 'We provide comprehensive creative media production including video production, photography, graphic design, branding, and custom branded merchandise. Our services span from concept development to final delivery.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. Simple branded merchandise orders typically take 2-3 weeks, while comprehensive media campaigns can take 6-12 weeks. We provide detailed timelines during project planning.',
  },
  {
    id: 3,
    question: 'Do you work with startups and small businesses?',
    answer: 'Absolutely! We work with businesses of all sizes, from innovative startups to established enterprises. Our scalable solutions are designed to meet your specific needs and budget requirements.',
  },
  {
    id: 4,
    question: 'What makes your branded products premium quality?',
    answer: 'We partner with top-tier manufacturers and use only the finest materials. Every product undergoes rigorous quality control, and we offer custom embroidery, premium printing techniques, and luxury finishing touches.',
  },
  {
    id: 5,
    question: 'Can you handle international shipping?',
    answer: 'Yes, we ship worldwide! We have established partnerships with reliable international carriers to ensure your branded products and media deliverables reach you safely, wherever you are.',
  },
  {
    id: 6,
    question: 'What is your revision policy?',
    answer: 'We include up to 3 rounds of revisions in all our packages to ensure complete satisfaction. Additional revisions can be accommodated based on project scope and requirements.',
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 gradient-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Everything you need to know about working with All In International
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <AnimatedSection key={faq.id} delay={index * 0.1}>
              <GlassCard hover={false} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between text-left p-0 hover:text-primary smooth-transition"
                >
                  <h3 className="text-xl font-light text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <Minus size={24} weight="light" className="text-primary" />
                    ) : (
                      <Plus size={24} weight="light" className="text-primary" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border/20 mt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}