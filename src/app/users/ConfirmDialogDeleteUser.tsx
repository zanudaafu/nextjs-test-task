import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogTitle
} from '@/components/dialog';
import { Button } from '@/components/button';
import { User } from '@/types/user';
import { useTranslations } from 'next-intl';

interface Props {
    user: User;
    onConfirm: (user: User) => void;
    children: React.ReactNode;
}

export function ConfirmDeleteDialog({ user, onConfirm, children }: Props) {
    const t = useTranslations('users.dialog.deleteUser');
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white">
                <DialogTitle>{t('title')}<b>{user.name}</b>?</DialogTitle>
                <DialogFooter>
                    <DialogClose asChild autoFocus>
                        <Button variant="outline">{t('cancel')}</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" className="bg-red-500" onClick={() => onConfirm(user)}>{t('confirm')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}