"use client";
import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';

const About = () => {
  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Left side: Logo */}
          <motion.div 
            className="w-full md:w-5/12 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Blobs to match the design aesthetics behind the logo */}
              <motion.div 
                className="absolute -left-12 top-0 w-24 h-24 bg-blue-200 rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-sm opacity-80 z-0"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-8 -right-8 w-16 h-16 bg-blue-100 rounded-full opacity-80 z-0"
                animate={{ 
                  scale: [1, 1.1, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              ></motion.div>
              
              <img 
                src={logo} 
                alt="Glozon FinTax & Advisory Logo" 
                className="w-full max-w-[280px] object-contain relative z-10"
              />
            </div>
          </motion.div>

          {/* Right side: Content */}
          <motion.div 
            className="w-full md:w-7/12 text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
              Discover <span className="text-green-500">Glozon</span> <span className="text-blue-500">FinTax</span> & <span className="text-yellow-500">Advisory</span>
            </h2>
            <div className="text-gray-600 space-y-6 text-lg">
              <p>
                Glozon FinTax & Advisory We are a professional accounting, taxation, and financial advisory firm providing reliable and cost-effective solutions to businesses across Nepal, Australia, India, and the UAE. Our team of qualified accountants and advisors specializes in bookkeeping, tax compliance, payroll management, financial reporting, and business advisory services. We help businesses maintain compliance, improve financial visibility, and make informed decisions.
              </p>
              <p>
                With a strong focus on accuracy, confidentiality, and client satisfaction, we deliver tailored solutions to startups, SMEs, and established enterprises. Our mission is to be a trusted financial partner, supporting sustainable growth through expertise, integrity, and practical business insight.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
