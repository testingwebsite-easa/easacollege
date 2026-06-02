require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Import auth routes
const { router: authRouter } = require('./routes/auth');
// Import outcomes routes
const { router: outcomesRouter, setProgramOutcomeModel } = require('./routes/outcomes');
// Import departments routes
const departmentsRouter = require('./routes/departments');

// Load env vars from the same directory as index.js
console.log("IMPORTED SCHEMAS KEYS:", Object.keys(require('./models/Schemas')));
const {
    Faculty, FacultyStat, NewsEvent, HeroSlide, GalleryEvent, GalleryImage,
    PlacementPartner, ManagementMember, Program, Admission, Session,
    MissionVision, CoreBelief, UGCourse, Department, Resource, PageContent,
    ResearchItem, Career, JobApplication, LifeOfEASA, InstituteMilestone,
    Institution, Infrastructure, Sustainability, CommunityOutreach, Alumni,
    Enquiry, TickerAlert, LibraryData, Scholarship, PopupAlert, PlacementPage,
    VideoGallery, Grievance, VirtualTour, PageHero, Sport, Moment, Advice,
    FestPage, User, ProgramOutcome
} = require('./models/Schemas');
console.log("FestPage Check:", FestPage);


const app = express();
const port = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
let isConnected = false;
console.log("----------------------");
console.log("SERVER STATING UP");
console.log("BASE_URL IS CONFIGUED TO:", BASE_URL);
console.log("STORAGE: Local Disk");
// Research Items enabled
console.log("----------------------");
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
    console.error("WARNING: AWS Credentials or Bucket Name missing in environment variables!");
    console.error("Uploads to S3 will FAIL.");
} else {
    console.log("AWS Configuration Found. Region:", process.env.AWS_REGION);
}


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const multer = require('multer');
const { uploadS3 } = require('./config/s3');
const { transporter, sendEmail } = require('./config/email');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// --- Local Storage Setup ---
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            // Keep original name but prepend timestamp to avoid collisions
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            // Sanitize filename to remove special chars
            const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
            cb(null, `${uniqueSuffix}-${cleanName}`);
        }
    }),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

console.log("Local Disk Storage Initialized (public/images)");

// Debug Route to check config status (Securely)
app.get('/api/debug-config', (req, res) => {
    res.json({
        storage: 'local',
        upload_dir_exists: fs.existsSync(uploadDir)
    });
});

// Wrapped Upload Route with Error Handling
app.post('/api/upload', (req, res) => {
    // Safe middleware selector
    const isAwsConfigured = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_BUCKET_NAME;

    const uploadMiddleware = isAwsConfigured ? uploadS3.single('image') : upload.single('image');

    uploadMiddleware(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err);
            return res.status(500).json({
                error: 'Upload Failed',
                details: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Determine URL based on storage method
        let fileUrl;
        if (isAwsConfigured && req.file.location) {
            fileUrl = req.file.location;
        } else {
            // Construct absolute URL for local file
            // Assuming the server is hosted at BASE_URL or req.get('host')
            // construct fully qualified URL to avoid frontend relative path issues
            const protocol = req.protocol; // http or https
            const host = req.get('host'); // host:port
            fileUrl = `${protocol}://${host}/images/${req.file.filename}`;

            // Log warning mechanism
            console.warn("WARN: Image uploaded locally (AWS credentials missing). URL:", fileUrl);
        }

        res.json({ url: fileUrl });
    });
});


app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/docs', express.static(path.join(__dirname, 'public/docs')));

// Register routes
app.use('/api/auth', authRouter);
app.use('/api/outcomes', outcomesRouter);
app.use('/api/departments', departmentsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to EASA College API');
});

// --- Authentication ---
// Default development admin password (matches QUICK_START.md)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const jwt = require('jsonwebtoken');

// Setup Password Hashing Helpers
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
    if (!storedHash.includes(':')) {
        // Legacy plain text check
        return password === storedHash;
    }
    const [salt, key] = storedHash.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return key === hash;
};

