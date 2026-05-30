import api from './api';

export const getTutorsForHomepage = async () => {
    const response = await api.get("/tutors/homepage");
    return response.data;
};