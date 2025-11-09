import { menuItems } from "./SideMenuConfig.tsx";
import SideMenuItem from "./SideMenuItem.tsx";
import ProfileMenuItem from "./ProfileMenuItem.tsx";
import { useState } from "react";
import { ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { AppConf } from "../../AppConf.ts";

export default function SideMenu() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <nav className={`h-full bg-gray-800 text-white transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
        } flex flex-col`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed && <h1 className="text-lg font-bold">TrackaTime</h1>}
                <button
                    className="p-1 hover:bg-gray-700 rounded"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5"/>
                    ) : (
                        <ArrowLeftEndOnRectangleIcon className="h-5 w-5"/>
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col p-4 mt-2 space-y-2">
                {menuItems.map((item) => (
                    <SideMenuItem key={item.path} item={item} collapsed={collapsed}/>
                ))}
            </ul>

            <ul className="mt-auto flex flex-col p-4 space-y-2">
                <ProfileMenuItem collapsed={collapsed}/>
            </ul>

            <div className="p-3 border-t border-gray-700 text-xs text-gray-400">
                {AppConf.AppVersion}
            </div>
        </nav>
)
}
