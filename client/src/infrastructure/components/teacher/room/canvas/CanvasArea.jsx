import Link from "next/link";
import {URL_TEACHER_CLASS} from "@/infrastructure/constants/path";
import {
    IconCamera,
    IconCameraOff,
    IconChevronDown,
    IconChevronUp,
    IconHome,
    IconLayoutSidebar,
    IconMicrophone,
    IconMicrophoneOff,
    IconReplace,
    IconSettings,
    IconTools
} from "@tabler/icons-react";
import {useRef, useState} from "react";


export default function CanvasArea({
                                       isResizedCanvas,
                                       handleSwitchResize,
                                   }) {

    const [isMicrophone, setIsMicrophone] = useState(false);
    const [isDropdownMicrophone, setIsDropdownMicrophone] = useState(false);
    const [isCamera, setIsCamera] = useState(false);
    const [isDropdownCamera, setIsDropdownCamera] = useState(false);

    const canvasRef = useRef(null);

    // cho 1 danh sách canvas trong quản lý để


    const handleMicrophone = (isMicrophone) => {
        setIsMicrophone(!isMicrophone);
    }

    const handleDropdownMicrophone = (isDropDown) => {
        setIsDropdownMicrophone(!isDropDown);
    }

    const handleCamera = (isCamera) => {
        setIsCamera(!isCamera);
    }

    const handleDropdownCamera = (isDropDown) => {
        setIsDropdownCamera(!isDropDown);
    }

    return (
        <div className={`room-canvas-area ${isResizedCanvas && 'active'}`}>
            {/*Top Controllers */}
            <div className={"room-canvas-top"}>
                <Link href={URL_TEACHER_CLASS} className={"icon-home"}>
                    <IconHome/>
                </Link>
                <div className={"room-title"}>
                    <h3>Edulive</h3>
                    <div className={"br"}>

                    </div>
                    <span>Smart Room</span>
                </div>
                <button className={`btn-resize ${!isResizedCanvas && 'active'}`}
                        onClick={() => handleSwitchResize(isResizedCanvas, 'resize')}>
                    <IconLayoutSidebar/>
                </button>
            </div>
            {/*Canvas Progress*/}
            <canvas ref={canvasRef} className="canvas-area"/>
            {/*Navigation Bar Center*/}
            <div className="navigation-bar center">
                <div className="group-controller not-selected"></div>
                <div className="group-controller">
                    <div className="button-controller">
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
                    <div className="button-controller relative w-fit">
                        <button className="icon-wrapper">
                            {isMicrophone ? <IconMicrophone/> : <IconMicrophoneOff/>}
                        </button>
                        <span>Microphone</span>
                        <button className="icon-wrapper absolute right-0 top-1">
                            {!isDropdownMicrophone ? <IconChevronUp size={12}/> :
                                <IconChevronDown size={12}/>}
                        </button>
                    </div>
                    <div className="button-controller relative w-fit">
                        <button className="icon-wrapper">
                            {isCamera ? <IconCamera/> : <IconCameraOff/>}
                        </button>
                        <span>Camera</span>
                        <button className="icon-wrapper absolute right-[-0.6rem] top-1">
                            {!isDropdownCamera ? <IconChevronUp size={12}/> :
                                <IconChevronDown size={12}/>}
                        </button>
                    </div>
                </div>
                <div className="group-controller not-selected"></div>
            </div>
        </div>
    )
}