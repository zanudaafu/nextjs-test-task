import { NextRequest, NextResponse } from 'next/server';
import { getUsersPage, deleteAllUsers, createUser } from '@/lib/users';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';
import { validateUserInput } from '@/lib/validation/userSchema';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString(), 10);

    const data = await getUsersPage(page, pageSize);
    return NextResponse.json(data);
}

export async function DELETE() {
    await deleteAllUsers();
    return NextResponse.json({ message: 'All users deleted.' });
}

export async function POST(req: Request) {
    const body = await req.json();
    //   TODO: add proper input data validation
    const result = validateUserInput(body);
    if (!result.valid) return Response.json({ errors: result.errors }, { status: 400 });

    const user = await createUser({ name: body.name.trim(), email: body.email.trim() });
    return Response.json(user);
}