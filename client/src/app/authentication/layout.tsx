'use client'

import {Header} from "@/infrastructure/components/home/Header";
import {Footer} from "@/infrastructure/components/home/Footer";

export default function TeacherLayout({children,}: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}