'use client'

import {useTranslations} from 'next-intl';

export default function Page() {

    const t = useTranslations('Landing');

    return <div className="grid w-full h-[calc(100vh)] justify-center items-center">
        <h1 className={"text-3xl font-bold p-42"}>{t('title')}</h1>
    </div>
}