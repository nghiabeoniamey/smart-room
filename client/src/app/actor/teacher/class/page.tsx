'use client'

import {useState} from 'react';
import {IRoom, sampleIRooms, sampleTPRooms, TABS, TPRoom} from "@/infrastructure/types/class.type";
import {IconCalendarWeek, IconHourglassHigh, IconNumber, IconPlaylist} from "@tabler/icons-react";
import {useToast} from "@/infrastructure/providers/context/ToastContext";
import {POSITION, TOAST_TYPE} from "@/infrastructure/types/toast.type";
import Link from "next/link";
import {AudioListModal} from "@/infrastructure/components/teacher/AudioListModal";

export default function TeacherClassesPage() {
    const [activeTab, setActiveTab] = useState(TABS.INCOMING);
    const {showToast} = useToast();
    const [roomId, setRoomId] = useState<string>('');

    const [iRooms, setIRooms] = useState<IRoom[]>(sampleIRooms);
    const [pRooms, setPRooms] = useState<TPRoom[]>(sampleTPRooms);

    const copyClipboard = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            showToast({
                title: "Copied",
                description: `Copy to clipboard: ${code}`,
            }, TOAST_TYPE.INFO, 3000, POSITION.TOP_CENTER)
        });
    }

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handleOpenModal = (roomId: string) => {
        setRoomId(roomId);
        setIsOpenModal(true);
    }

    return (
        <div className="mt-10 p-10 w-full">
            <h1 className={"text-3xl text-black font-bold"}>Live Rooms</h1>
            <div className="my-4 text-sm flex justify-between items-center w-full">
                <ul className="flex flex-wrap -mb-px font-medium text-center" id="default-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
                                activeTab === TABS.INCOMING
                                    ? 'text-[#2D8692] border-[#2D8692] dark:text-[#2D8692] dark:border-[#2D8692]'
                                    : 'text-gray-600 hover:text-[#2D8692] hover:border-[#2D8692] dark:hover:text-[#2D8692] border-transparent'
                            }`}
                            onClick={() => setActiveTab(TABS.INCOMING)}
                            type="button"
                            role="tab"
                        >
                            Incoming
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
                                activeTab === TABS.PASSED
                                    ? 'text-[#2D8692] border-[#2D8692] dark:text-[#2D8692] dark:border-[#2D8692]'
                                    : 'text-gray-600 hover:text-[#2D8692] hover:border-[#2D8692] dark:hover:text-[#2D8692] border-transparent'
                            }`}
                            onClick={() => setActiveTab(TABS.PASSED)}
                            type="button"
                            role="tab"
                        >
                            Passed
                        </button>
                    </li>
                </ul>
                <div
                    className="flex border-1 border-neutral-300 p-2 w-[14rem] h-[2.8rem] space-x-4 rounded-xl justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-100" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input className="outline-none bg-transparent" type="text" placeholder="Search"/>
                </div>
            </div>
            <div id="tab-content">
                <div
                    className={`${
                        activeTab !== TABS.INCOMING && 'hidden'
                    }`}
                    id={TABS.INCOMING}
                    role="tabpanel"
                >
                    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {iRooms.map((room, index) => (
                            <div key={index}
                                 className="p-4 border grid gap-6 rounded-lg border-neutral-300 shadow-sm bg-white gap-3
                                  grid-cols-1 hover:shadow-xl">
                                <Link href={`/actor/teacher/class/` + room.code}
                                      className="text-md truncate font-bold">{room.title}</Link>
                                <div className="grid gap-4 text-sm">
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconNumber/></span>
                                        <span>
                                            {room.code} -
                                            <a
                                                title='copy room code'
                                                onClick={() => copyClipboard(room.code)}
                                                className={"text-[#2D8692] border-[#2D8692] dark:text-[#2D8692] dark:border-[#2D8692] ml-1 cursor-pointer font-bold"}
                                            >
                                                Copy
                                            </a>
                                        </span>
                                    </div>
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconHourglassHigh/></span>
                                        <span>{room.duration}'</span>
                                    </div>
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconCalendarWeek/></span>
                                        <span>{room.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${
                        activeTab !== TABS.PASSED && 'hidden'
                    }`}
                    id={TABS.PASSED}
                    role="tabpanel"
                >
                    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {pRooms.map((room, index) => (
                            <div key={index}
                                 className="p-4 border grid gap-6 rounded-lg border-neutral-300 shadow-sm bg-white gap-3
                                  grid-cols-1 hover:shadow-xl">
                                <div className={"flex items-center justify-between gap-3 font-bold"}>
                                    <Link href={`/actor/teacher/class/` + room.code}
                                          className="text-md truncate">{room.title}</Link>
                                    <div
                                        className={"flex items-center justify-end gap-1 w-[10rem] text-sm cursor-pointer"}
                                        onClick={() => handleOpenModal(room.code)}
                                    >
                                        <span><IconPlaylist size={'1.2rem'} color={'#2D8692'}/></span>
                                        <span className={"text-[0.8rem] text-neutral-600"}>Audio record</span>
                                    </div>
                                </div>
                                <div className="grid gap-4 text-sm">
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconNumber/></span>
                                        <span>
                                            {room.code} -
                                            <a
                                                title='copy room code'
                                                onClick={() => copyClipboard(room.code)}
                                                className={"text-[#2D8692] border-[#2D8692] dark:text-[#2D8692] dark:border-[#2D8692] ml-1 cursor-pointer font-bold"}
                                            >
                                                Copy
                                            </a>
                                        </span>
                                    </div>
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconHourglassHigh/></span>
                                        <span>{room.duration}'</span>
                                    </div>
                                    <div className={"flex items-center gap-3"}>
                                        <span><IconCalendarWeek/></span>
                                        <span>{room.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <AudioListModal
                isOpen={isOpenModal}
                onCancel={handleCloseModal}
                data={roomId}
            />
        </div>
    );
}