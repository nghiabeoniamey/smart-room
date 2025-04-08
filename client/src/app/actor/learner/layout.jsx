'use client'

import {LearnerSidebar} from '@/infrastructure/components/learner/Sidebar';
import {ActorHeader} from "@/infrastructure/components/common/ActorHeader";

export default function LearnerLayout({children,}) {
    return (
        <div className="flex">
            <ActorHeader/>
            <LearnerSidebar/>
            {children}
        </div>
    );
}