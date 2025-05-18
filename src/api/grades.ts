import api from '../utils/api';
import { GradeDto, StudentGradesBySubjectDto } from '../types/grade';

export const getStudentGrades = async (): Promise<StudentGradesBySubjectDto[]> => {
    const response = await api.get<StudentGradesBySubjectDto[]>('/grades/student');
    return response.data;
};

export const getGradesBySubject = async (studentId: string, subjectId: string): Promise<GradeDto[]> => {
    const response = await api.get<GradeDto[]>(`/grades/student/${studentId}/subject/${subjectId}`);
    return response.data;
};