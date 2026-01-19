import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth';

const UserCenterPage: React.FC = () => {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">个人中心</h1>
            </header>

            <main className="p-4 space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm flex flex-col items-center">
                    <div className="size-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-indigo-600 text-4xl">person</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {user?.studentProfile?.name || '学生'}
                    </h2>
                    <p className="text-gray-500 text-sm">{user?.phone || '未知号码'}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-200">学校</span>
                        <span className="text-gray-500 text-sm">{user?.studentProfile?.school || '未设置'}</span>
                    </div>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-200">年级</span>
                        <span className="text-gray-500 text-sm">{user?.studentProfile?.grade || '未设置'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                        <span className="text-gray-700 dark:text-gray-200">通用设置</span>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full bg-white dark:bg-gray-800 text-red-500 font-medium p-4 rounded-2xl shadow-sm hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                >
                    退出登录
                </button>
            </main>
        </div>
    );
};

export default UserCenterPage;