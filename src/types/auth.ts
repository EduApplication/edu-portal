export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    roleId: number;
}

export interface AuthResponse {
    token: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
    tokenExpires: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
}