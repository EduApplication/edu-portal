export interface LessonDto {
    id: string;
    subjectName: string;
    className: string;
    teacherName: string;
    subjectId: string;
    classId: string;
    teacherId: string;
    startTime: string;
    endTime: string;
    room: string;
    topic: string;
    description: string;
    dayOfWeek: number;
}

export interface CreateLessonDto {
    subjectId: string;
    classId: string;
    teacherId: string;
    startTime: string;
    endTime: string;
    room: string;
    topic: string;
    description: string;
    isRecurring: boolean;
    dayOfWeek?: number;
}

export interface ScheduleFilterDto {
    startDate: string;
    endDate: string;
    classId?: string;
    teacherId?: string;
    subjectId?: string;
}