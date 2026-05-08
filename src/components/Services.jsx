"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import img1 from '../assets/Managed-Accounting-Financial-Reporting-Vector-image1-scaled.jpg';
import img2 from '../assets/Taxation & Regulatory Advisory.jpg';
import img3 from '../assets/Audit Support & Assurance.jpg';
import img4 from '../assets/Corporate Secretarial & Entity Formation.jpeg';
import img5 from '../assets/Global Payroll Administration.jpg';
import img6 from '../assets/Strategic Advisory & Corporate Finance.jpg';

const Services = () => {
  const services = [
    {
      title: "Managed Accounting & Financial Reporting",
      image: img1,
      description: "We provide detailed and scalable accounting solutions, ensuring your books are always accurate and compliant with international standards.",
      path: "/services/accounting-financial-reporting"
    },
    {
      title: "Taxation & Regulatory Advisory",
      image: img2,
      description: "Our expert team navigates the complexities of tax regulations, providing proactive strategies to minimize your liabilities while ensuring compliance.",
      path: "/services/taxation-regulatory-advisory"
    },
    {
      title: "Audit Support & Assurance",
      image: img3,
      description: "We offer seamless audit support, bridging the gap between your records and auditor expectations to ensure a smooth assurance process.",
      path: "/services/audit-support-assurance"
    },
    {
      title: "Corporate Secretarial & Entity Formation",
      image: img4,
      description: "Let us handle the administrative and legal requirements of your business formation, allowing you to focus on your growth objectives.",
      path: "/services/corporate-secretarial"
    },
    {
      title: "Payroll Processing & Administration",
      image: img5,
      description: "Our payroll services ensure that your workforce is compensated accurately and on time, maintaining compliance with local regulations.",
      path: "/services/payroll-processing"
    },
    {
      title: "Strategic Advisory & Corporate Finance",
      image: img6,
      description: "Unlock capital and drive expansion through our sophisticated financial modeling and strategic insights tailored for your business.",
      path: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-6">Our Services</h2>
          <p className="text-gray-600 text-lg">
            Discover our comprehensive suite of services designed to drive your business forward and ensure financial integrity.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="h-64 overflow-hidden p-6 flex justify-center items-center bg-blue-50/50 relative">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-blue-100/50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>
                
                <motion.img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-48 h-48 object-cover rounded-full shadow-md relative z-10 bg-white"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow text-center relative z-10 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-4 h-14 flex items-center justify-center">{service.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
                <Link 
                  href={service.path || "#"} 
                  className="inline-block bg-pink-600 text-white font-medium py-3 px-6 rounded-md hover:bg-pink-700 transition-colors w-full shadow-md text-center hover:scale-105 active:scale-95 duration-200"
                >
                  Learn More About Our Services
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
