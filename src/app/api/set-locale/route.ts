import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { locale } = await req.json();
    const cookieStore = await cookies();
    cookieStore.set('locale', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
    });

    return new Response(null, { status: 204 });
}
