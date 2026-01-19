import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthService } from '../../services/auth';

interface MistakeRecord {
    id: string;
    questionText: string;
    analysis: string;
    isMastered: boolean;
}

const MistakeBookPage: React.FC = () => {
    const navigate = useNavigate();
    const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMistakes = async () => {
            const user = AuthService.getCurrentUser();
            if (!user) return;

            try {
                // Reuse existing history endpoint for demo
                const apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                    ? `http://${window.location.hostname}:3001/api`
                    : '/api';

                const response = await axios.get(`${apiBase}/homework/history`, {
                    params: { userId: user.id }
                });

                // Extract mistakes from homework history
                const allMistakes: MistakeRecord[] = [];
                if (Array.isArray(response.data)) {
                    response.data.forEach((hw: any) => {
                        if (hw.mistakes && Array.isArray(hw.mistakes)) {
                            allMistakes.push(...hw.mistakes);
                        }
                    });
                }
                setMistakes(allMistakes);
            } catch (error) {
                console.error('Failed to fetch mistakes', error);
                // Fallback Mock Data
                setMistakes([
                    { id: 'm1', questionText: '3 + 5 = ?', analysis: '计算错误', isMastered: false },
                    { id: 'm2', questionText: 'Pool 单词拼写', analysis: '拼写错误', isMastered: false }
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMistakes();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">错题本</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="text-center py-8 text-gray-500">加载中...</div>
                ) : mistakes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">太棒了，目前没有错题！</div>
                ) : (
                    mistakes.map(mistake => (
                        <div key={mistake.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-medium">
                                    {mistake.isMastered ? '已掌握' : '未掌握'}
                                </span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">{mistake.questionText}</p>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                                <p className="text-sm text-orange-600 dark:text-orange-400">
                                    <span className="font-bold mr-1">分析:</span>
                                    {mistake.analysis}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MistakeBookPage;