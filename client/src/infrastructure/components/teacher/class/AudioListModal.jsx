import CustomModal from "@/infrastructure/ui/components/modal/Modal";
import {sampleAudioList} from "@/infrastructure/types/audio.type";
import {IconDownload, IconPlayerPause, IconPlayerPlay} from "@tabler/icons-react";
import React, {useState} from "react";

export const AudioListModal = ({isOpen, onCancel, data}) => {

    const [audioList, setAudioList] = useState(sampleAudioList);

    const defaultFooter = (
        <div className="py-3 px-4 text-right justify-end flex gap-4">
            <button className="py-3 px-6 rounded-md text-xs bg-neutral-50 border-1 border-[#2D8692]
                    text-[#2D8692] cursor-pointer
                    hover:bg-[#2D8692] hover:text-neutral-50
                " onClick={onCancel}>
                Close
            </button>
        </div>

    );

    // processes data...

    const handleDownloadAudio = (download) => {
        console.log(download);
        // processes download
    }

    // active

    const handlePlayAudio = (audio) => {
        // processes audio
    }

    return (
        <>
            <CustomModal
                title={"Audio List"}
                visible={isOpen}
                onCancel={onCancel}
                footer={defaultFooter}
            >
                <div className={"grid grid-cols-1 h-[50vh] max-h-screen overflow-y-auto pr-2 scrollbar"}>
                    {audioList.map((audio, index) => (
                        <div
                            key={index}
                            className="py-3 border-b-1 border-neutral-300 bg-white flex items-center
                            justify-between grid-cols-1 text-sm"
                        >
                            {audio.active ? (
                                <>
                                    <div
                                        className={"flex items-center gap-3 cursor-pointer"}
                                        onClick={() => handlePlayAudio(audio)}
                                    >
                                        <span>
                                             <IconPlayerPlay color={"#2D8692"}/>
                                        </span>
                                        <span>
                                            {audio.name}
                                        </span>
                                    </div>
                                    <span className={"cursor-pointer"}>
                                        <IconDownload
                                            color={"#2D8692"}
                                            onClick={() => handleDownloadAudio(audio.download)}
                                        />
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className={"flex items-center gap-3 w-full"}>
                                        <span>
                                            <IconPlayerPause color={"#2D8692"}/>
                                        </span>
                                        {/*<audio*/}
                                        {/*    slot="media"*/}
                                        {/*    src={audio.src}*/}
                                        {/*    playsInline*/}
                                        {/*    className={"w-full mr-4 h-1 bg-neutral-400 accent-[#2D8692] rounded-lg appearance-none cursor-pointer"}*/}
                                        {/*></audio>*/}
                                        <input
                                            type="range"
                                            min="0"
                                            max={audio.duration || 100}
                                            className="w-full mr-4 h-1 bg-neutral-400 accent-[#2D8692] rounded-lg
                                            appearance-none styled-slider slider-progress cursor-pointer"
                                        />
                                    </div>
                                    <span>{audio.duration}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </CustomModal>
        </>
    );
};