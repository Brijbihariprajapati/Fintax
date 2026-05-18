"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
const heroImage = '../assets/Managed-Accounting-Financial-Reporting.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [heroImage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 1000); // 1 second transition
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide]?.src || slides[currentSlide]}
            alt={`Banner ${currentSlide + 1}`}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span style={{color: '#036B09'}}>Glozon</span> <span style={{color: '#2A17B4'}}>FinTax</span> & Advisory – Excellence In Global Finance & Taxation
          </h1>
          
          <motion.p 
            className="text-lg sm:text-xl mb-10 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Glozon FinTax & Advisory (GFA) is a premier financial and taxation consultancy firm headquartered in Lalitpur, Nepal. We specialize in providing comprehensive offshore and outsourced services tailored specifically for firms and clients in Australia, India, Dubai and Nepal.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-md transition-colors text-center shadow-lg cursor-pointer"
              >
                Get Started Today
              </motion.div>
            </Link>
            <Link href="/contact-us">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-950 text-white font-medium py-3 px-8 rounded-md transition-colors text-center cursor-pointer"
              >
                Contact Us
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
