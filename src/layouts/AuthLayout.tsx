import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth} from "../context/AuthContext.tsx";
import Loading from "../pages/Loading.tsx";

type Props = {
    children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;

    if (user) return <Navigate to="/" replace />

    return (
        <div className="items-center justify-center bg-gray-50">
            {children}
        </div>
    )
}