'use client'

import {usePathname} from 'next/navigation';
import Link from "next/link";
import Logo from "@/infrastructure/assets/icon/edulivelighticon.svg";
import Image from "next/image";
import {IconChalkboard, IconHome, IconPlus, IconSettings} from "@tabler/icons-react";
import {CreateRoomModal} from "@/infrastructure/components/teacher/CreateRoomModal";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {URL_TEACHER, URL_TEACHER_CLASS, URL_TEACHER_CONFIG} from "@/infrastructure/constants/path";

export const TeacherSidebar = () => {

    const t = useTranslations('Landing.Actor.Teacher.Sidebar');

    const pathname = usePathname();

    const navLinks = [
        {href: URL_TEACHER, label: t('dashboard'), icon: <IconHome/>},
        {href: URL_TEACHER_CLASS, label: t('classes'), icon: <IconChalkboard/>},
        {href: URL_TEACHER_CONFIG, label: t('config'), icon: <IconSettings/>},
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
            <div className="flex flex-col lg:w-60 md:w-60 overflow-hidden gap-6 p-4">
                <div className="flex justify-start items-center h-20">
                    <Image src={Logo} alt="logo EduLive"/>
                </div>
                <button className={"p-3 rounded-md flex gap-2 justify-center items-center"} onClick={handleOpenModal}>
                    <IconPlus size={28}/>
                    <span>{t('btnCreate')}</span>
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
            <CreateRoomModal
                isOpen={isOpenModal}
                onCancel={handleCloseModal}
            />
        </div>
    );
};