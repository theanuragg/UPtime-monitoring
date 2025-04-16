"use client";

import { ChevronRight, Check, X } from "lucide-react";
import { TrialButton } from "./ui/Trailbutton";

export default function PricingSection() {
  const plans = [
    {
      title: "Personal",
      price: 30,
      features: ["Cloud storage", "Basic support", "Single user"],
      missing: ["Data export", "API access"],
    },
    {
      title: "Professional",
      price: 75,
      features: [
        "Cloud storage",
        "Premium support",
        "Team access",
        "Data export",
      ],
      missing: ["API access"],
    },
    {
      title: "Business",
      price: 150,
      features: [
        "Cloud storage",
        "Dedicated support",
        "Unlimited users",
        "Data export",
        "API access",
      ],
      missing: [],
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-4 min-h-screen flex justify-center items-center">
      <div className="max-w-6xl w-full text-center">
        <h2 className="text-3xl font-bold mb-2">What will it cost?</h2>
        <p className="text-secondary mb-10">
          Flexible monthly plans, cancel at any time.
        </p>

        <div className="flex flex-col md:flex-row gap-4 p-6  bg-black text-white md:items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-zinc-900 rounded-xl p-6  flex flex-col flex-1 h-full justify-between overflow-hidden"
            >
              {/* Bottom Gradient */}
              <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-t from-black via-black/70 to-transparent rounded-b-2xl" />

              {/* Card Content */}
              <div className="relative z-20">
                <div className="mb-6">
                  <h3 className="font-main text-lg mb-4">{plan.title}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-sm text-zinc-400 ml-1">/mo</span>
                  </div>
                </div>

                <div className="space-y-3 mb-auto">
                  {plan.features.map((feature, idx) => (
                    <div key={`feature-${idx}`} className="flex items-center">
                      <span className="mr-3 text-primary">
                        <Check size={20} />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}

                  {plan.missing.map((feature, idx) => (
                    <div key={`missing-${idx}`} className="flex items-center">
                      <span className="mr-3 text-zinc-600">
                        <X size={20} />
                      </span>
                      <span className="text-zinc-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <TrialButton text="let's buy " />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
