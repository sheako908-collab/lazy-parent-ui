import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProgressPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock data for the chart (Mon-Sun)
    const weeklyData = [
        { day: 'Mon', count: 4, label: '周一' },
        { day: 'Tue', count: 6, label: '周二' },
        { day: 'Wed', count: 3, label: '周三' },
        { day: 'Thu', count: 8, label: '周四' },
        { day: 'Fri', count: 5, label: '周五' },
        { day: 'Sat', count: 2, label: '周六' },
        { day: 'Sun', count: 4, label: '周日' },
    ];

    const maxCount = 10; // 固定最大值方便刻度对齐

    return (
        <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark overflow-hidden font-display antialiased text-slate-900 dark:text-white">
            {/* Background Decoration */}
            <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center gap-4 px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5">
                <button
                    onClick={() => navigate('/parent/dashboard')}
                    className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/80 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
                </button>
                <div className="flex-1">
                    <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">学情分析报告</h2>
                    <p className="text-[10px] text-primary font-bold tracking-[0.1em] uppercase opacity-80">Intelligence Insights</p>
                </div>
                <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/80">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32">
                {/* Score Card Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-5 flex flex-col gap-3 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">本周正确率</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">98.5</span>
                            <span className="text-sm font-bold text-green-500">%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            <span>较上周 +1.2%</span>
                        </div>
                    </div>
                    <div className="glass-panel p-5 flex flex-col gap-3 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-orange-400">task_alt</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">作业累计数</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">32</span>
                            <span className="text-sm font-bold text-slate-500">项</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            <span>即将击败 85% 同龄人</span>
                        </div>
                    </div>
                </div>

                {/* Main Activity Chart */}
                <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">活跃度趋势</h3>
                            <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">最近 7 天完成的练习数量</p>
                        </div>
                        <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                        </div>
                    </div>

                    <div className="relative h-48 flex items-end gap-1.5 group">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                            <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
                            <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
                            <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
                            <div className="w-full border-t border-dashed border-slate-300 dark:border-slate-700" />
                        </div>

                        {/* Bars */}
                        {weeklyData.map((item) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-3 group/bar z-10 h-full justify-end cursor-pointer">
                                <div className="w-full relative flex justify-center items-end h-full">
                                    <div
                                        className="w-full sm:w-8 max-w-[24px] bg-gradient-to-t from-primary/80 to-primary rounded-t-lg transition-all duration-500 group-hover/bar:brightness-110 shadow-lg shadow-primary/20 relative"
                                        style={{ height: `${(item.count / maxCount) * 100}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all translate-y-2 group-hover/bar:translate-y-0 whitespace-nowrap shadow-xl">
                                            {item.count} items
                                            <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-slate-900 dark:bg-white" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 tracking-tighter">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subject Mastery - Enhanced Ring Charts */}
                <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">学科能力均衡度</h3>
                        <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-500 font-bold">本周统计</span>
                    </div>
                    <div className="flex justify-around items-center">
                        {[
                            { name: '数学', value: 92, color: 'text-blue-500', bg: 'bg-blue-500/10', icon: 'calculate' },
                            { name: '语文', value: 78, color: 'text-orange-400', bg: 'bg-orange-400/10', icon: 'menu_book' },
                            { name: '英语', value: 85, color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: 'translate' },
                        ].map((subject) => (
                            <div key={subject.name} className="flex flex-col items-center gap-3 group/subject cursor-help">
                                <div className="relative size-20 flex items-center justify-center transition-transform group-hover/subject:scale-110 duration-500">
                                    <svg className="size-full -rotate-90">
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="34"
                                            className="fill-none stroke-current opacity-10"
                                            strokeWidth="6"
                                        />
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="34"
                                            className={`fill-none stroke-current ${subject.color}`}
                                            strokeWidth="6"
                                            strokeDasharray={2 * Math.PI * 34}
                                            strokeDashoffset={2 * Math.PI * 34 * (1 - subject.value / 100)}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{subject.value}</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className={`material-symbols-outlined text-xs ${subject.color}`}>{subject.icon}</span>
                                    <span className="text-xs font-extrabold text-slate-700 dark:text-gray-200">{subject.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI AI Insight Advice */}
                <div className="relative group overflow-hidden rounded-[2rem] p-[1px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 shadow-2xl">
                    <div className="relative bg-white dark:bg-[#1e1b4b]/40 backdrop-blur-3xl rounded-[2rem] p-7 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                                <span className="material-symbols-outlined text-[24px] animate-pulse">smart_toy</span>
                            </div>
                            <div>
                                <h4 className="font-black text-indigo-600 dark:text-indigo-200 tracking-tight">AI 智能伴学建议</h4>
                                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Analysis Result</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-indigo-100/90 leading-relaxed font-medium">
                            根据近期数据分析，孩子的计算准确率稳步提升，但在应用题理解上略有波动。建议本周多进行一些趣味应用题的互动练习。
                        </p>
                        <button className="mt-2 w-full py-3.5 bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all">
                            获取定制化练习题集
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProgressPage;
