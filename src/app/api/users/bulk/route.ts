import { bulkCreateUsers } from '@/lib/users';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!Array.isArray(body)) {
            return new Response(JSON.stringify({ error: 'Expected array of users' }), { status: 400 });
        }

        const result = await bulkCreateUsers(body);

        return new Response(JSON.stringify(result), {
            status: result.errors.length > 0 ? 400 : 200
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}