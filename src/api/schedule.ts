import api from '../utils/api';
import { LessonDto, ScheduleFilterDto } from '../types/lesson';
import { getUser } from '../utils/auth';

export const getScheduleForCurrentUser = async (startDate: Date, endDate: Date): Promise<LessonDto[]> => {
    const user = getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    let endpoint = '';

    switch (user.roleName) {
        case 'Administrator':
            return getScheduleByFilter({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            });
        case 'Teacher':
            endpoint = '/schedule/teacher';
            break;
        case 'Student':
            endpoint = '/schedule/student';
            break;
        case 'Parent':
            endpoint = '/schedule/parent';
            break;
        default:
            throw new Error('Unknown user role');
    }

    const response = await api.get<LessonDto[]>(endpoint, {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }
    });

    return response.data;
};

export const getScheduleByFilter = async (filter: ScheduleFilterDto): Promise<LessonDto[]> => {
    const response = await api.get<LessonDto[]>('/schedule/filter', {
        params: filter
    });

    return response.data;
};