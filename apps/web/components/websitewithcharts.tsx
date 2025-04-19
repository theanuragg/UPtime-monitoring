"use client";

import Link from "next/link";

interface Website {
  id: string;
  url: string;
  status: string;
  uptime?: number;
}

const WebsiteWithChart = ({ website }: { website: Website }) => {
  return (
    <Link href={`/dashboard/service/${website.id}`} passHref>
      <div className="cursor-pointer border rounded-lg p-4 bg-black shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">{website.url}</h3>
        <p className="text-sm text-gray-500">Status: {website.status}</p>
        <p className="text-sm text-gray-500">
          Uptime: {(website.uptime ?? 96).toFixed(2)}%
        </p>
        <div className="mt-4 h-16 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </Link>
  );
};

export default WebsiteWithChart;
