import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../api';
import '../../styles/Dashboards.css';
import { departments as staticDepartments } from '../../data/departmentsData';
import { SYLLABUS_DATA, GENERIC_FIRST_YEAR } from '../../data/syllabusData';
import { FaUsers, FaUserCheck, FaUserTimes, FaFilePdf, FaUpload, FaTrash, FaEye, FaBookOpen } from 'react-icons/fa';
import DepartmentManager from '../../components/DepartmentManager';

const AdminDashboard = () => {
    const { user, logout, token } = useAuth();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // User Creation States
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createUserData, setCreateUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student',
        name: '',
        phone: '',
        department: '',
        employeeId: '',
        studentId: ''
    });
    const [createLoading, setCreateLoading] = useState(false);

    // Department Management States
    const [departmentsList, setDepartmentsList] = useState([]);
    const [deptLoading, setDeptLoading] = useState(false);
    const [selectedDeptSlug, setSelectedDeptSlug] = useState("");
    const [selectedDept, setSelectedDept] = useState(null);
    const [subTab, setSubTab] = useState("vision"); // 'vision', 'mission', 'po', 'peo', 'pso'

    // Form editing states
    const [visionText, setVisionText] = useState("");
    const [newPointText, setNewPointText] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingText, setEditingText] = useState("");

    // Fetch all departments from database
    const fetchDepartments = async () => {
        setDeptLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/departments`);
            if (!response.ok) throw new Error('Failed to fetch departments');
            const data = await response.json();
            setDepartmentsList(data);
            
            // Set initial selected department
            if (data.length > 0) {
                const current = selectedDeptSlug 
                    ? data.find(d => d.slug === selectedDeptSlug) 
                    : data[0];
                const activeDept = current || data[0];
                setSelectedDeptSlug(activeDept.slug);
                setSelectedDept(activeDept);
                setVisionText(activeDept.vision || "");
            }
        } catch (err) {
            console.error("Error fetching departments:", err);
            setError("Failed to load departments from database.");
        } finally {
            setDeptLoading(false);
        }
    };

    // Load departments when tab changes
    useEffect(() => {
        if (activeTab === 'syllabus') {
            fetchDepartments();
        }
    }, [activeTab]);

    // Handle department selector change
    const handleDeptChange = (slug) => {
        setSelectedDeptSlug(slug);
        const dept = departmentsList.find(d => d.slug === slug);
        if (dept) {
            setSelectedDept(dept);
            setVisionText(dept.vision || "");
            setEditingIndex(-1);
            setEditingText("");
            setNewPointText("");
        }
    };

    // Save general department changes (Vision or Points array)
    const saveDepartmentField = async (fieldName, updatedValue) => {
        if (!selectedDept) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/departments/${selectedDept._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ [fieldName]: updatedValue })
            });

            if (!response.ok) throw new Error('Failed to update department');
            
            const updatedDept = await response.json();
            
            // Update local state
            setSelectedDept(updatedDept);
            setDepartmentsList(prev => prev.map(d => d._id === updatedDept._id ? updatedDept : d));
            setSuccessMessage("Department details updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Failed to update department: " + err.message);
            setTimeout(() => setError(""), 4000);
        }
    };

    // Add point to array fields (mission, po, peo, pso)
    const handleAddPoint = (e) => {
        e.preventDefault();
        if (!newPointText.trim() || !selectedDept) return;

        const currentPoints = Array.isArray(selectedDept[subTab]) ? [...selectedDept[subTab]] : [];
        const updatedPoints = [...currentPoints, newPointText.trim()];
        
        saveDepartmentField(subTab, updatedPoints);
        setNewPointText("");
    };

    // Edit point inline
    const handleStartEdit = (index, text) => {
        setEditingIndex(index);
        setEditingText(text);
    };

    const handleSaveEdit = (index) => {
        if (!editingText.trim() || !selectedDept) return;
        
        const currentPoints = Array.isArray(selectedDept[subTab]) ? [...selectedDept[subTab]] : [];
        currentPoints[index] = editingText.trim();
        
        saveDepartmentField(subTab, currentPoints);
        setEditingIndex(-1);
        setEditingText("");
    };

    // Delete point from array
    const handleDeletePoint = (index) => {
        if (!window.confirm("Are you sure you want to delete this point?") || !selectedDept) return;
        
        const currentPoints = Array.isArray(selectedDept[subTab]) ? [...selectedDept[subTab]] : [];
        currentPoints.splice(index, 1);
        
        saveDepartmentField(subTab, currentPoints);
    };

    // Reorder points
    const handleMovePoint = (index, direction) => {
        if (!selectedDept) return;
        const currentPoints = Array.isArray(selectedDept[subTab]) ? [...selectedDept[subTab]] : [];
        const targetIndex = index + direction;
        
        if (targetIndex < 0 || targetIndex >= currentPoints.length) return;
        
        // Swap
        const temp = currentPoints[index];
        currentPoints[index] = currentPoints[targetIndex];
        currentPoints[targetIndex] = temp;
        
        saveDepartmentField(subTab, currentPoints);
    };

    useEffect(() => {
        fetchPendingApprovals();
        fetchAllUsers();
    }, []);

    const fetchPendingApprovals = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/pending-approvals`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch pending approvals');
            const data = await response.json();
            setPendingUsers(data.pendingUsers);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setAllUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const approveUser = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/approve-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to approve user');
            
            setSuccessMessage('User approved successfully!');
            fetchPendingApprovals();
            fetchAllUsers();
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    const rejectUser = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/reject-user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to reject user');
            
            setSuccessMessage('User rejected successfully!');
            fetchPendingApprovals();
            fetchAllUsers();
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const handleCreateUserChange = (e) => {
        setCreateUserData({ ...createUserData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (createUserData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setCreateLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/admin-create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(createUserData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to create user');
            }

            setSuccessMessage('User created successfully!');
            setShowCreateForm(false);
            setCreateUserData({
                username: '',
                email: '',
                password: '',
                role: 'student',
                name: '',
                phone: '',
                department: '',
                employeeId: '',
                studentId: ''
            });

            // Refresh user list
            fetchAllUsers();
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="dashboard admin-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Admin Dashboard</h1>
                    <p>Manage users and syllabus updates</p>
                </div>
                <div className="header-actions">
                    <span className="user-info">{user?.username}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Statistics */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{allUsers.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Approvals</h3>
                    <p className="stat-number" style={{ color: '#ff6b6b' }}>{pendingUsers.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Approved Users</h3>
                    <p className="stat-number" style={{ color: '#51cf66' }}>
                        {allUsers.filter(u => u.isApproved).length}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Approvals ({pendingUsers.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    All Users ({allUsers.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'departments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('departments')}
                >
                    Manage Departments
                </button>
            </div>

            {/* Tab Content */}
            <div className="dashboard-content">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : activeTab === 'pending' ? (
                    <div className="tab-content">
                        <h2>Pending User Approvals</h2>
                        {pendingUsers.length === 0 ? (
                            <p className="no-data">No pending approvals</p>
                        ) : (
                            <div className="users-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Department</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingUsers.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td><span className="role-badge">{user.role}</span></td>
                                                <td>{user.department || '-'}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => approveUser(user._id)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => rejectUser(user._id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                                ) : activeTab === 'users' ? (
                    <div className="tab-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2>All Users</h2>
                            {!showCreateForm && (
                                <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
                                    + Add New User
                                </button>
                            )}
                        </div>

                        {showCreateForm && (
                            <form onSubmit={handleCreateUser} className="syllabus-form" style={{ marginBottom: '30px', border: '1px solid #e0e0e0' }}>
                                <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Create New User Account</h3>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name"
                                            value={createUserData.name}
                                            onChange={handleCreateUserChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={createUserData.email}
                                            onChange={handleCreateUserChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row" style={{ marginTop: '15px' }}>
                                    <div className="form-group">
                                        <label>Username *</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Choose a username"
                                            value={createUserData.username}
                                            onChange={handleCreateUserChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role *</label>
                                        <select
                                            name="role"
                                            value={createUserData.role}
                                            onChange={handleCreateUserChange}
                                            required
                                        >
                                            <option value="student">Student</option>
                                            <option value="staff">Staff</option>
                                            <option value="hod">HOD (Head of Department)</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row" style={{ marginTop: '15px' }}>
                                    <div className="form-group">
                                        <label>Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="At least 6 characters"
                                            value={createUserData.password}
                                            onChange={handleCreateUserChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={createUserData.phone}
                                            onChange={handleCreateUserChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row" style={{ marginTop: '15px' }}>
                                    {createUserData.role !== 'admin' && (
                                        <div className="form-group">
                                            <label>Department *</label>
                                            <select
                                                name="department"
                                                value={createUserData.department}
                                                onChange={handleCreateUserChange}
                                                required
                                            >
                                                <option value="">Select Department</option>
                                                {staticDepartments.map(d => (
                                                    <option key={d.id} value={d.name}>{d.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {createUserData.role === 'staff' && (
                                        <div className="form-group">
                                            <label>Employee ID *</label>
                                            <input
                                                type="text"
                                                name="employeeId"
                                                placeholder="Enter employee ID"
                                                value={createUserData.employeeId}
                                                onChange={handleCreateUserChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    {createUserData.role === 'student' && (
                                        <div className="form-group">
                                            <label>Student ID *</label>
                                            <input
                                                type="text"
                                                name="studentId"
                                                placeholder="Enter student ID"
                                                value={createUserData.studentId}
                                                onChange={handleCreateUserChange}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                                    <button type="submit" className="btn btn-success" disabled={createLoading}>
                                        {createLoading ? 'Creating User...' : 'Create User'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowCreateForm(false);
                                            setCreateUserData({
                                                username: '',
                                                email: '',
                                                password: '',
                                                role: 'student',
                                                name: '',
                                                phone: '',
                                                department: '',
                                                employeeId: '',
                                                studentId: ''
                                            });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {allUsers.length === 0 ? (
                            <p className="no-data">No users found</p>
                        ) : (
                            <div className="users-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Department</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map(u => (
                                            <tr key={u._id}>
                                                <td>{u.name}</td>
                                                <td>{u.username}</td>
                                                <td>{u.email}</td>
                                                <td><span className="role-badge">{u.role}</span></td>
                                                <td>{u.department || '-'}</td>
                                                <td>
                                                    <span className={`status-badge ${u.isApproved ? 'approved' : 'pending'}`}>
                                                        {u.isApproved ? 'Approved' : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'departments' ? (
                    <div className="tab-content">
                        <h2>Department Data Manager</h2>
                        <DepartmentManager />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AdminDashboard;
