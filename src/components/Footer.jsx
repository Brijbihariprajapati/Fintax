"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: About */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-orange-500 mb-6 tracking-wide"><span style={{color: '#036B09'}}>Glozon</span> <span style={{color: '#2A17B4'}}>FinTax</span> & <span style={{color: '#FFAB09'}}>Advisory</span></h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Glozon FinTax & Advisory (GFA) is a premier financial and taxation consultancy firm headquartered in Lalitpur, Nepal. We specialize in providing comprehensive offshore and outsourced services tailored specifically for firms and clients in Australia, India, Dubai and Nepal.
            </p>
            <div className="flex gap-4">
              {[
                { id: 'f', icon: 'fi fi-brands-facebook', color: 'bg-blue-600 hover:bg-blue-500', href: 'https://www.facebook.com/share/1NRJt4x14p/' },
                { id: 'in', icon: 'fi fi-brands-linkedin', color: 'bg-blue-400 hover:bg-blue-300', href: 'https://www.linkedin.com/company/116813946/admin/page-posts/published/' },
                { id: 'g', icon: 'fi fi-brands-google', color: 'bg-red-600 hover:bg-red-500', href: '#' },
                { id: 'mail', icon: 'fi fi-rr-envelope', color: 'bg-gray-600 hover:bg-gray-500', href: 'mailto:gfa@glozonfintax.com' }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors shadow-lg ${social.color}`}
                >
                  <i className={`${social.icon} text-lg leading-none mt-1`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Important Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:ml-12"
          >
            <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Important Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/' },
                { name: 'Services', path: '/' },
                { name: 'Careers', path: '/career' },
                { name: 'Contact', path: '/contact-us' }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className="hover:text-orange-500 transition-colors flex items-center group">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"></span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Our Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Our Services</h3>
            <ul className="space-y-4">
              {[
                { name: 'Accounting & Financial Reporting', path: '/services/accounting-financial-reporting' },
                { name: 'Audit Support & Assurance', path: '/services/audit-support-assurance' },
                { name: 'Corporate Secretarial', path: '/services/corporate-secretarial' },
                { name: 'Human Capital & Professional Development', path: '/services/human-capital-professional-development' },
                { name: 'Payroll Processing', path: '/services/payroll-processing' },
                { name: 'Strategic Advisory', path: '/services/strategic-advisory' },
                { name: 'Taxation & Regulatory Advisory', path: '/services/taxation-regulatory-advisory' }
              ].map((service, index) => (
                <li key={index}>
                  <Link href={service.path} className="hover:text-orange-500 transition-colors flex items-center group">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"></span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Glozon FinTax & Advisory. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
