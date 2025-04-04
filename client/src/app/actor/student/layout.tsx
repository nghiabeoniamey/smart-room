'use client'

import {StudentSidebar} from '@/infrastructure/components/student/Sidebar';
import {ActorHeader} from "@/infrastructure/components/common/ActorHeader";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <ActorHeader/>
            <StudentSidebar/>
            {children}
        </div>
    );
}