import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />; // Redirect nur, wenn user null & nicht loading

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                {/* Hauptinhalt füllt Rest der Seite */}
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}
