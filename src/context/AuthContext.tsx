import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../types/AuthContext.ts";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refresh: async () => {}
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("api/auth/me", { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    const r = await fetch("api/auth/refresh", {
                        method: "POST",
                        credentials: "include"
                    });
                    if (r.ok) {
                        const recheck = await fetch("/api/auth/me", {
                            credentials: "include",
                        })
                        if (recheck.ok) setUser(await recheck.json());
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, refresh }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);