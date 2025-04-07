import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogTitle
} from '@/components/dialog';
import { Button } from '@/components/button';

interface Props {
    onConfirm: () => void;
    children: React.ReactNode;
}

export function ConfirmDeleteDialog({ onConfirm, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white">
                <DialogTitle>Are you sure you want to delete user <b>ALL</b>?</DialogTitle>
                <DialogFooter>
                    <DialogClose asChild autoFocus>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" className="bg-red-500" onClick={() => onConfirm()}>DELETE <b>ALL</b> Users</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}