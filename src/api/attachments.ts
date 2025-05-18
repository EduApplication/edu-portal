import {AttachmentDetailsDto, CreateAttachmentDto} from "../types/attachment";
import api from "../utils/api";

export const getAttachmentById = async (id: string): Promise<AttachmentDetailsDto> => {
    const response = await api.get<AttachmentDetailsDto>(`/attachments/${id}`);
    return response.data;
};

export const createAttachment = async (classData: CreateAttachmentDto): Promise<string> => {
    const response = await api.post<string>('/attachments', classData);
    return response.data;
};

export const updateAttachment = async (id: string, classData: CreateAttachmentDto): Promise<void> => {
    await api.put(`/attachments/${id}`, classData);
};

export const deleteAttachment = async (id: string): Promise<void> => {
    await api.delete(`/attachments/${id}`);
};