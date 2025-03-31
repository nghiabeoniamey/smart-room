'use client'

import {TeacherSidebar} from "@/infrastructure/ui/fragment/teacher/Sidebar";

export default function TeacherLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <TeacherSidebar/>
            <main className="flex-1 ml-64 p-6">
                {children}
            </main>
        </div>
    );
}