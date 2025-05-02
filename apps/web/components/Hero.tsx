"use client";

import { useEffect, useRef } from "react";
import { TrialButton } from "@components/ui/Trailbutton";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { isSignedIn, isLoaded } = useUser();
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
      <div ref={heroRef} className="z-10 text-center px-4">
        <h1
          className={`text-3xl sm:text-6xl custom-heading reveal ${
            !isLoaded ? "bg-gray-700 text-transparent rounded-md inline-block animate-pulse" : ""
          }`}
        >
          {isLoaded ? "Know when your services are" : ""}
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-2 mt-2 sm:mt-4 text-3xl sm:text-6xl">
          <h1
            className={`font-semibold select-text custom-heading reveal ${
              !isLoaded ? "bg-gray-700 text-transparent rounded-md inline-block animate-pulse" : ""
            }`}
          >
            {isLoaded ? "Down before your" : ""}
          </h1>
          <span
            className={`text-primary font-main font-normal custom-heading2 reveal select-text ${
              !isLoaded ? "bg-gray-700 text-transparent rounded-md inline-block animate-pulse" : ""
            }`}
          >
            {isLoaded ? "users" : "......"}
          </span>
        </div>

        <p
          className={`mt-8 text-secondary mb-4 max-w-md mx-auto ${
            !isLoaded ? "bg-gray-800 text-transparent animate-pulse rounded-md" : ""
          }`}
        >
          {isLoaded
            ? "Powerful analytics and reporting that empowers your team to make smarter business choices."
            : ".........................................................."}
        </p>

        {isLoaded && isSignedIn ? (
          <TrialButton text="Get Started" onClick={() => router.push("/dashboard")} />
        ) : (
          <TrialButton text="Get Started" />
        )}
      </div>
    </main>
  );
};

export default Hero;
