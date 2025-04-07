import { useEffect, useState, useCallback } from 'react';
import { User } from '@/types/user';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';

export function useUnsafeDeleteAllUsers() {
    const deleteAllUsersUNSAFE = useCallback(async (callback: Function) => {
        try {
            await fetch(`/api/users`, { method: 'DELETE' });
            await callback()
        } catch (err) {
            // TODO: process error
            console.log(err);
        }
    }, [])

    return { deleteAllUsersUNSAFE }
}

export function useUsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = DEFAULT_PAGE_SIZE;

    const loadPage = useCallback(async (pageNumber = page) => {
        setIsLoading(true); // TODO: Add debounce to loading
        try {
            const res = await fetch(`/api/users?page=${pageNumber}&pageSize=${pageSize}`);
            const data = await res.json();
            setUsers(data.users);
            setTotal(data.total);
        } catch (err) {
            // TODO: process error
            console.log(err);
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

    useEffect(() => {
        loadPage();
    }, [page, loadPage]);

    const totalPages = Math.ceil(total / pageSize);

    return {
        users,
        page,
        total,
        pageSize,
        totalPages,
        isLoading,
        setPage,
        loadPage,
        deleteUser
    };
}