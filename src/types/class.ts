export interface ClassDto {
    id: string;
    name: string;
    year: number;
    section: string;
    classTeacherFirstName: string;
    classTeacherLastName: string;
    isActive: boolean;
}

export interface ClassDetailsDto {
    id: string;
    name: string;
    year: number;
    section: string;
    isActive: boolean;
    classTeacherFirstName: string;
    classTeacherLastName: string;
    classTeacherEmail: string;
    classTeacherId: string;
    students: ClassStudentInfoDto[];
}

export interface CreateClassDto {
    name: string;
    year: number;
    section: string;
    classTeacherId: string;
}

export interface ClassStudentInfoDto {
    studentId: string;
    firstName: string;
    lastName: string;
}