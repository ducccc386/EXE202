import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Home, HelpCircle, LogIn, LogOut, User, ClipboardList, PlusCircle, BookOpen, Users, Bell } from 'lucide-react';

const Navbar = ({ user, onOpenAuth, onLogout, onOpenPostRequest }) => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* 1. LOGO */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm">
                        <img src="/src/assets/studyhub_logo.jpg" alt="StudyHub Logo" className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://placehold.co/?text=SH' }} />
                    </div>
                    <span className="text-2xl font-black text-indigo-900 tracking-tight">
                        Study<span className="text-orange-500">Hub</span>
                    </span>
                </Link>

                {/* 2. MENU */}
                <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
                    <Link to="/" className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 transition-colors">
                        <Home className="w-4 h-4" /> Trang chủ
                    </Link>
                    <Link to="/all-requests" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                        <BookOpen className="w-4 h-4" /> Tất cả lớp học
                    </Link>
                    <Link to="/all-tutors" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                        <Users className="w-4 h-4" /> Gia sư
                    </Link>

                    {/* PHÂN QUYỀN HÀNH ĐỘNG CHO TUTOR */}
                    {user && user.role === 'TUTOR' && (
                        <Link to="/tutor/history" className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                            <ClipboardList className="w-4 h-4" /> Đơn ứng tuyển
                        </Link>
                    )}

                    {user && user.role === 'PARENT' && (
                        <>
                            {/* Nút Quản lý */}
                            <Link to="/parent/applications" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                                <Bell className="w-4 h-4" /> Quản lý
                            </Link>

                            <button onClick={onOpenPostRequest} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                                <PlusCircle className="w-4 h-4" /> Đăng tin
                            </button>
                        </>
                    )}

                    {/* XÁC THỰC */}
                    {user ? (
                        <div className="flex items-center gap-4 bg-indigo-50/60 px-4 py-2 rounded-full border border-indigo-100">
                            <div className="flex items-center gap-1.5 text-indigo-900">
                                <User className="w-4 h-4 text-indigo-500" />
                                <span>
                                    Xin chào, <span className="font-bold text-indigo-600">{user.fullName}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ml-1.5 font-bold border uppercase ${user.role === 'TUTOR' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-blue-500 text-white border-blue-600'}`}>
                                        {user.role}
                                    </span>
                                </span>
                            </div>
                            <button onClick={onLogout} title="Đăng xuất" className="text-gray-400 hover:text-red-500 transition-colors p-0.5">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={onOpenAuth} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                            <LogIn className="w-4 h-4" /> Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;