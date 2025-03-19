"use client"

import { useRef, useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small projects and personal use.",
    features: [
      "10 monitors",
      "1-minute check intervals",
      "Email notifications",
      "5 team members",
      "7-day data retention",
      "Basic reporting",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "Ideal for growing businesses with multiple services.",
    features: [
      "50 monitors",
      "30-second check intervals",
      "Email, SMS & Slack notifications",
      "15 team members",
      "30-day data retention",
      "Advanced reporting",
      "API access",
      "Custom status pages",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large organizations with complex monitoring needs.",
    features: [
      "Unlimited monitors",
      "10-second check intervals",
      "All notification channels",
      "Unlimited team members",
      "1-year data retention",
      "Custom reporting",
      "API access",
      "Custom status pages",
      "Dedicated support",
      "SLA guarantees",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const [annual, setAnnual] = useState(true);

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

    const pricingElement = pricingRef.current;
    if (pricingElement) {
      const revealElements = pricingElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (pricingElement) {
        const revealElements = pricingElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div id="pricing" ref={pricingRef} className="py-24 bg-secondary/50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4 reveal">
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6 reveal stagger-1">
            Choose the plan that works for you
          </h2>
          <p className="text-xl text-muted-foreground reveal stagger-2">
            All plans include a 14-day free trial. No credit card required.
          </p>
          
          <div className="mt-8 inline-flex items-center rounded-full p-1 bg-secondary reveal stagger-3">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                !annual
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                annual
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Annual <span className="text-xs text-primary">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`reveal bg-white rounded-xl border ${
                plan.popular ? "border-primary" : "border-border"
              } transition-all duration-300 hover:shadow-lg relative flex flex-col`}
              style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">
                    ${annual ? (plan.price * 0.8 * 12).toFixed(0) : plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {annual ? "/year" : "/month"}
                  </span>
                </div>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
              <div className="p-6 flex-grow">
                <h4 className="font-medium mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
