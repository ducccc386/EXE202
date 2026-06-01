import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

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
        // Gọi API với ID từ URL
        api.get(`/tutors/${id}`)
            .then(res => {
                setTutor(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("DEBUG - Lỗi gọi API:", err);
                setError("Không thể tải thông tin gia sư. (Lỗi 403 có thể do cấu hình Security)");
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