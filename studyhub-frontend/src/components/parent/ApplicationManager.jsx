import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import { getParentApplications, updateApplicationStatus } from '../../services/parentService';
import { Check, X, Loader2, BookOpen, User, Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

const ApplicationManager = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const parentId = localStorage.getItem('userId');
    const navigate = useNavigate();

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
                    {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-indigo-600" /></div> :
                        <div className="grid gap-4">
                            {sortedApps.map(app => (
                                <div key={app.id} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BookOpen /></div>
                                        <div>
                                            <h3 className="font-bold text-lg">{app.requestTitle}</h3>
                                            <div className="text-sm text-gray-500 flex gap-4"><p><User size={14} className="inline" /> {app.tutorName}</p><p><Clock size={14} className="inline" /> {app.message}</p></div>
                                        </div>
                                    </div>
                                    {app.status === 'PENDING' ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleAction(app.id, 'ACCEPTED')} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-bold"><Check size={16} /></button>
                                            <button onClick={() => handleAction(app.id, 'REJECTED')} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold"><X size={16} /></button>
                                        </div>
                                    ) : (
                                        <div className={`px-4 py-2 rounded-lg font-bold ${app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {app.status}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>}
                </main>
            </div>
        </div>
    );
};
export default ApplicationManager;