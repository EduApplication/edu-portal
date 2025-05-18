export interface GradeDto {
    id: string;
    value: number;
    comment: string;
    createdAt: string;
    gradeTypeName: string;
    gradeTypeWeight: number;
    teacherName: string;
}

export interface StudentGradesBySubjectDto {
    subjectId: string;
    subjectName: string;
    grades: GradeDto[];
    averageGrade: number;
}