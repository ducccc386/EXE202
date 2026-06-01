import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TutorDetail = () => {
    const { id } = useParams(); // Lấy id từ URL /tutor/:id
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API của bạn
        axios.get(`https://exe202-k4ik.onrender.com/api/tutors/${id}`)
            .then(res => {
                setTutor(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy thông tin gia sư: ", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-5">Đang tải thông tin...</div>;
    if (!tutor) return <div className="text-center mt-5">Không tìm thấy gia sư!</div>;

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={tutor.avatarUrl || '/default-avatar.png'} alt="Avatar" className="rounded-circle img-fluid" style={{ width: '200px' }} />
                        <h2 className="mt-3">{tutor.fullName}</h2>
                        <span className="badge bg-success">{tutor.verified ? 'Đã xác thực' : 'Chưa xác thực'}</span>
                    </div>
                    <div className="col-md-8">
                        <h3>Giới thiệu</h3>
                        <p>{tutor.bio || 'Chưa có thông tin giới thiệu.'}</p>

                        <div className="row">
                            <div className="col-6"><strong>Học phí:</strong> {tutor.hourlyRate}k/h</div>
                            <div className="col-6"><strong>Kinh nghiệm:</strong> {tutor.experienceYears} năm</div>
                        </div>

                        <h4 className="mt-4">Chứng chỉ</h4>
                        {tutor.certificateNames && tutor.certificateNames.length > 0 ? (
                            <ul>
                                {tutor.certificateNames.map((cert, index) => <li key={index}>{cert}</li>)}
                            </ul>
                        ) : (
                            <p>Gia sư hiện chưa cập nhật chứng chỉ, phải cập nhật ngay.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetail;