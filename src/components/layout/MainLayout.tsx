import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="layout-container">
                <Sidebar />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;