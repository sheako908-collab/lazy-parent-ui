import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert('请先阅读并同意用户协议和隐私政策');
            return;
        }

        try {
            // Full version: always attempt real login through AuthService
            // Pass the verification code as the password
            await AuthService.login(phone, code);
            navigate('/student/workbench');
        } catch (loginError) {
            try {
                // If login fails (user not found), attempt registration
                await AuthService.register(phone, 'student', code);
                navigate('/student/workbench');
            } catch (registerError) {
                alert('登录失败，请再次检查手机号或验证码');
            }
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col relative overflow-hidden font-display">
            <div className="flex items-center p-4 justify-between z-10 relative">
                <button className="text-white/80 hover:text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
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

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="group relative">
                        <div className="flex w-full items-center rounded-2xl bg-surface-dark border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200">
                            <div className="flex items-center justify-center pl-4 pr-3 border-r border-border-dark h-8 my-3">
                                <span className="text-white font-medium text-base">+86</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="请输入手机号"
                                className="w-full bg-transparent border-none text-white placeholder:text-text-secondary/50 focus:ring-0 text-lg py-4 pl-3"
                            />
                            <div className="pr-4 text-text-secondary">
                                <span className="material-symbols-outlined text-[20px]">smartphone</span>
                            </div>
                        </div>
                    </div>

                    <div className="group relative">
                        <div className="flex w-full items-center rounded-2xl bg-surface-dark border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200">
                            <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="请输入验证码"
                                className="w-full bg-transparent border-none text-white placeholder:text-text-secondary/50 focus:ring-0 text-lg py-4 pl-4"
                            />
                            <button
                                type="button"
                                className="mr-2 px-4 py-2 text-sm font-bold text-primary hover:text-white hover:bg-primary/20 rounded-xl transition-colors shrink-0"
                            >
                                获取验证码
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-2 px-1">
                        <div className="flex items-center h-5">
                            <input
                                id="agreement"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="size-5 rounded border-text-secondary/50 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                        </div>
                        <div className="text-xs leading-5 text-text-secondary">
                            <label htmlFor="agreement" className="font-medium cursor-pointer">
                                我已阅读并同意
                                <a href="#" className="text-primary hover:underline px-1">《用户协议》</a>
                                和
                                <a href="#" className="text-primary hover:underline px-1">《隐私政策》</a>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 group relative flex items-center justify-center overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#0cb034] transition-all duration-300 group-hover:scale-[1.02]" />
                        <div className="relative flex h-14 w-full items-center justify-center rounded-2xl bg-transparent transition-all">
                            <span className="text-background-dark font-bold text-lg tracking-wide">登录 / 注册</span>
                        </div>
                    </button>
                </form>

                <div className="mt-auto mb-8 flex flex-col items-center w-full">
                    <div className="relative flex py-5 items-center w-full">
                        <div className="flex-grow border-t border-border-dark" />
                        <span className="flex-shrink-0 mx-4 text-text-secondary text-xs">其他方式登录</span>
                        <div className="flex-grow border-t border-border-dark" />
                    </div>

                    <div className="flex items-center justify-center gap-12 w-full">
                        <button className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full bg-[#07c160]/10 border border-[#07c160]/30 flex items-center justify-center group-hover:bg-[#07c160] transition-all duration-300 shadow-lg shadow-[#07c160]/5">
                                <svg className="w-6 h-6 fill-[#07c160] group-hover:fill-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.2,13.9c-0.1,0-0.1,0-0.2,0.1c-3.6,0.4-5.3-2.3-3.8-4.8C5.6,6.8,9.4,6.1,11.6,7.8c1.7,1.3,1.8,3.8,0.3,5.4l0.2,1.8 l-1.7-1C9.6,14.5,8.9,14.7,8.2,13.9z M19.2,7.8c-4.8,0-8,3.3-8,7s3.8,6.4,8.2,6.4c1,0,1.9-0.2,2.7-0.6l2,1.1l-0.3-2.2 c1.7-1.3,2.6-3,2.6-4.7C26.4,11,23.1,7.8,19.2,7.8z" />
                                </svg>
                            </div>
                            <span className="text-xs text-text-secondary group-hover:text-[#07c160] transition-colors">微信</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-full bg-[#12B7F5]/10 border border-[#12B7F5]/30 flex items-center justify-center group-hover:bg-[#12B7F5] transition-all duration-300 shadow-lg shadow-[#12B7F5]/5">
                                <svg className="w-6 h-6 fill-[#12B7F5] group-hover:fill-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.99,2.83c-3.61,0-6.54,2.68-6.54,6c0,1.99,1.06,3.77,2.71,4.86c-0.23,0.67-0.56,1.55-0.95,2.15 c-0.08,0.16,0.02,0.47,0.22,0.59c0.14,0.08,0.23,0.06,0.34,0.05c0.12-0.01,0.3-0.1,0.46-0.15c1.23-0.58,2.57-1.5,3.2-2.27 c0.33,0.04,0.61,0.07,0.85,0.07c0.35,0,0.56-0.02,0.84-0.07c0.63,0.77,1.83,1.69,3.19,2.27c0.15,0.05,0.34,0.14,0.46,0.15 c0.12,0.01,0.21,0.02,0.35-0.05c0.2-0.12,0.3-0.43,0.22-0.59c-0.39-0.6-0.72-1.48-0.95-2.15c1.65-1.09,2.71-2.87,2.71-4.86 C18.53,5.51,15.6,2.83,11.99,2.83z" />
                                </svg>
                            </div>
                            <span className="text-xs text-text-secondary group-hover:text-[#12B7F5] transition-colors">QQ</span>
                        </button>
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
