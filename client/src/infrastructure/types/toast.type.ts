export enum TOAST_TYPE {
    SUCCESS = "success",
    DANGER = "danger",
    WARNING = "warning",
    INFO = "info",
}

export enum POSITION {
    TOP_LEFT = "top-left",
    TOP_CENTER = "top-center",
    TOP_RIGHT = "top-right",
    MIDDLE_LEFT = "middle-left",
    MIDDLE_CENTER = "middle-center",
    MIDDLE_RIGHT = "middle-right",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_CENTER = "bottom-center",
    BOTTOM_RIGHT = "bottom-right",
}

export interface ToastMessage {
    title: string;
    description?: string;
}

export type ToastType = TOAST_TYPE.SUCCESS | TOAST_TYPE.DANGER | TOAST_TYPE.WARNING | TOAST_TYPE.INFO;
export type ToastPosition =
    POSITION.TOP_LEFT
    | POSITION.TOP_CENTER
    | POSITION.TOP_RIGHT
    | POSITION.MIDDLE_LEFT
    | POSITION.MIDDLE_CENTER
    | POSITION.MIDDLE_RIGHT
    | POSITION.BOTTOM_LEFT
    | POSITION.BOTTOM_CENTER
    | POSITION.BOTTOM_RIGHT;

export interface ToastProps {
    message: ToastMessage;
    type: ToastType;
    duration?: number;
    position?: ToastPosition;
    onClose: () => void;
}

export interface ToastItem {
    id: number;
    message: ToastMessage;
    type: ToastType;
    duration?: number;
    position?: ToastPosition;
}

export interface ToastContextType {
    showToast: (message: ToastMessage, type?: ToastType, duration?: number, position?: ToastPosition) => void;
}
