'use client'

import {use, useEffect, useState} from "react";
import {useAuth} from "@/infrastructure/stores/hooks/useAuth";
import TeacherRoomPage from "@/infrastructure/components/teacher/RoomPage";
import LearnerRoomPage from "@/infrastructure/components/learner/RoomPage";

export default function RoomPage({params}: { params: Promise<{ slug: string }> }) {

    const [isTeacher, setIsTeacher] = useState<boolean | null>(null)
    const {user, isAuthenticated} = useAuth();

    const {slug} = use(params);

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.roleCode) {
                setIsTeacher(true);
            } else {
                setIsTeacher(false);
            }
        }
    }, [isAuthenticated, user?.roleCode]);

    return (
        isTeacher ?
            <TeacherRoomPage
                roomId={slug}
            />
            :
            <LearnerRoomPage
                roomId={slug}
            />
    );
}