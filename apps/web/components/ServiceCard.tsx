
"use client"

import React from "react"
import  Link  from 'next/link' 
import { Card, CardContent } from "@components/ui/card";

interface ServiceData {
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

interface ServiceCardProps {
  service: ServiceData;
  onClick?: () => void;
}

const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
  return (
    <Card 
      className="border border-l-4 border-l-green-500 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <Link 
          href={service.responseTime.url} 
          className="text-blue-600 font-medium hover:underline"
          onClick={(e) => {
            // Prevent the card's onClick from firing when clicking the link
            e.stopPropagation();
          }}
        >
          {service.name}
        </Link>
        <div className="text-xs text-gray-500 mt-1">{service.type}</div>
        <div className="text-xs text-gray-500 mt-1">{service.url}</div>
        
        <div className="mt-2">
          <div className="bg-gray-100 text-xs px-2 py-1 inline-block rounded">
            {service.type}
          </div>
          <div className="mt-2 text-sm text-green-500 font-medium">
            {service.status}
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-gray-500">Uptime (24h)</div>
            <div className="text-sm text-green-500 font-medium">{service.uptime}</div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-1">Response Time (1h)</div>
            <div className="h-10 flex items-end gap-px">
              {service.responseTime.data.map((value, i) => (
                <div 
                  key={i} 
                  className="bg-blue-500 w-full" 
                  style={{ height: `${value}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;