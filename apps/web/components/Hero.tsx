"use client";

import { useEffect, useRef } from "react";
import { TrialButton } from "@components/ui/Trailbutton";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
 
    const { isSignedIn } = useUser();
    const router = useRouter();

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
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="z-10 text-center px-4">
        {/* First Line */}
        <h1 className="text-3xl sm:text-6xl custom-heading reveal">
          Know when your services are
        </h1>

        {/* Second Line in flex-row */}
        <div className="flex justify-center items-center flex-wrap gap-2 mt-2 sm:mt-4 text-3xl sm:text-6xl">
          <h1 className="font-semibold select-text custom-heading reveal">
        Down before your
          </h1>
          <span className="text-primary font-main font-normal custom-heading2 reveal select-text">
        users
          </span>
        </div>

        {/* Subheading */}
        <p className="mt-8 text-secondary mb-4 max-w-md mx-auto">
          Powerful analytics and reporting that empowers your team to make
          smarter business choices.
        </p>

        <TrialButton
          text="Get Started"
          onClick={() => {

          if (isSignedIn) {
            router.push("/dashboard");
          } else {
            
          }
          }
          }
        />
      </div>
    </main>
  );
};

export default Hero;
