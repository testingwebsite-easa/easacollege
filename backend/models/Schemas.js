const mongoose = require('mongoose');

const FacultyStatSchema = new mongoose.Schema({
    value: String,
    label: String
});

const NewsEventSchema = new mongoose.Schema({
    image: String,
    title: String,
    date: String,
    category: String,
    desc: String,
    pdf_url: String
});
NewsEventSchema.index({ category: 1 });

const HeroSlideSchema = new mongoose.Schema({
    image: String,
    title: String,
    subtitle: String
});

const GalleryEventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    department: String,
    shortDescription: String,
    photos: [{
        src: { type: String, required: true },
        caption: { type: String, default: '' }
    }]
});

const GalleryImageSchema = new mongoose.Schema({
    src: String,
    caption: String,
    department: String // LINK TO DEPARTMENT
});

const PlacementPartnerSchema = new mongoose.Schema({
    name: String,
    logo: String,
    row: { type: Number, default: 1, enum: [1, 2] }
});

const ManagementMemberSchema = new mongoose.Schema({
    name: String,
    designation: String,
    image_url: String,
    message: String,
    social: {
        facebook: String,
        instagram: String,
        x: String
    },
    category: { type: String, default: 'management', enum: ['management', 'governance', 'administration', 'dean', 'chairperson', 'secretary', 'correspondent', 'principal', 'founder'] },
    order: { type: Number, default: 0 } // For custom sorting
});
ManagementMemberSchema.index({ category: 1, order: 1 });

const InstituteMilestoneSchema = new mongoose.Schema({
    year: String,
    title: String,
    description: String,
    order: { type: Number, default: 0 }
});

const MissionVisionSchema = new mongoose.Schema({
    vision: String,
    mission: [String]
});

const CoreBeliefSchema = new mongoose.Schema({
    icon: String,
    title: String,
    description: String
});

const JobApplicationSchema = new mongoose.Schema({
    // Job Details
    postAppliedFor: String,
    employmentType: [String],
    otherEmploymentType: String,
    department: String,
    dateOfApplication: Date,
    position: String,
    designation: String,

    // Personal Info
    fullName: String,
    gender: String,
    dob: String,
    age: String,
    maritalStatus: String,
    nationality: String,
    community: String,
    caste: String,
    aadhaarNo: String,
    panNo: String,
    mobileNo: String,
    email: String,
    presentAddress: String,
    permanentAddress: String,
    sameAsPresent: Boolean,

    // Education
    education: [{
        level: String,
        specialization: String,
        institution: String,
        year: String,
        percentage: String,
        class: String
    }],
    additionalQualifications: [String],
    otherAdditionalQualification: String,

    // Experience
    isFresher: Boolean,
    totalExperienceYears: String,
    teachingExperience: [{
        institution: String,
        designation: String,
        from: String,
        to: String,
        experience: String
    }],
    industryExperience: [{
        organization: String,
        designation: String,
        nature: String,
        period: String,
        experience: String
    }],

    // Salary
    lastDrawnSalary: String,
    expectedSalary: String,
    takeHomeSalary: String,
    preferredJoiningDate: String,

    // Skills
    softwareSkills: [String],
    otherSoftwareSkill: String,
    languagesKnown: {
        tamil: { read: Boolean, write: Boolean, speak: Boolean },
        english: { read: Boolean, write: Boolean, speak: Boolean },
        others: String
    },
    complianceExperience: [String],

    // Academic Contributions
    publications: String,
    books: String,
    fdps: String,
    nptel: String,
    researchInterests: String,
    phdScholars: { guided: String, ongoing: String },

    // General Info
    willingToWorkHolidays: String,
    disciplinaryProceedings: Boolean,
    majorIllness: Boolean,
    litigation: Boolean,

    // References
    references: [{
        name: String,
        designation: String,
        organization: String,
        contact: String
    }],

    // Resume
    resumeUrl: String,

    // Submission Info
    submittedAt: { type: Date, default: Date.now }
});
JobApplicationSchema.index({ submittedAt: -1 });
JobApplicationSchema.index({ email: 1 });

// NEW FACULTY SCHEMA
const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: String,
    department: { type: String, required: true, index: true }, // Store department slug
    image: String,
    qualification: String,
    experience: String,
    email: String,
    researchArea: String,
    order: { type: Number, default: 0 }
});

// PROGRAM OUTCOMES SCHEMA
const ProgramOutcomeSchema = new mongoose.Schema({
    department: { type: String, required: true, index: true }, // Department slug
    type: { type: String, required: true, enum: ['PO', 'PEO', 'PSO', 'WK'], index: true },
    code: { type: String, required: true }, // e.g., "PO1", "PEO2", etc.
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: String, // User ID
    lastModifiedBy: String // User ID
});
ProgramOutcomeSchema.index({ department: 1, type: 1 });

