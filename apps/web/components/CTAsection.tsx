
import { useRef, useEffect } from "react";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

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

    const ctaElement = ctaRef.current;
    if (ctaElement) {
      const revealElements = ctaElement.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (ctaElement) {
        const revealElements = ctaElement.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div id="cta" ref={ctaRef} className="py-24 bg-secondary/50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-12 border border-border shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6 reveal">
              Ready to eliminate service downtime?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto reveal stagger-1">
              Join thousands of companies that trust UptimeGlance for their mission-critical monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 reveal stagger-2">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white">
                Start your free trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Contact sales
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4 reveal stagger-3">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;