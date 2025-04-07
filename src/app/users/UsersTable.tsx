import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/table';
import { User, UserData } from '@/types/user';
import { UserRow } from './UserRow';
import { UserFormDialog, useEditUserModal } from './UserFormDialog';
import type { EditUserCallback } from './useUsersTable';
import { useCallback } from 'react';
interface Props {
    users: User[];
    isLoading?: boolean;
    onDeleteUser: (user: User) => void;
    onEditUser: EditUserCallback
}

export function UsersTable({ users, isLoading = false, onDeleteUser, onEditUser }: Props) {
    const { editingUser, setEditingUser, clearEditingUser, onEditConfirm } = useEditUserModal(onEditUser);
    const onSubmitForm = useCallback((user: UserData) => onEditConfirm(user), [onEditConfirm]);

    return (
        <>
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
                        <UserRow user={user} key={user.id} onDelete={onDeleteUser} onSetEditingUser={setEditingUser} />
                    ))
                    )}
                </TableBody>
            </Table>
            {!!editingUser && (<UserFormDialog
                user={editingUser}
                onSubmit={onSubmitForm}
                onClose={clearEditingUser}
                isOpen={!!editingUser}
            />)
            }
        </>
    );
}