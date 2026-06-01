import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { getTutorsForHomepage } from '../services/tutorService';

const TutorDetail = () => {
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || id === 'undefined') {
            setError("ID gia sư không hợp lệ.");
            setLoading(false);
            return;
        }

        setLoading(true);
        // Gọi API chi tiết theo path mới để tránh các rule chặn route động cũ
        api.get(`/tutors/detail/${id}`)
            .then(res => {
                setTutor(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("DEBUG - Lỗi gọi API:", err);
                const status = err?.response?.status;

                if (status === 403) {
                    getTutorsForHomepage()
                        .then(list => {
                            const fallbackTutor = list.find(item => String(item.tutorProfileId) === String(id));
                            if (fallbackTutor) {
                                setTutor({
                                    ...fallbackTutor,
                                    bio: 'Không tải được dữ liệu chi tiết từ endpoint gốc. Đang hiển thị thông tin tóm tắt.',
                                });
                                setError(null);
                            } else {
                                setError("Không thể tải thông tin gia sư. API đang trả về 403 Forbidden từ backend/hạ tầng.");
                            }
                        })
                        .catch(() => setError("Không thể tải thông tin gia sư. API đang trả về 403 Forbidden từ backend/hạ tầng."));
                } else if (status === 404) {
                    setError("Không tìm thấy gia sư được yêu cầu.");
                } else if (status) {
                    setError(`Không thể tải thông tin gia sư. Mã lỗi ${status}.`);
                } else {
                    setError("Không thể tải thông tin gia sư. Không nhận được phản hồi từ máy chủ.");
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-5"><h3>Đang tải dữ liệu...</h3></div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary mb-3">Quay lại trang chủ</Link>
            <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img
                            src={tutor?.avatarUrl || '/default-avatar.png'}
                            alt="Avatar"
                            className="rounded-circle img-fluid"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <h2 className="mt-3">{tutor?.fullName}</h2>
                    </div>
                    <div className="col-md-8">
                        <h3>Giới thiệu</h3>
                        <p>{tutor?.bio || 'Chưa có thông tin giới thiệu.'}</p>
                        <div className="mt-3">
                            <strong>Phương pháp dạy:</strong> <span>{tutor?.teachingMethod || 'Chưa cung cấp'}</span>
                        </div>
                        <div className="mt-2">
                            <strong>Môn học:</strong> <span>{tutor?.subjects ? Array.from(tutor.subjects).join(', ') : 'Chưa rõ'}</span>
                        </div>
                        <div className="mt-2">
                            <strong>Chứng chỉ:</strong>
                            {tutor?.certificateNames && tutor.certificateNames.length > 0 ? (
                                <ul className="list-disc ml-5">
                                    {tutor.certificateNames.map((c, idx) => (
                                        <li key={idx}>{c}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span> Chưa cung cấp</span>
                            )}
                        </div>
                        <div className="mt-3">
                            {tutor?.verified ? (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded">Đã xác thực</span>
                            ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">Chưa xác thực</span>
                            )}
                        </div>
                        <div className="d-flex gap-4 mt-3">
                            <div><strong>Học phí:</strong> {tutor?.hourlyRate}k/h</div>
                            <div><strong>Kinh nghiệm:</strong> {tutor?.experienceYears} năm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetail;