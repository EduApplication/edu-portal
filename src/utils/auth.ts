import { User } from '../types/auth';

export const getUser = (): User | null => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
        return JSON.parse(userJson) as User;
    } catch (e) {
        return null;
    }
};

export const hasRole = (role: string | string[]): boolean => {
    const user = getUser();
    if (!user) return false;

    if (Array.isArray(role)) {
        return role.includes(user.roleName);
    }

    return user.roleName === role;
};