import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    // Nếu không có token HOẶC role không phải ADMIN, đá văng về trang chủ ngay lập tức
    if (!token || role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    // Nếu đúng là ADMIN, cho phép đi tiếp vào trang Dashboard
    return children;
};

export default AdminRoute;