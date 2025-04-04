'use client'

import {useEffect} from 'react';
import {POSITION, TOAST_TYPE, ToastProps} from "@/infrastructure/types/toast.type";
import {IconAlertTriangleFilled, IconCircleCheckFilled, IconFaceIdError, IconInfoCircle} from "@tabler/icons-react";

const Toast = ({message, type, duration, position, onClose, index = 0}: ToastProps & { index?: number }) => {

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
            case TOAST_TYPE.SUCCESS:
                return (
                    <IconCircleCheckFilled size={24} color="green"/>
                );
            case TOAST_TYPE.DANGER:
                return (
                    <IconFaceIdError size={24} color="red"/>
                );
            case TOAST_TYPE.WARNING:
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
            case TOAST_TYPE.SUCCESS:
                return 'border-green-700 toast-success';
            case TOAST_TYPE.DANGER:
                return 'border-red-500 toast-danger';
            case TOAST_TYPE.WARNING:
                return 'border-yellow-500 toast-warning';
            default:
                return 'border-blue-500 toast-info';
        }
    };

    /**
     * Position configuration for 8 directions
     */
    const getPosition = () => {
        switch (position) {
            case POSITION.TOP_LEFT:
                return 'top-4 left-4 border-b-4';
            case POSITION.TOP_CENTER:
                return 'top-4 left-1/2 transform -translate-x-1/2 border-b-4';
            case POSITION.TOP_RIGHT:
                return 'top-4 right-4 border-b-4';
            case POSITION.MIDDLE_LEFT:
                return 'top-1/2 left-4 transform -translate-y-1/2 border-r-4';
            case POSITION.MIDDLE_CENTER:
                return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-y-4';
            case POSITION.MIDDLE_RIGHT:
                return 'top-1/2 right-4 transform -translate-y-1/2 border-l-4';
            case POSITION.BOTTOM_LEFT:
                return 'bottom-4 left-4 border-t-4';
            case POSITION.BOTTOM_CENTER:
                return 'bottom-4 left-1/2 transform -translate-x-1/2 border-t-4';
            case POSITION.BOTTOM_RIGHT:
                return 'bottom-4 right-4 border-t-4';
            default:
                return 'top-4 right-4 border-l-4';
        }
    };

    /**
     * Calculate vertical position for stacked toasts
     */
    const getStackedPosition = () => {
        if (position?.includes('top')) {
            return {top: `${5 + (index * 6)}rem`};
        } else if (position?.includes('middle')) {
            return {
                top: '50%',
                marginTop: `${index * 6}rem`
            };
        } else if (position?.includes('bottom')) {
            return {bottom: `${5 + (index * 6)}rem`};
        }
        return {top: `${5 + (index * 6)}rem`};
    };

    return (
        <div
            className={`
                fixed z-50 p-4 rounded shadow-lg max-w-xs min-w-1/4
                ${getColor()}
                ${getPosition()}
                transition-all duration-500 ease-in-out
                translate-x-0 opacity-100
                bg-white dark:bg-neutral-900
            `}
            style={getStackedPosition()}
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