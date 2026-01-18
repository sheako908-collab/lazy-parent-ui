import express from 'express';
import { prisma } from '../lib/db';

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            // Demo fallback: try to find the default demo user or return empty stats
            const defaultUser = await prisma.user.findFirst({ where: { phone: '13800138000' } });
            if (!defaultUser) {
                return res.json({
                    pendingCount: 0,
                    mistakeCount: 0,
                    recentHomeworks: []
                });
            }
            // Use default user for demo if no userId provided
            return fetchStats(defaultUser.id, res);
        }

        await fetchStats(String(userId), res);
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

async function fetchStats(userId: string, res: any) {
    // 1. Count pending homework (status is processing or processed, but assuming 'checked' means done)
    // Actually, let's define 'pending' as homework created today that isn't 'checked' yet?
    // Or just any unchecked homework. Let's send count of homeworks in 'processed' state waiting for review.
    const pendingCount = await prisma.homework.count({
        where: {
            userId: userId,
            status: { not: 'checked' }
        }
    });

    // 2. Count total mistakes
    const mistakeCount = await prisma.mistakeRecord.count({
        where: { userId: userId }
    });

    // 3. Get recent homeworks (limit 5)
    const recentHomeworks = await prisma.homework.findMany({
        where: { userId: userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { mistakes: true }
    });

    res.json({
        pendingCount,
        mistakeCount,
        recentHomeworks
    });
}

export default router;
