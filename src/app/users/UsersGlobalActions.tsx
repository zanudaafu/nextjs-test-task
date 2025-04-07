import { useCallback } from 'react';
import { Button } from '@/components/button';
import { useUnsafeDeleteAllUsers } from './useUsersTable'
import { ConfirmDeleteDialog } from './ConfirmDialogDeleteAllUsers'

interface Props {
    loadPage: (page?: number) => void
}

export function UsersTableHeader({ loadPage }: Props) {
    const { deleteAllUsersUNSAFE } = useUnsafeDeleteAllUsers();
    const deleteAllUsersUNSAFECallback = useCallback(() => deleteAllUsersUNSAFE(loadPage), [deleteAllUsersUNSAFE, loadPage])
    return (
        <div className="flex justify-end gap-2">
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
    );
}