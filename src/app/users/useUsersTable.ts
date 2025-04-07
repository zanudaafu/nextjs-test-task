import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { DEFAULT_PAGE_SIZE } from '@/lib/users.constants';

export function useUsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = DEFAULT_PAGE_SIZE;

    useEffect(() => {
        setIsLoading(true);
        // TODO: consider make connect api service make type checking
        fetch(`/api/users?page=${page}&pageSize=${pageSize}`)
            .then((res) => res.json())
            .then((data) => {
                // TODO: consider handle return not expected page size or not expected page number
                // TODO: add handling edge cases
                setUsers(data.users);
                setTotal(data.total);
            })
            .catch((err) => {
                // TODO: process error
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [page, setIsLoading]);

    const totalPages = Math.ceil(total / pageSize);

    return {
        users,
        page,
        total,
        pageSize,
        totalPages,
        isLoading,
        setPage,
    };
}