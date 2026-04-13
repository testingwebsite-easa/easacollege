import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import API_BASE_URL from '../api';

const JobApplicationForm = ({ isOpen, onClose, position = '', department = '' }) => {
    // Theme Hook
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [errors, setErrors] = useState({});

    // Update form data when props change or form opens
    React.useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                designation: position || prev.designation,
                department: department || prev.department,
                position: position || prev.position
            }));
        }
    }, [isOpen, position, department]);

    // Initial State matching the PDF form
    const [formData, setFormData] = useState({
        // Job Details
        postAppliedFor: 'Teaching', // Teaching, Non-Teaching
        employmentType: [], // Regular, Contract, Visiting, Temporary
        otherEmploymentType: '',
        department: '',
        dateOfApplication: new Date().toISOString().split('T')[0],
        position: position || '',
        designation: position || '',

        // Personal Info
        fullName: '',
        gender: '',
        dob: '',
        age: '',
        maritalStatus: '',
        nationality: '',
        community: '',
        caste: '',
        aadhaarNo: '',
        panNo: '',
        mobileNo: '',
        email: '',
        presentAddress: '',
        permanentAddress: '',
        sameAsPresent: false,

        // Education
        education: [
            { level: 'SSLC', specialization: '', institution: '', year: '', percentage: '', class: '' },
            { level: 'HSC / Diploma', specialization: '', institution: '', year: '', percentage: '', class: '' },
            { level: 'UG Degree', specialization: '', institution: '', year: '', percentage: '', class: '' },
            { level: 'PG Degree', specialization: '', institution: '', year: '', percentage: '', class: '' },
            { level: 'Ph.D.', specialization: '', institution: '', year: '', percentage: '', class: '' }
        ],
        additionalQualifications: [], // NET, SET, GATE, SLET, PhD Guideship, AICTE-QIP
        otherAdditionalQualification: '',

        // Experience
        isFresher: false,
        teachingExperience: [],
        totalExperienceYears: '',

        industryExperience: [],

        // Salary
        lastDrawnSalary: '', // Gross
        expectedSalary: '',
        takeHomeSalary: '',
        preferredJoiningDate: '',

        // Skills
        softwareSkills: [], // MS Office, ERP, LMS, AI Tools, Others
        otherSoftwareSkill: '',
        languagesKnown: {
            tamil: { read: false, write: false, speak: false },
            english: { read: false, write: false, speak: false },
            others: ''
        },
        complianceExperience: [], // Autonomous, NAAC, NBA, ISO, Others

        // Academic Contributions
        publications: '',
        books: '',
        fdps: '', // Workshops/Training
        nptel: '',
        researchInterests: '',
        phdScholars: { guided: '', ongoing: '' },

        // General Info
        willingToWorkHolidays: '',
        disciplinaryProceedings: false,
        majorIllness: false,
        litigation: false,

        // References
        references: [
            { name: '', designation: '', organization: '', contact: '' },
            { name: '', designation: '', organization: '', contact: '' }
        ],

        // Declaration
        declaration: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'employmentType' || name === 'softwareSkills' || name === 'additionalQualifications' || name === 'complianceExperience') {
                const currentArray = formData[name] || [];
                if (checked) {
                    setFormData({ ...formData, [name]: [...currentArray, value] });
                } else {
                    setFormData({ ...formData, [name]: currentArray.filter(item => item !== value) });
                }
            } else if (name === 'sameAsPresent') {
                setFormData(prev => ({
                    ...prev,
                    sameAsPresent: checked,
                    permanentAddress: checked ? prev.presentAddress : prev.permanentAddress
                }));
            } else if (name === 'isFresher') {
                setFormData(prev => ({
                    ...prev,
                    isFresher: checked,
                    // Clear experience fields if fresher is checked
                    teachingExperience: checked ? [] : prev.teachingExperience,
                    industryExperience: checked ? [] : prev.industryExperience,
                    totalExperienceYears: checked ? '' : prev.totalExperienceYears
                }));
            } else {
                setFormData({ ...formData, [name]: checked });
            }
        } else {
            setFormData({ ...formData, [name]: value });
            // Clear error when user types
            if (errors[name]) {
                setErrors({ ...errors, [name]: '' });
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert("Only PDF files are allowed.");
                e.target.value = null;
                setResumeFile(null);
                return;
            }
            setResumeFile(file);
        }
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...formData.education];
        updatedEducation[index][field] = value;
        setFormData({ ...formData, education: updatedEducation });
    };

    const handleReferenceChange = (index, field, value) => {
        const updatedRefs = [...formData.references];
        updatedRefs[index][field] = value;
        setFormData({ ...formData, references: updatedRefs });
    };

    // Experience Handlers
    const addTeachingExp = () => {
        setFormData({
            ...formData,
            teachingExperience: [...formData.teachingExperience, { institution: '', designation: '', from: '', to: '', experience: '' }]
        });
    };

    const handleTeachingExpChange = (index, field, value) => {
        const updated = [...formData.teachingExperience];
        updated[index][field] = value;
        setFormData({ ...formData, teachingExperience: updated });
    };

    const addIndustryExp = () => {
        setFormData({
            ...formData,
            industryExperience: [...formData.industryExperience, { organization: '', designation: '', nature: '', period: '', experience: '' }]
        });
    };

    const handleIndustryExpChange = (index, field, value) => {
        const updated = [...formData.industryExperience];
        updated[index][field] = value;
        setFormData({ ...formData, industryExperience: updated });
    };

    const validate = () => {
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone validation (10 digits, optionally starting with +91)
        const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.mobileNo)) {
            newErrors.mobileNo = "Please enter a valid 10-digit Indian mobile number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        // --- VALIDATION ---
        // 1. Fresher / Experience
        if (!formData.isFresher) {
            const expYears = parseFloat(formData.totalExperienceYears);
            if (isNaN(expYears) || expYears < 1) {
                alert("Since you are not a fresher, Total Experience must be at least 1 year.");
                setLoading(false);
                return;
            }
        }

        // 2. Declaration
        if (!formData.declaration) {
            alert("Please accept the declaration to proceed.");
            setLoading(false);
            return;
        }

        // 3. Gender
        if (!formData.gender) {
            alert("Gender is mandatory.");
            setLoading(false);
            return;
        }

        // 4. Contact Details
        if (!formData.mobileNo || !formData.email || !formData.presentAddress) {
            alert("Mobile No, Email, and Present Address are mandatory.");
            setLoading(false);
            return;
        }

        // 5. Education (SSLC, HSC, UG mandatory)
        // Check if Institution and Year are filled for the first 3 rows
        const mandatoryEduLabels = ['SSLC', 'HSC / Diploma', 'UG Degree'];
        for (let i = 0; i < 3; i++) {
            const edu = formData.education[i];
            if (!edu.institution || !edu.year) {
                alert(`${mandatoryEduLabels[i]} details (Institution & Year) are mandatory.`);
                setLoading(false);
                return;
            }
        }

        // 6. Salary & Skills
        if (!formData.expectedSalary) {
            alert("Expected Salary is mandatory.");
            setLoading(false);
            return;
        }

        // 7. Resume
        if (!resumeFile) {
            alert("Please upload your Resume/CV (PDF format).");
            setLoading(false);
            return;
        }


        try {
            const baseUrl = API_BASE_URL;

            // Create FormData for File Upload
            const submissionData = new FormData();
            submissionData.append('data', JSON.stringify(formData));
            submissionData.append('resume', resumeFile);

            const response = await fetch(`${baseUrl}/api/job-applications`, {
                method: 'POST',
                // Content-Type header must NOT be set manually when using FormData
                body: submissionData,
            });

            // Check content type
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Received non-JSON response:", text);
                throw new Error("Server Error: The backend returned an invalid response. Please checking console for details.");
            }

            const data = await response.json();

            if (data.success) {
                alert("Application Submitted Successfully!");
                onClose();
            } else {
                throw new Error(data.message || "Submission failed");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit application: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // --- Dynamic Styles ---
    const colors = {
        bg: isDark ? '#0f172a' : '#fff',
        text: isDark ? '#e2e8f0' : '#334155',
        muted: isDark ? '#94a3b8' : '#64748b',
        border: isDark ? '#334155' : '#e2e8f0',
        sectionBg: isDark ? '#1e293b' : '#fff',
        inputBg: isDark ? '#0f172a' : '#fff',
        inputBorder: isDark ? '#334155' : '#cbd5e1',
        thBg: isDark ? '#334155' : '#f1f5f9',
        hover: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
        checkboxBg: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc'
    };

    const sectionUploadHeaderStyle = {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: isDark ? '#fff' : '#334155',
        marginBottom: '1.5rem',
        borderBottom: `2px solid ${colors.border}`,
        paddingBottom: '0.5rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: isDark ? '#cbd5e1' : '#475569',
        marginBottom: '0.4rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.6rem 0.8rem',
        borderRadius: '6px',
        border: `1px solid ${colors.inputBorder}`,
        fontSize: '0.95rem',
        outline: 'none',
        background: colors.inputBg,
        color: colors.text,
        transition: 'border-color 0.2s'
    };

    const textareaStyle = {
        ...inputStyle,
        resize: 'vertical'
    };

    const thStyle = {
        padding: '0.75rem',
        border: `1px solid ${colors.border}`,
        fontWeight: '600',
        color: isDark ? '#e2e8f0' : '#475569',
        background: colors.thBg,
        textAlign: 'left'
    };

    const tdStyle = {
        padding: '0.5rem',
        border: `1px solid ${colors.border}`
    };

    const tableInputStyle = {
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: '0.4rem',
        outline: 'none',
        fontSize: '0.9rem',
        color: colors.text
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        style={{
                            background: colors.bg,
                            width: '100%',
                            maxWidth: '1000px',
                            height: '90vh',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            color: colors.text
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: `1px solid ${colors.border}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'linear-gradient(to right, #667eea, #764ba2)',
                            color: 'white'
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Job Application Form</h2>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>EASA College of Engineering & Technology</p>
                            </div>
                            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* Form Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: isDark ? '#020617' : '#f8fafc' }}>
                            <form onSubmit={handleSubmit}>

                                {/* SECTION 1: JOB DETAILS */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>1. Job Details</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                        <div className="form-group">
                                            <label style={labelStyle}>Designation / Role</label>
                                            <input type="text" name="designation" value={formData.designation} onChange={handleChange} style={inputStyle} placeholder="e.g. Assistant Professor" />
                                        </div>
                                        <div className="form-group">
                                            <label style={labelStyle}>Post Applied For (Category)</label>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="postAppliedFor" value="Teaching" checked={formData.postAppliedFor === 'Teaching'} onChange={handleChange} /> Teaching</label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="postAppliedFor" value="Non-Teaching" checked={formData.postAppliedFor === 'Non-Teaching'} onChange={handleChange} /> Non-Teaching</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label style={labelStyle}>Employment Type</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                                                {['Regular', 'Contract', 'Visiting', 'Temporary', 'Others'].map(type => (
                                                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" name="employmentType" value={type} checked={formData.employmentType.includes(type)} onChange={handleChange} /> {type}</label>
                                                ))}
                                            </div>
                                            {formData.employmentType.includes('Others') && (
                                                <input
                                                    type="text"
                                                    name="otherEmploymentType"
                                                    value={formData.otherEmploymentType}
                                                    onChange={handleChange}
                                                    placeholder="Please specify employment type..."
                                                    style={{ ...inputStyle, marginTop: '0.8rem' }}
                                                />
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label style={labelStyle}>Department / Section</label>
                                            <input type="text" name="department" value={formData.department} onChange={handleChange} style={inputStyle} placeholder="e.g. CSE, Mechanical..." />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: PERSONAL INFO */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>2. Personal Information</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={labelStyle}>Full Name (in BLOCK letters)</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ ...inputStyle, textTransform: 'uppercase' }} required />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Gender *</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle} required>
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Date of Birth</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Age</label>
                                            <input type="number" name="age" value={formData.age} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Marital Status</label>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleChange} /> Single</label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleChange} /> Married</label>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Nationality</label>
                                            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Community</label>
                                            <input type="text" name="community" value={formData.community} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Caste (Optional)</label>
                                            <input type="text" name="caste" value={formData.caste} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Aadhaar No</label>
                                            <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} style={inputStyle} required />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>PAN No (Optional)</label>
                                            <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Mobile No *</label>
                                            <input
                                                type="tel"
                                                name="mobileNo"
                                                value={formData.mobileNo}
                                                onChange={handleChange}
                                                style={{
                                                    ...inputStyle,
                                                    border: errors.mobileNo ? '1px solid #ef4444' : inputStyle.border
                                                }}
                                                required
                                            />
                                            {errors.mobileNo && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.mobileNo}</span>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Email ID *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                style={{
                                                    ...inputStyle,
                                                    border: errors.email ? '1px solid #ef4444' : inputStyle.border
                                                }}
                                                required
                                            />
                                            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={labelStyle}>Present Address *</label>
                                            <textarea name="presentAddress" value={formData.presentAddress} onChange={handleChange} style={textareaStyle} rows="3" required />
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label style={labelStyle}>Permanent Address</label>
                                                <label style={{ fontSize: '0.9rem', color: colors.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <input type="checkbox" name="sameAsPresent" checked={formData.sameAsPresent} onChange={handleChange} /> Same as Present
                                                </label>
                                            </div>
                                            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} style={textareaStyle} rows="3" disabled={formData.sameAsPresent} />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: QUALIFICATIONS */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>3. Educational Qualifications</h3>
                                    <p style={{ marginBottom: '1rem', color: colors.muted, fontSize: '0.9rem' }}>Note: SSLC, HSC/Diploma, and UG Degree details are mandatory.</p>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                            <thead>
                                                <tr>
                                                    <th style={thStyle}>Qualification</th>
                                                    <th style={thStyle}>Specialization</th>
                                                    <th style={thStyle}>Institution / University</th>
                                                    <th style={thStyle}>Year</th>
                                                    <th style={thStyle}>% / CGPA</th>
                                                    <th style={thStyle}>Class</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.education.map((edu, idx) => (
                                                    <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}` }}>
                                                        <td style={tdStyle}><strong style={{ color: colors.text }}>{edu.level} {idx < 3 && <span style={{ color: 'red' }}>*</span>}</strong></td>
                                                        <td style={tdStyle}><input type="text" value={edu.specialization} onChange={(e) => handleEducationChange(idx, 'specialization', e.target.value)} style={tableInputStyle} /></td>
                                                        <td style={tdStyle}><input type="text" value={edu.institution} onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)} style={tableInputStyle} placeholder={idx < 3 ? "Required" : ""} /></td>
                                                        <td style={tdStyle}><input type="text" value={edu.year} onChange={(e) => handleEducationChange(idx, 'year', e.target.value)} style={tableInputStyle} placeholder={idx < 3 ? "Required" : ""} /></td>
                                                        <td style={tdStyle}><input type="text" value={edu.percentage} onChange={(e) => handleEducationChange(idx, 'percentage', e.target.value)} style={tableInputStyle} /></td>
                                                        <td style={tdStyle}><input type="text" value={edu.class} onChange={(e) => handleEducationChange(idx, 'class', e.target.value)} style={tableInputStyle} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <label style={labelStyle}>Additional Qualifications</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '0.5rem', padding: '1rem', background: colors.checkboxBg, borderRadius: '8px' }}>
                                            {['NET', 'SET', 'GATE', 'SLET', 'PhD Guideship', 'AICTE-QIP', 'Others'].map(q => (
                                                <label key={q} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <input type="checkbox" name="additionalQualifications" value={q} checked={formData.additionalQualifications.includes(q)} onChange={handleChange} />
                                                    {q}
                                                </label>
                                            ))}
                                        </div>
                                        {formData.additionalQualifications.includes('Others') && (
                                            <input
                                                type="text"
                                                name="otherAdditionalQualification"
                                                value={formData.otherAdditionalQualification}
                                                onChange={handleChange}
                                                placeholder="Please specify other qualifications..."
                                                style={{ ...inputStyle, marginTop: '0.8rem' }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* SECTION 4: EXPERIENCE */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ ...sectionUploadHeaderStyle, marginBottom: 0, borderBottom: 'none' }}>4. Experience Details</h3>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: colors.checkboxBg, padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                            <input
                                                type="checkbox"
                                                name="isFresher"
                                                checked={formData.isFresher}
                                                onChange={handleChange}
                                            />
                                            <span style={{ fontWeight: 600 }}>I am a Fresher</span>
                                        </label>
                                    </div>

                                    {!formData.isFresher ? (
                                        <>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={labelStyle}>Total Experience (Years)*</label>
                                                <input
                                                    type="number"
                                                    name="totalExperienceYears"
                                                    value={formData.totalExperienceYears}
                                                    onChange={handleChange}
                                                    style={{ ...inputStyle, maxWidth: '200px' }}
                                                    placeholder="Minimum 1 year"
                                                    min="1"
                                                    required
                                                />
                                            </div>

                                            <h4 style={{ ...labelStyle, fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Teaching Experience</h4>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={thStyle}>Institution</th>
                                                        <th style={thStyle}>Designation</th>
                                                        <th style={thStyle}>From</th>
                                                        <th style={thStyle}>To</th>
                                                        <th style={thStyle}>Experience (Y/M)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formData.teachingExperience.map((exp, idx) => (
                                                        <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}` }}>
                                                            <td style={tdStyle}><input type="text" value={exp.institution} onChange={(e) => handleTeachingExpChange(idx, 'institution', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.designation} onChange={(e) => handleTeachingExpChange(idx, 'designation', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="date" value={exp.from} onChange={(e) => handleTeachingExpChange(idx, 'from', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="date" value={exp.to} onChange={(e) => handleTeachingExpChange(idx, 'to', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.experience} onChange={(e) => handleTeachingExpChange(idx, 'experience', e.target.value)} style={tableInputStyle} /></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="5" style={{ padding: '0.5rem', textAlign: 'center' }}>
                                                            <button type="button" onClick={addTeachingExp} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                                                                <FaPlus size={12} /> Add Teaching Experience
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>

                                            <h4 style={{ ...labelStyle, fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Industry / Administrative Experience</h4>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={thStyle}>Organization</th>
                                                        <th style={thStyle}>Designation</th>
                                                        <th style={thStyle}>Nature of Work</th>
                                                        <th style={thStyle}>Period</th>
                                                        <th style={thStyle}>Experience</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formData.industryExperience.map((exp, idx) => (
                                                        <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}` }}>
                                                            <td style={tdStyle}><input type="text" value={exp.organization} onChange={(e) => handleIndustryExpChange(idx, 'organization', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.designation} onChange={(e) => handleIndustryExpChange(idx, 'designation', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.nature} onChange={(e) => handleIndustryExpChange(idx, 'nature', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.period} onChange={(e) => handleIndustryExpChange(idx, 'period', e.target.value)} style={tableInputStyle} /></td>
                                                            <td style={tdStyle}><input type="text" value={exp.experience} onChange={(e) => handleIndustryExpChange(idx, 'experience', e.target.value)} style={tableInputStyle} /></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="5" style={{ padding: '0.5rem', textAlign: 'center' }}>
                                                            <button type="button" onClick={addIndustryExp} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                                                                <FaPlus size={12} /> Add Industry Experience
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '2rem', color: colors.muted, fontStyle: 'italic' }}>
                                            As a fresher, experience details are not required.
                                        </div>
                                    )}
                                </div>

                                {/* SECTION 5: SALARY & SKILLS */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>5. Salary & Skills</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                        <div><label style={labelStyle}>Last Drawn Salary (Gross) *</label><input type="text" name="lastDrawnSalary" value={formData.lastDrawnSalary} onChange={handleChange} style={inputStyle} required /></div>
                                        <div><label style={labelStyle}>Expected Salary *</label><input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} style={inputStyle} required /></div>
                                        <div><label style={labelStyle}>Preferred Joining Date</label><input type="date" name="preferredJoiningDate" value={formData.preferredJoiningDate} onChange={handleChange} style={inputStyle} /></div>
                                    </div>

                                    <h4 style={labelStyle}>Software / Tools Known</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                        {['MS Office', 'ERP', 'LMS', 'AI Tools', 'Others'].map(tool => (
                                            <label key={tool} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" name="softwareSkills" value={tool} checked={formData.softwareSkills.includes(tool)} onChange={handleChange} /> {tool}</label>
                                        ))}
                                    </div>
                                    {formData.softwareSkills.includes('Others') && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <input
                                                type="text"
                                                name="otherSoftwareSkill"
                                                value={formData.otherSoftwareSkill}
                                                onChange={handleChange}
                                                placeholder="Please specify other software/tools..."
                                                style={inputStyle}
                                            />
                                        </div>
                                    )}

                                    <h4 style={labelStyle}>Academic / Professional Contributions</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                                        <input type="text" name="publications" placeholder="Publications (Journals/Conferences)" value={formData.publications} onChange={handleChange} style={inputStyle} />
                                        <input type="text" name="books" placeholder="Books / Chapters / Patents" value={formData.books} onChange={handleChange} style={inputStyle} />
                                        <input type="text" name="fdps" placeholder="FDPs / Workshops Attended" value={formData.fdps} onChange={handleChange} style={inputStyle} />
                                        <input type="text" name="nptel" placeholder="NPTEL / Other Courses" value={formData.nptel} onChange={handleChange} style={inputStyle} />
                                    </div>
                                </div>

                                {/* SECTION 6: RESUME UPLOAD */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>6. Upload Resume/CV</h3>
                                    <div style={{ padding: '1rem', border: `2px dashed ${colors.border}`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer', background: colors.hover }}>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            id="resume-upload"
                                        />
                                        <label htmlFor="resume-upload" style={{ cursor: 'pointer', display: 'block', width: '100%' }}>
                                            {resumeFile ? (
                                                <div style={{ color: 'green', fontWeight: 'bold' }}>
                                                    {resumeFile.name} ({(resumeFile.size / 1024).toFixed(2)} KB)
                                                </div>
                                            ) : (
                                                <div style={{ color: colors.muted }}>
                                                    <p style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Click to upload Resume</p>
                                                    <p style={{ fontSize: '0.9rem' }}>Only PDF files are allowed</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    {resumeFile && (
                                        <button
                                            type="button"
                                            onClick={() => setResumeFile(null)}
                                            style={{ marginTop: '1rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Remove File
                                        </button>
                                    )}
                                </div>

                                {/* SECTION 7: REFERENCES */}
                                <div className="form-section" style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${colors.border}` }}>
                                    <h3 style={sectionUploadHeaderStyle}>7. References (Two Mandatory)</h3>
                                    {formData.references.map((ref, idx) => (
                                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: idx < formData.references.length - 1 ? `1px dashed ${colors.border}` : 'none' }}>
                                            <input type="text" placeholder="Name" value={ref.name} onChange={(e) => handleReferenceChange(idx, 'name', e.target.value)} style={inputStyle} required />
                                            <input type="text" placeholder="Designation" value={ref.designation} onChange={(e) => handleReferenceChange(idx, 'designation', e.target.value)} style={inputStyle} required />
                                            <input type="text" placeholder="Organization" value={ref.organization} onChange={(e) => handleReferenceChange(idx, 'organization', e.target.value)} style={inputStyle} required />
                                            <input type="text" placeholder="Contact No" value={ref.contact} onChange={(e) => handleReferenceChange(idx, 'contact', e.target.value)} style={inputStyle} required />
                                        </div>
                                    ))}
                                </div>

                                {/* DECLARATION & SUBMIT */}
                                <div style={{ marginBottom: '2rem', background: colors.sectionBg, padding: '1.5rem', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="declaration"
                                            checked={formData.declaration}
                                            onChange={handleChange}
                                            style={{ marginTop: '0.2rem' }}
                                        />
                                        <span style={{ fontSize: '0.95rem', color: colors.text, lineHeight: '1.5' }}>
                                            I hereby declare that the information provided above is true to the best of my knowledge and belief. I understand that any misrepresentation of facts will lead to immediate cancellation of my application/appointment.
                                        </span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                    <button type="button" onClick={onClose} style={{ padding: '0.8rem 2rem', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.sectionBg, cursor: 'pointer', fontWeight: 'bold', color: colors.text }}>Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={loading || !formData.declaration}
                                        style={{
                                            padding: '0.8rem 3rem',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: 'linear-gradient(to right, #667eea, #764ba2)',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: formData.declaration ? 'pointer' : 'not-allowed',
                                            opacity: (loading || !formData.declaration) ? 0.6 : 1
                                        }}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JobApplicationForm;
