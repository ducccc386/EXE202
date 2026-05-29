import React from 'react';
import { Star, GraduationCap, Briefcase, MapPin, Monitor } from 'lucide-react';

const TutorCard = ({ tutor }) => {
    // Hàm định dạng tiền tệ VND (Ví dụ: 200000 -> 200.000 ₫)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between p-5">
            <div>
                {/* Header: Avatar + Tên + Badge */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden shrink-0">
                        {tutor.avatarUrl ? (
                            <img src={tutor.avatarUrl} alt={tutor.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-indigo-600">
                                {tutor.fullName?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800 text-lg">{tutor.fullName}</h3>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium shrink-0">Đã duyệt</span>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-amber-500 text-sm mt-1">
                            <Star className="w-4 h-4 fill-amber-500" />
                            <span className="font-semibold text-gray-700">{tutor.averageRating}</span>
                            <span className="text-gray-400">({tutor.totalReviews} đánh giá)</span>
                        </div>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="truncate"><strong>Học vấn:</strong> {tutor.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span><strong>Kinh nghiệm:</strong> {tutor.experienceYears} năm</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span><strong>Khu vực:</strong> {tutor.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span><strong>Hình thức:</strong> {tutor.teachingMode === 'BOTH' ? 'Online & Offline' : tutor.teachingMode}</span>
                    </div>
                </div>

                {/* Tags Môn học */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tutor.subjects?.map((sub, index) => (
                        <span key={index} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-lg font-medium">
                            {sub}
                        </span>
                    ))}
                </div>
            </div>

            {/* Học phí & Nút bấm */}
            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                <div>
                    <span className="text-xs text-gray-400 block">Học phí/Giờ</span>
                    <span className="text-lg font-extrabold text-emerald-600">{formatPrice(tutor.hourlyRate)}</span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
                    Xem hồ sơ
                </button>
            </div>
        </div>
    );
};

export default TutorCard;