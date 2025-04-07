import { NextRequest, NextResponse } from 'next/server';
import { getUsersPage, deleteAllUsers } from '@/lib/users';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';

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