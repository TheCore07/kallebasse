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

    // === Neue Funktion: Login ===
    const login = async (email: string, password: string, stayLoggedIn: boolean) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password, stayLoggedIn }),
        });

        if (!res.ok) throw new Error("Login failed");

        // Jetzt sofort User holen
        const me = await fetch("/api/auth/me", { credentials: "include" });
        if (me.ok) setUser(await me.json());
    };

    // === Logout ===
    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
    };

    // === Refresh ===
    const refresh = async () => {
        const r = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
        if (r.ok) {
            const me = await fetch("/api/auth/me", { credentials: "include" });
            if (me.ok) setUser(await me.json());
        }
    };

    // === Initialer Auth Check ===
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", { credentials: "include" });
                if (res.ok) {
                    setUser(await res.json());
                } else {
                    await refresh();
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
