import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Dashboards.css';

const StaffDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('resources');
    const [assignedCourses] = useState([
        { id: 1, code: 'CS101', name: 'Data Structures', department: 'CSE', credits: 4 },
        { id: 2, code: 'CS102', name: 'Web Development', department: 'CSE', credits: 3 }
    ]);
    const [materials, setMaterials] = useState([
        { id: 1, courseCode: 'CS101', title: 'Lecture 1: Arrays', type: 'PDF', uploadedDate: '2024-01-15' },
        { id: 2, courseCode: 'CS101', title: 'Practice Problems', type: 'PDF', uploadedDate: '2024-01-20' }
    ]);
    const [newMaterial, setNewMaterial] = useState({
        courseCode: '',
        title: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMaterial(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadMaterial = (e) => {
        e.preventDefault();
        if (newMaterial.courseCode && newMaterial.title) {
            setMaterials([...materials, {
                id: Date.now(),
                ...newMaterial,
                type: 'PDF',
                uploadedDate: new Date().toLocaleDateString()
            }]);
            setSuccessMessage('Material uploaded successfully!');
            setNewMaterial({ courseCode: '', title: '', description: '' });
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard staff-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Staff Dashboard</h1>
                    <p>Manage course materials and syllabus updates</p>
                </div>
                <div className="header-actions">
                    <span className="user-info">{user?.name || user?.username}</span>
                    <span className="employee-info">ID: {user?.employeeId}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Statistics */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Assigned Courses</h3>
                    <p className="stat-number">{assignedCourses.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Materials Uploaded</h3>
                    <p className="stat-number">{materials.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Department</h3>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>{user?.department}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    My Courses ({assignedCourses.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                    onClick={() => setActiveTab('resources')}
                >
                    Manage Resources
                </button>
                <button
                    className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materials')}
                >
                    My Materials ({materials.length})
                </button>
            </div>

            {/* Tab Content */}
            <div className="dashboard-content">
                {activeTab === 'courses' ? (
                    <div className="tab-content">
                        <h2>My Assigned Courses</h2>
                        <div className="courses-grid">
                            {assignedCourses.map(course => (
                                <div key={course.id} className="course-card">
                                    <div className="card-header">
                                        <h3>{course.name}</h3>
                                        <span className="course-code">{course.code}</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Department:</strong> {course.department}</p>
                                        <p><strong>Credits:</strong> {course.credits}</p>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn btn-primary">View Syllabus</button>
                                        <button className="btn btn-secondary">Update Materials</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'resources' ? (
                    <div className="tab-content">
                        <h2>Upload Course Materials</h2>
                        <form onSubmit={handleUploadMaterial} className="material-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="courseCode">Course Code *</label>
                                    <select
                                        id="courseCode"
                                        name="courseCode"
                                        value={newMaterial.courseCode}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a course</option>
                                        {assignedCourses.map(course => (
                                            <option key={course.id} value={course.code}>
                                                {course.code} - {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="title">Material Title *</label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        placeholder="e.g., Lecture 1: Introduction"
                                        value={newMaterial.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter material description"
                                    value={newMaterial.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="file">Upload File *</label>
                                <input
                                    id="file"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.pptx"
                                    required
                                />
                                <small>Accepted formats: PDF, DOC, DOCX, PPTX</small>
                            </div>

                            <button type="submit" className="submit-btn">Upload Material</button>
                        </form>
                    </div>
                ) : (
                    <div className="tab-content">
                        <h2>My Uploaded Materials</h2>
                        {materials.length === 0 ? (
                            <p className="no-data">No materials uploaded yet</p>
                        ) : (
                            <table className="materials-table">
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Uploaded Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.map(material => (
                                        <tr key={material.id}>
                                            <td>{material.courseCode}</td>
                                            <td>{material.title}</td>
                                            <td>{material.type}</td>
                                            <td>{material.uploadedDate}</td>
                                            <td>
                                                <button className="btn btn-small btn-primary">View</button>
                                                <button className="btn btn-small btn-secondary">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffDashboard;
