import { Role } from './role';

export interface User {
    id?: string;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    token?: string;
    crm?: string;
}
