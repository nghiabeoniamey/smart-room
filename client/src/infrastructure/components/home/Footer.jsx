'use client'

import Link from 'next/link';

export const Footer = () => {

    return (
        <footer>
            <nav className="mx-auto flex w-full items-center justify-between p-3 lg:px-50 bg-white shadow-sm z-50"
                 aria-label="Global">

                <Link href="/public">
                    <h1 className="font-bold text-purple-500 hover:text-purple-700 transition-colors duration-300 cursor-pointer">
                        This is Footer
                    </h1>
                </Link>

            </nav>
        </footer>
    );
};