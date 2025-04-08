import { TableRow, TableCell } from '@/components/table';
import { User } from '@/types/user';
import { Button } from '@/components/button';
import { ConfirmDeleteDialog } from "./ConfirmDialogDeleteUser";
import { Trash2, Pen } from 'lucide-react'

interface Props {
    user: User;
    onDelete: (user: User) => void;
    onSetEditingUser: (user: User) => void;
}

export function UserRow({ user, onDelete, onSetEditingUser }: Props) {

    return (
        <TableRow
            className="hover:bg-zinc-800 transition-colors border-b"
        >
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell className="text-right">{new Date(user.created_at).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
                <Button size="sm" className="bg-yellow-500" onClick={() => { onSetEditingUser(user) }}>Edit<Pen className="h-4 w-4" /></Button>
                <ConfirmDeleteDialog user={user} onConfirm={onDelete}>
                    <Button variant="destructive" size="sm" className="bg-red-500">Delete <Trash2 className="h-4 w-4" /></Button>
                </ConfirmDeleteDialog>
            </TableCell>
        </TableRow>
    )
}