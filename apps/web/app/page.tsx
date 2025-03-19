'use client'

import { useEffect } from "react";
import Navbar from "@components/Appbar";
import Hero from "@components/Hero";
import Features from "@components/Features";
import TestimonialSection from "@components/TestimonialSection";
import PricingSection from "@components/PricingSection";
import StatSection from "@components/StatSection";
import CTASection from "@components/CTAsection";
import Footer from "@components/Footer";
import { Toaster } from "@components/ui/toaster";


const Page = () => {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the reveal class
    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      // Cleanup
      document.querySelectorAll(".reveal").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <StatSection />
        <TestimonialSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Page;