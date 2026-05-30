import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, User, Loader2 } from 'lucide-react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';

const API_BASE_URL = 'http://localhost:8080';

const ChatPage = ({ user, onLogout }) => {
    const { conversationId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const stompClient = useRef(null);
    const messagesEndRef = useRef(null);
    // Lấy token trực tiếp từ localStorage mỗi khi cần
    const getToken = () => localStorage.getItem('token');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    // 1. Tự động chuyển hướng vào phòng chat đầu tiên nếu chưa có ID
    useEffect(() => {
        if (!conversationId) {
            const token = getToken();
            if (!token) return;

            fetch(`${API_BASE_URL}/api/conversations/my-list`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.ok ? res.json() : Promise.reject())
                .then(data => {
                    if (data && data.length > 0) navigate(`/chat/${data[0].id}`);
                })
                .catch(err => console.error("Lỗi lấy danh sách phòng:", err));
        }
    }, [conversationId, navigate]);

    // 2. Load lịch sử tin nhắn
    useEffect(() => {
        if (!conversationId) return;
        const token = getToken();
        setLoading(true);
        fetch(`${API_BASE_URL}/api/messages/${conversationId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => { setMessages(data); setLoading(false); })
            .catch(err => { console.error("Lỗi load tin:", err); setLoading(false); });
    }, [conversationId]);

    // 3. Thiết lập WebSocket
    useEffect(() => {
        if (!conversationId) return;

        const socket = new SockJS(`${API_BASE_URL}/ws`);
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/topic/messages/${conversationId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]);
            });
        }, (error) => console.error("Lỗi WebSocket:", error));

        return () => {
            if (stompClient.current?.connected) stompClient.current.disconnect();
        };
    }, [conversationId]);

    // 4. Gửi tin nhắn
    const handleSend = () => {
        if (!input.trim() || !conversationId) return;

        const newMessage = {
            conversationId: parseInt(conversationId),
            content: input,
            senderId: user?.userId || 4,
            timestamp: new Date().toISOString()
        };

        if (stompClient.current?.connected) {
            stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(newMessage));
            setInput('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar user={user} onLogout={onLogout} />
            <div className="max-w-7xl mx-auto flex gap-6 p-8 w-full flex-1">
                <Sidebar role={user?.role} />
                <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-[calc(100vh-140px)] relative z-10">
                    <div className="p-4 border-b flex items-center gap-3 bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                            <User size={20} />
                        </div>
                        <h2 className="font-bold text-lg">Phòng Chat {conversationId}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {loading ? <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div> : (
                            <>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.senderId == (user?.userId || 4) ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-2xl ${msg.senderId == (user?.userId || 4) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    <div className="p-4 border-t flex gap-2 bg-white">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 border rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-all">
                            <Send size={20} />
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChatPage;