import { Button } from '@/components/button';

export function UsersTableHeader() {
    return (
        <div className="flex justify-end gap-2">
            <Button variant="outline" className="bg-green-500" onClick={() => {
                // todo:
            }}>
                Load new
            </Button>
            <Button variant="outline" className="bg-red-500" onClick={() => {
                // todo:
            }}>
                Delete All
            </Button>

        </div>
    );
}