import { Button } from '@/components/button';
import { useTranslations } from 'next-intl';

interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export function PaginationControls({ page, totalPages, setPage }: Props) {
    const t = useTranslations('users.table.pagination');
    return (
        <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t max-w-6xl mx-auto">
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPage(1)} disabled={page === 1}>
                    {t('first')}
                </Button>
                <Button variant="outline" onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
                    {t('previous')}
                </Button>
            </div>

            {/* // TODO: consider show item numbers instead of page numbers */}
            <div className="text-sm text-muted-foreground">
                {t('pageN')}{page}{t('pageOf')}{totalPages}
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    {t('next')}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                >
                    {t('last')}
                </Button>
            </div>
        </div>
    )
}