console.log("----------------------");
console.log("AUTH CONFIGURATION");
console.log("Admin Password Set:", ADMIN_PASSWORD ? "YES (Hidden)" : "NO (Defaulting)");
console.log("JWT Secret Set:", JWT_SECRET ? "YES (Hidden)" : "NO (Defaulting)");
console.log("----------------------");

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for: ${username}`);

    try {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });

        const user = await User.findOne({ username });

        // Check if user exists and verify password
        if (user && verifyPassword(password, user.password)) {
            console.log("Password matched. Generating token...");
            const token = jwt.sign(
                { role: user.role, username: user.username, id: user._id },
                JWT_SECRET,
                { expiresIn: '30d' }
            );
            res.json({
                success: true,
                token,
                user: { id: user._id, username: user.username, role: user.role }
            });
        } else {
            console.warn("Invalid login credentials.");
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// --- In-Memory Caching Layer ---
// This significantly speeds up read operations by avoiding DB hits for frequent requests.
const memoryCache = {};

const getCache = (key) => memoryCache[key];
const setCache = (key, data) => { memoryCache[key] = data; };
const clearCache = (key) => {
    delete memoryCache[key];
    console.log(`Cache cleared for: ${key}`);
};

// Helper middleware or wrapper could be used, but applying directly for clarity
// --- JWT Verification Middleware ---
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = decoded;
        next();
    });
};

// --- User Management Routes ---
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.get('/api/users/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and password required" });

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: "Username already exists" });

        const newUser = new User({ username, password: hashPassword(password), role: role || 'staff' });
        await newUser.save();
        res.json({ success: true, data: newUser });
    } catch (err) {
        console.error("User creation error:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.delete('/api/users/:id', verifyToken, async (req, res) => {
    try {
        // Prevent deleting the last admin
        const [count, userToDelete] = await Promise.all([
            User.countDocuments({ role: 'admin' }),
            User.findById(req.params.id)
        ]);

        if (userToDelete && userToDelete.role === 'admin' && count <= 1) {
            return res.status(400).json({ error: "Cannot delete the last admin user" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

app.put('/api/users/:id', verifyToken, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const updateData = { username, role };
        if (password) updateData.password = hashPassword(password);
        const user = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true }).select('-password');
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

app.patch('/api/users/:id', verifyToken, async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.password) updateData.password = hashPassword(updateData.password);
        const user = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true }).select('-password');
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

// --- Admission Routes ---

app.get('/api/admissions/export', verifyToken, async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });

        const fields = ['name', 'email', 'phone', 'course', 'community', 'district', 'state', 'status', 'createdAt', 'dob', 'gender', 'fatherName', 'motherName', 'address', 'pincode', 'aadhaar', 'sslcMark', 'hscMark'];
        const csvHeader = fields.join(',') + '\n';

        const csvRows = admissions.map(row => {
            return fields.map(field => {
                let val = row[field] || '';
                // Handle dates
                if (val instanceof Date) val = val.toISOString().split('T')[0];
                // Escape commas and quotes
                val = String(val).replace(/"/g, '""');
                return `"${val}"`;
            }).join(',');
        });

        const csvString = csvHeader + csvRows.join('\n');

        res.header('Content-Type', 'text/csv');
        res.attachment('admissions_list.csv');
        res.send(csvString);

    } catch (err) {
        console.error("Export Error:", err);
        res.status(500).json({ error: "Failed to export admissions" });
    }
});

// -------------------------------

// --- FALLBACK DATA ---
const {
    facultyStatsData,
    newsEventsData,
    heroSlidesData,
    galleryImagesData,
    placementPartnersData,
    managementTeamData,
    programsData,
    missionVisionData,
    coreBeliefsData,
    ugCoursesData,
    pgCoursesData,
    departmentsData,
    researchCoursesData,
    researchItemsData,
    careersData,
    pagesData,
    tickerAlertsData,
    institutionData,
    infrastructureData,
    sustainabilityData,
    communityOutreachData,
    scholarshipsData,
    placementPageData,
    sportsData,
    resourcesData
} = require('./data');

// Seed Initial Admin User


const seedAdmin = async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            const adminPass = ADMIN_PASSWORD;
            const admin = new User({
                username: 'admin',
                password: hashPassword(adminPass), // Hash password
                role: 'admin',
                isApproved: true
            });
            await admin.save();
            console.log('Initial admin user seeded.');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
};

// --- Database Connection ---
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        isConnected = true;
        console.log("Successfully connected to MongoDB");
        try {
            await seedAdmin(); // Seed admins first as others might depend on it
            // Parallelize the rest of the initialization
            await Promise.all([
                seedData(),
                fixLegacyUrls(),
                fixProgramLinks()
            ]);
        } catch (err) {
            console.error("Initialization error after connection:", err.message);
        }
    })
    .catch(err => {
        console.error("CRITICAL: MongoDB Connection Failed!", err.message);
        console.log("Environment state:", {
            has_uri: !!process.env.MONGO_URI,
            node_env: process.env.NODE_ENV,
            port: port
        });
        isConnected = false;
    });

// --- Health Check Endpoint ---
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: isConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

const seedData = async () => {
    try {
        const seedIfEmpty = async (Model, data, query = {}, isCreate = false) => {
            const count = await Model.countDocuments(query);
            if (count === 0) {
                if (isCreate) await Model.create(data);
                else await Model.insertMany(data);
            }
        };

        const librarySeed = async () => {
            const libCount = await LibraryData.countDocuments();
            if (libCount === 0) {
                await LibraryData.create({
                    overview: {
                        title: 'Welcome to Central Library',
                        subtitle: 'The Heart of Learning & Research at EASA',
                        description: `The EASA Central Library is a cornerstone of our academic excellence. It is meticulously designed to provide a serene and technologically advanced environment for students and faculty alike.\n\nWith over 35,000 volumes across diverse disciplines, our library serves as a knowledge nexus where tradition meets innovation. Whether you are seeking physical textbooks or accessing global electronic databases, we offer the resources necessary for your academic journey.`,
                        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
                        stats: [
                            { label: 'Books', value: '35,000+' },
                            { label: 'Journals', value: '150+' },
                            { label: 'E-Books', value: '5,000+' },
                            { label: 'Capacity', value: '300+' },
                        ],
                        highlights: [
                            'State-of-the-art Digital Library',
                            'Fully Automated Search (OPAC)',
                            'Dedicated Research Section',
                            '24/7 E-Resource Access'
                        ]
                    },
                    eResources: [
                        { name: 'IEEE Xplore', desc: 'The world\'s leading repository for engineering and technology research.', link: 'https://ieeexplore.ieee.org/', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png' },
                        { name: 'J-GATE', desc: 'Electronic gateway to global e-journal literature.', link: '#', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/J-Gate_Logo.png' },
                        { name: 'DELNET', desc: 'Inter-library loan and resource sharing network.', link: 'https://delnet.in/', logo: '' },
                        { name: 'National Digital Library (NDLI)', desc: 'A virtual repository of learning resources for the nation.', link: 'https://ndl.iitkgp.ac.in/', logo: '' }
                    ],
                    openAccess: [
                        { name: 'DOAJ (Journals)', url: 'https://doaj.org/', logo: 'https://doaj.org/static/doaj/images/logo.png' },
                        { name: 'DOAB (Books)', url: 'https://www.doabooks.org/', logo: '' },
                        { name: 'NPTEL Video Lectures', url: 'https://nptel.ac.in/', logo: 'https://nptel.ac.in/assets/nptel_assets/images/nptel-logo.png' },
                        { name: 'SWAYAM Courses', url: 'https://swayam.gov.in/', logo: '' },
                        { name: 'Shodhganga (Theses)', url: 'https://shodhganga.inflibnet.ac.in/', logo: '' }
                    ],
                    ndli: {
                        description: `EASA College of Engineering is a registered member of the National Digital Library of India Club. Our students gain exclusive access to specialized webinars, certification programs, and a massive repository of over 6 crore learning resources.`,
                        benefits: [
                            'Exclusive training webinars by subject experts.',
                            'Participation in National level competitions.',
                            'Seamless access through Mobile Apps.',
                            'Digital Certification for active participants.'
                        ]
                    },
                    rules: [
                        'Strict silence must be observed within the library premises.',
                        'Valid Identity Cards are mandatory for entry and all transactions.',
                        'Mobile phones must be switched off or placed in silent mode.',
                        'Personal belongings like bags and umbrellas must be left at the property counter.',
                        'Damaging books or library property will lead to heavy penalties.',
                        'Books must be returned or renewed on or before the due date.'
                    ],
                    academicProfile: [
                        { name: 'ORCID ID', desc: 'Universal researcher identifier for seamless citation tracking.' },
                        { name: 'Google Scholar', desc: 'Public profile for tracking citations and H-index.' },
                        { name: 'Vidwan Profile', desc: 'The National portal for Indian researchers.' },
                        { name: 'ResearchGate', desc: 'Professional network for scientists and researchers.' }
                    ],
                    opac: {
                        description: 'Our Online Public Access Catalog allows you to search for books, check availability, and track your borrowed items from any device.',
                        cta: 'Launch Web OPAC Interface',
                        link: '#'
                    },
                    staff: [
                        { name: 'Dr. Subramanian', role: 'Librarian', image: '' },
                        { name: 'Mr. Rajesh', role: 'Asst. Librarian', image: '' },
                        { name: 'Ms. Priya', role: 'Library Assistant', image: '' }
                    ],
                    gallery: [
                        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
                        'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
                        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
                        'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9',
                        'https://images.unsplash.com/photo-1568667256549-094345857637',
                        'https://images.unsplash.com/photo-1507842217343-583bb7270b66'
                    ]
                });
                console.log("Seeded Library Data");
            }
        };

        await Promise.all([
            seedIfEmpty(FacultyStat, facultyStatsData),
            seedIfEmpty(NewsEvent, newsEventsData),
            seedIfEmpty(HeroSlide, heroSlidesData),
            seedIfEmpty(GalleryImage, galleryImagesData),
            seedIfEmpty(PlacementPartner, placementPartnersData),
            seedIfEmpty(ManagementMember, managementTeamData),
            seedIfEmpty(Program, programsData),
            seedIfEmpty(MissionVision, missionVisionData, {}, true),
            seedIfEmpty(CoreBelief, coreBeliefsData),
            seedIfEmpty(UGCourse, ugCoursesData, { category: 'UG' }),
            seedIfEmpty(UGCourse, pgCoursesData, { category: 'PG' }),
            librarySeed(),
            seedIfEmpty(Department, departmentsData),
            seedIfEmpty(UGCourse, researchCoursesData, { category: 'Research' }),
            seedIfEmpty(ResearchItem, researchItemsData),
            seedIfEmpty(Career, careersData),
            seedIfEmpty(TickerAlert, tickerAlertsData),
            seedIfEmpty(Institution, institutionData, {}, true),
            seedIfEmpty(Infrastructure, infrastructureData, {}, true),
            seedIfEmpty(Sustainability, sustainabilityData, {}, true),
            seedIfEmpty(CommunityOutreach, communityOutreachData, {}, true),
            seedIfEmpty(Scholarship, scholarshipsData),
            seedIfEmpty(PlacementPage, placementPageData, {}, true),
            seedIfEmpty(Sport, sportsData)
        ]);

        // Seeding Resources: Sync from data.js
        if (resourcesData && resourcesData.length > 0) {
            console.log("Seeding/Updating Resources...");
            // Clear existing resources for these categories to prevent duplicates when titles change
            const categories = [...new Set(resourcesData.map(r => r.category))];
            await Resource.deleteMany({ category: { $in: categories } });

            // Insert fresh data
            await Resource.insertMany(resourcesData);
        }

        // Seeding Pages: Upsert to guarantee Gen Z content exists
        if (pagesData && pagesData.length > 0) {
            console.log("Seeding/Updating Pages Data...");
            await Promise.all(pagesData.map(page => 
                PageContent.findOneAndUpdate(
                    { slug: page.slug },
                    page,
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                )
            ));
        }

        console.log("Data seeding checked/completed.");
    } catch (err) {
        console.error("Error seeding data:", err);
    }
};

const fixLegacyUrls = async () => {
    const updateUrl = async (Model, field) => {
        try {
            const docs = await Model.find({ [field]: /localhost/ });
            if (docs.length > 0) {
                console.log(`Fixing ${docs.length} legacy URLs in ${Model.modelName}...`);
                for (const doc of docs) {
                    doc[field] = doc[field].replace(/http:\/\/localhost:\d+/, BASE_URL);
                    await doc.save();
                }
                console.log(`Fixed URLs in ${Model.modelName}`);
            }
        } catch (e) {
            console.error(`Error fixing URLs for ${Model.modelName}:`, e);
        }
    };

    await Promise.all([
        updateUrl(NewsEvent, 'image'),
        updateUrl(HeroSlide, 'image'),
        updateUrl(GalleryImage, 'src'),
        updateUrl(PlacementPartner, 'logo'),
        updateUrl(ManagementMember, 'image_url'),
        updateUrl(Program, 'image'),
        updateUrl(UGCourse, 'image'),
        updateUrl(Department, 'heroImage'),
        updateUrl(Department, 'hod.image'),
        updateUrl(ResearchItem, 'image'),
        updateUrl(Resource, 'fileUrl')
    ]);
};

const fixProgramLinks = async () => {
    console.log("Fixing/Updating program links...");
    try {
        for (const p of programsData) {
            if (p.link) {
                await Program.updateOne(
                    { title: p.title },
                    { $set: { link: p.link } }
                );
            }
        }
        console.log("Program links updated/verified.");
    } catch (err) {
        console.error("Error fixing program links:", err);
    }
};

// Routes
app.get('/api/faculty-stats', async (req, res) => {
    const cached = getCache('faculty-stats');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(facultyStatsData);
    try {
        const stats = await FacultyStat.find();
        const data = stats.length ? stats : facultyStatsData;
        setCache('faculty-stats', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching faculty-stats:", err);
        res.json(facultyStatsData);
    }

});

app.post('/api/faculty-stats', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new FacultyStat(req.body);
        await item.save();
        clearCache('faculty-stats');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/faculty-stats/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await FacultyStat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('faculty-stats');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/faculty-stats/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await FacultyStat.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('faculty-stats');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/faculty-stats/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await FacultyStat.findByIdAndDelete(req.params.id);
        clearCache('faculty-stats');
        res.json({ message: "Deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

app.get('/api/news-events', async (req, res) => {
    try {
        const { category, limit, sort } = req.query;
        const cacheKey = `news-events${category ? '-' + category : ''}`;

        // Check cache first
        const cached = getCache(cacheKey);
        if (cached) {
            console.log("Serving news/events from cache");
            return res.json(cached);
        }

        if (!isConnected) {
            console.log("Database not connected, returning fallback data");
            return res.json(newsEventsData);
        }

        // Build query
        const query = category ? { category } : {};
        let dbQuery = NewsEvent.find(query);

        // Apply sorting
        if (sort === 'oldest') {
            dbQuery = dbQuery.sort({ date: 1 });
        } else {
            dbQuery = dbQuery.sort({ date: -1 }); // Default: newest first
        }

        // Apply limit if specified
        if (limit) {
            const limitNum = parseInt(limit);
            if (limitNum > 0 && limitNum <= 100) {
                dbQuery = dbQuery.limit(limitNum);
            }
        }

        const events = await dbQuery;
        const data = events.length ? events : newsEventsData;

        // Cache the result
        setCache(cacheKey, data);

        res.json(data);
    } catch (err) {
        console.error("Error fetching news-events:", err);
        res.status(500).json({
            error: "Failed to fetch news/events",
            details: err.message
        });
    }
});

// Get single news/event by ID
app.get('/api/news-events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        if (!isConnected) {
            return res.status(503).json({ error: "Database not connected" });
        }

        const event = await NewsEvent.findById(id);

        if (!event) {
            return res.status(404).json({ error: "News/Event not found" });
        }

        res.json(event);
    } catch (err) {
        console.error("Error fetching single news/event:", err);
        res.status(500).json({
            error: "Failed to fetch news/event",
            details: err.message
        });
    }
});

app.post('/api/news-events', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    try {
        // Validate required fields
        const { title, image, date, category, desc } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        const item = new NewsEvent({
            title: title.trim(),
            image: image || '',
            date: new Date(date),
            category: category || 'General',
            desc: desc || '',
            pdf_url: req.body.pdf_url || ''
        });

        const savedItem = await item.save();

        // Clear all related caches
        clearCache('news-events');
        clearCache('news-events' + 'all');
        if (category) clearCache('news-events' + category);

        console.log("News/Event created successfully:", savedItem._id);
        res.status(201).json({
            success: true,
            message: "News/Event created successfully",
            data: savedItem
        });
    } catch (err) {
        console.error("Error creating news/event:", err);
        res.status(500).json({ error: "Failed to create news/event", details: err.message });
    }
});

app.put('/api/news-events/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Check if item exists
        const existingItem = await NewsEvent.findById(id);
        if (!existingItem) {
            return res.status(404).json({ error: "News/Event not found" });
        }

        // Prepare update data
        const updateData = {
            title: req.body.title || existingItem.title,
            image: req.body.image !== undefined ? req.body.image : existingItem.image,
            date: req.body.date ? new Date(req.body.date) : existingItem.date,
            category: req.body.category || existingItem.category,
            desc: req.body.desc !== undefined ? req.body.desc : existingItem.desc,
            pdf_url: req.body.pdf_url !== undefined ? req.body.pdf_url : existingItem.pdf_url
        };

        // Trim string fields
        if (updateData.title) updateData.title = updateData.title.trim();
        if (updateData.desc) updateData.desc = updateData.desc.trim();

        const updatedItem = await NewsEvent.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        // Clear all related caches
        clearCache('news-events');
        clearCache('news-events' + 'all');
        clearCache('news-events' + (existingItem.category || ''));
        clearCache('news-events' + (req.body.category || ''));

        console.log("News/Event updated successfully:", id);
        res.json({
            success: true,
            message: "News/Event updated successfully",
            data: updatedItem
        });
    } catch (err) {
        console.error("Error updating news/event:", err);
        res.status(500).json({ error: "Failed to update news/event", details: err.message });
    }
});

app.patch('/api/news-events/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const updatedItem = await NewsEvent.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        clearCache('news-events');
        res.json({ success: true, data: updatedItem });
    } catch (err) {
        res.status(500).json({ error: "Failed to update news/event" });
    }
});

app.delete('/api/news-events/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Check if item exists before deleting
        const existingItem = await NewsEvent.findById(id);
        if (!existingItem) {
            return res.status(404).json({ error: "News/Event not found" });
        }

        await NewsEvent.findByIdAndDelete(id);

        // Clear all related caches
        clearCache('news-events');
        clearCache('news-events' + 'all');
        clearCache('news-events' + (existingItem.category || ''));

        console.log("News/Event deleted successfully:", id);
        res.json({
            success: true,
            message: "News/Event deleted successfully",
            deletedId: id
        });
    } catch (err) {
        console.error("Error deleting news/event:", err);
        res.status(500).json({ error: "Failed to delete news/event", details: err.message });
    }
});

app.get('/api/hero-slides', async (req, res) => {
    const cached = getCache('hero-slides');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(heroSlidesData);
    try {
        const slides = await HeroSlide.find();
        const data = slides.length ? slides : heroSlidesData;
        setCache('hero-slides', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching hero-slides:", err);
        res.json(heroSlidesData);
    }

});

app.post('/api/hero-slides', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new HeroSlide(req.body);
        await item.save();
        clearCache('hero-slides');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/hero-slides/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('hero-slides');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/hero-slides/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await HeroSlide.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('hero-slides');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/hero-slides/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await HeroSlide.findByIdAndDelete(req.params.id);
        clearCache('hero-slides');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

app.get('/api/gallery-images', async (req, res) => {
    const cached = getCache('gallery-images');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(galleryImagesData);
    try {
        const images = await GalleryImage.find();
        const data = images.length ? images : galleryImagesData;
        setCache('gallery-images', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching gallery-images:", err);
        res.json(galleryImagesData);
    }

});

app.post('/api/gallery-images', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new GalleryImage(req.body);
        await item.save();
        clearCache('gallery-images');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/gallery-images/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('gallery-images');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/gallery-images/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await GalleryImage.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('gallery-images');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/gallery-images/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await GalleryImage.findByIdAndDelete(req.params.id);
        clearCache('gallery-images');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

// --- Gallery Events Routes ---
app.get('/api/gallery-events', async (req, res) => {
    try {
        const events = await GalleryEvent.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error("Error fetching gallery-events:", err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

app.post('/api/gallery-events', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new GalleryEvent(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create event" });
    }
});

app.put('/api/gallery-events/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await GalleryEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update event" });
    }
});

app.patch('/api/gallery-events/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await GalleryEvent.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update event" });
    }
});

app.delete('/api/gallery-events/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await GalleryEvent.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete event" });
    }
});

// --- Fest Page Routes ---
app.get('/api/fest-page', async (req, res) => {
    try {
        let page = await FestPage.findOne();
        if (!page) {
            page = new FestPage({
                title: 'Dhruva Fest',
                subtitle: 'Celebrating Talent & Culture',
                heroImage: ''
            });
            await page.save();
        }
        res.json(page);
    } catch (err) {
        console.error("Error fetching fest-page:", err);
        res.status(500).json({ error: "Failed to fetch fest page" });
    }
});

app.put('/api/fest-page', async (req, res) => {
    try {
        const updated = await FestPage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updated);
    } catch (err) {
        console.error("Error updating fest-page:", err);
        res.status(500).json({ error: "Update failed" });
    }
});

app.patch('/api/fest-page', async (req, res) => {
    try {
        const updated = await FestPage.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
        res.json(updated);
    } catch (err) {
        console.error("Error patching fest-page:", err);
        res.status(500).json({ error: "Patch failed" });
    }
});

app.get('/api/placement-partners', async (req, res) => {
    const { split } = req.query;
    const cacheKey = `placement-partners${split === 'true' ? '-split' : ''}`;
    
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    if (!isConnected) {
        if (split === 'true') {
            return res.json({
                row1: placementPartnersData.filter(p => p.row === 1),
                row2: placementPartnersData.filter(p => p.row === 2)
            });
        }
        return res.json(placementPartnersData);
    }

    try {
        const partners = await PlacementPartner.find().sort({ name: 1 });
        const partnersToReturn = partners.length ? partners : placementPartnersData;

        let responseData;
        if (split === 'true') {
            responseData = {
                row1: partnersToReturn.filter(p => p.row === 1 || !p.row),
                row2: partnersToReturn.filter(p => p.row === 2)
            };
        } else {
            responseData = partnersToReturn;
        }

        setCache(cacheKey, responseData);
        res.json(responseData);
    } catch (err) {
        console.error("Error fetching placement-partners:", err);
        if (split === 'true') {
            return res.json({
                row1: placementPartnersData.filter(p => p.row === 1 || !p.row),
                row2: placementPartnersData.filter(p => p.row === 2)
            });
        }
        res.json(placementPartnersData);
    }
});

app.post('/api/placement-partners', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new PlacementPartner(req.body);
        await item.save();
        clearCache('placement-partners');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/placement-partners/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PlacementPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('placement-partners');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/placement-partners/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PlacementPartner.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('placement-partners');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/placement-partners/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await PlacementPartner.findByIdAndDelete(req.params.id);
        clearCache('placement-partners');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

app.get('/api/management-team', async (req, res) => {
    const cached = getCache('management-team' + (req.query.category || ''));
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(managementTeamData);
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const team = await ManagementMember.find(query).sort({ order: 1 });
        const data = team.length ? team : managementTeamData;
        setCache('management-team' + (req.query.category || ''), data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching management-team:", err);
        res.json(managementTeamData);
    }
});

// Management Team CRUD
app.post('/api/management-team', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new ManagementMember(req.body);
        await item.save();
        clearCache('management-team');
        if (item.category) clearCache('management-team' + item.category);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/management-team/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await ManagementMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('management-team');
        if (item && item.category) clearCache('management-team' + item.category);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/management-team/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await ManagementMember.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('management-team');
        if (item && item.category) clearCache('management-team' + item.category);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/management-team/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await ManagementMember.findById(req.params.id);
        await ManagementMember.findByIdAndDelete(req.params.id);
        clearCache('management-team');
        if (item && item.category) clearCache('management-team' + item.category);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});



app.get('/api/programs', async (req, res) => {
    const cached = getCache('programs');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(programsData);
    try {
        const programs = await Program.find();
        const data = programs.length ? programs : programsData;
        setCache('programs', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching programs:", err);
        res.json(programsData);
    }

});

app.post('/api/programs', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Program(req.body);
        await item.save();
        clearCache('programs');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/programs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('programs');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/programs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Program.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('programs');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/programs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Program.findByIdAndDelete(req.params.id);
        clearCache('programs');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

app.get('/api/life-at-EASA', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const items = await LifeOfEASA.find(query).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error("Error fetching LifeOfEASA:", err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

app.post('/api/life-at-EASA', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const newItem = new LifeOfEASA(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error("Error creating LifeOfEASA item:", err);
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/life-at-EASA/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const updatedItem = await LifeOfEASA.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ error: "Item not found" });
        res.json(updatedItem);
    } catch (err) {
        console.error("Error updating LifeOfEASA item:", err);
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/life-at-EASA/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const updatedItem = await LifeOfEASA.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedItem) return res.status(404).json({ error: "Item not found" });
        res.json(updatedItem);
    } catch (err) {
        console.error("Error patching LifeOfEASA item:", err);
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/life-at-EASA/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const deletedItem = await LifeOfEASA.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error("Error deleting LifeOfEASA item:", err);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

app.post('/api/admissions', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const newAdmission = new Admission(req.body);
        await newAdmission.save();

        // --- Send Email Notifications ---
        try {
            const adminMail = {
                to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                subject: `New Admission Form Submission - ${req.body.name}`,
                html: `
                    <h2>New Admission Application Received</h2>
                    <p><strong>Name:</strong> ${req.body.name}</p>
                    <p><strong>Email:</strong> ${req.body.email}</p>
                    <p><strong>Phone:</strong> ${req.body.phone}</p>
                    <p><strong>Course:</strong> ${req.body.course}</p>
                    <p><strong>District:</strong> ${req.body.district}, ${req.body.state}</p>
                    <hr />
                    <p>This is an automated notification from the EASA College website.</p>
                `
            };

            const userMail = {
                to: req.body.email,
                subject: `Acknowledgment: Admission Application Received - EASA College`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #1a73e8;">Dear ${req.body.name},</h2>
                        <p>Thank you for showing interest in <strong>EASA College of Engineering and Technology</strong>.</p>
                        <p>We have successfully received your admission application for the <strong>${req.body.course}</strong> course. Our admissions team will review your details and contact you shortly.</p>
                        <p><strong>Summary of your application:</strong></p>
                        <ul>
                            <li><strong>Course:</strong> ${req.body.course}</li>
                            <li><strong>District:</strong> ${req.body.district}</li>
                        </ul>
                        <p>If you have any urgent queries, feel free to contact us at +91 93450 12345.</p>
                        <p>Best regards,<br/><strong>Admissions Team<br/>EASA College</strong></p>
                    </div>
                `
            };

            await Promise.all([
                sendEmail(adminMail),
                sendEmail(userMail)
            ]);
            console.log("Admission notification emails sent successfully");
        } catch (mailErr) {
            console.error("Failed to send admission email notifications:", mailErr.message);
        }

        res.status(201).json({ message: "Admission application submitted successfully" });
    } catch (err) {
        console.error("Error submitting admission:", err);
        res.status(500).json({ error: "Failed to submit application" });
    }
});

