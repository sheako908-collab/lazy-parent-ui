const fs = require('fs');
const path = require('path');

const learningPageCode = `import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LearningPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 获取传递过来的作业内容
    const homeworkContent = location.state?.homeworkContent;
    const displayContent = homeworkContent
        ? homeworkContent.split('\\n').find((line) => line.includes('?')) || homeworkContent.slice(0, 20) + "..."
        : '3 + 5';

    // TTS 朗读功能
    const handleSpeak = () => {
        if (!displayContent) return;
        const utterance = new SpeechSynthesisUtterance(displayContent);
        const voices = window.speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang.includes('zh'));
        if (zhVoice) utterance.voice = zhVoice;
        window.speechSynthesis.speak(utterance);
    };

    // AI 提问功能
    const handleAskAI = () => {
        navigate('/student/chat', { state: { context: displayContent || '我有一些学习上的问题。' } });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display selection:bg-ai-primary/20 h-screen overflow-hidden flex flex-col relative group/design-root">
            <div className="absolute inset-0 bg-pattern pointer-events-none" />
            
            <header className="relative z-20 flex flex-col w-full px-6 pt-6 pb-2">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">学习进度</span>
                            <span className="text-sm font-bold text-ai-primary tracking-tighter">3 / 8</span>
                        </div>
                        <div className="flex w-full h-3 gap-1.5">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div 
                                    key={i} 
                                    className={'h-full w-full rounded-full transition-all duration-500 ' + (
                                        i < 3 ? 'bg-[#4ade80]' : 
                                        i === 3 ? 'bg-ai-primary relative overflow-hidden' : 
                                        'bg-gray-200 dark:bg-gray-700'
                                    )}
                                >
                                    {i === 3 && <div className="absolute inset-0 bg-white/30 animate-pulse" />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-start h-full pl-2 -mt-4">
                        <button 
                            onClick={() => navigate('/student/workbench')}
                            className="flex items-center justify-center size-10 rounded-full text-gray-400 hover:text-ai-primary hover:bg-ai-primary/5 transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 gap-6">
                <div className="w-full flex justify-center animate-bounce duration-3000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-yellow-400 text-[20px]">smart_toy</span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wide">仔细听题目哦！</span>
                    </div>
                </div>

                <div className="w-full aspect-[4/5] max-h-[380px] bg-ai-green-light dark:bg-ai-green-dark rounded-[3.5rem] shadow-soft relative flex flex-col items-center p-8 group transition-transform duration-500 hover:scale-[1.01]">
                    <div className="bg-white/70 dark:bg-black/20 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-sm">
                        <span className="text-sm font-bold text-[#15803d] dark:text-[#86efac] tracking-widest uppercase">数学</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="text-center space-y-4">
                            <p className="text-2xl font-bold text-[#166534] dark:text-[#a7f3d0] opacity-80 tracking-tight">算一算</p>
                            <h1 className="text-7xl font-black text-[#14532d] dark:text-white tracking-tighter drop-shadow-md">
                                {displayContent}
                                <span className="ml-4">=</span>
                            </h1>
                            <div className="h-4" />
                            <div className="w-24 h-24 rounded-3xl bg-white/50 dark:bg-black/20 border-4 border-dashed border-[#86efac] dark:border-[#34d399] flex items-center justify-center mx-auto shadow-inner">
                                <span className="text-4xl font-black text-[#15803d] dark:text-[#86efac] opacity-50 animate-pulse">?</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#15803d]/5 to-transparent rounded-b-[3.5rem] pointer-events-none" />
                </div>
            </main>

            <footer className="relative z-20 pb-12 px-8 w-full max-w-md mx-auto">
                <div className="flex items-end justify-between gap-8">
                    <button 
                        onClick={handleSpeak}
                        className="group flex flex-col items-center gap-3 flex-1"
                    >
                        <div className="relative size-20 md:size-24 rounded-full bg-ai-primary flex items-center justify-center shadow-glow-primary group-active:scale-95 transition-all duration-300 border-4 border-transparent group-hover:border-white/30">
                            <span className="material-symbols-outlined text-white text-[36px] md:text-[42px] group-hover:scale-110 transition-transform">volume_up</span>
                            <div className="absolute inset-0 rounded-full ring-4 ring-ai-primary/50 animate-ping duration-2000" />
                        </div>
                        <span className="text-sm font-black text-gray-500 dark:text-gray-300 group-hover:text-ai-primary transition-colors tracking-wide">读给我听</span>
                    </button>
                    <button 
                        onClick={handleAskAI}
                        className="group flex flex-col items-center gap-3 flex-1"
                    >
                        <div className="relative size-20 md:size-24 rounded-full bg-ai-orange flex items-center justify-center shadow-glow-orange group-active:scale-95 transition-all duration-300 border-4 border-transparent group-hover:border-white/30">
                            <span className="material-symbols-outlined text-white text-[36px] md:text-[42px] group-hover:scale-110 transition-transform">mic</span>
                        </div>
                        <span className="text-sm font-black text-gray-500 dark:text-gray-300 group-hover:text-ai-orange transition-colors tracking-wide">我有疑问</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default LearningPage;`;

