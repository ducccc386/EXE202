import React from 'react';
import Navbar from '../components/layout/Navbar';
import TutorList from '../components/homepage/TutorList';

const AllTutors = ({ user, onLogout, onOpenAuth, onOpenPostRequest }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} onLogout={onLogout} onOpenAuth={onOpenAuth} onOpenPostRequest={onOpenPostRequest} />
            <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-black text-gray-900 text-center mb-12">Danh sách tất cả gia sư</h1>
                <TutorList isHomePage={false} />
            </div>
        </div>
    );
};
export default AllTutors;