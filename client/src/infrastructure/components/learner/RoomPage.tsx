import {useRef, useState} from "react";
import {
    IconCamera,
    IconCameraOff,
    IconChevronLeft,
    IconChevronRight,
    IconMicrophone,
    IconMicrophoneOff,
    IconPresentation,
    IconReplace,
    IconSettings,
    IconTools
} from "@tabler/icons-react";

export default function LearnerRoomPage({roomId}: { roomId: string }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMicrophone, setIsMicrophone] = useState(false)
    const [isCamera, setIsCamera] = useState(false)

    return (
        <div className="room-container">
            <canvas ref={canvasRef} className="canvas-area"/>

            <div className="room-content">
                <div className="controller-wrapper">
                    <div className="controller-group">
                        <div className="button-controller first">
                            <span className="icon-wrapper">
                                <IconPresentation/>
                            </span>
                            <span>Board</span>
                        </div>
                        <div className="button-controller">
                            <span className="icon-wrapper">
                                <IconChevronLeft/>
                            </span>
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
                                <span>/ 10</span>
                            </span>
                            <span>Page</span>
                        </div>
                        <div className="button-controller last">
                            <span className="icon-wrapper">
                                <IconChevronRight/>
                            </span>
                            <span>Next</span>
                        </div>
                    </div>
                    <div className="controller-group">
                        <div className="button-controller first">
                            <span className="icon-wrapper">
                                <IconReplace/>
                            </span>
                            <span>Content</span>
                        </div>
                        <div className="button-controller">
                            <span className="icon-wrapper">
                                <IconTools/>
                            </span>
                            <span>Tools</span>
                        </div>
                        <div className="button-controller">
                            <span className="icon-wrapper">
                                <IconSettings/>
                            </span>
                            <span>Setting</span>
                        </div>
                        <div className="button-controller">
                            <span className="icon-wrapper">
                                {isMicrophone ? <IconMicrophone/> : <IconMicrophoneOff/>}
                            </span>
                            <span>Microphone</span>
                        </div>
                        <div className="button-controller last">
                            <span className="icon-wrapper">
                                {isCamera ? <IconCamera/> : <IconCameraOff/>}
                            </span>
                            <span>Camera</span>
                        </div>
                    </div>
                    {/*<div className="controller-group">*/}
                    {/*    <div className="button-controller first">*/}
                    {/*        <span className="icon-wrapper">*/}
                    {/*            <IconPresentation/>*/}
                    {/*        </span>*/}
                    {/*        <span>Invite</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="button-controller">*/}
                    {/*        <span className="icon-wrapper">*/}
                    {/*            <IconChevronLeft/>*/}
                    {/*        </span>*/}
                    {/*        <span>Participants</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="button-controller last">*/}
                    {/*        <span className="icon-wrapper">*/}
                    {/*            <IconChevronRight/>*/}
                    {/*        </span>*/}
                    {/*        <span>Chat</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}