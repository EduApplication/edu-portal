export interface DocumentDto {
    id: string;
    name?: string;
}

export interface CreateDocumentDto {
    name?: string;
    contentType?: string;
    externalId?: string;
}

export interface DocumentAttachmentInfoDto {
    attachmentId: string;
    attachmentTitle?: string;
    uploadedAt: string;
    className?: string;
    subjectName?: string;
}

export interface DocumentDetailsDto {
    id: string;
    name?: string;
    contentType?: string;
    relatedAttachments?: DocumentAttachmentInfoDto[];
}