module.exports = {
    FacultyStat: mongoose.model('FacultyStat', FacultyStatSchema),
    NewsEvent: mongoose.model('NewsEvent', NewsEventSchema),
    HeroSlide: mongoose.model('HeroSlide', HeroSlideSchema),
    GalleryEvent: mongoose.model('GalleryEvent', GalleryEventSchema),
    GalleryImage: mongoose.model('GalleryImage', GalleryImageSchema),
    PlacementPartner: mongoose.model('PlacementPartner', PlacementPartnerSchema),
    ManagementMember: mongoose.model('ManagementMember', ManagementMemberSchema),
    MissionVision: mongoose.model('MissionVision', MissionVisionSchema),
    CoreBelief: mongoose.model('CoreBelief', CoreBeliefSchema),
    InstituteMilestone: mongoose.model('InstituteMilestone', InstituteMilestoneSchema),
    JobApplication: mongoose.model('JobApplication', JobApplicationSchema),
    Faculty: mongoose.model('Faculty', FacultySchema), // Export Faculty
    User: mongoose.model('User', new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['admin', 'hod', 'staff', 'student'] },
        department: { type: String }, // For HOD, Staff, Student
        employeeId: { type: String }, // For Staff
        studentId: { type: String }, // For Student
        name: { type: String },
        phone: { type: String },
        isApproved: { type: Boolean, default: false }, // For HOD/Staff/Student, needs admin approval
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    })),
    Alumni: mongoose.model('Alumni', new mongoose.Schema({
        name: String,
        batch: String,
        department: String,
        currentJob: String, // Designation/Company
        email: String,
        phone: String,
        photoUrl: String,
        alumniId: { type: String, unique: true },
        idCardStats: {
            downloaded: { type: Boolean, default: false },
            downloadedAt: Date
        },
        status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
        registeredAt: { type: Date, default: Date.now }
    })),
    Program: mongoose.model('Program', new mongoose.Schema({
        title: String,
        subtitle: String,
        description: String,
        image: String,
        color: String,
        link: String
    })),
    Admission: mongoose.model('Admission', new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        course: String,
        community: String,
        district: String,
        state: String,
        school: String,
        percentage: String,
        status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'] },
        date: { type: Date, default: Date.now }
    })),
    Enquiry: mongoose.model('Enquiry', new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        message: String,
        status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Resolved'] },
        submittedAt: { type: Date, default: Date.now }
    })),
    Session: mongoose.model('Session', new mongoose.Schema({
        title: String,
        startDate: Date,
        endDate: Date,
        status: { type: String, default: 'Upcoming', enum: ['Upcoming', 'Current', 'Completed'] },
        description: String,
        createdAt: { type: Date, default: Date.now }
    })),
    UGCourse: mongoose.model('UGCourse', new mongoose.Schema({
        title: String,
        description: String,
        duration: String,
        eligibility: String,
        image: String,
        fees: String,
        category: { type: String, default: 'UG', enum: ['UG', 'PG', 'Research'], index: true }
    })),
    Department: mongoose.model('Department', new mongoose.Schema({
        slug: { type: String, unique: true, required: true },
        type: { type: String, enum: ['UG', 'PG', 'Other'], default: 'UG' },
        order: { type: Number, default: 0 }, // For Navbar ordering
        name: String,
        heroImage: String,
        overview: String,
        studentCount: String,
        facultyCount: String,
        labCount: String,
        quickFacts: [{
            label: String,
            value: String,
            icon: String
        }],
        vision: String,
        mission: { type: [String], default: [] },
        peo: { type: [String], default: [] },
        pso: { type: [String], default: [] },
        po: { type: [String], default: [] },
        wk: { type: [String], default: [] },
        milestones: [{
            year: String,
            desc: String
        }],
        coreValues: [{
            title: String,
            icon: String,
            desc: String
        }],
        hod: {
            name: String,
            designation: String,
            image: String,
            message: String
        },
        brochure: String
    })),
    Resource: mongoose.model('Resource', new mongoose.Schema({
        title: String,
        category: { type: String, required: true }, // e.g., 'Digital Library', 'Forms', etc.
        description: String,
        fileUrl: String, // Link to PDF or external URL
        date: { type: Date, default: Date.now }
    })),
    ResearchItem: mongoose.model('ResearchItem', new mongoose.Schema({
        title: String,
        category: { type: String, required: true }, // e.g., 'department-research', 'patents'
        type: String, // 'Patent', 'Project', 'Publication'
        description: String, // Abstract or summary
        author: String, // Investigator / Student Name
        department: String, // e.g., 'CSE'
        year: String,
        status: { type: String, default: 'Ongoing' }, // Ongoing, Completed, Published
        image: String, // Optional cover image
        link: String // External link to paper/project
    })),
    PageContent: mongoose.model('PageContent', new mongoose.Schema({
        slug: { type: String, unique: true, required: true },
        title: String,
        subtitle: String,
        heroImage: String,
        content: String, // Main body text
        sections: [{ // Flexible layout sections
            heading: String,
            body: String,
            image: String
        }]
    })),
    Career: mongoose.model('Career', new mongoose.Schema({
        title: { type: String, required: true },
        department: String,
        location: String,
        type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
        description: String,
        requirements: [String],
        responsibilities: [String],
        salary: String,
        status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
        postedDate: { type: Date, default: Date.now },
        closingDate: Date
    })),
    LifeOfEASA: mongoose.model('LifeOfEASA', new mongoose.Schema({
        imageUrl: String,
        title: String,
        category: String,
        description: String,
        date: { type: Date, default: Date.now }
    })),
    Institution: mongoose.model('Institution', new mongoose.Schema({
        title: String,
        subtitle: String,
        heroImage: String,
        content: String, // General content
        history: String, // Specific history text
        legacy: String   // Specific legacy text
    })),
    Infrastructure: mongoose.model('Infrastructure', new mongoose.Schema({
        title: String,
        subtitle: String,
        heroImage: String,
        description: String,
        facilities: [{
            title: String,
            desc: String,
            image: String
        }]
    })),
    Sustainability: mongoose.model('Sustainability', new mongoose.Schema({
        title: String,
        subtitle: String,
        heroImage: String,
        description: String,
        initiatives: [{
            title: String,
            desc: String
        }]
    })),
    CommunityOutreach: mongoose.model('CommunityOutreach', new mongoose.Schema({
        title: String,
        subtitle: String,
        heroImage: String,
        description: String,
        projects: [{
            title: String,
            desc: String,
            image: String
        }]
    })),
    LibraryData: mongoose.model('LibraryData', new mongoose.Schema({
        overview: {
            title: String,
            subtitle: String,
            description: String,
            image: String,
            stats: [{ label: String, value: String }],
            highlights: [String]
        },
        eResources: [{
            name: String,
            desc: String,
            link: String,
            logo: String
        }],
        openAccess: [{
            name: String,
            url: String,
            logo: String
        }],
        ndli: {
            description: String,
            benefits: [String]
        },
        rules: [String],
        academicProfile: [{
            name: String,
            desc: String
        }],
        opac: {
            description: String,
            cta: String,
            link: String
        },
        staff: [{
            name: String,
            role: String,
            image: String
        }],
        gallery: [String]
    })),
    TickerAlert: mongoose.model('TickerAlert', new mongoose.Schema({
        message: { type: String, required: true },
        link: { type: String, default: '#' },
        isActive: { type: Boolean, default: true },
        type: { type: String, default: 'info', enum: ['info', 'warning', 'danger'] },
        createdAt: { type: Date, default: Date.now }
    })),
    PopupAlert: mongoose.model('PopupAlert', new mongoose.Schema({
        image: { type: String, required: true },
        isVisible: { type: Boolean, default: true },
        link: String,
        createdAt: { type: Date, default: Date.now }
    })),
    Scholarship: mongoose.model('Scholarship', new mongoose.Schema({
        name: String,
        provider: String, // e.g., 'EASA', 'Govt', 'Private'
        amount: String,
        eligibility: String,
        deadline: String,
        link: String,
        description: String,
        category: { type: String, default: 'Merit', enum: ['Merit', 'Sports', 'Government', 'Private', 'Need-Based', 'Research'] }
    })),
    PlacementPage: mongoose.model('PlacementPage', new mongoose.Schema({
        name: String,
        heroImage: String,
        vision: String,
        mission: [String],
        overview: String,
        stats: [{
            label: String,
            value: String,
            icon: String
        }],
        recruiters: [{
            name: String,
            logo: String
        }],
        trainingPrograms: [{
            title: String,
            desc: String
        }],
        branchData: [{
            branch: String,
            placed: String
        }],
        internships: [{
            company: String,
            role: String,
            stipend: String,
            duration: String
        }],
        process: [{
            step: Number,
            title: String,
            desc: String
        }],
        testimonials: [{
            name: String,
            branch: String,
            company: String,
            text: String
        }],
        gallery: [String],
        downloads: [{
            title: String,
            size: String,
            fileType: String,
            fileUrl: String
        }],
        contact: {
            name: String,
            designation: String,
            email: String,
            phone: String,
            address: String
        }
    })),
    VideoGallery: mongoose.model('VideoGallery', new mongoose.Schema({
        title: String,
        url: String, // Embed URL
        thumbnail: String,
        category: String,
        createdAt: { type: Date, default: Date.now }
    })),
    Grievance: mongoose.model('Grievance', new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        type: String, // parents, students, faculty, visitors
        subject: String,
        message: String,
        rollNo: String,
        department: String,
        status: { type: String, default: 'Pending' }, // Pending, Reviewed, Resolved
        createdAt: { type: Date, default: Date.now }
    })),
    VirtualTour: mongoose.model('VirtualTour', new mongoose.Schema({
        tourUrl: String,
        description: String,
        updatedAt: { type: Date, default: Date.now }
    })),
    Sport: mongoose.model('Sport', new mongoose.Schema({
        name: { type: String, required: true },
        type: { type: String, enum: ['Indoor', 'Outdoor'], required: true },
        count: { type: String, default: '1' }, // "1 Court", "2 Fields"
        image: String,
        description: String,
        gallery: [String] // Array of image URLs
    })),
    PageHero: mongoose.model('PageHero', new mongoose.Schema({
        pageKey: { type: String, unique: true, required: true }, // URL path or unique identifier
        title: String,
        subtitle: String,
        image: String,
        updatedAt: { type: Date, default: Date.now }
    })),
    Moment: mongoose.model('Moment', new mongoose.Schema({
        title: String,
        description: String,
        date: { type: Date, default: Date.now },
        image: String
    })),
    Advice: mongoose.model('Advice', new mongoose.Schema({
        name: String,
        role: String, // e.g., 'Alumni', 'Faculty'
        message: String,
        image: String
    })),
    FestPage: mongoose.model('FestPage', new mongoose.Schema({
        title: String,
        subtitle: String,
        heroImage: String,
        events: [{
            id: String,
            title: String,
            description: String,
            image: String,
            images: [String], // Array of image URLs
            date: Date
        }],
        updatedAt: { type: Date, default: Date.now }
    })),
    ProgramOutcome: mongoose.model('ProgramOutcome', ProgramOutcomeSchema),
    DepartmentData: mongoose.model('DepartmentData', new mongoose.Schema({
        departmentSlug: { type: String, required: true, unique: true },
        mission: [String],
        vision: [String],
        peo: [String],
        pso: [String],
        po: [String],
        bosMeetingDate: { type: String, default: "29.10.2024" },
        acMeetingDate: { type: String, default: "25.11.2024" },
        regulation: { type: String, default: "R-2023" },
        subjects: [{
            semester: Number,
            vertical: Number,
            verticalName: String,
            category: String,
            code: String,
            title: String,
            categoryType: String,
            l: Number,
            t: Number,
            p: Number,
            contactPeriods: Number,
            credits: Number,
            cia: Number,
            ese: Number,
            total: Number,
            isOpenElective: { type: Boolean, default: false },
            offeringDept: String,
            prerequisites: { type: String, default: '' },
            categoryName: { type: String, default: '' },
            subtitle: { type: String, default: '' },
            objectives: { type: [String], default: [] },
            outcomes: [{
                coNo: String,
                outcome: String,
                rbtLevel: String
            }],
            units: [{
                unitNo: String,
                title: String,
                topics: [String]
            }],
            textbooks: { type: [String], default: [] },
            references: { type: [String], default: [] },
            webReferences: { type: [String], default: [] },
            coPoMapping: [{
                coNo: String,
                po1: { type: String, default: '-' },
                po2: { type: String, default: '-' },
                po3: { type: String, default: '-' },
                po4: { type: String, default: '-' },
                po5: { type: String, default: '-' },
                po6: { type: String, default: '-' },
                po7: { type: String, default: '-' },
                po8: { type: String, default: '-' },
                po9: { type: String, default: '-' },
                po10: { type: String, default: '-' },
                po11: { type: String, default: '-' },
                po12: { type: String, default: '-' },
                pso1: { type: String, default: '-' },
                pso2: { type: String, default: '-' },
                pso3: { type: String, default: '-' }
            }],
            experiments: [{
                sNo: String,
                name: String,
                co: String,
                rbtLevel: String
            }]
        }],
        updatedAt: { type: Date, default: Date.now }
    }))
};