app.get('/api/admissions', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });
        res.json(admissions);
    } catch (err) {
        console.error("Error fetching admissions:", err);
        res.status(500).json({ error: "Failed to fetch admissions" });
    }
});

app.delete('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { id } = req.params;
        const result = await Admission.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: "Admission not found" });
        res.json({ message: "Admission deleted successfully" });
    } catch (err) {
        console.error("Error deleting admission:", err);
        res.status(500).json({ error: "Failed to delete admission" });
    }
});

app.put('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { id } = req.params;
        const result = await Admission.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) return res.status(404).json({ error: "Admission not found" });
        res.json(result);
    } catch (err) {
        console.error("Error updating admission:", err);
        res.status(500).json({ error: "Failed to update admission" });
    }
});

app.patch('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { id } = req.params;
        const result = await Admission.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!result) return res.status(404).json({ error: "Admission not found" });
        res.json(result);
    } catch (err) {
        console.error("Error patching admission:", err);
        res.status(500).json({ error: "Failed to update admission" });
    }
});

const OUTCOME_FIELDS = new Set(['po', 'peo', 'pso', 'wk']);

const normalizeOutcomeType = (type) => {
    const normalizedType = String(type || '').toLowerCase();
    return OUTCOME_FIELDS.has(normalizedType) ? normalizedType : null;
};

