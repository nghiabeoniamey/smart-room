'use client'

import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const StudentSidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        {href: '/actor/student', label: 'Home'},
        {href: '/actor/student/class', label: 'Classes'},
        {href: '/actor/student/config', label: 'Config'}
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-40">
            <div className="p-4 border-b border-gray-200">
                <Link href="/public">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                        <h1 className="text-xl font-bold text-purple-600">EduPlatform</h1>
                    </div>
                </Link>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    pathname === link.href
                                        ? 'bg-purple-100 text-purple-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};