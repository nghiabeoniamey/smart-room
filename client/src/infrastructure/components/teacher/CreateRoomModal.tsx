import CustomModal from "@/infrastructure/ui/components/modal/Modal";
import {useState} from "react";
import {ModalCProps} from "@/infrastructure/types/modal.type";
import {SaoStar} from "@/infrastructure/ui/components/star/SaoStar";

interface Room {
    name: string;
    duration: number;
    isRecording: boolean;
}

export const CreateRoomModal = ({isOpen, onCancel}: ModalCProps) => {

    const [formData, setFormData] = useState<Room>({
        name: '',
        duration: 60,
        isRecording: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // validate
        try {
            // do something
        } catch (err) {
            // do something
            console.log(err);
        }
    };

    const handleConfirm = () => {

    }

    return (
        <>
            <CustomModal
                title={"Create Room"}
                visible={isOpen}
                onOk={handleConfirm}
                onCancel={onCancel}

            >
                <form onSubmit={handleSubmit} className="rounded-xl grid gap-4 text-xs">
                    <div className="grid gap-1">
                        <label htmlFor="room">Room name <SaoStar/></label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-3 border-1 rounded-md"
                            placeholder="Type room name here"
                            required={true}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="duration">Duration <SaoStar/></label>
                        <input
                            id="duration"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                            className="p-3 border-1 rounded-md"
                            placeholder="Type duration here"
                            required={true}
                        />
                    </div>
                    <div className="flex items-center justify-start gap-3">
                        <div className="inline-flex items-center">
                            <label className="flex items-center cursor-pointer relative">
                                <input
                                    type="checkbox"
                                    name="isRecording"
                                    checked={formData.isRecording}
                                    onChange={handleChange}
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-teal-600 checked:border-teal-600"
                                />
                                <span
                                    className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5"
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                            </label>
                        </div>
                        <label htmlFor="rememberMe" className="cursor-pointer">Is recording</label>
                    </div>
                </form>
            </CustomModal>
        </>
    );
};