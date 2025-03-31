export interface ToastMessage {
    title: string;
    description?: string;
}

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export interface ToastProps {
    message: ToastMessage;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

export interface ToastItem {
    id: number;
    message: ToastMessage;
    type: ToastType;
    duration?: number;
}

export interface ToastContextType {
    showToast: (message: ToastMessage, type?: ToastType, duration?: number) => void;
}
