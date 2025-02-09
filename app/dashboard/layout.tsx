"use client";

import "@/app/globals.css";
import { AppSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [userValid, setUserValid] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userValid = await AuthService.getCurrentUser();
        console.log("User valid:", userValid);
        setUserValid(userValid);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserValid(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userValid === false) {
      router.push("/auth");
    }
  }, [userValid, router]);

  if (userValid === null) {
    return <div>Loading...</div>;
  }

  if (userValid === false) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/7">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>
      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
