import Link from "next/link";
import {IconCalendarWeek, IconHourglassHigh, IconNumber, IconPlaylist} from "@tabler/icons-react";
import {IRoom, TPRoom} from "@/infrastructure/types/class.type";
import {URL_ROOM} from "@/infrastructure/constants/path";

interface RoomCardProps {
    room: IRoom | TPRoom;
    copyClipboard: (code: string) => void;
    t: (key: string) => string;
    showRecordings?: boolean;
    onShowRecordings?: (roomId: string) => void;
    showCode?: boolean;
}

const RoomCard = ({
                      room,
                      copyClipboard,
                      t,
                      showRecordings = false,
                      onShowRecordings,
                      showCode = true
                  }: RoomCardProps) => (
    <div className="room-card">
        <div className="room-card__header">
            <Link href={URL_ROOM + `/${room.code}`} className="text-md truncate">
                {room.title}
            </Link>
            {showRecordings && (
                <div className="room-card__audio-btn" onClick={() => onShowRecordings?.(room.code)}>
                    <IconPlaylist size="1.2rem" color="#2D8692"/>
                    <span>{t('passed.record')}</span>
                </div>
            )}
        </div>
        <div className="room-card__content">
            {showCode && (
                <div className="room-card__detail">
                    <IconNumber/>
                    <span>
                        {room.code} -
                        <button
                            title={t('copy')}
                            onClick={() => copyClipboard(room.code)}
                            className="room-card__copy-btn"
                        >
                            {t('copy')}
                        </button>
                    </span>
                </div>
            )}
            <div className="room-card__detail">
                <IconHourglassHigh/>
                <span>{room.duration}'</span>
            </div>
            <div className="room-card__detail">
                <IconCalendarWeek/>
                <span>{room.date}</span>
            </div>
        </div>
    </div>
);

export default RoomCard;