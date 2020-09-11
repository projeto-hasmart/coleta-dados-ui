import { Role } from './role';

export interface User {
    id?: number;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    token?: string;
}
