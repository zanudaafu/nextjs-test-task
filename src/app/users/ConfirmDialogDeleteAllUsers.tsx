import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogTitle
} from '@/components/dialog';
import { Button } from '@/components/button';
import { useTranslations } from 'next-intl';

interface Props {
    onConfirm: () => void;
    children: React.ReactNode;
}

export function ConfirmDeleteDialog({ onConfirm, children }: Props) {
    const t = useTranslations('users.dialog.deleteAll');
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white">
                <DialogTitle>{t('title1')}<b>{t('title2')}</b>{t('title3')}</DialogTitle>
                <DialogFooter>
                    <DialogClose asChild autoFocus>
                        <Button variant="outline">{t('cancel')}</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" className="bg-red-500" onClick={() => onConfirm()}>{t('confirm1')}<b>{t('confirm2')}</b>{t('confirm3')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}