import type { User } from "./User.ts";

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    refresh: () => Promise<void>;
};