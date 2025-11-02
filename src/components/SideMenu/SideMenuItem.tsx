import type { MenuItem } from "../../types/Menu.ts";
import { Link } from "react-router-dom";

type Props = {
    item: MenuItem;
}

export default function SideMenuItem({ item }: Props) {
    return (
        <li>
            <Link to={item.path} className="flex items-center gap-2 p-2 hover:bg-amber-100 rounded">
                {item.icon}
                {item.label}
            </Link>
            {item.children && (
                <ul className="ml-4">
                    {item.children.map((child) => (
                        <SideMenuItem key={child.path} item={child} />
                    ))}
                </ul>
            )}
        </li>
    )
}
