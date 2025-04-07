import { Button } from '@/components/button';

interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export function PaginationControls({ page, totalPages, setPage }: Props) {
    return (
        <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t max-w-6xl mx-auto">
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPage(1)} disabled={page === 1}>
                    First
                </Button>
                <Button variant="outline" onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
                    Previous
                </Button>
            </div>

            {/* // TODO: consider show item numbers instead of page numbers */}
            <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                >
                    Last
                </Button>
            </div>
        </div>
    )
}