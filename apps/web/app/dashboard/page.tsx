"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCcw, Search } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Card, CardContent } from "@components/ui/card";
// import { useNavigate } from "react-router-dom";
// import AppLayout from "@components/AppLayout";
import ServiceCard from "@components/ServiceCard";
import SummaryCard from "@components/SummaryCard";
// import AddServiceDialog from "@components/AddServiceDialog";
import AppLayout from "@components/Applayout";
import { toast } from "sonner";
import type { ServiceFormValues } from "@components/AddServiceDailog";

// Mock data for the dashboard
const totalChecksData = [
  { label: "Down", value: 0 },
  { label: "Paused", value: 0 },
  { label: "Maintenance", value: 0 },
];

const outagesData = [
  { label: "Last 24h", value: 0 },
  { label: "Last 7d", value: 0 },
  { label: "Last 30d", value: 0 },
];

const responseTimeData = [
  { label: "HTTP", value: "55ms" },
  { label: "Transaction", value: "n/a" },
  { label: "API", value: "n/a" },
];

const otherData = [
  { label: "Global Uptime", value: "100%", highlight: true },
  { label: "Last Alert", value: "n/a" },
  { label: "RUM Load Time", value: "n/a" },
];

interface Service {
  id: number;
  name: string;
  type: string;
  url: string;
  status: string;
  uptime: string;
  responseTime: {
    url: string;
    data: number[];
  };
}

const Dashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceData, setServiceData] = useState<Service[]>([
    {
      id: 1,
      name: "portfolio-three-chi.vercel.app",
      type: "HTTP(S)",
      url: "https://portfolio-three-chi.vercel.app/",
      status: "Up for 7h 2m",
      uptime: "100%",
      responseTime: {
        url: "/service/1",
        data: [10, 20, 15, 35, 25, 40, 30, 25, 20, 15, 10, 20, 30, 25],
      },
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddService = (service: ServiceFormValues) => {
    const newService = {
      id: serviceData.length + 1,
      name: service.name,
      type: service.type,
      url: service.url,
      status: "Up for 0m",
      uptime: "100%",
      responseTime: {
        url: `/service/${serviceData.length + 1}`,
        data: [10, 15, 20, 15, 10, 15, 20, 25, 20, 15, 10, 15, 20, 15],
      },
    };
    setServiceData([...serviceData, newService]);
    toast.success(`Service "${service.name}" added successfully`);
  };

  const handleServiceClick = (id: number) => {
    router.push(`/service/${id}`);
  };

  const filteredServices = searchQuery
    ? serviceData.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : serviceData;

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => toast.success("Refreshing data...")}>
        <RefreshCcw className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setDialogOpen(true)}>
        <Plus className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8">
        <div className="grid place-items-center">⋮</div>
      </Button>
    </div>
  );

  return (
    <div className="mt-20">
    <AppLayout title="Dashboard" actions={headerActions}>
      <div className="px-8 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard title="1 total checks" items={totalChecksData} linkText="View" />
          <SummaryCard title="Outages" items={outagesData} linkText="View" />
          <SummaryCard title="Response Time" items={responseTimeData} linkText="View" />
          <SummaryCard title="Other" items={otherData} linkText="View" />
        </div>

        {/* Service Checks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} onClick={() => handleServiceClick(service.id)} />
            ))
          ) : (
            <div className="col-span-3 text-center p-8 border rounded-lg">
              No services found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </AppLayout>
    </div>
  );
};

export default Dashboard;
