import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import Loading from "../pages/Loading.tsx";

export default function MainLayout() {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;

    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="flex min-h-screen">
            <aside className="bg-gray-800 text-white transition-all duration-300">
                <SideMenu />
            </aside>

            <main className="flex-1 p-6 bg-gray-600">
                <Outlet />
            </main>
        </div>
    );
}
