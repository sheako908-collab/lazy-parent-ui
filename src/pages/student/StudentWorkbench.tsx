import { useNavigate } from 'react-router-dom';

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
export default StudentWorkbench;