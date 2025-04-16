import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import WebsiteWithChart from "@components/websitewithcharts";
import { useUser } from "@clerk/nextjs";

export default function WebsiteDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();
  const [website, setWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      if (!id || !user) return;

      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/website/status",
          { id },
          {
            headers: {
              clerkId: user.id,
            },
          }
        );

        setWebsite(res.data.website);
      } catch (error) {
        console.error("Error fetching website:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [id, user]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!website) return <div className="p-6 text-white">Website not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{website.name || website.url}</h1>
      <WebsiteWithChart website={website} />
    </div>
  );
}
