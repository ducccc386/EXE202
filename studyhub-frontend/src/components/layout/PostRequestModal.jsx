import React, { useState } from 'react';

const PostRequestModal = ({ isOpen, onClose, onSubmitSuccess }) => {
    // 1. Khởi tạo trạng thái lưu trữ dữ liệu Form (Khớp các thuộc tính với DTO Backend)
    const [formData, setFormData] = useState({
        subject: '',
        grade: '',
        price: '',
        slotsPerWeek: '',
        teachingMode: 'ONLINE', // Mặc định ban đầu hệ thống chọn ONLINE
        description: '',
        city: '',
        addressDetail: '',
        scheduleInfo: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    // Hàm xử lý cập nhật trạng thái khi người dùng gõ phím vào các ô Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý sự kiện bấm nút "Xác nhận đăng" gửi dữ liệu sang Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Đóng gói và chuẩn hóa dữ liệu JSON trước khi gửi sang API
        const submitData = {
            subject: formData.subject,
            grade: formData.grade,
            price: formData.price ? parseInt(formData.price) : null,
            slotsPerWeek: formData.slotsPerWeek ? parseInt(formData.slotsPerWeek) : null,
            teachingMode: formData.teachingMode,
            description: formData.description,

            // Xử lý tự động điền dữ liệu nếu phụ huynh chọn hình thức học ONLINE
            city: formData.teachingMode === 'ONLINE' ? 'ONLINE' : formData.city,
            addressDetail: formData.teachingMode === 'ONLINE' ? 'Học trực tuyến qua mạng' : formData.addressDetail,
            scheduleInfo: formData.scheduleInfo || 'Lịch học linh hoạt'
        };

        try {
            // 🔥 BƯỚC THẦN THÁNH: Lấy Token bảo mật từ localStorage mà bạn đã lưu lúc Đăng nhập
            // Nếu lúc đăng nhập bạn lưu tên key là 'accessToken' thì hãy đổi 'token' thành 'accessToken' nhé!
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/api/requests/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 🔥 ĐÃ THÊM: Đính kèm chìa khóa Token vào Header để dập dịch lỗi 403 Forbidden
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                alert('Đăng tin tìm gia sư thành công!');
                if (onSubmitSuccess) onSubmitSuccess();
                onClose(); // Đóng Modal và xóa trắng dữ liệu
            } else if (response.status === 403) {
                setError('Lỗi 403: Tài khoản của bạn không có quyền đăng tin (Yêu cầu tài khoản Phụ huynh) hoặc Token đã hết hạn!');
            } else {
                const errMsg = await response.text();
                setError(errMsg || 'Đăng tin thất bại, vui lòng kiểm tra lại dữ liệu.');
            }
        } catch (err) {
            setError('Lỗi kết nối: Không thể gửi yêu cầu xác thực đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn">

                {/* Tiêu đề góc Modal */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Đăng Tin Tìm Gia Sư</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                {/* Khối hiển thị thông báo lỗi bảo mật hoặc dữ liệu */}
                {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Hàng 1: Môn học & Khối lớp */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Môn học</label>
                            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Ví dụ: Toán, Lý, Hoá..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Lớp học</label>
                            <input required type="text" name="grade" value={formData.grade} onChange={handleChange} placeholder="Ví dụ: Lớp 12, Ôn thi Đại Học..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>

                    {/* Hàng 2: Học phí đề xuất & Số buổi trong tuần */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Học phí đề xuất (VNĐ)</label>
                            <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Ví dụ: 250000" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Số buổi / tuần</label>
                            <input required type="number" name="slotsPerWeek" value={formData.slotsPerWeek} onChange={handleChange} placeholder="Ví dụ: 2" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>

                    {/* Hàng 3: Hình thức học (Online / Offline) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Hình thức học</label>
                        <select name="teachingMode" value={formData.teachingMode} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                            <option value="ONLINE">Học trực tuyến (Online)</option>
                            <option value="OFFLINE">Gặp trực tiếp tại nhà (Offline)</option>
                        </select>
                    </div>

                    {/* 🔥 HIỆU ỨNG THÔNG MINH: Chỉ render khối nhập địa chỉ khi Phụ huynh chọn học OFFLINE */}
                    {formData.teachingMode === 'OFFLINE' && (
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300 transition-all duration-300">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Tỉnh / Thành phố</label>
                                <input required={formData.teachingMode === 'OFFLINE'} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ví dụ: Hà Nội..." className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ chi tiết</label>
                                <input required={formData.teachingMode === 'OFFLINE'} type="text" name="addressDetail" value={formData.addressDetail} onChange={handleChange} placeholder="Số nhà, tên ngõ đường..." className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    )}

                    {/* Hàng 4: Nhập lịch trình mong muốn */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Thời gian có thể học (Lịch học)</label>
                        <input type="text" name="scheduleInfo" value={formData.scheduleInfo} onChange={handleChange} placeholder="Ví dụ: Tối thứ 3 và tối thứ 5, từ 19h30..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>

                    {/* Hàng 5: Ghi chú mô tả yêu cầu thêm */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả chi tiết yêu cầu khác</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Yêu cầu cụ thể về gia sư: Ưu tiên sinh viên năm mấy, kỹ năng ôn thi..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                    </div>

                    {/* Khu vực cụm nút hành động cuối Form */}
                    <div className="flex justify-end space-x-3 border-t pt-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-all">Hủy</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 font-medium transition-all shadow-sm">
                            {loading ? 'Đang xử lý gửi...' : 'Xác nhận đăng'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostRequestModal;