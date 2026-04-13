import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { departments as staticDepartments } from '../data/departmentsData';
import ImageUpload from '../components/ImageUpload';


// Helper Component for Dynamic JSON Lists
const DynamicJsonBuilder = ({ value, onChange, fields, label }) => {
    // Parse value on render to ensure sync, memoize to avoid unnecessary ops
    const items = React.useMemo(() => {
        try {
            const parsed = JSON.parse(value || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }, [value]);

    const updateItem = (index, key, val) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange(JSON.stringify(newItems));
    };

    const addItem = () => {
        const newItem = fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {});
        const newItems = [...items, newItem];
        onChange(JSON.stringify(newItems));
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(JSON.stringify(newItems));
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>{label}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ flex: 1, display: 'grid', gap: '0.5rem', gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}>
                            {fields.map(field => (
                                <div key={field.key} style={{ display: 'flex', flexDirection: 'column' }}>
                                    {field.type === 'image' ? (
                                        <ImageUpload
                                            value={item[field.key] || ''}
                                            onUpload={(url) => updateItem(idx, field.key, url)}
                                        />
                                    ) : field.type === 'file' ? (
                                        <ImageUpload
                                            accept=".pdf"
                                            placeholder="Upload PDF"
                                            value={item[field.key] || ''}
                                            onUpload={(url) => updateItem(idx, field.key, url)}
                                        />
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            placeholder={field.label}
                                            value={item[field.key] || ''}
                                            onChange={(e) => updateItem(idx, field.key, e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontSize: '0.85rem', minHeight: '60px', resize: 'vertical' }}
                                        />
                                    ) : field.type === 'image-list' ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {(item[field.key] || []).map((img, imgIdx) => (
                                                    <div key={imgIdx} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--glass-border)' }} />
                                                        <button type="button" onClick={() => {
                                                            const newArr = (item[field.key] || []).filter((_, i) => i !== imgIdx);
                                                            updateItem(idx, field.key, newArr);
                                                        }} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <ImageUpload
                                                    value=""
                                                    onUpload={(url) => {
                                                        const current = item[field.key] || [];
                                                        // Ensure it is array
                                                        const newArr = Array.isArray(current) ? [...current, url] : [url];
                                                        updateItem(idx, field.key, newArr);
                                                    }}
                                                    placeholder={`+ Add Image`}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            placeholder={field.label}
                                            value={item[field.key] || ''}
                                            onChange={(e) => updateItem(idx, field.key, e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => removeItem(idx)} style={{ color: '#ff4444', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>×</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addItem} style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--primary)', background: 'transparent', border: '1px dashed var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>+ Add Item</button>
        </div>
    );
};

// Helper Component for HTML Content as List
const HtmlContentBuilder = ({ value, onChange, label }) => {
    // Parse individual paragraphs, removing tags for edit mode
    const paragraphs = React.useMemo(() => {
        if (!value) return [''];
        // Split by </p> to get potential paragraphs
        const parts = value.split('</p>');
        // Clean each part: remove opening <p> and other tags if needed, or just keep inner text
        // Ideally we just want the text inside <p>...</p>
        return parts
            .map(p => p.replace(/<p>/g, '').trim()) // remove <p> tags
            .filter(p => p.length > 0 || value.includes('<p></p>')); // keep empty if it was explicit
    }, [value]);

    const updateParagraph = (index, newVal) => {
        const newParas = [...paragraphs];
        newParas[index] = newVal;
        // Reconstruct HTML: wrap each in <p>
        const html = newParas.map(p => `<p>${p}</p>`).join('');
        onChange(html);
    };

    const addParagraph = () => {
        const newParas = [...paragraphs, ''];
        const html = newParas.map(p => `<p>${p}</p>`).join('');
        onChange(html);
    };

    const removeParagraph = (index) => {
        const newParas = paragraphs.filter((_, i) => i !== index);
        const html = newParas.map(p => `<p>${p}</p>`).join('');
        onChange(html);
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>{label}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {paragraphs.length === 0 && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No content yet. Add a paragraph.</div>
                )}
                {paragraphs.map((para, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea
                            value={para}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontSize: '0.9rem', minHeight: '60px' }}
                            placeholder="Type paragraph content here..."
                        />
                        <button type="button" onClick={() => removeParagraph(idx)} style={{ color: '#ff4444', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>×</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addParagraph} style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--primary)', background: 'transparent', border: '1px dashed var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>+ Add Paragraph</button>
        </div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Function to check if token is expired (403 Forbidden)
    const handleTokenExpiry = (status) => {
        if (status === 403) {
            alert('Your session has expired. Please login again.');
            localStorage.removeItem('admin_token');
            navigate('/login');
            return true;
        }
        return false;
    };

    const [activeTab, setActiveTab] = useState('admissions');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Data States
    const [admissions, setAdmissions] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [newsEvents, setNewsEvents] = useState([]);
    const [placements, setPlacements] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [facultyStats, setFacultyStats] = useState([]);
    const [missionVision, setMissionVision] = useState({ vision: '', mission: [] });
    const [coreBeliefs, setCoreBeliefs] = useState([]);
    const [ugCourses, setUgCourses] = useState([]);
    const [pgCourses, setPgCourses] = useState([]);
    const [researchCourses, setResearchCourses] = useState([]);
    const [managementMembers, setManagementMembers] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Department Management States
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [deptTab, setDeptTab] = useState('faculty'); // faculty, gallery, events
    const [deptFaculty, setDeptFaculty] = useState([]);
    const [deptGallery, setDeptGallery] = useState({ events: [], images: [] });
    const [deptEvents, setDeptEvents] = useState([]);
    const [resources, setResources] = useState([]); // Resource List
    const [years, setYears] = useState([]); // Years

    const [institution, setInstitution] = useState(null);
    const [infrastructure, setInfrastructure] = useState(null);
    const [sustainability, setSustainability] = useState(null);
    const [communityOutreach, setCommunityOutreach] = useState(null);
    const [researchItems, setResearchItems] = useState([]); // Research Items
    const [careers, setCareers] = useState([]); // Careers

    const [lifeOfEASA, setLifeOfEASA] = useState([]); // Life of EASA
    const [instituteMilestones, setInstituteMilestones] = useState([]); // Milestones
    const [pages, setPages] = useState([]); // Dynamic Pages
    const [alumni, setAlumni] = useState([]); // Alumni
    const [enquiries, setEnquiries] = useState([]); // Enquiries
    const [tickerAlerts, setTickerAlerts] = useState([]); // Ticker Alerts
    const [popupAlert, setPopupAlert] = useState(null); // Popup Alert
    const [libraryData, setLibraryData] = useState(null); // Library Data
    const [pageHeroes, setPageHeroes] = useState([]); // Page Heroes Manager
    const [scholarships, setScholarships] = useState([]); // Scholarships
    const [placementData, setPlacementData] = useState(null); // Placement Page Data
    const [videos, setVideos] = useState([]); // Video Gallery
    const [grievances, setGrievances] = useState([]); // Grievances
    const [virtualTour, setVirtualTour] = useState(null); // Virtual Tour
    const [moments, setMoments] = useState([]);
    const [advice, setAdvice] = useState([]);
    const [momentForm, setMomentForm] = useState({ title: '', description: '', image: '', date: '' });
    const [adviceForm, setAdviceForm] = useState({ name: '', role: '', message: '', image: '' });
    const [sports, setSports] = useState([]);
    const [sportForm, setSportForm] = useState({ name: '', type: 'Outdoor', count: '', image: '', description: '', gallery: '[]' });
    const [festPageData, setFestPageData] = useState(null);
    const [users, setUsers] = useState([]); // User Management State


    // Department Form State
    const [deptForm, setDeptForm] = useState({
        slug: '', type: 'UG', order: 0, name: '', heroImage: '', overview: '', brochure: '',
        studentCount: '', facultyCount: '', labCount: '',
        vision: '', mission: '', peo: '', pso: '', po: '',
        quickFacts: '[]', milestones: '[]', coreValues: '[]',
        hod: { name: '', designation: '', image: '', message: '' }
    });

    const [facultyForm, setFacultyForm] = useState({
        name: '', designation: '', department: '', image: '',
        qualification: '', experience: '', email: '', researchArea: '', order: 0
    });

    // Generic Edit State
    const [editingItem, setEditingItem] = useState(null);

    // Forms State
    const [sessionForm, setSessionForm] = useState({ title: '', startDate: '', endDate: '', status: 'Upcoming', description: '' });
    const [heroForm, setHeroForm] = useState({ image: '', title: '', subtitle: '' });
    const [programForm, setProgramForm] = useState({ title: '', subtitle: '', description: '', image: '', color: '' });
    const [newsForm, setNewsForm] = useState({ image: '', title: '', date: '', category: '', desc: '', pdf_url: '' });
    const [placementForm, setPlacementForm] = useState({ name: '', logo: '', row: 1 });
    const [galleryEventForm, setGalleryEventForm] = useState({ eventName: '', date: '', photos: '[]', shortDescription: '' });
    const [facultyStatForm, setFacultyStatForm] = useState({ value: '', label: '' });
    const [beliefForm, setBeliefForm] = useState({ icon: 'FaStar', title: '', description: '' });

    const [ugCourseForm, setUgCourseForm] = useState({ title: '', description: '', duration: '', eligibility: '', image: '', fees: '', category: 'UG' });
    const [mgmtForm, setMgmtForm] = useState({ name: '', designation: '', image_url: '', message: '', social: { facebook: '', instagram: '', x: '' }, category: 'management' });
    const [milestoneForm, setMilestoneForm] = useState({ year: '', title: '', description: '', order: 0 });
    const [missionForm, setMissionForm] = useState({ point: '' }); // For adding single mission point
    const [resourceForm, setResourceForm] = useState({ title: '', category: 'Digital Library', description: '', fileUrl: '' }); // Resource Form
    const [pageForm, setPageForm] = useState({ title: '', slug: '', subtitle: '', heroImage: '', content: '' });
    const [researchForm, setResearchForm] = useState({ title: '', category: 'department-research', type: '', description: '', author: '', department: '', year: new Date().getFullYear().toString(), link: '', image: '' });
    const [careerForm, setCareerForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', responsibilities: '', salary: '', status: 'Active', closingDate: '' });
    const [lifeOfEASAForm, setLifeOfEASAForm] = useState({ imageUrl: '', title: '', category: '', description: '' });
    const [tickerForm, setTickerForm] = useState({ message: '', link: '#', type: 'info', isActive: true });
    const [scholarshipForm, setScholarshipForm] = useState({ name: '', provider: '', amount: '', eligibility: '', deadline: '', link: '', description: '', category: 'Merit' });
    const [videoForm, setVideoForm] = useState({ title: '', url: '', thumbnail: '', category: 'General' });
    const [grievanceForm, setGrievanceForm] = useState({ name: '', email: '', phone: '', type: 'General', subject: '', message: '', rollNo: '', department: '', status: 'Pending' });
    const [userForm, setUserForm] = useState({ username: '', password: '', role: 'admin' }); // User Form

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (tab) => {
        setLoading(true);
        setError(null);
        try {
            let endpoint = '';
            let setter = null;

            switch (tab) {
                case 'admissions': endpoint = '/api/admissions'; setter = setAdmissions; break;
                case 'scholarships': endpoint = '/api/scholarships'; setter = setScholarships; break;
                case 'hero': endpoint = '/api/hero-slides'; setter = setHeroSlides; break;
                case 'programs': endpoint = '/api/programs'; setter = setPrograms; break;
                case 'news': endpoint = '/api/news-events'; setter = setNewsEvents; break;
                case 'placement': endpoint = '/api/placement-partners'; setter = setPlacements; break;
                case 'gallery': endpoint = '/api/gallery-events'; setter = setGallery; break;
                case 'about': endpoint = '/api/faculty-stats'; setter = setFacultyStats; break;
                case 'mission': endpoint = '/api/mission-vision'; setter = setMissionVision; break;
                case 'beliefs': endpoint = '/api/core-beliefs'; setter = setCoreBeliefs; break;
                case 'research-courses': endpoint = '/api/research-courses'; setter = setResearchCourses; break;
                case 'departments': endpoint = '/api/departments'; setter = setDepartments; break;
                case 'resources': endpoint = '/api/resources'; setter = setResources; break;
                case 'institution': endpoint = '/api/institution'; setter = setInstitution; break;
                case 'infrastructure': endpoint = '/api/infrastructure'; setter = setInfrastructure; break;
                case 'sustainability': endpoint = '/api/sustainability'; setter = setSustainability; break;
                case 'community-outreach': endpoint = '/api/community-outreach'; setter = setCommunityOutreach; break;
                case 'research-items': endpoint = '/api/research-items'; setter = setResearchItems; break;
                case 'careers': endpoint = '/api/careers'; setter = setCareers; break;

                case 'life-of-EASA': endpoint = '/api/life-at-EASA'; setter = setLifeOfEASA; break;
                case 'milestones': endpoint = '/api/institute-milestones'; setter = setInstituteMilestones; break;
                case 'pages': endpoint = '/api/pages'; setter = setPages; break;
                case 'alumni': endpoint = '/api/alumni'; setter = setAlumni; break;

                case 'enquiries': endpoint = '/api/enquiry'; setter = setEnquiries; break;
                case 'ticker-alerts': endpoint = '/api/ticker-alerts'; setter = setTickerAlerts; break;
                case 'popup-alert': endpoint = '/api/popup-alert'; setter = setPopupAlert; break;
                case 'library': endpoint = '/api/library'; setter = setLibraryData; break;
                case 'pageHeroes': endpoint = '/api/all-heroes'; setter = setPageHeroes; break;
                case 'placement-page': endpoint = '/api/placement-page'; setter = setPlacementData; break;
                case 'video-gallery': endpoint = '/api/video-gallery'; setter = setVideos; break;
                case 'grievances': endpoint = '/api/grievances'; setter = setGrievances; break;
                case 'virtual-tour': endpoint = '/api/virtual-tour'; setter = setVirtualTour; break;
                case 'moments': endpoint = '/api/moments'; setter = setMoments; break;
                case 'advice': endpoint = '/api/advice'; setter = setAdvice; break;
                case 'sports': endpoint = '/api/sports'; setter = setSports; break;
                case 'fest': endpoint = '/api/fest-page'; setter = setFestPageData; break;
                case 'users': endpoint = '/api/users'; setter = setUsers; break; // User Management Case

                // Management Sub-categories (Reusable endpoint)
                case 'leadership':
                case 'administration':
                case 'governance':
                case 'chairperson':
                case 'secretary':
                case 'correspondent':
                case 'principal':
                case 'deans':
                case 'founder':
                case 'management':
                    endpoint = `/api/management-team?category=${tab === 'management' ? '' : tab}`;
                    setter = setManagementMembers;
                    break;

                default: break;
            }

            if (endpoint && setter) {
                const res = await fetch(`${API_BASE_URL}${endpoint}`);
                if (!res.ok) throw new Error(`Failed to fetch ${tab}`);
                const data = await res.json();

                // Safety check for list-based data to prevent crashes if API returns object/error
                if (['scholarships', 'instituteMilestones', 'life-of-EASA', 'careers', 'research-items', 'gallery', 'placement', 'news', 'programs', 'management', 'sessions', 'research-courses', 'beliefs', 'departments', 'leadership', 'administration', 'governance', 'chairperson', 'secretary', 'correspondent', 'principal', 'deans', 'founder', 'pages', 'alumni', 'enquiries'].includes(tab) || tab === 'milestones') {
                    if (!Array.isArray(data)) {
                        console.error(`Expected array for ${tab} but received:`, data);
                        setter([]);
                        return;
                    }
                }

                setter(data);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenericDelete = async (id, endpoint, setter) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            // Get the auth token
            const token = localStorage.getItem('admin_token');

            const headers = {};

            // Add Authorization header if token exists
            if (token && (endpoint.includes('news-events') || endpoint.includes('hero-slides') || endpoint.includes('programs'))) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
                method: 'DELETE',
                headers
            });

            // Check for token expiry (403 Forbidden)
            if (handleTokenExpiry(res.status)) {
                return;
            }

            if (res.ok) {
                setter(prev => prev.filter(item => item._id !== id));
                alert('Item deleted successfully!');
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Failed to delete: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting item');
        }
    };

    const handleGenericSubmit = async (e, form, setForm, endpoint, setter, resetForm) => {
        e.preventDefault();
        try {
            const url = editingItem
                ? (`${API_BASE_URL}${endpoint}/${editingItem._id}`)
                : (`${API_BASE_URL}${endpoint}`);
            const method = editingItem ? 'PUT' : 'POST';

            // Get the auth token
            const token = localStorage.getItem('admin_token');

            const headers = {
                'Content-Type': 'application/json'
            };

            // Add Authorization header if token exists (for endpoints that require authentication)
            if (token && (endpoint.includes('news-events') || endpoint.includes('hero-slides') || endpoint.includes('programs'))) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(form)
            });

            // Check for token expiry (403 Forbidden)
            if (handleTokenExpiry(res.status)) {
                return;
            }

            if (res.ok) {
                const savedItem = await res.json();
                if (editingItem) {
                    setter(prev => prev.map(item => item._id === editingItem._id ? (savedItem.data || savedItem) : item));
                } else {
                    setter(prev => [...prev, (savedItem.data || savedItem)]);
                }
                setEditingItem(null);
                setForm(resetForm);
                setShowModal(false);
                // Refresh both course lists if a course was added/updated to ensure consistency if categories changed
                if (endpoint.includes('courses')) {
                    fetchData('research-courses');
                }
                alert('Item saved successfully!');
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error('Save failed:', errorData);
                alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error saving item');
        }
    };

    const startEdit = (item, setForm) => {
        setEditingItem(item);
        // Exclude _id and __v from form
        const { _id, __v, createdAt, updatedAt, ...formData } = item;
        // Adjust date fields for inputs if necessary
        if (formData.startDate) formData.startDate = formData.startDate.split('T')[0];
        if (formData.endDate) formData.endDate = formData.endDate.split('T')[0];

        setForm(prev => ({ ...prev, ...formData }));
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        // Reset forms based on active tab would be ideal, but for now relies on state existing
    };

    // Admission Specific
    const handleUpdateAdmissionStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setAdmissions(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating status');
        }
    };

    // Department Specific Fetching
    const fetchDepartmentData = async (deptSlug, tab) => {
        setLoading(true);
        try {
            if (tab === 'faculty') {
                const res = await fetch(`${API_BASE_URL}/api/faculty?department=${deptSlug}`);
                if (res.ok) setDeptFaculty(await res.json());
            } else if (tab === 'gallery') {
                const res = await fetch(`${API_BASE_URL}/api/departments/${deptSlug}/gallery`);
                if (res.ok) setDeptGallery(await res.json());
            } else if (tab === 'events') {
                const res = await fetch(`${API_BASE_URL}/api/departments/${deptSlug}/events`);
                if (res.ok) setDeptEvents(await res.json());
            }
        } catch (err) {
            console.error("Error fetching department data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'departments' && selectedDepartment) {
            fetchDepartmentData(selectedDepartment.slug, deptTab);
        }
    }, [deptTab, selectedDepartment, activeTab]);

    const handleFacultySubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingItem
                ? `${API_BASE_URL}/api/faculty/${editingItem._id}`
                : `${API_BASE_URL}/api/faculty`;
            const method = editingItem ? 'PUT' : 'POST';

            const payload = { ...facultyForm, department: selectedDepartment.slug };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editingItem) {
                    setDeptFaculty(prev => prev.map(item => item._id === editingItem._id ? saved : item));
                } else {
                    setDeptFaculty(prev => [...prev, saved]);
                }
                closeModal();
                setFacultyForm({ name: '', designation: '', department: '', image: '', qualification: '', experience: '', email: '', researchArea: '', order: 0 });
            } else {
                alert('Failed to save faculty');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving faculty');
        }
    };

    const deleteFaculty = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/faculty/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDeptFaculty(prev => prev.filter(item => item._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Render Helpers
    const renderTabButton = (id, label) => (
        <button
            onClick={() => { setActiveTab(id); setEditingItem(null); }}
            className={`admin-tab-btn ${activeTab === id ? 'active' : ''}`}
        >
            {label}
        </button>
    );

    const renderSingletonForm = (data, setter, endpoint, fields) => {
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!window.confirm('Save changes?')) return;
            try {
                const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    const updated = await res.json();
                    setter(updated);
                    alert('Updated successfully');
                } else {
                    const err = await res.json();
                    alert('Failed to update: ' + (err.error || 'Unknown error'));
                }
            } catch (err) {
                console.error(err);
                alert('Error updating');
            }
        };

        if (loading && !data) return <p>Loading...</p>;
        const formData = data || {};

        return (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '800px', background: 'var(--bg-section)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                {fields.map(field => {
                    if (field.type === 'header') {
                        return <h3 key={field.label} style={{ marginTop: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: 'var(--text-highlight)' }}>{field.label}</h3>;
                    }
                    if (field.type === 'image') {
                        return (
                            <div key={field.key}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{field.label}</label>
                                <ImageUpload value={formData[field.key] || ''} onUpload={(url) => setter({ ...formData, [field.key]: url })} />
                            </div>
                        );
                    } else if (field.type === 'textarea' || field.type === 'richtext') {
                        return (
                            <HtmlContentBuilder
                                key={field.key}
                                label={field.label}
                                value={formData[field.key] || ''}
                                onChange={(val) => setter({ ...formData, [field.key]: val })}
                            />
                        );
                    } else {
                        return (
                            <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{field.label}</label>
                                <input
                                    type={field.type || 'text'}
                                    value={formData[field.key] || ''}
                                    onChange={e => setter({ ...formData, [field.key]: e.target.value })}
                                    className="custom-input"
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                                />
                            </div>
                        );
                    }
                })}
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
            </form>
        );
    };

    const renderInput = (label, name, value, onChange, type = "text", required = true) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                style={{
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--bg-section)',
                    color: 'var(--text-main)',
                    outline: 'none'
                }}
            />
        </div>
    );

    const renderActionButtons = (item, setForm) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
                onClick={() => startEdit(item, setForm)}
                style={{ background: '#2196F3', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}
            >
                Edit
            </button>
            <button
                onClick={() => {
                    let endpoint, setter;
                    switch (activeTab) {
                        case 'hero': endpoint = '/api/hero-slides'; setter = setHeroSlides; break;
                        case 'programs': endpoint = '/api/programs'; setter = setPrograms; break;
                        case 'news': endpoint = '/api/news-events'; setter = setNewsEvents; break;
                        case 'placement': endpoint = '/api/placement-partners'; setter = setPlacements; break;
                        case 'gallery': endpoint = '/api/gallery-events'; setter = setGallery; break;
                        case 'video-gallery': endpoint = '/api/video-gallery'; setter = setVideos; break;
                        case 'grievances': endpoint = '/api/grievances'; setter = setGrievances; break;
                        case 'about': endpoint = '/api/faculty-stats'; setter = setFacultyStats; break;
                        case 'beliefs': endpoint = '/api/core-beliefs'; setter = setCoreBeliefs; break;

                        case 'leadership':
                        case 'administration':
                        case 'governance':
                        case 'chairperson':
                        case 'secretary':
                        case 'correspondent':
                        case 'principal':
                        case 'deans':
                        case 'founder':
                        case 'management': endpoint = '/api/management-team'; setter = setManagementMembers; break;
                        case 'departments': endpoint = '/api/departments'; setter = setDepartments; break;
                        case 'resources': endpoint = '/api/resources'; setter = setResources; break;
                        case 'pages': endpoint = '/api/pages'; setter = setPages; break;
                        case 'research-items': endpoint = '/api/research-items'; setter = setResearchItems; break;
                        case 'careers': endpoint = '/api/careers'; setter = setCareers; break;
                        case 'life-of-EASA': endpoint = '/api/life-at-EASA'; setter = setLifeOfEASA; break;
                        default: return;
                    }
                    handleGenericDelete(item._id, endpoint, setter);
                }}
                style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}
            >
                Delete
            </button>
        </div>
    );

    const handleUpdateMissionVision = async (newData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/mission-vision`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            if (res.ok) {
                const updated = await res.json();
                setMissionVision(updated);
                alert('Updated successfully');
            } else {
                alert('Failed to update');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const addMissionPoint = () => {
        if (!missionForm.point) return;
        const updated = { ...missionVision, mission: [...missionVision.mission, missionForm.point] };
        handleUpdateMissionVision(updated);
        setMissionForm({ point: '' });
    };

    const deleteMissionPoint = (index) => {
        const updated = { ...missionVision, mission: missionVision.mission.filter((_, i) => i !== index) };
        handleUpdateMissionVision(updated);
    };

    // Career Specific Handlers
    const startEditCareer = (item) => {
        setEditingItem(item);
        setCareerForm({
            ...item,
            requirements: item.requirements ? item.requirements.join('\n') : '',
            responsibilities: item.responsibilities ? item.responsibilities.join('\n') : '',
            closingDate: item.closingDate ? item.closingDate.split('T')[0] : ''
        });
        setShowModal(true);
    };

    const startEditFaculty = (item) => {
        setEditingItem(item);
        setFacultyForm({ ...item, department: selectedDepartment.slug });
        setShowModal(true);
    };

    // Department Specific Handlers
    // Gallery Event Handlers
    const startEditGalleryEvent = (item) => {
        setEditingItem(item);
        setGalleryEventForm({
            ...item,
            date: item.date ? item.date.split('T')[0] : '', // Format date for input
            shortDescription: item.shortDescription || '',
            photos: JSON.stringify(item.photos || [], null, 2)
        });
        setShowModal(true);
    };

    const handleGalleryEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...galleryEventForm,
                photos: JSON.parse(galleryEventForm.photos || '[]')
            };

            const url = editingItem
                ? `${API_BASE_URL}/api/gallery-events/${editingItem._id}`
                : `${API_BASE_URL}/api/gallery-events`;
            const method = editingItem ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editingItem) {
                    setGallery(prev => prev.map(item => item._id === editingItem._id ? saved : item));
                } else {
                    setGallery(prev => [saved, ...prev]);
                }
                closeModal();
                setGalleryEventForm({ eventName: '', date: '', photos: '[]', shortDescription: '' });
            } else {
                alert('Failed to save gallery event');
            }
        } catch (err) {
            console.error(err);
            alert('Error: Check your JSON format for Photos.');
        }
    };

    const startEditDepartment = (item) => {
        setEditingItem(item);

        const existingPso = (item.pso && item.pso.length > 0) ? item.pso : [];
        const existingPo = (item.po && item.po.length > 0) ? item.po : [];

        setDeptForm({
            ...item,
            mission: item.mission ? item.mission.join('\n') : '',
            peo: item.peo ? item.peo.join('\n') : '',
            pso: existingPso.length > 0 ? existingPso.join('\n') : '',
            po: existingPo.length > 0 ? existingPo.join('\n') : '',
            quickFacts: JSON.stringify(item.quickFacts || [], null, 2),
            milestones: JSON.stringify(item.milestones || [], null, 2),
            coreValues: JSON.stringify(item.coreValues || [], null, 2),
            hod: item.hod || { name: '', designation: '', image: '', message: '' }
        });
        setDeptTab('details');
        setShowModal(true);
    };

    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...deptForm,
                mission: deptForm.mission.split('\n').filter(item => item.trim() !== ''),
                peo: deptForm.peo.split('\n').filter(item => item.trim() !== ''),
                pso: deptForm.pso.split('\n').filter(item => item.trim() !== ''),
                po: deptForm.po.split('\n').filter(item => item.trim() !== ''),
                quickFacts: JSON.parse(deptForm.quickFacts),
                milestones: JSON.parse(deptForm.milestones),
                coreValues: JSON.parse(deptForm.coreValues),
            };

            const url = editingItem
                ? `${API_BASE_URL}/api/departments/${editingItem._id}`
                : `${API_BASE_URL}/api/departments`;
            const method = editingItem ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editingItem) {
                    setDepartments(prev => prev.map(item => item._id === editingItem._id ? saved : item));
                } else {
                    setDepartments(prev => [...prev, saved]);
                }
                closeModal();
                setDeptForm({
                    slug: '', name: '', heroImage: '', overview: '', brochure: '',
                    studentCount: '', facultyCount: '', labCount: '',
                    vision: '', mission: '', peo: '', pso: '', po: '',
                    quickFacts: '[]', milestones: '[]', coreValues: '[]',
                    hod: { name: '', designation: '', image: '', message: '' }
                });
            } else {
                alert('Failed to save department');
            }
        } catch (err) {
            console.error(err);
            alert('Error: Check your JSON format for Quick Facts, Milestones, or Core Values.');
        }
    };

    const startEditPage = (item) => {
        setEditingItem(item);
        setPageForm({
            ...item,
            sections: JSON.stringify(item.sections || [], null, 2)
        });
        setShowModal(true);
    };

    const handlePageSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...pageForm,
                sections: pageForm.sections ? JSON.parse(pageForm.sections) : []
            };

            const url = editingItem
                ? `${API_BASE_URL}/api/pages/${editingItem._id}`
                : `${API_BASE_URL}/api/pages`;
            const method = editingItem ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editingItem) {
                    setPages(prev => prev.map(item => item._id === editingItem._id ? saved : item));
                } else {
                    setPages(prev => [...prev, saved]);
                }
                closeModal();
                setPageForm({ title: '', slug: '', subtitle: '', heroImage: '', content: '', sections: '[]' });
            } else {
                alert('Failed to save page');
            }
        } catch (err) {
            console.error(err);
            alert('Error: Check your JSON format for Sections.');
        }
    };

    const [openMenus, setOpenMenus] = useState({ about: true, academics: false, campus: false });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const renderGroup = (key, label, children) => (
        <div style={{ marginBottom: '0.5rem' }}>
            <button
                onClick={() => toggleMenu(key)}
                style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-highlight)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                }}
            >
                {label}
                <span>{openMenus[key] ? '▼' : '►'}</span>
            </button>
            {openMenus[key] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    {children}
                </div>
            )}
        </div>
    );

    const handlePlacementSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/placement-page`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(placementData)
            });
            if (res.ok) {
                const saved = await res.json();
                setPlacementData(saved);
                alert('Placement Page Updated Successfully');
            } else {
                alert('Failed to save placement page');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving placement page');
        }
    };

    const handleFestPageSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/fest-page`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(festPageData)
            });
            if (res.ok) {
                const saved = await res.json();
                setFestPageData(saved);
                alert('Fest Page Updated Successfully');
            } else {
                alert('Failed to save fest page');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving fest page');
        }
    };

    const handleExportAdmissions = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_BASE_URL}/api/admissions/export`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'admissions_list.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download CSV');
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-container">
            {/* Mobile Sidebar Toggle */}
            <button
                className="hide-on-desktop"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    position: 'fixed', bottom: '20px', right: '20px', zIndex: 100,
                    background: 'var(--primary)', color: 'white', border: 'none',
                    borderRadius: '50%', width: '50px', height: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)', fontSize: '1.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                {sidebarOpen ? '×' : '☰'}
            </button>

            <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <h1 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Panel</h1>
                    <a href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>&larr; Back to Website</a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem' }}>
                    {renderTabButton('enquiries', 'General Enquiries')}
                    {renderTabButton('grievances', 'Grievances')}
                    {renderTabButton('admissions', 'Admissions')}
                    {renderTabButton('scholarships', 'Scholarships')}
                    {renderTabButton('sessions', 'Sessions')}
                    {renderTabButton('hero', 'Landing Hero Slider')}
                    {renderTabButton('pageHeroes', 'Page Hero Images')}
                    {renderTabButton('sports', 'Sports Facilities')}
                    {renderTabButton('news', 'News & Events')}
                    {renderTabButton('ticker-alerts', 'Ticker Alerts')}
                    {renderTabButton('fest', 'Dhruva Fest')}
                    {renderTabButton('gallery', 'Photo Gallery')}
                    {renderTabButton('video-gallery', 'Video Gallery')}
                    {renderTabButton('virtual-tour', 'Virtual Tour')}
                    {renderTabButton('moments', 'Moments / Highlights')}
                    {renderTabButton('advice', 'Student Advice')}
                    {renderTabButton('life-of-EASA', 'Life of EASA')}
                    {renderTabButton('pages', 'Custom Pages')}
                    {renderTabButton('library', 'Library Management')}
                    {renderTabButton('alumni', 'Alumni Registry')}
                    {renderTabButton('users', 'User Management')}
                </div>

                {renderGroup('about', 'About Us', (
                    <>
                        {renderTabButton('institution', 'Institution')}
                        {renderTabButton('beliefs', 'Core Values')}
                        {renderTabButton('mission', 'Institute Vision & Mission')}
                        {renderTabButton('leadership', 'Leadership (Hierarchy)')}
                        {renderTabButton('administration', 'Administration')}
                        {renderTabButton('sustainability', 'Sustainability')}

                        <div style={{ marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', paddingLeft: '1rem' }}>Management Members</div>
                            {renderTabButton('founder', 'Founder')}
                            {renderTabButton('chairperson', 'Chairperson')}
                            {renderTabButton('secretary', 'Secretary')}
                            {renderTabButton('correspondent', 'Correspondent')}
                            {renderTabButton('principal', 'Principal')}
                            {renderTabButton('deans', 'Deans')}
                        </div>

                        {renderTabButton('news', 'Media & Press')}
                        {renderTabButton('milestones', 'Institute Milestones')}
                        {renderTabButton('governance', 'Governance')}
                        {renderTabButton('infrastructure', 'Infrastructure')}
                        {renderTabButton('community-outreach', 'Community Outreach')}
                    </>
                ))}

                {renderGroup('academics', 'Academics', (
                    <>
                        {renderTabButton('departments', 'Departments')}
                        {renderTabButton('programs', 'Programs')}
                        {/* UG & PG Buttons Removed */}
                        {renderTabButton('research-courses', 'Research Courses')}
                    </>
                ))}

                {/* Placements, Research, Careers moved to sidebar bottom or keep in groups? 
                    User asked specifically for "About Us" options. Keeping others as is but "Management" button removed from top level 
                    since it's now broken down. */}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '1rem' }}>
                    {renderTabButton('placement', 'Placement Partners')}
                    {renderTabButton('placement-page', 'Placement Page Content')}
                    {renderTabButton('research-items', 'Research')}
                    {renderTabButton('careers', 'Careers')}
                </div>
            </div>

            <div className="admin-main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem' }} className="text-gradient">
                        {(() => {
                            const titles = {
                                'enquiries': 'General Enquiries',
                                'grievances': 'Grievances / Feedback',
                                'admissions': 'Admissions',
                                'scholarships': 'Scholarships',
                                'sessions': 'Sessions',
                                'hero': 'Hero Section',
                                'about': 'Faculty Stats',
                                'mission': 'Mission & Vision',
                                'beliefs': 'Core Beliefs',
                                'research-courses': 'Research Courses',
                                'management': 'Management Team',
                                'programs': 'Programs',
                                'news': 'News & Events',
                                'video-gallery': 'Video Gallery',
                                'virtual-tour': 'Virtual Tour',
                                'moments': 'Moments (Highlights)',
                                'advice': 'Student/Alumni Advice',
                                'fest': 'Dhruva Fest Page',
                                'placement': 'Placement Partners',
                                'placement-page': 'Placement Page',
                                'sports': 'Sports Facilities',
                                'departments': 'Departments',
                                'institution': 'Institution',
                                'infrastructure': 'Infrastructure',
                                'sustainability': 'Sustainability',
                                'community-outreach': 'Community Outreach',
                                'research-items': 'Research Items',
                                'careers': 'Careers',
                                'life-of-EASA': 'Life of EASA',
                                'milestones': 'Institute Milestones',
                                'leadership': 'Leadership (Hierarchy)',
                                'administration': 'Administration',
                                'governance': 'Governance',
                                'chairperson': 'Chairperson',
                                'secretary': 'Secretary',
                                'correspondent': 'Correspondent',
                                'principal': 'Principal',
                                'deans': 'Deans',
                                'founder': 'Founder',
                                'alumni': 'Alumni Registry',
                                'users': 'User Management'
                            };
                            return titles[activeTab] || 'Gallery';
                        })()}
                    </h2>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token');
                            navigate('/login');
                        }}
                        style={{ background: 'transparent', color: 'var(--text-highlight)', border: '1px solid var(--text-highlight)', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>

                {/* Modal Overlay */}
                {showModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                    }}>
                        <div style={{
                            background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px',
                            width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
                            border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h2>{editingItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}</h2>
                                <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                            </div>

                            {activeTab === 'hero' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, heroForm, setHeroForm, '/api/hero-slides', setHeroSlides, { image: '', title: '', subtitle: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Background Image</label>
                                        <ImageUpload value={heroForm.image} onUpload={(url) => setHeroForm({ ...heroForm, image: url })} />
                                    </div>
                                    {renderInput('Title', 'title', heroForm.title, e => setHeroForm({ ...heroForm, title: e.target.value }))}
                                    {renderInput('Subtitle', 'subtitle', heroForm.subtitle, e => setHeroForm({ ...heroForm, subtitle: e.target.value }))}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}



                            {activeTab === 'ticker-alerts' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, tickerForm, setTickerForm, '/api/ticker-alerts', setTickerAlerts, { message: '', link: '#', type: 'info', isActive: true })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Alert Message', 'message', tickerForm.message, e => setTickerForm({ ...tickerForm, message: e.target.value }))}
                                    {renderInput('Link (Optional)', 'link', tickerForm.link, e => setTickerForm({ ...tickerForm, link: e.target.value }))}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type</label>
                                        <select
                                            className="custom-select"
                                            value={tickerForm.type}
                                            onChange={e => setTickerForm({ ...tickerForm, type: e.target.value })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="info">Info (Blue)</option>
                                            <option value="warning">Warning (Yellow)</option>
                                            <option value="danger">Urgent (Red)</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={tickerForm.isActive}
                                            onChange={e => setTickerForm({ ...tickerForm, isActive: e.target.checked })}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <label>Active</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'about' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, facultyStatForm, setFacultyStatForm, '/api/faculty-stats', setFacultyStats, { value: '', label: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Value (e.g., 25:1)', 'value', facultyStatForm.value, e => setFacultyStatForm({ ...facultyStatForm, value: e.target.value }))}
                                    {renderInput('Label (e.g., Student Ratio)', 'label', facultyStatForm.label, e => setFacultyStatForm({ ...facultyStatForm, label: e.target.value }))}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'programs' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, programForm, setProgramForm, '/api/programs', setPrograms, { title: '', subtitle: '', description: '', image: '', color: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Program Title', 'title', programForm.title, e => setProgramForm({ ...programForm, title: e.target.value }))}
                                    {renderInput('Subtitle', 'subtitle', programForm.subtitle, e => setProgramForm({ ...programForm, subtitle: e.target.value }))}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Program Image</label>
                                        <ImageUpload value={programForm.image} onUpload={(url) => setProgramForm({ ...programForm, image: url })} />
                                    </div>
                                    {renderInput('Gradient Color Class (e.g., from-blue-500 to-cyan-500)', 'color', programForm.color, e => setProgramForm({ ...programForm, color: e.target.value }))}
                                    {renderInput('Description', 'description', programForm.description, e => setProgramForm({ ...programForm, description: e.target.value }), 'text')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'news' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, newsForm, setNewsForm, '/api/news-events', setNewsEvents, { image: '', title: '', date: '', category: '', desc: '', pdf_url: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Title', 'title', newsForm.title, e => setNewsForm({ ...newsForm, title: e.target.value }))}
                                    {renderInput('Date', 'date', newsForm.date, e => setNewsForm({ ...newsForm, date: e.target.value }), 'date')}
                                    {renderInput('Category', 'category', newsForm.category, e => setNewsForm({ ...newsForm, category: e.target.value }))}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Event Image</label>
                                        <ImageUpload value={newsForm.image} onUpload={(url) => setNewsForm({ ...newsForm, image: url })} />
                                    </div>
                                    {renderInput('PDF/Link URL (Optional)', 'pdf_url', newsForm.pdf_url, e => setNewsForm({ ...newsForm, pdf_url: e.target.value }), 'text', false)}
                                    {renderInput('Description', 'desc', newsForm.desc, e => setNewsForm({ ...newsForm, desc: e.target.value }))}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'scholarships' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, scholarshipForm, setScholarshipForm, '/api/scholarships', setScholarships, { name: '', provider: '', amount: '', eligibility: '', deadline: '', link: '', description: '', category: 'Merit' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Scholarship Name', 'name', scholarshipForm.name, e => setScholarshipForm({ ...scholarshipForm, name: e.target.value }))}
                                    {renderInput('Provider', 'provider', scholarshipForm.provider, e => setScholarshipForm({ ...scholarshipForm, provider: e.target.value }))}
                                    {renderInput('Amount / Benefit', 'amount', scholarshipForm.amount, e => setScholarshipForm({ ...scholarshipForm, amount: e.target.value }))}
                                    {renderInput('Eligibility Status', 'eligibility', scholarshipForm.eligibility, e => setScholarshipForm({ ...scholarshipForm, eligibility: e.target.value }))}
                                    {renderInput('Deadline', 'deadline', scholarshipForm.deadline, e => setScholarshipForm({ ...scholarshipForm, deadline: e.target.value }), 'text', false)}
                                    {renderInput('Application Link', 'link', scholarshipForm.link, e => setScholarshipForm({ ...scholarshipForm, link: e.target.value }), 'text', false)}
                                    {renderInput('Description', 'description', scholarshipForm.description, e => setScholarshipForm({ ...scholarshipForm, description: e.target.value }), 'text', false)}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                        <select
                                            className="custom-select"
                                            value={scholarshipForm.category}
                                            onChange={e => setScholarshipForm({ ...scholarshipForm, category: e.target.value })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="Merit">Merit</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Government">Government</option>
                                            <option value="Private">Private</option>
                                            <option value="Need-Based">Need-Based</option>
                                            <option value="Research">Research</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'placement' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, placementForm, setPlacementForm, '/api/placement-partners', setPlacements, { name: '', logo: '', row: 1 })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Company Name', 'name', placementForm.name, e => setPlacementForm({ ...placementForm, name: e.target.value }))}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Row Assignment</label>
                                        <select
                                            value={placementForm.row}
                                            onChange={e => setPlacementForm({ ...placementForm, row: parseInt(e.target.value) })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none' }}
                                        >
                                            <option value={1}>Row 1 (Top)</option>
                                            <option value={2}>Row 2 (Bottom)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Company Logo</label>
                                        <ImageUpload value={placementForm.logo} onUpload={(url) => setPlacementForm({ ...placementForm, logo: url })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}
                            {activeTab === 'moments' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, momentForm, setMomentForm, '/api/moments', setMoments, { title: '', description: '', image: '', date: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Title', 'title', momentForm.title, e => setMomentForm({ ...momentForm, title: e.target.value }))}
                                    {renderInput('Date', 'date', momentForm.date, e => setMomentForm({ ...momentForm, date: e.target.value }), 'date')}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Image</label>
                                        <ImageUpload value={momentForm.image} onUpload={(url) => setMomentForm({ ...momentForm, image: url })} />
                                    </div>
                                    {renderInput('Description', 'description', momentForm.description, e => setMomentForm({ ...momentForm, description: e.target.value }), 'text')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'advice' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, adviceForm, setAdviceForm, '/api/advice', setAdvice, { name: '', role: '', message: '', image: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Name', 'name', adviceForm.name, e => setAdviceForm({ ...adviceForm, name: e.target.value }))}
                                    {renderInput('Role (e.g. Alumni 2023)', 'role', adviceForm.role, e => setAdviceForm({ ...adviceForm, role: e.target.value }))}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Profile Photo</label>
                                        <ImageUpload value={adviceForm.image} onUpload={(url) => setAdviceForm({ ...adviceForm, image: url })} />
                                    </div>
                                    {renderInput('Message/Advice', 'message', adviceForm.message, e => setAdviceForm({ ...adviceForm, message: e.target.value }), 'text')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'sports' && (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const rawGallery = JSON.parse(sportForm.gallery || '[]');
                                    const galleryArray = rawGallery.map(item => item.url || item);
                                    const payload = { ...sportForm, gallery: galleryArray };

                                    const endpoint = '/api/sports';
                                    const setter = setSports;
                                    const resetForm = { name: '', type: 'Outdoor', count: '', image: '', description: '', gallery: '[]' };

                                    // Manually calling handleGenericSubmit's internal logic because handleGenericSubmit stringifies 'form' directly
                                    // But here 'sportForm' has gallery as string, we need to send array.
                                    // Actually, simplest is to use handleGenericSubmit but temporarily set sportForm to payload? No, state update async.

                                    // Custom submit execution:
                                    const submit = async () => {
                                        try {
                                            const url = editingItem
                                                ? (`${API_BASE_URL}${endpoint}/${editingItem._id}`)
                                                : (`${API_BASE_URL}${endpoint}`);
                                            const method = editingItem ? 'PUT' : 'POST';

                                            const res = await fetch(url, {
                                                method,
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(payload)
                                            });

                                            if (res.ok) {
                                                const savedItem = await res.json();
                                                if (editingItem) {
                                                    setter(prev => prev.map(item => item._id === editingItem._id ? savedItem : item));
                                                } else {
                                                    setter(prev => [...prev, savedItem]);
                                                }
                                                setEditingItem(null);
                                                setSportForm(resetForm);
                                                setShowModal(false);
                                            } else {
                                                alert('Failed to save');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            alert('Error saving item');
                                        }
                                    };
                                    submit();

                                }} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Sport Name', 'name', sportForm.name, e => setSportForm({ ...sportForm, name: e.target.value }))}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type</label>
                                        <select
                                            value={sportForm.type}
                                            onChange={(e) => setSportForm({ ...sportForm, type: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="Outdoor">Outdoor</option>
                                            <option value="Indoor">Indoor</option>
                                        </select>
                                    </div>

                                    {renderInput('Count / Detail', 'count', sportForm.count, e => setSportForm({ ...sportForm, count: e.target.value }))}
                                    {renderInput('Description', 'description', sportForm.description, e => setSportForm({ ...sportForm, description: e.target.value }), 'text')}

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Thumbnail Image</label>
                                        <ImageUpload value={sportForm.image} onUpload={(url) => setSportForm({ ...sportForm, image: url })} />
                                    </div>

                                    <DynamicJsonBuilder
                                        label="Gallery Photos"
                                        value={sportForm.gallery}
                                        onChange={(val) => setSportForm({ ...sportForm, gallery: val })}
                                        fields={[
                                            { key: 'url', label: 'Photo URL', type: 'image' }
                                        ]}
                                    />

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}



                            {activeTab === 'gallery' && (
                                <form onSubmit={handleGalleryEventSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Fest Name', 'eventName', galleryEventForm.eventName, e => setGalleryEventForm({ ...galleryEventForm, eventName: e.target.value }))}
                                    {renderInput('Short Content', 'shortDescription', galleryEventForm.shortDescription, e => setGalleryEventForm({ ...galleryEventForm, shortDescription: e.target.value }), 'text', false)}
                                    {renderInput('Event Date', 'date', galleryEventForm.date, e => setGalleryEventForm({ ...galleryEventForm, date: e.target.value }), 'date')}

                                    <DynamicJsonBuilder
                                        label="Event Photos (Min 5-10 recommended)"
                                        value={galleryEventForm.photos}
                                        onChange={(val) => setGalleryEventForm({ ...galleryEventForm, photos: val })}
                                        fields={[
                                            { key: 'src', label: 'Photo', type: 'image' },
                                            { key: 'caption', label: 'Caption' }
                                        ]}
                                    />

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'video-gallery' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, videoForm, setVideoForm, '/api/video-gallery', setVideos, { title: '', url: '', category: 'General' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Video Title', 'title', videoForm.title, e => setVideoForm({ ...videoForm, title: e.target.value }))}
                                    {renderInput('Embed URL (YouTube)', 'url', videoForm.url, e => setVideoForm({ ...videoForm, url: e.target.value }))}
                                    {renderInput('Category', 'category', videoForm.category, e => setVideoForm({ ...videoForm, category: e.target.value }))}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'beliefs' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, beliefForm, setBeliefForm, '/api/core-beliefs', setCoreBeliefs, { icon: 'FaStar', title: '', description: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Icon Name (e.g., FaHandHoldingHeart, FaLightbulb, FaUsers)</label>
                                        <select
                                            value={beliefForm.icon}
                                            onChange={(e) => setBeliefForm({ ...beliefForm, icon: e.target.value })}
                                            className="custom-select"
                                            style={{ width: '100%', padding: '0.8rem', marginTop: '0.4rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '8px' }}
                                        >
                                            <option value="FaHandHoldingHeart">FaHandHoldingHeart (Integrity)</option>
                                            <option value="FaLightbulb">FaLightbulb (Innovation)</option>
                                            <option value="FaUsers">FaUsers (Collaboration)</option>
                                            <option value="FaBalanceScale">FaBalanceScale (Excellence)</option>
                                            <option value="FaGlobeAsia">FaGlobeAsia (Social)</option>
                                            <option value="FaStar">FaStar (Generic)</option>
                                            <option value="FaGraduationCap">FaGraduationCap (Education)</option>
                                            <option value="FaChalkboardTeacher">FaChalkboardTeacher (Teaching)</option>
                                            <option value="FaLaptopCode">FaLaptopCode (Tech)</option>
                                        </select>
                                    </div>
                                    {renderInput('Title', 'title', beliefForm.title, e => setBeliefForm({ ...beliefForm, title: e.target.value }))}
                                    {renderInput('Description', 'description', beliefForm.description, e => setBeliefForm({ ...beliefForm, description: e.target.value }), 'text')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {/* UG & PG Forms Removed */}

                            {activeTab === 'research-courses' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, ugCourseForm, setUgCourseForm, '/api/ug-courses', setResearchCourses, { title: '', description: '', duration: '', eligibility: '', image: '', fees: '', category: 'Research' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Course Title', 'title', ugCourseForm.title, e => setUgCourseForm({ ...ugCourseForm, title: e.target.value }))}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                        <select
                                            value={ugCourseForm.category || 'Research'}
                                            onChange={(e) => setUgCourseForm({ ...ugCourseForm, category: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="UG">Undergraduate (UG)</option>
                                            <option value="PG">Postgraduate (PG)</option>
                                            <option value="Research">Research (Ph.D)</option>
                                        </select>
                                    </div>
                                    {renderInput('Duration', 'duration', ugCourseForm.duration, e => setUgCourseForm({ ...ugCourseForm, duration: e.target.value }))}
                                    {renderInput('Eligibility', 'eligibility', ugCourseForm.eligibility, e => setUgCourseForm({ ...ugCourseForm, eligibility: e.target.value }))}
                                    {renderInput('Fees', 'fees', ugCourseForm.fees, e => setUgCourseForm({ ...ugCourseForm, fees: e.target.value }))}
                                    {renderInput('Description', 'description', ugCourseForm.description, e => setUgCourseForm({ ...ugCourseForm, description: e.target.value }))}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Course Image</label>
                                        <ImageUpload value={ugCourseForm.image} onUpload={(url) => setUgCourseForm({ ...ugCourseForm, image: url })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'resources' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, resourceForm, setResourceForm, '/api/resources', setResources, { title: '', category: 'Digital Library', description: '', fileUrl: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Title', 'title', resourceForm.title, e => setResourceForm({ ...resourceForm, title: e.target.value }))}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                        <select
                                            value={resourceForm.category}
                                            onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="Digital Library">Digital Library</option>
                                            <option value="Regulations">Regulations</option>
                                            <option value="Statutory Bodies">Statutory Bodies</option>
                                            <option value="Forms">Forms</option>
                                            <option value="Academic Calendar">Academic Calendar</option>
                                            <option value="Faculty Handbook">Faculty Handbook</option>
                                            <option value="Student Handbook">Student Handbook</option>
                                        </select>
                                    </div>
                                    {renderInput('Description', 'description', resourceForm.description, e => setResourceForm({ ...resourceForm, description: e.target.value }))}

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Upload File (PDF/Image)</label>
                                        <ImageUpload
                                            value={resourceForm.fileUrl}
                                            onUpload={(url) => setResourceForm({ ...resourceForm, fileUrl: url })}
                                            accept="application/pdf,image/*"
                                            placeholder="Click to Upload PDF or Image"
                                        />
                                    </div>
                                    {renderInput('Or File URL / External Link', 'fileUrl', resourceForm.fileUrl, e => setResourceForm({ ...resourceForm, fileUrl: e.target.value }), 'text', false)}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'pages' && (
                                <form onSubmit={handlePageSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Page Title', 'title', pageForm.title, e => setPageForm({ ...pageForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') }))}
                                    {renderInput('Slug (URL Path)', 'slug', pageForm.slug, e => setPageForm({ ...pageForm, slug: e.target.value }))}
                                    {renderInput('Subtitle', 'subtitle', pageForm.subtitle, e => setPageForm({ ...pageForm, subtitle: e.target.value }))}
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hero Image</label>
                                        <ImageUpload value={pageForm.heroImage} onUpload={(url) => setPageForm({ ...pageForm, heroImage: url })} />
                                    </div>
                                    <div>
                                        <HtmlContentBuilder
                                            label="Content (Main Body)"
                                            value={pageForm.content}
                                            onChange={(val) => setPageForm({ ...pageForm, content: val })}
                                        />
                                    </div>
                                    <DynamicJsonBuilder
                                        label="Content Sections"
                                        value={pageForm.sections}
                                        onChange={(val) => setPageForm({ ...pageForm, sections: val })}
                                        fields={[
                                            { key: 'heading', label: 'Heading' },
                                            { key: 'body', label: 'Body Text' },
                                            { key: 'image', label: 'Image URL' }
                                        ]}
                                    />
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'research-items' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, researchForm, setResearchForm, '/api/research-items', setResearchItems, { title: '', category: 'department-research', type: '', description: '', author: '', department: '', year: new Date().getFullYear().toString(), link: '', image: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Title', 'title', researchForm.title, e => setResearchForm({ ...researchForm, title: e.target.value }))}

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                        <select
                                            value={researchForm.category}
                                            onChange={(e) => setResearchForm({ ...researchForm, category: e.target.value })}
                                            className="custom-select"
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)', marginTop: '0.4rem' }}
                                        >
                                            <option value="department-research">Department Research</option>
                                            <option value="student-research">Student Research</option>
                                            <option value="faculty-research">Faculty Research</option>
                                            <option value="industrial-research">Industrial Research</option>
                                            <option value="ipr-cell">IPR Cell</option>
                                            <option value="rd-projects">R&D Projects</option>
                                            <option value="patents">Patents</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {renderInput('Type (e.g. Project, Paper)', 'type', researchForm.type, e => setResearchForm({ ...researchForm, type: e.target.value }))}
                                        {renderInput('Year', 'year', researchForm.year, e => setResearchForm({ ...researchForm, year: e.target.value }))}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {renderInput('Author / Investigator', 'author', researchForm.author, e => setResearchForm({ ...researchForm, author: e.target.value }))}
                                        {renderInput('Department (e.g. CSE)', 'department', researchForm.department, e => setResearchForm({ ...researchForm, department: e.target.value }))}
                                    </div>

                                    {renderInput('External Link', 'link', researchForm.link, e => setResearchForm({ ...researchForm, link: e.target.value }), 'text', false)}

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                        <textarea
                                            value={researchForm.description}
                                            onChange={e => setResearchForm({ ...researchForm, description: e.target.value })}
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px', marginTop: '0.4rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cover Image</label>
                                        <ImageUpload value={researchForm.image} onUpload={(url) => setResearchForm({ ...researchForm, image: url })} />
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {['leadership', 'administration', 'governance', 'chairperson', 'secretary', 'correspondent', 'principal', 'deans', 'founder', 'management'].includes(activeTab) && (
                                <form onSubmit={(e) => handleGenericSubmit(e, mgmtForm, setMgmtForm, '/api/management-team', setManagementMembers, { name: '', designation: '', image_url: '', message: '', category: 'management', social: { facebook: '', instagram: '', x: '' } })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Name', 'name', mgmtForm.name, e => setMgmtForm({ ...mgmtForm, name: e.target.value }))}
                                    {renderInput('Designation', 'designation', mgmtForm.designation, e => setMgmtForm({ ...mgmtForm, designation: e.target.value }))}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                        <select
                                            value={mgmtForm.category}
                                            onChange={(e) => setMgmtForm({ ...mgmtForm, category: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="management">Management / Leadership</option>
                                            <option value="governance">Governance</option>
                                            <option value="administration">Administration</option>
                                            <option value="dean">Deans</option>
                                            <option value="chairperson">Chairperson</option>
                                            <option value="secretary">Secretary</option>
                                            <option value="correspondent">Correspondent</option>
                                            <option value="principal">Principal</option>
                                            <option value="founder">Founder</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Photo</label>
                                        <ImageUpload value={mgmtForm.image_url} onUpload={(url) => setMgmtForm({ ...mgmtForm, image_url: url })} />
                                    </div>
                                    {renderInput('Message', 'message', mgmtForm.message, e => setMgmtForm({ ...mgmtForm, message: e.target.value }), 'text')}

                                    <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Social Links</h3>
                                    {renderInput('Facebook URL', 'facebook', mgmtForm.social?.facebook || '', e => setMgmtForm({ ...mgmtForm, social: { ...mgmtForm.social, facebook: e.target.value } }), 'text', false)}
                                    {renderInput('Instagram URL', 'instagram', mgmtForm.social?.instagram || '', e => setMgmtForm({ ...mgmtForm, social: { ...mgmtForm.social, instagram: e.target.value } }), 'text', false)}
                                    {renderInput('X (Twitter) URL', 'x', mgmtForm.social?.x || '', e => setMgmtForm({ ...mgmtForm, social: { ...mgmtForm.social, x: e.target.value } }), 'text', false)}

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'departments' && (
                                <>
                                    {deptTab === 'faculty' && (
                                        <form onSubmit={handleFacultySubmit} style={{ display: 'grid', gap: '1rem' }}>
                                            {renderInput('Name', 'name', facultyForm.name, e => setFacultyForm({ ...facultyForm, name: e.target.value }))}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Designation</label>
                                                <select
                                                    required
                                                    value={facultyForm.designation}
                                                    onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                                                    className="custom-select"
                                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                                >
                                                    <option value="">Select Designation</option>
                                                    <option value="Professor">Professor</option>
                                                    <option value="Associate Professor">Associate Professor</option>
                                                    <option value="Assistant Professor">Assistant Professor</option>
                                                    <option value="HOD">HOD</option>
                                                    <option value="Lab Instructor">Lab Instructor</option>
                                                    <option value="Lab Assistant">Lab Assistant</option>
                                                </select>
                                            </div>
                                            {renderInput('Display Order', 'order', facultyForm.order, e => setFacultyForm({ ...facultyForm, order: e.target.value }), 'number')}
                                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update Faculty' : 'Add Faculty'}</button>
                                        </form>
                                    )}

                                    {deptTab === 'gallery' && (
                                        <form onSubmit={(e) => handleGenericSubmit(e, galleryEventForm, setGalleryEventForm, '/api/gallery-events', (data) => setDeptGallery(prev => ({ ...prev, events: data })), { eventName: '', date: '', photos: '[]', department: selectedDepartment?.slug })} style={{ display: 'grid', gap: '1rem' }}>
                                            {renderInput('Event Name', 'eventName', galleryEventForm.eventName, e => setGalleryEventForm({ ...galleryEventForm, eventName: e.target.value }))}
                                            {renderInput('Date', 'date', galleryEventForm.date, e => setGalleryEventForm({ ...galleryEventForm, date: e.target.value }), 'date')}

                                            <DynamicJsonBuilder
                                                label="Event Photos"
                                                value={galleryEventForm.photos}
                                                onChange={(val) => setGalleryEventForm({ ...galleryEventForm, photos: val })}
                                                fields={[{ key: 'url', label: 'Photo URL', type: 'image' }]}
                                            />
                                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update Event' : 'Add Event'}</button>
                                        </form>
                                    )}

                                    {deptTab === 'events' && (
                                        <form onSubmit={(e) => handleGenericSubmit(e, newsForm, setNewsForm, '/api/news-events', setDeptEvents, { image: '', title: '', date: '', category: selectedDepartment?.slug, desc: '', pdf_url: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Event Image</label>
                                                <ImageUpload value={newsForm.image} onUpload={(url) => setNewsForm({ ...newsForm, image: url })} />
                                            </div>
                                            {renderInput('Event Title', 'title', newsForm.title, e => setNewsForm({ ...newsForm, title: e.target.value }))}
                                            {renderInput('Date', 'date', newsForm.date, e => setNewsForm({ ...newsForm, date: e.target.value }), 'date')}
                                            {renderInput('Description', 'desc', newsForm.desc, e => setNewsForm({ ...newsForm, desc: e.target.value }), 'text')}
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Brochure PDF (Optional)</label>
                                                <ImageUpload value={newsForm.pdf_url} onUpload={(url) => setNewsForm({ ...newsForm, pdf_url: url })} accept="application/pdf" placeholder="Upload PDF" />
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update Event' : 'Add Event'}</button>
                                        </form>
                                    )}

                                    {deptTab === 'details' && (
                                        <form onSubmit={handleDepartmentSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                {renderInput('Department Name', 'name', deptForm.name, e => setDeptForm({ ...deptForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') }))}
                                                {renderInput('Slug', 'slug', deptForm.slug, e => setDeptForm({ ...deptForm, slug: e.target.value }))}
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Program Type</label>
                                                <select
                                                    value={deptForm.type}
                                                    onChange={e => setDeptForm({ ...deptForm, type: e.target.value })}
                                                    className="custom-select"
                                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                                >
                                                    <option value="UG">Undergraduate (UG)</option>
                                                    <option value="PG">Postgraduate (PG)</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Hero Image</label>
                                                <ImageUpload value={deptForm.heroImage} onUpload={(url) => setDeptForm({ ...deptForm, heroImage: url })} />
                                            </div>

                                            {renderInput('Overview', 'overview', deptForm.overview, e => setDeptForm({ ...deptForm, overview: e.target.value }), 'textarea')}

                                            <h3 style={{ marginTop: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: 'var(--text-highlight)' }}>HOD Details</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                {renderInput('HOD Name', 'hodName', deptForm.hod.name, e => setDeptForm({ ...deptForm, hod: { ...deptForm.hod, name: e.target.value } }))}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Designation</label>
                                                    <select
                                                        value={deptForm.hod.designation}
                                                        onChange={e => setDeptForm({ ...deptForm, hod: { ...deptForm.hod, designation: e.target.value } })}
                                                        className="custom-select"
                                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                                    >
                                                        <option value="">Select Designation</option>
                                                        <option value="Professor">Professor</option>
                                                        <option value="Associate Professor">Associate Professor</option>
                                                        <option value="Assistant Professor">Assistant Professor</option>
                                                        <option value="HOD">HOD</option>
                                                        <option value="Director">Director</option>
                                                        <option value="Dean">Dean</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>HOD Image</label>
                                                <ImageUpload value={deptForm.hod.image} onUpload={(url) => setDeptForm({ ...deptForm, hod: { ...deptForm.hod, image: url } })} />
                                            </div>
                                            {renderInput('HOD Message', 'hodMessage', deptForm.hod.message, e => setDeptForm({ ...deptForm, hod: { ...deptForm.hod, message: e.target.value } }), 'textarea')}

                                            <h3 style={{ marginTop: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: 'var(--text-highlight)' }}>Stats</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                                {renderInput('Student Count', 'studentCount', deptForm.studentCount, e => setDeptForm({ ...deptForm, studentCount: e.target.value }))}
                                                {renderInput('Faculty Count', 'facultyCount', deptForm.facultyCount, e => setDeptForm({ ...deptForm, facultyCount: e.target.value }))}
                                                {renderInput('Lab Count', 'labCount', deptForm.labCount, e => setDeptForm({ ...deptForm, labCount: e.target.value }))}
                                            </div>

                                            <h3 style={{ marginTop: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: 'var(--text-highlight)' }}>Academic Details</h3>
                                            {renderInput('Vision', 'vision', deptForm.vision, e => setDeptForm({ ...deptForm, vision: e.target.value }), 'textarea')}
                                            {renderInput('Mission (One per line)', 'mission', deptForm.mission, e => setDeptForm({ ...deptForm, mission: e.target.value }), 'textarea')}
                                            {renderInput('PEO (One per line)', 'peo', deptForm.peo, e => setDeptForm({ ...deptForm, peo: e.target.value }), 'textarea')}
                                            {renderInput('PSO (One per line)', 'pso', deptForm.pso, e => setDeptForm({ ...deptForm, pso: e.target.value }), 'textarea')}
                                            {renderInput('PO (One per line)', 'po', deptForm.po, e => setDeptForm({ ...deptForm, po: e.target.value }), 'textarea')}

                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Brochure PDF</label>
                                                <ImageUpload value={deptForm.brochure} onUpload={(url) => setDeptForm({ ...deptForm, brochure: url })} accept="application/pdf" placeholder="Upload Brochure PDF" />
                                            </div>

                                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update Department' : 'Create Department'}</button>
                                        </form>
                                    )}
                                </>
                            )}


                            {activeTab === 'careers' && (
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        const payload = {
                                            ...careerForm,
                                            requirements: careerForm.requirements.split('\n').filter(item => item.trim() !== ''),
                                            responsibilities: careerForm.responsibilities.split('\n').filter(item => item.trim() !== '')
                                        };

                                        const url = editingItem
                                            ? `${API_BASE_URL}/api/careers/${editingItem._id}`
                                            : `${API_BASE_URL}/api/careers`;
                                        const method = editingItem ? 'PUT' : 'POST';

                                        const res = await fetch(url, {
                                            method,
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(payload)
                                        });

                                        if (res.ok) {
                                            const saved = await res.json();
                                            if (editingItem) {
                                                setCareers(prev => prev.map(item => item._id === editingItem._id ? saved : item));
                                            } else {
                                                setCareers(prev => [...prev, saved]);
                                            }
                                            closeModal();
                                            setCareerForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', responsibilities: '', salary: '', status: 'Active', closingDate: '' });
                                        } else {
                                            alert('Failed to save career');
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        alert('Error saving career');
                                    }
                                }} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Job Title', 'title', careerForm.title, e => setCareerForm({ ...careerForm, title: e.target.value }))}
                                    {renderInput('Department', 'department', careerForm.department, e => setCareerForm({ ...careerForm, department: e.target.value }))}
                                    {renderInput('Location', 'location', careerForm.location, e => setCareerForm({ ...careerForm, location: e.target.value }))}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Job Type</label>
                                        <select
                                            value={careerForm.type}
                                            onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                        <textarea
                                            value={careerForm.description}
                                            onChange={e => setCareerForm({ ...careerForm, description: e.target.value })}
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px', marginTop: '0.4rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Requirements (One per line)</label>
                                        <textarea
                                            value={careerForm.requirements}
                                            onChange={e => setCareerForm({ ...careerForm, requirements: e.target.value })}
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px', marginTop: '0.4rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Responsibilities (One per line)</label>
                                        <textarea
                                            value={careerForm.responsibilities}
                                            onChange={e => setCareerForm({ ...careerForm, responsibilities: e.target.value })}
                                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px', marginTop: '0.4rem' }}
                                        />
                                    </div>

                                    {renderInput('Salary', 'salary', careerForm.salary, e => setCareerForm({ ...careerForm, salary: e.target.value }))}
                                    {renderInput('Closing Date', 'closingDate', careerForm.closingDate, e => setCareerForm({ ...careerForm, closingDate: e.target.value }), 'date', false)}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</label>
                                        <select
                                            value={careerForm.status}
                                            onChange={(e) => setCareerForm({ ...careerForm, status: e.target.value })}
                                            className="custom-select"
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}
                            {activeTab === 'life-of-EASA' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, lifeOfEASAForm, setLifeOfEASAForm, '/api/life-at-EASA', setLifeOfEASA, { imageUrl: '', title: '', category: '', description: '' })} style={{ display: 'grid', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Image</label>
                                        <ImageUpload value={lifeOfEASAForm.imageUrl} onUpload={(url) => setLifeOfEASAForm({ ...lifeOfEASAForm, imageUrl: url })} />
                                    </div>
                                    {renderInput('Title', 'title', lifeOfEASAForm.title, e => setLifeOfEASAForm({ ...lifeOfEASAForm, title: e.target.value }))}
                                    {renderInput('Category', 'category', lifeOfEASAForm.category, e => setLifeOfEASAForm({ ...lifeOfEASAForm, category: e.target.value }))}
                                    {renderInput('Description', 'description', lifeOfEASAForm.description, e => setLifeOfEASAForm({ ...lifeOfEASAForm, description: e.target.value }), 'text')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}
                            {activeTab === 'milestones' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, milestoneForm, setMilestoneForm, '/api/institute-milestones', setInstituteMilestones, { year: '', title: '', description: '', order: 0 })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Year', 'year', milestoneForm.year, e => setMilestoneForm({ ...milestoneForm, year: e.target.value }))}
                                    {renderInput('Title', 'title', milestoneForm.title, e => setMilestoneForm({ ...milestoneForm, title: e.target.value }))}
                                    {renderInput('Description', 'description', milestoneForm.description, e => setMilestoneForm({ ...milestoneForm, description: e.target.value }), 'text')}
                                    {renderInput('Order', 'order', milestoneForm.order, e => setMilestoneForm({ ...milestoneForm, order: e.target.value }), 'number')}
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add'}</button>
                                </form>
                            )}

                            {activeTab === 'users' && (
                                <form onSubmit={(e) => handleGenericSubmit(e, userForm, setUserForm, '/api/users', setUsers, { username: '', password: '', role: 'admin' })} style={{ display: 'grid', gap: '1rem' }}>
                                    {renderInput('Username', 'username', userForm.username, e => setUserForm({ ...userForm, username: e.target.value }))}
                                    {renderInput('Password', 'password', userForm.password, e => setUserForm({ ...userForm, password: e.target.value }), 'password')}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Role</label>
                                        <select
                                            className="custom-select"
                                            value={userForm.role}
                                            onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="superadmin">Super Admin</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>{editingItem ? 'Update' : 'Add User'}</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {loading && (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        {/* Global Loader Active */}
                    </div>
                )}
                {error && <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</div>}

                {!loading && !error && (
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '16px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                    }}>

                        {/* DEPARTMENTS TAB - Main UI */}
                        {activeTab === 'departments' && (
                            <>
                                {!selectedDepartment ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                        {staticDepartments.map((dept) => (
                                            <div
                                                key={dept.id}
                                                onClick={() => setSelectedDepartment(dept)}
                                                style={{
                                                    background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px',
                                                    border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s',
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                                                    {dept.slug.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{dept.name}</h3>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dept.type} Program</div>
                                                </div>
                                                <button style={{ marginTop: 'auto', padding: '0.6rem 1.2rem', borderRadius: '50px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Manage</button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                            <button onClick={() => setSelectedDepartment(null)} style={{ background: 'var(--glass-highlight)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                                            <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>{selectedDepartment.name}</h2>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                            {['faculty', 'gallery', 'events'].map(tab => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setDeptTab(tab)}
                                                    style={{
                                                        padding: '0.8rem 1.5rem', borderRadius: '12px',
                                                        background: deptTab === tab ? 'var(--primary)' : 'var(--glass-highlight)',
                                                        color: deptTab === tab ? 'white' : 'var(--text-muted)',
                                                        border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'capitalize'
                                                    }}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Sub-Tab Content */}
                                        {deptTab === 'faculty' && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                                                    <button
                                                        onClick={() => { setEditingItem(null); setFacultyForm({ name: '', designation: '', department: selectedDepartment.slug, order: 0 }); setShowModal(true); }}
                                                        className="btn btn-primary"
                                                    >
                                                        + Add Faculty
                                                    </button>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                    {deptFaculty.map(fac => (
                                                        <div key={fac._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                            <div style={{ flex: 1 }}>
                                                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>{fac.name}</h4>
                                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{fac.designation}</div>
                                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                                                                    <button onClick={() => startEditFaculty(fac)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '4px', background: 'var(--glass-highlight)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>Edit</button>
                                                                    <button onClick={() => deleteFaculty(fac._id)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '4px', background: 'var(--glass-highlight)', border: 'none', cursor: 'pointer', color: 'red' }}>Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {deptTab === 'gallery' && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                                                    <button
                                                        onClick={() => { setEditingItem(null); setGalleryEventForm({ eventName: '', date: '', photos: '[]', department: selectedDepartment.slug }); setShowModal(true); }}
                                                        className="btn btn-primary"
                                                    >
                                                        + Add Gallery Event
                                                    </button>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                    {deptGallery.events && deptGallery.events.map(event => (
                                                        <div key={event._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{event.eventName}</h4>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{new Date(event.date).toLocaleDateString()}</div>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button onClick={() => { setEditingItem(event); setGalleryEventForm({ ...event, photos: JSON.stringify(event.photos), department: selectedDepartment.slug }); setShowModal(true); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--glass-highlight)', border: 'none', cursor: 'pointer' }}>Edit</button>
                                                                <button onClick={() => handleGenericDelete(event._id, `/api/gallery-events`, (prev) => setDeptGallery({ ...deptGallery, events: deptGallery.events.filter(e => e._id !== event._id) }))} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'rgba(255,0,0,0.1)', color: 'red', border: 'none', cursor: 'pointer' }}>Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {deptTab === 'events' && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                                                    <button
                                                        onClick={() => { setEditingItem(null); setNewsForm({ title: '', date: '', desc: '', image: '', pdf_url: '', category: selectedDepartment.slug }); setShowModal(true); }}
                                                        className="btn btn-primary"
                                                    >
                                                        + Add Department Event
                                                    </button>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                    {deptEvents.map(evt => (
                                                        <div key={evt._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{evt.title}</h4>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{new Date(evt.date).toLocaleDateString()}</div>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button onClick={() => { setEditingItem(evt); setNewsForm(evt); setShowModal(true); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--glass-highlight)', border: 'none', cursor: 'pointer' }}>Edit</button>
                                                                <button onClick={() => handleGenericDelete(evt._id, `/api/news-events`, setDeptEvents)} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'rgba(255,0,0,0.1)', color: 'red', border: 'none', cursor: 'pointer' }}>Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* MISSION & VISION TAB */}
                        {activeTab === 'mission' && (
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <div>
                                    <h2 style={{ marginBottom: '1rem' }}>Vision Statement</h2>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <textarea
                                            value={missionVision.vision}
                                            onChange={(e) => setMissionVision({ ...missionVision, vision: e.target.value })}
                                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px' }}
                                        />
                                        <button
                                            onClick={() => handleUpdateMissionVision(missionVision)}
                                            className="btn btn-primary"
                                            style={{ height: 'fit-content' }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 style={{ marginBottom: '1rem' }}>Mission Points</h2>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <input
                                            type="text"
                                            value={missionForm.point}
                                            onChange={(e) => setMissionForm({ point: e.target.value })}
                                            placeholder="Add new mission point..."
                                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                                            onKeyDown={(e) => e.key === 'Enter' && addMissionPoint()}
                                        />
                                        <button onClick={addMissionPoint} className="btn btn-primary">Add</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {missionVision.mission.map((m, i) => (
                                            <div key={i} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{m}</span>
                                                <button onClick={() => deleteMissionPoint(i)} style={{ color: '#ff4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* LIBRARY MANAGEMENT TAB */}
                        {activeTab === 'library' && (
                            <div>
                                {renderSingletonForm(libraryData, setLibraryData, '/api/library', [
                                    { type: 'header', label: 'Overview Section' },
                                    { key: 'overview.title', label: 'Main Title', type: 'text' }, // Note: renderSingletonForm needs to support nested keys or we need a wrapper. 
                                    // Actually renderSingletonForm is too simple for this nested structure. I will render a custom form here.
                                ])}
                                {/* Custom Form for Library because generic one is too simple */}
                                <div style={{ display: 'grid', gap: '2rem' }}>
                                    <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                                        <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Overview</h3>
                                        {renderInput('Title', 'title', libraryData?.overview?.title || '', e => setLibraryData({ ...libraryData, overview: { ...libraryData.overview, title: e.target.value } }))}
                                        {renderInput('Subtitle', 'subtitle', libraryData?.overview?.subtitle || '', e => setLibraryData({ ...libraryData, overview: { ...libraryData.overview, subtitle: e.target.value } }))}
                                        <div style={{ margin: '1rem 0' }}>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                            <textarea
                                                value={libraryData?.overview?.description || ''}
                                                onChange={e => setLibraryData({ ...libraryData, overview: { ...libraryData.overview, description: e.target.value } })}
                                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '120px' }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hero Image</label>
                                            <ImageUpload value={libraryData?.overview?.image || ''} onUpload={(url) => setLibraryData({ ...libraryData, overview: { ...libraryData.overview, image: url } })} />
                                        </div>
                                    </div>

                                    <DynamicJsonBuilder
                                        label="Stats (e.g. Books: 35000+)"
                                        value={JSON.stringify(libraryData?.overview?.stats || [])}
                                        onChange={(val) => setLibraryData({ ...libraryData, overview: { ...libraryData.overview, stats: JSON.parse(val) } })}
                                        fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]}
                                    />

                                    <DynamicJsonBuilder
                                        label="E-Resources"
                                        value={JSON.stringify(libraryData?.eResources || [])}
                                        onChange={(val) => setLibraryData({ ...libraryData, eResources: JSON.parse(val) })}
                                        fields={[{ key: 'name', label: 'Name' }, { key: 'desc', label: 'Description' }, { key: 'link', label: 'Link' }, { key: 'logo', label: 'Logo', type: 'image' }]}
                                    />

                                    <DynamicJsonBuilder
                                        label="Open Access Resources"
                                        value={JSON.stringify(libraryData?.openAccess || [])}
                                        onChange={(val) => setLibraryData({ ...libraryData, openAccess: JSON.parse(val) })}
                                        fields={[{ key: 'name', label: 'Name' }, { key: 'url', label: 'URL' }, { key: 'logo', label: 'Logo', type: 'image' }]}
                                    />

                                    <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                                        <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>NDLI Club</h3>
                                        <div style={{ margin: '1rem 0' }}>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                            <textarea
                                                value={libraryData?.ndli?.description || ''}
                                                onChange={e => setLibraryData({ ...libraryData, ndli: { ...libraryData.ndli, description: e.target.value } })}
                                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '80px' }}
                                            />
                                        </div>
                                        {/* Simple List for Benefits */}
                                        <DynamicJsonBuilder
                                            label="Benefits"
                                            value={JSON.stringify((libraryData?.ndli?.benefits || []).map(b => ({ text: b })))}
                                            onChange={(val) => setLibraryData({ ...libraryData, ndli: { ...libraryData.ndli, benefits: JSON.parse(val).map(x => x.text) } })}
                                            fields={[{ key: 'text', label: 'Benefit Point' }]}
                                        />
                                    </div>

                                    <DynamicJsonBuilder
                                        label="Rules & Regulations"
                                        value={JSON.stringify((libraryData?.rules || []).map(r => ({ text: r })))}
                                        onChange={(val) => setLibraryData({ ...libraryData, rules: JSON.parse(val).map(x => x.text) })}
                                        fields={[{ key: 'text', label: 'Rule' }]}
                                    />

                                    <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px' }}>
                                        <h3 style={{ marginBottom: '1rem', color: '#2196F3' }}>Web OPAC</h3>
                                        <div style={{ margin: '1rem 0' }}>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                            <textarea
                                                value={libraryData?.opac?.description || ''}
                                                onChange={e => setLibraryData({ ...libraryData, opac: { ...libraryData.opac, description: e.target.value } })}
                                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '80px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            {renderInput('CTA Button Text', 'cta', libraryData?.opac?.cta || '', e => setLibraryData({ ...libraryData, opac: { ...libraryData.opac, cta: e.target.value } }))}
                                            {renderInput('Link URL', 'link', libraryData?.opac?.link || '', e => setLibraryData({ ...libraryData, opac: { ...libraryData.opac, link: e.target.value } }))}
                                        </div>
                                    </div>

                                    <DynamicJsonBuilder
                                        label="Staff"
                                        value={JSON.stringify(libraryData?.staff || [])}
                                        onChange={(val) => setLibraryData({ ...libraryData, staff: JSON.parse(val) })}
                                        fields={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'image', label: 'Photo', type: 'image' }]}
                                    />

                                    <DynamicJsonBuilder
                                        label="Gallery Images"
                                        value={JSON.stringify((libraryData?.gallery || []).map(r => ({ url: r })))}
                                        onChange={(val) => setLibraryData({ ...libraryData, gallery: JSON.parse(val).map(x => x.url) })}
                                        fields={[{ key: 'url', label: 'Image', type: 'image' }]}
                                    />

                                    <button
                                        onClick={async () => {
                                            try {
                                                const res = await fetch(`${API_BASE_URL}/api/library`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify(libraryData)
                                                });
                                                if (res.ok) alert('Library Updated!');
                                                else alert('Failed to update');
                                            } catch (e) { alert('Error updating'); }
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Save All Library Changes
                                    </button>
                                </div>
                            </div>
                        )}



                        {/* FEST PAGE TAB */}
                        {activeTab === 'fest' && (
                            <div>
                                {festPageData ? (
                                    <form onSubmit={handleFestPageSubmit} style={{ display: 'grid', gap: '1rem', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                        <h2 style={{ marginBottom: '1.5rem' }}>Configure Fest Page</h2>
                                        {renderInput('Fest Title', 'title', festPageData.title, e => setFestPageData({ ...festPageData, title: e.target.value }))}
                                        {renderInput('Subtitle', 'subtitle', festPageData.subtitle, e => setFestPageData({ ...festPageData, subtitle: e.target.value }))}

                                        <DynamicJsonBuilder
                                            label="Fest Events"
                                            value={JSON.stringify(festPageData.events || [])}
                                            onChange={(val) => setFestPageData({ ...festPageData, events: JSON.parse(val) })}
                                            fields={[
                                                { key: 'title', label: 'Event Title' },
                                                { key: 'date', label: 'Date', type: 'date' },
                                                { key: 'description', label: 'Short Description', type: 'textarea' },
                                                { key: 'image', label: 'Main Image', type: 'image' },
                                                { key: 'images', label: 'Gallery Images', type: 'image-list' }
                                            ]}
                                        />
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Hero Image</label>
                                            <ImageUpload value={festPageData.heroImage} onUpload={(url) => setFestPageData({ ...festPageData, heroImage: url })} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Update Fest Page</button>
                                    </form>
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Fest Data...</div>
                                )}
                            </div>
                        )}

                        {/* CORE BELIEFS TAB */}
                        {
                            activeTab === 'beliefs' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Core Beliefs</h2>
                                        <button onClick={() => { setEditingItem(null); setBeliefForm({ icon: 'FaStar', title: '', description: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Belief</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {coreBeliefs.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                                <div style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1.5rem' }}>
                                                    {/* Display icon name just as text for admin, or simple representation */}
                                                    <span style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9rem' }}>{item.icon}</span>
                                                </div>
                                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.description}</p>
                                                <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setBeliefForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* UG & PG COURSES REMOVED */}

                        {/* RESEARCH COURSES TAB */}
                        {
                            activeTab === 'research-courses' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Research Courses</h2>
                                        <button onClick={() => { setEditingItem(null); setUgCourseForm({ title: '', description: '', duration: '', eligibility: '', image: '', fees: '', category: 'Research' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Research Course</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {researchCourses.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', float: 'right' }}>{item.category || 'Research'}</span>
                                                    <h3 style={{ fontSize: '1.2rem' }}>{item.title}</h3>
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                                                        <p><strong>Duration:</strong> {item.duration}</p>
                                                        <p><strong>Fees:</strong> {item.fees}</p>
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.description}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setUgCourseForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* MANAGEMENT SUB-CATEGORIES TABS - REUSABLE COMPONENT LOGIC */}
                        {
                            ['leadership', 'administration', 'governance', 'chairperson', 'secretary', 'correspondent', 'principal', 'deans', 'founder', 'management'].includes(activeTab) && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Team</h2>
                                        <button onClick={() => {
                                            setEditingItem(null);
                                            // Default category based on activeTab
                                            let defaultCat = 'management';
                                            if (['chairperson', 'secretary', 'correspondent', 'principal', 'dean', 'founder'].includes(activeTab)) defaultCat = activeTab;
                                            if (activeTab === 'deans') defaultCat = 'dean';
                                            if (activeTab === 'administration') defaultCat = 'administration';
                                            if (activeTab === 'governance') defaultCat = 'governance';
                                            if (activeTab === 'leadership') defaultCat = 'management'; // Leadership usually general management?

                                            setMgmtForm({ name: '', designation: '', image_url: '', message: '', category: defaultCat, social: { facebook: '', instagram: '', x: '' } });
                                            setShowModal(true);
                                        }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Member</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {managementMembers.filter(item => {
                                            if (activeTab === 'management') return true; // Show all if generic tab (hidden now but logical fallback)
                                            if (activeTab === 'leadership') return item.category === 'management';
                                            if (activeTab === 'deans') return item.category === 'dean';
                                            return item.category === activeTab;
                                        }).map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid #FFD700' }}>
                                                <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                                                    <p style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.designation}</p>
                                                    <div style={{ marginBottom: '0.5rem' }}>
                                                        <span style={{ fontSize: '0.8rem', background: 'var(--glass-border)', padding: '2px 6px', borderRadius: '4px' }}>{item.category}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>{item.message}</p>
                                                    <div>{renderActionButtons(item, setMgmtForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* ADMISSIONS TAB */}
                        {
                            activeTab === 'admissions' && (
                                <div style={{ overflowX: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2 style={{ margin: 0 }}>Admissions</h2>
                                        <button
                                            onClick={handleExportAdmissions}
                                            className="btn btn-primary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            Download CSV ⬇
                                        </button>
                                    </div>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                        <thead>
                                            <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left' }}>
                                                <th style={{ padding: '1rem' }}>Name</th>
                                                <th style={{ padding: '1rem' }}>Email</th>
                                                <th style={{ padding: '1rem' }}>Phone</th>
                                                <th style={{ padding: '1rem' }}>Course</th>
                                                <th style={{ padding: '1rem' }}>Community</th>
                                                <th style={{ padding: '1rem' }}>District</th>
                                                <th style={{ padding: '1rem' }}>Status</th>
                                                <th style={{ padding: '1rem' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admissions.map(admission => (
                                                <tr key={admission._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                    <td style={{ padding: '1rem' }}>{admission.name}</td>
                                                    <td style={{ padding: '1rem' }}>{admission.email}</td>
                                                    <td style={{ padding: '1rem' }}>{admission.phone}</td>
                                                    <td style={{ padding: '1rem' }}>{admission.course}</td>
                                                    <td style={{ padding: '1rem' }}>{admission.community}</td>
                                                    <td style={{ padding: '1rem' }}>{admission.district}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <select
                                                            value={admission.status || 'Pending'}
                                                            onChange={(e) => handleUpdateAdmissionStatus(admission._id, e.target.value)}
                                                            className="custom-select"
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Reviewed">Reviewed</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <button onClick={() => handleGenericDelete(admission._id, '/api/admissions', setAdmissions)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                        {/* SCHOLARSHIPS TAB */}
                        {
                            activeTab === 'scholarships' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Scholarships</h2>
                                        <button onClick={() => { setEditingItem(null); setScholarshipForm({ name: '', provider: '', amount: '', eligibility: '', deadline: '', link: '', description: '', category: 'Merit' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Scholarship</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {scholarships.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', marginBottom: '0.5rem', display: 'inline-block' }}>{item.category}</span>
                                                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{item.name}</h3>
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-highlight)' }}>{item.provider}</p>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                                    <div><strong>Amount:</strong> {item.amount}</div>
                                                    <div><strong>Eligibility:</strong> {item.eligibility}</div>
                                                    <div><strong>Deadline:</strong> {item.deadline}</div>
                                                </div>
                                                <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setScholarshipForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* SESSIONS TAB */}
                        {
                            activeTab === 'sessions' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Sessions List</h2>
                                        <button onClick={() => { setEditingItem(null); setSessionForm({ title: '', startDate: '', endDate: '', status: 'Upcoming', description: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Session</button>
                                    </div>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead><tr style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}><th style={{ padding: '1rem' }}>Title</th><th style={{ padding: '1rem' }}>Dates</th><th style={{ padding: '1rem' }}>Status</th><th style={{ padding: '1rem' }}>Actions</th></tr></thead>
                                            <tbody>
                                                {sessions.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem' }}>{item.title}</td>
                                                        <td style={{ padding: '1rem' }}>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</td>
                                                        <td style={{ padding: '1rem' }}>{item.status}</td>
                                                        <td style={{ padding: '1rem' }}>{renderActionButtons(item, setSessionForm)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                        {/* HERO TAB */}
                        {
                            activeTab === 'hero' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Hero Slides</h2>
                                        <button onClick={() => { setEditingItem(null); setHeroForm({ image: '', title: '', subtitle: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Slide</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {heroSlides.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.subtitle}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setHeroForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* PAGE HEROES MANAGER TAB */}
                        {activeTab === 'pageHeroes' && (
                            <div>
                                <h2 style={{ marginBottom: '1.5rem' }}>Manage Page Hero Images</h2>
                                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                                    Update the top banner image for all dynamic pages, departments, and the library.
                                    (These images appear at the top of the respective pages)
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {pageHeroes.map(hero => (
                                        <div key={hero.id} style={{ background: 'var(--bg-section)', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ height: '180px', background: '#000', position: 'relative' }}>
                                                {hero.image ? (
                                                    <img src={hero.image} alt={hero.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No Image</div>
                                                )}
                                                <div style={{ position: 'absolute', inset: 0, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                                    <div style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{hero.type} | /{hero.slug}</div>
                                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>{hero.title || 'Untitled Page'}</div>
                                                    <div style={{ color: '#ccc', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hero.subtitle || 'No subtitle set'}</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '1.2rem', display: 'grid', gap: '0.8rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Page Title</label>
                                                    <input
                                                        type="text"
                                                        value={hero.title || ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setPageHeroes(prev => prev.map(h => h.id === hero.id ? { ...h, title: val } : h));
                                                        }}
                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.9rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Subtitle / Description</label>
                                                    <input
                                                        type="text"
                                                        value={hero.subtitle || ''}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setPageHeroes(prev => prev.map(h => h.id === hero.id ? { ...h, subtitle: val } : h));
                                                        }}
                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.9rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>Hero Image</label>
                                                    <ImageUpload
                                                        value={hero.image}
                                                        onUpload={(url) => {
                                                            setPageHeroes(prev => prev.map(h => h.id === hero.id ? { ...h, image: url } : h));
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const res = await fetch(`${API_BASE_URL}/api/update-hero`, {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    type: hero.type,
                                                                    id: hero.id,
                                                                    slug: hero.slug,
                                                                    image: hero.image,
                                                                    title: hero.title,
                                                                    subtitle: hero.subtitle
                                                                })
                                                            });
                                                            if (res.ok) {
                                                                alert(`Successfully updated hero for ${hero.slug}`);
                                                            } else {
                                                                alert('Failed to save to server');
                                                            }
                                                        } catch (e) {
                                                            alert('Error updating hero');
                                                        }
                                                    }}
                                                    style={{ marginTop: '0.5rem', background: 'var(--primary)', color: 'var(--bg-dark)', border: 'none', padding: '0.6rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                                                >
                                                    Save Hero Settings
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* ABOUT / FACULTY stats TAB */}
                        {
                            activeTab === 'about' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Faculty / Stats</h2>
                                        <button onClick={() => { setEditingItem(null); setFacultyStatForm({ value: '', label: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Stat</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {facultyStats.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                                                <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{item.value}</h3>
                                                <p style={{ fontSize: '0.9rem' }}>{item.label}</p>
                                                <div style={{ marginTop: '1rem', justifyContent: 'center', display: 'flex' }}>{renderActionButtons(item, setFacultyStatForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* PROGRAMS TAB */}
                        {
                            activeTab === 'programs' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Programs</h2>
                                        <button onClick={() => { setEditingItem(null); setProgramForm({ title: '', subtitle: '', description: '', image: '', color: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Program</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {programs.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                    />
                                                )}
                                                <div style={{ height: '5px', background: `linear-gradient(to right, var(--primary), var(--secondary))` }}></div>
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.2rem' }}>{item.title}</h3>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-highlight)' }}>{item.subtitle}</p>
                                                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: 'var(--text-muted)' }}>{item.description}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setProgramForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* NEWS & EVENTS TAB */}
                        {
                            activeTab === 'news' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>News & Events</h2>
                                        <button onClick={() => { setEditingItem(null); setNewsForm({ image: '', title: '', date: '', category: '', desc: '', pdf_url: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add News/Event</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {newsEvents.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                        <span>{item.date}</span>
                                                        <span>{item.category}</span>
                                                    </div>
                                                    <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{item.title}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setNewsForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }



                        {/* TICKER ALERTS TAB */}
                        {
                            activeTab === 'ticker-alerts' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Ticker Alerts</h2>
                                        <button onClick={() => { setEditingItem(null); setTickerForm({ message: '', link: '#', type: 'info', isActive: true }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Alert</button>
                                    </div>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                                                    <th style={{ padding: '1rem' }}>Message</th>
                                                    <th style={{ padding: '1rem' }}>Type</th>
                                                    <th style={{ padding: '1rem' }}>Status</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickerAlerts.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem' }}>{item.message}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{
                                                                padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem',
                                                                background: item.type === 'danger' ? 'rgba(239, 68, 68, 0.2)' : item.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                                                color: item.type === 'danger' ? '#ef4444' : item.type === 'warning' ? '#f59e0b' : '#3b82f6'
                                                            }}>
                                                                {item.type.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>{item.isActive ? 'Active' : 'Inactive'}</td>
                                                        <td style={{ padding: '1rem' }}>{renderActionButtons(item, setTickerForm)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                        {/* POPUP ALERT TAB */}
                        {
                            activeTab === 'popup-alert' && (
                                <div>
                                    <h2 style={{ marginBottom: '1.5rem' }}>Popup Alert Setting</h2>
                                    <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', maxWidth: '600px' }}>
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            try {
                                                const res = await fetch(`${API_BASE_URL}/api/popup-alert`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify(popupAlert)
                                                });
                                                if (res.ok) {
                                                    const saved = await res.json();
                                                    setPopupAlert(saved);
                                                    alert('Popup settings saved!');
                                                } else {
                                                    alert('Failed to save');
                                                }
                                            } catch (err) { alert('Error saving'); }
                                        }}>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Popup Image</label>
                                                <ImageUpload
                                                    value={popupAlert?.image || ''}
                                                    onUpload={(url) => setPopupAlert(prev => ({ ...prev, image: url }))}
                                                />
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Link URL (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={popupAlert?.link || ''}
                                                    onChange={(e) => setPopupAlert(prev => ({ ...prev, link: e.target.value }))}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                                                    placeholder="https://..."
                                                />
                                            </div>

                                            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={popupAlert?.isVisible ?? true}
                                                    onChange={(e) => setPopupAlert(prev => ({ ...prev, isVisible: e.target.checked }))}
                                                    id="popupVisible"
                                                    style={{ width: '20px', height: '20px' }}
                                                />
                                                <label htmlFor="popupVisible" style={{ cursor: 'pointer', color: 'var(--text-main)' }}>Enable Popup on Home Page</label>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Save Settings</button>
                                        </form>
                                    </div>
                                </div>
                            )
                        }

                        {/* DEPARTMENTS TAB */}
                        {
                            activeTab === 'departments' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Departments</h2>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button onClick={() => { setEditingItem(null); setDeptTab('details'); setDeptForm({ slug: '', type: 'UG', name: '', heroImage: '', overview: '', vision: '', mission: '', peo: '', pso: '', po: '', quickFacts: '[]', milestones: '[]', coreValues: '[]', hod: { name: '', designation: '', image: '', message: '' } }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Department</button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {departments.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.heroImage} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>HOD: {item.hod?.name}</p>
                                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                        <button onClick={() => startEditDepartment(item)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                                        <button onClick={() => handleGenericDelete(item._id, '/api/departments', setDepartments)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }



                        {/* RESOURCES TAB */}
                        {
                            activeTab === 'resources' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Resources</h2>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <select
                                                onChange={(e) => {
                                                    const cat = e.target.value;
                                                    // Trigger fetch with category filter (if backend supported it)
                                                    // For now, simpler to fetch all and filter client side or handle in future
                                                }}
                                                style={{ padding: '0.5rem', borderRadius: '5px' }}
                                            >
                                                <option value="">All Categories</option>
                                                <option value="Digital Library">Digital Library</option>
                                                <option value="Regulations">Regulations</option>
                                                <option value="Statutory Bodies">Statutory Bodies</option>
                                                <option value="Forms">Forms</option>
                                                <option value="Academic Calendar">Academic Calendar</option>
                                                <option value="Faculty Handbook">Faculty Handbook</option>
                                                <option value="Student Handbook">Student Handbook</option>
                                            </select>
                                            <button onClick={() => { setEditingItem(null); setResourceForm({ title: '', category: 'Digital Library', description: '', fileUrl: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Resource</button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {resources.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{item.title}</h3>
                                                        <span style={{ fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>{item.category}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.description}</p>
                                                    {item.fileUrl && <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontSize: '0.9rem', display: 'block', marginTop: '0.5rem' }}>View File/Link &rarr;</a>}
                                                </div>
                                                <div>{renderActionButtons(item, setResourceForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* PLACEMENT TAB */}
                        {
                            activeTab === 'placement' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Placement Partners</h2>
                                        <button onClick={() => { setEditingItem(null); setPlacementForm({ name: '', logo: '', row: 1 }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Partner</button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        {placements.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
                                                <div style={{ position: 'relative', width: '100%' }}>
                                                    <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: item.row === 2 ? 'var(--primary)' : 'var(--secondary)', color: 'white', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Row {item.row || 1}</div>
                                                </div>
                                                <img src={item.logo} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                                                <p style={{ fontWeight: '500', fontSize: '0.8rem', textAlign: 'center' }}>{item.name}</p>
                                                <div style={{ marginTop: '0.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>{renderActionButtons(item, setPlacementForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* MOMENTS TAB */}
                        {
                            activeTab === 'moments' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Moments</h2>
                                        <button onClick={() => { setEditingItem(null); setMomentForm({ title: '', description: '', image: '', date: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Moment</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {moments.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(item.date).toLocaleDateString()}</p>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>{item.description}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setMomentForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* ADVICE TAB */}
                        {
                            activeTab === 'advice' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Student & Alumni Advice</h2>
                                        <button onClick={() => { setEditingItem(null); setAdviceForm({ name: '', role: '', message: '', image: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Advice</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {advice.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                                <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{item.name}</h3>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.role}</p>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{item.message}"</p>
                                                    <div style={{ marginTop: '0.5rem' }}>{renderActionButtons(item, setAdviceForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* SPORTS TAB */}
                        {
                            activeTab === 'sports' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Sports Facilities</h2>
                                        <button onClick={() => { setEditingItem(null); setSportForm({ name: '', type: 'Outdoor', count: '', image: '', description: '', gallery: '[]' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Sport</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {sports.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                                                        <span style={{ fontSize: '0.75rem', background: 'var(--secondary)', color: 'black', padding: '2px 8px', borderRadius: '12px', height: 'fit-content' }}>{item.type}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.count}</p>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>{item.description}</p>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-highlight)', marginBottom: '0.5rem' }}>
                                                        {item.gallery && item.gallery.length} Photos in Gallery
                                                    </div>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons({
                                                        ...item,
                                                        gallery: JSON.stringify(item.gallery ? item.gallery.map(url => ({ url })) : [])
                                                    }, setSportForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* GALLERY TAB */}
                        {
                            activeTab === 'gallery' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Gallery Events</h2>
                                        <button onClick={() => { setEditingItem(null); setGalleryEventForm({ eventName: '', date: '', photos: '[]' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Event</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {gallery.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                {/* Cover Image from first photo */}
                                                <div style={{ height: '200px', background: '#000', position: 'relative' }}>
                                                    {item.photos && item.photos.length > 0 ? (
                                                        <img src={item.photos[0].src} alt={item.eventName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>No Photos</div>
                                                    )}
                                                </div>
                                                <div style={{ padding: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{item.eventName}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                                        {item.date ? new Date(item.date).toLocaleDateString() : 'No Date'} • {item.photos?.length || 0} Photos
                                                    </p>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button onClick={() => startEditGalleryEvent(item)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                                        <button onClick={() => handleGenericDelete(item._id, '/api/gallery-events', setGallery)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* VIDEO GALLERY TAB */}
                        {
                            activeTab === 'video-gallery' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Video Gallery</h2>
                                        <button onClick={() => { setEditingItem(null); setVideoForm({ title: '', url: '', thumbnail: '', category: 'General' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Video</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {videos.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', padding: '1rem' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</div>
                                                <div style={{ wordBreak: 'break-all', color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.url}</div>
                                                <div>{renderActionButtons(item, setVideoForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* VIRTUAL TOUR TAB */}
                        {
                            activeTab === 'virtual-tour' && (
                                <div>
                                    <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '16px' }}>
                                        <h2>Virtual Tour Settings</h2>
                                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Update the 360-degree virtual tour link shown on the website.</p>
                                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                                            {renderInput('Tour URL (Iframe src)', 'tourUrl', virtualTour?.tourUrl || '', (e) => setVirtualTour({ ...virtualTour, tourUrl: e.target.value }))}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                                                <textarea
                                                    value={virtualTour?.description || ''}
                                                    onChange={(e) => setVirtualTour({ ...virtualTour, description: e.target.value })}
                                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', minHeight: '100px' }}
                                                />
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const res = await fetch(`${API_BASE_URL}/api/virtual-tour`, {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(virtualTour)
                                                        });
                                                        if (res.ok) alert('Virtual Tour Updated!');
                                                        else alert('Failed to update');
                                                    } catch (e) { alert('Error updating'); }
                                                }}
                                                className="btn btn-primary"
                                                style={{ marginTop: '1rem' }}
                                            >
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* PAGES TAB */}
                        {
                            activeTab === 'pages' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Dynamic Pages</h2>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={async () => {
                                                    const corePages = [
                                                        'hostel', 'sports', 'amenities', 'fest', 'cells',
                                                        'associations', 'clubs', 'wellness', 'cafeteria', 'food-court'
                                                    ];
                                                    let added = 0;
                                                    setLoading(true);
                                                    try {
                                                        const existingSlugs = pages.map(p => p.slug);
                                                        for (const slug of corePages) {
                                                            if (!existingSlugs.includes(slug)) {
                                                                const res = await fetch(`${API_BASE_URL}/api/pages`, {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({
                                                                        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
                                                                        slug: slug,
                                                                        subtitle: 'Manage Content Here',
                                                                        heroImage: '',
                                                                        content: 'Default Content',
                                                                        sections: []
                                                                    })
                                                                });
                                                                if (res.ok) added++;
                                                            }
                                                        }
                                                        if (added > 0) {
                                                            alert(`Added ${added} missing core pages.`);
                                                            fetchData('pages');
                                                        } else {
                                                            alert('All core pages already exist.');
                                                        }
                                                    } catch (e) { console.error(e); alert('Error syncing pages'); }
                                                    finally { setLoading(false); }
                                                }}
                                                style={{ background: '#4CAF50', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            >
                                                ↻ Sync Core Pages
                                            </button>
                                            <button onClick={() => { setEditingItem(null); setPageForm({ title: '', slug: '', subtitle: '', heroImage: '', content: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Page</button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {pages.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                                                    <small style={{ color: 'var(--text-muted)' }}>/{item.slug}</small>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <a href={`/page/${item.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-highlight)', fontSize: '0.9rem', textDecoration: 'underline' }}>View Page</a>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button onClick={() => startEditPage(item)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                                        <button onClick={() => handleGenericDelete(item._id, '/api/pages', setPages)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'research-items' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Research Items</h2>
                                        <button onClick={() => { setEditingItem(null); setResearchForm({ title: '', category: 'department-research', type: '', description: '', author: '', department: '', year: new Date().getFullYear().toString(), link: '', image: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Item</button>
                                    </div>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {researchItems.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
                                                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{item.category}</span>
                                                        <span>{item.type}</span>
                                                        <span>{item.year}</span>
                                                    </div>
                                                </div>
                                                <div>{renderActionButtons(item, setResearchForm)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }



                        {/* CAREERS TAB */}
                        {
                            activeTab === 'careers' && !showModal && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Career Opportunities</h2>
                                        <button onClick={() => {
                                            setEditingItem(null);
                                            setCareerForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', responsibilities: '', salary: '', status: 'Active', closingDate: '' });
                                            setShowModal(true);
                                        }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Career</button>
                                    </div>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {careers.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h3 style={{ margin: 0, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                                                            <span>🏢 {item.department}</span>
                                                            <span>📍 {item.location}</span>
                                                            <span>⏰ {item.type}</span>
                                                            <span style={{
                                                                background: item.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                                color: item.status === 'Active' ? '#22c55e' : '#ef4444',
                                                                padding: '2px 8px',
                                                                borderRadius: '4px',
                                                                fontWeight: '600'
                                                            }}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button onClick={() => startEditCareer(item)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                                        <button onClick={() => handleGenericDelete(item._id, '/api/careers', setCareers)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                    </div>
                                                </div>
                                                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0', lineHeight: '1.6' }}>{item.description}</p>
                                                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                                    <span style={{ color: 'var(--text-highlight)', fontWeight: '600' }}>💰 {item.salary}</span>
                                                    {item.closingDate && (
                                                        <span style={{ color: 'var(--text-muted)' }}>
                                                            Closes: {new Date(item.closingDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* LIFE OF EASA TAB */}
                        {
                            activeTab === 'life-of-EASA' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Life at EASA</h2>
                                        <button onClick={() => { setEditingItem(null); setLifeOfEASAForm({ imageUrl: '', title: '', category: '', description: '' }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Item</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                        {lifeOfEASA.map(item => (
                                            <div key={item._id} style={{ background: 'var(--bg-section)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                <div style={{ padding: '1rem' }}>
                                                    <span style={{ fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>{item.category}</span>
                                                    <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{item.title}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.description}</p>
                                                    <div style={{ marginTop: '1rem' }}>{renderActionButtons(item, setLifeOfEASAForm)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* MILESTONES TAB */}
                        {
                            activeTab === 'milestones' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>Institute Milestones</h2>
                                        <button onClick={() => { setEditingItem(null); setMilestoneForm({ year: '', title: '', description: '', order: 0 }); setShowModal(true); }} style={{ background: 'white', color: 'black', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Milestone</button>
                                    </div>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                                    <th style={{ padding: '1rem' }}>Year</th>
                                                    <th style={{ padding: '1rem' }}>Title</th>
                                                    <th style={{ padding: '1rem' }}>Description</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {instituteMilestones.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem' }}>{item.year}</td>
                                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.title}</td>
                                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.description}</td>
                                                        <td style={{ padding: '1rem' }}>{renderActionButtons(item, setMilestoneForm)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }




                        {/* ALUMNI TAB */}
                        {
                            activeTab === 'alumni' && (
                                <div>

                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                                                    <th style={{ padding: '1rem' }}>Name</th>
                                                    <th style={{ padding: '1rem' }}>Batch</th>
                                                    <th style={{ padding: '1rem' }}>Dept</th>
                                                    <th style={{ padding: '1rem' }}>Job</th>
                                                    <th style={{ padding: '1rem' }}>Contact</th>
                                                    <th style={{ padding: '1rem' }}>Status</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {alumni.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <img src={item.photoUrl || 'https://via.placeholder.com/40'} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                                            {item.name}
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>{item.batch}</td>
                                                        <td style={{ padding: '1rem' }}>{item.department}</td>
                                                        <td style={{ padding: '1rem' }}>{item.currentJob}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ fontSize: '0.8rem' }}>{item.email}</div>
                                                            <div style={{ fontSize: '0.8rem' }}>{item.phone}</div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <select
                                                                value={item.status}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.value;
                                                                    try {
                                                                        await fetch(`${API_BASE_URL}/api/alumni/${item._id}`, {
                                                                            method: 'PUT',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ status: newStatus })
                                                                        });
                                                                        fetchData('alumni');
                                                                    } catch (err) { console.error(err); }
                                                                }}
                                                                style={{ padding: '0.3rem', borderRadius: '4px' }}
                                                            >
                                                                <option value="Pending">Pending</option>
                                                                <option value="Approved">Approved</option>
                                                                <option value="Rejected">Rejected</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <button onClick={() => handleGenericDelete(item._id, '/api/alumni', setAlumni)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                        {/* GRIEVANCES TAB */}
                        {
                            activeTab === 'grievances' && (
                                <div>
                                    <div style={{ overflowX: 'auto' }}>
                                        <h2 style={{ marginBottom: '1.5rem' }}>Grievances / Feedback</h2>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left' }}>
                                                    <th style={{ padding: '1rem' }}>Name</th>
                                                    <th style={{ padding: '1rem' }}>Type</th>
                                                    <th style={{ padding: '1rem' }}>Subject</th>
                                                    <th style={{ padding: '1rem' }}>Message</th>
                                                    <th style={{ padding: '1rem' }}>Contact</th>
                                                    <th style={{ padding: '1rem' }}>Status</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {grievances.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div>{item.name}</div>
                                                            {item.rollNo && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Roll: {item.rollNo}</div>}
                                                            {item.department && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dept: {item.department}</div>}
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{ fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{item.type}</span>
                                                        </td>
                                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.subject}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ maxWidth: '300px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.message}</div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ fontSize: '0.8rem' }}>{item.email}</div>
                                                            <div style={{ fontSize: '0.8rem' }}>{item.phone}</div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <select
                                                                value={item.status || 'Pending'}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.value;
                                                                    try {
                                                                        await fetch(`${API_BASE_URL}/api/grievances/${item._id}`, {
                                                                            method: 'PUT',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ status: newStatus })
                                                                        });
                                                                        fetchData('grievances');
                                                                    } catch (err) { console.error(err); }
                                                                }}
                                                                className="custom-select"
                                                            >
                                                                <option value="Pending">Pending</option>
                                                                <option value="Reviewed">Reviewed</option>
                                                                <option value="Resolved">Resolved</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <button onClick={() => handleGenericDelete(item._id, '/api/grievances', setGrievances)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                        {/* ENQUIRIES TAB */}
                        {
                            activeTab === 'enquiries' && (
                                <div>

                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                                                    <th style={{ padding: '1rem' }}>Date</th>
                                                    <th style={{ padding: '1rem' }}>Name</th>
                                                    <th style={{ padding: '1rem' }}>Email</th>
                                                    <th style={{ padding: '1rem' }}>Phone</th>
                                                    <th style={{ padding: '1rem' }}>Message</th>
                                                    <th style={{ padding: '1rem' }}>Status</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enquiries.map(item => (
                                                    <tr key={item._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                            {new Date(item.submittedAt).toLocaleDateString()}
                                                        </td>
                                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.name}</td>
                                                        <td style={{ padding: '1rem' }}>{item.email}</td>
                                                        <td style={{ padding: '1rem' }}>{item.phone}</td>
                                                        <td style={{ padding: '1rem', maxWidth: '300px' }}>{item.message}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <select
                                                                value={item.status}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.value;
                                                                    try {
                                                                        await fetch(`${API_BASE_URL}/api/enquiry/${item._id}`, {
                                                                            method: 'PUT',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ status: newStatus })
                                                                        });
                                                                        fetchData('enquiries');
                                                                    } catch (err) { console.error(err); }
                                                                }}
                                                                style={{ padding: '0.3rem', borderRadius: '4px', background: item.status === 'New' ? '#3b82f6' : 'var(--bg-input)', color: item.status === 'New' ? 'white' : 'var(--text-main)' }}
                                                            >
                                                                <option value="New">New</option>
                                                                <option value="Contacted">Contacted</option>
                                                                <option value="Resolved">Resolved</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <button onClick={() => handleGenericDelete(item._id, '/api/enquiry', setEnquiries)} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'institution' && renderSingletonForm(institution, setInstitution, '/api/institution', [
                                { key: 'title', label: 'Page Title' },
                                { key: 'subtitle', label: 'Header Subtitle' },
                                { key: 'heroImage', label: 'Hero Image', type: 'image' },
                                { key: 'content', label: 'General Content', type: 'textarea' },
                                { key: 'history', label: 'History Content', type: 'textarea' },
                                { key: 'legacy', label: 'Legacy Content', type: 'textarea' }
                            ])
                        }

                        {
                            activeTab === 'infrastructure' && renderSingletonForm(infrastructure, setInfrastructure, '/api/infrastructure', [
                                { key: 'title', label: 'Page Title' },
                                { key: 'subtitle', label: 'Header Subtitle' },
                                { key: 'heroImage', label: 'Hero Image', type: 'image' },
                                { key: 'description', label: 'Main Description', type: 'textarea' },
                            ])
                        }

                        {
                            activeTab === 'sustainability' && renderSingletonForm(sustainability, setSustainability, '/api/sustainability', [
                                { key: 'title', label: 'Page Title' },
                                { key: 'subtitle', label: 'Header Subtitle' },
                                { key: 'heroImage', label: 'Hero Image', type: 'image' },
                                { key: 'description', label: 'Main Description', type: 'textarea' },
                            ])
                        }

                        {
                            activeTab === 'community-outreach' && renderSingletonForm(communityOutreach, setCommunityOutreach, '/api/community-outreach', [
                                { key: 'title', label: 'Page Title' },
                                { key: 'subtitle', label: 'Header Subtitle' },
                                { key: 'heroImage', label: 'Hero Image', type: 'image' },
                                { key: 'description', label: 'Main Description', type: 'textarea' },
                            ])
                        }

                        {/* PLACEMENT PAGE TAB */}
                        {activeTab === 'placement-page' && placementData && (
                            <form onSubmit={handlePlacementSubmit} style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="glass-card">
                                    <h3>Hero & Overview</h3>
                                    <ImageUpload value={placementData.heroImage} onUpload={(url) => setPlacementData({ ...placementData, heroImage: url })} />
                                    <div style={{ marginTop: '1rem' }}></div>
                                    {renderInput('Page Title', 'name', placementData.name, (e) => setPlacementData({ ...placementData, name: e.target.value }))}
                                    {renderInput('Vision', 'vision', placementData.vision, (e) => setPlacementData({ ...placementData, vision: e.target.value }))}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Overview</label>
                                        <textarea
                                            value={placementData.overview}
                                            onChange={(e) => setPlacementData({ ...placementData, overview: e.target.value })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)', minHeight: '100px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mission (One per line)</label>
                                        <textarea
                                            value={Array.isArray(placementData.mission) ? placementData.mission.join('\n') : placementData.mission}
                                            onChange={(e) => setPlacementData({ ...placementData, mission: e.target.value.split('\n') })}
                                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)', minHeight: '100px' }}
                                        />
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3>Contact Info</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {renderInput('Contact Name', 'c_name', placementData.contact?.name, (e) => setPlacementData({ ...placementData, contact: { ...placementData.contact, name: e.target.value } }))}
                                        {renderInput('Designation', 'c_desig', placementData.contact?.designation, (e) => setPlacementData({ ...placementData, contact: { ...placementData.contact, designation: e.target.value } }))}
                                        {renderInput('Email', 'c_email', placementData.contact?.email, (e) => setPlacementData({ ...placementData, contact: { ...placementData.contact, email: e.target.value } }))}
                                        {renderInput('Phone', 'c_phone', placementData.contact?.phone, (e) => setPlacementData({ ...placementData, contact: { ...placementData.contact, phone: e.target.value } }))}
                                    </div>
                                    {renderInput('Address', 'c_addr', placementData.contact?.address, (e) => setPlacementData({ ...placementData, contact: { ...placementData.contact, address: e.target.value } }))}
                                </div>

                                <div className="glass-card">
                                    <h3>Recruiters (Logos)</h3>
                                    <DynamicJsonBuilder
                                        label="Recruiters List"
                                        value={JSON.stringify(placementData.recruiters || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, recruiters: JSON.parse(val) })}
                                        fields={[
                                            { key: 'name', label: 'Company Name' },
                                            { key: 'logo', label: 'Logo', type: 'image' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Statistics & Charts</h3>
                                    <DynamicJsonBuilder
                                        label="Placement Stats"
                                        value={JSON.stringify(placementData.stats || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, stats: JSON.parse(val) })}
                                        fields={[
                                            { key: 'label', label: 'Label' },
                                            { key: 'value', label: 'Value' },
                                            { key: 'icon', label: 'Icon (e.g. FaRocket)' }
                                        ]}
                                    />
                                    <div style={{ marginTop: '1rem' }}></div>
                                    <DynamicJsonBuilder
                                        label="Branch-wise Data"
                                        value={JSON.stringify(placementData.branchData || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, branchData: JSON.parse(val) })}
                                        fields={[
                                            { key: 'branch', label: 'Branch' },
                                            { key: 'placed', label: 'Placed %' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Programs & Internships</h3>
                                    <DynamicJsonBuilder
                                        label="Training Programs"
                                        value={JSON.stringify(placementData.trainingPrograms || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, trainingPrograms: JSON.parse(val) })}
                                        fields={[
                                            { key: 'title', label: 'Title' },
                                            { key: 'desc', label: 'Description' }
                                        ]}
                                    />
                                    <div style={{ marginTop: '1rem' }}></div>
                                    <DynamicJsonBuilder
                                        label="Internships"
                                        value={JSON.stringify(placementData.internships || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, internships: JSON.parse(val) })}
                                        fields={[
                                            { key: 'company', label: 'Company' },
                                            { key: 'role', label: 'Role' },
                                            { key: 'stipend', label: 'Stipend' },
                                            { key: 'duration', label: 'Duration' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Testimonials</h3>
                                    <DynamicJsonBuilder
                                        label="Student Testimonials"
                                        value={JSON.stringify(placementData.testimonials || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, testimonials: JSON.parse(val) })}
                                        fields={[
                                            { key: 'name', label: 'Student Name' },
                                            { key: 'branch', label: 'Branch' },
                                            { key: 'company', label: 'Placed In' },
                                            { key: 'text', label: 'Testimonial' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Placement Process</h3>
                                    <DynamicJsonBuilder
                                        label="Process Steps"
                                        value={JSON.stringify(placementData.process || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, process: JSON.parse(val) })}
                                        fields={[
                                            { key: 'step', label: 'Step Number' },
                                            { key: 'title', label: 'Title' },
                                            { key: 'desc', label: 'Description' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Gallery</h3>
                                    <DynamicJsonBuilder
                                        label="Gallery Images"
                                        value={JSON.stringify((placementData.gallery || []).map(img => ({ url: img })))}
                                        onChange={(val) => setPlacementData({ ...placementData, gallery: JSON.parse(val).map(item => item.url) })}
                                        fields={[
                                            { key: 'url', label: 'Image', type: 'image' }
                                        ]}
                                    />
                                </div>

                                <div className="glass-card">
                                    <h3>Downloads</h3>
                                    <DynamicJsonBuilder
                                        label="Downloadable Files"
                                        value={JSON.stringify(placementData.downloads || [])}
                                        onChange={(val) => setPlacementData({ ...placementData, downloads: JSON.parse(val) })}
                                        fields={[
                                            { key: 'title', label: 'File Title' },
                                            { key: 'size', label: 'Size (e.g. 2MB)' },
                                            { key: 'fileType', label: 'Type (e.g. PDF)' },
                                            { key: 'fileUrl', label: 'PDF File', type: 'file' }
                                        ]}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Placement Page</button>
                            </form>
                        )
                        }

                        {/* USER MANAGEMENT TAB */}
                        {
                            activeTab === 'users' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2>User Management</h2>
                                        <button onClick={() => { setEditingItem(null); setUserForm({ username: '', password: '', role: 'admin' }); setShowModal(true); }} className="btn btn-primary">+ Add User</button>
                                    </div>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                                                    <th style={{ padding: '1rem' }}>Username</th>
                                                    <th style={{ padding: '1rem' }}>Role</th>
                                                    <th style={{ padding: '1rem' }}>Created At</th>
                                                    <th style={{ padding: '1rem' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(user => (
                                                    <tr key={user._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                        <td style={{ padding: '1rem' }}>{user.username}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{
                                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem',
                                                                background: user.role === 'superadmin' ? 'var(--primary)' : 'var(--glass-highlight)',
                                                                color: 'white'
                                                            }}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm('Are you sure you want to delete this user?')) {
                                                                        handleGenericDelete(user._id, '/api/users', setUsers);
                                                                    }
                                                                }}
                                                                style={{ background: '#ff4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                    </div >
                )}
            </div >
        </div >
    );
};

export default AdminDashboard;
