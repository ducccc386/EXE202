import axios from 'axios'; // Đảm bảo đã import axios

const API_BASE = "http://localhost:8080/api/applications";
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// THÊM TỪ KHÓA 'export' VÀO ĐÂY
export const getTutorsForHomepage = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/tutors/homepage");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

// THÊM TỪ KHÓA 'export' VÀO ĐÂY
export const getTutorApplications = (tutorId) => {
    return axios.get(`${API_BASE}/tutor/${tutorId}/dto`, getAuthHeader());
};