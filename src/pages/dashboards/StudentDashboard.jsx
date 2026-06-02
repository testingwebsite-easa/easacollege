import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Dashboards.css';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('courses');
    const [enrolledCourses] = useState([
        { id: 1, code: 'CS101', name: 'Data Structures', instructor: 'Dr. Smith', credits: 4, status: 'Ongoing' },
        { id: 2, code: 'CS102', name: 'Web Development', instructor: 'Prof. Johnson', credits: 3, status: 'Ongoing' },
        { id: 3, code: 'CS103', name: 'Database Systems', instructor: 'Dr. Williams', credits: 4, status: 'Upcoming' }
    ]);
    const [syllabi] = useState([
        { id: 1, courseCode: 'CS101', courseName: 'Data Structures', semester: 'Spring 2024', uploadedDate: '2024-01-10' },
        { id: 2, courseCode: 'CS102', courseName: 'Web Development', semester: 'Spring 2024', uploadedDate: '2024-01-12' }
    ]);
    const [materials] = useState([
        { id: 1, courseCode: 'CS101', title: 'Lecture Notes - Arrays', type: 'PDF', uploadedDate: '2024-01-15' },
        { id: 2, courseCode: 'CS101', title: 'Practice Problems Set 1', type: 'PDF', uploadedDate: '2024-01-20' },
        { id: 3, courseCode: 'CS102', title: 'HTML Basics Tutorial', type: 'Video', uploadedDate: '2024-01-18' }
    ]);

    const handleLogout = () => {
        logout();
    };

    const handleDownloadSyllabus = (syllabus) => {
        alert(`Downloading syllabus for ${syllabus.courseName}...`);
    };

    const handleDownloadMaterial = (material) => {
        alert(`Downloading ${material.title}...`);
    };

    return (
        <div className="dashboard student-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Student Dashboard</h1>
                    <p>View syllabi and course materials</p>
                </div>
                <div className="header-actions">
                    <span className="user-info">{user?.name || user?.username}</span>
                    <span className="student-info">ID: {user?.studentId}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Statistics */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Enrolled Courses</h3>
                    <p className="stat-number">{enrolledCourses.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Available Syllabi</h3>
                    <p className="stat-number">{syllabi.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Course Materials</h3>
                    <p className="stat-number">{materials.length}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    My Courses ({enrolledCourses.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'syllabi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('syllabi')}
                >
                    Syllabi ({syllabi.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materials')}
                >
                    Materials ({materials.length})
                </button>
            </div>

            {/* Tab Content */}
            <div className="dashboard-content">
                {activeTab === 'courses' ? (
                    <div className="tab-content">
                        <h2>My Enrolled Courses</h2>
                        <div className="courses-grid">
                            {enrolledCourses.map(course => (
                                <div key={course.id} className="course-card">
                                    <div className="card-header">
                                        <h3>{course.name}</h3>
                                        <span className={`status-badge ${course.status.toLowerCase()}`}>
                                            {course.status}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Code:</strong> {course.code}</p>
                                        <p><strong>Instructor:</strong> {course.instructor}</p>
                                        <p><strong>Credits:</strong> {course.credits}</p>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn btn-primary">View Syllabus</button>
                                        <button className="btn btn-secondary">View Materials</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'syllabi' ? (
                    <div className="tab-content">
                        <h2>Course Syllabi</h2>
                        {syllabi.length === 0 ? (
                            <p className="no-data">No syllabi available yet</p>
                        ) : (
                            <table className="syllabi-table">
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Semester</th>
                                        <th>Uploaded Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syllabi.map(syllabus => (
                                        <tr key={syllabus.id}>
                                            <td>{syllabus.courseCode}</td>
                                            <td>{syllabus.courseName}</td>
                                            <td>{syllabus.semester}</td>
                                            <td>{syllabus.uploadedDate}</td>
                                            <td>
                                                <button
                                                    className="btn btn-small btn-primary"
                                                    onClick={() => handleDownloadSyllabus(syllabus)}
                                                >
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="tab-content">
                        <h2>Course Materials</h2>
                        {materials.length === 0 ? (
                            <p className="no-data">No materials available yet</p>
                        ) : (
                            <div className="materials-grid">
                                {materials.map(material => (
                                    <div key={material.id} className="material-card">
                                        <div className="material-header">
                                            <span className="course-badge">{material.courseCode}</span>
                                            <span className="type-badge">{material.type}</span>
                                        </div>
                                        <div className="material-body">
                                            <h4>{material.title}</h4>
                                            <p>Uploaded: {material.uploadedDate}</p>
                                        </div>
                                        <div className="material-actions">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleDownloadMaterial(material)}
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
