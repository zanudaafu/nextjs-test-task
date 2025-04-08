import '@/styles/globals.css';
import { ThemeProvider } from "@/components/theme-provider"

import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/language-switcher';

export const metadata = {
    title: 'Zanuda test',
    description: 'Test task of nextjs for Zanuda',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning className="dark">
            <head />
            <body>
                <NextIntlClientProvider>
                    <div className="max-w-6xl mx-auto px-4 pt-4 flex justify-end"> <LocaleSwitcher /> </div>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
