import api from '../utils/api';
import { SubjectDto, SubjectDetailsDto, CreateSubjectDto } from '../types/subject';
import { getUser } from '../utils/auth';

export const getSubjectsForCurrentUser = async (): Promise<SubjectDto[]> => {
    const user = getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    let endpoint = '';

    switch (user.roleName) {
        case 'Administrator':
            endpoint = '/subjects';
            break;
        case 'Teacher':
            endpoint = '/subjects/teacher';
            break;
        case 'Student':
            endpoint = '/subjects/student';
            break;
        default:
            throw new Error('User role does not have access to subjects');
    }

    const response = await api.get<SubjectDto[]>(endpoint);
    return response.data;
};

export const getSubjectById = async (id: string): Promise<SubjectDetailsDto> => {
    const response = await api.get<SubjectDetailsDto>(`/subjects/${id}`);
    return response.data;
};

export const createSubject = async (subject: CreateSubjectDto): Promise<string> => {
    const response = await api.post<string>('/subjects', subject);
    return response.data;
};

export const updateSubject = async (id: string, subject: CreateSubjectDto): Promise<void> => {
    await api.put(`/subjects/${id}`, subject);
};

export const deleteSubject = async (id: string): Promise<void> => {
    await api.delete(`/subjects/${id}`);
};

export const addTeacherToSubject = async (subjectId: string, teacherId: string): Promise<void> => {
    await api.post(`/subjects/${subjectId}/teachers/${teacherId}`);
};

export const removeTeacherFromSubject = async (subjectId: string, teacherId: string): Promise<void> => {
    await api.delete(`/subjects/${subjectId}/teachers/${teacherId}`);
};