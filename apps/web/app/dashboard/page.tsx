"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { TrialButton } from "@components/ui/Trailbutton";
import { cxyz } from "@/action/user";

import {
  ExternalLink,
  RefreshCwIcon,
  Activity,
  ArrowUpCircle,
} from "lucide-react";
import SkeletonCard from "@components/SkeletonCard";
import { toast } from "sonner";

// Types
interface Tick {
  id: string;
  status: string;
  latency: number;
  createdAt: string;
}

interface Website {
  id: string;
  url: string;
  ticks: Tick[];
  status?: string;
  uptime?: number;
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const { userId } = useAuth();

  const loadWebsites = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ websites: Website[] }>(
        "http://localhost:8000/api/v1/websites",
        {
          headers: { clerkId: userId },
        }
      );

      const websitesWithTicks = await Promise.all(
        response.data.websites.map(async (site) => {
          try {
            const statusRes = await axios.post<{ website: Website }>(
              "http://localhost:8000/api/v1/website/status",
              { id: site.id },
              {
                headers: { clerkId: userId },
              }
            );
            return statusRes.data.website;
          } catch {
            return null;
          }
        })
      );

      setWebsites(
        websitesWithTicks.filter((site): site is Website => site !== null)
      );
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  

  useEffect(() => {
    loadWebsites();
  }, [loadWebsites, userId]);

  
  const getFormattedUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };
  return (
    <div className="min-h-screen bg-black transition-colors duration-200">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex flex-row items-center justify-center mb-8 gap-60">
          <h1 className="text-3xl custom-heading">Add website</h1>
          <TrialButton
            onClick={() => setIsModalOpen(true)}
            text="Add Website"
          />
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              setLoading(true);
              await loadWebsites();
              setLoading(false);
            }}
            className="px-4 py-2 text-sm font-medium"
          >
            <RefreshCwIcon
              className={`text-white transition-transform ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        <ul className="space-y-10">
          {loading ? (
            <SkeletonCard count={4} />
          ) : (
            websites.map((website) => (
              <Link
                href={`/dashboard/Service/${website.id}`}
                key={website.id}
                className="block w-full"
              >
                <div className="cursor-pointer p-6 rounded-2xl transition bg-secondary border border-gray-700/30 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 hover:shadow-lg hover:shadow-blue-500/10 group">
                  {/* Subtle glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Header section */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`w-3 h-3 rounded-full ${website.status === "up" ? "bg-green-500" : "bg-red-500"} animate-pulse shadow-sm ${website.status === "up" ? "shadow-green-500/30" : "shadow-red-500/30"}`}
                      />

                      {/* URL + External Link */}
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        {website.url}
                        <a
                          href={getFormattedUrl(website.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </h3>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-20">
                      {/* Status */}
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/70 to-gray-700/40 rounded-xl border border-gray-700/30 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-400">Status</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-xl ${
                            website.status === "up"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          <span className="font-medium text-sm">
                            {website.status === "up" ? "Up" : "Down"}
                          </span>
                        </div>
                      </div>

                      {/* Uptime */}
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/70 to-gray-700/40 rounded-xl border border-gray-700/30 shadow-sm">
                        <div className="flex items-center gap-2">
                          <ArrowUpCircle size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-400">Uptime</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-xl ${
                            (website.uptime ?? 96) > 95
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          <span className="font-medium text-sm">
                            {(website.uptime ?? 96).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </ul>
      </div>

      {/* Modal Inline */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1f2937] rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-700">
            <h2 className="text-2xl  mb-4 text-white font-thin text-center">
              Add New Website
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white "
              />
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                
                   onClick={async () => {
                     if (url.trim()) {
                       await cxyz(url);
                     }
                   }}
                   disabled={!url.trim()}
                   className={` w-full py-2 px-4 rounded-xl transition duration-300 ${
                     url.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-600 text-gray-300 cursor-not-allowed"
                   }`}
                >{loading ? <SkeletonCard count={2}/> : toast.loading("Added")}

                  Yes, Add Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
