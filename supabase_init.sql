-- 懒爸妈应用 - Supabase 数据库初始化脚本

-- 1. 创建用户表
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "phone" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'parent',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. 创建学生档案表
CREATE TABLE IF NOT EXISTS "StudentProfile" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "grade" TEXT,
    "school" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. 创建作业记录表
CREATE TABLE IF NOT EXISTS "Homework" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "originalImage" TEXT,
    "ocrText" TEXT,
    "cleanedText" TEXT,
    "subject" TEXT,
    "status" TEXT DEFAULT 'processed',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. 创建错题记录表
CREATE TABLE IF NOT EXISTS "MistakeRecord" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "homeworkId" TEXT REFERENCES "Homework"("id") ON DELETE SET NULL,
    "questionText" TEXT NOT NULL,
    "answer" TEXT,
    "analysis" TEXT,
    "subject" TEXT,
    "reviewCount" INTEGER DEFAULT 0,
    "isMastered" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. 开启 Row Level Security (可选，演示阶段先关闭以方便测试)
-- ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "StudentProfile" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "Homework" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "MistakeRecord" ENABLE ROW LEVEL SECURITY;
