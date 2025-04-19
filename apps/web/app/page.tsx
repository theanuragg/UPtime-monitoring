"use client";

import { useEffect } from "react";

import Hero from "@components/Hero";

import Footer from "@components/Footer";
import { Toaster } from "@components/ui/toaster";
import Dashboard from "@components/dashboard";
import HowItWorks from "@components/Howitwork";
import FeatureSection from "@components/Features";
import Analytics from "../components/featurecard2";
import FaqSection from "@components/FAQ";

const Page = () => {
  useEffect(() => {
   
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
      <main>
        <Hero />
        <Dashboard />
        <HowItWorks />
        <FeatureSection />
        <Analytics />
        <FaqSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Page;
