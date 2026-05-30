import api from './api';

export const applyForRequest = async (applicationData) => {
    const response = await api.post('/applications/apply', applicationData);
    return response.data;
};

export const getParentApplications = (parentId) => {
    return api.get(`/applications/parent/${parentId}/dto`);
};

export const updateApplicationStatus = (appId, status) => {
    return api.put(`/applications/${appId}/status?status=${status}`, {});
};

export const getTutorApplications = (tutorId) => {
    return api.get(`/applications/tutor/${tutorId}/dto`);
};