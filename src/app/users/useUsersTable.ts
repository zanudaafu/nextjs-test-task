import { useEffect, useState, useCallback, useMemo } from 'react';
import type { User, UserData, UserMetaData } from '@/types/user';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';

export type EditUserCallback = (userID: UserMetaData['id'], userData: UserData) => void;

export function useUnsafeDeleteAllUsers() {
    const deleteAllUsersUNSAFE = useCallback(async (callback: Function) => {
        try {
            await fetch(`/api/users`, { method: 'DELETE' });
            await callback()
        } catch (err) {
            // TODO: process error
            console.error(err);
        }
    }, [])

    return { deleteAllUsersUNSAFE }
}

export function useUsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = useMemo(() => DEFAULT_PAGE_SIZE, []);
    const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

    const loadPage = useCallback(async (pageNumber = page) => {
        setIsLoading(true); // TODO: Add debounce to loading
        try {
            const res = await fetch(`/api/users?page=${pageNumber}&pageSize=${pageSize}`);
            const data = await res.json();
            setUsers(data.users);
            setTotal(data.total);
        } catch (err) {
            // TODO: process error
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setUsers, setTotal, setIsLoading]);

    const deleteUser = useCallback(async (user: User) => {
        try {
            await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
            // TODO: show message (toast) on success
            await loadPage(); // Reload page after deletion
        } catch (err) {
            console.error('Failed to delete user', err);
            // TODO: show message (toast) on error
        }
    }, [page, loadPage]);

    const createUser = useCallback(async (userData: UserData) => {
        // TODO: mb add validation here also (for big project)
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
        } catch (err) {
            console.error('Failed to create user', err);
            // TODO: show message (toast) on error
        }
        await loadPage(totalPages); // refresh data
    }, [page, loadPage]);

    const editUser: EditUserCallback = useCallback(async (userID: UserMetaData['id'], userData: UserData) => {
        // TODO: mb add validation here also (for big project)
        try {
            await fetch(`/api/users/${userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
        } catch (err) {
            console.error('Failed to edit user', err);
            // TODO: show message (toast) on error
        }
        await loadPage(); // refresh data
    }, [page, loadPage]);



    useEffect(() => {
        loadPage();
    }, [page, loadPage]);

    return {
        users,
        page,
        total,
        pageSize,
        totalPages,
        isLoading,
        setPage,
        loadPage,
        createUser,
        editUser,
        deleteUser
    };
}