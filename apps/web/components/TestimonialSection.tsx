"use client"

import { useRef, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "UptimeGlance has transformed how we monitor our infrastructure. The notifications are instant, and the interface is extremely intuitive.",
    author: "Sarah Johnson",
    role: "CTO, TechFusion",
    rating: 5,
  },
  {
    content: "We reduced our downtime by 90% since implementing UptimeGlance. The detailed analytics help us identify potential issues before they become problems.",
    author: "Michael Chen",
    role: "DevOps Lead, Quantum Media",
    rating: 5,
  },
  {
    content: "Moving from our old monitoring solution to UptimeGlance was seamless. Their support team was exceptional during the transition.",
    author: "Jessica Williams",
    role: "Infrastructure Manager, DataFlow",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);

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

    const testimonialElement = testimonialRef.current;
    if (testimonialElement) {
      const revealElements = testimonialElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (testimonialElement) {
        const revealElements = testimonialElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div id="testimonials" ref={testimonialRef} className="py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4 reveal">
            <span>What Our Customers Say</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6 reveal stagger-1">
            Trusted by thousands of companies worldwide
          </h2>
          <p className="text-xl text-muted-foreground reveal stagger-2">
            See what our customers have to say about their experience with UptimeGlance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="reveal bg-white rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg flex flex-col"
              style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 flex-grow">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;