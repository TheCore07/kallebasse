import { createContext } from "react";
import type { AddToastFn } from "../types/Toast";

export const ToastContext = createContext<AddToastFn>(() => {
    console.warn("ToastProvider fehlt!");
});
