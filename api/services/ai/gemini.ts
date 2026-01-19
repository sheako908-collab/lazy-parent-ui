import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIService, AIRequestOptions, AIResponse } from './types.js';

/**
 * Google Gemini AI服务实现
 * 使用最新的免费模型 gemini-2.0-flash-exp
 */
export class GeminiAIService implements IAIService {
    private client: GoogleGenerativeAI;
    private modelName: string;

    constructor(apiKey: string, modelName: string = 'gemini-2.0-flash-exp') {
        this.client = new GoogleGenerativeAI(apiKey);
        this.modelName = modelName;
    }

    async chat(prompt: string, options?: AIRequestOptions): Promise<AIResponse> {
        try {
            const model = this.client.getGenerativeModel({
                model: this.modelName,
                systemInstruction: options?.systemPrompt,
            } as any);

            const parts: any[] = [{ text: prompt }];

            // 处理图片输入
            if (options?.images && options.images.length > 0) {
                options.images.forEach(base64Image => {
                    // 移除可能存在的 data:image/xxx;base64, 前缀
                    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
                    parts.push({
                        inlineData: {
                            mimeType: "image/jpeg", // 默认假设为 jpeg，实际项目中最好由前端传递类型
                            data: cleanBase64
                        }
                    });
                });
            }

            const result = await model.generateContent({
                contents: [{ role: 'user', parts: parts }],
                generationConfig: {
                    temperature: options?.temperature ?? 0.7,
                    maxOutputTokens: options?.maxTokens ?? 2048,
                },
            });

            const response = result.response;
            const text = response.text();

            // 安全获取 usageMetadata (可能在不同版本 SDK 中字段不同)
            const meta = (response as any).usageMetadata;

            return {
                content: text,
                model: this.modelName,
                usage: {
                    promptTokens: meta?.promptTokenCount ?? 0,
                    completionTokens: meta?.candidatesTokenCount ?? 0,
                    totalTokens: meta?.totalTokenCount ?? 0,
                },
            };
        } catch (error) {
            console.error('Gemini AI请求失败:', error);
            throw new Error(`Gemini AI服务错误: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }

    getModelName(): string {
        return this.modelName;
    }
}
