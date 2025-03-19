"use client"

import { useEffect, useRef } from "react";
import { Button } from "@components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

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

    const heroElement = heroRef.current;
    if (heroElement) {
      const revealElements = heroElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (heroElement) {
        const revealElements = heroElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={elementsRef} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary reveal">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Monitor your services in real-time</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance reveal stagger-1">
              Know when your services are <br className="hidden sm:block" /> 
              <span className="text-primary">down before</span> your users do.
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl text-balance reveal stagger-2">
              Real-time monitoring and alerting for all your critical services. Get notified immediately when something goes wrong.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 reveal stagger-3">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white transition-all duration-300">
                Start monitoring for free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="transition-all duration-300">
                Book a demo
              </Button>
            </div>
            
            <div className="pt-4 reveal stagger-4">
              <p className="text-sm text-muted-foreground mb-3">Trusted by leading companies worldwide</p>
              <div className="flex flex-wrap items-center gap-8">
                {["Acme Inc", "Globex", "Soylent", "Initech", "Umbrella"].map((company) => (
                  <span key={company} className="text-foreground/40 text-sm font-semibold">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="reveal stagger-5">
            <div className="relative bg-white/80 backdrop-blur-md shadow-xl border border-border rounded-xl p-6 animate-float">
              <div className="absolute -right-3 -top-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                All systems operational
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b border-border pb-2">Service Status</h3>
                
                {[
                  { name: "API Gateway", uptime: "99.999%", status: "operational" },
                  { name: "Authentication Service", uptime: "99.95%", status: "operational" },
                  { name: "Database Cluster", uptime: "99.98%", status: "operational" },
                  { name: "Media Storage", uptime: "99.99%", status: "operational" },
                  { name: "Payment Processing", uptime: "100%", status: "operational" },
                ].map((service, i) => (
                  <div key={service.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground mr-2">{service.uptime}</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;