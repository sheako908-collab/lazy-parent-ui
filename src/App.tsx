import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ParentDashboard from './pages/parent/ParentDashboard';
import VerificationLockPage from './pages/parent/VerificationLockPage';
import ProgressPage from './pages/parent/ProgressPage';
import StudentWorkbench from './pages/student/StudentWorkbench';
import LearningPage from './pages/student/LearningPage';
import HomeworkScannerPage from './pages/student/HomeworkScannerPage';
import UserCenterPage from './pages/student/UserCenterPage';
import MistakeBookPage from './pages/student/MistakeBookPage';
import ChatPage from './pages/student/ChatPage';
import './index.css';

function App() {
  // 自动设置模拟用户信息，彻底跳过验证流程
  useEffect(() => {
    const mockUser = {
      id: 'mock-user-parent',
      phone: '13888888888',
      role: 'parent',
      studentProfile: {
        name: '演示用户',
        grade: '三年级',
        school: '实验中心小学'
      }
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-demo-token');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 全局移除 /login 路由，任何尝试进入登录的行为都会被送往仪表盘 */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/verification-lock" element={<VerificationLockPage />} />
        <Route path="/parent/progress" element={<ProgressPage />} />
        <Route path="/student/workbench" element={<StudentWorkbench />} />
        <Route path="/student/scanner" element={<HomeworkScannerPage />} />
        <Route path="/student/learning" element={<LearningPage />} />
        <Route path="/student/center" element={<UserCenterPage />} />
        <Route path="/student/mistakes" element={<MistakeBookPage />} />
        <Route path="/student/chat" element={<ChatPage />} />

        {/* 默认直达家长端 */}
        <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/parent/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
