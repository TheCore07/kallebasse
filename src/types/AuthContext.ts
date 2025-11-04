import type { User } from "./User.ts";

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};