"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
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
import html2canvas from "html2canvas";
import { toast } from "@hooks/use-toast";
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
  const [refreshing, setRefreshing] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const fetchWebsiteStatus = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await axios.post<{ website: Website }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/website/status`,
        { id: serviceId },
        {
          headers: { clerkId: userId },
        }
      );
      setWebsite(res.data.website);
      toast({
        title: "Data refreshed",
        description: "Website status has been updated.",
      });
    } catch (err) {
      console.error("Failed to fetch site status", err);
      toast({
        title: "Refresh failed",
        description: "Could not update website status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [serviceId, userId]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    if (serviceId) {
      fetchWebsiteStatus();
    }
  }, [user, serviceId, fetchWebsiteStatus, router]);

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
        return {
          time: new Date(tick.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          latency: tick.latency,
          // We keep these properties for calculation purposes but don't render them
          good: tick.latency <= 200 ? tick.latency : null,
          average:
            tick.latency > 200 && tick.latency <= 600 ? tick.latency : null,
          bad: tick.latency > 600 ? tick.latency : null,
        };
      });
  }, [website, range]);

  const avgLatency = useMemo(() => {
    if (!coloredChartData.length) return 0;
    const total = coloredChartData.reduce(
      (sum, d) => sum + (d.good ?? 0) + (d.average ?? 0) + (d.bad ?? 0),
      0
    );
    return total / coloredChartData.length;
  }, [coloredChartData]);

  const handleRefresh = () => {
    fetchWebsiteStatus();
  };

  const downloadChart = async () => {
    const element = document.getElementById("downloadChart");

    if (!element) {
      toast({
        title: "Error downloading chart",
        description: "Chart container not found.",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `latency-chart-${website?.url || "website"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Chart downloaded",
        description: "Your chart has been successfully downloaded.",
      });
    } catch (error: unknown) {
      console.error("Error downloading chart:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Error downloading chart",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const getUptime = (ticks: Tick[]): number => {
    if (!ticks.length) return 0;
    const upCount = ticks.filter((t) => t.status === "Up").length;
    return (upCount / ticks.length) * 100;
  };

  const timeRangeLabels = {
    "1h": "1 Hour",
    "1d": "1 Day",
    "1m": "1 Month",
    "1y": "1 Year",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TrialButton
        text="/Dashboard"
        onClick={() => router.push("/dashboard")}
      />

      {loading ? (
        <SkeletonCard count={2} />
      ) : website ? (
        <div className="shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-16">
            <div className="mb-4 text-2xl font-semibold text-slate-200">
              {website.url}
            </div>
            <div className="flex space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
                onClick={downloadChart}
                disabled={refreshing}
              >
                <span>Download</span>
              </button>
              <button
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600 transition"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <LoadingSpinner />
                ) : (
                  <RefreshCcwIcon className="mr-2" />
                )}
                <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
          <div className="flex justify-end mb-8 flex-wrap">
            {(
              Object.keys(timeRangeLabels) as Array<
                keyof typeof timeRangeLabels
              >
            ).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 ${
                  range === r ? "bg-slate-400 text-white" : "bg-gray-200"
                }`}
              >
                {timeRangeLabels[r]}
              </button>
            ))}
          </div>
          <div id="downloadChart" className="mb-4">
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
              <span
                className={
                  website.ticks[website.ticks.length - 1]?.status === "Up"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {website.ticks[website.ticks.length - 1]?.status ?? "Unknown"}
              </span>
            </p>
            <p>
              <strong>Avg Latency:</strong>{" "}
              <span
                className={
                  avgLatency <= 200
                    ? "text-green-400"
                    : avgLatency <= 600
                      ? "text-yellow-400"
                      : "text-red-400"
                }
              >
                {avgLatency.toFixed(1)}ms
              </span>
            </p>
            <p>
              <strong>Uptime (24h):</strong>{" "}
              <span
                className={
                  getUptime(website.ticks) >= 99
                    ? "text-green-400"
                    : getUptime(website.ticks) >= 95
                      ? "text-yellow-400"
                      : "text-red-400"
                }
              >
                {getUptime(website.ticks).toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-red-400">
            No website found with the provided ID.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
