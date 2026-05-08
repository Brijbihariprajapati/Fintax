
"use client";
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import MissionStatement from '../components/MissionStatement';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <MissionStatement />
      <Testimonials />
    </>
  );
}
