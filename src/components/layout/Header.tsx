import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-logo">EduPortal</div>
            {isAuthenticated && (
                <div className="header-user">
                    <div className="user-info">
                        {user?.firstName} {user?.lastName} ({user?.roleName})
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;