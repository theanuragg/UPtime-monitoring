'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart2,
  Bell,
  FileText,
  HelpCircle,
  LogOut,
  MonitorSmartphone,
  PhoneCall,
  Server,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@components/ui/sidebar";

const AppSidebar = () => {
  const pathname = usePathname();

  interface bottomMenuItems {
    icon: "" ,
    label: "",
    path : "" 
  }

  const menuItems = [
    { icon: Activity, label: "What's New", path: "/whats-new" },
    { icon: BarChart2, label: "Dashboard", path: "/dashboard" },
    { icon: Server, label: "Monitoring", path: "/service/1" },
    { icon: Shield, label: "Status Pages", path: "/status-pages", badge: "coming soon" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: FileText, label: "Reports", path: "/reports", badge: "coming soon" },
    { icon: PhoneCall, label: "IRM & On-Call", path: "/irm", badge: "Coming Soon" },
  ];

//   const bottomMenuItems = [
//     { icon: User, label: "Notifications", path: "/notifications" },
//     { icon: MonitorSmartphone, label: "Probe Servers", path: "/probe-servers" },
//     { icon: Settings, label: "Settings", path: "/settings" },
//     { icon: FileText, label: "Billing", path: "/billing" },
//     { icon: HelpCircle, label: "Support", path: "/support", badge: "New" },
//     { icon: LogOut, label: "Log Out", path: "/logout" },
//   ];

  const isActive = (path) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (path === "/service/1" && pathname.startsWith("/service/")) {
      return true;
    }
    return pathname === path;
  };

  return (
    <>
      <div className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-white" />
          <h2 className="text-lg font-semibold text-white">uptime.com</h2>
        </div>
        <div className="mt-1">
          <p className="text-xs text-gray-400">Unified Availability</p>
        </div>
      </div>

      <div className="mt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link href={item.path} className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs text-yellow-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>

      {/* <div className="mt-8 border-t border-gray-800 pt-8">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link href={item.path} className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div> */}

      <div className="mt-auto p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <span className="text-xs font-medium text-white">AS</span>
          </div>
          <div>
            <p className="text-sm text-white">anurag.s</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
