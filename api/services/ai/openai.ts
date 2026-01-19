import OpenAI from 'openai';
import { IAIService, AIRequestOptions, AIResponse } from './types.js';

/**
 * OpenAI服务实现（备用方案）
 */
export class OpenAIService implements IAIService {
    private client: OpenAI;
    private modelName: string;

    constructor(apiKey: string, modelName: string = 'gpt-4') {
        this.client = new OpenAI({ apiKey });
        this.modelName = modelName;
    }

    async chat(prompt: string, options?: AIRequestOptions): Promise<AIResponse> {
        try {
            const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

            if (options?.systemPrompt) {
                messages.push({ role: 'system', content: options.systemPrompt });
            }

            messages.push({ role: 'user', content: prompt });

            const completion = await this.client.chat.completions.create({
                model: this.modelName,
                messages,
                temperature: options?.temperature ?? 0.7,
                max_tokens: options?.maxTokens ?? 2048,
            });

            const choice = completion.choices[0];
            if (!choice?.message?.content) {
                throw new Error('OpenAI返回内容为空');
            }

            return {
                content: choice.message.content,
                model: this.modelName,
                usage: {
                    promptTokens: completion.usage?.prompt_tokens ?? 0,
                    completionTokens: completion.usage?.completion_tokens ?? 0,
                    totalTokens: completion.usage?.total_tokens ?? 0,
                },
            };
        } catch (error) {
            console.error('OpenAI请求失败:', error);
            throw new Error(`OpenAI服务错误: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }

    getModelName(): string {
        return this.modelName;
    }
}
