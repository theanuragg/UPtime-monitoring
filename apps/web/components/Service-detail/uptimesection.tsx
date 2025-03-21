
import { Button } from "@components/ui/button";
import { toast } from "sonner";

const UptimeSection = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-base font-medium">Uptime</h3>
          <span className="text-xs text-gray-500 ml-2">last 24 hours</span>
        </div>
      </div>
      <div className="h-16 w-full bg-gray-100 flex mb-2 rounded-sm overflow-hidden">
        <div className="bg-[#A08FBB] flex-grow"></div>
        <div className="bg-[#36D399] w-1/4"></div>
      </div>
      <div className="flex text-xs gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#36D399] mr-1 rounded-sm"></div>
          <span>Uptime</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#A08FBB] mr-1 rounded-sm"></div>
          <span>Downtime</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 mr-1 rounded-sm"></div>
          <span>Unknown</span>
        </div>
      </div>
    </div>
  );
};

export default UptimeSection;
