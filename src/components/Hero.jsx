"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { publicAsset } from "@/lib/publicAsset";

const SLIDE_INTERVAL_MS = 6000;

const SLIDES = [
  { file: "WhatsApp.jpeg", alt: "Glozon FinTax — global finance and taxation" },
  { file: "homepage banner.1.jpg", alt: "Glozon FinTax advisory services" },
  { file: "homepage banner.2.jpg", alt: "Glozon FinTax offshore solutions" },
  { file: "homepage banner.3.jpg", alt: "Glozon FinTax excellence in taxation" },
].map(({ file, alt }) => ({ src: publicAsset(file), alt }));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = SLIDES.length;

  const goToSlide = useCallback((index) => {
    setCurrentSlide(((index % slideCount) + slideCount) % slideCount);
  }, [slideCount]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (slideCount <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slideCount]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-blue-950">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover object-center"
            fetchPriority={currentSlide === 0 ? "high" : "auto"}
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent z-10" />

      {slideCount > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentSlide ? "true" : undefined}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === currentSlide ? "w-8 bg-pink-500" : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}

      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goToSlide(currentSlide - 1)}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-2xl text-white backdrop-blur-sm hover:bg-black/50 md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-2xl text-white backdrop-blur-sm hover:bg-black/50 md:right-6"
          >
            ›
          </button>
        </>
      )}

      <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span style={{ color: "#036B09" }}>Glozon</span>{" "}
            <span style={{ color: "#2A17B4" }}>FinTax</span> & Advisory – Excellence In Global
            Finance & Taxation
          </h1>

          <motion.p
            className="text-lg sm:text-xl mb-10 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Glozon FinTax & Advisory (GFA) is a premier financial and taxation consultancy firm
            headquartered in Lalitpur, Nepal. We specialize in providing comprehensive offshore and
            outsourced services tailored specifically for firms and clients in Australia, India,
            Dubai and Nepal.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/client-onboarding">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-md transition-colors text-center shadow-lg cursor-pointer"
              >
                Get Started Today
              </motion.div>
            </Link>
            <Link href="/contact-us">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-950 text-white font-medium py-3 px-8 rounded-md transition-colors text-center cursor-pointer"
              >
                Contact Us
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
