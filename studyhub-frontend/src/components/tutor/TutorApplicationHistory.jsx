import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, BookOpen, Clock } from 'lucide-react';
import Navbar from '../layout/Navbar'; // Import đúng file Navbar của bạn

const TutorApplicationHistory = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/api/tutor/applications/my-applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setHistory(res.data);
            } catch (err) {
                console.error("Lỗi:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Truyền các props này vào để Navbar hiển thị đúng user */}
            <Navbar
                user={user}
                onLogout={onLogout}
                onOpenAuth={onOpenAuth}
                onOpenPostRequest={onOpenPostRequest}
            />

            <main className="max-w-5xl mx-auto py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-indigo-900">Lịch sử ứng tuyển</h1>
                    <p className="text-gray-500">Theo dõi trạng thái các lớp bạn đã gửi đơn</p>
                </header>

                {loading ? (
                    <div className="flex justify-center h-64 items-center bg-white rounded-2xl border border-gray-100">
                        <Loader2 className="animate-spin w-10 h-10 text-indigo-500" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {history.length > 0 ? history.map(app => (
                            <div key={app.id} className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{app.requestTitle}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <Clock size={14} /> <span>Vừa cập nhật gần đây</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${app.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                    app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {app.status}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium">Bạn chưa gửi đơn ứng tuyển nào.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TutorApplicationHistory;