import type { MenuItem } from "../../types/Menu.ts";
import {ClockIcon, UserIcon, CogIcon, DocumentTextIcon} from "@heroicons/react/24/outline";

export const menuItems: MenuItem[] = [
    { label: "Times", path: "/", icon: <ClockIcon className="h-5 w-5"/>},
    { label: "Employees", path: "/employees", icon: <UserIcon className="h-5 w-5"/>},
    { label: "Settings", path: "/settings", icon: <CogIcon className="h-5 w-5"/>,},
    { label: "Changelog", path: "/changelog", icon: <DocumentTextIcon className="h-5 w-5"/>},

]