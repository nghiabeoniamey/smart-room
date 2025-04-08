"use client";

import {usePathname} from "next/navigation";

export default function Loading() {
    const pathname = usePathname();
    return (
        <div className="grid w-full h-[calc(100vh)] justify-start pt-20">
            <h1 className={"text-3xl font-bold ps-10"}>Loading {pathname}...</h1>
        </div>
    );
}