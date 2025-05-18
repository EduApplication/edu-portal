import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <MainLayout>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <h2 className="dashboard-welcome">
                    Welcome back, {user?.firstName} {user?.lastName}!
                </h2>
            </div>

            <div className="dashboard-grid">
                <Card title="Recent Activity" className="dashboard-card">
                    <p className="dashboard-card-text">
                        No recent activity to display.
                    </p>
                </Card>

                <Card title="Upcoming Assignments" className="dashboard-card">
                    <p className="dashboard-card-text">
                        No upcoming assignments.
                    </p>
                </Card>

                <Card title="Quick Statistics" className="dashboard-card">
                    <p className="dashboard-card-text">
                        Statistics will be displayed here.
                    </p>
                </Card>
            </div>
        </MainLayout>
    );
};

export default DashboardPage;