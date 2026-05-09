"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const missionBg =  '../assets/mission.jpg';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-pink-600">{count}</span>;
};

const MissionStatement = () => {
  const stats = [
    {
      target: 128,
      text: "Providing exceptional financial services designed for your growth and peace of mind.",
      delay: 0.1
    },
    {
      target: 87,
      text: "Empowering businesses with strategic insights and compliance support.",
      delay: 0.2
    },
    {
      target: 37,
      text: "Building long-term relationships based on trust and excellent service.",
      delay: 0.3
    },
    {
      target: 55,
      text: "Fostering a culture of continuous improvement and innovation in financial practices.",
      delay: 0.4
    }
  ];

  return (
    <div 
      className="relative py-24 md:py-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${missionBg})` }}
    >
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* Left Side */}
          <motion.div 
            className="lg:w-5/12 text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Our Mission Statement</h2>
            <div className="w-16 h-1 bg-pink-600 mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed font-light">
              Providing exceptional financial services designed for your growth and peace of mind.
            </p>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded shadow-lg transition-colors"
            >
              Read The Rest Of Mission
            </motion.a>
          </motion.div>

          {/* Right Side - Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-xl text-center shadow-2xl border border-white/20 group"
              >
                <div className="mb-4">
                  <Counter target={stat.target} />
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
