"use client";
import React from 'react';
import { motion } from 'framer-motion';
import contactImg from '../assets/contactus.jpg';
import bannerImg from '../assets/homepage banner.3.jpg';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate workable send button
    alert('Message sent successfully! Admin will get this information.');
  };

  return (
    <>
      <section className="py-16 bg-white" id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Top Heading */}
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 uppercase tracking-wider"
          >
            Contact Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={contactImg} 
              alt="Contact Us Illustration" 
              className="mx-auto w-[300px] h-[234px] object-contain"
            />
          </motion.div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start">
          
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col space-y-10 items-center md:items-start text-center md:text-left mt-8"
          >
            {/* Address */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-red-500 font-bold text-lg mb-2">Address</h3>
              <p className="text-gray-700 text-sm max-w-xs text-center">Changathali 07, Mahalaxmi, Lalitpur, Kathmandu Valley, Nepal</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="text-green-500 font-bold text-lg mb-2">Phone</h3>
              <p className="text-gray-700 text-sm">+977 9845 97 1220</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">Email</h3>
              <a href="mailto:gfa@glozonfintax.com" className="text-blue-500 text-sm hover:underline">gfa@glozonfintax.com</a>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col mt-8"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase text-center md:text-left">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input 
                type="text" 
                placeholder="Full Name Surname" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <input 
                type="tel" 
                placeholder="Mobile" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <input 
                type="text" 
                placeholder="Subject" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <textarea 
                placeholder="Message:" 
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y text-sm"
              ></textarea>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  className="px-8 py-2 border border-pink-500 text-gray-800 font-medium hover:bg-pink-50 transition-colors uppercase tracking-wide text-sm rounded-sm"
                >
                  SEND
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="w-full relative h-[450px] border border-gray-200"
        >


          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.216345869274!2d85.34796695!3d27.65376175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb110d5142fb21%3A0xc8948a24aae2e25f!2sGlozon%20Business%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1715600000000!5m2!1sen!2snp" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Glozon FinTax Location Map"
          ></iframe>
        </motion.div>

        </div>
      </section>
    </>
  );
};

export default Contact;
