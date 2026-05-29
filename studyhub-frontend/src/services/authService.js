import api from './api';

// 1. Gọi API Đăng ký
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data; // Trả về "Đăng ký tài khoản thành công!"
    } catch (error) {
        // Trả về thông báo lỗi từ Backend (ví dụ: "Email này đã được sử dụng!")
        throw error.response?.data || "Đăng ký thất bại, vui lòng thử lại!";
    }
};

// 2. Called API Đăng nhập
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data; // Trả về chuỗi fake-jwt-token...
    } catch (error) {
        throw error.response?.data || "Sai tài khoản hoặc mật khẩu!";
    }
};