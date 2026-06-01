import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApplicationModal from '../layout/ApplicationModal';
import api from '../../services/api';

const RequestList = ({ isHomePage = true }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State cho Modal và User Role
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Gọi API đúng 1 lần duy nhất
                const response = await api.get('/requests/homepage');

                console.log("DEBUG - Dữ liệu nhận được từ Backend:", response.data);

                // Cập nhật state
                setRequests(response.data);
            } catch (err) {
                console.error("DEBUG - Lỗi gọi API:", err);
                setError('Lỗi kết nối đến máy chủ.');
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    // Hàm xử lý logic bấm nút Nhận Lớp
    const handleApplyClick = (item) => {
        if (!userRole) {
            alert("Bạn cần đăng nhập để ứng tuyển lớp học này!");
            return;
        }
        if (userRole !== 'TUTOR') {
            alert("Chỉ tài khoản Gia sư mới có quyền nhận lớp. Vui lòng đăng ký tài khoản Gia sư!");
            return;
        }
        setSelectedRequest(item);
    };

    if (loading) return <div className="text-center py-10">⏳ Đang tải danh sách lớp học...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    const displayList = isHomePage ? requests.slice(0, 6) : requests;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayList.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">Môn: {item.subjectName} | Lớp: {item.grade}</p>
                        <p className="text-sm font-bold text-blue-600 my-1">Học phí: {item.budget?.toLocaleString()} VNĐ/tháng</p>
                        <p className="text-xs text-gray-500 italic mt-2 line-clamp-2">"{item.description}"</p>

                        {/* Nút Nhận Lớp */}
                        <button
                            onClick={() => handleApplyClick(item)}
                            className={`w-full mt-4 py-2 rounded-lg transition ${userRole === 'TUTOR'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            {userRole === 'TUTOR' ? 'Nhận Lớp' : 'Đăng nhập để nhận lớp'}
                        </button>
                    </div>
                ))}
            </div>

            {selectedRequest && (
                <ApplicationModal
                    isOpen={!!selectedRequest}
                    requestId={selectedRequest.id}
                    tutorId={localStorage.getItem('tutorProfileId')}
                    onClose={() => setSelectedRequest(null)}
                />
            )}

            {isHomePage && requests.length > 6 && (
                <div className="text-center mt-10">
                    <Link to="/all-requests" className="inline-block border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition">
                        Xem tất cả lớp học
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RequestList;