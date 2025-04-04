export interface ModalCProps {
    isOpen: boolean;
    onCancel: () => void;
}

export interface ModalUProps<T> {
    isOpen: boolean;
    onCancel: () => void;
    data: T;
}
