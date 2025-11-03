import type { ReactNode } from 'react'

export type MenuItem = {
    label: string;
    path: string;
    icon?: ReactNode;
}

export type ProfileMenuItem = {
    label: string;
    action: () => void;
    icon?: ReactNode;
}