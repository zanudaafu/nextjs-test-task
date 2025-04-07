import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@/components/dialog';
import { Button } from '@/components/button';
import { useBulkUserUpload } from './useBulkUserUpload';
import mockUsers from './../../../mocks/users.mock.json';
import * as XLSX from 'xlsx';
import { UserData } from '@/types/user';

export function UserBulkUploadDialog({ children, onLoadingDoneCallback }: { children: React.ReactNode, onLoadingDoneCallback: Function }) {
    const { upload, progress, total, isUploading, errors } = useBulkUserUpload();
    const [open, setOpen] = useState(false);
    const [previewData, setPreviewData] = useState<UserData[]>([]);

    useEffect(() => { if (!open) { setPreviewData([]) } }, [open, setPreviewData])

    const handleUpload = useCallback(async (users: UserData[]) => {
        try {
            await upload(users);
            setOpen(false);
            onLoadingDoneCallback();
        } catch (err) {
            console.error('Upload failed', err);
        }
    }, [upload, setOpen, onLoadingDoneCallback]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json<any>(firstSheet, { header: 1 });

            const parsed: UserData[] = rows.slice(1).map((row) => ({
                // TODO: add possibility (through .env) to UNSAFE load created_at of even id data from bulk load to BD.
                // TODO: add a lot of checkups and check ege cases and gaps
                name: row[1]?.toString() || '',
                email: row[2]?.toString() || '',
            })).filter(u => u.name && u.email);

            setPreviewData(parsed);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white max-h-[90vh] overflow-auto">
                <DialogTitle>Bulk User Upload</DialogTitle>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Button disabled={isUploading} onClick={() => handleUpload(mockUsers)} className="bg-yellow-600">
                            {isUploading ? 'Uploading...' : 'Load default set'}
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                        <Button
                            disabled={isUploading || previewData.length === 0}
                            className={isUploading || previewData.length === 0 ? "" : "bg-green-600"}
                            onClick={() => handleUpload(previewData)}
                        >
                            {isUploading ? 'Uploading...' : 'Upload from file'}
                        </Button>
                    </div>

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

                    {previewData.length > 0 && (
                        <div className="max-h-64 overflow-y-auto border p-2 rounded bg-muted text-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="pr-4">№</th>
                                        <th className="pr-4">Name</th>
                                        <th className="pr-4">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.map((userPreview, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="pr-4 py-1">{i + 1}</td>
                                            <td className="pr-4 py-1">{userPreview.name}</td>
                                            <td className="pr-4 py-1">{userPreview.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
