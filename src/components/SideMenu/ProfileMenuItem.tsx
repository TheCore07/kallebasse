import { UserCircleIcon } from '@heroicons/react/24/outline';

type Props = {
    collapsed: boolean;
};

export default function ProfileMenuItem({ collapsed }: Props) {
    return (
        <li>
            <div
                className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-2"
                } p-2 rounded hover:bg-gray-700 w-full text-gray-300 transition-colors cursor-pointer`}
            >
                <UserCircleIcon className="h-5 w-5"/>
                {!collapsed && <span className="">Admin</span>}
            </div>
        </li>
    );
}
