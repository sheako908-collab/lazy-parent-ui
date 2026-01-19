import express from 'express';
import prisma from '../lib/db.js';

const router = express.Router();

/**
 * 通用 Mock 用户生成器
 */
const getMockUser = (phone: string) => ({
    id: `mock-user-${phone}`,
    phone: phone,
    role: 'student',
    studentProfile: {
        name: '演示学生',
        grade: '三年级',
        school: '实验小学'
    }
});

// Register
router.post('/register', async (req, res) => {
    const { phone, password, role } = req.body;

    // 万能验证码模式：如果密码或验证码是 123456，直接成功
    if (password === '123456') {
        return res.json({
            token: 'mock-full-version-token',
            user: getMockUser(phone)
        });
    }

    try {
        const user = await prisma.user.create({
            data: {
                phone,
                password,
                role: role || 'parent',
                studentProfile: role === 'student' ? {
                    create: { name: '新学生', grade: '三年级' }
                } : undefined
            }
        });
        res.json({ user });
    } catch (error) {
        // 如果数据库没连上或已存在，在演示环境下返回 Mock
        console.warn('DB Error in register, falling back to mock:', error);
        res.json({
            token: 'mock-full-version-token',
            user: getMockUser(phone)
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    // 万能验证码模式
    if (password === '123456') {
        return res.json({
            token: 'mock-full-version-token',
            user: getMockUser(phone)
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { phone },
            include: { studentProfile: true }
        });

        if (user && user.password === password) {
            res.json({ token: 'mock-jwt-token', user });
        } else {
            res.status(401).json({ error: '验证码错误' });
        }
    } catch (error) {
        console.warn('DB Error in login, falling back to mock:', error);
        // 数据库不可用时，只要输入 123456 就通过
        if (password === '123456') {
            res.json({
                token: 'mock-full-version-token',
                user: getMockUser(phone)
            });
        } else {
            res.status(500).json({ error: '登录失败，请检查数据库配置或使用万能码 123456' });
        }
    }
});

export default router;
