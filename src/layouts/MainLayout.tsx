import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
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
