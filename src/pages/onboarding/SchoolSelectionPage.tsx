import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

const grades = [
    '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
    '初一', '初二', '初三'
];

const SchoolSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const [school, setSchool] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [showSchoolList, setShowSchoolList] = useState(false);

    // 模拟学校搜索数据
    const mockSchools = ['清华附小', '北大附小', '实验小学', '向阳小学'].filter(s =>
        s.includes(school) && school.length > 0
    );

    const handleComplete = () => {
        if (!school || !selectedGrade) {
            alert('请完整填写学校和年级信息');
            return;
        }
        console.log('信息完善完成', { school, selectedGrade });
        // 进入家长工作台
        navigate('/parent/dashboard');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-display">
            {/* 顶部栏 */}
            <div className="flex items-center p-4 justify-between z-10 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white/80 hover:text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <span className="font-bold text-lg">完善信息</span>
                <div className="size-10"></div>
            </div>

            <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full z-10 relative py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">欢迎来到懒爸妈</h2>
                    <p className="text-text-secondary text-sm">为了提供精准的 AI 辅导建议，请完善学生信息</p>
                </div>

                <div className="space-y-8">
                    {/* 选择学校 */}
                    <section>
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">所在学校</h3>
                        <div className="relative">
                            <div className="flex w-full items-center rounded-2xl bg-surface-dark border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200">
                                <div className="flex items-center justify-center pl-4 pr-3 border-r border-border-dark h-8 my-3">
                                    <span className="material-symbols-outlined text-text-secondary text-[20px]">school</span>
                                </div>
                                <input
                                    type="text"
                                    value={school}
                                    onChange={(e) => {
                                        setSchool(e.target.value);
                                        setShowSchoolList(true);
                                    }}
                                    onFocus={() => setShowSchoolList(true)}
                                    placeholder="请输入或搜索学校名称"
                                    className="w-full bg-transparent border-none text-white placeholder:text-text-secondary/50 focus:ring-0 text-base py-4 pl-3"
                                />
                            </div>

                            {/* 学校搜索下拉列表 */}
                            {showSchoolList && mockSchools.length > 0 && (
                                <Card className="absolute top-full left-0 right-0 mt-2 z-20 overflow-hidden p-0">
                                    {mockSchools.map((s) => (
                                        <div
                                            key={s}
                                            onClick={() => {
                                                setSchool(s);
                                                setShowSchoolList(false);
                                            }}
                                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer border-b border-white/5 last:border-none text-sm"
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </Card>
                            )}
                        </div>
                    </section>

                    {/* 选择年级 */}
                    <section>
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">当前年级</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {grades.map((grade) => (
                                <button
                                    key={grade}
                                    onClick={() => setSelectedGrade(grade)}
                                    className={cn(
                                        "flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-300",
                                        selectedGrade === grade
                                            ? "bg-primary/20 border-primary text-primary shadow-glow"
                                            : "bg-surface-dark border-border-dark text-text-secondary hover:border-primary/50"
                                    )}
                                >
                                    <span className="text-sm font-medium">{grade}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-auto py-8">
                    <Button
                        onClick={handleComplete}
                        disabled={!school || !selectedGrade}
                        className="w-full py-4 text-lg"
                    >
                        完成并开启
                    </Button>
                    <p className="text-center text-[10px] text-text-secondary/40 mt-4 uppercase tracking-[0.2em]">
                        School & Grade Data for AI Personalization
                    </p>
                </div>
            </div>

            {/* 背景装饰 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default SchoolSelectionPage;
