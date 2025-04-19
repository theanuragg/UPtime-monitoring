"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { AreaChart, Area } from "recharts";
import { useParams } from "next/navigation";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@clerk/nextjs";
import SkeletonCard from "@components/SkeletonCard";
import { TrialButton } from "@components/ui/Trailbutton";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import html2canvas from 'html2canvas';
import { toast } from '@hooks/use-toast'; 
import { RefreshCcwIcon } from "lucide-react";


type Tick = {
  id: string;
  websiteId: string;
  validatorId: string;
  createdAt: string;
  status: "Up" | "Down";
  latency: number;
};

type Website = {
  id: string;
  url: string;
  userId: string;
  ticks: Tick[];
};

export default function ServicePage() {
  const params = useParams();
  const serviceId = params?.serviceId as string;
  const [website, setWebsite] = useState<Website | null>(null);
  const [range, setRange] = useState<"1h" | "1d" | "1m" | "1y">("1d");
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchWebsiteStatus = async () => {
      try {
        const res = await axios.post<{ website: Website }>(
          "http://localhost:8000/api/v1/website/status",
          { id: serviceId },
          {
            headers: { clerkId: userId },
          }
        );
        setWebsite(res.data.website);
      } catch (err) {
        console.error("Failed to fetch site status", err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchWebsiteStatus();
  }, [serviceId, userId]);

  const coloredChartData = useMemo(() => {
    if (!website) return [];

    const now = new Date();
    const startTime = new Date();

    switch (range) {
      case "1h":
        startTime.setHours(now.getHours() - 1);
        break;
      case "1d":
        startTime.setDate(now.getDate() - 1);
        break;
      case "1m":
        startTime.setMonth(now.getMonth() - 1);
        break;
      case "1y":
        startTime.setFullYear(now.getFullYear() - 1);
        break;
    }

    return website.ticks
      .filter((tick) => new Date(tick.createdAt) > startTime)
      .map((tick) => {
        const latency = tick.latency;
        return {
          time: new Date(tick.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          good: latency <= 200 ? latency : null,
          average: latency > 200 && latency <= 600 ? latency : null,
          bad: latency > 600 ? latency : null,
        };
      });
  }, [website, range]);

  const avgLatency =
    coloredChartData.reduce(
      (sum, d) => sum + (d.good ?? 0) + (d.average ?? 0) + (d.bad ?? 0),
      0
    ) / coloredChartData.length || 0;


    const dowlanding = async () => {
      const element = document.getElementById('dowlanding');
    
      if (!element) {
        toast({
          title: 'Error downloading chart',
          description: 'Chart container not found.',
          variant: 'destructive',
        });
        return;
      }
    
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: null, // keeps transparent bg if needed
          scale: 2, // higher quality
          useCORS: true, // if any external SVG/font
        });
    
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `latency-chart.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        toast({
          title: 'Chart downloaded',
          description: 'Your chart has been successfully downloaded.',
        });
      } catch (error: unknown) {
      console.error('Error downloading chart:', error);
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
        toast({
          title: 'Error downloading chart',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TrialButton text="/Dashboard" onClick={() => router.push("/dashboard")} />

      {loading ? (
        <SkeletonCard count={2}  />
      ) : website ? (
        <div className=" shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-16">
          <div className="mb-4 text-2xl font-semibold text-slate-200">
           {website.url}
          </div>
            <div className="flex space-x-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
              onClick={dowlanding}
            >
              <span>Download</span>
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
             
            >
              <RefreshCcwIcon className="mr-2" />
              <span>Refresh</span>
            </button>
            </div>
          </div>
          <div className="flex justify-end   mb-8 flex-wrap">
            {["1h", "1d", "1m", "1y"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r as "1h" | "1d" | "1m" | "1y")}
                className={`px-3 py-1  ${
                  range === r ? "bg-slate-400 text-white" : "bg-gray-200"
                }`}
              >
                {r === "1h"
                  ? "1 Hour"
                  : r === "1d"
                    ? "1 Day"
                    : r === "1m"
                      ? "1 Month"
                      : "1 Year"}
              </button>
            ))}
          </div>
          <div id="dowlanding" className="mb-4">
            
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={coloredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="ms" />
              <Tooltip />
              <defs>
                <linearGradient id="gradientGood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1} />
                </linearGradient>

                <linearGradient
                  id="gradientAverage"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f1c40f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f1c40f" stopOpacity={0.1} />
                </linearGradient>

                <linearGradient id="gradientBad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e74c3c" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              {/* Good: ≤ 200ms */}
              <Area
                type="monotone"
                dataKey="good"
                stroke="#3498db"
                fill="url(#gradientGood)"
              />
              <Area
                type="monotone"
                dataKey="average"
                stroke="#f1c40f"
                fill="url(#gradientAverage)"
              />
              <Area
                type="monotone"
                dataKey="bad"
                stroke="#e74c3c"
                fill="url(#gradientBad)"
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-50">
            <p>
              <strong>Status:</strong>{" "}
              {website.ticks[website.ticks.length - 1]?.status ?? "Unknown"}
            </p>
            <p>
              <strong>Avg Latency:</strong> {avgLatency.toFixed(1)}ms
            </p>
            <p>
              <strong>Uptime (24h):</strong>{" "}
              {getUptime(website.ticks).toFixed(2)}%
            </p>
          </div>
        </div>
      ) : (
        <p>No website found.</p>
      )}
    </div>
  );
}

function getUptime(ticks: Tick[]) {
  const upCount = ticks.filter((t) => t.status === "Up").length;
  return (upCount / ticks.length) * 100;
}
