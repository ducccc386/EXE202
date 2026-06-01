import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const TutorDetailModal = ({ show, onHide, tutorId }) => {
    const [tutor, setTutor] = useState(null);

    useEffect(() => {
        if (show && tutorId) {
            axios.get(`https://exe202-k4ik.onrender.com/api/tutors/${tutorId}`)
                .then(res => setTutor(res.data))
                .catch(err => console.error("Lỗi:", err));
        } else {
            setTutor(null); // Reset dữ liệu khi đóng
        }
    }, [show, tutorId]);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hồ sơ gia sư</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {tutor ? (
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