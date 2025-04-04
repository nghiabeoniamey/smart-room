'use client'

import {TeacherSidebar} from "@/infrastructure/components/teacher/Sidebar";
import {ActorHeader} from "@/infrastructure/components/common/ActorHeader";

export default function TeacherLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <ActorHeader/>
            <TeacherSidebar/>
            {children}
        </div>
    );
}