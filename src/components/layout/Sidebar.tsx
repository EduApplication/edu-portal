import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = user?.roleName === 'Administrator';
    const isTeacher = user?.roleName === 'Teacher' || isAdmin;
    const isStudent = user?.roleName === 'Student' || isAdmin;

    const menuItems = [
        { text: 'Dashboard', path: '/dashboard', roles: ['Administrator', 'Teacher', 'Student', 'Parent'] },
        { text: 'Classes', path: '/classes', roles: ['Administrator', 'Teacher', 'Student'] },
        { text: 'Grades', path: '/grades', roles: ['Administrator', 'Student', 'Parent'] },
        { text: 'Subjects', path: '/subjects', roles: ['Administrator', 'Teacher', 'Student'] },
        { text: 'Schedule', path: '/schedule', roles: ['Administrator', 'Teacher', 'Student', 'Parent'] },
        { text: 'Users', path: '/users', roles: ['Administrator'] },
    ];

    const filteredItems = menuItems.filter(item =>
        user && item.roles.includes(user.roleName)
    );

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {filteredItems.map((item) => (
                        <li key={item.text} className="sidebar-menu-item">
                            <a
                                href={item.path}
                                className={`sidebar-menu-link ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(item.path);
                                }}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;