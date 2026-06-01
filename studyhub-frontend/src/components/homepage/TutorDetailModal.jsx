import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

const TutorDetailModal = ({ show, onHide, tutorId }) => {
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && tutorId) {
            setLoading(true);
            setError(null);
            api.get(`/tutors/detail/${tutorId}`)
                .then(res => setTutor(res.data))
                .catch(async err => {
                    console.error("Lỗi:", err);
                    if (err?.response?.status === 403) {
                        try {
                            const fallback = await api.get('/tutors/homepage');
                            const fallbackTutor = fallback.data.find(item => String(item.tutorProfileId) === String(tutorId));
                            if (fallbackTutor) {
                                setTutor({ ...fallbackTutor, bio: 'Không tải được dữ liệu chi tiết từ endpoint gốc.' });
                            } else {
                                setTutor(null);
                                setError('Không thể tải thông tin gia sư. API đang trả về 403 Forbidden từ backend/hạ tầng.');
                            }
                        } catch (fallbackErr) {
                            console.error("Lỗi fallback:", fallbackErr);
                            setTutor(null);
                            setError('Không thể tải thông tin gia sư. API đang trả về 403 Forbidden từ backend/hạ tầng.');
                        }
                    } else if (err?.response?.status === 404) {
                        setTutor(null);
                        setError('Không tìm thấy gia sư được yêu cầu.');
                    } else {
                        setTutor(null);
                        setError('Không thể tải thông tin gia sư.');
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setTutor(null); // Reset dữ liệu khi đóng
            setLoading(false);
            setError(null);
        }
    }, [show, tutorId]);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hồ sơ gia sư</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {loading ? (
                    <div className="text-center py-10">Đang tải dữ liệu...</div>
                ) : error ? (
                    <div className="alert alert-danger mb-0">{error}</div>
                ) : tutor ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="text-center">
                            <img src={tutor.avatarUrl} className="w-32 h-32 rounded-full object-cover mb-3" alt="Avatar" />
                            <h5 className="font-bold">{tutor.fullName}</h5>
                        </div>
                        <div className="flex-grow">
                            <p><strong>Học vấn:</strong> {tutor.education}</p>
                            <p><strong>Kinh nghiệm:</strong> {tutor.experienceYears} năm</p>
                            <p><strong>Khu vực:</strong> {tutor.city}</p>
                            <p><strong>Giới thiệu:</strong> {tutor.bio}</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">Đang tải dữ liệu...</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary">Liên hệ ngay</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default TutorDetailModal;