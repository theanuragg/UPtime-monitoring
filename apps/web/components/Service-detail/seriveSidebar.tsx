
import { Card, CardHeader, CardContent, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { toast } from "sonner";

interface ServiceSidebarProps {
  currentStatus: string;
  uptime: string;
  uptimeDuration: string;
  uptimeTimestamp: string;
}

const ServiceSidebar = ({ 
  currentStatus, 
  uptime, 
  uptimeDuration, 
  uptimeTimestamp 
}: ServiceSidebarProps) => {
  const handleInstallWidgetClick = () => {
    toast.success("Widget code copied to clipboard");
  };

  const handleRealTimeAnalysisClick = () => {
    toast.info("Opening real-time analysis dashboard");
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">CURRENT STATUS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-green-500">{currentStatus}</div>
          <div className="text-xs text-gray-500">
            <div>{uptimeDuration}</div>
            <div>{uptimeTimestamp}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">UPTIME</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-green-500">{uptime}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4 border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={handleInstallWidgetClick}
          >
            Install Widget
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">DOWNTIME</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base text-gray-500">None recorded</div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">LATEST DOWNTIME</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base text-gray-500">None recorded</div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">ALERT ANALYSIS</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            variant="default" 
            size="sm"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={handleRealTimeAnalysisClick}
          >
            Real-Time Analysis
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceSidebar;