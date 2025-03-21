
import { Share, Edit, ChevronDown, Download } from "lucide-react";
import { Button } from "@components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@components/ui/breadcrumb";
import { toast } from "sonner";

interface ServiceHeaderProps {
  serviceName: string;
  serviceType: string;
}

const ServiceHeader = ({ serviceName, serviceType }: ServiceHeaderProps) => {
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
    <>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>{serviceType}</span>
      </div>
      <Breadcrumb className="text-xs text-gray-500">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">{serviceName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{serviceType}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default ServiceHeader;