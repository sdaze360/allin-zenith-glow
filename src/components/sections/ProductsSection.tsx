import React from 'react';
import { ShoppingBag } from 'phosphor-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';
import { NeuroButton } from '../ui/NeuroButton';
import productTshirt from '@/assets/product-tshirt.jpg';
import productMug from '@/assets/product-mug.jpg';
import productNotebook from '@/assets/product-notebook.jpg';

const products = [
  {
    id: 1,
    name: 'Premium Brand Tee',
    price: '$45',
    image: productTshirt,
    description: 'Ultra-soft cotton blend with embroidered logo',
  },
  {
    id: 2,
    name: 'Luxury Coffee Mug',
    price: '$25',
    image: productMug,
    description: 'Ceramic mug with gold accents',
  },
  {
    id: 3,
    name: 'Executive Notebook',
    price: '$35',
    image: productNotebook,
    description: 'Leather-bound with gold embossing',
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6 gradient-text">
            Featured Products
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Elevate your brand with our premium merchandise collection
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.2}>
              <GlassCard className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                </div>
                
                <h3 className="text-2xl font-light mb-2 text-foreground">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-light text-primary">
                    {product.price}
                  </span>
                  
                  <NeuroButton size="sm" className="flex items-center gap-2">
                    <ShoppingBag size={16} weight="light" />
                    Add to Cart
                  </NeuroButton>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}