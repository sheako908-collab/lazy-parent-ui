# 懒爸妈 - 智能辅导助手

一个基于AI的家长-学生双端智能辅导平台

## 技术栈

### 前端
- **框架**: Vite + React 18 + TypeScript
- **样式**: Tailwind CSS（包含完整设计系统）
- **路由**: React Router DOM v6
- **动画**: Framer Motion
- **UI工具**: clsx + tailwind-merge

### 后端
- **运行时**: Node.js + Express
- **语言**: TypeScript
- **AI引擎**: 
  - Google Gemini 2.0 Flash (默认，免费)
  - OpenAI GPT-4 (备用)
- **特性**: 模型热切换、统一AI抽象层

## 快速开始

### 前端启动

```bash
npm run dev
```

访问 `http://localhost:5173`

### 后端启动

1. 配置环境变量：

```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，填入你的 GEMINI_API_KEY
```

2. 启动服务：

```bash
npm run dev
```

后端运行在 `http://localhost:3001`

## AI模型配置

在 `backend/.env` 中配置：

```env
# 使用Gemini（免费）
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash-exp

# 或使用OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4
```

## 项目结构

```
lazy-parent-app/
├── src/               # 前端源码
│   ├── pages/         # 页面组件
│   ├── components/    # 通用组件
│   └── services/      # API服务
├── backend/           # 后端源码
│   └── src/
│       ├── services/
│       │   └── ai/    # AI服务抽象层
│       └── index.ts   # Express服务器
└── stitch_/           # 设计原型（HTML）
```

## 开发计划

详见 [task.md](./task.md)

## License

MIT
