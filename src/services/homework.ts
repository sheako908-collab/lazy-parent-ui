import axios from 'axios';

// 动态获取 API 地址：如果在本地开发且通过 IP 访问，则自动使用该 IP
const API_HOST = window.location.hostname;
const API_BASE_URL = `http://${API_HOST}:3001/api/homework`;

export interface ProcessHomeworkResponse {
    originalLength: number;
    cleanedText: string;
    status: string;
}

export interface HomeworkRecord {
    id: string;
    originalImage?: string;
    cleanedText: string;
    status: string;
    subject?: string;
    createdAt: string;
}

export const HomeworkService = {
    /**
   * 发送OCR识别文本进行脱敏处理，或发送图片进行OCR+脱敏
   * @param text OCR识别出的原始文本 (可选)
   * @param image Base64图片字符串 (可选)
   */
    processHomework: async (text?: string, image?: string, userId?: string): Promise<ProcessHomeworkResponse> => {
        try {
            const response = await axios.post<ProcessHomeworkResponse>(`${API_BASE_URL}/homework/process`, {
                text,
                image,
                userId,
                type: image ? 'ocr_image' : 'ocr_text'
            });
            return response.data;
        } catch (error) {
            console.error('Failed to process homework:', error);
            throw error;
        }
    }
};
