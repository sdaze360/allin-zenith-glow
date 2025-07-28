import React from 'react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { CalendarBlank, User, ArrowRight } from 'phosphor-react';

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Elements of Modern Brand Identity',
    excerpt: 'Discover the key components that make modern brands stand out in today\'s competitive landscape.',
    author: 'Sarah Johnson',
    date: 'December 15, 2024',
    readTime: '5 min read',
    category: 'Branding',
  },
  {
    id: 2,
    title: 'The Future of Video Marketing in 2025',
    excerpt: 'Explore emerging trends and technologies that will shape video marketing strategies in the coming year.',
    author: 'Michael Chen',
    date: 'December 10, 2024',
    readTime: '7 min read',
    category: 'Video Marketing',
  },
  {
    id: 3,
    title: 'Custom Merchandise: More Than Just Products',
    excerpt: 'Learn how premium branded merchandise can become powerful brand ambassadors for your business.',
    author: 'Emily Rodriguez',
    date: 'December 5, 2024',
    readTime: '4 min read',
    category: 'Merchandise',
  },
  {
    id: 4,
    title: 'Creating Authentic Brand Stories That Resonate',
    excerpt: 'Master the art of storytelling to build deeper connections with your audience and drive engagement.',
    author: 'David Kim',
    date: 'November 28, 2024',
    readTime: '6 min read',
    category: 'Storytelling',
  },
];

export default function Blog() {
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
                Our Blog
              </h1>
              <p className="text-xl opacity-80 max-w-3xl mx-auto">
                Insights, trends, and expert advice from the world of creative media and branding.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.2}>
                  <GlassCard className="h-full group cursor-pointer">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-sm bg-primary/20 text-primary rounded-full border border-primary/30">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-light text-foreground mb-4 group-hover:text-primary smooth-transition">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User size={16} weight="light" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarBlank size={16} weight="light" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center text-primary group-hover:translate-x-2 smooth-transition">
                      <span className="mr-2">Read Article</span>
                      <ArrowRight size={16} weight="light" />
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.8} className="text-center mt-16">
              <p className="text-muted-foreground mb-8">
                Want to stay updated with our latest insights?
              </p>
              <div className="max-w-md mx-auto">
                <GlassCard>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl bg-background/50 border border-border/30 focus:border-primary focus:outline-none smooth-transition"
                    />
                    <button className="neuro-button px-6 py-3 font-light">
                      Subscribe
                    </button>
                  </div>
                </GlassCard>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}