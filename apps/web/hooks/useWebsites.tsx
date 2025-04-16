import { useEffect, useState } from "react";
import { useAuth, SignIn } from "@clerk/nextjs";
import axios from "axios";

interface Website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
  }[];
}

export function useWebsites() {
  const { getToken, isSignedIn } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWebsites = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        setError("Authentication token not found.");
        setWebsites([]);
        return;
      }

      const response = await axios.get("http://localhost:8000/api/v1/websites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWebsites(response.data.websites);
        setError(null);
      } else {
        setError(response.data.message || "Unknown error");
      }

    } catch (err: any) {
      setError(err?.message || "Failed to fetch websites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;

    fetchWebsites();

    const interval = setInterval(() => {
      fetchWebsites();
    }, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, [isSignedIn]);

  return { websites, error, loading, fetchWebsites };
}