const workbenchCode = `import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, type User } from '../../services/auth';

const StudentWorkbench: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleStartAI = () => {
        navigate('/student/scanner');
    };

    return (
        <div className="flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden relative selection:bg-primary/30">
            {/* Top AppBar */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
                <div onClick={() => navigate('/parent/verification-lock')} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer transition-opacity hover:opacity-70">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">学生工作台</h2>
                <div className="flex w-12 items-center justify-end absolute right-4">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full size-10 bg-transparent text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col w-full px-4 pb-32">
                {/* Headline Section */}
                <div className="pt-6 pb-2">
                    <h2 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight text-left">
                        今日剩余 <span className="text-task-primary">2</span> 项任务
                    </h2>
                    <p className="text-slate-500 dark:text-[#90a4cb] text-sm font-normal leading-normal pt-2">
                        加油，完成任务就可以休息啦！
                    </p>
                </div>

                {/* Divider */}
                <div className="h-4 w-full"></div>

                {/* Task List */}
                <div className="flex flex-col gap-4">
                    {/* Item 1: Math */}
                    <div onClick={() => navigate('/student/scanner')} className="group flex items-center gap-4 bg-white dark:bg-[#1e2636] px-4 min-h-[80px] py-3 justify-between rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform active:scale-[0.98] cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-task-primary dark:text-white flex items-center justify-center rounded-xl bg-task-primary/10 dark:bg-[#222f49] shrink-0 size-12 shadow-sm">
                                <span className="material-symbols-outlined">calculate</span>
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">数学 - 口算练习</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-[#90a4cb]">schedule</span>
                                    <p className="text-slate-500 dark:text-[#90a4cb] text-xs font-normal leading-normal">预计 15 分钟</p>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <button className="text-slate-400 dark:text-slate-500 flex size-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>

                    {/* Item 2: Mistakes */}
                    <div onClick={() => navigate('/student/mistakes')} className="group flex items-center gap-4 bg-white dark:bg-[#1e2636] px-4 min-h-[80px] py-3 justify-between rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform active:scale-[0.98] cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-orange-500 dark:text-white flex items-center justify-center rounded-xl bg-orange-500/10 dark:bg-[#222f49] shrink-0 size-12 shadow-sm">
                                <span className="material-symbols-outlined">menu_book</span>
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">我的错题本</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-[#90a4cb]">history</span>
                                    <p className="text-slate-500 dark:text-[#90a4cb] text-xs font-normal leading-normal">上次更新: 刚刚</p>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <button className="text-slate-400 dark:text-slate-500 flex size-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent pt-12 pb-8 px-4 pointer-events-none">
                <div className="max-w-md mx-auto pointer-events-auto relative flex justify-center">
                    {/* Breathing Glow Effect Layer */}
                    <div className="absolute inset-0 bg-task-primary/20 rounded-full blur-xl animate-pulse scale-95 duration-1000"></div>
                    {/* Primary Button */}
                    <button 
                        onClick={handleStartAI}
                        className="relative w-full h-14 bg-gradient-to-r from-task-primary to-[#4d8aff] hover:from-[#1e5ad4] hover:to-[#3b75d6] text-white text-lg font-bold rounded-full shadow-glow-blue flex items-center justify-center gap-2 transition-all active:scale-[0.98] active:shadow-sm"
                    >
                        <span className="text-xl">🚀</span>
                        <span>开启 AI 伴学模式</span>
                    </button>
                </div>
            </div>

            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-task-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
    );
};

export default StudentWorkbench;`;

if (!fs.existsSync('C:\\temp_fix')) {
    fs.mkdirSync('C:\\temp_fix');
}
fs.writeFileSync('C:\\temp_fix\\LearningPage.tsx', learningPageCode);
fs.writeFileSync('C:\\temp_fix\\StudentWorkbench.tsx', workbenchCode);
console.log('C DRIVE WRITE SUCCESSFUL');
