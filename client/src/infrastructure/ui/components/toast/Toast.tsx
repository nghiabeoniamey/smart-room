'use client'

import {useEffect} from 'react';
import {ToastProps} from "@/infrastructure/types/toast.type";
import {IconAlertTriangleFilled, IconCircleCheckFilled, IconFaceIdError, IconInfoCircle} from "@tabler/icons-react";

const Toast = ({message, type, duration, onClose, index = 0}: ToastProps & { index?: number }) => {

    /**
     * Timer
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    /**
     * Default type: info
     */
    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <IconCircleCheckFilled size={24} color="green"/>
                );
            case 'danger':
                return (
                    <IconFaceIdError size={24} color="red"/>
                );
            case 'warning':
                return (
                    <IconAlertTriangleFilled size={24} color="orange"/>
                );
            default:
                return (
                    <IconInfoCircle size={24} color="blue"/>
                );
        }
    };

    /**
     * Default color: info
     */
    const getColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-700 toast-success';
            case 'danger':
                return 'border-red-500 toast-danger';
            case 'warning':
                return 'border-yellow-500 toast-warning';
            default:
                return 'border-blue-500 toast-info';
        }
    };

    return (
        <div
            className={`
                fixed right-4 z-50 border-l-4 p-4 rounded shadow-lg max-w-xs min-w-1/4
                ${getColor()}
                transition-all duration-500 ease-in-out
                translate-x-0 opacity-100
            `}
            style={{
                top: `${5 + (index * 6)}rem`,
                transform: 'translateX(0)',
            }}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                    {getIcon()}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium">{message.title ? message.title : 'Thông báo'}</p>
                    {message.description && (
                        <p className="text-sm mt-1">{message.description ? message.description : 'Thông báo mặc định'}</p>
                    )}
                </div>
                <button
                    className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 absolute top-[1rem] right-[1rem] cursor-pointer"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5 label" fill="currentColor" viewBox="0 0 26 26"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Toast;