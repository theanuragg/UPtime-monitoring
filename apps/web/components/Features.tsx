"use client"

import { useRef, useEffect } from "react";
import { BellRing, Zap, Shield,  Server, Smartphone,  Clock } from "lucide-react";

const features = [
  {
    icon: <BellRing className="h-6 w-6" />,
    title: "Instant Alerts",
    description: "Get notified immediately when any of your services go down or experience issues.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Our monitoring system checks your services every 10 seconds from multiple locations.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Private",
    description: "End-to-end encryption ensures your data and monitoring results remain private.",
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Global Coverage",
    description: "Monitor from 30+ locations around the world for accurate, region-specific insights.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Ready",
    description: "Get alerts and check status from anywhere with our mobile apps and responsive design.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Historical Data",
    description: "Track performance over time with detailed historical data and custom reports.",
  },
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    const featuresElement = featuresRef.current;
    if (featuresElement) {
      const revealElements = featuresElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (featuresElement) {
        const revealElements = featuresElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div id="features" ref={featuresRef} className="py-24 bg-secondary/50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4 reveal">
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6 reveal stagger-1">
            Everything you need for advanced monitoring
          </h2>
          <p className="text-xl text-muted-foreground reveal stagger-2">
            Comprehensive tools to ensure your systems stay online and perform at their best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal stagger-2 flex flex-col bg-white rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
