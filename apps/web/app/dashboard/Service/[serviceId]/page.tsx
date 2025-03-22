'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@components/ui/button';
 import AppLayout from '@components/Applayout'
import ServiceActionButtons from '@components/Service-detail/SerciveAction';
import ServiceContent from '@components/Service-detail/ServiceContent';
import ServiceSidebar from '@components/Service-detail/seriveSidebar';

// Sample data for response time
const responseTimeData = [
  { time: '5PM', value: 85 },
  { time: '6PM', value: 83 },
  { time: '7PM', value: 82 },
  { time: '8PM', value: 76 },
  { time: '9PM', value: 84 },
  { time: '10PM', value: 87 },
  { time: '11PM', value: 75 },
  { time: '12AM', value: 68 },
  { time: '1AM', value: 65 },
  { time: '2AM', value: 63 },
  { time: '3AM', value: 62 },
  { time: '4AM', value: 58 },
  { time: '5AM', value: 65 },
  { time: '6AM', value: 73 },
  { time: '7AM', value: 198 },
  { time: '8AM', value: 154 },
  { time: '9AM', value: 87 },
  { time: '10AM', value: 85 },
  { time: '11AM', value: 83 },
  { time: '12PM', value: 82 },
  { time: '1PM', value: 80 },
  { time: '2PM', value: 79 },
  { time: '3PM', value: 78 },
  { time: '4PM', value: 80 },
];

const ServiceDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const serviceName = 'portfolio-three-chi.vercel.app';
  const serviceType = 'HTTP(S)';
  const currentStatus = 'Up';
  const uptime = '100%';
  const uptimeDuration = 'For 0h 57m 22s';
  const uptimeTimestamp = '(Mar 19, 2023 9:25:50 AM +05)';

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 flex items-center text-gray-500 hover:text-gray-700"
        onClick={handleBackToDashboard}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <ServiceContent 
            serviceName={serviceName}
            serviceType={serviceType}
            responseTimeData={responseTimeData}
          />
        </div>

        <div className="col-span-1">
          <ServiceSidebar 
            currentStatus={currentStatus}
            uptime={uptime}
            uptimeDuration={uptimeDuration}
            uptimeTimestamp={uptimeTimestamp}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
