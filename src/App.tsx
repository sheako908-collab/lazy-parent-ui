import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SchoolSelectionPage from './pages/onboarding/SchoolSelectionPage';
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding/school-selection" element={<SchoolSelectionPage />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/verification-lock" element={<VerificationLockPage />} />
        <Route path="/parent/progress" element={<ProgressPage />} />
        <Route path="/student/workbench" element={<StudentWorkbench />} />
        <Route path="/student/scanner" element={<HomeworkScannerPage />} />
        <Route path="/student/learning" element={<LearningPage />} />
        <Route path="/student/center" element={<UserCenterPage />} />
        <Route path="/student/mistakes" element={<MistakeBookPage />} />
        <Route path="/student/chat" element={<ChatPage />} /> {/* Added new route for ChatPage */}

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
