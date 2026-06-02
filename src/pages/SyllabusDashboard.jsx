import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import HODDashboard from './dashboards/HODDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import "../styles/Dashboards.css";

const SyllabusDashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="dashboard-error">
                <p>Please log in to access the dashboard</p>
            </div>
        );
    }

    // Route to appropriate dashboard based on role
    switch (user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'hod':
            return <HODDashboard />;
        case 'staff':
            return <StaffDashboard />;
        case 'student':
            return <StudentDashboard />;
        default:
            return (
                <div className="dashboard-error">
                    <p>Unknown user role: {user.role}</p>
                </div>
            );
    }
};

export default SyllabusDashboard;
