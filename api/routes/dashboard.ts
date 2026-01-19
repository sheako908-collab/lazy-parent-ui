import express from 'express';
import prisma from '../lib/db.js';

const router = express.Router();

const mockStats = {
    pendingCount: 2,
    mistakeCount: 5,
    recentHomeworks: [
        { id: 'h1', status: 'processed', createdAt: new Date().toISOString() }
    ]
};

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    const { userId } = req.query;

    if (!userId || userId.toString().startsWith('mock-user')) {
        return res.json(mockStats);
    }

    try {
        const pendingCount = await prisma.homework.count({
            where: { userId: String(userId), status: { not: 'checked' } }
        });

        const mistakeCount = await prisma.mistakeRecord.count({
            where: { userId: String(userId) }
        });

        const recentHomeworks = await prisma.homework.findMany({
            where: { userId: String(userId) },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { mistakes: true }
        });

        res.json({ pendingCount, mistakeCount, recentHomeworks });
    } catch (error) {
        console.warn('DB Error in stats, returning mock stats');
        res.json(mockStats);
    }
});

export default router;
