import api from '../utils/api';
import {ClassDetailsDto, ClassDto, CreateClassDto} from '../types/class';
import { getUser } from '../utils/auth';

export const getClassesForCurrentUser = async (): Promise<ClassDto[]> => {
    const user = getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    let endpoint = '';

    switch (user.roleName) {
        case 'Administrator':
            endpoint = '/classes';
            break;
        case 'Teacher':
            endpoint = '/classes/teacher';
            break;
        case 'Student':
            endpoint = '/classes/student';
            break;
        case 'Parent':
            endpoint = '/classes/parent';
            break;
        default:
            throw new Error('Unknown user role');
    }

    const response = await api.get<ClassDto[]>(endpoint);
    return response.data;
};

export const getClassById = async (id: string): Promise<ClassDetailsDto> => {
    const response = await api.get<ClassDetailsDto>(`/classes/${id}`);
    return response.data;
};

export const createClass = async (classData: CreateClassDto): Promise<string> => {
    const response = await api.post<string>('/classes', classData);
    return response.data;
};

export const updateClass = async (id: string, classData: CreateClassDto): Promise<void> => {
    await api.put(`/classes/${id}`, classData);
};

export const deleteClass = async (id: string): Promise<void> => {
    await api.delete(`/classes/${id}`);
};