'use client'

import {usePathname} from 'next/navigation';
import Link from "next/link";

export const TeacherSidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        {href: '/actor/teacher', label: 'Home'},
        {href: '/actor/teacher/class', label: 'Classes'},
        {href: '/actor/teacher/config', label: 'Config'}
    ];

    return (
        <div className="min-h-screen flex flex-row bg-gray-100 z-50">
            <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
                </div>
                <ul className="flex flex-col py-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 
                                ${
                                    pathname === link.href
                                        ? 'bg-purple-100 text-purple-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <span></span>
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};