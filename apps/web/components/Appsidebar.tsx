"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart2,
  FileText,
  Shield,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@components/ui/sidebar";

const AppSidebar = () => {
  const pathname = usePathname();


  const menuItems = [
    { icon: Activity, label: "What's about", path: "/whats-new" },
    { icon: BarChart2, label: "Dashboard", path: "/dashboard" },
    {
      icon: Shield,
      label: "SEO report",
      path: "/status-pages",
      badge: "coming soon",
    },
    {
      icon: FileText,
      label: "Download report",
      path: "/reports",
      badge: "coming soon",
    },
  ];

  const isActive = (path: string) => {
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
      <div className="px-6 py-8">
        {/* Add any additional content here */}
      </div>

      <div className="mt-8">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <Link
                  href={item.path}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-sans text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </>
  );
}
export default AppSidebar;
