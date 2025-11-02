import type { ReactNode } from 'react'

export type MenuItem = {
    label: string;
    path: string;
    icon?: ReactNode;
    children?: MenuItem[];
}