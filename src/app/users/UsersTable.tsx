import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/table';
import { User } from '@/types/user';

interface Props {
    users: User[];
    isLoading?: boolean
}

export function UsersTable({ users, isLoading = false }: Props) {
    return (
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
                            Loading...
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
    );
}