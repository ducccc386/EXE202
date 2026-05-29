import React from 'react';
import { Users, ShieldCheck, FileText, BarChart3, LogOut, Settings } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* 1. THANH MENU BÊN TRÁI (SIDEBAR) */}
            <div className="w-64 bg-indigo-950 text-white flex flex-col justify-between p-6 shadow-xl">
                <div>
                    {/* Logo Admin */}
                    <div className="flex items-center gap-3 mb-10 border-b border-indigo-900 pb-5">
                        <span className="text-2xl font-black tracking-tight">
                            Study<span className="text-orange-500">Hub</span> <span className="text-xs bg-red-600 px-2 py-0.5 rounded text-white ml-1">ADMIN</span>
                        </span>
                    </div>

                    {/* Các mục quản lý */}
                    <nav className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-900 rounded-xl text-sm font-bold text-white transition-all">
                            <BarChart3 className="w-4 h-4" /> Tổng quan & Thống kê
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-900/50 rounded-xl text-sm font-bold text-indigo-200 hover:text-white transition-all">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Duyệt hồ sơ Gia sư
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-900/50 rounded-xl text-sm font-bold text-indigo-200 hover:text-white transition-all">
                            <Users className="w-4 h-4 text-blue-400" /> Quản lý Người dùng
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-900/50 rounded-xl text-sm font-bold text-indigo-200 hover:text-white transition-all">
                            <FileText className="w-4 h-4 text-orange-400" /> Quản lý Lớp học / Yêu cầu
                        </button>
                    </nav>
                </div>

                {/* Nút Đăng xuất phía dưới */}
                <div className="border-t border-indigo-900 pt-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-900/50 rounded-xl text-sm font-bold text-indigo-200 hover:text-white transition-all">
                        <Settings className="w-4 h-4" /> Cài đặt hệ thống
                    </button>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white rounded-xl text-sm font-bold transition-all">
                        <LogOut className="w-4 h-4" /> Đăng xuất quản trị
                    </button>
                </div>
            </div>

            {/* 2. KHỐI NỘI DUNG CHÍNH BÊN PHẢI (MAIN CONTENT) */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header trên */}
                <header className="bg-white h-20 shadow-sm flex items-center justify-between px-10 border-b border-gray-200">
                    <h1 className="text-xl font-black text-gray-800">Hệ thống Quản trị StudyHub</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-gray-600">Trạng thái: Máy chủ hoạt động ổn định</span>
                    </div>
                </header>

                {/* Nội dung Dashboard thống kê giả lập */}
                <main className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng doanh thu</span>
                            <div className="text-2xl font-black text-gray-800 mt-1">45,000,000đ</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gia sư chờ duyệt</span>
                            <div className="text-2xl font-black text-orange-500 mt-1">12 hồ sơ</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng số học viên</span>
                            <div className="text-2xl font-black text-blue-600 mt-1">1,240 người</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lớp học kết nối mới</span>
                            <div className="text-2xl font-black text-emerald-600 mt-1">+48 lớp</div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400 font-medium py-20 text-sm">
                        Chào mừng Admin Đức. Chọn các mục bên trái để bắt đầu quản trị dữ liệu thực tế.
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;