const getOutcomeText = (body) => {
    const value = body?.text ?? body?.point ?? body?.value ?? '';
    return String(value).trim();
};

const getOutcomePoints = (department, type) => {
    return Array.isArray(department[type]) ? [...department[type]] : [];
};

const findDepartmentByIdentifier = async (identifier) => {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        return Department.findOne({ $or: [{ _id: identifier }, { slug: identifier }] });
    }
    return Department.findOne({ slug: identifier });
};

const updateDepartmentOutcomePoint = async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    const type = normalizeOutcomeType(req.params.type);
    if (!type) {
        return res.status(400).json({ error: "Invalid outcome type. Use po, peo, pso, or wk." });
    }

    const pointText = getOutcomeText(req.body);
    if (!pointText) {
        return res.status(400).json({ error: "Point text is required" });
    }

    const pointIndex = Number.parseInt(req.params.index, 10);
    if (!Number.isInteger(pointIndex) || pointIndex < 0) {
        return res.status(400).json({ error: "Invalid point index" });
    }

    try {
        const department = await findDepartmentByIdentifier(req.params.identifier);
        if (!department) return res.status(404).json({ error: "Department not found" });

        const points = getOutcomePoints(department, type);
        if (pointIndex >= points.length) {
            return res.status(404).json({ error: "Point not found" });
        }

        points[pointIndex] = pointText;
        department[type] = points;
        await department.save();
        clearCache('departments');

        res.json(department);
    } catch (err) {
        console.error("Error updating department outcome point:", err);
        res.status(500).json({ error: "Failed to update point" });
    }
};

// Department Routes
app.get('/api/departments', async (req, res) => {
    const cached = getCache('departments');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json([]); // Return empty if DB not connected
    try {
        const depts = await Department.find().sort({ order: 1 });
        // REMOVED FALLBACK: const data = depts.length ? depts : departmentsData;
        const data = depts;
        setCache('departments', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching departments:", err);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
});

app.get('/api/departments/:identifier/outcomes', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const department = await findDepartmentByIdentifier(req.params.identifier);
        if (!department) return res.status(404).json({ error: "Department not found" });

        res.json({
            departmentId: department._id,
            slug: department.slug,
            name: department.name,
            po: getOutcomePoints(department, 'po'),
            peo: getOutcomePoints(department, 'peo'),
            pso: getOutcomePoints(department, 'pso'),
            wk: getOutcomePoints(department, 'wk')
        });
    } catch (err) {
        console.error("Error fetching department outcomes:", err);
        res.status(500).json({ error: "Failed to fetch outcomes" });
    }
});

app.get('/api/departments/:identifier/outcomes/:type', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    const type = normalizeOutcomeType(req.params.type);
    if (!type) {
        return res.status(400).json({ error: "Invalid outcome type. Use po, peo, pso, or wk." });
    }

    try {
        const department = await findDepartmentByIdentifier(req.params.identifier);
        if (!department) return res.status(404).json({ error: "Department not found" });

        res.json({
            departmentId: department._id,
            slug: department.slug,
            name: department.name,
            type,
            points: getOutcomePoints(department, type)
        });
    } catch (err) {
        console.error("Error fetching department outcome points:", err);
        res.status(500).json({ error: "Failed to fetch points" });
    }
});

app.post('/api/departments/:identifier/outcomes/:type', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    const type = normalizeOutcomeType(req.params.type);
    if (!type) {
        return res.status(400).json({ error: "Invalid outcome type. Use po, peo, pso, or wk." });
    }

    const pointText = getOutcomeText(req.body);
    if (!pointText) {
        return res.status(400).json({ error: "Point text is required" });
    }

    try {
        const department = await findDepartmentByIdentifier(req.params.identifier);
        if (!department) return res.status(404).json({ error: "Department not found" });

        const points = getOutcomePoints(department, type);
        const insertAt = Number.parseInt(req.body?.position, 10);
        if (Number.isInteger(insertAt) && insertAt >= 0 && insertAt <= points.length) {
            points.splice(insertAt, 0, pointText);
        } else {
            points.push(pointText);
        }

        department[type] = points;
        await department.save();
        clearCache('departments');

        res.status(201).json(department);
    } catch (err) {
        console.error("Error adding department outcome point:", err);
        res.status(500).json({ error: "Failed to add point" });
    }
});

app.put('/api/departments/:identifier/outcomes/:type/:index', updateDepartmentOutcomePoint);
app.patch('/api/departments/:identifier/outcomes/:type/:index', updateDepartmentOutcomePoint);

app.delete('/api/departments/:identifier/outcomes/:type/:index', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });

    const type = normalizeOutcomeType(req.params.type);
    if (!type) {
        return res.status(400).json({ error: "Invalid outcome type. Use po, peo, pso, or wk." });
    }

    const pointIndex = Number.parseInt(req.params.index, 10);
    if (!Number.isInteger(pointIndex) || pointIndex < 0) {
        return res.status(400).json({ error: "Invalid point index" });
    }

    try {
        const department = await findDepartmentByIdentifier(req.params.identifier);
        if (!department) return res.status(404).json({ error: "Department not found" });

        const points = getOutcomePoints(department, type);
        if (pointIndex >= points.length) {
            return res.status(404).json({ error: "Point not found" });
        }

        points.splice(pointIndex, 1);
        department[type] = points;
        await department.save();
        clearCache('departments');

        res.json(department);
    } catch (err) {
        console.error("Error deleting department outcome point:", err);
        res.status(500).json({ error: "Failed to delete point" });
    }
});

app.get('/api/departments/:slug', async (req, res) => {
    if (!isConnected) {
        const dept = departmentsData.find(d => d.slug === req.params.slug);
        return res.json(dept);
    }
    try {
        const dept = await Department.findOne({ slug: req.params.slug });
        res.json(dept);
    } catch (err) {
        console.error("Error fetching department:", err);
        res.status(500).json({ error: "Failed to fetch department" });
    }
});

app.post('/api/departments', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Department(req.body);
        await item.save();
        clearCache('departments'); // Invalidate cache
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create department" });
    }
});

