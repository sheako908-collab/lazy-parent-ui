import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIService, ChatMessage } from '../../services/ai';
import { AuthService } from '../../services/auth';

const ChatPage: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: '你好！我是你的 AI 辅导老师。有什么不懂的题目或者知识点，随时问我哦！' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', content: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const replyContent = await AIService.chat(inputText);
            const aiMsg: ChatMessage = { role: 'model', content: replyContent };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg: ChatMessage = { role: 'model', content: '抱歉，我现在有点累（网络错误），请稍后再试。' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white">AI 辅导老师</h1>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                            在线中
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                            {/* Avatar */}
                            <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-emerald-500'
                                }`}>
                                <span className="material-symbols-outlined text-white text-sm">
                                    {msg.role === 'user' ? 'person' : 'smart_toy'}
                                </span>
                            </div>

                            {/* Bubble */}
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-indigo-500 text-white rounded-tr-none'
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700">
                            <div className="flex gap-1">
                                <span className="size-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="size-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="size-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
                <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-3xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                    <button className="p-2 text-gray-400 hover:text-indigo-500 transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="输入题目或问题..."
                        className="flex-1 max-h-32 bg-transparent border-none focus:ring-0 resize-none py-3 text-sm dark:text-white scrollbar-hide"
                        rows={1}
                        style={{ minHeight: '44px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim() || isLoading}
                        className={`p-2 rounded-full transition-all ${inputText.trim() && !isLoading
                                ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;