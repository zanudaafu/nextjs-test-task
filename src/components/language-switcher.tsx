'use client';

import { SUPPORTED_LOCALES } from '@/i18n/request';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/dropdown-menu';
import { Globe } from 'lucide-react';
import { Button } from '@/components/button';

export function LocaleSwitcher() {
    const router = useRouter();

    const switchLocale = async (locale: string) => {
        await fetch('/api/set-locale', {
            method: 'POST',
            body: JSON.stringify({ locale }),
        });

        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Change language">
                    <Globe className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900">
                {SUPPORTED_LOCALES.map((l) => (
                    <DropdownMenuItem key={l.localeName} onClick={() => switchLocale(l.localeName)}>
                        {l.localeTitle}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
