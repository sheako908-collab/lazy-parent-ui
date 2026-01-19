import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">同步学习</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">school</span>
                <p>课程功能开发中，敬请期待！</p>
            </div>
        </div>
    );
};

export default LearningPage;