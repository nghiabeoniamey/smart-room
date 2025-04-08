'use client'

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from "next/image";
import Logo from "@/infrastructure/assets/icon/edulivelighticon.svg";
import {IconChalkboard, IconHome, IconLogin2, IconSettings} from "@tabler/icons-react";
import {useState} from "react";
import {JoinRoomModal} from "@/infrastructure/components/learner/JoinRoomModal";
import {URL_LEARNER, URL_LEARNER_CLASS, URL_LEARNER_CONFIG,} from "@/infrastructure/constants/path";
import {useTranslations} from "next-intl";

export const LearnerSidebar = () => {

    const t = useTranslations('Landing.Actor.Learner.Sidebar');

    const pathname = usePathname();

    const navLinks = [
        {href: URL_LEARNER, label: t('dashboard'), icon: <IconHome/>},
        {href: URL_LEARNER_CLASS, label: t('classes'), icon: <IconChalkboard/>},
        {href: URL_LEARNER_CONFIG, label: t('config'), icon: <IconSettings/>},
    ];

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    return (
        <div className="min-h-screen flex flex-row z-50 sidebar">
            <div className="flex flex-col lg:w-60 md:w-60 w-56 overflow-hidden gap-6 p-4">
                <div className="flex justify-start items-center h-20">
                    <Image src={Logo} alt="logo EduLive"/>
                </div>
                <button className={"p-3 rounded-md flex gap-2 justify-center items-center"} onClick={handleOpenModal}>
                    <IconLogin2 size={28}/>
                    <span>{t('btnJoin')}</span>
                </button>
                <ul className="flex flex-col py-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex flex-row items-center h-12  gap-4
                                ${
                                    pathname === link.href
                                        ? 'text-[#45C9DE] font-medium'
                                        : 'hover:text-[#45C9DE]'
                                }`}
                            >
                                {link.icon}
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <JoinRoomModal
                isOpen={isOpenModal}
                onCancel={handleCloseModal}
            />
        </div>
    );
};