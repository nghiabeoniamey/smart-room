'use client'

import {useState} from 'react';
import {sampleIRooms, sampleTPRooms, TABS} from "@/infrastructure/types/class.type";
import {useToast} from "@/infrastructure/providers/context/ToastContext";
import {POSITION, TOAST_TYPE} from "@/infrastructure/types/toast.type";
import {AudioListModal} from "@/infrastructure/components/teacher/AudioListModal";
import {useTranslations} from "next-intl";
import RoomCard from "@/infrastructure/components/common/RoomCard";

export default function TeacherClassesPage() {
    const t = useTranslations('Landing.Actor.Teacher.Classes')
    const [activeTab, setActiveTab] = useState(TABS.INCOMING);
    const {showToast} = useToast();
    const [roomId, setRoomId] = useState('');
    const [iRooms, setIRooms] = useState(sampleIRooms);
    const [pRooms, setPRooms] = useState(sampleTPRooms);
    const [isOpenModal, setIsOpenModal] = useState(false);

    async function copyClipboard(code) {
        try {
            await navigator.clipboard.writeText(code);
            showToast({
                title: t('message.copy.title'),
                description: `${t('message.copy.description')} ${code}`,
            }, TOAST_TYPE.INFO, 3000, POSITION.TOP_CENTER);
        } catch (err) {
            console.log(err);
            showToast({
                title: t('message.error.title'),
                description: t('message.copy.error'),
            }, TOAST_TYPE.WARNING, 3000, POSITION.TOP_CENTER);
        }
    }

    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModal = (roomId) => {
        setRoomId(roomId);
        setIsOpenModal(true);
    }

    return (
        <div className="classes-container">
            <h1 className="classes-container__title">{t('title')}</h1>

            <div className="classes-container__controls">
                <ul className="tab-list" role="tablist">
                    <li className="tab-list__item" role="presentation">
                        <button
                            className={`tab-list__button ${activeTab === TABS.INCOMING ? 'tab-list__button--active' : ''}`}
                            onClick={() => setActiveTab(TABS.INCOMING)}
                            type="button"
                            role="tab"
                        >
                            {t('incoming.title')}
                        </button>
                    </li>
                    <li className="tab-list__item" role="presentation">
                        <button
                            className={`tab-list__button ${activeTab === TABS.PASSED ? 'tab-list__button--active' : ''}`}
                            onClick={() => setActiveTab(TABS.PASSED)}
                            type="button"
                            role="tab"
                        >
                            {t('passed.title')}
                        </button>
                    </li>
                </ul>

                <div className="search-box">
                    <svg className="search-box__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input className="search-box__input" type="text" placeholder="Search"/>
                </div>
            </div>

            <div className="rooms-container">
                <div
                    className={`rooms-section ${activeTab !== TABS.INCOMING ? 'rooms-section--hidden' : ''}`}
                    role="tabpanel"
                >
                    <div className="rooms-grid">
                        {iRooms.map((room, index) => (
                            <RoomCard
                                key={index}
                                room={room}
                                copyClipboard={copyClipboard}
                                t={t}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className={`rooms-section ${activeTab !== TABS.PASSED ? 'rooms-section--hidden' : ''}`}
                    role="tabpanel"
                >
                    <div className="rooms-grid">
                        {pRooms.map((room, index) => (
                            <RoomCard
                                key={index}
                                room={room}
                                copyClipboard={copyClipboard}
                                t={t}
                                onShowRecordings={handleOpenModal}
                                showRecordings={true}
                                showCode={false}
                            />
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