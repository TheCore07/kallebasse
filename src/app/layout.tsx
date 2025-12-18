import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner.tsx";
import { AppConf } from "../../AppConf.ts";

export default function Layout() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />; // Redirect nur, wenn user null & nicht loading

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <Toaster />

                <main className="flex flex-col flex-1 p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <SidebarTrigger />
                    </div>

                    {/* Page Content */}
                    <div className="flex-1 overflow-auto">
                        <Outlet />
                    </div>

                    {/* Footer */}
                    <footer className="mt-4 flex justify-end text-sm text-gray-600">
                        <span>{AppConf.AppVersion}</span>
                    </footer>
                </main>
            </div>
        </SidebarProvider>
    );
}
