import { useEffect, useState, useCallback, FormEvent, useMemo } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogTitle, DialogDescription } from '@/components/dialog';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import type { User, UserData } from '@/types/user';
import { isValidEmail, isValidName } from '@/lib/validation/userSchema';
import { EditUserCallback } from './useUsersTable';

interface Props {
    user?: User;
    onSubmit: (userData: UserData) => void;
    onClose?: () => void;
    children?: React.ReactNode;
    isOpen?: boolean;
}

export function useEditUserModal(onEditUserConfirmCallback: EditUserCallback) {
    const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
    const clearEditingUser = useCallback(() => setEditingUser(undefined), [setEditingUser]);

    const onEditConfirm = useCallback((newUser: UserData) => {
        if (!!editingUser) {
            // TODO: mb consider strict data casting instead of serrialization
            onEditUserConfirmCallback(editingUser.id, { ...newUser })
        }
        clearEditingUser();
    }, [onEditUserConfirmCallback, editingUser, clearEditingUser])

    return {
        editingUser,
        setEditingUser,
        clearEditingUser,
        onEditConfirm
    }
}

// TODO: consider refactoring
// during coding process I crafted this modal 
// that at the beginig opened as wrapped around open-button
// but then I consider that create instance of modal for each entity in the table is not good for performance
// on second step I make it openable by useEditUserModal hook
// 
// this one works for now - so I keep it
// but this one definitely requires being refactored in future
// maybe consider using react-portals.
export function UserFormDialog({ user, onSubmit, onClose, children, isOpen = false }: Props) {
    const [open, setOpen] = useState(false);
    const onOpenChange = useCallback((isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            !!onClose && onClose();
        }
    }, [setOpen, onClose])

    const isEdit = !!user;
    const [formUser, setFormUser] = useState<UserData>({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });
    const clearUserForm = useCallback(() => {
        setFormUser({ name: '', email: '' })
        setErrors({});
    }, [setFormUser])

    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});


    useEffect(() => {
        if (user) {
            setFormUser(user);
        }
    }, [user]);

    const handleChange = useCallback((field: keyof User, value: string) => {
        setFormUser({ ...formUser, [field]: value });
    }, [setFormUser, formUser]);

    const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!isValidName(formUser.name)) newErrors.name = 'Name is required';
        if (!isValidEmail(formUser.email)) newErrors.email = 'Invalid email address';


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formUser);
        clearUserForm();
        onOpenChange(false);
    }, [clearUserForm, onSubmit, formUser]);

    return (
        <Dialog open={open || isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild onClick={() => onOpenChange(true)}>{children}</DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white">
                <form
                    onSubmit={onSubmitForm}
                >
                    <DialogTitle className='mb-2'>
                        {isEdit ? 'Edit User' : 'Add User'}
                    </DialogTitle>
                    <div>

                        <div className="mt-2 mb-2">
                            {user?.id && (<div>ID: <span>{user.id}</span></div>)}
                            {user?.created_at && (<div>Created At: <span>{new Date(user.created_at).toLocaleDateString()}</span></div>)}
                            {user?.name && (<div>Original name: <span>{user.name}</span></div>)}
                            {user?.email && (<div>Original email: <span>{user.email}</span></div>)}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formUser.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                                autoFocus
                            />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formUser.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                            />
                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={clearUserForm}>Cancel</Button>
                        </DialogClose>
                        <Button className="bg-green-500" type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
