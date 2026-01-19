import express from 'express';
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

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI 接口
app.get('/api/ai/info', (req, res) => {
    try {
        const aiService = AIServiceFactory.getInstance();
        res.json({
            provider: process.env.AI_PROVIDER || 'gemini',
            model: aiService.getModelName(),
            status: 'ready',
        });
    } catch (error) {
        res.status(500).json({ error: '无法获取AI服务信息' });
    }
});

app.post('/api/ai/chat', async (req, res) => {
    try {
        const { prompt, systemPrompt, temperature, maxTokens } = req.body;
        const aiService = AIServiceFactory.getInstance();
        const response = await aiService.chat(prompt, { systemPrompt, temperature, maxTokens });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

// 路由挂载
app.use('/api/auth', authRouter);
app.use('/api/homework', homeworkRouter);
app.use('/api/dashboard', dashboardRouter);

// 核心：处理 Vercel 将请求发送到 /api 的情况
app.use('/auth', authRouter);
app.use('/homework', homeworkRouter);
app.use('/dashboard', dashboardRouter);

export default app;
