import axios from 'axios';

const getApiBaseUrl = () => {
    const envBaseUrl = import.meta.env.VITE_AUTH_BASE_URL as string | undefined;
    if (envBaseUrl && envBaseUrl.trim().length > 0) {
        return envBaseUrl.replace(/\/$/, '') + '/api'; // Append /api if strictly following structure
    }
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `http://${hostname}:3001/api`;
    }
    return '/api';
};

const API_BASE_URL = getApiBaseUrl();

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface AIResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export const AIService = {
    /**
     * 发送消息给 AI 老师
     * @param message 用户输入的内容
     * @param systemPrompt (可选) 系统提示词，用于设定 AI 角色
     */
    chat: async (message: string, systemPrompt?: string): Promise<string> => {
        try {
            const response = await axios.post<AIResponse>(`${API_BASE_URL}/ai/chat`, {
                prompt: message, // 注意：后端接口接收的是 prompt 字段
                systemPrompt
            });
            return response.data.content;
        } catch (error) {
            console.error('AI Chat Error:', error);
            throw error;
        }
    }
};
