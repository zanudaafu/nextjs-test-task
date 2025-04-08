import '@/styles/globals.css';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
    title: 'Zanuda test',
    description: 'Test task of nextjs for Zanuda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head />
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
