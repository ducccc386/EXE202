import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, ClipboardList, Bell, PlusCircle, LogIn, LogOut, User } from 'lucide-react';
import studyhubLogo from '../../assets/studyhub_logo.jpg';

const Navbar = ({ user, onOpenAuth, onLogout, onOpenPostRequest }) => {
    const navigate  = useNavigate();
    const location  = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/',             icon: <Home className="w-3.5 h-3.5" />,     label: 'Trang chủ' },
        { to: '/all-requests', icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Tất cả lớp học' },
        { to: '/all-tutors',   icon: <Users className="w-3.5 h-3.5" />,    label: 'Gia sư' },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
                : 'bg-white border-b border-gray-100'
        }`}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

                {/* LOGO — không đổi */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm">
                        <img src={studyhubLogo} alt="StudyHub Logo" className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://placehold.co/?text=SH' }} />
                    </div>
                    <span className="text-xl font-black tracking-tight">
                        <span className="text-[#1a3a8f]">Study</span><span className="text-[#00a8b8]">Hub</span>
                    </span>
                </Link>

                {/* NAV LINKS */}
                <div className="flex items-center gap-1">
                    {navLinks.map(({ to, icon, label }) => (
                        <Link key={to} to={to}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive(to)
                                    ? 'text-indigo-600 bg-indigo-50'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}>
                            {icon}{label}
                        </Link>
                    ))}

                    {user?.role === 'TUTOR' && (
                        <Link to="/tutor/history"
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive('/tutor/history')
                                    ? 'text-emerald-700 bg-emerald-50'
                                    : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                            }`}>
                            <ClipboardList className="w-3.5 h-3.5" /> Đơn ứng tuyển
                        </Link>
                    )}

                    {user?.role === 'PARENT' && (
                        <>
                            <Link to="/parent/applications"
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    isActive('/parent/applications')
                                        ? 'text-indigo-700 bg-indigo-50'
                                        : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'
                                }`}>
                                <Bell className="w-3.5 h-3.5" /> Quản lý
                            </Link>
                            <button onClick={onOpenPostRequest}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150">
                                <PlusCircle className="w-3.5 h-3.5" /> Đăng tin
                            </button>
                        </>
                    )}
                </div>

                {/* RIGHT: CTA + AUTH */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* CTA buttons */}
                    <button
                        onClick={() => user ? navigate('/all-tutors') : onOpenAuth()}
                        className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-150">
                        Tìm gia sư
                    </button>
                    <button
                        onClick={() => user ? navigate('/tutor/history') : onOpenAuth()}
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all duration-150">
                        Trở thành gia sư
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    {/* Auth */}
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 pl-1">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-xs text-gray-400">Xin chào</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-bold text-gray-800">{user.fullName}</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                                            user.role === 'TUTOR'
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-blue-500 text-white'
                                        }`}>{user.role}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onLogout} title="Đăng xuất"
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={onOpenAuth}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-150">
                            <LogIn className="w-4 h-4" /> Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;