"use client";
import React from 'react';
import { motion } from 'framer-motion';
const vectorImg = '../assets/Global Payroll Administration.jpg';

const PayrollProcessingAdministration = () => {
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
              PAYROLL PROCESSING & <br className="hidden lg:block" /> ADMINISTRATION
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-md mx-auto lg:mx-0 mb-8"
            >
              <motion.img 
                src={vectorImg} 
                alt="Payroll Processing & Administration" 
                className="w-full h-auto object-cover rounded-lg drop-shadow-md"
                whileHover={{ scale: 1.05, translateY: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>

            <div className="text-gray-600 text-[15px] leading-relaxed max-w-lg space-y-4">
              <p>
                We provide accurate and reliable payroll processing services, including salary calculations, statutory deductions, and net pay preparation in accordance with applicable regulations.
              </p>
              <p>
                Our services include management of statutory compliance such as payroll tax, superannuation, and Social Security Fund (SSF) contributions. We generate compliant payslips and detailed payroll reports while maintaining proper employee leave records, reconciliations, and documentation.
              </p>
              <p>
                Our structured processes ensure payroll is processed on time with strict confidentiality, accuracy, and full compliance with regulatory requirements, helping businesses maintain efficient payroll operations and meet their legal obligations.
              </p>
            </div>
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
                <h3 className="text-xl font-bold text-green-600 mb-3">Payroll Processing & Administration</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We provide complete payroll management services including salary structuring, gross-to-net calculations, payslip preparation, payroll reporting, and fund disbursement. Our services ensure accurate, timely, and confidential payroll processing aligned with organizational policies and local regulations across Nepal, Australia, and India.
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
                <h3 className="text-xl font-bold text-blue-500 mb-3">Statutory Compliance & Payroll Tax Filings</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We manage all payroll-related statutory obligations including STP reporting (Australia), payroll tax filings, withholding tax compliance, and regulatory submissions. Our team ensures full compliance with local tax authorities, minimizing compliance risks and avoiding penalties.
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
                <h3 className="text-xl font-bold text-orange-500 mb-3">Social Security & Contribution Compliance</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We ensure accurate calculation, reporting, and compliance with mandatory social security contributions including SSF (Nepal), Superannuation (Australia), and applicable pension or insurance schemes in India. We help businesses remain compliant while maintaining proper documentation and reporting standards.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessingAdministration;
