import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DepartmentManager from '../../components/DepartmentManager';
import '../../styles/Dashboards.css';

const HODDashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard hod-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>HOD Dashboard</h1>
                    <p>Manage department details (Mission, Vision, PO, PEO, PSO)</p>
                </div>
                <div className="header-actions">
                    <span className="user-info">{user?.name || user?.username}</span>
                    <span className="department-info">{user?.department}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content" style={{ marginTop: '1rem' }}>
                <DepartmentManager />
            </div>
        </div>
    );
};

export default HODDashboard;
