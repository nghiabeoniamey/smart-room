'use client'

import "@/app/globals.scss";
import {Header} from "@/infrastructure/ui/fragment/home/Header";
import {Footer} from "@/infrastructure/ui/fragment/home/Footer";
import {TanstackProvider} from "@/infrastructure/providers/TanstackProvider";
import {ToastProvider} from "@/infrastructure/context/ToastContext";
import StoreProvider from "@/infrastructure/providers/StoreProvider";

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <head>
            <title>Smart Room</title>
        </head>
        <body className="scrollbar">
        {/*StoreProvider*/}
        <StoreProvider>
            {/*tanstack for api*/}
            <TanstackProvider>
                {/*toast config*/}
                <ToastProvider>
                    <Header/>
                    {children}
                    <Footer/>
                </ToastProvider>
            </TanstackProvider>
        </StoreProvider>
        </body>
        </html>
    );
}