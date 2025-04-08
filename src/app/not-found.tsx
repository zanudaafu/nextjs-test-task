'use client'  // required for client-side fetch
import Link from 'next/link';
import { Button } from '@/components/button';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations("404");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        {t("sorryMessage")}
      </p>
      <Link href="/users">
        <Button variant="outline">{t("goToUsersButton")}</Button>
      </Link>
    </div>
  );
}