'use client'

import {use} from "react";

export default function StudentRoomPage({params}: { params: Promise<{ slug: string }> }) {

    const {slug} = use(params);

    return <div className="grid w-full h-[calc(100vh)] justify-start pt-20">
        <h1 className={"text-3xl text-black font-bold ps-10"}>Room Page {slug}</h1>
    </div>
}