import express from 'express';
import prisma from '../lib/db.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { phone, password, role } = req.body;
        // In real app, hash password here (e.g. bcrypt)
        const user = await prisma.user.create({
            data: {
                phone,
                password, // Plain text for demo simplicity, TODO: Hash it
                role: role || 'parent',
                studentProfile: role === 'student' ? {
                    create: { name: 'Student', grade: 'Grade 3' }
                } : undefined
            }
        });
        res.json({ user });
    } catch (error) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { phone },
            include: { studentProfile: true }
        });

        if (user && user.password === password) {
            // In real app, issue JWT
            res.json({ token: 'mock-jwt-token', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
