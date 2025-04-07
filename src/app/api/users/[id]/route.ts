import { NextResponse } from 'next/server';
import { deleteUserById, updateUser } from '@/lib/users';
import { validateUserInput } from '@/lib/validation/userSchema';

export async function DELETE(_: Request, context: { params: { id: string } }) {
    const id = await parseInt(context.params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await deleteUserById(id);
    return NextResponse.json({ message: `User ${id} deleted.` });
}

export async function POST(req: Request, context: { params: { id: string } }) {
    const id = await parseInt(context.params.id);
    if (isNaN(id)) return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 401 });

    const body = await req.json();
    //   TODO: add proper input data validation
    const result = validateUserInput(body);
    if (!result.valid) return Response.json({ errors: result.errors }, { status: 402 });
    const user = await updateUser(id, { name: body.name.trim(), email: body.email.trim() });
    return Response.json(user);
}