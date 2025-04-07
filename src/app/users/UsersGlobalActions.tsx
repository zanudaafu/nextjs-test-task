import { useCallback } from 'react';
import { Button } from '@/components/button';
import { useUnsafeDeleteAllUsers } from './useUsersTable'
import { ConfirmDeleteDialog } from './ConfirmDialogDeleteAllUsers'
import { UserFormDialog } from './UserFormDialog';
import { UserData } from '@/types/user';

interface Props {
    loadPage: (page?: number) => void
    createUser: (user: UserData) => void
}

export function UsersTableHeader({ loadPage, createUser }: Props) {
    const { deleteAllUsersUNSAFE } = useUnsafeDeleteAllUsers();
    const deleteAllUsersUNSAFECallback = useCallback(() => deleteAllUsersUNSAFE(loadPage), [deleteAllUsersUNSAFE, loadPage])
    return (
        <div className="flex justify-between items-center gap-2">
            <UserFormDialog onSubmit={createUser}>
                <Button variant="outline" className="bg-green-500">
                    Create user
                </Button>
            </UserFormDialog>

            <div className="flex gap-2">
                <Button variant="outline" className="bg-green-500" onClick={() => {
                    // todo:
                }}>
                    Load new
                </Button>
                {/*
                YOU! Who decided to place DELETE_ALL near ADD - SHAME ON YOU!
                */}
                <ConfirmDeleteDialog onConfirm={deleteAllUsersUNSAFECallback}>
                    <Button variant="outline" className="bg-red-500">Delete All</Button>
                </ConfirmDeleteDialog>
            </div>
        </div>
    );
}