app.put('/api/departments/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('departments'); // Invalidate cache
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update department" });
    }
});

app.patch('/api/departments/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Department.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('departments'); // Invalidate cache
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update department" });
    }
});

app.delete('/api/departments/:id', verifyToken, async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Department.findByIdAndDelete(req.params.id);
        clearCache('departments'); // Invalidate cache
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete department" });
    }
});

// ==================== FACULTY ROUTES ====================
app.get('/api/faculty', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const { department } = req.query;
        const query = department ? { department } : {};
        const faculty = await Faculty.find(query).select('name designation order department').sort({ order: 1 });
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch faculty" });
    }
});

app.post('/api/faculty', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Faculty(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create faculty" });
    }
});

app.put('/api/faculty/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update faculty" });
    }
});

app.patch('/api/faculty/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Faculty.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update faculty" });
    }
});

app.delete('/api/faculty/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Faculty.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete faculty" });
    }
});

// ==================== DEPARTMENT SPECIFIC ROUTES ====================

app.get('/api/departments/:slug/gallery', async (req, res) => {
    try {
        const { slug } = req.params;
        // Fetch specific department gallery events or images
        // Assuming 'department' field in GalleryEvent stores the slug
        const events = await GalleryEvent.find({ department: slug }).sort({ date: -1 });
        const images = await GalleryImage.find({ department: slug });

        // Combine or return structured
        res.json({ events, images });
    } catch (err) {
        // Fallback to empty if not found or error
        res.json({ events: [], images: [] });
    }
});

app.get('/api/departments/:slug/events', async (req, res) => {
    try {
        const { slug } = req.params;
        // Fetch news events where category matches slug
        // Case insensitive match might be needed, but exact slug is better
        const events = await NewsEvent.find({ category: slug }).sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.json([]);
    }
});


// Mission & Vision Routes
app.get('/api/mission-vision', async (req, res) => {
    const cached = getCache('mission-vision');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(missionVisionData);
    try {
        const data = await MissionVision.findOne();
        const result = data || missionVisionData;
        setCache('mission-vision', result);
        res.json(result);
    } catch (err) {
        console.error("Error fetching mission-vision:", err);
        res.json(missionVisionData);
    }
});

app.put('/api/mission-vision', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        // Update first document or create if it doesn't exist
        const data = await MissionVision.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        clearCache('mission-vision');
        res.json(data);
    } catch (err) {
        console.error("Error updating mission-vision:", err);
        res.status(500).json({ error: "Failed to update Mission & Vision" });
    }
});

app.patch('/api/mission-vision', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const data = await MissionVision.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
        clearCache('mission-vision');
        res.json(data);
    } catch (err) {
        console.error("Error patching mission-vision:", err);
        res.status(500).json({ error: "Failed to update Mission & Vision" });
    }
});

// Core Beliefs Routes
app.get('/api/core-beliefs', async (req, res) => {
    const cached = getCache('core-beliefs');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(coreBeliefsData);
    try {
        const beliefs = await CoreBelief.find();
        const data = beliefs.length ? beliefs : coreBeliefsData;
        setCache('core-beliefs', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching core-beliefs:", err);
        res.json(coreBeliefsData);
    }
});

app.post('/api/core-beliefs', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new CoreBelief(req.body);
        await item.save();
        clearCache('core-beliefs');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/core-beliefs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await CoreBelief.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('core-beliefs');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/core-beliefs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await CoreBelief.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('core-beliefs');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/core-beliefs/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await CoreBelief.findByIdAndDelete(req.params.id);
        clearCache('core-beliefs');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

// Research Courses Routes
app.get('/api/research-courses', async (req, res) => {
    const cached = getCache('research-courses');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(researchCoursesData);
    try {
        const courses = await UGCourse.find({ category: 'Research' });
        const data = courses.length ? courses : researchCoursesData;
        setCache('research-courses', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching research-courses:", err);
        res.json(researchCoursesData);
    }
});

// Resource Routes
app.get('/api/resources', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const resources = await Resource.find(query).sort({ date: -1 });
        res.json(resources);
    } catch (err) {
        console.error("Error fetching resources:", err);
        res.status(500).json({ error: "Failed to fetch resources" });
    }
});

app.post('/api/resources', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Resource(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create resource" });
    }
});

app.put('/api/resources/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update resource" });
    }
});

app.patch('/api/resources/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Resource.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update resource" });
    }
});

app.delete('/api/resources/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete resource" });
    }
});


// ResearchItem Routes
app.get('/api/research-items', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const { category } = req.query;
        // If category is provided, filter by it. "research" might be a catch-all?
        const query = category ? { category } : {};
        const items = await ResearchItem.find(query).sort({ _id: -1 });
        res.json(items);
    } catch (err) {
        console.error("Error fetching research items:", err);
        res.status(500).json({ error: "Failed to fetch research items" });
    }
});

app.post('/api/research-items', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new ResearchItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create research item" });
    }
});

app.put('/api/research-items/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await ResearchItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update research item" });
    }
});

app.patch('/api/research-items/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await ResearchItem.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update research item" });
    }
});

app.delete('/api/research-items/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await ResearchItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete research item" });
    }
});


// PageContent Routes
app.get('/api/pages', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const pages = await PageContent.find();
        res.json(pages);
    } catch (err) {
        console.error("Error fetching pages:", err);
        res.status(500).json({ error: "Failed to fetch pages" });
    }
});

app.get('/api/pages/:slug', async (req, res) => {
    if (!isConnected) {
        const page = pagesData.find(p => p.slug === req.params.slug);
        return page ? res.json(page) : res.status(404).json({ error: "Page not found" });
    }
    try {
        const page = await PageContent.findOne({ slug: req.params.slug });
        if (!page) return res.status(404).json({ error: "Page not found" });
        res.json(page);
    } catch (err) {
        console.error("Error fetching page:", err);
        res.status(500).json({ error: "Failed to fetch page" });
    }
});

app.post('/api/pages', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new PageContent(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create page" });
    }
});

app.put('/api/pages/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PageContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update page" });
    }
});

app.patch('/api/pages/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PageContent.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update page" });
    }
});

app.delete('/api/pages/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await PageContent.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete page" });
    }
});

// ==================== CAREER ENDPOINTS ====================
app.get('/api/careers', async (req, res) => {
    const cached = getCache('careers');
    if (cached) return res.json(cached);

    if (!isConnected) return res.json(careersData);
    try {
        const { status, type, department } = req.query;
        let query = {};

        if (status) query.status = status;
        if (type) query.type = type;
        if (department) query.department = department;

        const careers = await Career.find(query).sort({ postedDate: -1 });
        const data = careers.length ? careers : careersData;
        setCache('careers', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching careers:", err);
        res.json(careersData);
    }
});

app.get('/api/careers/:id', async (req, res) => {
    if (!isConnected) {
        const career = careersData.find(c => c._id === req.params.id);
        return res.json(career || {});
    }
    try {
        const career = await Career.findById(req.params.id);
        res.json(career);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch career" });
    }
});

app.post('/api/careers', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const career = new Career(req.body);
        await career.save();
        clearCache('careers');
        res.status(201).json(career);
    } catch (err) {
        res.status(500).json({ error: "Failed to create career" });
    }
});

app.put('/api/careers/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('careers');
        res.json(career);
    } catch (err) {
        res.status(500).json({ error: "Failed to update career" });
    }
});

app.patch('/api/careers/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('careers');
        res.json(career);
    } catch (err) {
        res.status(500).json({ error: "Failed to update career" });
    }
});

app.delete('/api/careers/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Career.findByIdAndDelete(req.params.id);
        clearCache('careers');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete career" });
    }
});

// Local store for offline mode
let localApplicationsStore = [];

app.post('/api/job-applications', (req, res) => {
    // Use S3 Upload Middleware
    const uploadResume = uploadS3.single('resume');

    uploadResume(req, res, async (err) => {
        if (err) {
            console.error("Upload Error in Job Application:", err);
            return res.status(400).json({ success: false, message: "File Upload Failed: " + err.message });
        }

        if (!isConnected) {
            console.log("DB Offline: Saving application to local memory");
            try {
                let applicationData;
                if (req.body.data) {
                    try { applicationData = JSON.parse(req.body.data); } catch (e) { return res.status(400).json({ success: false, message: "Invalid JSON" }); }
                } else { applicationData = req.body; }

                if (req.file) {
                    // S3 upload successful even if DB is offline, or handle otherwise
                    applicationData.resumeUrl = req.file.location || req.file.path;
                }

                applicationData._id = "local_" + Date.now();
                applicationData.submittedAt = new Date();

                localApplicationsStore.push(applicationData);
                return res.status(201).json({ success: true, message: "Application submitted (Offline Mode)" });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Failed to save locally" });
            }
        }

        try {
            let applicationData;
            // Handle multipart/form-data where 'data' is a JSON string
            if (req.body.data) {
                try {
                    applicationData = JSON.parse(req.body.data);
                } catch (e) {
                    console.error("JSON Parse Error:", e, req.body.data);
                    return res.status(400).json({ success: false, message: "Invalid JSON data provided" });
                }
            } else {
                applicationData = req.body;
            }

            if (req.file) {
                console.log("File Uploaded to S3:", req.file.location);
                applicationData.resumeUrl = req.file.location;
            } else {
                console.warn("No resume file received");
            }

            console.log("Processing Application for:", applicationData.fullName);

            const application = new JobApplication(applicationData);
            await application.save();

            // --- Send Email Notifications ---
            try {
                const adminMail = {
                    to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                    subject: `New Job Application Received - ${applicationData.fullName}`,
                    html: `
                        <h2>New Job Application Received</h2>
                        <p><strong>FullName:</strong> ${applicationData.fullName}</p>
                        <p><strong>Email:</strong> ${applicationData.email}</p>
                        <p><strong>Position Applied For:</strong> ${applicationData.positionAppliedFor || applicationData.postAppliedFor}</p>
                        <p><strong>Resume URL:</strong> <a href="${applicationData.resumeUrl}">${applicationData.resumeUrl}</a></p>
                        <hr />
                        <p>This is an automated notification from the EASA College website.</p>
                    `
                };

                const userMail = {
                    to: applicationData.email,
                    subject: `Job Application Received - EASA College HR`,
                    html: `
                        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                            <h2>Hello ${applicationData.fullName},</h2>
                            <p>Thank you for applying for a position at <strong>EASA College of Engineering and Technology</strong>.</p>
                            <p>We have received your application for the position of <strong>${applicationData.positionAppliedFor || applicationData.postAppliedFor}</strong>. Our HR department will review your profile and get back to you if your skills match our requirements.</p>
                            <p>Thank you for your interest in joining our team!</p>
                            <p>Best regards,<br/><strong>Human Resources Dept<br/>EASA College</strong></p>
                        </div>
                    `
                };

                await Promise.all([
                    sendEmail(adminMail),
                    sendEmail(userMail)
                ]);
                console.log("Job application notification emails sent successfully");
            } catch (mailErr) {
                console.error("Failed to send job application email notifications:", mailErr.message);
            }

            res.status(201).json({ success: true, message: "Application submitted successfully" });
        } catch (err) {
            console.error("Job Application Error:", err);
            res.status(500).json({ success: false, message: "Failed to submit application: " + err.message });
        }
    });
});

