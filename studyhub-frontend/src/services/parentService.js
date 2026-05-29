import axios from 'axios';

const API_BASE = "http://localhost:8080/api/applications";

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// Sửa lại hàm này để gọi API DTO
export const getParentApplications = (parentId) => {
    return axios.get(`${API_BASE}/parent/${parentId}/dto`, getAuthHeader());
};

export const updateApplicationStatus = (appId, status) => {
    return axios.put(`${API_BASE}/${appId}/status?status=${status}`, {}, getAuthHeader());
};