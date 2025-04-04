'use client'

import "@/app/globals.scss";
import {TanstackProvider} from "@/infrastructure/providers/TanstackProvider";
import {ToastProvider} from "@/infrastructure/providers/context/ToastContext";
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
                    {children}
                </ToastProvider>
            </TanstackProvider>
        </StoreProvider>
        </body>
        </html>
    );
}