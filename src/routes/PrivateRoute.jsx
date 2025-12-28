// src/routes/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../components/shared/LoadingSpinner';
=======
import { AuthContext } from '../context/AuthProvider'; 
import LoadingSpinner from '../components/common/LoadingSpinner'; 
>>>>>>> 48c6cf7e6148c6958f8a42f4a24ecf893740b216

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return children;
    }
<<<<<<< HEAD
=======

>>>>>>> 48c6cf7e6148c6958f8a42f4a24ecf893740b216
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;