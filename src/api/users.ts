import api from '../utils/api';
import {UserDto, CreateUserDto, UserDetailsDto, UpdateUserDto} from '../types/user';

export const getAllUsers = async (): Promise<UserDto[]> => {
    const response = await api.get<UserDto[]>('/users');
    return response.data;
};

export const getUserById = async (id: string): Promise<UserDetailsDto> => {
    const response = await api.get<UserDetailsDto>(`/users/${id}`);
    return response.data;
};

export const createUser = async (user: CreateUserDto): Promise<string> => {
    const response = await api.post<string>('/users', user);
    return response.data;
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<void> => {
    await api.put(`/users/${id}`, user);
};

export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
};

