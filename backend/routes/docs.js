/**
 * Route Documentation & API Explorer for EASA College Backend
 * Provides:
 *   - GET /api/docs        - Interactive HTML documentation and API explorer
 *   - GET /api/routes      - Machine-readable JSON list of all routes & schemas
 *   - GET /api/docs/json   - Alias for JSON format
 */

const express = require('express');
const router = express.Router();

// Authoritative Catalog of EASA College Backend Routes
const routesCatalog = [
    // -------------------------------------------------------------
    // SYSTEM & HEALTH MONITORING
    // -------------------------------------------------------------
    {
        category: "System & Health",
        method: "GET",
        path: "/health",
        auth: "Public",
        description: "Root-level system health check: verifies database connection, memory usage, uptime, and storage status.",
        params: [],
        queryParams: [
            { name: "tolerant", type: "boolean", description: "If true, returns 200 even if database is connecting/degraded" }
        ],
        sampleResponse: {
            status: "healthy",
            timestamp: "2026-10-27T10:00:00.000Z",
            uptime: { seconds: 12450, human: "3h 27m 30s" },
            database: { status: "connected", readyState: 1, host: "cluster0.mongodb.net", name: "easa-db" },
            storage: { driver: "aws-s3", bucket: "easa-college", region: "eu-north-1" },
            system: { nodeVersion: "v20.x", platform: "win32", pid: 1420, memory: { rssMB: 110, heapUsedMB: 54 } }
        }
    },
    {
        category: "System & Health",
        method: "GET",
        path: "/api/health",
        auth: "Public",
        description: "API-prefixed health check endpoint returning detailed operational status for microservices and monitoring dashboards.",
        params: [],
        queryParams: [],
        sampleResponse: {
            status: "healthy",
            database: "connected",
            uptime: { seconds: 12450, human: "3h 27m 30s" },
            timestamp: "2026-10-27T10:00:00.000Z"
        }
    },
    {
        category: "System & Health",
        method: "GET",
        path: "/health/ping",
        auth: "Public",
        description: "Lightweight ping endpoint for load balancer and container liveness probes.",
        params: [],
        sampleResponse: { status: "ok", pong: true, time: 1730000000000 }
    },
    {
        category: "System & Health",
        method: "GET",
        path: "/api/debug-config",
        auth: "Public",
        description: "Returns storage engine configuration and verifies local upload directories securely.",
        params: [],
        sampleResponse: { storage: "local", upload_dir_exists: true }
    },
    {
        category: "System & Health",
        method: "GET",
        path: "/api/routes",
        auth: "Public",
        description: "Returns complete structured JSON catalog of all registered API endpoints, methods, parameters, and authentication rules.",
        params: [],
        sampleResponse: { totalRoutes: 75, version: "1.0.0", routes: [] }
    },
    {
        category: "System & Health",
        method: "GET",
        path: "/api/docs",
        auth: "Public",
        description: "Interactive visual API documentation and endpoint explorer dashboard.",
        params: []
    },

    // -------------------------------------------------------------
    // SUSTAINABLE DEVELOPMENT GOALS (SDG) & IMAGES
    // -------------------------------------------------------------
    {
        category: "SDG Goals & Images",
        method: "GET",
        path: "/api/sdgs",
        auth: "Public",
        description: "Retrieve all 17 UN Sustainable Development Goals and campus Eco-Stewardship initiatives. Supports category filtering.",
        queryParams: [
            { name: "category", type: "string", description: "Filter by 'goal' (17 UN Goals) or 'initiative' (Campus green projects)" }
        ],
        sampleResponse: [
            {
                _id: "671e...",
                goalNumber: 1,
                title: "No Poverty",
                subTitle: "Free Education, Rural Empowerment & Skill Training",
                color: "#E5243B",
                bgLight: "#FDE8EA",
                icon: "https://.../sdg1.png",
                image: "https://images.unsplash.com/...",
                description: "EASA provides 100% tuition-free scholarships...",
                category: "goal",
                metric: "350+ Annual Free Seats"
            }
        ]
    },
    {
        category: "SDG Goals & Images",
        method: "GET",
        path: "/api/sdgs/:id",
        auth: "Public",
        description: "Get details for a specific SDG goal or initiative by MongoDB _id or goalNumber (1-17).",
        params: [
            { name: "id", type: "string / number", description: "MongoDB ObjectID or numeric Goal Number (1-17)" }
        ]
    },
    {
        category: "SDG Goals & Images",
        method: "POST",
        path: "/api/sdgs",
        auth: "Admin / JWT",
        description: "Create a new SDG goal card or green campus initiative entry.",
        requestBody: {
            goalNumber: 18,
            title: "Campus Biodiversity Corridor",
            subTitle: "Native Botanical Preservation",
            color: "#2E7D32",
            image: "https://...",
            icon: "https://...",
            description: "Preservation of 25+ native flora species...",
            category: "initiative",
            metric: "12,000+ Native Trees"
        }
    },
    {
        category: "SDG Goals & Images",
        method: "PUT",
        path: "/api/sdgs/:id",
        auth: "Admin / JWT",
        description: "Full update of an SDG item's data, metrics, color, and images.",
        params: [{ name: "id", type: "string", description: "MongoDB ObjectID" }]
    },
    {
        category: "SDG Goals & Images",
        method: "PATCH",
        path: "/api/sdgs/:id",
        auth: "Admin / JWT",
        description: "Partial update of an SDG item (e.g. quick replacement of card photo or UN icon).",
        params: [{ name: "id", type: "string", description: "MongoDB ObjectID" }],
        requestBody: {
            image: "https://...",
            icon: "https://..."
        }
    },
    {
        category: "SDG Goals & Images",
        method: "DELETE",
        path: "/api/sdgs/:id",
        auth: "Admin / JWT",
        description: "Delete an SDG item from the database.",
        params: [{ name: "id", type: "string", description: "MongoDB ObjectID" }]
    },
    {
        category: "SDG Goals & Images",
        method: "GET",
        path: "/api/sdg-images",
        auth: "Public",
        description: "Convenience alias endpoint to fetch SDG images and goals.",
        params: []
    },
    {
        category: "SDG Goals & Images",
        method: "PATCH",
        path: "/api/sdg-images/:id",
        auth: "Admin / JWT",
        description: "Convenience alias for 1-click update of SDG card image or icon.",
        params: [{ name: "id", type: "string", description: "MongoDB ObjectID" }]
    },

    // -------------------------------------------------------------
    // AUTHENTICATION & USERS
    // -------------------------------------------------------------
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/login",
        auth: "Public",
        description: "Master administrative login endpoint using admin password.",
        requestBody: { password: "admin123" },
        sampleResponse: { success: true, token: "jwt_token_here", user: { role: "admin" } }
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/auth/login",
        auth: "Public",
        description: "Standard user login for students, faculty, and HODs using email/username and password.",
        requestBody: { username: "faculty1", password: "password123" },
        sampleResponse: { success: true, token: "jwt_token", user: { id: "...", role: "faculty" } }
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/auth/register",
        auth: "Public",
        description: "Self-registration endpoint for faculty or students. Requires admin approval before full activation.",
        requestBody: { username: "john_doe", email: "john@easa.ac.in", password: "...", role: "faculty", department: "cse" }
    },
    {
        category: "Auth & Users",
        method: "GET",
        path: "/api/auth/profile",
        auth: "Bearer JWT",
        description: "Get authenticated profile details of the current logged-in user."
    },
    {
        category: "Auth & Users",
        method: "GET",
        path: "/api/auth/verify",
        auth: "Bearer JWT",
        description: "Verify if the provided JWT authorization token is valid and not expired."
    },
    {
        category: "Auth & Users",
        method: "GET",
        path: "/api/auth/pending-approvals",
        auth: "Admin / JWT",
        description: "List users who registered and are pending administrator approval."
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/auth/approve-user/:userId",
        auth: "Admin / JWT",
        description: "Approve a pending user registration.",
        params: [{ name: "userId", type: "string", description: "User ID" }]
    },
    {
        category: "Auth & Users",
        method: "DELETE",
        path: "/api/auth/reject-user/:userId",
        auth: "Admin / JWT",
        description: "Reject and delete a pending user registration.",
        params: [{ name: "userId", type: "string", description: "User ID" }]
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/auth/forgot-password",
        auth: "Public",
        description: "Request a password reset link or OTP sent to user's registered email address.",
        requestBody: { email: "user@example.com" }
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/auth/reset-password",
        auth: "Public",
        description: "Reset account password using reset token.",
        requestBody: { token: "...", newPassword: "..." }
    },
    {
        category: "Auth & Users",
        method: "GET",
        path: "/api/users",
        auth: "Admin / JWT",
        description: "List all users in the system with their roles, departments, and status."
    },
    {
        category: "Auth & Users",
        method: "POST",
        path: "/api/users",
        auth: "Admin / JWT",
        description: "Admin directly creates a new user account.",
        requestBody: { username: "prof_kumar", email: "kumar@easa.ac.in", password: "...", role: "hod", department: "cse" }
    },
    {
        category: "Auth & Users",
        method: "PUT",
        path: "/api/users/:id",
        auth: "Admin / JWT",
        description: "Update user account information and role.",
        params: [{ name: "id", type: "string", description: "User ID" }]
    },
    {
        category: "Auth & Users",
        method: "DELETE",
        path: "/api/users/:id",
        auth: "Admin / JWT",
        description: "Delete user account from system.",
        params: [{ name: "id", type: "string", description: "User ID" }]
    },

    // -------------------------------------------------------------
    // ACADEMICS, DEPARTMENTS & OUTCOMES
    // -------------------------------------------------------------
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/departments",
        auth: "Public",
        description: "List all engineering and management departments at EASA College with basic stats.",
        sampleResponse: [{ name: "Computer Science and Engineering", slug: "cse", degree: "B.E.", duration: "4 Years" }]
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/departments/:slug",
        auth: "Public",
        description: "Get full department dossier: HOD message, vision/mission, faculty, labs, curriculum, and regulations.",
        params: [{ name: "slug", type: "string", description: "Department slug e.g. 'cse', 'mech', 'civil', 'aids', 'biomedical'" }]
    },
    {
        category: "Academics & Departments",
        method: "PUT",
        path: "/api/departments/:slug",
        auth: "Admin / JWT",
        description: "Update department details, syllabus data, and lab facilities.",
        params: [{ name: "slug", type: "string", description: "Department slug" }]
    },
    {
        category: "Academics & Departments",
        method: "POST",
        path: "/api/departments/scan-syllabus-word",
        auth: "Admin / JWT",
        description: "Upload and parse a Word (.docx) curriculum syllabus file automatically into structured course units.",
        requestBody: "multipart/form-data: file (.docx)"
    },
    {
        category: "Academics & Departments",
        method: "POST",
        path: "/api/departments/scan-syllabus-excel",
        auth: "Admin / JWT",
        description: "Upload and parse an Excel (.xlsx) syllabus / CO-PO mapping sheet.",
        requestBody: "multipart/form-data: file (.xlsx)"
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/departments/all/master-courses",
        auth: "Public",
        description: "Retrieve master index of all courses, course codes, credits, and semesters across all branches."
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/department-labs",
        auth: "Public",
        description: "List specialized departmental laboratories, equipment, and research infrastructure."
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/ug-courses",
        auth: "Public",
        description: "List all courses offered: Undergraduate (B.E./B.Tech), Postgraduate (M.E./MBA), and Ph.D research programs."
    },
    {
        category: "Academics & Departments",
        method: "POST",
        path: "/api/ug-courses",
        auth: "Admin / JWT",
        description: "Add a new course or degree program.",
        requestBody: { title: "B.Tech Artificial Intelligence & Data Science", duration: "4 Years", eligibility: "10+2 with PCM", category: "UG" }
    },
    {
        category: "Academics & Departments",
        method: "PUT",
        path: "/api/ug-courses/:id",
        auth: "Admin / JWT",
        description: "Update course details and syllabus.",
        params: [{ name: "id", type: "string", description: "Course ID" }]
    },
    {
        category: "Academics & Departments",
        method: "DELETE",
        path: "/api/ug-courses/:id",
        auth: "Admin / JWT",
        description: "Remove course offering.",
        params: [{ name: "id", type: "string", description: "Course ID" }]
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/outcomes",
        auth: "Bearer JWT",
        description: "Fetch Program Outcomes (PO1-PO11), Program Specific Outcomes (PSOs), and PEOs for a department.",
        queryParams: [{ name: "department", type: "string", description: "Department slug or identifier" }]
    },
    {
        category: "Academics & Departments",
        method: "POST",
        path: "/api/outcomes/save",
        auth: "Admin or HOD / JWT",
        description: "Save or update program outcomes, descriptors, and graduate attributes.",
        requestBody: { department: "cse", type: "PO", code: "PO1", description: "Engineering Knowledge..." }
    },
    {
        category: "Academics & Departments",
        method: "DELETE",
        path: "/api/outcomes/:id",
        auth: "Admin or HOD / JWT",
        description: "Delete an outcome entry.",
        params: [{ name: "id", type: "string", description: "Outcome ID" }]
    },
    {
        category: "Academics & Departments",
        method: "GET",
        path: "/api/admissions/export",
        auth: "Admin / JWT",
        description: "Export admission applications to Excel or CSV format."
    },

    // -------------------------------------------------------------
    // FACULTY & LEADERSHIP
    // -------------------------------------------------------------
    {
        category: "Faculty & Leadership",
        method: "GET",
        path: "/api/faculty",
        auth: "Public",
        description: "List all teaching faculty members with their department, designation, qualifications, research, and contact info.",
        queryParams: [{ name: "department", type: "string", description: "Filter by department" }]
    },
    {
        category: "Faculty & Leadership",
        method: "POST",
        path: "/api/faculty",
        auth: "Admin / JWT",
        description: "Add a new faculty member profile.",
        requestBody: { name: "Dr. A. Sharma", designation: "Professor & Head", department: "cse", qualification: "Ph.D", image: "https://..." }
    },
    {
        category: "Faculty & Leadership",
        method: "PUT",
        path: "/api/faculty/:id",
        auth: "Admin / JWT",
        description: "Update faculty profile.",
        params: [{ name: "id", type: "string", description: "Faculty ID" }]
    },
    {
        category: "Faculty & Leadership",
        method: "DELETE",
        path: "/api/faculty/:id",
        auth: "Admin / JWT",
        description: "Remove faculty member profile.",
        params: [{ name: "id", type: "string", description: "Faculty ID" }]
    },
    {
        category: "Faculty & Leadership",
        method: "GET",
        path: "/api/faculty-stats",
        auth: "Public",
        description: "Aggregated statistics: Ph.D holders, student-faculty ratio, patents, and faculty count."
    },
    {
        category: "Faculty & Leadership",
        method: "GET",
        path: "/api/management-team",
        auth: "Public",
        description: "List leadership board: Founder, Chairperson, Secretary, Correspondent, Principal, and Deans."
    },
    {
        category: "Faculty & Leadership",
        method: "POST",
        path: "/api/management-team",
        auth: "Admin / JWT",
        description: "Add management team member.",
        requestBody: { name: "...", role: "Principal", message: "...", image: "https://..." }
    },
    {
        category: "Faculty & Leadership",
        method: "PUT",
        path: "/api/management-team/:id",
        auth: "Admin / JWT",
        description: "Update management member details.",
        params: [{ name: "id", type: "string", description: "Member ID" }]
    },
    {
        category: "Faculty & Leadership",
        method: "DELETE",
        path: "/api/management-team/:id",
        auth: "Admin / JWT",
        description: "Delete management member.",
        params: [{ name: "id", type: "string", description: "Member ID" }]
    },

    // -------------------------------------------------------------
    // NEWS, EVENTS & HIGHLIGHTS
    // -------------------------------------------------------------
    {
        category: "News & Events",
        method: "GET",
        path: "/api/news-events",
        auth: "Public",
        description: "Retrieve campus news, upcoming events, academic notices, and circulars.",
        queryParams: [
            { name: "category", type: "string", description: "Filter: 'News', 'Event', 'Circular', 'Press'" },
            { name: "limit", type: "number", description: "Max items to return" }
        ]
    },
    {
        category: "News & Events",
        method: "GET",
        path: "/api/news-events/:id",
        auth: "Public",
        description: "Get full article or announcement details by ID.",
        params: [{ name: "id", type: "string", description: "News item ID" }]
    },
    {
        category: "News & Events",
        method: "POST",
        path: "/api/news-events",
        auth: "Admin / JWT",
        description: "Publish a new news article, circular or upcoming event.",
        requestBody: { title: "National Level Hackathon 2026", date: "2026-11-15", category: "Event", description: "...", image: "https://..." }
    },
    {
        category: "News & Events",
        method: "PUT",
        path: "/api/news-events/:id",
        auth: "Admin / JWT",
        description: "Update published news or event item.",
        params: [{ name: "id", type: "string", description: "News ID" }]
    },
    {
        category: "News & Events",
        method: "DELETE",
        path: "/api/news-events/:id",
        auth: "Admin / JWT",
        description: "Delete news article or event.",
        params: [{ name: "id", type: "string", description: "News ID" }]
    },
    {
        category: "News & Events",
        method: "GET",
        path: "/api/hero-slides",
        auth: "Public",
        description: "Retrieve homepage hero carousel slides with banner images, titles, and call-to-actions."
    },
    {
        category: "News & Events",
        method: "POST",
        path: "/api/hero-slides",
        auth: "Admin / JWT",
        description: "Add a new slide to the homepage carousel.",
        requestBody: { title: "Admissions Open 2026-27", subtitle: "Autonomous Institution with NAAC A+ Grade", image: "https://...", ctaText: "Apply Now", ctaLink: "/admissions" }
    },
    {
        category: "News & Events",
        method: "GET",
        path: "/api/ticker-alerts",
        auth: "Public",
        description: "Active breaking news ticker alerts rendered at the top of the portal."
    },
    {
        category: "News & Events",
        method: "GET",
        path: "/api/popup-alerts",
        auth: "Public",
        description: "Active high-priority modal popup alerts for visitors."
    },
    {
        category: "News & Events",
        method: "GET",
        path: "/api/instagram-media",
        auth: "Public",
        description: "Curated social media gallery feeds, Instagram reels, and campus life highlights."
    },

    // -------------------------------------------------------------
    // PLACEMENTS & CAREERS
    // -------------------------------------------------------------
    {
        category: "Placements & Careers",
        method: "GET",
        path: "/api/placement-partners",
        auth: "Public",
        description: "List of recruiting partners, multinational corporations, and startup hiring partners."
    },
    {
        category: "Placements & Careers",
        method: "POST",
        path: "/api/placement-partners",
        auth: "Admin / JWT",
        description: "Add a recruiting company logo and details.",
        requestBody: { name: "TCS", logo: "https://...", category: "IT / Tech" }
    },
    {
        category: "Placements & Careers",
        method: "GET",
        path: "/api/placement-page",
        auth: "Public",
        description: "Placement statistics, highest package, average package, placement record, and recruiter testimonials."
    },
    {
        category: "Placements & Careers",
        method: "PUT",
        path: "/api/placement-page",
        auth: "Admin / JWT",
        description: "Update placement page metrics, recruiters list, and highlights.",
        requestBody: { highestPackage: "18.5 LPA", averagePackage: "5.2 LPA", placementPercentage: "94%" }
    },
    {
        category: "Placements & Careers",
        method: "GET",
        path: "/api/careers",
        auth: "Public",
        description: "List current job vacancies for professors, assistant professors, lab instructors, and administrative roles."
    },
    {
        category: "Placements & Careers",
        method: "POST",
        path: "/api/careers",
        auth: "Admin / JWT",
        description: "Post a new career opening.",
        requestBody: { title: "Assistant Professor - AI & DS", department: "AI & DS", type: "Full-Time", qualification: "Ph.D / M.Tech", experience: "2+ Years" }
    },
    {
        category: "Placements & Careers",
        method: "GET",
        path: "/api/job-applications",
        auth: "Admin / JWT",
        description: "Retrieve submitted job candidate applications with resume links."
    },
    {
        category: "Placements & Careers",
        method: "POST",
        path: "/api/job-applications",
        auth: "Public",
        description: "Submit a career application with applicant details and resume upload.",
        requestBody: { jobId: "...", applicantName: "...", email: "...", phone: "...", resumeUrl: "https://..." }
    },

    // -------------------------------------------------------------
    // CAMPUS LIFE & FACILITIES
    // -------------------------------------------------------------
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/life-of-easa",
        auth: "Public",
        description: "Campus lifestyle features: student clubs, fine arts, tech symposiums, hostel life, and recreation."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/sports",
        auth: "Public",
        description: "Sports infrastructure, athletics, cricket stadium, indoor courts, and inter-collegiate tournament laurels."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/central-library",
        auth: "Public",
        description: "Central library holdings: 35,000+ volumes, IEEE digital access, DELNET, book bank, and working hours."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/infrastructure",
        auth: "Public",
        description: "Physical infrastructure data: smart classrooms, auditorium, Wi-Fi campus, transport bus routes, cafeteria."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/gallery-images",
        auth: "Public",
        description: "Photos categorized by sports, campus, cultural, graduation, and technical symposiums."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/gallery-events",
        auth: "Public",
        description: "Event albums with multi-image collections."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/video-gallery",
        auth: "Public",
        description: "Curated college videos, documentary tours, and alumni spotlights."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/virtual-tour",
        auth: "Public",
        description: "Interactive 360-degree virtual tour coordinates and panorama hotspots."
    },
    {
        category: "Campus Life & Facilities",
        method: "GET",
        path: "/api/fest-page",
        auth: "Public",
        description: "Annual cultural and technical festival page details (IGNITE / TechnoFest)."
    },

    // -------------------------------------------------------------
    // RESEARCH, MILESTONES & SUSTAINABILITY
    // -------------------------------------------------------------
    {
        category: "Research & Sustainability",
        method: "GET",
        path: "/api/research",
        auth: "Public",
        description: "Research publications, Scopus/SCI indexed journals, patented technologies, and DSIR recognized research labs."
    },
    {
        category: "Research & Sustainability",
        method: "GET",
        path: "/api/milestones",
        auth: "Public",
        description: "Historic institutional milestones from inception to current autonomous status."
    },
    {
        category: "Research & Sustainability",
        method: "GET",
        path: "/api/sustainability",
        auth: "Public",
        description: "Green campus initiatives: 100 kW solar energy plant, zero-discharge rainwater harvesting, and organic waste converter."
    },
    {
        category: "Research & Sustainability",
        method: "GET",
        path: "/api/community-outreach",
        auth: "Public",
        description: "NSS village adoption, medical camps, tree plantation drives, and women empowerment sessions."
    },
    {
        category: "Research & Sustainability",
        method: "GET",
        path: "/api/startup-pitch",
        auth: "Public",
        description: "Student entrepreneurial pitches, MSME seed grants, and NewGen IEDC incubator initiatives."
    },

    // -------------------------------------------------------------
    // STUDENT SERVICES & FORMS
    // -------------------------------------------------------------
    {
        category: "Student Services & Forms",
        method: "GET",
        path: "/api/scholarships",
        auth: "Public",
        description: "State government scholarships, PMSSS, merit waivers, sports quota freeships, and institutional aid."
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/grievance",
        auth: "Public",
        description: "Submit confidential grievance or anti-ragging complaint to the Grievance Redressal Committee.",
        requestBody: { name: "...", email: "...", category: "Academic / Ragging / Hostel", message: "..." }
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/counseling",
        auth: "Public",
        description: "Confidential appointment request for psychological counseling and wellness support.",
        requestBody: { name: "...", contact: "...", preferTime: "Morning / Afternoon", confidentialNote: "..." }
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/enquiry",
        auth: "Public",
        description: "Submit general admission and academic course inquiry.",
        requestBody: { studentName: "...", email: "...", phone: "...", courseInterested: "B.Tech AI & DS", message: "..." }
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/pac-feedback",
        auth: "Public",
        description: "Submit Program Assessment Committee (PAC) feedback on curriculum relevance and industrial readiness.",
        requestBody: { stakeholder: "Alumni / Employer / Student", feedback: "..." }
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/partner-connect",
        auth: "Public",
        description: "Corporate, Industry & Academic MoU partnership inquiry form.",
        requestBody: { companyName: "...", representative: "...", email: "...", proposedMoU: "..." }
    },
    {
        category: "Student Services & Forms",
        method: "POST",
        path: "/api/newsletter",
        auth: "Public",
        description: "Subscribe email address to the monthly EASA newsletter.",
        requestBody: { email: "student@example.com" }
    },

    // -------------------------------------------------------------
    // FILE MANAGEMENT
    // -------------------------------------------------------------
    {
        category: "File Management",
        method: "POST",
        path: "/api/upload",
        auth: "Public / Admin",
        description: "Upload images, documents, or PDFs. Automatically writes to AWS S3 bucket if configured, or falls back to local disk storage.",
        requestBody: "multipart/form-data with field name: 'image'",
        sampleResponse: { url: "https://easa-college.s3.eu-north-1.amazonaws.com/uuid-filename.jpg" }
    }
];

