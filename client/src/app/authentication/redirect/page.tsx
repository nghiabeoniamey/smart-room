'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {getUserInformation} from "@/infrastructure/util/token.helper";
import {useToast} from "@/infrastructure/providers/context/ToastContext";
import {useDispatch} from "react-redux";
import {login} from "@/infrastructure/stores/authSlice";
import {ROLES} from "@/infrastructure/constants/role";
import {useEffect} from "react";
import {TOAST_TYPE} from "@/infrastructure/types/toast.type";

export default function RedirectPage() {

    const searchParams = useSearchParams();
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const dispatch = useDispatch();
    const router = useRouter()
    const {showToast} = useToast();

    useEffect(() => {
        if (state) {
            try {
                const decodedState = atob(state as string);
                const {accessToken, refreshToken} = JSON.parse(decodedState);
                const user = getUserInformation(accessToken);

                dispatch(login({
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }));

                const userRole = user.roleCode;
                switch (userRole) {
                    case ROLES.ADMIN:
                        router.push("/actor/admin");
                        break;
                    case ROLES.TEACHER:
                        router.push("/actor/teacher");
                        break;
                    case ROLES.STUDENT:
                        router.push("/actor/student");
                        break;
                    default:
                        break;
                }
            } catch (err) {
                console.error("Error processing authentication:", err);
            }
        }
    }, [state, dispatch, router]);

    useEffect(() => {
        if (error) {
            showToast({
                title: "Thông báo",
                description: error,
            }, TOAST_TYPE.DANGER);
        }
    }, [error, showToast]);

    return <div className="grid w-full h-[calc(100vh)] justify-center items-center">
        <h1 className={"text-3xl font-bold"}>Redirecting...</h1>
    </div>
}