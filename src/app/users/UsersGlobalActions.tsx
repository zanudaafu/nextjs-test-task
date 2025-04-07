import { useCallback } from 'react';
import { Button } from '@/components/button';
import { useUnsafeDeleteAllUsers } from './useUsersTable'
import { ConfirmDeleteDialog } from './ConfirmDialogDeleteAllUsers'

interface Props {
    loadPage: (page: number) => void
}

export function UsersTableHeader({ loadPage }: Props) {
    const { deleteAllUsersUNSAFE } = useUnsafeDeleteAllUsers();
    const deleteAllUsersUNSAFECalback = useCallback(() => deleteAllUsersUNSAFE(() => loadPage(1)), [deleteAllUsersUNSAFE, loadPage])
    return (
        <div className="flex justify-end gap-2">
            <Button variant="outline" className="bg-green-500" onClick={() => {
                // todo:
            }}>
                Load new
            </Button>

            <ConfirmDeleteDialog onConfirm={deleteAllUsersUNSAFECalback}>
                <Button variant="outline" className="bg-red-500">Delete All</Button>
            </ConfirmDeleteDialog>
        </div>
    );
}