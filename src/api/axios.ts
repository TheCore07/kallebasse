import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { refresh } from "./auth";

let isRefreshing = false;
let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];
let interceptorRegistered = false;

export const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const setupAxiosInterceptors = (logout: () => void) => {
    if (interceptorRegistered) return;
    interceptorRegistered = true;

    api.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

            if (!error.response) return Promise.reject(error);

            // 401 auf Refresh schlägt fehl → einfach Fehler zurückgeben
            if (error.config?.url?.includes("/auth/refresh") && error.response.status === 401) {
                isRefreshing = false;
                return Promise.reject(error);
            }

            if (error.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => api(originalRequest));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await refresh();
                    failedQueue.forEach((p) => p.resolve(null));
                    failedQueue = [];
                    return api(originalRequest);
                } catch (refreshError) {
                    failedQueue.forEach((p) => p.reject(refreshError));
                    failedQueue = [];
                    return Promise.reject(refreshError); // Logout handled im AuthProvider
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
