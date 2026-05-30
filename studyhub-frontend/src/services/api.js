import axios from 'axios';

// 1. Xác định baseURL trước khi tạo instance
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://exe202-k4ik.onrender.com/api';

// 2. Debug để kiểm tra giá trị (đặt ngoài object axios)
console.log("DEBUG - API Base URL đang sử dụng là:", baseURL);
console.log("DEBUG - Giá trị biến môi trường thô:", import.meta.env.VITE_API_BASE_URL);

// 3. Tạo instance axios
const api = axios.create({
    baseURL: baseURL, // Sử dụng biến baseURL đã khai báo ở trên
    headers: {
        'Content-Type': 'application/json',
    },
});

// 4. CẤU HÌNH PHÂN QUYỀN: Tự động đính JWT Token vào mọi request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;