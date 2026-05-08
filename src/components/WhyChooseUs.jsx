"use client";
import { motion } from 'framer-motion';
import whyChooseUsImg from '../assets/Why-choose-us-150x150.png';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Elite Professional Talent",
      description: "Your accounts are managed by a highly skilled team of FCA, CA, ACCA, CPA, and MBA qualified professionals. Our experts possess deep knowledge of Australian tax laws (ITR, CTR, BAS, FBT) and ATO/ASIC compliance requirements.",
      color: "text-green-500",
      borderColor: "border-green-500",
      icon: "fi fi-rr-users-alt",
      delay: 0.1
    },
    {
      title: "Advanced Cloud Expertise",
      description: "we are specialists in leading cloud accounting platforms, including Xero, QuickBooks Online, MYOB, Zoho Books, and BGL. We utilize AI-powered tools for faster, more accurate reconciliations.",
      color: "text-blue-500",
      borderColor: "border-blue-500",
      icon: "fi fi-rr-headset",
      delay: 0.2
    },
    {
      title: "Security & Data Privacy",
      description: "We prioritize confidentiality with strict NDA provisions aligned with Australian Privacy Principles, secure VPNs, and encrypted file-sharing protocols.",
      color: "text-yellow-500",
      borderColor: "border-yellow-500",
      icon: "fi fi-rr-shield-check",
      delay: 0.3
    },
    {
      title: "The Time-Zone Advantage",
      description: "Located in Nepal (GMT +5:45), we provide a unique \"work while you sleep\" advantage. This allows for same-day turnaround on urgent tasks and ensures strict deadlines are met without delay.",
      color: "text-green-500",
      borderColor: "border-green-500",
      icon: "fi fi-rr-clock-three",
      delay: 0.4
    },
    {
      title: "Significant Cost Efficiency",
      description: "Our outsourcing model allows you to reduce operational overheads by 50–60% compared to local hiring. You pay only for the work delivered through flexible hourly, per-client, or fixed-fee structures.",
      color: "text-blue-500",
      borderColor: "border-blue-500",
      icon: "fi fi-rr-piggy-bank",
      delay: 0.5
    },
    {
      title: "Proven Compliance Record",
      description: "We maintain a \"zero or minimal compliance error\" standard for all statutory lodgments. Our financials are audit-ready, providing clean records for smooth internal and external reviews.",
      color: "text-orange-500",
      borderColor: "border-orange-500",
      icon: "fi fi-rr-chart-line-up",
      delay: 0.6
    }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-bl-full -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-tr-full -z-10 opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.img 
            src={whyChooseUsImg} 
            alt="Why Choose Us" 
            className="w-28 h-28 object-contain mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-orange-500 uppercase tracking-wider">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-orange-500 mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: reason.delay }}
            >
              {/* Highlight bar at the top */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 ${reason.color.replace('text-', 'bg-')} rounded-full transition-all duration-300 group-hover:w-24`}></div>
              
              <h3 className={`text-[16px] font-extrabold mb-4 mt-6 uppercase ${reason.color} tracking-wide flex flex-col items-center gap-3`}>
                <i className={`${reason.icon} text-4xl mb-2`}></i>
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed md:text-base">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
