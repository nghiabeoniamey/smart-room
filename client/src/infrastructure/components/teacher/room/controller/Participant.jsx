'use client'

import {IconX} from "@tabler/icons-react";

export default function Participant({
                                        isParticipants,
                                        handleSwitchResize
                                    }) {


    return (<div className={`participant ${isParticipants ? 'active' : ''}`}>
        <div className={"participant-wrapper"}>
            <div className={"participant-header"}>
                <h3 className={"participant-title"}>Participants</h3>
                <button className={"participant-close"}
                        onClick={() => handleSwitchResize(isParticipants, 'participants')}>
                    <IconX/>
                </button>
            </div>
        </div>
    </div>)
}
