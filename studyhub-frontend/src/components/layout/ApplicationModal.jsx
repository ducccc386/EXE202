import React, { useState } from 'react';
import { applyForRequest } from '../../services/applicationService';
import { Send, X, AlertCircle } from 'lucide-react';

const ApplicationModal = ({ isOpen, onClose, requestId, tutorId }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset lỗi cũ

        // DEBUG Logs giữ nguyên như cũ
        console.log("DEBUG - TutorId nhận được:", tutorId);
        console.log("DEBUG - RequestId nhận được:", requestId);

        if (!tutorId || !requestId) {
            setError("Lỗi: Thiếu thông tin hồ sơ gia sư hoặc yêu cầu lớp học.");
            return;
        }

        setLoading(true);

        const payload = {
            tutorId: Number(tutorId),
            requestId: Number(requestId),
            message: message.trim()
        };

        try {
            const response = await applyForRequest(payload);
            alert(response || "Ứng tuyển thành công!");
            onClose();
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
            // Hiển thị lỗi thân thiện hơn thay vì alert hệ thống khó hiểu
            const errorMessage = err.response?.data || "Bạn đã ứng tuyển lớp này rồi hoặc có lỗi xảy ra!";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                        <Send className="w-5 h-5 text-blue-600" />
                        Gửi lời chào
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Thông báo lỗi (nếu có) */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <textarea
                    className="w-full border border-gray-200 rounded-2xl p-4 mb-6 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                    rows="4"
                    placeholder="Giới thiệu bản thân và kinh nghiệm của bạn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-all"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:bg-blue-300"
                    >
                        {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationModal;