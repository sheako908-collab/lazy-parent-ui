import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeworkScannerPage: React.FC = () => {
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            alert('模拟扫描成功！作业已提交。');
            navigate('/student/workbench');
        }, 2000);
    };

    return (
        <div className="flex flex-col h-screen bg-black relative">
            {/* Camera Viewfinder Mock */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">相机预览区域</span>
                </div>
            </div>

            {/* Overlay */}
            <header className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>

            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] aspect-[3/4] border-2 border-white/50 rounded-3xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-xl"></div>

                    {isScanning && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(37,99,235,0.8)] animate-[scan_2s_linear_infinite]"></div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 pb-10 flex flex-col items-center justify-center z-10 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white mb-6 text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur">
                    将作业放入框内，自动对焦
                </p>
                <button
                    onClick={handleScan}
                    className="size-20 rounded-full border-4 border-white flex items-center justify-center p-1 group"
                >
                    <div className="w-full h-full bg-white rounded-full group-active:scale-90 transition-transform"></div>
                </button>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default HomeworkScannerPage;