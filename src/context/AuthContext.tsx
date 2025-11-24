import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "@/api/axios";
import type { User } from "@/types/User";

interface AuthContextType {
    user: User;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
    refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // await fetch("/auth/logout", { method: "POST", credentials: "include" });
            await apiLogout();
        } catch { /* ignore */ }
        setUser(null);
        navigate("/login", { replace: true });
    };

    const refreshUser = async () => {
        setLoading(true);
        try {
            const res = await getMe();
            setUser(res.data);
        } catch {
            await logout(); // Logout nur hier einmalig
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setupAxiosInterceptors(); // nur einmal
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
