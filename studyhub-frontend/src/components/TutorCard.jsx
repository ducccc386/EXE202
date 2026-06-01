import React from 'react';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
    return (
        <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="overflow-hidden" style={{ height: '220px' }}>
                <img
                    src={tutor.avatarUrl || '/default-avatar.png'}
                    className="card-img-top"
                    alt={tutor.fullName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className="card-body p-4">
                <h5 className="card-title fw-bold">{tutor.fullName || 'Chưa có tên'}</h5>
                <p className="text-muted small">
                    {tutor.experienceYears || 0} năm kinh nghiệm | {tutor.hourlyRate || 0}k/h
                </p>

                {/* Sử dụng tutorProfileId chính xác từ API */}
                {tutor.tutorProfileId ? (
                    <Link to={`/tutor/${tutor.tutorProfileId}`} className="btn btn-primary w-100 mt-2">
                        Xem hồ sơ
                    </Link>
                ) : (
                    <button className="btn btn-secondary w-100 mt-2" disabled>
                        ID không tồn tại
                    </button>
                )}
            </div>
        </div>
    );
};

export default TutorCard;