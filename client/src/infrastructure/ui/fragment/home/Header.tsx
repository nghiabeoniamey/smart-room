'use client'

import Link from 'next/link';

export const Header = () => {

    return (
        <header>
            <nav className="fixed mx-auto flex w-full items-center justify-between p-3 lg:px-50 bg-white shadow-sm z-50"
                 aria-label="Global">

                <Link href="/public">
                    <h1 className="font-bold text-purple-500 hover:text-purple-700 transition-colors duration-300 cursor-pointer">
                        This is Header
                    </h1>
                </Link>

                <div className="flex flex-wrap justify-center gap-5">
                    <Link href={"/authentication/login"}
                          className="px-3 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white transition-colors duration-300 cursor-pointer"
                    >
                        Sign In
                    </Link>

                    <Link href={"/authentication/register"}
                          className="px-3 py-2 bg-amber-500 hover:bg-amber-600 rounded-xl text-white transition-colors duration-300 cursor-pointer"
                    >
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
};