"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gfaLogo from '../assets/GFA Stamp.png';
import headerBanner from '../assets/homepage banner.3.jpg';

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { name: "Accounting & Financial Reporting", path: "/services/accounting-financial-reporting" },
    { name: "Taxation & Regulatory Advisory", path: "/services/taxation-regulatory-advisory" },
    { name: "Audit Support & Assurance", path: "/services/audit-support-assurance" },
    { name: "Corporate Secretarial & Entity Formation", path: "/services/corporate-secretarial" },
    { name: "Payroll Processing & Administration", path: "/services/payroll-processing" },
    { name: "Strategic Advisory & Corporate Finance", path: "/services/strategic-advisory" },
    { name: "Human Capital & Professional Development", path: "/services/human-capital-professional-development" }
  ];

  return (
    <header className="relative w-full h-32 md:h-40 overflow-visible z-50">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={headerBanner} 
          alt="Header Banner" 
          className="w-full h-full object-cover object-top"
        />
        {/* Optional overlay if needed to make the navbar pop */}
        <div className="absolute inset-0 bg-blue-500/10"></div>
      </div>

      {/* Navbar Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
        <nav className="bg-white shadow-lg flex justify-between items-center py-2 px-4 rounded-sm">
          {/* Logo */}
          <motion.Link 
            href="/" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={gfaLogo} alt="GFA Logo" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
          </motion.Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-6 items-center text-gray-800 font-bold text-[14px] uppercase tracking-wide">
            <Link href="/" className="hover:text-blue-600 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center hover:text-blue-600 transition-colors py-2 uppercase font-bold"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-lg border-t-2 border-blue-600 overflow-hidden normal-case font-normal"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <ul className="py-2">
                      {services.map((service, index) => (
                        <motion.li 
                          key={index}
                          whileHover={{ x: 5 }}
                        >
                          <Link href={service.path} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => setIsServicesOpen(false)}>
                            {service.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/" className="hover:text-blue-600 transition-colors relative group">
              Career
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact-us" className="text-pink-500 hover:text-pink-600 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/" className="hover:text-blue-600 transition-colors relative group">
              Client Onboarding
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Email Icon */}
            <a href="mailto:gfa@glozonfintax.com" className="text-gray-600 hover:text-blue-600 transition-colors ml-2" title="Email Us">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/company/116813946/admin/page-posts/published/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors ml-2" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            {/* Facebook Icon */}
            <a href="https://www.facebook.com/share/1NRJt4x14p/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors ml-2" title="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Email Icon */}
            <a href="mailto:gfa@glozonfintax.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden shadow-lg z-40"
          >
            <div className="px-4 py-4 space-y-2 uppercase text-sm font-bold tracking-wide">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Home</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">About</Link>
              
              <div className="px-3 py-2">
                <div className="text-blue-600 mb-2">Services</div>
                <div className="pl-4 space-y-2 border-l-2 border-blue-100 normal-case font-normal">
                  {services.map((service, index) => (
                    <Link key={index} href={service.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-gray-600 hover:text-blue-600">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Career</Link>
              <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-md">Contact</Link>
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Client Onboarding</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
