export interface SubjectTeacherDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SubjectDto {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    teachers: SubjectTeacherDto[];
}

export interface SubjectDetailsDto {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    teachers: SubjectTeacherDto[];
}

export interface CreateSubjectDto {
    name: string;
    description: string;
    teacherIds: string[];
}