app.get('/api/job-applications', async (req, res) => {
    if (!isConnected) {
        return res.json(localApplicationsStore.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
    }
    try {
        const applications = await JobApplication.find().sort({ submittedAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch applications" });
    }
});

app.put('/api/job-applications/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update application" });
    }
});

app.patch('/api/job-applications/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await JobApplication.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update application" });
    }
});

app.delete('/api/job-applications/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await JobApplication.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete application" });
    }
});

// ==================== INSTITUTE MILESTONE ENDPOINTS ====================
app.get('/api/institute-milestones', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const items = await InstituteMilestone.find().sort({ year: -1 });
        res.json(items);
    } catch (err) {
        console.error("Error fetching milestones:", err);
        res.status(500).json({ error: "Failed to fetch milestones" });
    }
});

app.post('/api/institute-milestones', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new InstituteMilestone(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create milestone" });
    }
});

app.put('/api/institute-milestones/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await InstituteMilestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update milestone" });
    }
});

app.patch('/api/institute-milestones/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await InstituteMilestone.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update milestone" });
    }
});

app.delete('/api/institute-milestones/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await InstituteMilestone.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete milestone" });
    }
});

// ==================== PAGE CONTENT APIs ====================

app.get('/api/pages', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const pages = await PageContent.find().select('-content -sections'); // List view (lightweight)
        res.json(pages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch pages" });
    }
});

app.get('/api/pages/:slug', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const page = await PageContent.findOne({ slug: req.params.slug });
        if (!page) return res.status(404).json({ error: "Page not found" });
        res.json(page);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch page" });
    }
});

app.post('/api/pages', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const page = new PageContent(req.body);
        await page.save();
        res.status(201).json(page);
    } catch (err) {
        res.status(500).json({ error: "Failed to create page" });
    }
});

app.put('/api/pages/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const page = await PageContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(page);
    } catch (err) {
        res.status(500).json({ error: "Failed to update page" });
    }
});

app.delete('/api/pages/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await PageContent.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete page" });
    }
});

// ==================== NEW PAGE SPECIFIC APIs ====================

// Helper for Singletons
const handleSingleton = async (Model, req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        let item = await Model.findOne();
        if (!item) {
            item = new Model(req.body);
            await item.save();
        } else {
            // Update existing
            Object.assign(item, req.body);
            await item.save();
        }
        res.json(item);
    } catch (err) {
        console.error(`Error updating singleton ${Model.modelName}:`, err);
        res.status(500).json({ error: "Failed to update content" });
    }
};

const getSingleton = async (Model, req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Model.findOne();
        res.json(item || {}); // Return empty obj if not found, frontend handles it
    } catch (err) {
        console.error(`Error fetching singleton ${Model.modelName}:`, err);
        res.status(500).json({ error: "Failed to fetch content" });
    }
}

// Institution
app.get('/api/institution', (req, res) => getSingleton(Institution, req, res));
app.post('/api/institution', (req, res) => handleSingleton(Institution, req, res));
app.put('/api/institution', (req, res) => handleSingleton(Institution, req, res));
app.patch('/api/institution', (req, res) => handleSingleton(Institution, req, res));

// Infrastructure
app.get('/api/infrastructure', (req, res) => getSingleton(Infrastructure, req, res));
app.post('/api/infrastructure', (req, res) => handleSingleton(Infrastructure, req, res));
app.put('/api/infrastructure', (req, res) => handleSingleton(Infrastructure, req, res));
app.patch('/api/infrastructure', (req, res) => handleSingleton(Infrastructure, req, res));

// Sustainability
app.get('/api/sustainability', (req, res) => getSingleton(Sustainability, req, res));
app.post('/api/sustainability', (req, res) => handleSingleton(Sustainability, req, res));
app.put('/api/sustainability', (req, res) => handleSingleton(Sustainability, req, res));
app.patch('/api/sustainability', (req, res) => handleSingleton(Sustainability, req, res));

// Community Outreach
app.get('/api/community-outreach', (req, res) => getSingleton(CommunityOutreach, req, res));
app.post('/api/community-outreach', (req, res) => handleSingleton(CommunityOutreach, req, res));
app.put('/api/community-outreach', (req, res) => handleSingleton(CommunityOutreach, req, res));
app.patch('/api/community-outreach', (req, res) => handleSingleton(CommunityOutreach, req, res));


// ==================== ALUMNI REGISTRATION ENDPOINTS ====================

app.post('/api/alumni', (req, res) => {
    const uploadPhoto = uploadS3.single('photo');

    uploadPhoto(req, res, async (err) => {
        if (err) {
            console.error("Upload Error in Alumni Registration:", err);
            return res.status(400).json({ success: false, message: "File Upload Failed: " + err.message });
        }

        if (!isConnected) return res.status(503).json({ error: "Database not connected" });

        try {
            let alumniData;
            if (req.body.data) {
                try {
                    alumniData = JSON.parse(req.body.data);
                } catch (e) {
                    return res.status(400).json({ success: false, message: "Invalid JSON data provided" });
                }
            } else {
                alumniData = req.body;
            }

            if (req.file) {
                alumniData.photoUrl = req.file.location;
            }

            // --- Generate Automated Alumni ID ---
            // Format: ECET + [Year] + [Sequence] (e.g., ECET20230005)
            let passoutYear = new Date().getFullYear().toString(); // Default to current year
            if (alumniData.batch) {
                const yearMatches = alumniData.batch.match(/20\d{2}/g);
                if (yearMatches && yearMatches.length > 0) {
                    passoutYear = yearMatches[yearMatches.length - 1]; // Take the last mentioned year (usually passout year)
                }
            }

            // Count existing alumni for this specific year to get the next sequence number
            const countInYear = await Alumni.countDocuments({ 
                alumniId: { $regex: `^ECET${passoutYear}` } 
            });
            const sequence = (countInYear + 1).toString().padStart(4, '0');
            alumniData.alumniId = `ECET${passoutYear}${sequence}`;
            // ------------------------------------

            const alumni = new Alumni(alumniData);
            await alumni.save();

            // --- Send Email Notifications ---
            try {
                const adminMail = {
                    to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                    subject: `New Alumni Registration - ${alumniData.fullName}`,
                    html: `
                        <h2>New Alumni Registration Received</h2>
                        <p><strong>Name:</strong> ${alumniData.fullName}</p>
                        <p><strong>Email:</strong> ${alumniData.email}</p>
                        <p><strong>Batch:</strong> ${alumniData.batch}</p>
                        <p><strong>Department:</strong> ${alumniData.department}</p>
                        <p><strong>Alumni ID:</strong> ${alumniData.alumniId}</p>
                        <hr />
                        <p>This is an automated notification from the EASA College website.</p>
                    `
                };

                const userMail = {
                    to: alumniData.email,
                    subject: `Alumni Registration Successful - EASA College`,
                    html: `
                        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                            <h2>Welcome back, ${alumniData.fullName}!</h2>
                            <p>Thank you for registering in the <strong>EASA College Alumni Association</strong>.</p>
                            <p>Your registration is successful. Your Alumni ID is: <strong>${alumniData.alumniId}</strong>.</p>
                            <p>We are excited to have you as part of our global alumni network. Stay tuned for upcoming events and newsletters!</p>
                            <p>Best regards,<br/><strong>Alumni Relations<br/>EASA College</strong></p>
                        </div>
                    `
                };

                await Promise.all([
                    sendEmail(adminMail),
                    sendEmail(userMail)
                ]);
                console.log("Alumni registration notification emails sent successfully");
            } catch (mailErr) {
                console.error("Failed to send alumni email notifications:", mailErr.message);
            }

            res.status(201).json({ success: true, message: "Registration successful", alumni });
        } catch (err) {
            console.error("Alumni Registration Error:", err);
            res.status(500).json({ success: false, message: "Failed to register: " + err.message });
        }
    });
});

app.get('/api/alumni', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const alumni = await Alumni.find().sort({ registeredAt: -1 });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch alumni" });
    }
});

app.put('/api/alumni/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: "Failed to update alumni" });
    }
});

app.patch('/api/alumni/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alumni = await Alumni.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: "Failed to update alumni" });
    }
});

app.delete('/api/alumni/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete alumni" });
    }
});

// ==================== ENQUIRY ENDPOINTS ====================

