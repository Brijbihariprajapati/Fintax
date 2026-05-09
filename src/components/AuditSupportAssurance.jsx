"use client";
import React from 'react';
import { motion } from 'framer-motion';
const vectorImg = '../assets/Audit Support & Assurance.jpg';

const AuditSupportAssurance = () => {
  return (
    <div className="bg-white min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column */}
          <motion.div 
            className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-12 h-1 bg-pink-400 mb-6 rounded-full hidden lg:block"></div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-orange-500 uppercase tracking-wide mb-6 leading-tight">
              Audit Support & <br className="hidden lg:block" /> Assurance
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-lg">
              We bridge the gap between your internal records and external auditor expectations, ensuring a seamless and stress-free assurance process.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <motion.img 
                src={vectorImg} 
                alt="Audit Support & Assurance" 
                className="w-full h-auto object-contain drop-shadow-md"
                whileHover={{ scale: 1.05, translateY: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </motion.div>

          {/* Right Column (List) */}
          <motion.div 
            className="w-full lg:w-7/12 flex flex-col gap-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Item 1 */}
            <motion.div 
              className="flex gap-6 items-start group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full border-2 border-pink-400 flex items-center justify-center bg-white group-hover:bg-pink-50 transition-colors shadow-sm">
                  <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl font-bold text-green-600 mb-3">Audit Liaison & Assistance</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We facilitate the audit process by preparing necessary schedules, reconciling accounts, and acting as the primary point of contact for external auditors.
                </p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              className="flex gap-6 items-start group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full border-2 border-pink-400 flex items-center justify-center bg-white group-hover:bg-pink-50 transition-colors shadow-sm">
                  <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl font-bold text-blue-500 mb-3">Quality Assurance & Compliance Reviews</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Our team performs deep-dive reviews of your accounting records to identify systemic errors, mitigate risks, and strengthen internal controls.
                </p>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              className="flex gap-6 items-start group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full border-2 border-pink-400 flex items-center justify-center bg-white group-hover:bg-pink-50 transition-colors shadow-sm">
                  <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-xl font-bold text-orange-500 mb-3">Due Diligence</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We conduct rigorous financial investigations and appraisals for mergers, acquisitions, or investment opportunities, providing you with a clear picture of financial health and risk.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuditSupportAssurance;
