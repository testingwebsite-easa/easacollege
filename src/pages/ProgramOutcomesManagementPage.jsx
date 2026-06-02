import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaLock, FaCheckCircle } from 'react-icons/fa';
import API_BASE_URL from '../api';
import { COMMON_UG_PO, COMMON_UG_PEO, COMMON_UG_WK, departmentPSO } from '../data/programOutcomesData';
import { departments as staticDepartments } from '../data/departmentsData';

const ProgramOutcomesManagementPage = () => {
    const { user, isAuthenticated, userRole } = useAuth();
    const navigate = useNavigate();

    // State
    const [selectedDept, setSelectedDept] = useState('computer-science-and-engineering');
    const [activeTab, setActiveTab] = useState('PO'); // PO, PEO, PSO, WK
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Outcome data
    const [poList, setPoList] = useState(COMMON_UG_PO);
    const [peoList, setPeoList] = useState(COMMON_UG_PEO);
    const [psoList, setPsoList] = useState(departmentPSO[selectedDept] || []);
    const [wkList, setWkList] = useState(COMMON_UG_WK);

    // Edit form
    const [formData, setFormData] = useState({
        id: '',
        code: '',
        title: '',
        description: ''
    });

    // Check authorization
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (userRole !== 'admin' && userRole !== 'hod') {
            navigate('/');
            return;
        }
    }, [isAuthenticated, userRole, navigate]);

    // Update PSO when department changes
    useEffect(() => {
        setPsoList(departmentPSO[selectedDept] || []);
        resetForm();
    }, [selectedDept]);

    // Fetch outcomes from backend on mount
    useEffect(() => {
        fetchOutcomes();
    }, [selectedDept]);

    const fetchOutcomes = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/api/outcomes?department=${selectedDept}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            if (response.ok) {
                const data = await response.json();
                if (data.po) setPoList(data.po);
                if (data.peo) setPeoList(data.peo);
                if (data.pso) setPsoList(data.pso);
                if (data.wk) setWkList(data.wk);
            }
        } catch (err) {
            console.error('Error fetching outcomes:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentList = () => {
        switch(activeTab) {
            case 'PO': return poList;
            case 'PEO': return peoList;
            case 'PSO': return psoList;
            case 'WK': return wkList;
            default: return [];
        }
    };

    const updateList = (newList) => {
        switch(activeTab) {
            case 'PO': setPoList(newList); break;
            case 'PEO': setPeoList(newList); break;
            case 'PSO': setPsoList(newList); break;
            case 'WK': setWkList(newList); break;
            default: break;
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingId(item.id);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const payload = {
                department: selectedDept,
                type: activeTab,
                outcome: formData
            };

            const response = await fetch(
                `${API_BASE_URL}/api/outcomes/save`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (response.ok) {
                const currentList = getCurrentList();
                const existingIndex = currentList.findIndex(item => item.id === formData.id);
                
                let updatedList;
                if (existingIndex >= 0) {
                    updatedList = [...currentList];
                    updatedList[existingIndex] = formData;
                } else {
                    updatedList = [...currentList, formData];
                }
                
                updateList(updatedList);
                setSuccessMessage(`${activeTab} outcome saved successfully!`);
                resetForm();
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error('Error saving outcome:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this outcome?')) {
            try {
                setLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/api/outcomes/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                );

                if (response.ok) {
                    const currentList = getCurrentList();
                    updateList(currentList.filter(item => item.id !== id));
                    setSuccessMessage('Outcome deleted successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                }
            } catch (err) {
                console.error('Error deleting outcome:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({ id: '', code: '', title: '', description: '' });
        setEditingId(null);
        setIsEditing(false);
    };

    const handleAddNew = () => {
        const currentList = getCurrentList();
        const maxNum = Math.max(...currentList.map(item => 
            parseInt(item.code.replace(/[^0-9]/g, '')) || 0
        ), 0);
        
        setFormData({
            id: `new-${Date.now()}`,
            code: `${activeTab}${maxNum + 1}`,
            title: '',
            description: ''
        });
        setIsEditing(true);
    };

    if (!isAuthenticated || (userRole !== 'admin' && userRole !== 'hod')) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
                <FaLock size={60} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                <h2>Access Denied</h2>
                <p>This page is only accessible to Admin and HOD users.</p>
            </div>
        );
    }

    const currentList = getCurrentList();
    const activeDept = staticDepartments.find(d => d.slug === selectedDept);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '3rem 2rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Program Outcomes Management
                </h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                    Manage PO, PEO, PSO, and WK for your departments
                </p>
            </div>

            {/* Main Content */}
            <section style={{ flex: 1, padding: '2rem', background: 'var(--bg-main)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Authorization Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#10b981'
                        }}
                    >
                        <FaCheckCircle /> You are logged in as <strong>{userRole.toUpperCase()}</strong>
                    </motion.div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                style={{
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    color: '#10b981',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    marginBottom: '2rem',
                                    border: '1px solid rgba(16, 185, 129, 0.5)'
                                }}
                            >
                                {successMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Department & Tab Selection */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        marginBottom: '2rem'
                    }}>
                        {/* Department Selector */}
                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Department
                            </label>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)',
                                    color: 'var(--text-main)'
                                }}
                            >
                                {staticDepartments.map(dept => (
                                    <option key={dept.id} value={dept.slug}>{dept.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tab Selection */}
                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {['PO', 'PEO', 'PSO', 'WK'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); resetForm(); }}
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '8px',
                                        border: activeTab === tab ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                        background: activeTab === tab ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                        color: activeTab === tab ? 'var(--primary)' : 'var(--text-main)',
                                        cursor: 'pointer',
                                        fontWeight: activeTab === tab ? 'bold' : 'normal',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Section */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                marginBottom: '2rem'
                            }}
                        >
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaEdit /> {editingId && editingId.startsWith('new') ? 'Add New' : 'Edit'} {activeTab}
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Code (e.g., PO1)"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--bg-section)',
                                        color: 'var(--text-main)'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--bg-section)',
                                        color: 'var(--text-main)'
                                    }}
                                />
                            </div>

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)',
                                    color: 'var(--text-main)',
                                    minHeight: '150px',
                                    resize: 'vertical',
                                    marginBottom: '1.5rem'
                                }}
                            />

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        background: 'var(--primary)',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    <FaSave /> {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={resetForm}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        background: 'transparent',
                                        color: 'var(--text-main)',
                                        border: '1px solid var(--glass-border)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Add New Button */}
                    {!isEditing && (
                        <button
                            onClick={handleAddNew}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                background: 'var(--primary)',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: 'bold',
                                marginBottom: '2rem'
                            }}
                        >
                            <FaPlus /> Add New {activeTab}
                        </button>
                    )}

                    {/* Outcomes List */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentList.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                        {item.code}: {item.title}
                                    </h4>
                                    <p style={{ margin: '0', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                        {item.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            color: '#3b82f6',
                                            border: '1px solid #3b82f6',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={loading}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid #ef4444',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {currentList.length === 0 && !isEditing && (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem 2rem',
                            background: 'var(--bg-card)',
                            borderRadius: '12px',
                            border: '1px dashed var(--glass-border)',
                            color: 'var(--text-muted)'
                        }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No {activeTab} outcomes defined for this department yet.</p>
                            <button
                                onClick={handleAddNew}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    background: 'var(--primary)',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                <FaPlus /> Create First {activeTab}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProgramOutcomesManagementPage;
