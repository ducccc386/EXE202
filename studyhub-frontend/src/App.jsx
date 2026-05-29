import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroCarousel from './components/homepage/HeroCarousel';
import QuickActions from './components/homepage/QuickActions';
import RequestList from './components/homepage/RequestList';
import TutorList from './components/homepage/TutorList';
import AuthModal from './components/layout/AuthModal';
import PostRequestModal from './components/layout/PostRequestModal';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/security/AdminRoute';

// Các trang quản lý
import ApplicationManager from './components/parent/ApplicationManager';
import TutorApplicationHistory from './components/tutor/TutorApplicationHistory'; // Import trang gia sư

// Các trang danh sách mở rộng
import AllRequests from './pages/AllRequests';
import AllTutors from './pages/AllTutors';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPostRequestOpen, setIsPostRequestOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('userFullName');
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    return token ? { token, fullName, role, userId } : null;
  });

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  const MainHomepageLayout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenPostRequest={() => setIsPostRequestOpen(true)}
          onLogout={handleLogout}
        />
        <HeroCarousel />
        <QuickActions />
        <RequestList isHomePage={true} />
        <TutorList isHomePage={true} />
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <PostRequestModal
        isOpen={isPostRequestOpen}
        onClose={() => setIsPostRequestOpen(false)}
      />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomepageLayout />} />

        {/* Route Phụ huynh: Quản lý đơn đến */}
        <Route path="/parent/applications" element={
          user && user.role === 'PARENT' ? (
            <ApplicationManager user={user} onLogout={handleLogout} onOpenAuth={() => setIsAuthOpen(true)} onOpenPostRequest={() => setIsPostRequestOpen(true)} />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Route Gia sư: Lịch sử ứng tuyển */}
        <Route path="/tutor/applications" element={
          user && user.role === 'TUTOR' ? (
            <TutorApplicationHistory user={user} onLogout={handleLogout} onOpenAuth={() => setIsAuthOpen(true)} />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Các trang công khai */}
        <Route path="/all-requests" element={
          <AllRequests user={user} onLogout={handleLogout} onOpenAuth={() => setIsAuthOpen(true)} />
        } />
        <Route path="/all-tutors" element={
          <AllTutors user={user} onLogout={handleLogout} onOpenAuth={() => setIsAuthOpen(true)} />
        } />

        {/* Route Admin */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard onLogout={handleLogout} />
          </AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;