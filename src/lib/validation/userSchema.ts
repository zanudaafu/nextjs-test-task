import { type UserData } from "@/types/user";

export interface ValidationResult {
    valid: boolean;
    errors?: string[];
    user?: UserData;
}


export function isValidEmail(email: unknown): email is UserData['email'] {
    return (
        typeof email === 'string' &&
        // TODO: ADD MORE ADVANCED email validation
        // Validates a simple email format:
        // ^           - start of string
        // [^@\s]+     - one or more characters that are NOT "@" or whitespace (local part)
        // @           - literal "@" symbol
        // [^@\s]+     - one or more characters that are NOT "@" or whitespace (domain name)
        // \.          - literal dot
        // [^@\s]+     - one or more characters that are NOT "@" or whitespace (TLD)
        // $           - end of string
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())
    );
}

export function isValidName(name: unknown): name is UserData['name'] {
    return typeof name === 'string' && name.trim().length > 0;
}

export function isValidDate(date: unknown): date is string {
    return typeof date === 'string' && !isNaN(Date.parse(date));
}

export function validateUserInput(data: any): ValidationResult {
    const errors: string[] = [];

    const name = isValidName(data.name) ? data.name.trim() : undefined;
    const email = isValidEmail(data.email) ? data.email.trim() : undefined;

    if (!name) errors.push('Invalid name');
    if (!email) errors.push('Invalid email');

    return {
        valid: errors.length === 0,
        errors: errors.length ? errors : undefined,
        user: errors.length === 0 ? { name, email } : undefined,
    };
}
