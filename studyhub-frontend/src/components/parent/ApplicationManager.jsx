import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import { getParentApplications, updateApplicationStatus } from '../../services/parentService';
import { Check, X, Loader2, BookOpen, User, Clock } from 'lucide-react';

const ApplicationManager = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sử dụng userId từ localStorage như code gốc của bạn
    const parentId = localStorage.getItem('userId');
    console.log("DEBUG - ID Phụ huynh lấy từ localStorage là:", parentId);

    const navigate = useNavigate();

    const fetchData = async () => {
        // Kiểm tra an toàn trước khi gọi API
        if (!parentId) {
            console.error("LỖI: Không tìm thấy parentId (userId) trong localStorage!");
            return;
        }

        setLoading(true);
        try {
            console.log("DEBUG - Đang gọi API lấy đơn ứng tuyển cho Parent ID:", parentId);
            const res = await getParentApplications(parentId);

            // Log dữ liệu nhận được để kiểm tra cấu trúc
            console.log("DEBUG - Dữ liệu đơn ứng tuyển nhận được:", res.data);
            setApps(res.data);
        } catch (err) {
            // Log chi tiết lỗi để biết là 404, 500 hay lỗi kết nối
            console.error("CHI TIẾT LỖI API:", err.response ? err.response.data : err.message);
            alert("Có lỗi xảy ra khi tải dữ liệu đơn ứng tuyển. Vui lòng kiểm tra console!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [parentId]);

    const handleAction = async (id, status) => {
        try {
            await updateApplicationStatus(id, status);
            // Sau khi cập nhật xong thì reload lại dữ liệu
            fetchData();
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            alert("Có lỗi xảy ra khi cập nhật đơn!");
        }
    };

    // Logic sắp xếp giữ nguyên theo yêu cầu
    const sortedApps = [...apps].sort((a, b) => {
        if (a.status === 'ACCEPTED' && b.status !== 'ACCEPTED') return -1;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} onOpenPostRequest={onOpenPostRequest} />
            <div className="max-w-6xl mx-auto flex gap-6 p-8">
                <Sidebar role="PARENT" />
                <main className="flex-1">
                    <h1 className="text-3xl font-black text-indigo-900 mb-8">Quản lý đơn ứng tuyển</h1>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {sortedApps.map(app => (
                                <div key={app.id} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BookOpen /></div>
                                        <div>
                                            <h3 className="font-bold text-lg">{app.requestTitle}</h3>
                                            <div className="text-sm text-gray-500 flex gap-4">
                                                <p><User size={14} className="inline" /> {app.tutorName}</p>
                                                <p><Clock size={14} className="inline" /> {app.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {app.status === 'PENDING' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAction(app.id, 'ACCEPTED')}
                                                className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-bold hover:bg-emerald-100 transition"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(app.id, 'REJECTED')}
                                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={`px-4 py-2 rounded-lg font-bold ${app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {app.status}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {sortedApps.length === 0 && !loading && (
                                <p className="text-center text-gray-500 py-10">Bạn chưa có đơn ứng tuyển nào.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ApplicationManager;