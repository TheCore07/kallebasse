import { api } from "./axios";

export async function login(email: string, password: string) {
    return api.post("/auth/login", { email, password });
}

export async function refresh() {
    return api.post("/auth/refresh");
}

export async function getMe() {
    return api.get("/auth/me");
}

export async function logout() {
    return api.post("/auth/logout");
}
