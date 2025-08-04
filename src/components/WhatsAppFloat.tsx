import React from 'react';
import { WhatsappLogo } from 'phosphor-react';
import { motion } from 'framer-motion';

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/250780111110', '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
    >
      <WhatsappLogo size={24} weight="fill" />
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-black/80 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        WhatsApp Us
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
    </motion.button>
  );
}