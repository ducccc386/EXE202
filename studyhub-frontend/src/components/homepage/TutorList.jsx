import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TutorCard from '../TutorCard';
import TutorDetailModal from './TutorDetailModal';
import { getTutorsForHomepage } from '../../services/tutorService';

const TutorList = ({ isHomePage = true }) => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    // State cho Modal
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

    const displayList = isHomePage ? tutors.slice(0, 4) : tutors;

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Gia sư nổi bật</h3>
                    <p className="text-sm text-gray-400 mt-1">Hồ sơ đã qua kiểm định học lực nghiêm ngặt</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayList.map((tutor) => (
                        <TutorCard
                            key={tutor.tutorProfileId}
                            tutor={tutor}
                            onViewDetail={() => handleOpenDetail(tutor.tutorProfileId)}
                        />
                    ))}
                </div>
            )}

            {isHomePage && tutors.length > 4 && (
                <div className="text-center mt-12">
                    <Link to="/all-tutors" className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition">
                        Xem tất cả gia sư
                    </Link>
                </div>
            )}

            {/* Modal nằm ở đây */}
            <TutorDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                tutorId={selectedTutorId}
            />
        </section>
    );
};
export default TutorList;