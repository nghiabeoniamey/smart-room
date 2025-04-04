import React, {ReactNode} from 'react';

interface ModalProps {
    title?: ReactNode;
    visible: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    children: ReactNode;
    footer?: ReactNode | null;
    width?: number | string;
    isOk?: boolean;
    isCancel?: boolean;
}

const CustomModal: React.FC<ModalProps> = ({
                                               title,
                                               visible,
                                               onOk,
                                               onCancel,
                                               okText = 'Confirm',
                                               cancelText = 'Cancel',
                                               children,
                                               footer,
                                               width = 520,
                                               isOk = true,
                                               isCancel = true,
                                           }) => {
    if (!visible) return null;

    const defaultFooter = (
        <div className="py-3 px-4 text-right justify-end flex gap-4">
            {isCancel &&
                <button className="py-3 px-6 rounded-md text-xs bg-neutral-50 border-1 border-[#2D8692]
                    text-[#2D8692]
                    hover:bg-[#2D8692] hover:text-neutral-50
                " onClick={onCancel}>
                    {cancelText}
                </button>
            }
            {isOk &&
                <button className="py-3 px-6 rounded-md border-1 hover:bg-[#2D8692] hover:border-[#2D8692] text-xs"
                        onClick={onOk}>
                    {okText}
                </button>
            }
        </div>
    );

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center
            items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 h-full grid justify-center items-center w-full">
                    <div className="relative bg-white rounded-lg shadow-xl " style={{width}}>
                        <div
                            className="flex items-center justify-between p-4 md:p-5 rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                            rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
                            dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal"
                                onClick={onCancel}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="pt-0 p-5">
                            {children}
                        </div>
                        {footer !== null && (footer || defaultFooter)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomModal;