import express from 'express';
import prisma from '../lib/db.js';

const router = express.Router();

const mockHistory = [
    {
        id: 'mock-hw-1',
        createdAt: new Date().toISOString(),
        status: 'processed',
        cleanedText: '这是演示用的作业记录。',
        mistakes: [
            { id: 'm1', questionText: '3 + 5 = ?', analysis: '计算错误', isMastered: false }
        ]
    }
];

// 获取作业历史记录
router.get('/history', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId || userId.toString().startsWith('mock-user')) {
            return res.json(mockHistory);
        }

        const history = await prisma.homework.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' },
            include: { mistakes: true }
        });

        res.json(history);
    } catch (error) {
        console.warn('DB Error in history, returning mock data');
        res.json(mockHistory);
    }
});

// 接收前端上传的作业
router.post('/process', async (req, res) => {
    try {
        const { text, image, userId } = req.body;

        // 简化的处理逻辑用于演示
        const result = {
            cleanedText: text || "识别出的文本内容...",
            status: 'success'
        };

        if (userId && !userId.startsWith('mock-user')) {
            await prisma.homework.create({
                data: {
                    userId: String(userId),
                    cleanedText: result.cleanedText,
                    status: 'processed'
                }
            });
        }

        res.json(result);
    } catch (error) {
        console.warn('DB Error in process, returning manual success');
        res.json({
            cleanedText: "（数据库未连接，此为模拟结果）作业内容已识别。",
            status: 'success'
        });
    }
});

export default router;
