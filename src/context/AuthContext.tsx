import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../types/AuthContext.ts";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
    refresh: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // === LOGIN ===
    const login = async (email: string, password: string) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error("Login failed");

        const me = await fetch("/api/auth/me", { credentials: "include" });
        if (me.ok) setUser(await me.json());
    };

    // === LOGOUT ===
    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
    };

    // === REFRESH ===
    const refresh = async (): Promise<boolean> => {
        try {
            const r = await fetch("/api/auth/refresh", {
                method: "POST",
                credentials: "include",
            });

            if (!r.ok) return false;

            const me = await fetch("/api/auth/me", { credentials: "include" });
            if (me.ok) {
                setUser(await me.json());
                return true;
            }
        } catch (err) {
            console.error("Refresh failed:", err);
        }
        return false;
    };

    // === INITIAL AUTH CHECK ===
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", { credentials: "include" });
                if (res.ok) {
                    setUser(await res.json());
                } else {
                    const refreshed = await refresh();
                    if (!refreshed) {
                        setUser(null);
                    }
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
