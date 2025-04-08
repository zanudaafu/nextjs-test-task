import { useCallback } from 'react';
import { Button } from '@/components/button';
import { useUnsafeDeleteAllUsers } from './useUsersTable'
import { ConfirmDeleteDialog } from './ConfirmDialogDeleteAllUsers'
import { UserFormDialog } from './UserFormDialog';
import { UserData } from '@/types/user';
import { UserBulkUploadDialog } from './UserBulkUploadDialog';
import { useTranslations } from 'next-intl';

interface Props {
    setPage: (page: number) => void
    totalPages: number;
    createUser: (user: UserData) => void
}

export function UsersTableHeader({ setPage, totalPages, createUser }: Props) {
    const t = useTranslations('users.table.globalActions');
    const { deleteAllUsersUNSAFE } = useUnsafeDeleteAllUsers();
    const deleteAllUsersUNSAFECallback = useCallback(() => deleteAllUsersUNSAFE(setPage), [deleteAllUsersUNSAFE, setPage])
    const goToFirstPage = useCallback(() => setPage(totalPages), [setPage, totalPages])
    return (
        <div className="flex justify-between items-center gap-2">
            <UserFormDialog onSubmit={createUser}>
                <Button variant="outline" className="bg-green-500">
                    {t('create')}
                </Button>
            </UserFormDialog>

            <div className="flex gap-2">
                <UserBulkUploadDialog onLoadingDoneCallback={goToFirstPage}>
                    <Button variant="outline" className="bg-green-500">
                        {t('load')}
                    </Button>
                </UserBulkUploadDialog>
                {/*
                YOU! Who decided to place DELETE_ALL near ADD - SHAME ON YOU!
                */}
                <ConfirmDeleteDialog onConfirm={deleteAllUsersUNSAFECallback}>
                    <Button variant="outline" className="bg-red-500">{t('deleteAll')}</Button>
                </ConfirmDeleteDialog>
            </div>
        </div>
    );
}