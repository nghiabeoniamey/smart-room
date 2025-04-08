import CustomModal from "@/infrastructure/ui/components/modal/Modal";
import {useState} from "react";
import {SaoStar} from "@/infrastructure/ui/components/star/SaoStar";

export const JoinRoomModal = ({isOpen, onCancel}) => {

    const [formData, setFormData] = useState({
        code: ""
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
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
                title={"Join Room"}
                visible={isOpen}
                onOk={handleConfirm}
                onCancel={onCancel}

            >
                <form onSubmit={handleSubmit} className="rounded-xl grid gap-4 text-xs">
                    <div className="grid gap-1">
                        <label htmlFor="room">Room code <SaoStar/></label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            value={formData.code}
                            onChange={handleChange}
                            className="p-3 border-1 rounded-md"
                            placeholder="Type room name here"
                            required={true}
                        />
                    </div>
                </form>
            </CustomModal>
        </>
    );
};