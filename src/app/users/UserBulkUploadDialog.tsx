import { useState,useCallback } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/dialog';
import { Button } from '@/components/button';
import { useBulkUserUpload } from './useBulkUserUpload';
import mockUsers from './../../../mocks/users.mock.json'; // replace with your real path

export function UserBulkUploadDialog({ children, onLoadingDoneCallback }: { children: React.ReactNode, onLoadingDoneCallback: Function }) {
    const { upload, progress, total, isUploading, errors } = useBulkUserUpload();
    const [open, setOpen] = useState(false);

    const handleUpload = useCallback(async () => {
        try {
            await upload(mockUsers);
            setOpen(false);
            onLoadingDoneCallback();
        } catch (err) {
            console.error('Upload failed', err);
        }
    },[upload, setOpen, onLoadingDoneCallback]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white    ">
                <DialogTitle>Bulk User Upload</DialogTitle>

                <div className="space-y-2">
                    <Button disabled={isUploading} onClick={handleUpload} className="bg-green-600">
                        {isUploading ? 'Uploading...' : 'Load default set'}
                    </Button>

                    {isUploading && (
                        <p className="text-sm text-muted-foreground">
                            Uploading... {progress} of {total} batches
                        </p>
                    )}

                    {errors.length > 0 && (
                        <div className="text-sm text-red-500 space-y-1">
                            {errors.map((e, i) => <p key={i}>{e}</p>)}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