// Helper to inspect additional routes from the running Express application
function getRegisteredRoutes(app) {
    const list = [];
    const routerStack = (app.router || app._router)?.stack || [];

    const extractFromStack = (stack, basePath = '') => {
        if (!Array.isArray(stack)) return;
        stack.forEach(layer => {
            if (layer.route) {
                const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());
                list.push({
                    method: methods.join(', ') || 'GET',
                    path: basePath + layer.route.path
                });
            } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
                // Express sub-router
                extractFromStack(layer.handle.stack, basePath);
            }
        });
    };

    try {
        extractFromStack(routerStack, '');
    } catch (e) {
        // Fallback silently if inspection not permitted
    }
    return list;
}

// -------------------------------------------------------------
// HTML Documentation Page Generator
// -------------------------------------------------------------
function renderDocsHtml(baseUrl = '') {
    const categories = Array.from(new Set(routesCatalog.map(r => r.category)));
    const totalCount = routesCatalog.length;
    const getCount = routesCatalog.filter(r => r.method === 'GET').length;
    const postCount = routesCatalog.filter(r => r.method === 'POST').length;
    const putCount = routesCatalog.filter(r => r.method === 'PUT' || r.method === 'PATCH').length;
    const deleteCount = routesCatalog.filter(r => r.method === 'DELETE').length;
    const protectedCount = routesCatalog.filter(r => r.auth.includes('Admin') || r.auth.includes('JWT') || r.auth.includes('Bearer')).length;
    const publicCount = totalCount - protectedCount;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EASA College | REST API Documentation & Route Explorer</title>
    <link rel="icon" type="image/webp" href="/assets/logos-CAistHu7.webp">
    <style>
        :root {
            --bg-body: #0b0f19;
            --bg-card: #111827;
            --bg-card-hover: #1e293b;
            --border: #1f293d;
            --border-hover: #374151;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --text-dim: #64748b;
            --primary: #3b82f6;
            --primary-glow: rgba(59, 130, 246, 0.25);
            --accent-green: #10b981;
            --accent-green-bg: rgba(16, 185, 129, 0.15);
            --method-get: #10b981;
            --method-get-bg: rgba(16, 185, 129, 0.15);
            --method-post: #3b82f6;
            --method-post-bg: rgba(59, 130, 246, 0.15);
            --method-put: #f59e0b;
            --method-put-bg: rgba(245, 158, 11, 0.15);
            --method-patch: #8b5cf6;
            --method-patch-bg: rgba(139, 92, 246, 0.15);
            --method-delete: #ef4444;
            --method-delete-bg: rgba(239, 68, 68, 0.15);
            --badge-auth: #ec4899;
            --badge-auth-bg: rgba(236, 72, 153, 0.15);
            --code-bg: #030712;
            --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-body);
            color: var(--text-main);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            line-height: 1.6;
            padding-bottom: 5rem;
        }

        /* Header Navigation */
        .header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(11, 15, 25, 0.85);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border);
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .header-brand {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .header-logo {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #1e3a8a, #0284c7);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.2rem;
            color: #ffffff;
            box-shadow: 0 4px 14px var(--primary-glow);
        }

        .header-title h1 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
        }

        .header-title p {
            font-size: 0.82rem;
            color: var(--text-muted);
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .health-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            color: #34d399;
            padding: 0.4rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.82rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .health-badge:hover {
            background: rgba(16, 185, 129, 0.2);
            border-color: #34d399;
            transform: translateY(-1px);
        }

        .health-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 10px #10b981;
            animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .btn-link {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.9rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            background: #1e293b;
            color: #f1f5f9;
            border: 1px solid var(--border);
        }

        .btn-link:hover {
            background: #334155;
            color: #ffffff;
            border-color: var(--primary);
        }

        .btn-primary {
            background: #2563eb;
            color: #ffffff;
            border-color: #3b82f6;
        }

        .btn-primary:hover {
            background: #1d4ed8;
            box-shadow: 0 4px 12px var(--primary-glow);
        }

        /* Main Container */
        .container {
            max-width: 1380px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }

        /* Hero Banner */
        .hero {
            background: linear-gradient(135deg, rgba(30, 58, 138, 0.25), rgba(15, 23, 42, 0.7)), #0f172a;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }

        .hero::after {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }

        .hero h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.5rem;
        }

        .hero p {
            font-size: 0.95rem;
            color: var(--text-muted);
            max-width: 850px;
            margin-bottom: 1.5rem;
        }

        /* Stats Bar */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1rem;
        }

        .stat-card {
            background: rgba(17, 24, 39, 0.8);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
        }

        .stat-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-dim);
            margin-top: 0.2rem;
        }

        /* Filter Controls */
        .controls-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 1.25rem;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .search-box {
            position: relative;
            width: 100%;
        }

        .search-input {
            width: 100%;
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0.85rem 1rem 0.85rem 2.8rem;
            color: #ffffff;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-dim);
            font-size: 1.1rem;
            pointer-events: none;
        }

        .filter-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .method-pills {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: wrap;
        }

        .pill-btn {
            background: #1f293d;
            border: 1px solid transparent;
            color: var(--text-muted);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .pill-btn:hover {
            color: #ffffff;
            background: #334155;
        }

        .pill-btn.active {
            background: var(--primary);
            color: #ffffff;
            border-color: #60a5fa;
            box-shadow: 0 2px 8px var(--primary-glow);
        }

        .category-select {
            background: var(--code-bg);
            border: 1px solid var(--border);
            color: #f1f5f9;
            padding: 0.45rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            outline: none;
            cursor: pointer;
        }

        .category-select:focus {
            border-color: var(--primary);
        }

        /* Route Items List */
        .category-section {
            margin-bottom: 2.5rem;
        }

        .category-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
        }

        .category-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .category-count {
            font-size: 0.8rem;
            background: #1f293d;
            color: var(--text-muted);
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
            font-weight: 600;
        }

        .routes-grid {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
        }

        .route-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.15rem;
            transition: all 0.2s ease;
        }

        .route-card:hover {
            border-color: var(--border-hover);
            background: var(--bg-card-hover);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        .route-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .route-left {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            flex-wrap: wrap;
            font-family: var(--font-mono);
        }

        .method-badge {
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .method-get { color: var(--method-get); background: var(--method-get-bg); border: 1px solid rgba(16, 185, 129, 0.3); }
        .method-post { color: var(--method-post); background: var(--method-post-bg); border: 1px solid rgba(59, 130, 246, 0.3); }
        .method-put { color: var(--method-put); background: var(--method-put-bg); border: 1px solid rgba(245, 158, 11, 0.3); }
        .method-patch { color: var(--method-patch); background: var(--method-patch-bg); border: 1px solid rgba(139, 92, 246, 0.3); }
        .method-delete { color: var(--method-delete); background: var(--method-delete-bg); border: 1px solid rgba(239, 68, 68, 0.3); }

        .route-path {
            font-size: 0.95rem;
            font-weight: 600;
            color: #ffffff;
            word-break: break-all;
        }

        .route-path .param {
            color: #60a5fa;
            font-weight: 700;
        }

        .auth-badge {
            font-size: 0.72rem;
            font-weight: 600;
            padding: 0.25rem 0.65rem;
            border-radius: 9999px;
            font-family: -apple-system, sans-serif;
        }

        .auth-public {
            background: rgba(16, 185, 129, 0.12);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .auth-admin {
            background: var(--badge-auth-bg);
            color: #f472b6;
            border: 1px solid rgba(236, 72, 153, 0.3);
        }

        .route-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-action {
            background: #1f293d;
            border: 1px solid var(--border);
            color: var(--text-muted);
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
        }

        .btn-action:hover {
            color: #ffffff;
            background: #334155;
            border-color: #64748b;
        }

        .route-desc {
            font-size: 0.88rem;
            color: var(--text-muted);
            margin-top: 0.6rem;
            margin-bottom: 0.5rem;
        }

        /* Collapsible Details */
        .route-details {
            display: none;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
        }

        .route-details.open {
            display: block;
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1rem;
            margin-top: 0.5rem;
        }

        .detail-block {
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.85rem;
        }

        .detail-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--text-dim);
            letter-spacing: 0.05em;
            margin-bottom: 0.4rem;
        }

        pre.code-view {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: #cbd5e1;
            overflow-x: auto;
            white-space: pre-wrap;
            word-break: break-word;
        }

        /* Toast notification */
        #toast {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: #2563eb;
            color: #ffffff;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            display: none;
            z-index: 1000;
            animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 3rem 1rem 1rem;
            color: var(--text-dim);
            font-size: 0.85rem;
            border-top: 1px solid var(--border);
            margin-top: 4rem;
        }

        .footer a {
            color: #60a5fa;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header class="header">
        <div class="header-brand">
            <div class="header-logo">E</div>
            <div class="header-title">
                <h1>EASA College REST API Explorer</h1>
                <p>Autonomous Institution • Approved by AICTE • Affiliated to Anna University</p>
            </div>
        </div>

        <div class="header-actions">
            <a href="/api/health" class="health-badge" id="healthBadge" target="_blank" title="Check server health">
                <span class="health-dot" id="healthDot"></span>
                <span id="healthText">Pinging Server...</span>
            </a>
            <a href="/api/routes" class="btn-link" target="_blank" title="Download raw JSON schema">
                <span>📋</span> Raw JSON
            </a>
            <a href="/admin" class="btn-link btn-primary" title="Launch Control Panel">
                <span>🔐</span> Admin Panel
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container">
        <!-- Hero Section -->
        <section class="hero">
            <h2>Backend API & Route Documentation</h2>
            <p>
                Complete developer documentation for the EASA College of Engineering and Technology web services, SDG goals engine, admissions pipeline, curriculum outcomes, and media infrastructure. All endpoints support JSON payloads and cross-origin queries.
            </p>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${totalCount}</div>
                    <div class="stat-label">Total Routes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--method-get)">${getCount}</div>
                    <div class="stat-label">GET Endpoints</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--method-post)">${postCount}</div>
                    <div class="stat-label">POST Endpoints</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--method-put)">${putCount}</div>
                    <div class="stat-label">PUT / PATCH</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: var(--method-delete)">${deleteCount}</div>
                    <div class="stat-label">DELETE</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: #34d399">${publicCount}</div>
                    <div class="stat-label">Public</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: #f472b6">${protectedCount}</div>
                    <div class="stat-label">Protected</div>
                </div>
            </div>
        </section>

        <!-- Controls & Search -->
        <section class="controls-card">
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" class="search-input" placeholder="Search routes by path, method, description, or keyword (e.g. sdgs, health, departments, faculty)...">
            </div>

            <div class="filter-row">
                <div class="method-pills">
                    <button class="pill-btn active" data-method="ALL">ALL</button>
                    <button class="pill-btn" data-method="GET">GET</button>
                    <button class="pill-btn" data-method="POST">POST</button>
                    <button class="pill-btn" data-method="PUT">PUT</button>
                    <button class="pill-btn" data-method="PATCH">PATCH</button>
                    <button class="pill-btn" data-method="DELETE">DELETE</button>
                </div>

                <div>
                    <select id="categorySelect" class="category-select">
                        <option value="ALL">All Categories (${categories.length})</option>
                        ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>
            </div>
        </section>

        <!-- Routes List -->
        <div id="routesContainer">
            ${categories.map(cat => {
                const catRoutes = routesCatalog.filter(r => r.category === cat);
                return `
                <div class="category-section" data-category="${cat}">
                    <div class="category-header">
                        <h3 class="category-title">
                            <span>📂</span> ${cat}
                        </h3>
                        <span class="category-count">${catRoutes.length} endpoints</span>
                    </div>

                    <div class="routes-grid">
                        ${catRoutes.map((r, idx) => {
                            const methodClass = 'method-' + r.method.toLowerCase();
                            const isPublic = r.auth === 'Public';
                            const pathDisplay = r.path.replace(/(:\w+)/g, '<span class="param">$1</span>');
                            const uniqueId = 'route_' + cat.replace(/[^a-zA-Z0-9]/g, '_') + '_' + idx;
                            const hasDetails = r.params?.length || r.queryParams?.length || r.requestBody || r.sampleResponse;

                            return `
                            <div class="route-card" data-method="${r.method}" data-category="${r.category}" data-search="${(r.method + ' ' + r.path + ' ' + r.description + ' ' + r.category).toLowerCase()}">
                                <div class="route-header">
                                    <div class="route-left">
                                        <span class="method-badge ${methodClass}">${r.method}</span>
                                        <span class="route-path">${pathDisplay}</span>
                                        <span class="auth-badge ${isPublic ? 'auth-public' : 'auth-admin'}">
                                            ${isPublic ? '🌐 Public' : '🔒 ' + r.auth}
                                        </span>
                                    </div>

                                    <div class="route-actions">
                                        <button class="btn-action" onclick="copyRoute('${r.path}')" title="Copy Endpoint Path">
                                            📋 Copy
                                        </button>
                                        ${r.method === 'GET' && !r.path.includes(':') ? `
                                            <a href="${r.path}" target="_blank" class="btn-action" title="Open live GET endpoint in new tab">
                                                ↗ Try Live
                                            </a>
                                        ` : ''}
                                        ${hasDetails ? `
                                            <button class="btn-action" onclick="toggleDetails('${uniqueId}')" id="btn_${uniqueId}">
                                                ▼ Details
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>

                                <p class="route-desc">${r.description}</p>

                                ${hasDetails ? `
                                <div class="route-details" id="${uniqueId}">
                                    <div class="details-grid">
                                        ${r.queryParams?.length ? `
                                            <div class="detail-block">
                                                <div class="detail-title">Query Parameters</div>
                                                <pre class="code-view">${JSON.stringify(r.queryParams, null, 2)}</pre>
                                            </div>
                                        ` : ''}
                                        ${r.requestBody ? `
                                            <div class="detail-block">
                                                <div class="detail-title">Request Body (JSON)</div>
                                                <pre class="code-view">${typeof r.requestBody === 'object' ? JSON.stringify(r.requestBody, null, 2) : r.requestBody}</pre>
                                            </div>
                                        ` : ''}
                                        ${r.sampleResponse ? `
                                            <div class="detail-block">
                                                <div class="detail-title">Sample Response (200 OK)</div>
                                                <pre class="code-view">${JSON.stringify(r.sampleResponse, null, 2)}</pre>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                                ` : ''}
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    </main>

    <!-- Toast Notification -->
    <div id="toast">Copied to clipboard!</div>

    <!-- Footer -->
    <footer class="footer">
        <p>© ${new Date().getFullYear()} EASA College of Engineering and Technology (Autonomous). All Rights Reserved.</p>
        <p style="margin-top: 0.3rem;">NH-47, Palakkad Main Road, Navakkarai (PO), Coimbatore, Tamil Nadu - 641105.</p>
    </footer>

    <script>
        // Copy Route URL Helper
        function copyRoute(path) {
            const fullUrl = window.location.origin + path;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullUrl).then(showToast);
            } else {
                const ta = document.createElement('textarea');
                ta.value = fullUrl;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast();
            }
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2200);
        }

        // Toggle Details Collapse
        function toggleDetails(id) {
            const el = document.getElementById(id);
            const btn = document.getElementById('btn_' + id);
            if (!el) return;
            const isOpen = el.classList.contains('open');
            if (isOpen) {
                el.classList.remove('open');
                if (btn) btn.innerHTML = '▼ Details';
            } else {
                el.classList.add('open');
                if (btn) btn.innerHTML = '▲ Hide';
            }
        }

        // Filter Logic
        let activeMethod = 'ALL';
        let activeCategory = 'ALL';
        let searchQuery = '';

        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        const pillBtns = document.querySelectorAll('.pill-btn');

        function applyFilters() {
            const cards = document.querySelectorAll('.route-card');
            const sections = document.querySelectorAll('.category-section');

            cards.forEach(card => {
                const cardMethod = card.getAttribute('data-method');
                const cardCategory = card.getAttribute('data-category');
                const cardSearch = card.getAttribute('data-search');

                const methodMatch = (activeMethod === 'ALL' || cardMethod === activeMethod);
                const categoryMatch = (activeCategory === 'ALL' || cardCategory === activeCategory);
                const searchMatch = !searchQuery || cardSearch.includes(searchQuery);

                if (methodMatch && categoryMatch && searchMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide empty category sections
            sections.forEach(sec => {
                const visibleInSec = sec.querySelectorAll('.route-card[style*="display: block"]');
                const allCardsInSec = sec.querySelectorAll('.route-card');
                let hasVisible = false;
                allCardsInSec.forEach(c => {
                    if (c.style.display !== 'none') hasVisible = true;
                });
                sec.style.display = hasVisible ? 'block' : 'none';
            });
        }

        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            applyFilters();
        });

        categorySelect.addEventListener('change', (e) => {
            activeCategory = e.target.value;
            applyFilters();
        });

        pillBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                pillBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeMethod = btn.getAttribute('data-method');
                applyFilters();
            });
        });

        // Live Health Check Ping
        async function checkServerHealth() {
            const dot = document.getElementById('healthDot');
            const text = document.getElementById('healthText');
            try {
                const res = await fetch('/api/health');
                const data = await res.json();
                if (data.status === 'healthy' || data.status === 'ok') {
                    text.textContent = '🟢 Server Online (' + (data.uptime?.human || 'healthy') + ')';
                    dot.style.background = '#10b981';
                    dot.style.boxShadow = '0 0 10px #10b981';
                } else {
                    text.textContent = '🟡 Degraded: ' + (data.database?.status || 'db connecting');
                    dot.style.background = '#f59e0b';
                    dot.style.boxShadow = '0 0 10px #f59e0b';
                }
            } catch (err) {
                text.textContent = '🔴 Server Offline';
                dot.style.background = '#ef4444';
                dot.style.boxShadow = '0 0 10px #ef4444';
            }
        }

        checkServerHealth();
        setInterval(checkServerHealth, 30000);
    </script>
</body>
</html>`;
}

// -------------------------------------------------------------
// Route Handlers
// -------------------------------------------------------------

// GET /api/routes - Returns JSON list of all routes
router.get('/routes', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({
        success: true,
        service: "EASA College Backend API",
        version: "1.0.0",
        totalCatalogued: routesCatalog.length,
        categories: Array.from(new Set(routesCatalog.map(r => r.category))),
        routes: routesCatalog
    });
});

// GET /api/docs/json - Direct JSON alias
router.get('/docs/json', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({
        success: true,
        version: "1.0.0",
        routes: routesCatalog
    });
});

// GET /api/docs - Content negotiation: HTML or JSON
router.get('/docs', (req, res) => {
    if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
        res.setHeader('Cache-Control', 'public, max-age=300');
        return res.json({
            success: true,
            version: "1.0.0",
            totalRoutes: routesCatalog.length,
            routes: routesCatalog
        });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.send(renderDocsHtml(req.protocol + '://' + req.get('host')));
});

module.exports = {
    router,
    routesCatalog,
    getRegisteredRoutes
};
