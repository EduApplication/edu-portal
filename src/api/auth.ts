import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    return response.data;
};
