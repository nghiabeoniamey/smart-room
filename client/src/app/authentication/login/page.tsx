'use client'

import Image from "next/image";
import Logo from "@/infrastructure/assets/icon/eduliveicon.svg";
import {useState} from "react";
import {LoginForm} from "@/infrastructure/services/api/authentication/authentication.api";
import {useLogin} from "@/infrastructure/services/service/authentication/authentication.action";
import {URL_FRONTEND} from "@/infrastructure/constants/url";
import {AxiosError} from "axios";
import {useToast} from "@/infrastructure/context/ToastContext";

export default function Page() {
    const {mutate: login, isPending} = useLogin();
    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState<string | null>(null);

    const {showToast} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            login(formData, {
                onSuccess: (result) => {
                    if (result?.data) {
                        showToast(
                            {
                                title: 'Thông báo!',
                                description: 'Đăng nhập thành công',
                            },
                            'success'
                        )
                        window.location.href = `${URL_FRONTEND}?state=${result.data}`;
                    }
                    if (result instanceof AxiosError) {
                        showToast(
                            {
                                title: 'Thông báo!',
                                description: result?.response?.data?.message
                            },
                            'warning'
                        )
                    }
                },
                onError: (error) => {
                    console.error("Đã xảy ra lỗi khi đăng nhập:", error);
                    showToast(
                        {
                            title: 'Lỗi hệ thống!',
                            description: error?.response?.data?.message || "Đăng nhập thất bại!"
                        },
                        'success',
                        3000
                    )
                },
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    // const handleLoginGoogle = () => {
    //     console.log(
    //         "URL_OAUTH2_GOOGLE + URL_FRONTEND",
    //         URL_OAUTH2_GOOGLE + URL_FRONTEND
    //     );
    //     window.location.href = URL_OAUTH2_GOOGLE + URL_FRONTEND;
    // };

    return (
        <div className="grid w-full h-[calc(100vh)] justify-center items-center pb-40">
            <div className="grid gap-20">
                <Image src={Logo} alt="logo EduLive" className="mx-auto"/>
                <div className="p-6 form border-2 border-neutral-300 grid gap-8 rounded-xl w-[calc(28rem)]">
                    <h1 className={"font-bold text-center text-3xl"}>Sign in</h1>
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="rounded-xl grid gap-4 text-xs">
                        <div className="grid gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-3 border-1 rounded-md"
                                placeholder="Type your email here"
                            />
                        </div>
                        <div className="grid gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="p-3 border-1 rounded-md"
                                placeholder="Type your password here"
                            />
                        </div>
                        <div className="flex items-center justify-start gap-3">
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-teal-600 checked:border-teal-600"
                                    />
                                    <span
                                        className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5"
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                            </div>
                            <label htmlFor="rememberMe" className="cursor-pointer">Remember me?</label>
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="py-4 bg-teal-500 hover:bg-teal-600 rounded-xl text-white transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : 'Login'}
                        </button>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="p-2 border-1 rounded-2xl text-gray-900"*/}
                        {/*    disabled={isPending}*/}
                        {/*    onClick={handleLoginGoogle}*/}
                        {/*>*/}
                        {/*    Google*/}
                        {/*</button>*/}
                    </form>
                </div>
            </div>
        </div>
    );
}