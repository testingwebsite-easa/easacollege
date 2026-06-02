// Fallback data definitions to prevent ReferenceErrors
const facultyStatsData = [];
const newsEventsData = [
    {
        title: "Hackathon 2026 - Innovation Challenge",
        date: "2026-03-25",
        category: "general",
        desc: "Join us for the biggest hackathon of the year! Compete with top talents across India and showcase your coding skills.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Campus Internship Drive - Tech Giants Recruiting",
        date: "2026-02-09",
        category: "admin",
        desc: "Exciting internship opportunities with leading IT companies. Meet industry experts and explore career possibilities.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Cultural Fest Dhruva 2026 - Save the Date",
        date: "2026-02-08",
        category: "general",
        desc: "Experience the vibrant culture of EASA! Music, dance, drama, and food from around the world.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Expert Talk: AI and Machine Learning Trends",
        date: "2026-02-07",
        category: "admin",
        desc: "Industry expert discusses the latest trends in AI/ML, career opportunities, and future of technology.",
        image: "https://images.unsplash.com/photo-1515378960530-7bea60bd14d2?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Sports Championship Finals - Go Warriors!",
        date: "2026-02-06",
        category: "general",
        desc: "Cheer for our college teams in the annual sports championship. Event starts at 10 AM on the main ground.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Research Paper Presentation - IEEE Conference",
        date: "2026-02-05",
        category: "admin",
        desc: "Our students present groundbreaking research at the IEEE International Conference. Congratulations to the team!",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    },
    {
        title: "Exam Schedule Released - Check Student Portal",
        date: "2026-02-04",
        category: "general",
        desc: "The examination schedule for Spring 2026 semester is now available. Download from the student portal.",
        image: "https://images.unsplash.com/photo-1434951843676-96c831551d74?q=80&w=1000&auto=format&fit=crop",
        pdf_url: ""
    }
];
const heroSlidesData = [];
const galleryImagesData = [];
const placementPartnersData = [];
const managementTeamData = [];
const programsData = [];
const missionVisionData = { vision: '', mission: [] };
const coreBeliefsData = [];
const ugCoursesData = [];
const pgCoursesData = [];
const departmentsData = [
    {
        id: "computer-science-and-engineering",
        name: "Computer Science and Engineering",
        slug: "computer-science-and-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Computer Science and Engineering is committed to providing a comprehensive education in the field of computing.",
        vision: "To be a center of excellence in Computer Science and Engineering education and research.",
        mission: [
            "To provide high-quality education in Computer Science.",
            "To foster innovation and research.",
            "To serve the society through technology."
        ],
        peo: [
            "Graduates will be able to solve complex engineering problems.",
            "Graduates will demonstrate professional ethics.",
            "Graduates will engage in lifelong learning."
        ],
        pso: [
            "Ability to design and develop software systems.",
            "Ability to apply standard software engineering practices."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" },
            { year: "2012", desc: "First Batch Graduated" }
        ],
        hod: {
            name: "Dr. A. Kumar",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the CSE Department."
        },
        studentCount: "300+",
        facultyCount: "20+",
        labCount: "5+"
    },
    {
        id: "electronics-and-communication-engineering",
        name: "Electronics and Communication Engineering",
        slug: "electronics-and-communication-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of ECE focuses on the design and application of electronic systems.",
        vision: "To produce globally competent Electronics and Communication Engineers.",
        mission: [
            "To impart quality education in ECE.",
            "To promote research and development.",
            "To collaborative with industries."
        ],
        peo: [
            "Graduates will excel in the field of Electronics.",
            "Graduates will be successful in their careers.",
            "Graduates will contribute to society."
        ],
        pso: [
            "Ability to analyze and design electronic circuits.",
            "Ability to work with communication systems."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. B. Singh",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the ECE Department."
        },
        studentCount: "250+",
        facultyCount: "15+",
        labCount: "4+"
    },
    {
        id: "mechanical-engineering",
        name: "Mechanical Engineering",
        slug: "mechanical-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Mechanical Engineering deals with the design, construction, and use of machines.",
        vision: "To be a leader in Mechanical Engineering education.",
        mission: [
            "To provide a strong foundation in Mechanical Engineering.",
            "To encourage innovation.",
            "To facilitate industrial interaction."
        ],
        peo: [
            "Graduates will apply mechanical engineering principles.",
            "Graduates will be ethical professionals.",
            "Graduates will assume leadership roles."
        ],
        pso: [
            "Ability to design mechanical systems.",
            "Ability to analyze thermal systems."
        ],
        milestones: [
            { year: "2009", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. C. Rao",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the Mechanical Department."
        },
        studentCount: "300+",
        facultyCount: "20+",
        labCount: "6+"
    },
    {
        id: "electrical-and-electronics-engineering",
        name: "Electrical and Electronics Engineering",
        slug: "electrical-and-electronics-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of EEE focuses on the study and application of electricity, electronics, and electromagnetism.",
        vision: "To excel in Electrical and Electronics Engineering education.",
        mission: [
            "To provide a rigorous curriculum.",
            "To foster critical thinking.",
            "To support research activities."
        ],
        peo: [
            "Graduates will solve electrical engineering problems.",
            "Graduates will be innovative.",
            "Graduates will contribute to the energy sector."
        ],
        pso: [
            "Ability to analyze electrical circuits.",
            "Ability to design power systems."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. E. Sharma",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the EEE Department."
        },
        studentCount: "150+",
        facultyCount: "10+",
        labCount: "3+"
    },
    {
        id: "master-of-business-administration",
        name: "Master of Business Administration",
        slug: "master-of-business-administration",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1415&q=80",
        overview: "The Department of Management Studies offers a comprehensive MBA program.",
        vision: "To develop future leaders and entrepreneurs.",
        mission: [
            "To provide holistic management education.",
            "To foster ethical leadership.",
            "To promote industry engagement."
        ],
        peo: [
            "Graduates will handle managerial responsibilities.",
            "Graduates will start their own ventures.",
            "Graduates will contribute to economic growth."
        ],
        pso: [
            "Ability to analyze business situations.",
            "Ability to formulate strategic plans."
        ],
        milestones: [
            { year: "2011", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. F. Khan",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the Management Department."
        },
        studentCount: "120+",
        facultyCount: "15+",
        labCount: "2+"
    },
    {
        id: "artificial-intelligence-and-machine-learning",
        name: "Artificial Intelligence & Machine Learning",
        slug: "artificial-intelligence-and-machine-learning",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of AI & ML focuses on the study of intelligent agents and the construction of such agents, which are systems that perceive their environment and take actions that maximize their chances of achieving their goals.",
        vision: "To be a center of excellence in Artificial Intelligence and Machine Learning.",
        mission: [
            "To provide a strong foundation in the principles and practices of AI & ML.",
            "To foster innovation and research in intelligent systems.",
            "To prepare students for careers in the rapidly evolving field of AI."
        ],
        peo: [
            "Graduates will be able to design and develop intelligent systems.",
            "Graduates will demonstrate professional ethics and leadership skills.",
            "Graduates will pursue lifelong learning in AI & ML."
        ],
        pso: [
            "Ability to apply AI & ML techniques to solve real-world problems.",
            "Ability to design and implement intelligent agents."
        ],
        milestones: [
            { year: "2023", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. AI Head",
            image: "",
            designation: "Head of Department",
            message: "Welcome to the future of technology."
        },
        studentCount: "60+",
        facultyCount: "5+",
        labCount: "3+"
    },
    {
        id: "artificial-intelligence-and-data-science",
        name: "Artificial Intelligence & Data Science",
        slug: "artificial-intelligence-and-data-science",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of AI & Data Science combines the power of artificial intelligence with the analytical capabilities of data science to solve complex problems.",
        vision: "To produce data-driven leaders and innovators in AI.",
        mission: [
            "To impart comprehensive knowledge in AI and Data Science.",
            "To provide practical training in data analysis and machine learning.",
            "To encourage interdisciplinary research."
        ],
        peo: [
            "Graduates will excel in data science and AI roles.",
            "Graduates will contribute to the data revolution.",
            "Graduates will practice ethical data usage."
        ],
        pso: [
            "Ability to analyze large datasets and extract meaningful insights.",
            "Ability to build predictive models using AI techniques."
        ],
        milestones: [
            { year: "2023", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. DS Head",
            image: "",
            designation: "Head of Department",
            message: "Data is the new oil, and AI is the engine."
        },
        studentCount: "60+",
        facultyCount: "5+",
        labCount: "3+"
    },
    {
        id: "computer-science-and-engineering-cyber-security",
        name: "CSE (Cyber Security)",
        slug: "computer-science-and-engineering-cyber-security",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of CSE (Cyber Security) is dedicated to training professionals who can protect information systems and networks from cyber threats.",
        vision: "To be a global leader in Cyber Security education and research.",
        mission: [
            "To provide specialized training in cyber security.",
            "To conduct research in network security and cryptography.",
            "To create awareness about cyber safety."
        ],
        peo: [
            "Graduates will be able to secure critical information infrastructure.",
            "Graduates will demonstrate ethical hacking skills.",
            "Graduates will adapt to emerging cyber threats."
        ],
        pso: [
            "Ability to identify and mitigate security vulnerabilities.",
            "Ability to design secure software and networks."
        ],
        milestones: [
            { year: "2024", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. Security Head",
            image: "",
            designation: "Head of Department",
            message: "Securing the digital world is our priority."
        },
        studentCount: "60+",
        facultyCount: "4+",
        labCount: "2+"
    },
    {
        id: "biomedical-engineering",
        name: "Biomedical Engineering",
        slug: "biomedical-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Biomedical Engineering integrates engineering principles with medical sciences to improve healthcare diagnosis and treatment.",
        vision: "To revolutionize healthcare through engineering solutions.",
        mission: [
            "To provide quality education at the intersection of engineering and medicine.",
            "To develop affordable medical devices.",
            "To collaborate with hospitals for clinical exposure."
        ],
        peo: [
            "Graduates will contribute to the healthcare industry.",
            "Graduates will design innovative medical equipment.",
            "Graduates will pursue research in biomedical engineering."
        ],
        pso: [
            "Ability to apply engineering concepts to biological systems.",
            "Ability to maintain and troubleshoot medical instrumentation."
        ],
        milestones: [
            { year: "2020", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. Bio Head",
            image: "",
            designation: "Head of Department",
            message: "Engineering for a healthier world."
        },
        studentCount: "120+",
        facultyCount: "8+",
        labCount: "4+"
    },
    {
        id: "information-technology",
        name: "Information Technology",
        slug: "information-technology",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Information Technology focuses on the management and processing of information using computer systems.",
        vision: "To produce competent IT professionals for the global industry.",
        mission: [
            "To offer a curriculum that meets industry standards.",
            "To provide hands-on training in the latest technologies.",
            "To foster entrepreneurship and innovation."
        ],
        peo: [
            "Graduates will solve complex IT problems.",
            "Graduates will manage IT infrastructure effectively.",
            "Graduates will adapt to technological changes."
        ],
        pso: [
            "Ability to develop and maintain software applications.",
            "Ability to manage networks and databases."
        ],
        milestones: [
            { year: "2010", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. IT Head",
            image: "",
            designation: "Head of Department",
            message: "Connecting the world through information."
        },
        studentCount: "300+",
        facultyCount: "15+",
        labCount: "6+"
    },
    {
        id: "agriculture-engineering",
        name: "Agriculture Engineering",
        slug: "agriculture-engineering",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Agriculture Engineering applies engineering principles to agricultural production and processing.",
        vision: "To modernize agriculture through engineering interventions.",
        mission: [
            "To provide education in agricultural machinery and irrigation.",
            "To develop sustainable agricultural practices.",
            "To improve post-harvest technology."
        ],
        peo: [
            "Graduates will enhance agricultural productivity.",
            "Graduates will design efficient farm machinery.",
            "Graduates will contribute to food security."
        ],
        pso: [
            "Ability to apply engineering solutions to farm problems.",
            "Ability to manage water and soil resources."
        ],
        milestones: [
            { year: "2018", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. Agri Head",
            image: "",
            designation: "Head of Department",
            message: "Cultivating the future."
        },
        studentCount: "150+",
        facultyCount: "10+",
        labCount: "5+"
    },
    {
        id: "construction-engineering-and-management",
        name: "Construction Engineering and Management",
        slug: "construction-engineering-and-management",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The PG program in Construction Engineering and Management focuses on the planning, design, and management of construction projects.",
        vision: "To produce leaders in the construction industry.",
        mission: [
            "To impart advanced knowledge in construction management.",
            "To promote research in sustainable construction.",
            "To develop managerial skills."
        ],
        peo: [
            "Graduates will manage complex construction projects.",
            "Graduates will ensure quality and safety in construction.",
            "Graduates will lead construction organizations."
        ],
        pso: [
            "Ability to plan and schedule construction activities.",
            "Ability to manage construction resources effectively."
        ],
        milestones: [
            { year: "2015", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. CM Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Building the nation's infrastructure."
        },
        studentCount: "30+",
        facultyCount: "5+",
        labCount: "2+"
    },
    {
        id: "communication-systems",
        name: "Communication Systems",
        slug: "communication-systems",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The PG program in Communication Systems offers advanced study in the field of telecommunications and networking.",
        vision: "To be a center of research in communication technologies.",
        mission: [
            "To provide in-depth knowledge of communication theory.",
            "To foster research in wireless and optical communication.",
            "To prepare students for R&D roles."
        ],
        peo: [
            "Graduates will design advanced communication systems.",
            "Graduates will contribute to standardization bodies.",
            "Graduates will pursue academic or industrial research."
        ],
        pso: [
            "Ability to analyze specific communication problems.",
            "Ability to simulate and test communication networks."
        ],
        milestones: [
            { year: "2014", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. CS Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Connecting people faster and better."
        },
        studentCount: "25+",
        facultyCount: "4+",
        labCount: "3+"
    },
    {
        id: "manufacturing-engineering",
        name: "Manufacturing Engineering",
        slug: "manufacturing-engineering",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The PG program in Manufacturing Engineering focuses on modern manufacturing processes and systems.",
        vision: "To excel in manufacturing education and research.",
        mission: [
            "To teach advanced manufacturing technologies.",
            "To promote research in automation and robotics.",
            "To collaborate with manufacturing industries."
        ],
        peo: [
            "Graduates will optimize manufacturing processes.",
            "Graduates will implement Industry 4.0 solutions.",
            "Graduates will lead manufacturing units."
        ],
        pso: [
            "Ability to design manufacturing systems.",
            "Ability to improve product quality and productivity."
        ],
        milestones: [
            { year: "2016", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. Mfg Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Making things better."
        },
        studentCount: "20+",
        facultyCount: "4+",
        labCount: "3+"
    },
    {
        id: "power-electronics-and-drives",
        name: "Power Electronics and Drives",
        slug: "power-electronics-and-drives",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The PG program in Power Electronics and Drives covers the design and control of power electronic converters and electric drives.",
        vision: "To be a leader in power electronics research.",
        mission: [
            "To provide specialized knowledge in power electronics.",
            "To encourage research in renewable energy integration.",
            "To develop efficient power conversion systems."
        ],
        peo: [
            "Graduates will design efficient power electronic systems.",
            "Graduates will contribute to energy conservation.",
            "Graduates will work in electric vehicle industry."
        ],
        pso: [
            "Ability to model and simulate power electronic circuits.",
            "Ability to design control algorithms for drives."
        ],
        milestones: [
            { year: "2015", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. PED Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Powering the future efficiently."
        },
        studentCount: "25+",
        facultyCount: "4+",
        labCount: "3+"
    },
    {
        id: "structural-engineering",
        name: "Structural Engineering",
        slug: "structural-engineering",
        type: "PG",
        heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The PG program in Structural Engineering deals with the analysis and design of structures like buildings, bridges, and towers.",
        vision: "To produce world-class structural engineers.",
        mission: [
            "To impart advanced concepts in structural analysis.",
            "To promote research in earthquake engineering.",
            "To ensure safety and durability of structures."
        ],
        peo: [
            "Graduates will design safe and resilient structures.",
            "Graduates will solve complex structural problems.",
            "Graduates will adopt new materials and technologies."
        ],
        pso: [
            "Ability to analyze structures under various loads.",
            "Ability to design steel and concrete structures."
        ],
        milestones: [
            { year: "2013", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. Structural Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Building strong foundations."
        },
        studentCount: "40+",
        facultyCount: "6+",
        labCount: "3+"
    },
    {
        id: "science-and-humanities",
        name: "Science and Humanities",
        slug: "science-and-humanities",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Science and Humanities plays a vital role in laying the strongest foundation for engineering students. It comprises of Mathematics, Physics, Chemistry and English. The department provides a comprehensive education in basic sciences and humanities to engineering students.",
        vision: "To be a centre of excellence in teaching and research in basic sciences and humanities, and to provide a strong foundation for engineering education.",
        mission: [
            "To provide high quality education in Mathematics, Physics, Chemistry and English.",
            "To encourage students to apply the knowledge of basic sciences in engineering discipline.",
            "To develop communication and soft skills among students."
        ],
        peo: [
            "Graduates will apply the knowledge of basic sciences to solve engineering problems.",
            "Graduates will demonstrate effective communication skills.",
            "Graduates will practice professional ethics."
        ],
        pso: [
            "Ability to apply mathematical and scientific principles to engineering problems.",
            "Ability to communicate effectively in a professional environment."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. S&H Head",
            image: "",
            designation: "Head of Department",
            message: "Building the foundation for future engineers."
        },
        studentCount: "300+",
        facultyCount: "20+",
        labCount: "4+"
    }
];
const researchCoursesData = [];
const sportsData = [
    { name: 'Cricket', type: 'Outdoor', count: '1 Ground', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop', description: 'Standard size cricket ground with turf pitch.' },
    { name: 'Football', type: 'Outdoor', count: '2 Fields', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop', description: 'Main football field with gallery seating.' },
    { name: 'Basketball', type: 'Outdoor', count: '4 Courts', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop', description: 'Synthetic courts with floodlights.' },
    { name: 'Badminton', type: 'Indoor', count: '6 Courts', image: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?q=80&w=2070&auto=format&fit=crop', description: 'Wooden flooring courts in the indoor stadium.' },
    { name: 'Table Tennis', type: 'Indoor', count: '8 Tables', image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1999&auto=format&fit=crop', description: 'Professional tables for tournaments.' },
    { name: 'Volleyball', type: 'Outdoor', count: '4 Courts', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2007&auto=format&fit=crop', description: 'Standard clay courts.' },
    { name: 'Chess', type: 'Indoor', count: '50 Boards', image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2158&auto=format&fit=crop', description: 'Dedicated chess room.' },
    { name: 'Carrom', type: 'Indoor', count: '20 Boards', image: 'https://images.unsplash.com/photo-1634804658555-212dc345e2cd?q=80&w=2070&auto=format&fit=crop', description: 'Standard carrom boards.' }
];
const researchItemsData = [];
const careersData = [];
const placementPageData = {
    name: "Training & Placement Cell",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2868&ixlib=rb-4.0.3",
    vision: "To become a center of excellence in grooming students into industry-ready professionals and providing them with the best career opportunities.",
    mission: [
        "To provide comprehensive training in soft skills and technical aptitude.",
        "To foster strong industry-academia linkages.",
        "To facilitate internships and placements in reputed organizations.",
        "To guide students in their career planning and development."
    ],
    overview: `The Training and Placement Cell at EASA College is dedicated to ensuring that every student gets the best possible start to their career. We act as a bridge between the industry and academia, facilitating a smooth transition for our students. Our comprehensive training programs, industry partnerships, and dedicated team work tirelessly to bring the best recruiters to campus. We focus not just on job placement, but on holistic career development, equipping our students with the skills, confidence, and knowledge required to excel in the global marketplace.`,
    stats: [
        { label: "Placement Percentage", value: "98%", icon: "FaCheckCircle" },
        { label: "Highest Package", value: "12 LPA", icon: "FaRocket" },
        { label: "Average Package", value: "4.5 LPA", icon: "FaChartLine" },
        { label: "Recruiters", value: "150+", icon: "FaBuilding" },
        { label: "Internships Offered", value: "500+", icon: "FaIdBadge" }
    ],
    trainingPrograms: [
        { title: "Aptitude Training", desc: "Intensive sessions on quantitative aptitude, logical reasoning, and verbal ability." },
        { title: "Soft Skills Development", desc: "Workshops on communication, personality development, and interview etiquette." },
        { title: "Technical Bootcamps", desc: "Hands-on training in emerging technologies like AI, ML, Data Science, and Full Stack Development." },
        { title: "Mock Interviews", desc: "Simulated interview sessions with industry experts to build confidence." },
        { title: "Resume Building", desc: "Guidance on crafting professional resumes and LinkedIn profiles." }
    ],
    branchData: [
        { branch: "Computer Science", placed: "98%" },
        { branch: "Electronics & Comm.", placed: "95%" },
        { branch: "Mechanical", placed: "92%" },
        { branch: "Electrical & Electronics", placed: "94%" },
        { branch: "Information Technology", placed: "97%" },
        { branch: "MBA", placed: "99%" }
    ],
    internships: [
        { company: "Zoho Corporation", role: "Software Developer Intern", stipend: "₹15,000/mo", duration: "6 Months" },
        { company: "Roots Industries", role: "Graduate Engineer Trainee", stipend: "₹12,000/mo", duration: "3 Months" },
        { company: "L&T Construction", role: "Site Engineer Intern", stipend: "₹10,000/mo", duration: "4 Months" },
        { company: "Pricol", role: "Industrial Trainee", stipend: "₹8,000/mo", duration: "3 Months" },
        { company: "Cognizant", role: "Process Executive Intern", stipend: "₹18,000/mo", duration: "6 Months" }
    ],
    process: [
        { step: 1, title: "Registration", desc: "Students register with the placement cell." },
        { step: 2, title: "Training", desc: "Pre-placement training and assessments." },
        { step: 3, title: "Eligibility Check", desc: "Shortlisting based on academic and skill criteria." },
        { step: 4, title: "Pre-Placement Talk", desc: "Companies present their profiles and job roles." },
        { step: 5, title: "Selection Process", desc: "Aptitude tests, GDs, and Interviews." },
        { step: 6, title: "Offer Letter", desc: "Successful candidates receive offer letters." }
    ],
    testimonials: [
        { name: "Arjun K.", branch: "CSE", company: "Zoho", text: "The placement training at EASA was a game-changer. The mock interviews really helped me crack the actual one." },
        { name: "Priya S.", branch: "ECE", company: "Infosys", text: "I am grateful to the placement cell for their constant support and guidance. I landed my dream job!" },
        { name: "Rahul M.", branch: "Mech", company: "TVS", text: "The core industry connections EASA has are amazing. I got placed in a top manufacturing firm." }
    ],
    gallery: [
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
    ],
    downloads: [
        { title: "Placement Brochure 2025", size: "4.2 MB", fileType: "PDF", fileUrl: "" },
        { title: "Student Placement Policy", size: "1.5 MB", fileType: "PDF", fileUrl: "" },
        { title: "Recruitment Form for Companies", size: "850 KB", fileType: "DOCX", fileUrl: "" },
        { title: "Resume Format Template", size: "500 KB", fileType: "DOCX", fileUrl: "" }
    ],
    contact: {
        name: "Mr. Placement Officer",
        designation: "Head - Training & Placement",
        email: "placement@easacollege.com",
        phone: "+91 98765 43210",
        address: "Placement Cell, Main Block, EASA College of Engineering & Technology, Coimbatore."
    }
};
const institutionData = { title: '', subtitle: '', content: '' };
const infrastructureData = { title: '', subtitle: '', facilities: [] };
const sustainabilityData = { title: '', subtitle: '', initiatives: [] };
const communityOutreachData = { title: '', subtitle: '', projects: [] };
const tickerAlertsData = [];
const scholarshipsData = [
    {
        name: 'EASA Merit Scholarship',
        provider: 'EASA College',
        amount: '₹50,000 / Year',
        eligibility: 'Above 90% in 12th Grade',
        deadline: '2024-08-31',
        link: '#',
        description: 'Awarded to meritorious students who have demonstrated academic excellence.',
        category: 'Merit'
    },
    {
        name: 'Sports Excellence Grant',
        provider: 'Sports Authority',
        amount: '100% Tuition Fee Waiver',
        eligibility: 'National Level Player',
        deadline: '2024-09-15',
        link: '#',
        description: 'For students who have represented the state or nation in sports.',
        category: 'Sports'
    }
];

// ... (previous data/placeholder)

const pagesData = [
    {
        slug: 'clubs',
        title: 'Campus Clubs',
        subtitle: 'Find Your Tribe, Fuel Your Vibe',
        heroImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
        content: `Life at EASA is never dull, thanks to our vibrant club culture.
        Whether you're an artist, a coder, a debater, or a gamer, there's a space for you.
        Connect, collaborate, and create memories that last a lifetime.`,
        sections: [
            {
                heading: 'Cultural Club',
                body: "Dance, music, drama, and art – we celebrate it all.\nThe Cultural Club is the heartbeat of our campus festivals, bringing color and rhythm to student life.\nUnleash your inner artist.",
                image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop'
            },
            {
                heading: 'Coding Club',
                body: "For the hackathon heroes and algorithm wizards.\nParticipate in coding challenges, learn new tech stacks, and build real-world software solutions.\nCode is our poetry.",
                image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Photography Club',
                body: "Capturing moments, framing memories.\nJoin fellow shutterbugs for photo walks, workshops, and exhibitions.\nSee the world through a different lens.",
                image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2000&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'fest',
        title: 'Dhruva Fest',
        subtitle: 'The Ultimate Celebration of Talent',
        heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
        content: `Get ready for the most anticipated event of the year.
        Dhruva is not just a fest; it's an emotion.
        Three days of non-stop music, dance, tech competitions, and pro-shows that set the stage on fire.`,
        sections: [
            {
                heading: 'Pro Shows & Concerts',
                body: "Experience electrifying performances by top artists and bands.\nThe night comes alive with lights, sound, and the energy of thousands of students.\nPure adrenaline.",
                image: 'https://images.unsplash.com/photo-1459749411177-8c4750bb0654?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Tech Expo',
                body: "Showcasing the future, today.\nWitness mind-blowing innovations and prototypes displayed by brilliant young minds.\nInnovation at its peak.",
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Cultural Competitions',
                body: "Battle of the bands, dance-offs, and fashion shows.\nThe stage is yours to conquer. Show the world what you've got.\nGlory awaits.",
                image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'associations',
        title: 'Associations',
        subtitle: 'Professional Networks for Future Leaders',
        heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
        content: `Bridge the gap between academia and industry.
Our departmental associations connect you with professionals, organize technical workshops, and keep you updated with industry trends.`,
        sections: [
            {
                heading: 'Computer Society of India (CSI)',
                body: "Join the largest network of IT professionals.\nTechnical talks, coding contests, and networking events to boost your career in tech.\nConnect. Code. Conquer.",
                image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'IEEE Student Branch',
                body: "Part of the world's largest technical professional organization.\nAccess to cutting-edge research, standards, and global conferences.\nAdvancing Technology for Humanity.",
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd90f9?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'SAE India (Collegiate Club)',
                body: "For the automotive enthusiasts and mobility engineers.\nDesign, build, and race vehicles in national level competitions like BAJA and SUPRA.\nEngineered for speed.",
                image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'library',
        title: 'Central Library',
        subtitle: 'The Knowledge Nexus',
        heroImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop',
        content: `Step into a world of limitless knowledge.
Our library is more than just books; it's a sanctuary for scholars and free thinkers.
With digital archives, silent zones, and collaborative spaces, it's designed to fuel your intellect.`,
        sections: [
            {
                heading: 'Digital Resources',
                body: "Access thousands of e-journals, research papers, and audiobooks at your fingertips.\nStay connected to the global academic community with high-speed internet access.\nKnowledge, digitized.",
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Reading Lounge',
                body: "A cozy, quiet space to get lost in a good book.\nComfortable seating, ambient lighting, and zero distractions.\nThe perfect escape.",
                image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2015&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'hostel',
        title: 'Student Hostels',
        subtitle: 'Your Home Away From Home',
        heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop',
        content: `Our campus offers secure and comfortable residential facilities with separate, well-maintained hostels for both boys and girls. Designed to provide a 'home away from home' experience, each block is equipped with modern amenities including high-speed Wi-Fi, hygienic dining halls, and 24/7 security surveillance. We foster a conducive environment for both academic focus and personal growth, featuring dedicated study zones and recreational areas. This holistic approach ensures a safe, disciplined, and vibrant living community where students can thrive alongside their peers`,
        sections: [
            {
                heading: 'Premium Accommodation',
                body: "Spacious, well-ventilated rooms with modern amenities.\nChoose from single, double, or shared occupancy to suit your preference.\nLive in style.",
                // image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Recreation & Fun',
                body: "Common rooms equipped with TV, indoor games, and lounge areas.\nUnwind after a long day of classes with your hostel mates.\nFun never ends.",
                // image: 'https://images.unsplash.com/photo-1511882150382-421056ac8d89?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'boys-hostel',
        title: 'Boys Hostel',
        subtitle: 'A Brotherhood of Scholars',
        heroImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop',
        aboutImage: 'https://easa-college.s3.eu-north-1.amazonaws.com/images/hostel/C1348T01.JPG',
        content: `• Spacious and well-ventilated rooms with modern amenities.
• Individual study tables, chairs, and wardrobes for every student.
• 24/7 high-speed Wi-Fi connectivity for academic needs.
• Dedicated indoor games room and access to outdoor sports facilities.
• Round-the-clock security and warden availability for a disciplined environment.`,
        sections: [
            {
                heading: 'Spacious Accommodation',
                body: "Well-furnished rooms with study tables, wardrobes, and comfortable beds.\nOptions for single, double, and shared occupancy to suit your preference.\nAmple natural light and ventilation for a refreshing ambiance.",
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
            },
            {
                heading: 'Sports & Recreation',
                body: "Dedicated indoor games room and access to outdoor sports facilities.\nRegular hostel tournaments to foster camaraderie and team spirit.\nStay active, stay fit.",
                image: 'https://images.unsplash.com/photo-1511882150382-421056ac8d89?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'girls-hostel',
        title: 'Girls Hostel',
        subtitle: 'Safe, Secure, Serene',
        heroImage: 'https://easa-college.s3.eu-north-1.amazonaws.com/images/hostel/girls+hostal.jpg',
        aboutImage: 'https://easa-college.s3.eu-north-1.amazonaws.com/images/hostel/girls+hostal.jpg',
        content: `• Secure and safe living environment with 24/7 surveillance.
• Comfortable accommodation with modern amenities and hygiene.
• Dedicated study halls to ensure a focused academic atmosphere.
• Recreation area for relaxation and social interaction.
• Caring wardens and strict safety protocols for peace of mind.`,
        sections: [
            {
                heading: 'Secure Environment',
                body: "24/7 security surveillance and round-the-clock warden availability.\nStrict safety protocols to ensure a worry-free stay.\nParents can rest assured knowing their children are in safe hands.",
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop'
            },
            {
                heading: 'Study & Leisure',
                body: "Dedicated study halls for focused learning without distractions.\nCommon areas for relaxation, reading, and social interaction.\nA balanced lifestyle for the modern student.",
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'mess',
        title: 'Hostel Mess',
        subtitle: 'Nutritious & Delicious',
        heroImage: 'https://easa-college.s3.eu-north-1.amazonaws.com/images/hostel/messs1.jpg',
        aboutImage: 'https://easa-college.s3.eu-north-1.amazonaws.com/images/hostel/mess2.jpg',
        content: `• Hygienic and nutritious meals prepared in a modern automated kitchen.
• Daily menu rotation featuring South Indian, North Indian, and specialized dishes.
• Clean and spacious dining hall with purified drinking water.
• Strict quality control and hygiene standards in food preparation.
• Special meals provided during festivals and special occasions.`,
        sections: [
            {
                heading: 'Hygienic Preparation',
                body: "Modern, automated kitchen with strict hygiene standards.\nOnly fresh, high-quality ingredients are used in meal preparation.\nCleanliness is our mantra.",
                image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Varied Menu',
                body: "A mix of South Indian, North Indian, and specialized dishes.\nDaily menu rotation to keep meal times exciting and satisfying.\nFeast like a king, study like a scholar.",
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'hostel-rules',
        title: 'Rules & Regulations',
        subtitle: 'Code of Conduct for Hostellers',
        heroImage: '',
        content: `• Application for admission should be made in the prescribed form and the hostel rent should be paid in the college office at the time of admission.
• Every student should seek admission at the beginning of every academic year after clearing all dues and the payment of rent and other fees.
• Hostellers should speak only in English.
• Ragging is strictly prohibited either inside or outside the hostel. Misconduct or non-adherence to any hostel rule will render the offender liable to suspension or dismissal according to the gravity of the offence. A student who is suspended from the College is ipso facto suspended from the hostel.
• Usage of Mobile phones, Walkman, stereo equipment and watching movies on desk top computers and laptops are strictly prohibited during study hours. Violation of this regulation would result in the immediate seizure of the equipment.
• Visitors will be allowed only on Sundays and holidays between 4 pm and 6 pm. Only those persons mentioned by the parents in the application form of the hostel, would be permitted to visit, and such visits will be restricted to the lobby area.
• Hostellers are not allowed to remain in the hostel during regular class hours without the permission of the warden.
• Students are allowed to go out only with the permission of the warden. They should return before 6 pm and should report in person to the warden immediately on return.
• Meals shall be served in the refectory only during the hours fixed and the students shall neither enter the kitchen nor give direct orders to the kitchen staff except through the authority-in-charge.
• Adherence to timing is to be followed strictly and this discipline and order in the hostel is a must.
• There should be perfect silence during study time and sleep time. Students are not allowed to enter other's rooms during study hours and disruption of silence will be considered as a serious misconduct.
• All cases of illness must be immediately reported to the warden. In case of serious illness the local guardian must take charge of the student
• Hostellers are advised to keep their valuables under lock and key and the authorities will not be responsible for any loss incurred.
• Hostellers may go home every fortnight, and any student who desires to go more often should submit a written request of the parent to the warden at the time of admission.
• Any damage done to the hostel property shall be made good by the member at fault, and if not traceable to any particular member, by all members collectively. They shall not dirty the walls or furniture with writing or any inscription whatsoever.
• The management reserves all rights to terminate the hostel facility of any inmate at any time without prior notice.
• Food and beverages are not allowed to be taken to the room.
• Students will keep their rooms neat and clean.
• Food, coffee and any eatables should not be taken out from the mess or the canteen.
• ‘Study’ and ’Silence Hours’ will be strictly observed in the hostel.
• Overnight stay in any place other than the guardian’s house will not be allowed.
• Students leaving the hostel for any reason will do so only with the written permission of the warden and with proper entry in the Permission Register.
• Day scholars are not allowed stay with the hostellers in the rooms without the permission of the warden.
• Guests are not allowed to stay with the students in the rooms without the prior permission of the warden.
• Sick diet will be allowed only with the written permission of the concerned warden.
• Students shall behave decently and maintain decorum in the mess.`,
        sections: []
    },
    {
        slug: 'wellness',
        title: 'Health & Wellness',
        subtitle: 'Mind, Body, and Spirit',
        heroImage: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop',
        content: `We prioritize your well-being above all else.
From physical fitness to mental health support, we have comprehensive programs to keep you healthy and happy.
Because a healthy student is a successful student.`,
        sections: [
            {
                heading: 'Yoga & Meditation',
                body: "Find your inner peace amidst the academic hustle.\nRegular yoga sessions to improve flexibility, concentration, and mindfulness.\nBreathe in, breathe out.",
                image: 'https://images.unsplash.com/photo-1599447421405-075209663d94?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Counseling Center',
                body: "A safe space to talk, share, and heal.\nProfessional counselors available to guide you through stress, anxiety, or personal challenges.\nYou are never alone.",
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'sports',
        title: 'Sports Arena',
        subtitle: 'Where Champions Are Made',
        heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop',
        content: `Unleash the athlete within you.
Our world-class sports complex features facilities for cricket, football, basketball, athletics, and more.
Competing, sweating, and winning – it's all part of the game.`,
        sections: [
            {
                heading: 'Outdoor Stadium',
                body: "A sprawling ground for cricket and football matches.\nHost to inter-college tournaments and athletic meets.\nFeel the turf.",
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop'
            },
            {
                heading: 'Indoor Gymnasium',
                body: "State-of-the-art gym equipment for fitness enthusiasts.\nBadminton courts, table tennis, and weight training zones.\nTrain like a beast.",
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'cafeteria',
        title: 'Campus Cafeteria',
        subtitle: 'Fuel for Thought',
        heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1947&auto=format&fit=crop',
        content: `Good food, good vibes, and great conversations.
Our cafeteria serves a variety of hygienic and delicious meals to keep you energized throughout the day.
It's the favorite hangout spot for everyone on campus.`,
        sections: [
            {
                heading: 'Hygienic & Healthy',
                body: "Freshly prepared meals using high-quality ingredients.\nStrict hygiene protocols followed in the kitchen and dining area.\nEat fresh, stay healthy.",
                image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Multi-Cuisine Menu',
                body: "From traditional South Indian breakfasts to continental snacks.\nDaily rotating menu to keep your taste buds excited.\nA treat for every palate.",
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'food-court',
        title: 'Global Food Court',
        subtitle: 'Taste the World',
        heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        content: `Craving a burger, a pizza, or a smoothie?
Head to our food court for a quick bite and some chill time with friends.
A lively atmosphere with a wide range of quick-service options.`,
        sections: [
            {
                heading: 'Grab & Go',
                body: "Sandwiches, wraps, juices, and coffee on the run.\nPerfect for those busy breaks between lectures.\nQuick, tasty, convenient.",
                image: 'https://images.unsplash.com/photo-1561758033-d8f80400eb31?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Chill Zone',
                body: "Comfortable seating and upbeat music.\nThe perfect place to relax, gossip, and recharge.\nVibe check passed.",
                image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'amenities',
        title: 'Campus Amenities',
        subtitle: 'Everything You Need',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
        content: `We've got your back with all the essential facilities right on campus.
From banking to transportation, we ensure a hassle-free campus life for our students.
Because convenience matters.`,
        sections: [
            {
                heading: 'Transport',
                body: "A fleet of buses covering all major routes in the city.\n24/7  facility within the campus premises for financial ease.\nConnected and convenient.",
                image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop'
            },
            {
                heading: 'Stationery & Reprography',
                body: "On-campus store for books, stationery, and printing services.\nEverything you need for your assignments and projects in one place.\nStudent essentials sorted.",
                image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a6?q=80&w=2068&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'cells',
        title: 'Student Cells & Committees',
        subtitle: 'Fostering Professional Growth & Excellence',
        heroImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2074&auto=format&fit=crop',
        content: `At EASA College of Engineering and Technology, our dedicated cells and committees play a vital role in the holistic development of our students and faculty.
        From professional development to innovation and social responsibility, these cells drive excellence across all spheres of campus life.`,
        sections: [
            {
                heading: 'Centre for Professional Development and Training Cell (CPDT Cell)',
                body: `**Overview**
The Centre for Professional Development and Training Cell (CPDT Cell) is established to promote continuous professional growth, skill enhancement, and competency development among faculty members, students, and non-teaching staff. The cell focuses on strengthening academic quality, industry relevance, and institutional excellence through structured training and development initiatives.

The CPDT Cell serves as a platform to upgrade knowledge in emerging technologies, innovative teaching practices, research methodologies, and professional ethics. By fostering a culture of lifelong learning, the cell bridges the gap between academic knowledge and industry expectations.

**Objectives**
• To encourage continuous professional development among faculty and staff
• To organize Faculty Development Programs (FDPs), workshops, and training sessions
• To enhance teaching–learning effectiveness and academic delivery
• To promote research, innovation, publications, and patent activities
• To support skill development aligned with industry and societal needs
• To contribute towards quality assurance and accreditation processes

**Functions**
• Planning and conducting FDPs, seminars, and workshops
• Organizing training programs for teaching and non-teaching staff
• Coordinating student skill development and certification programs
• Inviting industry experts and academicians as resource persons
• Encouraging participation in online courses and professional certifications
• Maintaining records of professional development activities

**Key Highlights**
• Regular organization of Faculty Development Programs
• Skill enhancement programs on emerging technologies
• Active participation of industry experts and academic professionals
• Support for research publications, patents, and consultancy activities
• Contribution to NBA, NAAC, and NIRF quality initiatives
• Promotion of a culture of lifelong learning and excellence`,
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Complaint  & redressal Cell',
                body: `**Overview**
                The Complaint and Grievance Redressal Cell is established to provide students with a transparent, fair, and efficient mechanism to address their concerns and complaints. The cell ensures that all grievances related to academics, administration, infrastructure, or student welfare are handled promptly and impartially.

The primary objective of the cell is to maintain a healthy academic environment by promoting accountability, mutual respect, and justice within the institution. Students are encouraged to report issues without fear, as all complaints are treated with strict confidentiality.
**Objectives**
• To provide a confidential and accessible channel for grievance redressal
• To address complaints related to academics, facilities, and campus services
• To ensure fair and transparent investigation of all grievances
• To facilitate timely resolution and appropriate action
• To promote a culture of accountability and responsiveness
• To enhance stakeholder satisfaction and trust

**Functions**
• Receiving and recording grievances from students, faculty, and staff
• Conducting thorough investigation of all complaints
• Organizing training programs for teaching and non-teaching staff
• Coordinating student skill development and certification programs
• Inviting industry experts and academicians as resource persons
• Encouraging participation in online courses and professional certifications
• Maintaining records of professional development activities

**Key Highlights**
• Regular organization of Faculty Development Programs
• Bi-weekly meetings (every 15 days)
• Skill enhancement programs on emerging technologies
• Active participation of industry experts and academic professionals
• Support for research publications, patents, and consultancy activities
• Contribution to NBA, NAAC, and NIRF quality initiatives
• Promotion of a culture of lifelong learning and excellence
• Annual report submission to IQAC`,
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Higher Education Cell',
                body: `**Overview**
               ECET Higher Education Cell, focus on significantly increasing student participation and success in competitive examinations such as GATE, GRE, and Civil Services. Our approach integrates academic preparation with the broader vision of the UN Sustainable Development Goals (SDGs) to foster holistic student development. The tagline "Beyond Graduation – Towards Greatness"  capture the essence of cell's mission to empower students, inspire ambition, and facilitate their journey toward achieving their highest potential in competitive examinations and beyond.

**Objectives**
• Boost student participation in competitive exams
• Improve qualification and success rates
• Prepare students for global higher education and research
• TDevelop future-ready, socially responsible leaders

**Functions**
• Conduct workshops, coaching sessions, and mock exams
• Provide mentorship, counseling, and career guidance
• Promote research, innovation, and higher study pathways
• Monitor results, feedback, and student success metrics

**Key Highlights**
• Smart prep for GATE, GRE, Civil Services & top exams
• Mentors + alumni guidance for higher studies & careers
• SDG-focused learning for global-ready graduates
• Active participation of industry experts and academic professionals
• Progress tracking, mock tests, and digital resources`,
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Intellectual Property Rights Cell (IPR Cell)',
                body: `**About IPR Cell**
The Intellectual Property Rights (IPR) Cell of EASA College of Engineering and Technology is actively engaged in fulfilling its commitment and responsibilities toward fostering a strong research and innovation culture within the institution. The primary objective of establishing the IPR Cell is to enhance the intellectual productivity of the college by promoting the creation, protection, and utilization of intellectual assets generated through research and development activities.

The IPR Cell has facilitated and supported patent filings across diverse domains. All filed patents have successfully reached the publication stage, and some have progressed further toward grant, reflecting the growing research maturity and innovation capabilities of the institution.

The IPR Cell has been at the forefront in creating awareness and sensitizing faculty members, researchers, and students on the importance of intellectual property rights and patent drafting. Regular workshops, seminars, training programs, and awareness sessions are organized to build competency in IPR-related aspects. These programs provide valuable opportunities for interaction with experts from the Indian Patent Office, industry professionals, legal experts, and practicing IPR specialists.

To foster a robust innovation ecosystem and ensure effective governance of intellectual assets, the IPR Cell actively conducts brainstorming sessions involving faculty members, students, industry experts, and legal professionals. As a result of these initiatives, a comprehensive IPR Policy has been formulated to ensure systematic, transparent, and efficient management of intellectual property generated at the institution.

The IPR Cell of EASA College of Engineering and Technology serves as a dynamic platform for researchers, students, and industry stakeholders to engage in discussions on research breakthroughs, challenges, and emerging trends, particularly in the areas of creation, protection, management, and commercialization of intellectual property assets. The Cell continuously keeps the academic community updated with the rapidly evolving national and international intellectual property frameworks.

**Objectives of the IPR Policy**
• Create a supportive and enabling environment within the institution for the generation, protection, and promotion of intellectual property arising from research, innovation, and creative activities.
• Establish a single-window reference and facilitation system for all matters related to intellectual property generated through academic, research, consultancy, and collaborative activities carried out within or outside the institution on its behalf.
• Safeguard the rights and interests of inventors and creators while promoting a fair, transparent, and ethical intellectual property management culture that also provides appropriate incentives to investors and stakeholders.
• Provide legal and procedural support, wherever feasible, to protect and defend the intellectual property owned by the institution against infringement, misuse, or unauthorized exploitation.
• Ensure timely disclosure of intellectual property by inventors to the institution when they intend to explore commercialization opportunities, while maintaining strict confidentiality until patent or other IP applications are duly filed and processed.
• Enable effective utilization and commercialization of intellectual property for the mutual benefit of the inventors, the institution, industry partners, and society, thereby contributing to national innovation and economic development.

**Importance of IPR**
Protection of intellectual property is essential for enabling institutions, researchers, and innovators to gain due recognition as well as financial and commercial benefits from their creative and inventive efforts. Governments across the world safeguard innovative ideas and creations through Intellectual Property Rights (IPR), thereby encouraging research, innovation, and technological advancement.

In recent years, IPR has emerged as a critical concern in both developed and developing nations, owing to its significant role in knowledge-driven economies. Intellectual Property Rights are increasingly viewed not only as legal instruments for protection but also as valuable marketable assets and powerful economic tools. Hence, it is imperative to create awareness among researchers, faculty members, and students regarding the importance of identifying, protecting, and managing intellectual property generated within the institution.

Intellectual Property Rights (IPR) refer to the legal rights derived from intellectual property, including patents, registered industrial designs, copyrights, trademarks, and other forms of protected intellectual assets.

The Government of India revised the National Intellectual Property Rights (IPR) Policy in May 2016 with the vision of fostering creativity and innovation while ensuring a balanced and effective intellectual property system. The policy outlines clear vision, mission, and objectives aimed at strengthening the IPR ecosystem, promoting awareness, facilitating commercialization, and supporting economic growth through innovation.

**Types of Intellectual Property (IP)**
**Patent**
A patent is an exclusive right granted for an invention, which may be a product or a process that introduces a novel method of performing a task or provides a new technical solution to an existing problem.
**Copyright**
Copyright is an exclusive legal right granted to the creator of original works such as literary, dramatic, musical, and artistic works, including architectural designs, cinematograph films, and sound recordings.
**Trademark / Service Mark**
A trademark or service mark refers to a mark capable of graphical representation that distinguishes the goods or services of one entity from those of others. It may include words, symbols, logos, shapes of goods, packaging, or combinations of colours.
**Industrial Design**
Industrial design refers to the aesthetic features of an article, including shape, configuration, pattern, ornamentation, or composition of lines or colours, applied in two-dimensional or three-dimensional form. Protection is limited to visual appeal and does not include functional or mechanical aspects of the product.
**Integrated Circuit (IC) Layout Designs**
IC layout design means the three-dimensional configuration of transistors and other circuitry elements, including lead wires, expressed in any form in a semiconductor integrated circuit.
**New Plant Variety**
A new plant variety is one that is novel, distinct, uniform, and stable in its characteristics and is eligible for protection under plant variety protection laws.
**Biotechnology Inventions**
Biotechnology inventions include innovations such as recombinant products, vectors, nucleotide or gene sequences, genetically modified organisms, and micro-organisms with industrial or commercial applications.
**Traditional Knowledge**
Traditional knowledge refers to knowledge systems developed by indigenous or local communities through long-term interaction with nature, particularly in areas such as agriculture, food, medicine, and biodiversity. This knowledge is traditionally passed from one generation to another.
**Geographical Indications (GI)**
Geographical Indications identify goods as originating from a specific territory, region, or locality, where a given quality, reputation, or characteristic of the goods is essentially attributable to their geographical origin. This applies to agricultural, natural, and manufactured goods.

**Useful Links – IP Authorities and Services**
• IP India: Official portal of Intellectual Property Office of India - http://www.ipindia.nic.in
• IP India Services Portal: Online filing and IP-related services - http://ipindiaservices.gov.in/
• Patent Facilitating Centre (PFC): Patent facilitation and support services - http://www.pfc.org.in/
• Rajiv Gandhi National Institute of Intellectual Property Management: Training, education, and capacity building in IPR - http://www.ipindia.nic.in/

**Patent and Trademark Search Databases**
• InPASS (Indian Patent Advanced Search System): http://ipindiaservices.gov.in/publicsearch/
• WIPO – PATENTSCOPE: https://patentscope.wipo.int/search/en/structuredSearch.jsf
• United States Patent and Trademark Office: https://www.uspto.gov/patents-application-process/search-patents
• European Patent Office – Espacenet: https://worldwide.espacenet.com/
• Google Patents: https://patents.google.com/
• IP India Trademark Public Search: https://ipindiaonline.gov.in/tmrpublicsearch/`,
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Drug-Free Campus',
                body: `**Overview**
Our college believes that education is not only about academics, but also about shaping responsible, healthy, and confident individuals. Creating a drug-free campus is an essential part of this mission. Substance abuse can seriously affect a student’s health, academic performance, relationships, and future opportunities. We are committed to guiding our students towards positive choices that support their personal and professional growth.

Our institution strictly follows a zero-tolerance policy against the use, possession, or distribution of drugs on campus. At the same time, we believe that awareness, guidance, and support are more powerful than punishment alone. The college regularly organizes awareness programmes, interactive sessions, talks by experts, and campaigns to educate students about the harmful effects of substance abuse and the importance of healthy living.

Students who feel overwhelmed or are facing personal challenges are encouraged to seek help without fear or hesitation. Confidential counseling and mentoring support are available, and students are assured that reaching out for help is a sign of courage and self-respect, not weakness.

Together, as students, faculty, and staff, we can create a campus environment built on care, discipline, and mutual respect. Let us work hand in hand to ensure a safe, supportive, and drug-free learning space for everyone.

“Your future matters. Choose health. Choose life.”

**Anti-Drug Committee Members**
• Dr.Z.Robert Kennedy – Principal (Chairman)
• Mr.K.Chandru – AP/BME (Coordinator)
• Dr.P.Manju – Dean Student Affairs (Member)
• Dr.S.Santhosh – Dean Mechanical Science (Member)
• Mr.R.Varadharajan – Physical Director & Boys Hostel Incharge (Member)
• Ms.K.Shalini – Teaching Assistant & Girls Hostel Incharge (Member)
• Mrs.Greeshma Felix – AP/IT (Member)
• Mr.T.Madhan Krishnan – II BME (Student Member)
• Mr.Jeevan – III ECE (Student Member)
• Mr.Naveen Kumar – II EEE (Student Member)
• Mr.Antony Nelson – II CSE (Student Member)
• Mr.R.Ajay – II AIML (Student Member)
• Mr.Jero – II Cyber Security (Student Member)
• Mr.Aakash – IV AGRI (Student Member)
• Mr.Mohammed Hassan – III IT (Student Member) `,
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Anti-Ragging Cell',
                body: `**Anti-Ragging Message**
The Anti-Ragging Committee ensures compliance with the provisions of regulations concerning ragging and monitors the performance of the Anti-Ragging Squad in preventing ragging within the institution. Ragging is strictly prohibited and we maintain a zero-tolerance policy.

**Objectives of Anti-Ragging Committee**
• To aware the students of dehumanizing effect of ragging inherent in its perversity.
• To keep a continuous watch and vigil over ragging so as to prevent its occurrence and recurrence.
• To promptly and stringently deal with the incidents of ragging brought to our notice.
• To generate an atmosphere of discipline by sending a clear message that no act of ragging shall be tolerated and any act of ragging shall not go unnoticed and unpunished.

**Function of Anti-Ragging Committee**
As per the order of Supreme Court of India and subsequent notification from University Grants Commission (UGC), ragging constitutes one or more of any intention by any student or group of students on:
• Any act of indiscipline, teasing or handling with rudeness.
• Any act that prevents, disrupts the regular academic activity.
• Any activity which is likely to cause annoyance, hardship, psychological harm or creates fear or apprehension.
• Any act of financial extortion or forceful expenditure.
• Any act of physical abuse causing assault, harm or danger to health.
• Any act of abuse by spoken words, emails, SMS or public insult etc.
• Any act of injury or infringement of the fundamental right to the human dignity.
• Any act of wrongful confinement, kidnapping, molesting or committing unnatural offences, use of criminal forces, trespass or intimidation.
• Any unlawful assembly or conspiracy to ragging.

**Punishment to Those Found Guilty**
• Debarring from appearing in any sessional test / University Examination
• Suspension from attending classes and academic privileges
• Withdrawing scholarships and other benefits
• Suspension from the college
• Cancellation of the admission
• Withholding the results.

**Anti-Ragging Helpline**
If you experience or witness any incident of ragging, please report it immediately to the college authorities or the National Anti-Ragging Helpline.
• National Anti-Ragging Helpline: 1800-180-5522
• UGC Email: helpline@antiragging.in`,
                image: 'https://sbmjckgf.in/upload/ragging.jpg'
            },
            {
                heading: 'Women Grievance Redressal Cell',
                body: `**Overview**
The Women Grievance Redressal Cell was established under Act No. 20 of 1990 by the Government of India. The cell is dedicated to safeguarding and promoting the overall well-being of all women employees and students within the organization. It addresses a wide range of grievances, including but not limited to workplace issues, discrimination, harassment, and any other concerns affecting women, ensuring timely and appropriate action for redressal. The cell is responsible for looking into any complaints filed by students or staff regarding women-related grievances at the college.

**Objectives**
• Protect and promote the rights, safety, and well-being of women employees and students within the organization.
• Provide a formal mechanism to receive, examine, and resolve complaints related to harassment, discrimination, workplace issues, and other concerns affecting women.
• Ensure timely and confidential action on all grievances.
• Foster a supportive, respectful, and inclusive environment where women feel safe and valued.
• Conduct awareness programs to educate staff and students about women’s rights, workplace policies, and grievance procedures.
• Suggest improvements in institutional policies and practices to prevent women-related issues.
• Promote gender equality and a culture of fairness throughout the organization.

**Committee Members**
• Dr. Z. Robert Kennedy – Chairperson
• Dr. Manju P. – Convener
• Dr. Vishnu Priya M. – Coordinator
• Dr. P. Sasikala – Member
• Ms. Indumath R. – Member
• Ms. Janani M. – Member`,
                image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'autonomous-regulations',
        title: 'Autonomous Regulations',
        subtitle: 'Educational Framework for Excellence',
        heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
        content: `As an institution evolving with global standards, EASA College of Engineering and Technology follows an autonomous framework designed to foster innovation, academic rigor, and industry readiness. This framework gives us the flexibility to design a curriculum that is both contemporary and globally relevant.`,
        sections: [
            {
                heading: 'Choice Based Credit System (CBCS)',
                body: `Our academic structure is built on the Choice Based Credit System (CBCS), allowing students to choose from a wide range of elective courses. This approach promotes interdisciplinary learning and allows students to tailor their education to their career goals.\n\nKey features include:\n• Core and Elective courses\n• Soft skill and personality development modules\n• Industry-aligned internships and projects\n• Continuous assessment through internal tests and assignments.`,
                image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Examination & Evaluation',
                body: `Our evaluation system is designed to be comprehensive and transparent. It assesses students through a mix of continuous internal evaluation and end-semester examinations.\n\nHighlights:\n• Credit-based GPA and CGPA calculations\n• Clear guidelines on attendance and reappearance\n• Proactive grievance redressal for evaluation results\n• Academic audits to maintain high quality standards.`,
                image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Academic Documents & Regulations',
                body: `For detailed information, please download the respective academic regulation documents below. These documents provide the complete legal and academic framework for your degree programme.\n\n**Latest Regulations:**\n• Anna University R-2023 (UG) (CBCS)\n• Anna University R-2021 (UG) (CBCS)\n• Anna University R-2021 (PG) (CBCS)\n• Anna University R-2017 (UG)\n• UGC Anti-Ragging Regulations\n• Autonomous Regulations Handbook 2024-25\n\nNote: All students are required to stay updated with these regulations as they are updated periodically by the university and the institution.`,
                image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    }
];

const resourcesData = [
    {
        title: "Anna University R-2023 (UG) (CBCS)",
        category: "Regulations",
        description: "Academic Regulations for B.E. / B.Tech. Degree Programmes (Revised) for students admitted from the year 2023 onwards.",
        fileUrl: "https://cac.annauniv.edu/PhpProject1/index.php",
        date: new Date()
    },
    {
        title: "Anna University R-2021 (UG) (CBCS)",
        category: "Regulations",
        description: "Regulations for Undergraduate Degree Programmes under Anna University Coimbatore affiliated colleges.",
        fileUrl: "https://cac.annauniv.edu/PhpProject1/index.php",
        date: new Date()
    },
    {
        title: "Anna University R-2021 (PG) (CBCS)",
        category: "Regulations",
        description: "Academic Regulations for MBA, M.E. / M.Tech. Degree Programmes for students admitted from 2021 academic year.",
        fileUrl: "https://cac.annauniv.edu/PhpProject1/index.php",
        date: new Date()
    },
    {
        title: "UGC Anti-Ragging Regulations",
        category: "Regulations",
        description: "UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions.",
        fileUrl: "https://www.ugc.gov.in/pdfnews/9132060_Anti-Ragging-Regulation-Hindi.pdf",
        date: new Date()
    },
    {
        title: "Autonomous Regulations Handbook",
        category: "Regulations",
        description: "Official handbook detailing the academic policies, curriculum structure, and examination rules under the autonomous system.",
        fileUrl: "http://localhost:5000/docs/autonomous_regulations.pdf",
        date: new Date()
    },
    {
        title: "Anna University R-2017 (UG)",
        category: "Regulations",
        description: "Academic Regulations for B.E. / B.Tech. Degree Programmes for students admitted from the Academic Year 2017 onwards.",
        fileUrl: "https://cac.annauniv.edu/PhpProject1/index.php",
        date: new Date()
    },
    {
        title: "Faculty Handbook",
        category: "Faculty Handbook",
        description: "Comprehensive guidelines, code of conduct, and academic policies for faculty members.",
        fileUrl: "https://docs.google.com/document/d/1mpA8Z9pb9-Mntkko8JwgnAp3p6Zj8LeB/edit",
        date: new Date()
    },
    {
        title: "Student Handbook 2024-25",
        category: "Student Handbook",
        description: "Essential information on college rules, curriculum, and campus life for students.",
        fileUrl: "",
        date: new Date()
    }
];

module.exports = {
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
    institutionData,
    infrastructureData,
    sustainabilityData,
    communityOutreachData,
    tickerAlertsData,
    scholarshipsData,
    placementPageData,
    sportsData,
    resourcesData
};
