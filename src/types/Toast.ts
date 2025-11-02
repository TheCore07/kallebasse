export type ToastType = "error" | "success" | "warning" | "info";

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    visible: boolean;
}

export type AddToastFn = (type: ToastType, message: string, duration?: number) => void;
