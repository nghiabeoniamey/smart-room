'use client'

import Link from 'next/link';
import {useAuth} from "@/infrastructure/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Logo from "@/infrastructure/assets/icon/edulivelighticon.svg";
import VietNamFlag from "@/infrastructure/assets/icon/flag/vietnam.png";
import GreatBritainFlag from "@/infrastructure/assets/icon/flag/united-kingdom.png";
import {IconLogout2} from "@tabler/icons-react";
import {logout} from "@/infrastructure/stores/authSlice";
import {useDispatch} from "react-redux";
import {useToast} from "@/infrastructure/providers/context/ToastContext";
import {POSITION, TOAST_TYPE} from "@/infrastructure/types/toast.type";

export const ActorHeader = () => {

    const [isRender, setIsRender] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {showToast} = useToast();

    const handleLogout = useCallback(() => {
        router.push('/authentication/login');
        dispatch(logout());
    }, [dispatch, router]);

    const handleChangeLanguage = (type: string) => {
        switch (type) {
            case 'en':
            case 'vn':
            default:
        }
        showToast({
            title: "Language",
            description: "Language: " + type,
        }, TOAST_TYPE.INFO, 5000, POSITION.TOP_CENTER);
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
                        Welcome back!
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
                                        Logout
                                    </li>
                                    <li
                                        className={"text-neutral-300 flex justify-start items-center gap-4 ps-4 p-3 " +
                                            "cursor-pointer hover:bg-neutral-600"}
                                        onClick={() => handleChangeLanguage('en')}
                                    >
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center">
                                          <Image
                                              className="object-cover w-full h-full rounded-full"
                                              src={GreatBritainFlag}
                                              alt={'GreatBritainFlag'}
                                          />
                                        </span>
                                        Tiếng Anh
                                    </li>
                                    <li
                                        className={"text-neutral-300 flex justify-start items-center gap-4 ps-4 p-3 " +
                                            "cursor-pointer hover:bg-neutral-600 rounded-b-lg"}
                                        onClick={() => handleChangeLanguage('vn')}
                                    >
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center">
                                          <Image
                                              className="object-cover w-full h-full rounded-full"
                                              src={VietNamFlag}
                                              alt={'VietNamFlag'}
                                          />
                                        </span>
                                        Tiếng Việt
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