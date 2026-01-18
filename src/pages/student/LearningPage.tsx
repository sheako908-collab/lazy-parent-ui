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
export default LearningPage;