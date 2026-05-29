import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Đường dẫn cổng Backend Spring Boot của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});
// CẤU HÌNH PHÂN QUYỀN: Tự động đính JWT Token vào mọi request gửi đi
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Đính token vào theo chuẩn Bearer mã hóa của Spring Security
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;