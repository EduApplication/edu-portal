import api from '../utils/api';
import { DocumentDto, DocumentDetailsDto } from '../types/document';

export const getDocuments = async (): Promise<DocumentDto[]> => {
    const response = await api.get<DocumentDto[]>('/documents');
    return response.data;
};

export const getDocumentMetadataById = async (id: string): Promise<DocumentDetailsDto[]> => {
    const response = await api.get<DocumentDetailsDto[]>(`/documents/${id}`);
    return response.data;
};

export const DeleteDocument = async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);
};

export const DownloadDocumentById = async (id: string, fileName?: string): Promise<void> => {
    try {
        const response = await api.get(`/documents/download/${id}`, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName || `document-${id}`);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error while loading document:', error);
        throw error;
    }
};

export const UploadDocument = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<string>('/documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};