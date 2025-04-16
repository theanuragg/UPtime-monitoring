"use client";

import React, { useState } from "react";
import { Globe, Plus, Moon, Sun } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { cxyz } from "@/action/user";
import WebsiteWithChart from "@components/websitewithcharts";
import axios from "axios";

// Define proper types for our data structures
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
}

function CreateWebsiteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (url: string | null) => void;
}) {
  const [url, setUrl] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Add New Website
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => onClose(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => onClose(url)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Website
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Explicitly define the state type
  const [websites, setWebsites] = useState<Website[]>([]); 
  const { getToken, userId } = useAuth();

  // Fetch websites on component mount
  React.useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get<{websites: Website[]}>("http://localhost:8000/api/v1/websites", {
          headers: {
            clerkId: userId,
          },
        });
        
        const websitesWithTicks = await Promise.all(
          response.data.websites.map(async (site) => {
            try {
              const statusRes = await axios.post<{website: Website}>(
                "http://localhost:8000/api/v1/website/status",
                { id: site.id },
                {
                  headers: { clerkId: userId },
                }
              );
              return statusRes.data.website;
            } catch (err) {
              return null;
            }
          })
        );
        
        // Filter out null entries and cast to Website[]
        setWebsites(websitesWithTicks.filter((site): site is Website => site !== null));
      } catch (error) {
        console.error("Failed to fetch websites:", error);
      }
    };

    if (userId) {
      fetchWebsites();
    }
  }, [userId]);

  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const refreshWebsites = async () => {
    try {
      const response = await axios.get<{websites: Website[]}>("http://localhost:8000/api/v1/websites", {
        headers: {
          clerkId: userId,
        },
      });
      
      const websitesWithTicks = await Promise.all(
        response.data.websites.map(async (site) => {
          try {
            const statusRes = await axios.post<{website: Website}>(
              "http://localhost:8000/api/v1/website/status",
              { id: site.id },
              {
                headers: { clerkId: userId },
              }
            );
            return statusRes.data.website;
          } catch (err) {
            return null;
          }
        })
      );
      
      // Filter out null entries and cast to Website[]
      setWebsites(websitesWithTicks.filter((site): site is Website => site !== null));
    } catch (error) {
      console.error("Failed to refresh websites:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto py-48 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Uptime Monitor
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </button>
          </div>
        </div>

        <ul className="space-y-12">
          {websites.map((website) => (
            <WebsiteWithChart key={website.id} website={website} />
          ))}
        </ul>
      </div>

      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={async (url) => {
          setIsModalOpen(false);
          if (url) {
            // Use the provided URL from the user input
            await cxyz(url);
            // Refresh websites list after adding
            refreshWebsites();
          }
        }}
      />
    </div>
  );
}

export default App;