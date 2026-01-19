import axios from 'axios';

// 定义 API 基础 URL，优先使用环境变量（便于切换 CloudBase 等后端）
const getApiBaseUrl = () => {
    const envBaseUrl = import.meta.env.VITE_AUTH_BASE_URL as string | undefined;
    if (envBaseUrl && envBaseUrl.trim().length > 0) {
        return envBaseUrl.replace(/\/$/, '');
    }

    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `http://${hostname}:3001/api/auth`;
    }

    return '/api/auth';
};

const API_BASE_URL = getApiBaseUrl();

export interface User {
    id: string;
    phone: string;
    role: string;
    studentProfile?: {
        name: string;
        grade?: string;
        school?: string;
    };
}

export interface AuthResponse {
    token?: string;
    user: User;
    error?: string;
}

export const AuthService = {
    /**
     * 用户登录
     */
    login: async (phone: string, password: string = 'password'): Promise<AuthResponse> => {
        try {
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, {
                phone,
                password
            });

            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error: any) {
            console.error('Login failed:', error);
            throw new Error(error.response?.data?.error || '登录失败，请检查网络或验证码');
        }
    },

    /**
     * 用户注册 (自动登录)
     */
    register: async (phone: string, role: 'parent' | 'student' = 'parent', password: string = 'password'): Promise<AuthResponse> => {
        try {
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, {
                phone,
                password,
                role
            });

            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token || 'mock-register-token');
            }

            return response.data;
        } catch (error: any) {
            console.error('Register failed:', error);
            throw new Error(error.response?.data?.error || '注册失败');
        }
    },

    /**
     * 退出登录
     */
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                return null;
            }
        }
        return null;
    },

    /**
     * 检查是否已登录
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    }
};
