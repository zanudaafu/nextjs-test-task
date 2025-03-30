'use client'  // required for client-side fetch
import { useEffect, useState } from 'react'

export default function Home() {
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/hello')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(err => setMessage('Failed to load'))
    }, [])

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl font-bold">
            <div>Tailwind CSS is working 🎉</div>
            {message ? message : 'Loading...'}
        </main>
    )
}
