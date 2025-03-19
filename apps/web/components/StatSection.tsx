"use client"

import { useRef, useEffect } from "react";

const stats = [
  { number: "99.99%", label: "Average Uptime" },
  { number: "15s", label: "Alert Time" },
  { number: "30+", label: "Global Locations" },
  { number: "24/7", label: "Support" },
];

const StatSection = () => {
  const statRef = useRef<HTMLDivElement>(null);

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

    const statElement = statRef.current;
    if (statElement) {
      const revealElements = statElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (statElement) {
        const revealElements = statElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div ref={statRef} className="py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="bg-primary rounded-2xl overflow-hidden relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-foreground/10 opacity-80"></div>
          
          <div className="relative z-10 py-16 px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance mb-6 reveal">
                Industry-leading performance and reliability
              </h2>
              <p className="text-xl text-white/80 reveal stagger-1">
                We take pride in our platform's exceptional performance metrics.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center reveal"
                  style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatSection;
