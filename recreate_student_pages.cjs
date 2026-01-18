const fs = require('fs');
const path = require('path');

const studentDir = 'src/pages/student';
if (!fs.existsSync(studentDir)) {
    fs.mkdirSync(studentDir, { recursive: true });
}

const pages = {
    'StudentWorkbench.tsx': `import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth';

const StudentWorkbench = () => {
    const navigate = useNavigate();
    const handleStartAI = () => navigate('/student/scanner');

    return (
        <div className="flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-white relative">
            <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-slate-900/80 p-4 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
                <div onClick={() => navigate('/parent/verification-lock')} className="cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <h2 className="flex-1 text-center font-bold text-lg">学生工作台</h2>
                <div className="w-8"></div>
            </div>
            <main className="flex-1 p-6">
                <h2 className="text-3xl font-bold">今日剩余 <span className="text-task-primary">2</span> 项任务</h2>
                <p className="text-slate-500 mt-2">加油，完成任务就可以休息啦！</p>
                <div className="mt-8 space-y-4">
                    <div onClick={() => navigate('/student/scanner')} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">calculate</span>
                            </div>
                            <div>
                                <h3 className="font-bold">数学 - 口算练习</h3>
                                <p className="text-sm text-slate-500">预计 15 分钟</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-8 left-0 w-full px-6">
                <button onClick={handleStartAI} className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    <span className="text-xl">🚀</span>
                    开启 AI 伴学模式
                </button>
            </div>
        </div>
    );
};
export default StudentWorkbench;`,

    'LearningPage.tsx': `import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-background-light dark:bg-background-dark p-8 flex flex-col items-center justify-center text-center">
            <div className="size-48 bg-ai-green-light dark:bg-ai-green-dark rounded-[3rem] shadow-soft flex items-center justify-center mb-8">
                <span className="text-6xl font-black">3 + 5</span>
            </div>
            <h2 className="text-2xl font-bold">算一算，等于多少？</h2>
            <div className="mt-12 flex gap-4 w-full max-w-xs">
                <button onClick={() => navigate('/student/workbench')} className="flex-1 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold">返回</button>
                <button className="flex-1 h-16 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20">我有疑问</button>
            </div>
        </div>
    );
};
export default LearningPage;`,

    'ChatPage.tsx': `import React from 'react';
export default () => <div className="p-8">Chat Page Placeholder</div>;`,

    'HomeworkScannerPage.tsx': `import React from 'react';
export default () => <div className="p-8">Scanner Placeholder</div>;`,

    'MistakeBookPage.tsx': `import React from 'react';
export default () => <div className="p-8">Mistake Book Placeholder</div>;`,

    'UserCenterPage.tsx': `import React from 'react';
export default () => <div className="p-8">User Center Placeholder</div>;`
};

for (const [name, code] of Object.entries(pages)) {
    fs.writeFileSync(path.join(studentDir, name), code);
}
console.log('RECREATED ALL STUDENT PAGES SUCCESSFULLY');
