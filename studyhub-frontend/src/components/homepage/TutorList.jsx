import React, { useEffect, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import TutorCard from '../TutorCard';
import TutorDetailModal from './TutorDetailModal';
import { getTutorsForHomepage } from '../../services/tutorService';

// Lọc danh sách gia sư theo bộ lọc được chọn
const applyFilters = (tutors, filters) => {
    if (!filters || (filters.experience.length === 0 && filters.price.length === 0)) {
        return tutors;
    }

    return tutors.filter(tutor => {
        const exp = tutor.experienceYears ?? 0;
        const rate = tutor.hourlyRate ?? 0;

        const expMatch = filters.experience.length === 0 || filters.experience.some(range => {
            if (range === '0-1') return exp >= 0 && exp < 1;
            if (range === '1-3') return exp >= 1 && exp < 3;
            if (range === '3-5') return exp >= 3 && exp < 5;
            if (range === '5+') return exp >= 5;
            return false;
        });

        const priceMatch = filters.price.length === 0 || filters.price.some(range => {
            if (range === '<100') return rate < 100;
            if (range === '100-200') return rate >= 100 && rate < 200;
            if (range === '200-300') return rate >= 200 && rate < 300;
            if (range === '300+') return rate >= 300;
            return false;
        });

        return expMatch && priceMatch;
    });
};

const TutorList = forwardRef(({ isHomePage = true, filters = null }, ref) => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTutorId, setSelectedTutorId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getTutorsForHomepage()
            .then(data => { setTutors(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleOpenDetail = (id) => {
        setSelectedTutorId(id);
        setShowModal(true);
    };

    const isFiltered = filters && (filters.experience.length > 0 || filters.price.length > 0);

    // Áp dụng filter hoặc cắt 4 card nếu đang ở homepage và chưa lọc
    const filteredTutors = isFiltered ? applyFilters(tutors, filters) : tutors;
    const displayList = isHomePage && !isFiltered ? filteredTutors.slice(0, 4) : filteredTutors;

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Gia sư nổi bật</h3>
                    <p className="text-sm text-gray-400 mt-1">Hồ sơ đã qua kiểm định học lực nghiêm ngặt</p>
                </div>

                {/* Badge số kết quả khi đang lọc */}
                {isFiltered && (
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {filteredTutors.length} kết quả
                    </span>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
            ) : displayList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayList.map((tutor) => (
                        <TutorCard
                            key={tutor.tutorProfileId}
                            tutor={tutor}
                            onViewDetail={() => handleOpenDetail(tutor.tutorProfileId)}
                        />
                    ))}
                </div>
            ) : (
                /* Không có kết quả */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-semibold text-lg">Không tìm thấy gia sư phù hợp</p>
                    <p className="text-gray-400 text-sm mt-1">Thử điều chỉnh bộ lọc để xem thêm kết quả</p>
                </div>
            )}

            {isHomePage && !isFiltered && tutors.length > 4 && (
                <div className="text-center mt-12">
                    <Link
                        to="/all-tutors"
                        className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition"
                    >
                        Xem tất cả gia sư
                    </Link>
                </div>
            )}

            <TutorDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                tutorId={selectedTutorId}
            />
        </section>
    );
});

TutorList.displayName = 'TutorList';
export default TutorList;