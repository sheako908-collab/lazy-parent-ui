import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthService } from '../../services/auth';
import { cn } from '../../lib/utils';

interface DashboardStats {
    pendingCount: number;
    mistakeCount: number;
    recentHomeworks: Array<{
        id: string;
        subject: string | null;
        createdAt: string;
        status: string;
    }>;
}

const ParentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const today = new Date();
    const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][today.getDay()];

    const [stats, setStats] = useState<DashboardStats>({
        pendingCount: 0,
        mistakeCount: 0,
        recentHomeworks: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            const user = AuthService.getCurrentUser();
            if (!user) return;

            try {
                const hostname = window.location.hostname;
                const apiBase = (hostname === 'localhost' || hostname === '127.0.0.1')
                    ? `http://${hostname}:3001`
                    : '';

                const response = await axios.get(`${apiBase}/api/dashboard/stats`, {
                    params: { userId: user.id }
                });
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
                // Mock data for demo if backend fails
                setStats({
                    pendingCount: 3,
                    mistakeCount: 5,
                    recentHomeworks: [
                        { id: '1', subject: '数学 - 三角函数练习', createdAt: new Date().toISOString(), status: 'pending' },
                        { id: '2', subject: '语文 - 古诗词默写', createdAt: new Date(Date.now() - 3600000).toISOString(), status: 'checked' },
                        { id: '3', subject: '英语 - 单元单词听写', createdAt: new Date(Date.now() - 7200000).toISOString(), status: 'pending' },
                    ]
                });
            }
        };
        fetchStats();
    }, []);

    const handleStartLearning = () => {
        navigate('/parent/verification-lock');
    };

    return (
        <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark overflow-hidden font-display antialiased">
            {/* Header */}
            <header className="flex flex-col pt-6 pb-2 px-6 z-10 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-primary/80 text-sm font-medium tracking-wider uppercase mb-1">Parent Dashboard</p>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">{dateStr} {weekDay}</h2>
                    </div>
                    <div className="size-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-blue-500/80"></div>
                        <span className="relative z-10 font-bold text-xs text-white">Dad</span>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">assignment_late</span>
                        <span className="font-semibold text-primary">今日待办</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{stats.pendingCount}</span>
                            <span className="text-sm text-gray-400">项</span>
                        </div>
                        <button
                            onClick={() => navigate('/parent/progress')}
                            className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm text-primary">bar_chart</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* List Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 relative text-white">
                <h3 className="text-lg font-bold text-white/90 mt-4 mb-4 flex items-center gap-2">
                    <span>近期作业</span>
                    <span className="h-px flex-1 bg-white/10 ml-2"></span>
                </h3>

                <div className="flex flex-col gap-4">
                    {stats.recentHomeworks.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm italic">暂无作业记录</div>
                    ) : (
                        stats.recentHomeworks.map(hw => {
                            let icon = 'description';
                            let bgColor = 'bg-indigo-500/20';
                            let textColor = 'text-indigo-400';
                            let borderColor = 'border-indigo-500/30';

                            if (hw.subject?.includes('数学')) {
                                icon = 'calculate';
                            } else if (hw.subject?.includes('语文')) {
                                icon = 'edit_note';
                                bgColor = 'bg-emerald-500/20';
                                textColor = 'text-primary';
                                borderColor = 'border-emerald-500/30';
                            } else if (hw.subject?.includes('英语')) {
                                icon = 'book_2';
                                bgColor = 'bg-orange-500/20';
                                textColor = 'text-orange-400';
                                borderColor = 'border-orange-500/30';
                            }

                            return (
                                <div key={hw.id} className="group relative flex items-center gap-4 bg-surface-dark hover:bg-white/5 transition-all p-4 rounded-xl border border-white/5 active:scale-[0.98]">
                                    <div className={cn("flex items-center justify-center rounded-lg shrink-0 size-14 border", bgColor, textColor, borderColor)}>
                                        <span className="material-symbols-outlined text-[28px]">{icon}</span>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-white text-base font-semibold truncate">{hw.subject || '未分类作业'}</p>
                                            <span className={cn(
                                                "text-xs font-medium px-2 py-0.5 rounded ml-2 whitespace-nowrap",
                                                hw.status === 'checked' ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                                            )}>
                                                {hw.status === 'checked' ? '已完成' : '未完成'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1 truncate">
                                            {new Date(hw.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 上传
                                        </p>
                                    </div>
                                    <div className="shrink-0 self-center">
                                        <div className={cn(
                                            "size-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                            hw.status === 'checked' ? "border-primary bg-primary" : "border-gray-600 group-hover:border-primary"
                                        )}>
                                            {hw.status === 'checked' && <span className="material-symbols-outlined text-black text-[14px] font-bold">check</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* Floating Action Button */}
            <div className="absolute bottom-[110px] right-6 z-20">
                <button className="flex items-center justify-center size-14 rounded-full bg-primary text-background-dark shadow-glow hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group">
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
                </button>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-0 left-0 w-full p-6 glass-panel z-30 rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <button
                    onClick={handleStartLearning}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl p-4 shadow-glow-blue transition-all duration-300 active:scale-[0.98]"
                >
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                    <div className="relative flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl animate-bounce">🚀</span>
                            <span className="text-lg font-bold tracking-wide">进入学生模式</span>
                        </div>
                        <span className="text-[10px] text-blue-100 uppercase tracking-widest font-semibold opacity-80">Start Companion Mode</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ParentDashboard;
