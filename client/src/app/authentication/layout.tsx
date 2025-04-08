'use client'

// import {Header} from "@/infrastructure/components/home/Header";
// import {Footer} from "@/infrastructure/components/home/Footer";

export default function AuthenticationLayout({children,}: { children: React.ReactNode }) {
    return (
        <>
            {/*<Header/>*/}
            {children}
            {/*<Footer/>*/}
        </>
    );
}