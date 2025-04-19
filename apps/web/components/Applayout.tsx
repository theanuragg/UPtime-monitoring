
import React, { ReactNode} from "react";
import { 
  SidebarProvider, Sidebar, SidebarContent, 
  SidebarFooter, 
} from "@components/ui/sidebar";
import AppSidebar from "@components/Appsidebar";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  actions?: ReactNode;
}

const AppLayout = ({ children, title, actions }: AppLayoutProps) => {
  

  return (
    <div className="min-h-screen bg-black">
      <SidebarProvider >
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r bg-[#1A1F2C] text-white">
            <SidebarContent className="flex flex-col h-full">
              <AppSidebar />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b  px-6">
              <div className="flex items-center gap-4">
                
                <h1 className="text-xl font-semibold">{title}</h1>
              </div>
              {actions}
            </header>

            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
