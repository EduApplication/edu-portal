import React, {JSX} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
    roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    roles = []
    }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length > 0 && user && !roles.includes(user.roleName)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;