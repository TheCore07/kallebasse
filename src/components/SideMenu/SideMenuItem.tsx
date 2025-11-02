import type { MenuItem } from "../../types/Menu.ts";
import { NavLink } from "react-router-dom";

type Props = {
    item: MenuItem;
    collapsed: boolean;
}

export default function SideMenuItem({ item, collapsed }: Props) {
    return (
        <li>
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-600" : ""
                    }`
                }
            >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
            </NavLink>
        </li>
    )
}
