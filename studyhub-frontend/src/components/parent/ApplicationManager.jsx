import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar'; // Đảm bảo đường dẫn đúng
import { getParentApplications, updateApplicationStatus } from '../../services/parentService';
import { Check, X, Loader2, BookOpen, User, Clock, CheckCircle, XCircle } from 'lucide-react';

const ApplicationManager = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const parentId = localStorage.getItem('userId');

    const fetchData = async () => {
        if (!parentId) return;
        setLoading(true);
        try {
            const res = await getParentApplications(parentId);
            setApps(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, [parentId]);

    const handleAction = async (id, status) => {
        try {
            await updateApplicationStatus(id, status);
            fetchData();
        } catch (err) { alert("Có lỗi xảy ra!"); }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} onOpenPostRequest={onOpenPostRequest} />

            <main className="max-w-5xl mx-auto p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-indigo-900">Quản lý đơn ứng tuyển</h1>
                    <p className="text-gray-500">Xem và xét duyệt các gia sư đang quan tâm đến lớp học của bạn</p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-indigo-600" /></div>
                ) : apps.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-400">Chưa có gia sư nào ứng tuyển.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {apps.map(app => (
                            <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                        <BookOpen size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg text-indigo-950">{app.requestTitle}</h3>
                                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><User size={14} /> {app.tutorName}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> Ghi chú: {app.message}</span>
                                        </div>
                                    </div>
                                </div>

                                {app.status === 'PENDING' ? (
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAction(app.id, 'ACCEPTED')} className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                                            <Check size={16} /> Duyệt
                                        </button>
                                        <button onClick={() => handleAction(app.id, 'REJECTED')} className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                                            <X size={16} /> Từ chối
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 ${app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {app.status === 'ACCEPTED' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        {app.status}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
export default ApplicationManager;