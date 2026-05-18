"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MissionStatement from './MissionStatement';

// Assets

const logo = '../assets/Logo.png';
const headerBg = '../assets/navbarbackground.jpg';
const ramanImg = '/assets/Raman.png';
const roshanImg = '/assets/rosdan.png';
const krishnaImg = '/assets/krishna.png';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}

      
      {/* 1. Discover Section */}
      <section className="py-20 lg:py-28 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Left side: Content */}
          <motion.div 
            className="w-full md:w-7/12 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
              Discover <span style={{color: '#036B09'}}>Glozon</span> <span style={{color: '#2A17B4'}}>FinTax</span> & <span style={{color: '#FFAB09'}}>Advisory</span>
            </h2>
            <div className="text-gray-600 space-y-6 text-lg">
              <p>
                Glozon FinTax & Advisory is a professional accounting, taxation, and financial advisory firm providing reliable, accurate, and cost-effective solutions to businesses and individuals globally. Our team consists of Chartered Accountants, ACCA professionals, and experienced finance specialists committed to delivering high-quality financial services.
              </p>
              <p>
                We offer comprehensive solutions including accounting and bookkeeping, payroll management, taxation compliance, financial reporting, and business advisory. We have strong expertise in Australian accounting and taxation, supporting clients with Company Tax Returns, Individual Tax Returns, BAS, IAS, and payroll compliance.
              </p>
              <p>
                We are dedicated to building long-term partnerships by providing dependable services, ensuring compliance, and delivering strategic financial guidance to support sustainable business growth and success worldwide.
              </p>
            </div>
          </motion.div>

          {/* Right side: Logo */}
          <motion.div 
            className="w-full md:w-5/12 flex justify-center md:justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Glozon FinTax & Advisory Logo" 
                className="w-full max-w-[320px] object-contain relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Three Features Section */}
      <section className="py-12 bg-white container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Feature 1 */}
          <motion.div 
            className="flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 text-3xl font-light mb-2 flex items-center gap-4 w-full justify-center">
               <span className="w-12 h-[2px] bg-pink-200"></span> 01 <span className="w-12 h-[2px] bg-pink-200"></span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Team</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Our team consists of certified professionals with years of experience in accounting and advisory services, ensuring the highest standards of excellence.
            </p>
            <Link href="/services">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm uppercase tracking-wide">
                Learn More About Our Services
              </button>
            </Link>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-gray-400 text-3xl font-light mb-2 flex items-center gap-4 w-full justify-center">
               <span className="w-12 h-[2px] bg-pink-200"></span> 02 <span className="w-12 h-[2px] bg-pink-200"></span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tailored Solutions</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              We customize our services to meet the specific needs of each client, delivering targeted strategies that drive success.
            </p>
            <Link href="/services">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm uppercase tracking-wide">
                Learn More About Our Services
              </button>
            </Link>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-gray-400 text-3xl font-light mb-2 flex items-center gap-4 w-full justify-center">
               <span className="w-12 h-[2px] bg-pink-200"></span> 03 <span className="w-12 h-[2px] bg-pink-200"></span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Support</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              From initial consultation to ongoing support, we are with you every step of the way, ensuring your financial health.
            </p>
            <Link href="/services">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm uppercase tracking-wide">
                Learn More About Our Services
              </button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. Mission Statement Banner */}
      <MissionStatement />

      {/* 4. Why Choose Us (About Page Specific Layout) */}
      <section className="py-24 bg-white container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-6">Why Choose Us?</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Choosing the right financial partner is about more than just balancing books—it’s about gaining a competitive edge. Here is why businesses in Nepal, Australia, India, and the UAE trust us with their growth
            </p>
          </div>
          
          {/* Right Column (List) */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Jurisdictional Expertise</h3>
              <p className="text-gray-600">We navigate the unique regulatory landscapes of four different regions, ensuring your business stays compliant whether you are a local startup or a global enterprise.</p>
            </div>
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Client-Centric Approach</h3>
              <p className="text-gray-600">We put our clients at the center of everything we do, ensuring personalized service and tailored solutions.</p>
            </div>
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Expertise</h3>
              <p className="text-gray-600">We put our clients at the center of everything we do, ensuring personalized service and tailored solutions.</p>
            </div>
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Precision & Integrity</h3>
              <p className="text-gray-600">Accuracy is our baseline. We employ rigorous internal controls and quality checks so you can rest easy knowing your financial data is audit-ready and error-free.</p>
            </div>
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Growth Focus</h3>
              <p className="text-gray-600">We don't just report on the past; we help you plan for the future. Our Virtual CFO and advisory services turn "dry numbers" into actionable business intelligence.</p>
            </div>
            <div className="border-t-[3px] border-pink-500 pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technology-Driven Approach</h3>
              <p className="text-gray-600">We leverage modern accounting software and cloud-based tools to provide real-time visibility into your financial health, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet Our Expert Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 uppercase">Meet Our Expert Team</h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">"The Powerhouse Behind Your Financial Success"</h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              At Glozon FinTax Advisory, our strength lies in our people. We have assembled a powerhouse team of seasoned professionals who bring a wealth of international experience and a passion for financial precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full aspect-square overflow-hidden bg-gray-200">
                <img src={ramanImg} alt="Raman Dipsakhi" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Raman Dipsakhi</h3>
                <p className="text-blue-600 font-medium mb-4">FCA & Founder</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Raman Dipsakhi is a Fellow Chartered Accountant and Founder specializing in strategic tax planning, FBT, corporate compliance, and ATO lodgements. He provides proactive advisory solutions to businesses and individuals, ensuring regulatory compliance while optimizing tax outcomes. His leadership drives professional excellence, integrity, and long-term client success.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full aspect-square overflow-hidden bg-gray-200">
                <img src={roshanImg} alt="Roshan Panjiyar" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Roshan Panjiyar</h3>
                <p className="text-blue-600 font-medium mb-4">Chartered Accountant</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Roshan Panjiyar is a Chartered Accountant with expertise in BAS/GST reconciliation, credit assessment, and financial analysis. He ensures accuracy in financial reporting and supports informed business decisions through detailed analysis. Roshan is committed to compliance, transparency, and delivering reliable accounting solutions tailored to client needs.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-full aspect-square overflow-hidden bg-gray-200">
                <img src={krishnaImg} alt="Krishna Rijal" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Krishna Rijal, MBA, CPA</h3>
                <p className="text-blue-600 font-medium mb-4">Accounting Professional</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Krishna Rijal is an MBA and CPA-qualified accounting professional specializing in bank reconciliations, ITR, CTR, BAS preparation, and ATO compliance. He ensures accurate record supervision and timely regulatory reporting. Krishna is dedicated to maintaining financial integrity, compliance, and efficient accounting systems for businesses.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
