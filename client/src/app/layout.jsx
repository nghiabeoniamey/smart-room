import "@/app/globals.scss";
import {TanstackProvider} from "@/infrastructure/providers/TanstackProvider";
import {ToastProvider} from "@/infrastructure/providers/context/ToastContext";
import StoreProvider from "@/infrastructure/providers/StoreProvider";
import {getLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export default async function RootLayout({children}) {

    const locale = await getLocale();

    return (
        <html lang={locale}>
        <head>
            <title>Smart Room</title>
        </head>
        <body className="scrollbar">
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
        </body>
        </html>
    );
}