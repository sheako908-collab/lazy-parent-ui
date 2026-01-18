import express from 'express';
import { DataDesensitizationService } from '../services/data/desensitization.js'; // Ensure extension if needed
import prisma from '../lib/db.js';

const router = express.Router();
const desensitizationService = new DataDesensitizationService();

// 获取作业历史记录 (简单实现，未验证 Token，实际项目需从 Token 提取 userId)
router.get('/history', async (req, res) => {
    try {
        const { userId } = req.query; // 临时接收 query 参数

        if (!userId) {
            // 如果没有 userId，由于演示方便，尝试查找默认用户
            const defaultUser = await prisma.user.findFirst({ where: { phone: '13800138000' } });
            if (defaultUser) {
                const history = await prisma.homework.findMany({
                    where: { userId: defaultUser.id },
                    orderBy: { createdAt: 'desc' },
                    include: { mistakes: true }
                });
                return res.json(history);
            }
            return res.status(400).json({ error: 'UserId is required' });
        }

        const history = await prisma.homework.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' },
            include: { mistakes: true }
        });

        res.json(history);
    } catch (error) {
        console.error('Error fetching homework history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// 接收前端上传的作业（文本或图片），返回脱敏后的结果
router.post('/process', async (req, res) => {
    try {
        const { text, image, type, userId } = req.body;

        if (!text && !image) {
            return res.status(400).json({ error: 'Text content or Image is required' });
        }

        console.log(`Processing homework. HasImage: ${!!image}, TextLength: ${text?.length}`);

        let cleanedText = '';

        // 如果有图片，先进行 OCR 和脱敏
        if (image) {
            console.log('Performing OCR via AI...');
            const ocrResult = await desensitizationService['aiService'].chat(
                "请识别这张图片中的所有文字。注意：\n1. 保持原有的排版结构。\n2. 如果包含数学题，请准确识别公式。\n3. 直接输出识别到的内容，不需要任何开场白。",
                { images: [image] }
            );

            // 临时方案：这里直接用 AI 识别出的文本作为输入，再跑一遍脱敏
            const rawText = ocrResult.content;
            console.log('OCR Raw output:', rawText.substring(0, 50) + '...');
            cleanedText = await desensitizationService.desensitize(rawText);

        } else {
            // 纯文本直接脱敏
            cleanedText = await desensitizationService.desensitize(text);
        }

        console.log('Desensitization complete.');

        // 4. 保存到数据库 (Persist Data)
        try {
            // 优先使用前端传来的 userId
            let targetUserId = userId;

            if (!targetUserId) {
                // Fallback to default user
                let user = await prisma.user.findFirst({ where: { phone: '13800138000' } });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            phone: '13800138000',
                            password: 'hashed_password_placeholder',
                            role: 'student'
                        }
                    });
                }
                targetUserId = user.id;
            }

            const savedHomework = await prisma.homework.create({
                data: {
                    userId: targetUserId,
                    ocrText: image ? 'IMAGE_OCR_CONTENT' : text, // 简化处理，实际应存储 ocrResult
                    cleanedText: cleanedText,
                    // 实际生产中不应存 Base64，这里裁切为了演示不报错
                    originalImage: image ? 'base64_image_placeholder' : null,
                    status: 'processed'
                }
            });
            console.log('Homework saved with ID:', savedHomework.id);
        } catch (dbError) {
            console.error('Failed to save homework to DB:', dbError);
            // Don't fail the request if save fails, just log it
        }

        res.json({
            cleanedText,
            originalLength: text?.length || 0,
            status: 'success'
        });
    } catch (error) {
        console.error('Error processing homework:', error);
        res.status(500).json({ error: 'Failed to process homework' });
    }
});

export default router;
