'use client'

import Link from "next/link";
import {IconRefreshDot, IconShieldExclamation} from "@tabler/icons-react";

export default function UnauthorizedPage() {

    return <div className="grid w-full h-[calc(100vh)] justify-center items-center">
        <div className={"grid gap-5 text-3xl font-bold justify-center items-center"}>
            Unauthorized
            <span className={'flex justify-center items-center'}><IconShieldExclamation size={90} color={'red'}/></span>
            <Link className={'p-4 rounded-md btn gap-2'} href="/authentication/login">Try Again <IconRefreshDot/></Link>
        </div>
    </div>
}