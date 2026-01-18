/**
 * AI服务提供商类型
 */
export type AIProvider = 'gemini' | 'openai' | 'custom';

/**
 * AI请求选项
 */
export interface AIRequestOptions {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
    images?: string[]; // Base64 encoded images
}

/**
 * AI响应结果
 */
export interface AIResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

/**
 * AI服务抽象接口
 */
export interface IAIService {
    /**
     * 发送聊天请求
     */
    chat(prompt: string, options?: AIRequestOptions): Promise<AIResponse>;

    /**
     * 获取当前使用的模型名称
     */
    getModelName(): string;
}
