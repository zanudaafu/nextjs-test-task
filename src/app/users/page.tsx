'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/table';
import { User } from '@/types/user';
import { Button } from '@/components/button';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = DEFAULT_PAGE_SIZE;

    useEffect(() => {
        fetch(`/api/users?page=${page}&pageSize=${pageSize}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
                setTotal(data.total);
            });
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Users</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                    Previous
                </Button>

                <div className="text-sm">
                    Page {page} of {totalPages}
                </div>

                <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 