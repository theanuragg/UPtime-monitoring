"use client"

import React from "react";
import { Card, CardContent } from "@components/ui/card";

interface SummaryItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
  linkText?: string;
  onLinkClick?: () => void;
}

const SummaryCard = ({ title, items, linkText, onLinkClick }: SummaryCardProps) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-0">
        <div className="border-b p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-600">{title}</h3>
            {linkText && onLinkClick && (
              <button 
                onClick={onLinkClick}
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                {linkText} <span className="ml-1">→</span>
              </button>
            )}
          </div>
        </div>
        <div className="p-0">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center px-4 py-2 border-b last:border-b-0">
              <span className="text-sm">{item.label}</span>
              <span className={`text-sm ${item.highlight ? 'text-green-500 font-medium' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;