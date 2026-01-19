import { IAIService } from '../ai/types.js';
import { AIServiceFactory } from '../ai/factory.js';

export class DataDesensitizationService {
    private aiService: IAIService;

    constructor() {
        // 使用单例获取当前配置的 AI 服务
        this.aiService = AIServiceFactory.getInstance();
    }

    /**
     * 对文本进行脱敏处理，移除个人信息（人名、具体班级、电话等），仅保留题目内容。
     * @param text 原始文本（可能是 OCR 识别结果）
     * @returns 脱敏后的文本
     */
    async desensitize(text: string): Promise<string> {
        const systemPrompt = `
你是一个专业的数据脱敏专家。你的任务是处理学生作业文本，移除所有个人身份信息（PII），只保留与学习题目相关的内容。

请遵循以下规则：
1. ** 移除 **：学生姓名、家长姓名、并在文中用 "[姓名]" 替换（如果此处必须保留主语，否则直接删除）。
2. ** 移除 **：具体的班级名称（如“三年二班”），用 "[班级]" 替换，或直接删除。
3. ** 移除 **：学校名称如果出现在标题头或页眉，通过 OCR 识别进来的，请移除。保留题目中作为题干背景的学校名（很少见，但如果有）。
4. ** 移除 **：电话号码、身份证号、学号等数字标识。
5. ** 保留 **：所有的题目内容、题干、选项、以及题目中的人名（如“小明买了5个苹果”中的小明不需要脱敏，这是题目人物）。
6. ** 输出 **：直接输出脱敏后的纯文本，不要包含任何前缀或解释。

示例：
输入：
"三年二班 张伟
数学作业
1. 小红有3个苹果，小明给了她2个，现在她有几个？
家长签名：李四 13800138000"

输出：
"数学作业
1. 小红有3个苹果，小明给了她2个，现在她有几个？"
    `;

        try {
            const result = await this.aiService.chat(text, {
                systemPrompt,
                temperature: 0.1, // 低温度以保证确定性
            });
            return result.content;
        } catch (error) {
            console.error('Desensitization failed:', error);
            throw new Error('Failed to desensitize text');
        }
    }
}
