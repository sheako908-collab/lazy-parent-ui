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

// 基础健康检查 - 同时支持 /api/health 和 /health
app.get(['/api/health', '/health'], (req: Request, res: Response) => {
    res.json({ status: 'ok', api: 'ready', timestamp: new Date().toISOString() });
});

// AI 路由
app.use(['/api/ai/info', '/ai/info'], (req, res) => {
    try {
        const aiService = AIServiceFactory.getInstance();
        res.json({
            provider: process.env.AI_PROVIDER || 'gemini',
            model: aiService.getModelName(),
            status: 'ready'
        });
    } catch (error) {
        res.status(500).json({ error: 'AI Info Error' });
    }
});

// 核心业务路由
// 重要：Vercel 重写后请求路径可能包含 /api 也可能不包含，这里全部兼容
app.use(['/api/auth', '/auth'], authRouter);
app.use(['/api/homework', '/homework'], homeworkRouter);
app.use(['/api/dashboard', '/dashboard'], dashboardRouter);

// 错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('SERVER_ERROR:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
