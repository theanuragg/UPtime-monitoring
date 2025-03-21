
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import ResponseTimeSection from "./ResponseTime";
import UptimeSection from "./uptimesection";
import AlertLogSection from "./AlertLogsection";
import ServiceHeader from "./ServiceHeader";
import { toast } from "sonner";
// import { Button } from "@components/ui/button";

interface ServiceContentProps {
  serviceName: string;
  serviceType: string;
  responseTimeData: Array<{ time: string; value: number }>;
}

const ServiceContent = ({ 
  serviceName, 
  serviceType, 
  responseTimeData 
}: ServiceContentProps) => {
  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-blue-600">{serviceName}</CardTitle>
        <ServiceHeader serviceName={serviceName} serviceType={serviceType} />
      </CardHeader>
      <CardContent>
        <ResponseTimeSection data={responseTimeData} />
        <UptimeSection />
        <AlertLogSection />
      </CardContent>
    </Card>
  );
};

export default ServiceContent;
