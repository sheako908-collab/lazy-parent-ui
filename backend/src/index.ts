import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AIServiceFactory } from './services/ai/factory'; // Changed from getAIService
import homeworkRouter from './routes/homework';
import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';

// 加载环境变量
dotenv.config();

// The following __filename and __dirname are no longer used if static serving is removed or handled differently.
// Keeping them for now as the instruction didn't explicitly remove them, but the provided snippet implies their removal.
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Changed to 3000 in the provided snippet, but keeping original for faithful edit.

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 请求日志中间件
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// 健康检查
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI模型信息接口
app.get('/api/ai/info', (req: Request, res: Response) => {
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

// AI聊天接口
app.post('/api/ai/chat', async (req: Request, res: Response) => {
    try {
        const { prompt, systemPrompt, temperature, maxTokens } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: '缺少prompt参数' });
        }

        const aiService = AIServiceFactory.getInstance();
        const response = await aiService.chat(prompt, {
            systemPrompt,
            temperature,
            maxTokens
        });

        res.json(response);
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'AI processing failed' });
    }
});

// 认证路由
app.use('/api/auth', authRouter);

// 作业处理路由
app.use('/api/homework', homeworkRouter);

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        error: '服务器内部错误',
        message: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试',
    });
});

// 404处理
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: '接口不存在' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   懒爸妈后端服务已启动                 ║
║   端口: ${PORT}                        ║
║   环境: ${process.env.NODE_ENV || 'development'}                ║
║   AI提供商: ${process.env.AI_PROVIDER || 'gemini'}              ║
╚════════════════════════════════════════╝
  `);
});
