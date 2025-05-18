import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ClassesPage from '../pages/classes/ClassesPage';
import ClassFormPage from '../pages/classes/ClassFormPage';
import ClassDetailsPage from '../pages/classes/ClassDetailsPage';
import GradesPage from "../pages/grades/GradesPage";
import SchedulePage from "../pages/schedule/SchedulePage";
import SubjectDetailsPage from "../pages/subjects/SubjectDetailsPage";
import SubjectsPage from "../pages/subjects/SubjectsPage";
import UsersPage from "../pages/users/UsersPage";
import UserDetailsPage from "../pages/users/UserDetailsPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/classes"
                element={
                    <ProtectedRoute roles={['Administrator', 'Teacher' , 'Student']}>
                        <ClassesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/classes/new"
                element={
                    <ProtectedRoute>
                        <ClassFormPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/classes/edit/:id"
                element={
                    <ProtectedRoute>
                        <ClassFormPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/classes/:id"
                element={
                    <ProtectedRoute>
                        <ClassDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/subjects"
                element={
                    <ProtectedRoute roles={['Administrator', 'Teacher', 'Student']}>
                        <SubjectsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/subjects/:id"
                element={
                    <ProtectedRoute roles={['Administrator', 'Teacher', 'Student']}>
                        <SubjectDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/grades"
                element={
                    <ProtectedRoute roles={['Student', 'Parent', 'Administrator']}>
                        <GradesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/schedule"
                element={
                    <ProtectedRoute>
                        <SchedulePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <ProtectedRoute roles={['Administrator']}>
                        <UsersPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users/:id"
                element={
                    <ProtectedRoute roles={['Administrator']}>
                        <UserDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users/new"
                element={
                    <ProtectedRoute roles={['Administrator']}>
                        <UserDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default AppRoutes;