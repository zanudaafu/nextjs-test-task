'use client'  // required for client-side fetch
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/users');
}
