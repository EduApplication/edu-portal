import { DocumentDto } from './document';

export interface AttachmentDetailsDto {
    id: string;
    title?: string;
    description?: string;
    dueDate: string;
    assignedDate: string;
    lessonId: string;
    subjectName?: string;
    className?: string;
    teacherFirstName?: string;
    teacherLastName?: string;
    documents?: DocumentDto[];
}

export interface AttachmentDto {
    id: string;
    title?: string;
    description?: string;
    dueDate: string;
    assignedDate: string;
}

export interface CreateAttachmentDto {
    title?: string;
    description?: string;
    lessonId: string;
    dueDate: string;
}