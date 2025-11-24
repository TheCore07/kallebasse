import type { SideBarItem } from "@/types/SideBar.ts";
import {Book, Clock, Ticket} from "lucide-react";

export const SideBarItems: SideBarItem[] = [
    { title: "Times", path: "/", icon: Clock},
    { title: "Projects", path: '/projects', icon: Book},
    // { title: "Employees", path: "/employees", },
    // { title: "Settings", path: "/settings", },
    { title: "Tickets", path: "/tickets", icon: Ticket },
    // { title: "Changelog", path: "/changelog", },
]