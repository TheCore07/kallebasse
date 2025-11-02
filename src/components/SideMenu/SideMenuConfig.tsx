import type { MenuItem } from "../../types/Menu.ts";
import { ClockIcon, UserIcon, CogIcon} from "@heroicons/react/24/outline";

export const menuItems: MenuItem[] = [
    { label: "TimeTracker", path: "/", icon: <ClockIcon className="h-5 w-5"/>},
    { label: "Employees", path: "/employees", icon: <UserIcon className="h-5 w-5"/>},
    {
        label: "Settings",
        path: "/settings",
        icon: <CogIcon className="h-5 w-5"/>,
        children: [
            { label: "Profile", path: "/settings/profile" },
            { label: "Security", path: "/settings/security" },
        ]
    },

]