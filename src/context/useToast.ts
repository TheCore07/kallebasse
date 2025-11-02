import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import type { AddToastFn } from "../types/Toast";

export function useToast(): AddToastFn {
    return useContext(ToastContext);
}
