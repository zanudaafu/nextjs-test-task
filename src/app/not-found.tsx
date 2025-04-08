'use client'  // required for client-side fetch
import Link from 'next/link';
import { Button } from '@/components/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>
      <Link href="/users">
        <Button variant="outline">Go to Users Page</Button>
      </Link>
    </div>
  );
}