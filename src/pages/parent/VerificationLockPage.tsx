import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationLockPage: React.FC = () => {
    const navigate = useNavigate();
    const [passcode, setPasscode] = useState(['', '', '', '']);

    const handleKeyPress = (num: string) => {
        const nextIdx = passcode.findIndex(v => v === '');
        if (nextIdx !== -1) {
            const newPasscode = [...passcode];
            newPasscode[nextIdx] = num;
            setPasscode(newPasscode);

            if (nextIdx === 3) {
                setTimeout(() => {
                    navigate('/student/workbench');
                }, 500);
            }
        }
    };

    const handleBackspace = () => {
        const lastFilledIdx = [...passcode].reverse().findIndex(v => v !== '');
        if (lastFilledIdx !== -1) {
            const actualIdx = 3 - lastFilledIdx;
            const newPasscode = [...passcode];
            newPasscode[actualIdx] = '';
            setPasscode(newPasscode);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center p-8 max-w-md mx-auto relative overflow-hidden font-display">
            <div className="absolute top-8 left-8">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="text-center mb-12">
                <div className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
                    <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">家长验证锁</h1>
                <p className="text-text-secondary text-sm">请输入四位数字密码解锁</p>
            </div>

            <div className="flex gap-4 mb-16">
                {passcode.map((digit, i) => (
                    <div
                        key={i}
                        className={`size-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${digit ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-transparent'
                            }`}
                    >
                        {digit ? '*' : '•'}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                        key={num}
                        onClick={() => handleKeyPress(num.toString())}
                        className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:bg-primary/50 transition-all"
                    >
                        {num}
                    </button>
                ))}
                <div className="size-14"></div>
                <button
                    onClick={() => handleKeyPress('0')}
                    className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:bg-primary/50 transition-all"
                >
                    0
                </button>
                <button
                    onClick={handleBackspace}
                    className="size-14 rounded-full flex items-center justify-center text-white"
                >
                    <span className="material-symbols-outlined text-2xl">backspace</span>
                </button>
            </div>
        </div>
    );
};

export default VerificationLockPage;
