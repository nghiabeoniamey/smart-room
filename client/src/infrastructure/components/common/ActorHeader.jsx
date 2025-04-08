'use client'

import {useRouter} from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import {useCallback, useEffect, useState} from "react";
import Logo from "@/infrastructure/assets/icon/edulivelighticon.svg";
import VietNamFlag from "@/infrastructure/assets/icon/flag/vietnam.png";
import GreatBritainFlag from "@/infrastructure/assets/icon/flag/united-kingdom.png";
import {useAuth} from "@/infrastructure/stores/hooks/useAuth";
import {IconLogout2} from "@tabler/icons-react";
import {logout} from "@/infrastructure/stores/authSlice";
import {useDispatch} from "react-redux";
import {setUserLocale} from "@/i18n/locale";
import {locales} from "@/i18n/config";
import {useTranslations} from "next-intl";
import {URL_AUTH_LOGIN} from "@/infrastructure/constants/path";

export const ActorHeader = () => {

    const t = useTranslations('Landing.Actor.Header');

    const [isRender, setIsRender] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = useCallback(() => {
        router.push(URL_AUTH_LOGIN);
        dispatch(logout());
    }, [dispatch, router]);

    const handleChangeLanguage = (type) => {
        setUserLocale(type).then(() => {

        })
    }

    useEffect(() => {
        if (!isAuthenticated) {
            handleLogout();
        }
        if (isAuthenticated) {
            setIsRender(true);
        }
    }, [handleLogout, isAuthenticated, user]);


    return (
        isRender &&
        <header>
            <nav className="fixed mx-auto flex w-full items-center justify-between p-4 bg-white shadow-sm z-50"
                 aria-label="Global">

                <Link href="/">
                    <h1 className="font-bold text-neutral-800 hover:text-purple-700 transition-colors duration-300
                    cursor-pointer ms-[18rem]">
                        {t('title')}
                    </h1>
                </Link>

                <div className="flex items-center gap-4 text-xs">
                    <div className="relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer font-bold text-neutral-500"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span>{user?.userName}</span>
                            <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <Image
                                  width={32}
                                  height={32}
                                  className="object-cover w-full h-full rounded-full"
                                  src={user?.profilePicture || Logo}
                                  alt={user?.userName || 'User'}
                              />
                            </span>
                        </div>
                        {isDropdownOpen && (
                            <div
                                className="absolute top-[2.5rem] right-0 w-[15rem] bg-neutral-800 bg-opacity-50
                                rounded-lg shadow-xl z-20">
                                <ul>
                                    <li
                                        className={"text-neutral-300 flex justify-start items-center gap-4 ps-4 p-3 " +
                                            "cursor-pointer hover:bg-neutral-600 rounded-t-lg"}
                                        onClick={() => handleLogout()}
                                    >
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center">
                                            <IconLogout2 size={30}/>
                                        </span>
                                        {t('account.logout')}
                                    </li>
                                    <li
                                        className={"text-neutral-300 flex justify-start items-center gap-4 ps-4 p-3 " +
                                            "cursor-pointer hover:bg-neutral-600"}
                                        onClick={() => handleChangeLanguage(locales[0])}
                                    >
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center">
                                          <Image
                                              className="object-cover w-full h-full rounded-full"
                                              src={GreatBritainFlag}
                                              alt={'GreatBritainFlag'}
                                          />
                                        </span>
                                        {t('account.english')}
                                    </li>
                                    <li
                                        className={"text-neutral-300 flex justify-start items-center gap-4 ps-4 p-3 " +
                                            "cursor-pointer hover:bg-neutral-600 rounded-b-lg"}
                                        onClick={() => handleChangeLanguage(locales[1])}
                                    >
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center">
                                          <Image
                                              className="object-cover w-full h-full rounded-full"
                                              src={VietNamFlag}
                                              alt={'VietNamFlag'}
                                          />
                                        </span>
                                        {t('account.vietnam')}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};