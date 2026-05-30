import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, History, BookOpenText } from 'lucide-react';

const Sidebar = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = role === 'TUTOR' ? [
        { label: 'Lịch sử ứng tuyển', path: '/tutor/history', icon: <History size={20} /> },
        { label: 'Chat của tôi', path: '/chat', icon: <MessageCircle size={20} /> }
    ] : [
        { label: 'Quản lý đơn', path: '/parent/applications', icon: <BookOpenText size={20} /> },
        { label: 'Chat của tôi', path: '/chat', icon: <MessageCircle size={20} /> }
    ];

    return (
        <aside className="w-64 flex-shrink-0">
            <nav className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 p-3 font-bold rounded-xl transition-all ${location.pathname === item.path
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;