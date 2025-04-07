import { useState, useCallback } from 'react';
import { UserData } from '@/types/user';
import { DEFAULT_MAX_BULK_CREATE_USER_SIZE } from '@/lib/users.constants';

async function uploadUserChunk(chunk: UserData[]): Promise<{ success: boolean; error?: string }> {
    const res = await fetch('/api/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk),
    });

    if (!res.ok) {
        const data = await res.json();
        return { success: false, error: data?.error || 'Unknown error' };
    }

    return { success: true };
}

export function useBulkUserUpload() {
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const upload = useCallback(async (users: UserData[]) => {
        const chunks = Array.from({ length: Math.ceil(users.length / DEFAULT_MAX_BULK_CREATE_USER_SIZE) }, (_, i) =>
            users.slice(i * DEFAULT_MAX_BULK_CREATE_USER_SIZE, (i + 1) * DEFAULT_MAX_BULK_CREATE_USER_SIZE)
        );

        setTotal(chunks.length);
        setProgress(0);
        setErrors([]);
        setIsUploading(true);

        const results = await Promise.all(
            chunks.map(async (chunk, index) => {
                const result = await uploadUserChunk(chunk);
                if (!result.success) {
                    setErrors(prev => [...prev, `Chunk ${index + 1}: ${result.error}`]);
                }
                setProgress(prev => prev + 1);
                return result;
            })
        );

        setIsUploading(false);
        return results;
    }, []);

    return { upload, progress, total, isUploading, errors };
}
