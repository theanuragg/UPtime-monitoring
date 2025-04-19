"use client";

import Image from "next/image";
import { TrialButton } from "./ui/Trailbutton";

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-40 px-6">
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-lg text-primary uppercase  mb-3">How it works</p>
        <h2 className="text-4xl custom-heading font-serif">
          We make data accessible and <br />
          <span className="text-secondary text-3xl">
            actionable for teams of all sizes.
          </span>
        </h2>
      </div>

      {/* 🔥 Wrap grid & gradient together */}
      <div className="relative mt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-zinc-800 shadow-lg flex flex-col gap-6">
            <p className="text-white font-sans text-lg leading-relaxed">
              <span className="font-semibold ">
              Simple and quick setup.
              </span>{" "}
              Sign up for an account and log in to get started with monitoring your website&#39;s uptime.
            </p>

            <div className="flex flex-col gap-6 pt-10">
              <TrialButton text="Registration" />
              <div className="flex items-center flex-col gap-2 text-secondary text-sm">
                Fill in the details
              </div>
              <div className="flex items-center  flex-col gap-2 text-secondary text-sm">
                Up and running!
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-zinc-800 shadow-lg">
            <p className="text-white font-sans text-lg leading-relaxed mb-4">
              <span className="font-main">
              Add your website URL.
              </span>{" "}
              Enter the URL of the website you want to monitor, and our system will start tracking its uptime.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-xl h-[260px] md:h-[300px]">
              <Image
                src="/Uicomp.avif"
                alt="UI Editor"
                width={200}
                height={200}
                className="absolute z-10 left-10 top-0 rounded-lg shadow-lg max-w-full"
              />
              <Image
                src="/Uieditor.avif"
                alt="UI Component"
                width={200}
                height={200}
                className="absolute left-0 top-10 rounded-lg shadow-md opacity-80 max-w-full"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-zinc-800 shadow-lg flex flex-col gap-4">
            <p className="text-white font-medium text-lg leading-relaxed">
              <span className="font-semibold">
              Real-time latency and uptime graphs.
              </span>{" "}
              Our validator sends latency data and displays it in real-time graphs for easy monitoring..
            </p>

            <div className="bg-zinc-800 p-4 rounded-2xl text-sm space-y-3 mt-4">
              <div className="bg-background px-3 py-2 rounded-xl text-white">
              How can I view my website&#39;s latency graph?
              </div>
              <div className="bg-background px-3 py-2 rounded-xl text-white/70 flex items-center justify-between">
                <span>
                Simply navigate to the dashboard to see real-time latency and uptime data.
                </span>

              </div>
              <div className="bg-background px-3 py-2 rounded-xl text-white/55 ">
              Thank you! This is very helpful.
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Gradient overlay outside grid */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/70 to-black/0  pointer-events-none z-20" />
      </div>
    </section>
  );
}