app.post('/api/enquiry', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Enquiry(req.body);
        await item.save();

        // --- Send Email Notifications ---
        try {
            const adminMail = {
                to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                subject: `New Website Enquiry - ${req.body.name}`,
                html: `
                    <h2>New Enquiry Received</h2>
                    <p><strong>Name:</strong> ${req.body.name}</p>
                    <p><strong>Email:</strong> ${req.body.email}</p>
                    <p><strong>Phone:</strong> ${req.body.phone}</p>
                    <p><strong>Message/Query:</strong> ${req.body.message || 'No message provided'}</p>
                    <hr />
                    <p>This is an automated notification from the EASA College website.</p>
                `
            };

            const userMail = {
                to: req.body.email,
                subject: `Thank you for contacting EASA College`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                        <h2>Hi ${req.body.name},</h2>
                        <p>Thank you for reaching out to <strong>EASA College of Engineering and Technology</strong>.</p>
                        <p>We have received your enquiry regarding: <em>"${req.body.message || 'No specific message'}"</em>.</p>
                        <p>One of our representatives will contact you shortly to assist you further.</p>
                        <p>Best regards,<br/><strong>Support Team<br/>EASA College</strong></p>
                    </div>
                `
            };

            await Promise.all([
                sendEmail(adminMail),
                sendEmail(userMail)
            ]);
            console.log("Enquiry notification emails sent successfully");
        } catch (mailErr) {
            console.error("Failed to send enquiry email notifications:", mailErr.message);
        }

        res.status(201).json({ success: true, message: "Enquiry submitted successfully" });
    } catch (err) {
        console.error("Enquiry Error:", err);
        res.status(500).json({ error: "Failed to submit enquiry" });
    }
});

app.get('/api/enquiry', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const items = await Enquiry.find().sort({ submittedAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch enquiries" });
    }
});

app.put('/api/enquiry/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update enquiry" });
    }
});

app.patch('/api/enquiry/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Enquiry.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update enquiry" });
    }
});

app.delete('/api/enquiry/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete enquiry" });
    }
});

// Ticker Alert Routes (Moved outside require.main)
app.get('/api/ticker-alerts', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const alerts = await TickerAlert.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        console.error("Error fetching ticker alerts:", err);
        res.status(500).json({ error: "Failed to fetch alerts" });
    }
});

app.post('/api/ticker-alerts', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new TickerAlert(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create alert" });
    }
});

app.put('/api/ticker-alerts/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await TickerAlert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update alert" });
    }
});

app.patch('/api/ticker-alerts/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await TickerAlert.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update alert" });
    }
});

app.delete('/api/ticker-alerts/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await TickerAlert.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete alert" });
    }
});

// Popup Alert Routes
app.get('/api/popup-alert', async (req, res) => {
    if (!isConnected) return res.json({});
    try {
        const item = await PopupAlert.findOne();
        // If not found, return empty object (frontend handles default)
        res.json(item || {});
    } catch (err) {
        console.error("Error fetching popup alert:", err);
        res.status(500).json({ error: "Failed to fetch popup alert" });
    }
});

app.post('/api/popup-alert', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        // Upsert: replace/create the single popup setting
        const item = await PopupAlert.findOneAndUpdate({}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true });
        res.json(item);
    } catch (err) {
        console.error("Error updating popup alert:", err);
        res.status(500).json({ error: "Failed to update popup alert" });
    }
});

// --- Sports API Routes ---
app.get('/api/sports', async (req, res) => {
    try {
        const cached = getCache('sports');
        if (cached) return res.json(cached);

        if (!isConnected) return res.json(sportsData);

        const items = await Sport.find();
        const data = items.length ? items : sportsData;
        setCache('sports', data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching sports:", err);
        res.json(sportsData);
    }
});

app.post('/api/sports', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Sport(req.body);
        await item.save();
        clearCache('sports');
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create item" });
    }
});

app.put('/api/sports/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Sport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        clearCache('sports');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.patch('/api/sports/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Sport.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        clearCache('sports');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update item" });
    }
});

app.delete('/api/sports/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Sport.findByIdAndDelete(req.params.id);
        clearCache('sports');
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});

// Final Error Handler (Must be last)
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
        message: err.message
    });
});

// ==================== UNIFIED HERO MANAGER ====================
app.get('/api/all-heroes', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const heroes = [];


        // 1. Library
        const lib = await LibraryData.findOne();
        if (lib) {
            console.log("[DEBUG] /api/all-heroes: Library Image:", lib.overview?.image);
            heroes.push({
                id: lib._id,
                type: 'library',
                title: 'Central Library',
                slug: 'library',
                image: lib.overview?.image || ''
            });
        }


        // 2. Dynamic Pages
        const pages = await PageContent.find({}, 'title slug heroImage');
        pages.forEach(p => {
            // Skip 'library' as it is handled by LibraryData
            if (p.slug === 'library') return;

            heroes.push({
                id: p._id,
                type: 'page',
                title: p.title,
                slug: p.slug,
                image: p.heroImage || ''
            });
        });

        // 3. Departments
        const depts = await Department.find({}, 'name slug heroImage');
        depts.forEach(d => {
            heroes.push({
                id: d._id,
                type: 'department',
                title: d.name,
                slug: d.slug,
                image: d.heroImage || ''
            });
        });

        // 3.5 Singletons
        const singletons = [
            { model: Institution, slug: 'institution', title: 'Institution' },
            { model: Sustainability, slug: 'sustainability', title: 'Sustainability' },
            { model: CommunityOutreach, slug: 'community-outreach', title: 'Community Outreach' },
            { model: PlacementPage, slug: 'placement', title: 'Placement' }
        ];

        for (const s of singletons) {
            const data = await s.model.findOne();
            if (data) {
                heroes.push({
                    id: data._id,
                    type: s.slug,
                    title: data.title || s.title,
                    subtitle: data.subtitle || '',
                    slug: s.slug,
                    image: data.heroImage || ''
                });
            }
        }

        // 4. Global Page Heroes (The new catch-all model)
        const globalHeroes = await PageHero.find();
        globalHeroes.forEach(gh => {
            // Find if already exists in list (for example, if a department hero was also added to PageHero)
            const idx = heroes.findIndex(h => h.slug === gh.pageKey || h.id?.toString() === gh._id.toString());
            if (idx > -1) {
                heroes[idx] = {
                    ...heroes[idx],
                    title: gh.title || heroes[idx].title,
                    subtitle: gh.subtitle || heroes[idx].subtitle,
                    image: gh.image || heroes[idx].image,
                    isGlobal: true,
                    heroId: gh._id
                };
            } else {
                heroes.push({
                    id: gh._id,
                    type: 'global',
                    title: gh.title || gh.pageKey,
                    slug: gh.pageKey,
                    image: gh.image || '',
                    subtitle: gh.subtitle || '',
                    isGlobal: true
                });
            }
        });

        // 5. Add Placeholders for common pages that might not have a record yet
        const commonPages = [
            { slug: 'scholarships', title: 'Scholarships' },
            { slug: 'careers', title: 'Careers' },
            { slug: 'gallery', title: 'Photo Gallery' },
            { slug: 'video-gallery', title: 'Video Gallery' },
            { slug: 'virtual-tour', title: 'Virtual Tour' },
            { slug: 'grievance', title: 'Grievance Redressal' },
            { slug: 'professional-chapters', title: 'Professional Chapters' },
            { slug: 'news', title: 'News & Events' },
            { slug: 'admission', title: 'Admissions' }
        ];

        commonPages.forEach(p => {
            if (!heroes.some(h => h.slug === p.slug)) {
                heroes.push({
                    id: p.slug,
                    type: 'placeholder',
                    title: p.title,
                    slug: p.slug,
                    image: '',
                    subtitle: ''
                });
            }
        });

        res.json(heroes);
    } catch (err) {
        console.error("Error fetching all heroes:", err);
        res.status(500).json({ error: "Failed to fetch heroes" });
    }
});

app.put('/api/update-hero', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { type, id, slug, image, title, subtitle } = req.body;
        console.log(`[DEBUG] update-hero request for type: ${type}, slug: ${slug}`);

        if (type === 'library') {
            const lib = await LibraryData.findOne();
            if (lib) {
                if (!lib.overview) lib.overview = {};
                if (image) lib.overview.image = image;
                if (title) lib.title = title;
                lib.markModified('overview');
                await lib.save();
                return res.json({ success: true });
            }
        } else if (type === 'page') {
            await PageContent.findByIdAndUpdate(id, { heroImage: image, title, subtitle });
            return res.json({ success: true });
        } else if (['institution', 'infrastructure', 'sustainability', 'community-outreach'].includes(type)) {
            const models = { institution: Institution, infrastructure: Infrastructure, sustainability: Sustainability, 'community-outreach': CommunityOutreach };
            await models[type].findOneAndUpdate({}, { heroImage: image, title, subtitle });
            return res.json({ success: true });
        } else if (type === 'placement') {
            await PlacementPage.findOneAndUpdate({}, { heroImage: image, title, subtitle });
            return res.json({ success: true });
        } else if (type === 'department') {
            await Department.findByIdAndUpdate(id, { heroImage: image, name: title });
            return res.json({ success: true });
        } else if (type === 'global' || type === 'placeholder') {
            const updated = await PageHero.findOneAndUpdate(
                { pageKey: slug },
                { title, subtitle, image, updatedAt: Date.now() },
                { new: true, upsert: true }
            );
            return res.json({ success: true, updated });
        }

        res.status(400).json({ error: "Invalid type or item not found" });
    } catch (err) {
        console.error("Error updating hero:", err);
        res.status(500).json({ error: "Failed to update hero" });
    }
});

if (require.main === module) {
    // --- Library Routes ---
    app.get('/api/library', async (req, res) => {
        try {
            const data = await LibraryData.findOne();
            res.json(data || {});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/library', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            // Upsert: update if exists, insert if not
            const data = await LibraryData.findOneAndUpdate({}, req.body, { new: true, upsert: true });
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/library', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const data = await LibraryData.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- User Routes ---
    app.put('/api/users/:id', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/users/:id', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- Singleton PATCH Routes ---
    app.patch('/api/institution', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await Institution.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/infrastructure', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await Infrastructure.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/sustainability', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await Sustainability.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/community-outreach', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await CommunityOutreach.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/virtual-tour', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await VirtualTour.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/popup-alert', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: "Database not connected" });
        try {
            const item = await PopupAlert.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    // --- Scholarship Routes ---
    app.get('/api/scholarships', async (req, res) => {
        try {
            const scholarships = await Scholarship.find();
            res.json(scholarships);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post('/api/scholarships', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            const scholarship = new Scholarship(req.body);
            await scholarship.save();
            res.status(201).json(scholarship);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/scholarships/:id', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(scholarship);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.patch('/api/scholarships/:id', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.json(scholarship);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete('/api/scholarships/:id', async (req, res) => {
        if (!isConnected) return res.status(503).json({ error: 'Database not connected' });
        try {
            await Scholarship.findByIdAndDelete(req.params.id);
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on ${BASE_URL} at port ${port}`);
    });
}

