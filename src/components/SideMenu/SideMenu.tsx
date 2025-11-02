import { menuItems } from "./SideMenuConfig.tsx";
import SideMenuItem from "./SideMenuItem.tsx";

export default function SideMenu() {
    return (
        <nav className="w-64 h-full bg-white border-r">
            <ul>
                {menuItems.map((item) => (
                    <SideMenuItem key={item.path} item={item}/>
                ))}
            </ul>
        </nav>
    )
}
