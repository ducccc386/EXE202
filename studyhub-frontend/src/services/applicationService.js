import api from './api';

export const applyForRequest = async (applicationData) => {
    try {
        const response = await api.post('/applications/apply', applicationData);
        return response.data; // Trả về thông báo thành công
    } catch (error) {
        // Trả về lỗi chi tiết từ backend (ví dụ: "Bạn đã ứng tuyển lớp này rồi!")
        throw error.response?.data || "Có lỗi xảy ra khi gửi đơn ứng tuyển.";
    }
};