'use client'

import {useTranslations} from "next-intl";

export default function TeacherConfigPage() {

    const t = useTranslations('Landing.Actor.Teacher.Config');

    return <div className="grid w-full h-[calc(100vh)] justify-start pt-20">
        <h1 className={"text-3xl font-bold ps-10"}>{t('title')}</h1>
    </div>
}