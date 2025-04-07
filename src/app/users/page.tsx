'use client';

import { UsersTableHeader } from "./UsersGlobalActions"
import { UsersTable } from "./UsersTable"
import { PaginationControls } from "./UsersPagination"

import { useUsersTable } from './useUsersTable';

export default function UsersPage() {
    const { users, page, totalPages, isLoading, setPage, deleteUser, createUser, editUser } = useUsersTable()

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold max-w-6xl mx-auto">Users</h1>
            <div className="max-w-6xl mx-auto">
                <UsersTableHeader setPage={setPage} totalPages={totalPages} createUser={createUser}/>
            </div>

            <div className="rounded-md border max-w-6xl mx-auto">
                <UsersTable users={users} isLoading={isLoading} onDeleteUser={deleteUser} onEditUser={editUser}/>
            </div>

            <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );

}