
import { Share, Edit, ChevronDown, Download } from "lucide-react";
import { Button } from "@components/ui/button";
import { toast } from "sonner";

const ServiceActionButtons = () => {
  const handleShareClick = () => {
    toast.success("Sharing link copied to clipboard");
  };

  const handleEditClick = () => {
    toast.info("Edit service form opened");
  };

  const handleDownloadClick = () => {
    toast.success("Downloading service report");
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleShareClick}>
        <Share className="mr-2 h-4 w-4" />
        Share Check Analysis
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleEditClick}>
        <Edit className="mr-2 h-4 w-4" />
        Edit Check
      </Button>
      <Button variant="default" className="bg-blue-600" size="sm" onClick={handleDownloadClick}>
        <Download className="mr-2 h-4 w-4" />
        Download
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ServiceActionButtons;
