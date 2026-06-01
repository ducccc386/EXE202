import React from 'react';
import { Star, GraduationCap, Briefcase, MapPin, Monitor } from 'lucide-react';

const TutorCard = ({ tutor, onViewDetail }) => {
    // Hàm định dạng tiền tệ VND (Ví dụ: 200000 -> 200.000 ₫)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between p-5 w-full">
            <div>
                {/* 1. Header: Avatar + Tên + Badge */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden shrink-0">
                        {tutor.avatarUrl ? (
                            <img src={tutor.avatarUrl} alt={tutor.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold text-indigo-600">
                                {tutor.fullName?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    {/* Khu vực hiển thị tên và rating - Đã sửa lỗi "dón" chữ và xuống dòng */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-gray-800 text-lg leading-tight break-words min-h-[3.5rem]">
                                {tutor.fullName}
                            </h3>
                            <span className="w-fit bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                                Đã duyệt
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 text-sm mt-2">
                            <Star className="w-4 h-4 fill-amber-500" />
                            <span className="font-semibold text-gray-700">{tutor.averageRating || 0}</span>
                            <span className="text-gray-400 text-xs">({tutor.totalReviews || 0} đánh giá)</span>
                        </div>
                    </div>
                </div>

                {/* 2. Thông tin chi tiết */}
                <div className="space-y-2.5 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="truncate" title={tutor.education}><strong>Học vấn:</strong> {tutor.education}</span>
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

                {/* 3. Tags Môn học */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tutor.subjects?.map((sub, index) => (
                        <span key={index} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-lg font-medium">
                            {sub}
                        </span>
                    ))}
                </div>
            </div>

            {/* 4. Học phí & Nút bấm - ĐÃ CHUYỂN THÀNH BUTTON ĐỂ MỞ MODAL */}
            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-2">
                <div className="min-w-0">
                    <span className="text-[10px] text-gray-400 uppercase block">Học phí/ca</span>
                    <span className="text-sm font-extrabold text-emerald-600 truncate block">
                        {formatPrice(tutor.hourlyRate)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();  // Ngăn chặn hành động mặc định
                        e.stopPropagation(); // Ngăn chặn sự kiện lan ra các thẻ cha (nếu có Link bọc ngoài)
                        onViewDetail();      // Gọi hàm mở Modal từ TutorList truyền xuống
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition shrink-0 active:scale-95"
                >
                    Xem hồ sơ
                </button>
            </div>
        </div>
    );
};

export default TutorCard;