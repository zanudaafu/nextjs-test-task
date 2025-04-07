import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/table';
import { User } from '@/types/user';
import { UserRow } from './UserRow';

interface Props {
    users: User[];
    isLoading?: boolean
    onDeleteUser: (user: User) => void
}

export function UsersTable({ users, isLoading = false, onDeleteUser }: Props) {
    return (
        <Table>
            <TableHeader className="bg-muted/60">
                <TableRow>
                    <TableHead className="w-20">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                    // TODO: Add debounce to loading
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                            Loading...
                        </TableCell>
                    </TableRow>
                )}
                {(users.map((user) => (
                    <UserRow user={user} key={user.id} onDelete={onDeleteUser} />
                ))
                )}
            </TableBody>
        </Table>
    );
}