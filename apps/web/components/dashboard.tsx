"use client";

import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Vibrant background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[400px] h-[300px] relative overflow-hidden">
          <Image
            src="/vibrant.avif"
            alt="Colorful Background"
            fill
            className="object-cover blur-md brightness-75 rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Dashboard image with cropped height */}
      <div className="relative z-20 px-2 w-full max-w-[95%] md:max-w-[85%] lg:max-w-[70%] overflow-hidden rounded-2xl shadow-2xl h-[500px] md:h-[600px]">
        <Image
          src="/dashboard.webp"
          alt="Dashboard UI"
          width={1900}
          height={1000}
          className="w-full h-full object-cover object-top"
          priority
        />
      </div>
    </main>
  );
}
