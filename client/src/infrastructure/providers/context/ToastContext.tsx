'use client'

import {createContext, ReactNode, useContext, useState} from 'react';
import Toast from "@/infrastructure/ui/components/toast/Toast";
import {
    POSITION,
    TOAST_TYPE,
    ToastContextType,
    ToastItem,
    ToastMessage,
    ToastPosition,
    ToastType
} from "@/infrastructure/types/toast.type";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({children}: {
    children: ReactNode;
}) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = (message: ToastMessage, type: ToastType = TOAST_TYPE.INFO, duration: number = 5000, position: ToastPosition = POSITION.TOP_RIGHT) => {
        const id = Date.now();
        const newToast = {id, message, type, duration, position}
        setToasts((prevToasts) => [...prevToasts, newToast]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <div className="toast-container">
                {toasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        position={toast.position}
                        onClose={() => removeToast(toast.id)}
                        index={index}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
