import { useState, useCallback } from "react";
import type { ReactNode, JSX } from "react";
import {
    XCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ToastContext } from "./ToastContext";
import type { Toast, ToastType, AddToastFn } from "../types/Toast";

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast: AddToastFn = useCallback((type, message, duration = 3000) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, type, message, visible: true }]);

        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
            );
        }, duration - 300);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
}

function ToastContainer({ toasts }: ToastContainerProps) {
    const typeStyles: Record<ToastType, string> = {
        error: "bg-red-500 text-white",
        success: "bg-green-500 text-white",
        warning: "bg-amber-500 text-white",
        info: "bg-blue-500 text-white",
    };

    const typeIcons: Record<ToastType, JSX.Element> = {
        error: <XCircleIcon className="w-5 h-5 mr-2" />,
        success: <CheckCircleIcon className="w-5 h-5 mr-2" />,
        warning: <ExclamationTriangleIcon className="w-5 h-5 mr-2" />,
        info: <InformationCircleIcon className="w-5 h-5 mr-2" />,
    };

    return (
        <div id="toastContainer" className="fixed top-4 right-4 flex flex-col gap-2 z-50 w-max pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center px-4 py-2 rounded shadow-lg font-medium ${
                        typeStyles[toast.type]
                    } ${toast.visible ? "animate-fade-in" : "animate-fade-out"} pointer-events-auto`}
                >
                    {typeIcons[toast.type]}
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
