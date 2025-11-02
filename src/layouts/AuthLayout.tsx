import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className="items-center justify-center bg-gray-50">
            {children}
        </div>
    )
}