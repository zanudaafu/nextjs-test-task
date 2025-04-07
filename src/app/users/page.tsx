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
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = DEFAULT_PAGE_SIZE;

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/users?page=${page}&pageSize=${pageSize}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
                setTotal(data.total);
            })
            .catch((err)=> {
                // TODO: process error
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [page, setIsLoading]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold max-w-6xl mx-auto">Users</h1>

            <div className="rounded-md border max-w-6xl mx-auto">
                <Table>
                    <TableHeader className="bg-muted/60">
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 && !isLoading && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    "Loading..."
                                </TableCell>
                            </TableRow>
                        )}
                        {(users.map((user, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-zinc-800 transition-colors border-b"
                            >
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                <TableCell className="text-right">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t max-w-6xl mx-auto">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setPage(1)} disabled={page === 1}>
                        First
                    </Button>
                    <Button variant="outline" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                        Previous
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                    >
                        Last
                    </Button>
                </div>
            </div>
        </div>
    );

}