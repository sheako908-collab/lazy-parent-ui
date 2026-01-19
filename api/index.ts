import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import homeworkRouter from './routes/homework.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import { AIServiceFactory } from './services/ai/factory.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 基础路由匹配
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/ai/info', (req: Request, res: Response) => {
    try {
        const aiService = AIServiceFactory.getInstance();
        res.json({
            provider: process.env.AI_PROVIDER || 'gemini',
            model: aiService.getModelName(),
            status: 'ready'
        });
    } catch (error) {
        res.status(500).json({ error: '无法获取AI服务信息' });
    }
});

app.post('/api/ai/chat', async (req: Request, res: Response) => {
    try {
        const { prompt, systemPrompt, temperature, maxTokens } = req.body;
        const aiService = AIServiceFactory.getInstance();
        const response = await aiService.chat(prompt, { systemPrompt, temperature, maxTokens });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

// 子路由挂载
// 注意：在 Vercel 中，/api/index.ts 处理所有 /api/* 的请求
// 所以我们挂载路由器时要统筹考虑前缀
app.use('/api/auth', authRouter);
app.use('/api/homework', homeworkRouter);
app.use('/api/dashboard', dashboardRouter);

// 错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
