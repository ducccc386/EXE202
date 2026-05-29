import React from 'react';
import Navbar from '../components/layout/Navbar';
import RequestList from '../components/homepage/RequestList';

const AllRequests = ({ user, onLogout, onOpenAuth }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar được giữ nguyên và cố định ở đầu trang */}
            <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} />

            {/* Khu vực Header trang trí */}
            <div className="relative pt-24 pb-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Trung tâm lớp học
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">
                                Tìm kiếm và kết nối với các yêu cầu gia sư phù hợp nhất
                            </p>
                        </div>

                        {/* Một thanh trạng thái nhỏ trang trí */}
                        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Đang cập nhật theo thời gian thực
                        </div>
                    </div>
                </div>
            </div>

            {/* Khu vực danh sách lớp học */}
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Lưu ý: isHomePage={false} sẽ gọi RequestList hiện toàn bộ danh sách 
                   và grid trong RequestList sẽ tự dàn trang không đè nhau
                */}
                <RequestList isHomePage={false} />
            </main>

            {/* Footer đơn giản */}
            <footer className="text-center py-8 text-gray-400 text-sm">
                © 2026 StudyHub - Kết nối tri thức cho mọi người.
            </footer>
        </div>
    );
};

export default AllRequests;