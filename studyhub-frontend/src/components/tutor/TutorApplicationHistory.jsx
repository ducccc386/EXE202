import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
// Sửa thành đường dẫn thoát ra thư mục cha rồi vào layout
import Sidebar from '../layout/Sidebar';
import { Loader2, BookOpen, Clock, MessageCircle } from 'lucide-react';
// Thêm dòng này vào đầu file
import api from '../../services/api';
const TutorApplicationHistory = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoToChat = async (appId) => {
        try {
            const res = await fetch(`/api/conversations/by-application/${appId}`);
            if (res.ok) {
                const data = await res.json();
                navigate(`/chat/${data.id}`);
            } else { alert("Phòng chat chưa được tạo!"); }
        } catch (err) { console.error("Lỗi:", err); }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                // 2. Gọi qua instance 'api' đã cấu hình sẵn baseURL và Token
                const res = await api.get('/tutor/applications/my-applications');
                setHistory(res.data);
            } catch (err) {
                console.error("Lỗi:", err);
            }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, []);

    const sortedHistory = [...history].sort((a, b) => {
        if (a.status === 'ACCEPTED' && b.status !== 'ACCEPTED') return -1;
        if (a.status !== 'ACCEPTED' && b.status === 'ACCEPTED') return 1;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} onOpenPostRequest={onOpenPostRequest} />
            <div className="max-w-6xl mx-auto flex gap-6 p-8">
                <Sidebar role="TUTOR" />
                <main className="flex-1">
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-indigo-900">Lịch sử ứng tuyển</h1>
                    </header>
                    {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-indigo-500" /></div> :
                        <div className="grid gap-4">
                            {sortedHistory.map(app => (
                                <div key={app.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BookOpen size={24} /></div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{app.requestTitle}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400"><Clock size={14} /> <span>Vừa cập nhật gần đây</span></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {app.status === 'ACCEPTED' && <button onClick={() => handleGoToChat(app.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"><MessageCircle size={16} /> Chat</button>}
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{app.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </main>
            </div>
        </div>
    );
};
export default TutorApplicationHistory;