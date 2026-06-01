import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, HelpCircle, LogIn, LogOut, User, ClipboardList, PlusCircle, BookOpen, Users, Bell, Settings } from 'lucide-react';
import studyhubLogo from '../../assets/studyhub_logo.jpg';

const Navbar = ({ user, onOpenAuth, onLogout, onOpenPostRequest }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Xử lý click ra ngoài để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFindTutor = () => user ? navigate('/all-tutors') : onOpenAuth();
    const handleBecomeTutor = () => user ? navigate('/tutor/history') : onOpenAuth();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* 1. LOGO */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm">
                        <img src={studyhubLogo} alt="StudyHub Logo" className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://placehold.co/?text=SH' }} />
                    </div>
                    <span className="text-2xl font-black tracking-tight">
                        <span className="text-[#1a3a8f]">Study</span><span className="text-[#00a8b8]">Hub</span>
                    </span>
                </Link>

                {/* 2. MENU */}
                <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
                    <div className="flex items-center bg-gray-50 border rounded-lg px-3 py-1">
                        <input placeholder="Tìm gia sư, môn học, khu vực..." className="bg-transparent outline-none text-sm w-64" />
                        <button onClick={handleFindTutor} className="ml-3 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Tìm gia sư</button>
                        <button onClick={handleBecomeTutor} className="ml-2 px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">Trở thành gia sư</button>
                    </div>

                    <Link to="/" className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 transition-colors"><Home className="w-4 h-4" /> Trang chủ</Link>
                    <Link to="/all-requests" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"><BookOpen className="w-4 h-4" /> Tất cả lớp học</Link>
                    <Link to="/all-tutors" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"><Users className="w-4 h-4" /> Gia sư</Link>

                    {user && user.role === 'TUTOR' && (
                        <Link to="/tutor/history" className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                            <ClipboardList className="w-4 h-4" /> Đơn ứng tuyển
                        </Link>
                    )}

                    {user && user.role === 'PARENT' && (
                        <>
                            <Link to="/parent/applications" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100"><Bell className="w-4 h-4" /> Quản lý</Link>
                            <button onClick={onOpenPostRequest} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"><PlusCircle className="w-4 h-4" /> Đăng tin</button>
                        </>
                    )}

                    {/* XÁC THỰC VỚI DROPDOWN */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-4 bg-indigo-50/60 px-4 py-2 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all outline-none"
                            >
                                <div className="flex items-center gap-1.5 text-indigo-900">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    <span className="font-bold text-indigo-600 text-sm">Xin chào, {user.fullName}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase ${user.role === 'TUTOR' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-blue-500 text-white border-blue-600'}`}>
                                        {user.role}
                                    </span>
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[9999]">
                                    {user.role === 'TUTOR' && (
                                        <Link to={`/tutor/${user.userId}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Settings className="w-4 h-4" /> Sửa hồ sơ
                                        </Link>
                                    )}
                                    <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                                        <LogOut className="w-4 h-4" /> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={onOpenAuth} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"><LogIn className="w-4 h-4" /> Đăng nhập</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;