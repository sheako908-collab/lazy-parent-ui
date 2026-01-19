import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // 设置模拟家长用户并进入家长端
        const mockUser = {
            id: 'mock-user-parent',
            phone: '13888888888',
            role: 'parent',
            studentProfile: {
                name: '演示同学',
                grade: '三年级',
                school: '实验中心小学'
            }
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-demo-token');

        navigate('/parent/dashboard');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col relative overflow-hidden font-display">
            <div className="flex items-center p-4 justify-between z-10 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white/80 hover:text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="text-text-secondary text-sm font-bold tracking-wide hover:text-white transition-colors">
                    帮助
                </button>
            </div>

            <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full z-10 relative">
                <div className="flex flex-col items-center justify-center mt-6 mb-10">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />
                        <div className="relative size-24 bg-gradient-to-br from-surface-dark to-background-dark border border-border-dark rounded-3xl flex items-center justify-center shadow-2xl">
                            <span className="material-symbols-outlined text-primary text-[48px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                                smart_toy
                            </span>
                            <div className="absolute top-0 right-0 -mt-1 -mr-1 size-4 bg-primary rounded-full border-2 border-background-dark animate-pulse" />
                        </div>
                    </div>
                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-white text-center">欢迎回来</h1>
                    <p className="mt-2 text-text-secondary text-sm text-center">懒父母的智能辅导助手</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <p className="text-center text-primary/80 text-sm leading-relaxed">
                            为了您的演示体验，已为您准备好演示账号，点击下方按钮即可直接进入家长控制台。
                        </p>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full group relative flex items-center justify-center overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#0cb034] transition-all duration-300 group-hover:scale-[1.02]" />
                        <div className="relative flex h-14 w-full items-center justify-center rounded-2xl bg-transparent transition-all">
                            <span className="text-background-dark font-bold text-lg tracking-wide">立即进入家长端 (免登录)</span>
                        </div>
                    </button>
                </div>

                <div className="mt-auto mb-8 flex flex-col items-center w-full">
                    <div className="relative flex py-5 items-center w-full">
                        <div className="flex-grow border-t border-border-dark" />
                        <span className="flex-shrink-0 mx-4 text-text-secondary text-xs">演示版本</span>
                        <div className="flex-grow border-t border-border-dark" />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
};

export default LoginPage;
