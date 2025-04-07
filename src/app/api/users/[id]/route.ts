import { NextResponse } from 'next/server';
import { deleteUserById } from '@/lib/users';

export async function DELETE(_: Request, context: { params: { id: string } }) {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    await deleteUserById(id);
    return NextResponse.json({ message: `User ${id} deleted.` });
}