import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../api';
import '../../styles/Dashboards.css';
import { departments as staticDepartments } from '../../data/departmentsData';
import { SYLLABUS_DATA, GENERIC_FIRST_YEAR } from '../../data/syllabusData';
import { FaUsers, FaUserCheck, FaUserTimes, FaFilePdf, FaUpload, FaTrash, FaEye, FaBookOpen, FaEnvelope, FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
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

    // Admissions & Enquiries States
    const [admissions, setAdmissions] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        if (activeTab === 'syllabus' || activeTab === 'departments') {
            fetchDepartments();
        }
    }, [activeTab]);

    // Fetch admissions/enquiries when tab changes
    useEffect(() => {
        if (activeTab === 'admissions') {
            fetchAdmissions();
        } else if (activeTab === 'enquiries') {
            fetchEnquiries();
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

    // Admissions API Call Handlers
    const fetchAdmissions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch admissions');
            const data = await response.json();
            setAdmissions(data);
        } catch (err) {
            console.error("Error fetching admissions:", err);
            setError("Failed to load admissions.");
        }
    };

    const handleUpdateAdmissionStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update admission status');
            setAdmissions(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
            setSuccessMessage("Admission status updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error updating admission:", err);
            setError(err.message);
            setTimeout(() => setError(""), 4000);
        }
    };

    const handleDeleteAdmission = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admission record?")) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete admission record');
            setAdmissions(prev => prev.filter(a => a._id !== id));
            setSuccessMessage("Admission record deleted successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error deleting admission:", err);
            setError(err.message);
            setTimeout(() => setError(""), 4000);
        }
    };

    const handleExportAdmissions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/export`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to export admissions');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `admissions_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
            setError('Failed to download CSV');
            setTimeout(() => setError(""), 4000);
        }
    };

    // Enquiries API Call Handlers
    const fetchEnquiries = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch enquiries');
            const data = await response.json();
            setEnquiries(data);
        } catch (err) {
            console.error("Error fetching enquiries:", err);
            setError("Failed to load enquiries.");
        }
    };

    const handleUpdateEnquiryStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiry/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update enquiry status');
            setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
            setSuccessMessage("Enquiry status updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error updating enquiry:", err);
            setError(err.message);
            setTimeout(() => setError(""), 4000);
        }
    };

    const handleDeleteEnquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiry/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete enquiry');
            setEnquiries(prev => prev.filter(e => e._id !== id));
            setSuccessMessage("Enquiry deleted successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            console.error("Error deleting enquiry:", err);
            setError(err.message);
            setTimeout(() => setError(""), 4000);
        }
    };

    useEffect(() => {
        fetchPendingApprovals();
        fetchAllUsers();
        fetchAdmissions();
        fetchEnquiries();
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
        <div className="admin-container">
            {/* Mobile Sidebar Toggle */}
            <button
                className="hide-on-desktop"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    position: 'fixed', bottom: '20px', right: '20px', zIndex: 100,
                    background: '#667eea', color: 'white', border: 'none',
                    borderRadius: '50%', width: '50px', height: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontSize: '1.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <h1 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Admin Panel</h1>
                    <a href="/" style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'none' }}>&larr; Back to Website</a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem', width: '100%' }}>
                    <button
                        className={`admin-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('pending'); setSidebarOpen(false); }}
                    >
                        <FaUserCheck /> Pending Approvals ({pendingUsers.length})
                    </button>
                    <button
                        className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}
                    >
                        <FaUsers /> All Users ({allUsers.length})
                    </button>
                    <button
                        className={`admin-tab-btn ${activeTab === 'departments' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('departments'); setSidebarOpen(false); }}
                    >
                        <FaBookOpen /> Manage Departments
                    </button>
                    <button
                        className={`admin-tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('admissions'); setSidebarOpen(false); }}
                    >
                        <FaGraduationCap /> Admissions ({admissions.length})
                    </button>
                    <button
                        className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('enquiries'); setSidebarOpen(false); }}
                    >
                        <FaEnvelope /> General Enquiries ({enquiries.length})
                    </button>
                </div>
            </div>

            <div className="admin-main">
                {/* Header Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }} className="text-gradient">
                        {activeTab === 'pending' && 'Pending User Approvals'}
                        {activeTab === 'users' && 'User Account Directory'}
                        {activeTab === 'departments' && 'Department Data Manager'}
                        {activeTab === 'admissions' && 'Admissions Management'}
                        {activeTab === 'enquiries' && 'General Enquiries'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="user-info" style={{ color: '#333', background: '#eef2f6' }}>{user?.username}</span>
                        <button
                            onClick={handleLogout}
                            style={{ background: 'transparent', color: '#764ba2', border: '1px solid #764ba2', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* Statistics Cards */}
                {(activeTab === 'pending' || activeTab === 'users') && (
                    <div className="dashboard-stats" style={{ padding: '0 0 20px 0', margin: '0' }}>
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
                )}

                {/* Tab Content */}
                <div className="dashboard-content" style={{ padding: '0' }}>
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
                    ) : activeTab === 'admissions' ? (
                        <div className="tab-content">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                                <h2>Admissions Applications</h2>
                                <button
                                    onClick={handleExportAdmissions}
                                    className="btn btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FaUpload style={{ transform: 'rotate(180deg)' }} /> Export CSV
                                </button>
                            </div>

                            {admissions.length === 0 ? (
                                <p className="no-data">No admissions applications found</p>
                            ) : (
                                <div className="users-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Course</th>
                                                <th>Community</th>
                                                <th>District</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admissions.map(ad => (
                                                <tr key={ad._id}>
                                                    <td style={{ fontWeight: 'bold' }}>{ad.name}</td>
                                                    <td>{ad.email}</td>
                                                    <td>{ad.phone}</td>
                                                    <td><span className="course-badge">{ad.course}</span></td>
                                                    <td>{ad.community || '-'}</td>
                                                    <td>{ad.district || '-'}</td>
                                                    <td>
                                                        <select
                                                            value={ad.status || 'Pending'}
                                                            onChange={(e) => handleUpdateAdmissionStatus(ad._id, e.target.value)}
                                                            style={{
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ddd',
                                                                fontSize: '13px',
                                                                background: ad.status === 'Approved' ? '#e8f5e9' : ad.status === 'Rejected' ? '#ffebee' : '#fff3e0',
                                                                color: ad.status === 'Approved' ? '#2e7d32' : ad.status === 'Rejected' ? '#c62828' : '#ef6c00',
                                                                fontWeight: '600'
                                                            }}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Approved">Approved</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-small"
                                                            onClick={() => handleDeleteAdmission(ad._id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'enquiries' ? (
                        <div className="tab-content">
                            <h2>General Enquiries</h2>
                            {enquiries.length === 0 ? (
                                <p className="no-data">No enquiries found</p>
                            ) : (
                                <div className="users-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Message</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiries.map(enq => (
                                                <tr key={enq._id}>
                                                    <td style={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
                                                        {enq.submittedAt ? new Date(enq.submittedAt).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td style={{ fontWeight: 'bold' }}>{enq.name}</td>
                                                    <td>{enq.email}</td>
                                                    <td>{enq.phone}</td>
                                                    <td style={{ maxWidth: '300px', wordBreak: 'break-word' }}>{enq.message}</td>
                                                    <td>
                                                        <select
                                                            value={enq.status || 'New'}
                                                            onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                                                            style={{
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ddd',
                                                                fontSize: '13px',
                                                                background: enq.status === 'Resolved' ? '#e8f5e9' : enq.status === 'Contacted' ? '#e3f2fd' : '#ffebee',
                                                                color: enq.status === 'Resolved' ? '#2e7d32' : enq.status === 'Contacted' ? '#1565c0' : '#c2185b',
                                                                fontWeight: '600'
                                                            }}
                                                        >
                                                            <option value="New">New</option>
                                                            <option value="Contacted">Contacted</option>
                                                            <option value="Resolved">Resolved</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-small"
                                                            onClick={() => handleDeleteEnquiry(enq._id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
