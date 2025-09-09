import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { AppleButton } from '@/components/ui/AppleButton';
import { 
  Palette, 
  VideoCamera, 
  MegaphoneSimple, 
  Printer, 
  Briefcase, 
  Camera,
  Tote,
  Coffee,
  TShirt,
  Watch,
  Notebook,
  CaretRight,
  Upload,
  Umbrella,
  Package,
  Wrench
} from 'phosphor-react';
import { motion } from 'framer-motion';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fallback images
import productTshirt from '@/assets/tshirt.png';
import productMug from '@/assets/mug.png';
import productNotebook from '@/assets/notebook.png';
import productCap from '@/assets/cap.png';
import productHandbag from '@/assets/handbag.png';
import productGiftbag from '@/assets/giftbag.png';

// Define types for products and services
type Product = {
  id?: string;
  icon?: string;
  name: string;
  description: string;
  price: string;
  image?: string;
};

type Service = {
  id?: string;
  icon?: string;
  title: string;
  description: string;
};

// Fallback data in case Firebase fetch fails
const fallbackProducts = [
  { 
    icon: 'TShirt', 
    name: 'Premium Brand Tee', 
    description: 'Ultra-soft cotton blend with embroidered logo in our signature crimson color. Features the All In logo on the chest and decorative stripes at the bottom. Perfect for team building and brand promotion.',
    price: '$45',
    image: productTshirt 
  },
  { 
    icon: 'Coffee', 
    name: 'Luxury Coffee Mug', 
    description: 'Ceramic mug with gold accents and custom branding in our signature colors. Available in white and crimson options. Ideal for corporate gifts and promotions.',
    price: '$25',
    image: productMug 
  },
  { 
    icon: 'Notebook', 
    name: 'Executive Notebook', 
    description: 'Leather-bound with gold embossing and premium paper quality. Perfect for business professionals.',
    price: '$35',
    image: productNotebook 
  },
  {
    icon: 'CaretRight',
    name: 'Premium Snapback Cap',
    description: 'High-quality crimson snapback cap featuring the All In logo embroidered in gold. Adjustable size with comfortable fit for all-day wear. Perfect for team events and brand representation.',
    price: '$30',
    image: productCap
  },
  {
    icon: 'Tote',
    name: 'Branded Tote Bag',
    description: 'Durable crimson tote bag with reinforced handles and the All In logo. Spacious interior with inner pocket. Ideal for conferences, events, and everyday use.',
    price: '$20',
    image: productHandbag
  },
  {
    icon: 'Package',
    name: 'Luxury Gift Bag',
    description: 'Premium crimson gift bag with gold accents and the All In logo. Features a patterned interior and sturdy rope handles. Perfect for corporate gifting and special occasions.',
    price: '$15',
    image: productGiftbag
  },
];

const fallbackServices = [
  {
    icon: 'Palette',
    title: 'Logo Design',
    description: 'Unique brand identities that capture your essence and resonate with your audience.',
  },
  {
    icon: 'VideoCamera',
    title: 'Event Video Editing',
    description: 'Professional video production and editing for corporate events and campaigns.',
  },
  {
    icon: 'MegaphoneSimple',
    title: 'Social Media Posters',
    description: 'Eye-catching graphics designed for maximum engagement across all platforms.',
  },
];

export default function ProductsServices() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realtime listeners so updates reflect immediately after admin changes
    const productsRef = collection(db, 'products');
    const servicesRef = collection(db, 'services');

    let firstProducts = true;
    let firstServices = true;

    const unsubscribeProducts = onSnapshot(productsRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(list.length > 0 ? list : fallbackProducts);
      if (firstProducts) {
        firstProducts = false;
        setLoading(false);
      }
    }, (error) => {
      console.error('Products listener error:', error);
      setProducts(fallbackProducts);
      setLoading(false);
    });

    const unsubscribeServices = onSnapshot(servicesRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
      setServices(list.length > 0 ? list : fallbackServices);
      if (firstServices) {
        firstServices = false;
      }
    }, (error) => {
      console.error('Services listener error:', error);
      setServices(fallbackServices);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeServices();
    };
  }, []);

  // Helper function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'Palette': Palette,
      'VideoCamera': VideoCamera,
      'MegaphoneSimple': MegaphoneSimple,
      'Printer': Printer,
      'Briefcase': Briefcase,
      'Camera': Camera,
      'Tote': Tote,
      'Coffee': Coffee,
      'TShirt': TShirt,
      'Watch': Watch,
      'Notebook': Notebook,
      'CaretRight': CaretRight,
      'Upload': Upload,
      'Umbrella': Umbrella,
      'Package': Package,
      'Wrench': Wrench
    };
    
    return iconMap[iconName] || Package;
  };

  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/250780111110', '_blank');
  };

  const handleInstagramContact = () => {
    window.open('https://instagram.com/allin_production', '_blank');
  };

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
              Products & Services
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              From custom branded products to creative media services, 
              we bring your brand vision to life with premium quality and attention to detail.
            </motion.p>
          </div>
        </section>

        {/* Products Gallery */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                Branded Products
              </h2>
              <p className="text-xl text-muted-foreground">
                High-quality promotional items that make lasting impressions
              </p>
            </AnimatedSection>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((product, index) => {
                  const IconComponent = product.icon ? getIconComponent(product.icon) : Package;
                  
                  return (
                    <AnimatedSection key={product.id || product.name} delay={index * 0.1}>
                      <GlassCard className="text-center group h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-2xl mb-6 flex-shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-4/5 h-48 object-contain mx-auto transform group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-48 bg-muted/20 rounded-2xl flex items-center justify-center">
                              <IconComponent size={48} className="text-primary group-hover:scale-110 transition-transform duration-300" weight="light" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-medium mb-3 text-foreground">
                            {product.name}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-1">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-light text-primary">
                              {product.price}
                            </span>
                          </div>
                          
                          <AppleButton 
                            onClick={handleWhatsAppOrder}
                            variant="primary"
                            size="sm"
                            className="w-full"
                          >
                            WhatsApp to Order
                          </AppleButton>
                        </div>
                      </GlassCard>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Creative Services */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="container mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                Creative Services
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive design and media solutions for your brand
              </p>
            </AnimatedSection>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service, index) => {
                  const IconComponent = service.icon ? getIconComponent(service.icon) : Wrench;
                  
                  return (
                    <AnimatedSection key={service.id || service.title} delay={index * 0.1}>
                      <GlassCard className="h-full">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                          <IconComponent size={32} className="text-primary" weight="light" />
                        </div>
                        
                        <h3 className="text-2xl font-medium mb-4 text-foreground">
                          {service.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </GlassCard>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto text-center">
            <AnimatedSection>
              <GlassCard className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Contact us today to discuss your project and get a custom quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AppleButton 
                    onClick={handleWhatsAppOrder}
                    variant="primary"
                    size="lg"
                  >
                    WhatsApp Us Now
                  </AppleButton>
                  <AppleButton 
                    onClick={handleInstagramContact}
                    variant="secondary"
                    size="lg"
                  >
                    Follow on Instagram
                  </AppleButton>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>📞 Call us: <a href="tel:+250780111110" className="text-primary hover:underline">+250 780 111 110</a></p>
                  <p>📱 WhatsApp: <a href="https://wa.me/250780111110" className="text-primary hover:underline">+250 780 111 110</a></p>
                  <p>📸 Instagram: <a href="https://instagram.com/allin_production" className="text-primary hover:underline">@allin_production</a></p>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}