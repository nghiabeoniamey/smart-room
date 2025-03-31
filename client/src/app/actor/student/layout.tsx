'use client'

import {StudentSidebar} from '@/infrastructure/ui/fragment/student/Sidebar';

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <StudentSidebar/>
            {children}
        </div>
    );
}