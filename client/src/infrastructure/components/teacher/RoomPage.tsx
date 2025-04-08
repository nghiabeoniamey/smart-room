import {useRef, useState} from "react";
import {
    IconCamera,
    IconCameraOff,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconMessages,
    IconMicrophone,
    IconMicrophoneOff,
    IconPresentation,
    IconReplace,
    IconSettings,
    IconTools,
    IconUsersGroup
} from "@tabler/icons-react";

export default function TeacherRoomPage({roomId}: { roomId: string }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMicrophone, setIsMicrophone] = useState(false);
    const [isDropdownMicrophone, setIsDropdownMicrophone] = useState(false)
    const [isCamera, setIsCamera] = useState(false)

    return (
        <div className="room-container">
            <canvas ref={canvasRef} className="canvas-area"/>

            <div className="room-content">
                <div className="controller-wrapper">
                    <div className="controller-group">
                        <div className="button-controller first">
                            <button className="icon-wrapper">
                                <IconPresentation/>
                            </button>
                            <span>Board</span>
                        </div>
                        <div className="button-controller">
                            <button className="icon-wrapper">
                                <IconChevronLeft/>
                            </button>
                            <span>Back</span>
                        </div>
                        <div className="button-controller page-input">
                            <span className="input-wrapper">
                                <input
                                    min={1}
                                    max={10}
                                    type="number"
                                    value={3}
                                    onChange={() => {
                                    }}
                                />
                                <span>/10</span>
                            </span>
                            <span>Page</span>
                        </div>
                        <div className="button-controller last">
                            <button className="icon-wrapper">
                                <IconChevronRight/>
                            </button>
                            <span>Next</span>
                        </div>
                    </div>
                    <div className="controller-group">
                        <div className="button-controller first">
                            <button className="icon-wrapper">
                                <IconReplace/>
                            </button>
                            <span>Content</span>
                        </div>
                        <div className="button-controller">
                            <button className="icon-wrapper">
                                <IconTools/>
                            </button>
                            <span>Tools</span>
                        </div>
                        <div className="button-controller">
                            <button className="icon-wrapper">
                                <IconSettings/>
                            </button>
                            <span>Setting</span>
                        </div>
                        {/*<div className="button-controller ">*/}
                        {/*    <div className={"icon-wrapper"}>*/}
                        {/*        <button className="icon-wrapper">*/}
                        {/*            {isMicrophone ? <IconMicrophone/> : <IconMicrophoneOff/>}*/}
                        {/*        </button>*/}
                        {/*        <button className="icon-wrapper">*/}
                        {/*            {!isDropdownMicrophone ? <IconChevronUp size={12}/> : <IconChevronDown size={12}/>}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*    <span>Microphone</span>*/}
                        {/*</div>*/}
                        {/*<div className="button-controller last ">*/}
                        {/*    <div className={"icon-wrapper"}>*/}
                        {/*        <button className="icon-wrapper">*/}
                        {/*            {isCamera ? <IconCamera/> : <IconCameraOff/>}*/}
                        {/*        </button>*/}
                        {/*        <button className="icon-wrapper">*/}
                        {/*            {!isDropdownMicrophone ? <IconChevronUp size={12}/> : <IconChevronDown size={12}/>}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*    <span>Camera</span>*/}
                        {/*</div>*/}
                        <div className="button-controller relative w-fit">
                            <button className="icon-wrapper">
                                {isMicrophone ? <IconMicrophone/> : <IconMicrophoneOff/>}
                            </button>
                            <span>Microphone</span>
                            <button className="icon-wrapper absolute right-0 top-1">
                                {!isDropdownMicrophone ? <IconChevronUp size={12}/> : <IconChevronDown size={12}/>}
                            </button>
                        </div>
                        <div className="button-controller last relative w-fit">
                            <button className="icon-wrapper">
                                {isCamera ? <IconCamera/> : <IconCameraOff/>}
                            </button>
                            <span>Camera</span>
                            <button className="icon-wrapper absolute right-[-0.6rem] top-1">
                                {!isDropdownMicrophone ? <IconChevronUp size={12}/> : <IconChevronDown size={12}/>}
                            </button>
                        </div>
                    </div>
                    <div className="controller-group">
                        <div className="button-controller first">
                            <button className="icon-wrapper">
                                <IconPresentation/>
                            </button>
                            <span>Invite</span>
                        </div>
                        <div className="button-controller">
                            <button className="icon-wrapper">
                                <IconUsersGroup/>
                            </button>
                            <span>Participants</span>
                        </div>
                        <div className="button-controller last">
                            <button className="icon-wrapper">
                                <IconMessages/>
                            </button>
                            <span>Chat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}