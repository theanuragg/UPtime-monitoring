"use client";

import Image from "next/image";
import { TrialButton } from "./ui/Trailbutton";

export default function Analytics() {
  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image on the Left */}
        <div className="flex justify-center md:justify-start">
          {/* Outer container for layout and gradient */}
          <div className="relative w-[90%] max-w-md overflow-visible">
            {/* Gradient Overlay Outside Image */}

            <div className="absolute bottom-0 left-0 w-full h-24 z-20 pointer-events-none bg-gradient-to-t from-black via-black/70 to-transparent rounded-b-2xl" />

            {/* Inner image container */}
            <div className="relative h-[300px]  w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl group">
              <Image
                src="/tools3.jpg"
                alt="Feature Dashboard"
                width={640} // You can adjust this
                height={400}
                className="rounded-2xl object-cover transition-transform duration-500 ease-in-out "
              />
            </div>
          </div>
        </div>

        {/* Text on the Right */}
        <div>
          <h2 className="text-3xl md:text-4xl font-main mb-4">
            Stop jumping between data tools
          </h2>
          <p className="text-secondary text-lg mb-6 max-w-md">
            Our smart data connectors automatically sync information from over
            200 apps, databases, and services, so you always have the most
            up-to-date insights when you need them.
          </p>
          <TrialButton text="Start 14-day trial" />
        </div>
      </div>
    </section>
  );
}
