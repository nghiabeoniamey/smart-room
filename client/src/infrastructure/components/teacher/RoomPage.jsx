'use client'

import {useState} from "react";
import {
    IconChevronLeft,
    IconChevronRight,
    IconMessages,
    IconPresentation,
    IconUsersGroup,
    IconX
} from "@tabler/icons-react";
import CanvasArea from "@/infrastructure/components/teacher/room/canvas/CanvasArea";
import {useToast} from "@/infrastructure/providers/context/ToastContext";
import Thumbnail from "@/infrastructure/components/teacher/room/controller/Thumbnail";
import Participant from "@/infrastructure/components/teacher/room/controller/Participant";

export default function TeacherRoomPage({roomId}) {

    const {showToast} = useToast();

    const [isResizedCanvas, setIsResizedCanvas] = useState(false);
    const [isMissingPartBg, setIsMissingPartBg] = useState(false);
    const [isThumbnailsCanvas, setIsThumbnailsCanvas] = useState(false);
    const [isParticipants, setIsParticipants] = useState(false);
    const [isInvite, setIsInvite] = useState(false);
    const [isChat, setIsChat] = useState(false);

    const handleSwitchResize = (isResize, type) => {
        switch (type) {
            case "resize":
                setIsResizedCanvas(!isResize);
                setIsThumbnailsCanvas(!isResize);
                setIsParticipants(!isResize);
                setIsMissingPartBg(!isResize);
                setIsInvite(false);
                setIsChat(false);
                break;
            case "thumbnails":
                setIsThumbnailsCanvas(!isResize);
                break;
            case "participants":
                setIsResizedCanvas(!isResize)
                setIsParticipants(!isResize);
                setIsMissingPartBg(!isResize);
                setIsResizedCanvas(!isResize);
                setIsInvite(false);
                setIsChat(false);
                break;
            case "invite":
                setIsResizedCanvas(!isResize)
                setIsParticipants(false);
                setIsMissingPartBg(!isResize);
                setIsResizedCanvas(!isResize);
                setIsInvite(!isResize);
                setIsChat(false);
                break;
            case "chat":
                setIsResizedCanvas(!isResize)
                setIsParticipants(false);
                setIsMissingPartBg(!isResize);
                setIsResizedCanvas(!isResize);
                setIsInvite(false);
                setIsChat(!isResize);
                break;
            default:
                showToast({
                    title: "Warning",
                    description: "U need set type for switch handle: ", type
                }, "warning");
        }
    }

    return (<div className="room-container">
        <div className="room-wrapper">
            <div className="room-grid">
                <CanvasArea
                    isResizedCanvas={isResizedCanvas}
                    handleSwitchResize={handleSwitchResize}
                />
                {/* Navigation Bar [Left Bottom */}
                <div className="navigation-bar left">
                    <div className="group-controller">
                        <div
                            className={`button-controller ${isThumbnailsCanvas && 'active'}`}
                            onClick={() => handleSwitchResize(isThumbnailsCanvas, 'thumbnails')}
                        >
                            <button className="icon-wrapper">
                                <IconPresentation/>
                            </button>
                            <span>Board</span>
                        </div>
                        <div className={`button-controller`}>
                            <button className="icon-wrapper">
                                <IconChevronLeft/>
                            </button>
                            <span>Back</span>
                        </div>
                        <div className={`button-controller  page-input`}>
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
                        <div className={`button-controller`}>
                            <button className="icon-wrapper">
                                <IconChevronRight/>
                            </button>
                            <span>Next</span>
                        </div>
                    </div>
                </div>
                {/* Navigation Bar [Right Bottom] */}
                <div className="navigation-bar right">
                    <div className="group-controller">
                        <div
                            className={`button-controller ${isInvite && 'active'}`}
                            onClick={() => handleSwitchResize(isInvite, 'invite')}
                        >
                            <button className="icon-wrapper">
                                <IconPresentation/>
                            </button>
                            <span>Invite</span>
                        </div>
                        <div
                            className={`button-controller ${isParticipants && 'active'}`}
                            onClick={() => handleSwitchResize(isParticipants, 'participants')}
                        >
                            <button className="icon-wrapper">
                                <IconUsersGroup/>
                            </button>
                            <span>Participants</span>
                        </div>
                        <div
                            className={`button-controller ${isChat && 'active'}`}
                            onClick={() => handleSwitchResize(isChat, 'chat')}
                        >
                            <button className="icon-wrapper">
                                <IconMessages/>
                            </button>
                            <span>Chat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={"missing-part-container left top"}>
            {/* Thumbnail */}
            <Thumbnail
                isThumbnailsCanvas={isThumbnailsCanvas}
                handleSwitchResize={handleSwitchResize}
            />
        </div>
        <div className={"missing-part-container right top"}>
            {/* Invite */}
            <div className={`invite ${isInvite ? 'active' : ''}`}>
                <div className={"invite-wrapper"}>
                    <div className={"invite-header"}>
                        <h3 className={"invite-title"}>Invite</h3>
                        <button className={"invite-close"}
                                onClick={() => handleSwitchResize(isInvite, 'invite')}>
                            <IconX/>
                        </button>
                    </div>
                </div>
            </div>
            {/* Participants */}
            <Participant
                isParticipants={isParticipants}
                handleSwitchResize={handleSwitchResize}
            />
            {/* Chat */}
            <div className={`chat ${isChat ? 'active' : ''}`}>
                <div className={"chat-wrapper"}>
                    <div className={"chat-header"}>
                        <h3 className={"chat-title"}>Chat</h3>
                        <button className={"chat-close"}
                                onClick={() => handleSwitchResize(isChat, 'chat')}>
                            <IconX/>
                        </button>
                    </div>
                </div>
            </div>
            {/* Background Part */}
            <div className={`bg-missing-part ${isMissingPartBg ? 'active' : ''}`}>
            </div>
        </div>
    </div>);
}