app.get('/api/placement-page', async (req, res) => {
    try {
        const data = await PlacementPage.findOne();
        if (!data) return res.json(placementPageData);
        res.json(data);
    } catch (err) {
        console.error("Error fetching placement-page:", err);
        res.json(placementPageData);
    }
});

app.put('/api/placement-page', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        console.log("Updating placement-page. Payload keys:", Object.keys(req.body));
        let item = await PlacementPage.findOne();
        const { _id, ...updateData } = req.body;

        if (item) {
            item = await PlacementPage.findByIdAndUpdate(item._id, updateData, { new: true });
        } else {
            item = new PlacementPage(updateData);
            await item.save();
        }
        res.json(item);
    } catch (err) {
        console.error("Error updating placement-page:", err);
        res.status(500).json({
            error: "Failed to update placement page",
            details: err.message,
            stack: err.stack
        });
    }
});

app.patch('/api/placement-page', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PlacementPage.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
        res.json(item);
    } catch (err) {
        console.error("Error patching placement-page:", err);
        res.status(500).json({ error: "Failed to update placement page" });
    }
});

// ==================== VIDEO GALLERY APIs ====================
app.get('/api/video-gallery', async (req, res) => {
    try {
        const videos = await VideoGallery.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

app.post('/api/video-gallery', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const video = new VideoGallery(req.body);
        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ error: "Failed to add video" });
    }
});

app.put('/api/video-gallery/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const video = await VideoGallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: "Failed to update video" });
    }
});

app.patch('/api/video-gallery/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const video = await VideoGallery.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: "Failed to update video" });
    }
});

app.delete('/api/video-gallery/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await VideoGallery.findByIdAndDelete(req.params.id);
        res.json({ message: "Video deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete video" });
    }
});

// ==================== GRIEVANCE APIs ====================
app.get('/api/grievances', async (req, res) => {
    try {
        const grievances = await Grievance.find().sort({ createdAt: -1 });
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch grievances" });
    }
});

app.post('/api/grievances', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const grievance = new Grievance(req.body);
        await grievance.save();

        // --- Send Email Notifications ---
        try {
            const adminMail = {
                to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                subject: `New Grievance Submitted - ${req.body.name}`,
                html: `
                    <h2>New Grievance Report Received</h2>
                    <p><strong>Name:</strong> ${req.body.name}</p>
                    <p><strong>Email:</strong> ${req.body.email}</p>
                    <p><strong>Type:</strong> ${req.body.type}</p>
                    <p><strong>Subject:</strong> ${req.body.subject}</p>
                    <p><strong>Message:</strong> ${req.body.message}</p>
                    <hr />
                    <p>This is an automated notification from the EASA College website.</p>
                `
            };

            const userMail = {
                to: req.body.email,
                subject: `Grievance Acknowledged - EASA College`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                        <h2>Grievance Acknowledgement</h2>
                        <p>Dear ${req.body.name},</p>
                        <p>We have received your grievance report regarding <strong>${req.body.subject}</strong>. Our grievance committee will review the matter and take appropriate action.</p>
                        <p>We take all concerns seriously and aim to resolve them as soon as possible.</p>
                        <p>Best regards,<br/><strong>Grievance Committee<br/>EASA College</strong></p>
                    </div>
                `
            };

            await Promise.all([
                sendEmail(adminMail),
                sendEmail(userMail)
            ]);
            console.log("Grievance notification emails sent successfully");
        } catch (mailErr) {
            console.error("Failed to send grievance email notifications:", mailErr.message);
        }

        res.status(201).json(grievance);
    } catch (err) {
        res.status(500).json({ error: "Failed to submit grievance" });
    }
});

app.put('/api/grievances/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const grievance = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: "Failed to update grievance status" });
    }
});

app.patch('/api/grievances/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const grievance = await Grievance.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: "Failed to update grievance status" });
    }
});

app.delete('/api/grievances/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Grievance.findByIdAndDelete(req.params.id);
        res.json({ message: "Grievance deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete grievance" });
    }
});

// ==================== PAGE HERO ENDPOINTS ====================
app.get('/api/page-heroes', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const heroes = await PageHero.find().sort({ pageKey: 1 });
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch page heroes" });
    }
});

app.get('/api/page-heroes/:key', async (req, res) => {
    if (!isConnected) return res.json({});
    const key = req.params.key;
    try {
        // 1. Check Global PageHero Model
        const hero = await PageHero.findOne({ pageKey: key });
        if (hero) return res.json(hero);

        // 2. Check Singleton Models if key matches
        const singletonMap = {
            'institution': Institution,
            'infrastructure': Infrastructure,
            'sustainability': Sustainability,
            'community-outreach': CommunityOutreach,
            'placement': PlacementPage
        };

        if (singletonMap[key]) {
            const data = await singletonMap[key].findOne();
            if (data) {
                return res.json({
                    pageKey: key,
                    title: data.title,
                    subtitle: data.subtitle,
                    image: data.heroImage
                });
            }
        }

        if (key === 'library') {
            const lib = await LibraryData.findOne();
            if (lib) {
                return res.json({
                    pageKey: 'library',
                    title: 'Central Library',
                    subtitle: 'The Heart of Learning & Research at EASA',
                    image: lib.overview?.image
                });
            }
        }

        // 3. Check Departments
        const dept = await Department.findOne({ slug: key });
        if (dept) {
            return res.json({
                pageKey: key,
                title: dept.name,
                image: dept.heroImage
            });
        }

        res.json({});
    } catch (err) {
        console.error("Error fetching page hero for key:", key, err);
        res.status(500).json({ error: "Failed to fetch page hero" });
    }
});

app.post('/api/page-heroes', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const { pageKey, title, subtitle, image } = req.body;
        const hero = await PageHero.findOneAndUpdate(
            { pageKey },
            { title, subtitle, image, updatedAt: Date.now() },
            { new: true, upsert: true }
        );
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: "Failed to save page hero" });
    }
});

app.patch('/api/page-heroes/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await PageHero.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update page hero" });
    }
});

app.delete('/api/page-heroes/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await PageHero.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// ==================== VIRTUAL TOUR APIs ====================
app.get('/api/virtual-tour', (req, res) => getSingleton(VirtualTour, req, res));
app.post('/api/virtual-tour', (req, res) => handleSingleton(VirtualTour, req, res));
app.put('/api/virtual-tour', (req, res) => handleSingleton(VirtualTour, req, res));
app.patch('/api/virtual-tour', (req, res) => handleSingleton(VirtualTour, req, res));

app.get('/api/moments', async (req, res) => {
    try {
        const moments = await Moment.find().sort({ date: -1 });
        res.json(moments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch moments" });
    }
});

app.post('/api/moments', async (req, res) => {
    try {
        const item = new Moment(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create moment" });
    }
});

app.put('/api/moments/:id', async (req, res) => {
    try {
        const item = await Moment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update moment" });
    }
});

app.patch('/api/moments/:id', async (req, res) => {
    try {
        const item = await Moment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update moment" });
    }
});

app.delete('/api/moments/:id', async (req, res) => {
    try {
        await Moment.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete moment" });
    }
});

// --- Advice Routes ---
app.get('/api/advice', async (req, res) => {
    try {
        const advice = await Advice.find();
        res.json(advice);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch advice" });
    }
});

app.post('/api/advice', async (req, res) => {
    try {
        const item = new Advice(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create advice" });
    }
});

app.put('/api/advice/:id', async (req, res) => {
    try {
        const item = await Advice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update advice" });
    }
});

app.patch('/api/advice/:id', async (req, res) => {
    try {
        const item = await Advice.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update advice" });
    }
});

app.delete('/api/advice/:id', async (req, res) => {
    try {
        await Advice.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete advice" });
    }
});

// ==================== ADMISSIONS ROUTES ====================
app.get('/api/admissions', async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ order: 1 });
        res.json(admissions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch admissions" });
    }
});

app.post('/api/admissions', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Admission(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create admission item" });
    }
});

app.put('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update admission item" });
    }
});

app.patch('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Admission.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update admission item" });
    }
});

app.delete('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete admission item" });
    }
});

// ==================== POPUP ALERT ROUTES ====================
app.get('/api/popup-alert', async (req, res) => {
    try {
        const alert = await PopupAlert.findOne();
        res.json(alert || null);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch popup alert" });
    }
});

app.post('/api/popup-alert', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alert = await PopupAlert.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ error: "Failed to save popup alert" });
    }
});

app.patch('/api/popup-alert', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alert = await PopupAlert.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ error: "Failed to update popup alert" });
    }
});

module.exports = app;
