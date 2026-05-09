"use client";
import { motion } from 'framer-motion';
const james = '../assets/James Jorden.jpg';
const halen =  '../assets/Halen Brook.jpg';
const david = '../assets/David Boom.jpg';
const kiara =  '../assets/Kiara Cramen.jpg';
const rayan = '../assets/Rayan Morgan.jpg';
const mark =  '../assets/Mark Rogan.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      name: "James Jorden",
      role: "CEO, Tech Innovations Inc.",
      image: james,
      review: "Glozon FinTax was instrumental in optimizing our tax strategy. Their expertise and insights made a significant difference to our bottom line!"
    },
    {
      name: "Kiara Cramen",
      role: "Partner, Innovative Ventures LLC.",
      image: kiara,
      review: "The strategic insights from Glozon FinTax helped us unlock new growth opportunities. Highly recommend!"
    },
    {
      name: "Halen Brook",
      role: "CFO, Retail Solutions Ltd.",
      image: halen,
      review: "The team at Glozon FinTax provided exceptional support during our audit process, making it seamless and stress-free!"
    },
    {
      name: "Rayan Morgan",
      role: "Finance Director, E-commerce Systems Inc.",
      image: rayan,
      review: "Their knowledge of local and international regulations is unmatched. We feel secure having them on our side!"
    },
    {
      name: "David Boom",
      role: "Managing Director, Global Logistics Co.",
      image: david,
      review: "I am impressed with the professionalism and dedication of Glozon FinTax. They truly care about our success!"
    },
    {
      name: "Mark Rogan",
      role: "HR Director, Manufacturing Corp.",
      image: mark,
      review: "Glozon FinTax helped us build a robust finance team through their specialized recruitment services. A game changer for us!"
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-4">Client Testimonials</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Discover what our satisfied clients have to say about our services and how we've helped their businesses succeed.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 relative group"
            >
              <div className="mb-6 relative z-10">
                <span className="text-6xl text-blue-100 absolute -top-6 -left-4 font-serif group-hover:text-blue-200 transition-colors">"</span>
                <p className="text-gray-600 italic relative z-10 pt-2 leading-relaxed">
                  {testimonial.review}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-200 rounded-full blur group-hover:blur-md transition-all"></div>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-white relative z-10 shadow-sm"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
                  <p className="text-sm text-pink-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
