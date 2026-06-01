import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../layout/Navbar';
import { Save, User, GraduationCap, MapPin, DollarSign, Clock, ArrowLeft } from 'lucide-react';

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Lấy thông tin user từ localStorage để truyền vào Navbar
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        bio: '',
        education: '',
        experienceYears: 0,
        teachingMethod: '',
        hourlyRate: 0,
        city: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/tutors/${id}`);
                setFormData({
                    bio: res.data.bio || '',
                    education: res.data.education || '',
                    experienceYears: res.data.experienceYears || 0,
                    teachingMethod: res.data.teachingMethod || '',
                    hourlyRate: res.data.hourlyRate || 0,
                    city: res.data.city || ''
                });
            } catch (err) {
                console.error("Lỗi khi load profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/tutors/profile/${id}`, formData);
            alert("Cập nhật hồ sơ thành công!");
            navigate(`/tutor/${id}`);
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    if (loading) return <div className="text-center py-20 text-indigo-600 font-bold">Đang tải hồ sơ...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar được giữ lại */}
            <Navbar
                user={user}
                onLogout={() => { localStorage.clear(); window.location.href = '/'; }}
            />

            <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-8 border border-gray-100">
                {/* Nút Quay lại & Tiêu đề */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
                        <User className="w-6 h-6" /> Chỉnh sửa hồ sơ gia sư
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Giới thiệu bản thân</label>
                        <textarea
                            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            rows="4"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Học vấn</label>
                        <div className="flex items-center border rounded-xl px-4 py-3">
                            <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                className="w-full outline-none"
                                value={formData.education}
                                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Năm kinh nghiệm</label>
                            <div className="flex items-center border rounded-xl px-4 py-3">
                                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="number"
                                    className="w-full outline-none"
                                    value={formData.experienceYears}
                                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Học phí (VND/h)</label>
                            <div className="flex items-center border rounded-xl px-4 py-3">
                                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="number"
                                    className="w-full outline-none"
                                    value={formData.hourlyRate}
                                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Khu vực sinh sống</label>
                        <div className="flex items-center border rounded-xl px-4 py-3">
                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                className="w-full outline-none"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" /> Lưu thay đổi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;