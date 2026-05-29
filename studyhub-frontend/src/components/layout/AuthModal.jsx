import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/authService';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();

    const [isLoginView, setIsLoginView] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('PARENT');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (isLoginView) {
                // 1. XỬ LÝ ĐĂNG NHẬP
                const responseData = await loginUser({ email, password });
                console.log("DỮ LIỆU LOGIN NHẬN ĐƯỢC:", responseData);

                // LƯU THÔNG TIN VÀO BỘ NHỚ TRÌNH DUYỆT
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('userFullName', responseData.fullName);
                localStorage.setItem('userRole', responseData.role);

                // ĐÃ SỬA: Dùng responseData.userId thay vì biến userId không tồn tại
                if (responseData.userId) {
                    localStorage.setItem('userId', responseData.userId);
                }

                if (responseData.tutorProfileId) {
                    localStorage.setItem('tutorProfileId', responseData.tutorProfileId);
                }

                setSuccessMessage('Đăng nhập thành công!');

                setTimeout(() => {
                    onLoginSuccess(responseData);
                    onClose();

                    // Điều hướng admin
                    if (responseData.role === 'ADMIN') {
                        navigate('/admin');
                    }
                }, 1000);

            } else {
                // 2. XỬ LÝ ĐĂNG KÝ
                const msg = await registerUser({ email, password, fullName, phone, role });
                setSuccessMessage(msg);
                setTimeout(() => {
                    setIsLoginView(true);
                    setSuccessMessage('');
                }, 1500);
            }
        } catch (err) {
            setErrorMessage(err.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl relative border border-gray-100 mx-4">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-indigo-900">
                        {isLoginView ? 'Chào mừng trở lại!' : 'Tạo tài khoản StudyHub'}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {isLoginView ? 'Đăng nhập để tiếp tục học tập cùng gia sư' : 'Kết nối với các gia sư uy tín hàng đầu'}
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-100">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 text-green-600 text-xs font-semibold rounded-lg border border-green-100">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                        <>
                            <div className="relative">
                                <User className="w-4 h-4 text-gray-400 absolute top-3.5 left-3.5" />
                                <input type="text" placeholder="Họ và tên" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium" />
                            </div>
                            <div className="relative">
                                <Phone className="w-4 h-4 text-gray-400 absolute top-3.5 left-3.5" />
                                <input type="tel" placeholder="Số điện thoại" required value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium" />
                            </div>
                            <div className="flex gap-4 p-1 bg-gray-100 rounded-xl text-xs font-bold">
                                <button type="button" onClick={() => setRole('PARENT')}
                                    className={`flex-1 py-2 rounded-lg transition-all ${role === 'PARENT' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>
                                    Phụ Huynh
                                </button>
                                <button type="button" onClick={() => setRole('TUTOR')}
                                    className={`flex-1 py-2 rounded-lg transition-all ${role === 'TUTOR' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'}`}>
                                    Gia Sư
                                </button>
                            </div>
                        </>
                    )}

                    <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute top-3.5 left-3.5" />
                        <input type="email" placeholder="Địa chỉ Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium" />
                    </div>

                    <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute top-3.5 left-3.5" />
                        <input type="password" placeholder="Mật khẩu" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium" />
                    </div>

                    <button type="submit" className={`w-full py-3 text-white font-extrabold rounded-xl shadow-md transition-all text-sm ${isLoginView ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'}`}>
                        {isLoginView ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản'}
                    </button>
                </form>

                <div className="text-center mt-6 text-xs font-semibold text-gray-500">
                    {isLoginView ? (
                        <p>Chưa có tài khoản? <span onClick={() => setIsLoginView(false)} className="text-orange-500 cursor-pointer hover:underline">Đăng ký ngay</span></p>
                    ) : (
                        <p>Đã có tài khoản? <span onClick={() => setIsLoginView(true)} className="text-blue-600 cursor-pointer hover:underline">Đăng nhập tại đây</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;