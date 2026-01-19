import { GeminiAIService } from './gemini.js';
import { OpenAIService } from './openai.js';
import { AIProvider, IAIService } from './types.js';

/**
 * AI服务工厂
 * 根据配置动态创建对应的AI服务实例
 */
export class AIServiceFactory {
    private static instance: IAIService | null = null;

    /**
     * 获取AI服务实例（单例模式）
     */
    static getInstance(): IAIService {
        if (!this.instance) {
            this.instance = this.createService();
        }
        return this.instance;
    }

    /**
     * 重置服务实例（用于切换模型）
     */
    static resetInstance(): void {
        this.instance = null;
    }

    /**
     * 根据环境变量创建AI服务
     */
    private static createService(): IAIService {
        const provider = (process.env.AI_PROVIDER || 'gemini') as AIProvider;

        switch (provider) {
            case 'gemini': {
                const apiKey = process.env.GEMINI_API_KEY;
                if (!apiKey) {
                    throw new Error('未配置GEMINI_API_KEY环境变量');
                }
                const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
                console.log(`🤖 使用Gemini AI服务 - 模型: ${model}`);
                return new GeminiAIService(apiKey, model);
            }

            case 'openai': {
                const apiKey = process.env.OPENAI_API_KEY;
                if (!apiKey) {
                    throw new Error('未配置OPENAI_API_KEY环境变量');
                }
                const model = process.env.OPENAI_MODEL || 'gpt-4';
                console.log(`🤖 使用OpenAI服务 - 模型: ${model}`);
                return new OpenAIService(apiKey, model);
            }

            case 'custom':
                throw new Error('自定义AI服务暂未实现，请实现CustomAIService类');

            default:
                throw new Error(`不支持的AI提供商: ${provider}`);
        }
    }

    /**
     * 手动指定AI提供商创建服务
     */
    static createCustomService(
        provider: AIProvider,
        apiKey: string,
        modelName?: string
    ): IAIService {
        switch (provider) {
            case 'gemini':
                return new GeminiAIService(apiKey, modelName);
            case 'openai':
                return new OpenAIService(apiKey, modelName);
            default:
                throw new Error(`不支持的AI提供商: ${provider}`);
        }
    }
}

// 导出便捷访问函数
export const getAIService = () => AIServiceFactory.getInstance();
