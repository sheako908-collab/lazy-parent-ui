// @ts-nocheck
import express, { Request, Response } from 'express';

const router = express.Router();

// Mock Chat Endpoint
router.post('/chat', (req: Request, res: Response) => {
    const { prompt } = req.body;

    // Simple verification check to ensure backend is reachable
    console.log('Received chat prompt:', prompt);

    // Simulated AI response
    res.json({
        content: `【AI 老师】收到你的问题："${prompt}"。\n这是模拟的 AI 回复。在正式版本中，这里会连接 Gemini 或 OpenAI 模型进行解答。目前我是你的智能助教，随时准备好帮助你！`,
        model: 'mock-gpt-4',
        usage: {
            promptTokens: 10,
            completionTokens: 20,
            totalTokens: 30
        }
    });
});

export default router;
