export type User = {
    _id: string;
    name: string;
    email: string;
    role: Role;
} | null

export type Role = 'Admin' | 'Lead' | 'User';
