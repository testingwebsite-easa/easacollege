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
const coreBeliefsData = [];
const missionVisionData = {
    vision: "To be a world-class centre for engineering, technology and management, empowering individuals ethically to lead, innovate and thrive in an ever-evolving global landscape and create socially responsible citizens.",
    mission: [
        "To foster a culture of academic excellence, intellectual and personal growth and practical training that includes hands-on experience in the fields of engineering, technology, and management.",
        "To advance knowledge and drive innovation through cutting-edge research and development in engineering, technology and management.",
        "To bridge the gap between academia and industry by offering industry aligned programs, practical experience and hands-on training in engineering, technology and management that prepare students to lead, innovate and thrive in an ever-evolving global landscape.",
        "To prioritise health, safety, diversity, equity and inclusion to create a welcoming and inclusive environment that produces socially responsible citizens.",
        "To prepare students for successful careers and fulfilling lives by equipping them with the knowledge, skills and ethical principles needed to lead, innovate and thrive in their chosen fields, while emphasising hands-on training as a vital component of their education."
    ]
};
const ugCoursesData = [];
const pgCoursesData = [];

const COMMON_UG_PO = [
    "PO1 Engineering Knowledge: Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.",
    "PO2 Problem Analysis: Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)",
    "PO3 Design/Development of Solutions: Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)",
    "PO4 Conduct Investigations of Complex Problems: Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions.(WK8).",
    "PO5 Engineering Tool Usage: Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)",
    "PO6 The Engineer and The World: Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment.(WK1, WK5, and WK7).",
    "PO7 Ethics: Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws. (WK9)",
    "PO8 Individual and Collaborative Team work: Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.",
    "PO9 Communication: Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.",
    "PO10 Project Management and Finance: Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to one’s own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.",
    "PO11 Life-Long Learning: Recognize the need for, and have the preparation and ability for i) independent and life-long learning ii) adaptability to new and emerging technologies and iii) critical thinking in the broadest context of technological change. (WK8)"
];

const COMMON_UG_WK = [
    "WK1 Natural Sciences: A systematic, theory-based understanding of the natural sciences applicable to the discipline and awareness of relevant social sciences.",
    "WK2 Mathematics & Computing Analysis: Conceptually-based mathematics, numerical analysis, data analysis, statistics and formal aspects of computer and information science to support detailed analysis and modelling applicable to the discipline.",
    "WK3 Engineering Fundamentals: A systematic, theory-based formulation of engineering fundamentals required in the engineering discipline.",
    "WK4 Specialist Knowledge: Engineering specialist knowledge that provides theoretical frameworks and bodies of knowledge for the accepted practice areas in the engineering discipline; much is at the forefront of the discipline.",
    "WK5 Sustainable Engineering & Operations: Knowledge, including efficient resource use, environmental impacts, whole-life cost, re-use of resources, net zero carbon, and similar concepts, that supports engineering design and operations in a practice area.",
    "WK6 Engineering Practice (Technology): Knowledge of engineering practice (technology) in the practice areas in the engineering discipline.",
    "WK7 Society, Safety & Sustainability: Knowledge of the role of engineering in society and identified issues in engineering safety and sustainable development.",
    "WK8 Research & Critical Thinking: Engagement with selected knowledge in the current research literature of the discipline, awareness of the power of critical thinking and creative approaches to evaluate emerging issues.",
    "WK9 Ethics & Inclusive Conduct: Ethics, inclusive behavior and conduct. Knowledge of professional ethics, responsibilities, and norms of engineering practice. Awareness of the need for diversity by reason of ethnicity, gender, age, physical ability etc. with mutual understanding and respect, and of inclusive attitudes."
];

const departmentsData = [

    //AI DS 

    {
        id: "artificial-intelligence-and-data-science",
        name: "Artificial Intelligence & Data Science",
        slug: "artificial-intelligence-and-data-science",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,

        heroImage: "https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg",
        overview: "The Department of AI & Data Science combines the power of artificial intelligence with the analytical capabilities of data science to solve complex problems.",
        vision: "To achieve value-based education and bring idealistic, ethical engineers to meet the thriving trends and technology in the field of Artificial Intelligence and Data Science.",
        mission: [
            "M1: Activate students potential in developing core competencies to solve real world problems through the effective application of Artificial Intelligence.",
            "M2: Involve students with industry collaboration, career guidance and leadership skills.",
            "M3: Discover students potential to become technically proficient engineers through innovation in Data Science.",
            "M4: Strengthen students ethical foundation to in-still morals in both personal and societal contexts."
        ],
        peo: [
            "Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "Conduct cutting edge research and develop solutions on problems of social relevance.",
            "Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "PSO1: Exhibit proficiency of Artificial Intelligence and Data Science to evolve AI based efficient domain specific processes for effective decision making in several domains such as business and governance domains.",
            "PSO2: Exhibit proficiency of Artificial Intelligence and Data Science in providing sustainable solutions by adapting to societal, environmental and ethical concerns to real world problems.",
            "PSO3: Develop data analytics and data visualization skills, skills pertaining to knowledge acquisition, knowledge representation and knowledge engineering, and hence be capable of coordinating complex projects."
        ],
        milestones: [
            { year: "2023", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. M.G Dinesh",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/IMG-20251204-WA0010.jpg",
            designation: "Head of Department",
            message: "In today’s technology-driven world, data is the new currency, and intelligence is the differentiator. Our department is dedicated to shaping the next generation of engineers who can harness the power of AI to solve real-world problems."
        },
        studentCount: "60+",
        facultyCount: "5+",
        labCount: "3+",
        labs: [
            {
                name: "AI & Deep Learning Computing Lab",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
                description: "High-performance GPU computing cluster tailored for training deep neural networks, large vision transformers, generative models, and reinforcement learning pipelines.",
                equipment: "NVIDIA RTX GPUs, PyTorch, TensorFlow 2.x, CUDA Workstations, Anaconda Enterprise, Keras, TensorBoard"
            },
            {
                name: "Big Data Analytics & Cloud Intelligence Lab",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
                description: "State-of-the-art big data engineering environment for distributed cluster computations, ETL pipeline orchestration, and business intelligence.",
                equipment: "Apache Hadoop, Apache Spark, MongoDB Enterprise, Apache Kafka, Tableau Desktop, AWS Cloud Cluster"
            },
            {
                name: "Computer Vision & Natural Language Processing Lab",
                image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
                description: "Research facility dedicated to multi-modal artificial intelligence, image segmentation, object detection, LLM prompt engineering, and conversational speech agents.",
                equipment: "OpenCV, HuggingFace Transformers, SpaCy, High-Resolution Industrial Cameras, LiDAR Sensor Prototyping Kits"
            }
        ],
        coe: {
            code: "CoE-AIMAA",
            name: "Centre of Excellence in AI, ML & Advanced Analytics",
            tagline: "Transforming Data into Intelligence, Innovation, and Impact.",
            logo: "/images/coe-aimaa-logo.png"
        },
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //CSE

    {
        id: "computer-science-and-engineering",
        name: "Computer Science and Engineering",
        slug: "computer-science-and-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://i.pinimg.com/1200x/dd/b1/78/ddb1781bd633b45439f140e0437e1480.jpg",
        overview: "The Department of Computer Science and Engineering was established with the vision of producing high-quality computer science professionals who can adapt to the changing needs of the industry and society. The department has state-of-the-art laboratories and highly qualified faculty members.",
        vision: "To be a globally pre - eminent hub for education and research in Computer Science and Engineering, equipping students with the expertise, knowledge and creative mind set to become leaders and catalysts for positive change in the fast-changing global technology arena.",
        mission: [
            "M1: To provide a dynamic learning environment that fosters academic excellence, personal growth and practical training in the field of Computer Science Engineering, preparing students for successful careers and fulfilling lives.",
            "M2: To advance knowledge and drive innovation in Computer Science Engineering through cutting-edge research and development, contributing to the technological progress of society.",
            "M3: To bridge the gap between academia and industry by offering industry aligned programs, hands-on training and practical experience in Computer Science Engineering, preparing students to lead, innovate and thrive in a rapidly evolving technological landscape.",
            "M4: To promote diversity, equity and inclusion in all aspects of Computer Science Engineering education and research, creating a welcoming and inclusive environment that produces socially responsible citizens.",
            "M5: To instill ethical principles and a commitment to social responsibility in our students, equipping them with the knowledge, skills and leadership qualities needed to contribute to the betterment of society through Computer Science Engineering."
        ],
        peo: [
            "PEO1: Graduates will be able to analyze, design, and develop software solutions for real-world problems.",
            "PEO2: Graduates will demonstrate professional ethics, leadership skills, and team spirit in their career.",
            "PEO3: Graduates will pursue higher education and research to adapt to technological advancements."
        ],
        pso: [
            "PSO1: Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.",
            "PSO2: Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems.",
            "PSO3: Ability to work effectively with various engineering fields as a team to design, build and develop system applications."
        ],
        curriculum: [
            {
                year: "II CSE",
                semester: "Semester IV",
                regulation: "R24",
                courses: [
                    { sl: 1, code: "U24MA401", name: "Engineering Mathematics - IV", strength: 40, l: 3, t: 2, p: 0, credits: 4 },
                    { sl: 2, code: "U24CS401", name: "Theory of Computation", strength: 40, l: 3, t: 2, p: 0, credits: 4 },
                    { sl: 3, code: "U24CS403", name: "Database Management Systems", strength: 40, l: 4, t: 0, p: 0, credits: 3 },
                    { sl: 4, code: "U24BS401", name: "Environmental Sciences and Sustainability", strength: 40, l: 3, t: 0, p: 0, credits: 3 },
                    { sl: 5, code: "U24CS405", name: "Introduction to Operating Systems", strength: 40, l: 4, t: 0, p: 0, credits: 3 },
                    { sl: 6, code: "U24CS402", name: "Artificial Intelligence and Machine Learning", strength: 40, l: 3, t: 0, p: 2, credits: 4 },
                    { sl: 7, code: "U24CS404", name: "Algorithms", strength: 40, l: 3, t: 0, p: 2, credits: 4 },
                    { sl: 8, code: "U24CS4L1", name: "Operating Systems Laboratory", strength: 40, l: 0, t: 0, p: 3, credits: 1.5 },
                    { sl: 9, code: "U24CS4L2", name: "Database Management Systems Laboratory", strength: 40, l: 0, t: 0, p: 3, credits: 1.5 },
                    { sl: 10, code: "U24MC41", name: "Indian Constitution", strength: 40, l: 2, t: 0, p: 0, credits: 0 }
                ]
            },
            {
                year: "III CSE",
                semester: "Semester VI",
                regulation: "R21",
                courses: [
                    { sl: 1, code: "CCS356", name: "Object oriented software engineering", strength: 47, l: 3, t: 0, p: 2, credits: 4 },
                    { sl: 2, code: "CS3691", name: "Embedded systems & IoT", strength: 47, l: 3, t: 0, p: 2, credits: 4 },
                    { sl: 3, code: "OIE351", name: "Introduction to Industrial Engineering", strength: 47, l: 3, t: 0, p: 0, credits: 3 },
                    { sl: 4, code: "CCS338", name: "Computer Vision", strength: 47, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 5, code: "CCS372", name: "Virtualization", strength: 32, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 6, code: "CCS343", name: "Digital and Mobile Forensics", strength: 15, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 7, code: "CCS365", name: "Software Defined Networks", strength: 31, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 8, code: "CCS363", name: "Social Network Security", strength: 16, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 9, code: "CCS370", name: "UI and UX Design", strength: 47, l: 2, t: 0, p: 2, credits: 3 },
                    { sl: 10, code: "MX3089", name: "Industrial Safety MC", strength: 47, l: 3, t: 0, p: 0, credits: 0 }
                ]
            }
        ],
        milestones: [
            { year: "2008", desc: "Department Established" },
            { year: "2012", desc: "First Batch Graduated" },
            { year: "2018", desc: "NBA Accreditation" }
        ],
        hod: {
            name: "Mr.Abhijit V",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/cse-hod.png",
            designation: "Assistant Professor & Head",
            message: "Code your future with confidence! Learn programming, software development, and problem-solving skills. Explore trending technologies like Web, Cloud, and App Development. Build a strong career in the IT and software industry."
        },
        studentCount: "190+",
        facultyCount: "13+",
        labCount: "05",
        labs: [
            {
                name: "Advanced Software Engineering & Full-Stack Lab",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
                description: "Modern software development lab for building enterprise full-stack web applications, microservices, and continuous integration workflows.",
                equipment: "Core i7 Workstations, VS Code Enterprise, Docker, Kubernetes, Node.js, React 19, Git/GitHub, Jenkins CI/CD"
            },
            {
                name: "Database Systems & Cloud Computing Lab",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
                description: "Specialized environment for relational and NoSQL database modeling, transaction management, query optimization, and enterprise cloud deployments.",
                equipment: "Oracle 19c Enterprise, PostgreSQL, MySQL Workbench, MongoDB, AWS SDK, Microsoft Azure Dev Suite"
            },
            {
                name: "Networks & Operating Systems Lab",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on laboratory for socket programming, network protocol verification, kernel customization, and distributed OS experiments.",
                equipment: "Cisco Layer 3 Managed Switches, Wireshark Protocol Analyzer, Ubuntu Linux, NS-3 Simulator, OPNET Modeleler"
            }
        ],
        mou: [
            { partner: "MAHAT LABS PRIVATE LIMITED", purpose: "Saas based low code application development platform", year: "2026", benefits: "App Development" },
        ]
    },

    //AI ML
    {
        id: "artificial-intelligence-and-machine-learning",
        name: "CSE - Artificial Intelligence & Machine Learning",
        slug: "artificial-intelligence-and-machine-learning",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://i.pinimg.com/736x/3f/68/48/3f684852a3474b0127539eeede3f72d5.jpg",
        overview: "The Department of AI & ML focuses on the study of intelligent agents and the construction of such agents, which are systems that perceive their environment and take actions that maximize their chances of achieving their goals.",
        vision: "The Vision of the department is to produce competent graduates suitable for industries and organizations at global level including research and development with social responsibility.",
        mission: [
            "M1: Fostering excellence in education, innovation and entrepreneurship to create change agents for inclusive growth.",
            "M2: Encouraging inter-disciplinary studies and research to embrace the changing dimensions of the society and industry.",
            "M3: Providing academic and research facilities with ambience that conform to global benchmarks.",
            "M4: Partnering with national and international institutions for leveraging synergies.",
            "M5: Engaging communities through extension activities for neighborhood development.",
            "M6: Supporting policy development and practices through continuous engagement with stakeholders."
        ],

        peo: [
            "PEO1: Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "PEO2: Conduct cutting edge research and develop solutions on problems of social relevance.",
            "PEO3: Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "PSO1: Ability to apply AI & ML techniques to solve real-world problems.",
            "PSO2: Ability to design and implement intelligent agents."
        ],
        milestones: [
            { year: "2023", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. M.G Dinesh",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/IMG-20251204-WA0010.jpg",
            designation: "Head of Department",
            message: "In today’s technology-driven world, data is the new currency, and intelligence is the differentiator. Our department is dedicated to shaping the next generation of engineers who can harness the power of AI to solve real-world problems."
        },
        studentCount: "60+",
        facultyCount: "5+",
        labCount: "3+",
        labs: [
            {
                name: "Machine Learning & Predictive Modeling Lab",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                description: "Equipped for statistical learning algorithms, feature engineering, classification models, ensemble methods, and automated ML pipelines.",
                equipment: "JupyterHub Server, Scikit-learn, XGBoost, LightGBM, RStudio Server, Pandas, NumPy, High-Speed Compute Nodes"
            },
            {
                name: "Robotics & Autonomous Systems Lab",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
                description: "Prototyping arena for autonomous robotic navigation, SLAM mapping, sensor fusion, and real-time computer vision guidance.",
                equipment: "ROS (Robot Operating System), TurtleBot3 Prototyping Kits, Raspberry Pi 5 AI Kits, Ultrasonic & Depth Sensors, LiDAR"
            },
            {
                name: "Neural Computing & Cognitive Intelligence Lab",
                image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
                description: "Dedicated to neuromorphic computing, cognitive speech recognition, edge deep learning inference, and transformer fine-tuning.",
                equipment: "NVIDIA Jetson Orin Nano, Google Coral Edge TPU, TensorRT, PyTorch, Whisper Speech Suite"
            }
        ],
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //CSE CYBER
    {
        id: "computer-science-and-engineering-cyber-security",
        name: "CSE - Cyber Security",
        slug: "computer-science-and-engineering-cyber-security",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://img.freepik.com/free-photo/cyber-security-concept-digital-art_23-2151637760.jpg?semt=ais_wordcount_boost&w=740&q=80",
        overview: "The Department of CSE (Cyber Security) is dedicated to training professionals who can protect information systems and networks from cyber threats.",
        vision: "To be a centre of excellence in Cyber Security, fostering innovation, ethics, and technological advancements to empower students for a secure digital future.",
        mission: [
            "M1: To impart strong theoretical foundations and practical skills in computer science and cyber security, preparing students for the evolving technological landscape.",
            "M2: To foster innovation, critical thinking, and problem-solving abilities in addressing modern cyber threats.",
            "M3: To promote industry collaboration, research, and continuous learning in areas of cyber security, ethical hacking, digital forensics, and secure software development.",
            "M4: To inculcate ethical responsibility, leadership qualities, and social awareness among graduates to safeguard the digital world.",
            "M5: To contribute to the nation’s cyber defence ecosystem through skilled manpower and impactful research."
        ],
        peo: [
            "PEO1: Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "PEO2: Conduct cutting edge research and develop solutions on problems of social relevance.",
            "PEO3: Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "PSO1: Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.",
            "PSO2: Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems."
        ],
        milestones: [
            { year: "2024", desc: "Department Established" }
        ],
        hod: {
            name: "Dr.Sasikala.P",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/cyber-hod.jpeg",
            designation: "Associate Professor & Head ",
            message: "Be the protector of the digital world! Learn ethical hacking, cyber defense, and network security. Understand how to protect systems, data, and online platforms. Get ready for careers in Cyber Security and Digital Forensics."
        },
        studentCount: "60+",
        facultyCount: "4+",
        labCount: "2+",
        labs: [
            {
                name: "Ethical Hacking & Cyber Range Lab",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
                description: "Isolated sandbox environment designed for penetration testing, vulnerability discovery, simulated red-team attacks, and defensive countermeasures.",
                equipment: "Kali Linux Workstations, Metasploit Pro, Burp Suite Enterprise, Wireshark, Snort IDS/IPS, Isolated Virtual Cyber Range"
            },
            {
                name: "Digital Forensics & Malware Analysis Lab",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
                description: "Specialized lab for digital evidence acquisition, hard drive bit-stream imaging, volatile memory forensics, and reverse-engineering obfuscated binaries.",
                equipment: "Autopsy Forensics, FTK Imager, EnCase Certified Software, Volatility Memory Framework, Ghidra Decompiler, Sandbox VMs"
            },
            {
                name: "Network Defense & Cryptography Lab",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on implementation of cryptographic ciphers, public-key infrastructure (PKI), secure VPN tunneling, and next-generation firewall rules.",
                equipment: "PFSense Hardware Firewalls, OpenSSL Cryptographic Suite, Cisco ASA Security Appliances, VPN Concentrators"
            }
        ],
        coe: {
            code: "Cyber Shield Hub",
            name: "Cyber Shield Innovation Hub",
            subname: "Centre of Excellence in Cyber Security & Digital Defence",
            tagline: "Securing the Digital Future through Innovation, Intelligence, and Resilience.",
            logo: "/images/coe-cyber-shield-logo.png"
        },
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //IT
    {
        id: "information-technology",
        name: "Information Technology",
        slug: "information-technology",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://i.pinimg.com/736x/63/3e/64/633e646d4b03b384ddf2c316e920fbde.jpg",
        overview: "The Department of Information Technology focuses on the management and processing of information using computer systems.",
        vision: "To be a world-class hub of excellence in Information Technology, fostering higher-level learning, cutting-edge research, and innovative technologies.",
        mission: [
            "M1: DELIVER high-quality IT education that aligns with student aspirations and potential, equipping them with cutting-edge skills for a dynamic digital world.",
            "M2: INSPIRE a passion for learning and innovation by fostering creativity, problem-solving, and hands-on experience with emerging technologies.",
            "M3: TRANSFORM talents into socially responsible IT professionals who leverage technology to address real-world challenges and serve society ethically."
        ],
        peo: [
            "PEO1: Graduates will have sound foundation in the mathematical, scientific and engineering fundamentals to formulate, solve, and analyze problems related to Information and Technology.",
            "PEO2: Graduates will have employment in IT industries who are socially responsible and integrated with professional and ethical skills.",
            "PEO3: Graduates will involve in research, higher studies and/or to become entrepreneurs in the long run."
        ],
        pso: [
            "PSO1: Have proficiency in programming skills to design, develop and apply appropriate techniques, to solve complex engineering problems.",
            "PSO2: Have knowledge to build, automate and manage IT solutions using cutting-edge technologies.",
            "PSO3: Have the ability to research, create, and build new technology solutions that solve real-world problems and move the industry forward."
        ],
        milestones: [
            { year: "2010", desc: "Department Established" }
        ],
        hod: {
            name: "Dr. B. Syed Moinuddin Bokhari ",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/it-hod.png",
            designation: "Professor & Head",
            message: "Power the digital world with IT skills! Learn software, networking, databases, and web technologies Develop real-time applications with practical training and projects. Prepare for careers in IT services, software, and tech companies."
        },
        studentCount: "120+",
        facultyCount: "9+",
        labCount: "18+",
        labs: [
            {
                name: "Web Intelligence & Mobile App Development Lab",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                description: "Cutting-edge environment for crafting responsive web platforms, cross-platform Android/iOS applications, and cloud-backed REST APIs.",
                equipment: "Android Studio Bumblebee, Flutter SDK, React Native, Node.js, Postman Pro, Firebase Cloud Suite, Apple Xcode Workstations"
            },
            {
                name: "IoT & Smart Embedded Systems Lab",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on laboratory for building smart city sensor nodes, industrial telemetry, edge computing gateways, and MQTT messaging fabrics.",
                equipment: "ESP32 Wi-Fi/BLE Modules, Raspberry Pi 4 Model B, Zigbee Kits, Node-RED, Arduino Uno, Multi-Sensor Sensor Shields"
            },
            {
                name: "Data Structures & Java Enterprise Computing Lab",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
                description: "Dedicated to object-oriented programming, algorithmic efficiency analysis, Spring Boot microservices, and distributed computing.",
                equipment: "High-Performance Workstations, Oracle JDK 21, IntelliJ IDEA Ultimate, Spring Framework, PostgreSQL, Git Version Control"
            }
        ],
        mou: [
            { partner: "Tamil Nadu Technology (iTNT) Hub", purpose: "Exposure to DeepTech innovations and emerging technologies", year: "2025", benefits: "Industry leaders and companies" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //ECE
    {
        id: "electronics-and-communication-engineering",
        name: "Electronics and Communication Engineering",
        slug: "electronics-and-communication-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://static.vecteezy.com/system/resources/thumbnails/029/767/602/small/ict-information-and-communications-technology-on-modern-server-room-background-virtual-screen-photo.jpg",
        overview: "The Department of Electronics and Communication Engineering is dedicated to imparting quality education in the field of electronics and communication. The department focuses on the overall development of students by providing them with practical exposure and industry interaction.",
        vision: "To be a leading hub in Electronics and communication engineering, driving innovation, interdisciplinary collaboration, and socially impactful solutions through cutting – edge Education, Research and Entrepreneurship.",
        mission: [
            "M1: To advance knowledge and practice in Electronics and Communication Engineering Through hands on, industry relevant education that prepares students for innovation, Entrepreneurship and multidisciplinary collaboration.",
            "M2: To foster a culture of research and development that addresses real world challenges and creates transformative solutions at the intersection of the Electronics, Communication and Computing.",
            "M3: To empower individuals and communities by leveraging technology for positive social impact through inclusive education, collaborative outreach and interdisciplinary teamwork."
        ],
        peo: [
            "PEO1: Graduates will have thorough grounding in the fundamental sciences, facilitating their future academic pursuits in Electronics and Communication Engineering.",
            "PEO2: Graduates will demonstrate expertise in Electronics and Communication Engineering, empowering individuals to excel in industry applications, advanced studies, and innovative research.",
            "PEO3: Graduates will have spirit of inquiry and learning, empowering individuals to stay current with industry trends and technological breakthroughs.",
            "PEO4: Graduates will have the ability to critically assess literature, identify knowledge gaps, and develop novel, ethics-guided research approaches to tackle complex challenges.",
            "PEO5: Graduates will have the ability to integrate professional ethics with social awareness, addressing engineering challenges in a holistic manner."
        ],
        pso: [
            "PSO1: Apply electronic, mathematical, and engineering principles to design, develop, and analyse sophisticated electronic systems.",
            "PSO2: Design, simulate, and optimize communication systems.",
            "PSO3: Leverage latest advancements in electronics and communication to design and develop ground breaking solutions."
        ],
        milestones: [
            { year: "2009", desc: "Department Established" },
            { year: "2015", desc: "Started PG Program" }
        ],
        hod: {
            name: "Dr.N.Kaleeswari",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/ECE-HOD.jpeg",
            designation: "Professor & Head",
            message: "Connect the world with innovation!Learn electronics, communication systems, and embedded technology.Work with real-time circuits, IoT, and signal processing concepts.Get ready for careers in telecom, hardware, and core industries."
        },
        studentCount: "190+",
        facultyCount: "11+",
        labCount: "5+",
        labs: [
            {
                name: "VLSI Design & Embedded Systems Lab",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                description: "Specialized for RTL design, ASIC layout synthesis, FPGA hardware prototyping, and ARM microcontroller embedded programming.",
                equipment: "Cadence EDA Suite, Xilinx Vivado, Spartan-6 & Zynq-7000 FPGA Boards, ARM Cortex-M4 Kits, ModelSim Simulator"
            },
            {
                name: "Microwave & Optical Fiber Communication Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on measurement of microwave waveguides, horn antennas, optical fiber attenuation parameters, and laser diode characteristics.",
                equipment: "X-Band Microwave Test Benches, 3 GHz RF Spectrum Analyzers, Optical Time-Domain Reflectometers (OTDR), Fiber Splicers"
            },
            {
                name: "Digital Signal & Image Processing Lab",
                image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
                description: "Enables digital filter design, FFT spectral analysis, image enhancement, voice recognition, and digital modulation experiments.",
                equipment: "MATLAB & Simulink DSP Blockset, Texas Instruments TMS320C6713 DSP Starter Kits, Digital Storage Oscilloscopes (100 MHz)"
            }
        ],
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //EEE
    {
        id: "electrical-and-electronics-engineering",
        name: "Electrical and Electronics Engineering",
        slug: "electrical-and-electronics-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://csdieselgenerators.com/wp-content/uploads/2023/05/4-768x512.png",
        overview: "The Department of Electrical and Electronics Engineering is committed to providing high-quality education and research opportunities in the fields of electrical, electronics, and power engineering. We aim to produce competent engineers who can contribute effectively to the technological advancement of society.",
        vision: "To create and sustain a centre of excellence in Electrical & Electronics Engineering that enables students to experience an unparalleled educational journey that is intellectually, socially, and personally transformative.",
        mission: [
            "M1: Equip the students with adequate knowledge in the field of Electrical and Electronics Engineering that comprehends their aspiration and potential",
            "M2: Evolve passion for learning and foster innovation in a diverse environment",
            "M3: Endorse and nurture the talents towards serving the society"
        ],
        peo: [
            "PEO1: Graduates will demonstrate technical competence in analyzing and designing electrical and electronic systems.",
            "PEO2: Graduates will exhibit professional ethics, leadership qualities, and communication skills.",
            "PEO3: Graduates will engage in lifelong learning to adapt to technological changes."
        ],
        pso: [
            "PSO1: Understand electrical and electronics devices / instruments and to design circuits and provide innovative methodologies to solve real time / industrial problems."
        ],
        milestones: [
            { year: "2008", desc: "Establishment The Department of Electrical and Electronics Engineering was founded along with the inception of EASA College of Engineering and Technology, offering the B.E. program in EEE." },
            { year: "2012", desc: "Infrastructure Expansion Advanced laboratories such as the Electrical Machines Lab, Power Electronics Lab, and Control Systems Lab were set up to strengthen practical learning." },
            { year: "2014", desc: "Postgraduate Program Launch Introduction of the M.E. in Power Electronics and Drives, expanding opportunities for specialization and research." },
            { year: "2015", desc: "Digital Transformation ICT-enabled classrooms, e-learning platforms, and industry-standard simulation tools were integrated into the curriculum." }
        ],
        hod: {
            name: "Mr.Ranjithkumar G",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/eee-hod1.jpg",
            designation: "Assistant Professor & Head",
            message: "Welcome to the Department of Electrical and Electronics Engineering! We focus on building strong knowledge in electrical systems, electronics, and power technologies. Our department encourages practical learning through labs, projects, and industry training. We guide students to become skilled, confident, and ready for future engineering careers."
        },
        studentCount: "65+",
        facultyCount: "7+",
        labCount: "4+",
        labs: [
            {
                name: "Electrical Machines & Modern Drives Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Heavy-duty machinery facility for testing torque-speed curves, regulation, and efficiency across AC/DC generators, synchronous motors, and transformers.",
                equipment: "DC Shunt/Compound Motor-Generator Sets, 3-Phase Squirrel Cage & Slip Ring Induction Motors, Alternators, Auto-Transformers, Resistive/Inductive Load Banks"
            },
            {
                name: "Power Electronics & Renewable Energy Lab",
                image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on development of modern power semiconductor switching circuits, solar PV inverters, MPPT trackers, and brushless DC motor speed controllers.",
                equipment: "IGBT/MOSFET Inverter Trainer Modules, Solar PV Array Emulators, Dual Trace Digital Storage Oscilloscopes, DSP Power Controllers, High-Voltage Probes"
            },
            {
                name: "Control Systems & PLC Automation Lab",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
                description: "Industry-standard control systems testing facility for developing PID loop tuning, stepper/servo positioning, and PLC ladder logic automation.",
                equipment: "Siemens S7-1200 Programmable Logic Controllers, SCADA Interface Terminals, Synchro Transmitter-Receiver Systems, AC/DC Servomotor Position Controllers"
            }
        ],
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //BME
    {
        id: "biomedical-engineering",
        name: "Biomedical Engineering",
        slug: "biomedical-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://i.pinimg.com/736x/fc/09/a1/fc09a17dacc7858942e496384864b6b9.jpg",
        overview: "The Department of Biomedical Engineering integrates engineering principles with medical sciences to improve healthcare diagnosis and treatment.",
        vision: "To empower ethical biomedical innovation through education and research that bridges engineering and healthcare for community well-being.",
        mission: [
            "M1: Build biomedical invention through focused education and practical skills imbibed with ethics.",
            "M2: Motivate students for interdisciplinary learning to solve real world health care challenges.",
            "M3: Engage with industry, hospitals, and research institutions to enhance collective welfare through accessible healthcare innovations."
        ],
        peo: [
            "PEO1: Graduates will be able to develop the ability to identify healthcare challenges in society and apply analytical and design skills to create effective, practical solutions.",
            "PEO2: Graduates will be able to be biomedical innovators who can lead sustainable startups for impactful healthcare solutions.",
            "PEO3: Graduates will be able to demonstrate a lifelong learning attitude to adapt and succeed in evolving multidisciplinary careers in Engineering and medicine."
        ],
        pso: [
            "PSO1: Graduates will be able to design ergonomic medical devices that support clinicians, reduce workload, and enhance patient care using biomedical engineering principles.",
            "PSO2: Graduates will be equipped to leverage software tools and emerging technologies to develop cost-effective, indigenous healthcare solutions addressing real-world clinical and societal needs."
        ],
        milestones: [
            { year: "2024", desc: "Establishment & Infrastructure Development: The Department of Biomedical Engineering was established with the launch of the B.E. Biomedical Engineering programme, along with the initiation of core laboratories such as Medical Instrumentation, Biosciences, and Biomedical Signal Processing to strengthen hands-on and experiential learning." },
            { year: "2025", desc: "Curriculum Enrichment & Industry Engagement: An Outcome-Based Education (OBE) curriculum integrating interdisciplinary learning, ethics, and real-world healthcare problem-solving was implemented, along with collaborations with hospitals, healthcare industries, and research institutions to enhance clinical exposure, internships, and community-oriented healthcare innovations." }
        ],
        hod: {
            name: "Dr. M. Vishnu Priya",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/bme-+hod.jpeg",
            designation: "Associate Professor & Head",
            message: "Innovate for better healthcare! Learn medical devices, healthcare systems, and biomedical technology. Combine engineering skills with real-world medical applications. Build careers in hospitals, the medical industries, and research fields."
        },
        studentCount: "70+",
        facultyCount: "4+",
        labCount: "2+",
        labs: [
            {
                name: "Biomedical Instrumentation & Biosensors Lab",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
                description: "State-of-the-art facility for capturing physiological bio-potentials, calibrating patient monitors, and biosensor transducer experimentation.",
                equipment: "12-Lead Diagnostic ECG Machines, Multi-Channel EMG & EEG Simulators, Pulse Oximeter Calibration Units, Biosensor Transducer Kits"
            },
            {
                name: "Medical Imaging & Diagnostic Signal Processing Lab",
                image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
                description: "Advanced computational lab for DICOM medical image enhancement, MRI/CT 3D volume reconstruction, and AI-assisted disease classification.",
                equipment: "DICOM Image Workstations, MATLAB Medical Imaging Toolbox, 3D Slicer, Ultrasound Pulse-Echo Phantoms, Biopac Signal Data Acquisition Systems"
            }
        ],
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //MECH
    {
        id: "mechanical-engineering",
        name: "Mechanical Engineering",
        slug: "mechanical-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://anandice.ac.in/wp-content/uploads/2025/07/human-hand-passing-gear-robotic-hand-scaled.jpg",
        overview: "The Department of Mechanical Engineering was established in the year of 2009 with an intake of 60 UG students. The Department has grown significantly and offers B.E. Mechanical Engineering with sanctioned intake increased to 180 during the year 2012-13. Post graduate M.E. Computer Aided Design in the year 2013-14 and Manufacturing Engineering in the year 2014-15 courses are introduced with an intake of 18 students. Department of Mechanical Engineering is recognized as approved Research Centre of Anna University, Chennai. The department has state of art equipment's in the laboratories to provide deep experimental knowledge to the students. The department has well-qualified, industry oriented and experienced team of faculty members with specialized in different fields of Mechanical Engineering committed to provide quality education. The department is also committed to provide industry oriented research/consultancy work by the experienced faculty members. The department is also having tie-up with Maxbite Technologies Pvt. Ltd, Rabwin industry, CADD centre, Thirumaarul machinist and Prakash Gears Coimbatore etc., for training and placements.",
        vision: "To be a centre of excellence in education, research, and innovation, fostering technically competent, ethically responsible, and industry-ready professionals who contribute to sustainable development and societal advancement.",
        mission: [
            "M1: Mastering strong foundational knowledge in Mechanical and Manufacturing Engineering through effective teaching, practical training, and continuous learning, ensuring technical competence.",
            "M2: Encouraging innovation, research, and development in emerging areas of mechanical engineering, fostering innovation and problem-solving skills.",
            "M3: Collaborating with industry to bridge the gap between academia and practice through internships, industry projects, consultancy, and skill-based training, creating industry-ready professionals.",
            "M4: Harnessing ethical values, leadership qualities, social responsibility, and lifelong learning among students, promoting ethical responsibility, sustainable development, and societal advancement."
        ],
        peo: [
            "PEO1: Apply their knowledge of design, digital and computational analysis, experimentation and testing, smart manufacturing, technical services, and research to solve real-world engineering problems.",
            "PEO2: Collaborate with stakeholders, continuously enhance their competencies, and demonstrate ethical practices, teamwork, and leadership qualities to thrive in a multicultural global environment.",
            "PEO3: Engage in multidisciplinary research, innovation, and entrepreneurial activities, and apply their technical knowledge to create sustainable solutions addressing engineering, environmental, and societal challenges."
        ],
        pso: [
            "PSO1: Apply the knowledge gained in Mechanical Engineering for design and development and manufacture of engineering systems.",
            "PSO2: Apply the knowledge acquired to investigate research-oriented problems in mechanical engineering with due consideration for environmental and social impacts.",
            "PSO3: Use the engineering analysis and data management tools for effective management of multidisciplinary projects."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" },
            { year: "2016", desc: "Research Center Status" }
        ],
        hod: {
            name: "Dr. S. Rajesh Ruban M.E., Ph.D.",
            image: "/images/mech-hod.png",
            designation: "Head of the Department",
            message: "A hearty welcome to the Department of Mechanical Engineering at EASA College of Engineering and Technology. The department runs undergraduate program in Mechanical Engineering and PG program Manufacturing Engineering. Department also run research Centre leading to Ph.D. Program. The department vision is to be excellence in value based on Mechanical Engineering Education. The department has well qualified and dedicated faculty. The department strives to Impart knowledge and training of the highest standard. The objective of the department is to prepare students for a successful career in Industry, Research and Academics to meet the needs of growing technology. Our efforts are to develop the ability among students to synthesize data and technical concepts for application to product design. We provide an opportunity for students to work as members of a team on multidisciplinary projects. Mechanical engineering department provides students with a sound foundation in the mathematical, scientific and engineering fundamentals necessary to formulate, solve and analyze engineering problems and to prepare them for higher studies as well as research. We promote student awareness for life-long learning and to introduce them to professional ethics and codes."
        },
        studentCount: "125++",
        facultyCount: "12+",
        labCount: "6+",
        labs: [
            {
                name: "CNC, Robotics & Advanced Manufacturing Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Precision CNC production and industrial robotics cell designed for automated G-code part programming, milling, and automated pick-and-place cycles.",
                equipment: "Production CNC Lathe, 3-Axis CNC Vertical Machining Center, 6-Axis Industrial Robotic Arm, Mastercam 2024, EdgeCAM"
            },
            {
                name: "CAD / CAM & Rapid Prototyping Lab",
                image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
                description: "Next-generation engineering design and finite element simulation workspace equipped for parametric solid modeling, CFD, and 3D additive printing.",
                equipment: "SolidWorks Professional, Autodesk Fusion 360, ANSYS Workbench FEA/CFD, Industrial Dual-Extruder 3D Printers, 3D Laser Scanner"
            },
            {
                name: "Thermal Engineering & IC Engines Research Lab",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
                description: "Equipped with computerized dynamometer test benches for evaluating brake power, specific fuel consumption, heat balance, and emission standards.",
                equipment: "Computerized Multi-Cylinder 4-Stroke Petrol/Diesel Engines, Eddy Current Dynamometers, Gas Analyzer, Bomb Calorimeter, Heat Exchanger Test Sets"
            }
        ],
        faculty: [
            {
                name: "Dr. S. Rajesh Ruban",
                designation: "Associate Professor and Head",
                qualification: "M.E., Ph.D.",
                subject: "Mechanical Engineering",
                order: 1
            },
            {
                name: "Dr. Robert Kennedy Z",
                designation: "Principal & Professor",
                qualification: "Ph.D.",
                subject: "Mechanical Engineering",
                order: 2
            },
            {
                name: "Dr. Natarajan N",
                designation: "Professor & Dean-Academics",
                qualification: "Ph.D.",
                subject: "Mechanical Engineering",
                order: 3
            },
            {
                name: "Dr. Santhosh S",
                designation: "Professor & Dean-Mechanical Sciences",
                qualification: "Ph.D.",
                subject: "Mechanical Engineering",
                order: 4
            },
            {
                name: "Dr. Subhash S",
                designation: "Assistant Professor & UG Coordinator",
                qualification: "Ph.D.",
                subject: "Mechanical Engineering",
                order: 5
            },
            {
                name: "Mr. Gunasekaran T",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 6
            },
            {
                name: "Mr. Santhosh Kumar V",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 7
            },
            {
                name: "Mr. Muthupandiaraja M",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 8
            },
            {
                name: "Mr. Nithyananth R",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 9
            },
            {
                name: "Mr. Jeevanantham R",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 10
            },
            {
                name: "Mr. Hari Baalaaji R A",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Mechanical Engineering",
                order: 11
            },
        ],
        mou: [
            { partner: "Maxbite Technologies Pvt. Ltd", purpose: "Advanced Industrial Training & Research Collaboration", year: "2023", benefits: "IoT & Smart Manufacturing" },
            { partner: "Rabwin Industries", purpose: "Skill Development & Placement Support", year: "2022", benefits: "Precision Engineering" },
            { partner: "CADD Centre", purpose: "Design Software Certification Programs", year: "2023", benefits: "AutoCAD & SolidWorks" },
            { partner: "Prakash Gears Coimbatore", purpose: "Industry Internships & Consultancy Services", year: "2024", benefits: "Machine Design" }
        ]
    },

    //AGRI
    {
        id: "agriculture-engineering",
        name: "Agriculture Engineering",
        slug: "agriculture-engineering",
        type: "UG",
        po: COMMON_UG_PO,
        wk: COMMON_UG_WK,
        heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Agriculture Engineering applies engineering principles to agricultural production and processing.",
        vision: "To be a global leader in the research, education, and application of innovative engineering solutions for sustainable agriculture, with a focus on creating a more food-secure and resilient world.",
        mission: [
            "M1: To advance the frontier of knowledge and practice in agricultural engineering.",
            "M2: To equip students with the skills and knowledge to design and implement sustainable engineering solutions for the agriculture sector.",
            "M3: To foster a culture of innovation, collaboration, and excellence in research that addresses real-world problems and creates new opportunities at the intersection of engineering, agriculture, and the environment.",
            "M4: To empower individuals, communities, and nations to achieve food security and environmental sustainability through our education, research, and outreach programs.",
            "M5: To value diversity, inclusion, and ethics, creating a safe and supportive environment that produces socially responsible leaders in agricultural engineering and entrepreneurship."
        ],
        peo: [
            "PEO1: To train and educate students with general knowledge and skills in agricultural water management, agricultural production process, farm machinery and farm management.",
            "PEO2: To provide a sound theoretical knowledge in engineering principles applied to agriculture.",
            "PEO3: To prepare students for a successful agricultural engineering career integrating all aspects of engineering in agriculture.",
            "PEO4: To develop innovative capacity of students for increasing agricultural production with scarce water resources available.",
            "PEO5: To impart positive and responsive outreach attitudes, initiative and creative thinking in their mission as engineers.",
            "PEO6: To understand ethical issues and responsibility of serving the society and the environment at large."
        ],
        pso: [
            "PSO1: To make expertise in design and engineering problem solving approach in agriculture with proper knowledge and skill.",
            "PSO2: To enhance the ability of the students to formulate solutions to real-world problems pertaining to sustained agricultural productivity using modern technologies.",
            "PSO3: To inculcate entrepreneurial skills through strong Industry-Institution linkage."
        ],
        milestones: [
            { year: "2020", desc: "Establishment of the Department The Department of Agricultural Engineering was established to address the growing technological needs of sustainable agriculture and to develop skilled agricultural engineers." }
        ],
        hod: {
            name: "GOKULDEEPAN P",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/agri-hod.jpeg",
            designation: "Associate Professor & Head",
            message: "Grow with technology and sustainability! Learn smart farming, irrigation systems, and agricultural machinery. Explore modern agricultural practices and sustainable solutions. Build careers in the agriculture, technology, and rural development sectors."
        },
        studentCount: "110+",
        facultyCount: "9+",
        labCount: "4+",
        labs: [
            {
                name: "Farm Machinery & Power Engineering Lab",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
                description: "Heavy agricultural machinery evaluation lab for tractor dynamometer load testing, tillage implement calibration, and harvester mechanism studies.",
                equipment: "45 HP Agricultural Tractors, Power Tillers, Multi-Crop Seed Drills, Rotary Tillers, Mechanical Harvester Simulators, Tractive Dynamometer Test Units"
            },
            {
                name: "Irrigation & Soil-Water Conservation Engineering Lab",
                image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80",
                description: "Equipped for automated micro-irrigation system design, evaluating soil hydraulic permeability, runoff flumes, and watershed conservation modeling.",
                equipment: "Automated Drip & Micro-Sprinkler Test Setup, Soil Moisture TDR Sensors, Hydraulic Flume, Pressure Plate Apparatus, Sieve Shakers"
            },
            {
                name: "Post-Harvest & Food Processing Engineering Lab",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on processing of agricultural commodities, dehydration kinetics, oil extraction, and quality control grading systems.",
                equipment: "Digital Grain Moisture Analyzers, Hot Air Industrial Tray Dryer, Cold-Press Oil Expeller, Grain Cleaner-Cum-Grader, Continuous Nitrogen Packaging Unit"
            }
        ]
    },

    //pg courses

    //PG ME -COMPUTER SCIENCE AND ENGINEERING
    {
        id: "me-computer-science-and-engineering",
        name: "Computer Science and Engineering",
        slug: "me-computer-science-and-engineering",
        type: "PG",
        degree: "M.E.",
        heroImage: "https://i.pinimg.com/736x/58/34/1b/58341b7bd2f64e45cb6726f4a3ad1991.jpg",
        overview: "The M.E. in Computer Science and Engineering at EASA College is a premier postgraduate program engineered to develop master-level expertise in generative AI, cloud-native computing, intelligent distributed systems, and cutting-edge software research.",
        vision: "To be a nationally recognized center of excellence in advanced computing, generative artificial intelligence, and innovative software research, nurturing high-caliber postgraduate technologists, researchers, and ethical leaders capable of steering global digital transformation.",
        mission: [
            "M1: To deliver cutting-edge postgraduate education in emerging domains such as Generative AI, Cloud-Native Systems, High-Performance Computing, and Resilient Cybersecurity.",
            "M2: To foster a vibrant research culture producing high-impact scholarly publications in Scopus/SCI-indexed journals, patents, and innovative technology transfers.",
            "M3: To collaborate with leading global IT enterprises and research labs for translational live projects, specialized consultancy, and technology immersion.",
            "M4: To cultivate professional integrity, entrepreneurial aptitude, and societal responsibility for sustainable technological advancement."
        ],
        peo: [
            "PEO1: Graduates will achieve mastery as advanced computing specialists, system architects, and researchers addressing multifaceted enterprise and societal challenges.",
            "PEO2: Graduates will spearhead cutting-edge innovations through patents, Scopus-indexed research, and high-performance intelligent software systems.",
            "PEO3: Graduates will demonstrate exemplary professional ethics, technical leadership, and continuous lifelong learning in modern computing disciplines."
        ],
        pso: [
            "PSO1: Ability to conceptualize, design, and architect resilient, high-performance distributed systems utilizing modern AI, Cloud, and Data Engineering frameworks.",
            "PSO2: Ability to execute independent, high-impact scientific research and develop scalable solutions addressing complex real-world computing paradigms."
        ],
        milestones: [
            { year: "2014", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Computer Science and Engineering | Best PG College in Coimbatore | EASA College",
        seoDescription: "Pursue M.E. in Computer Science & Engineering at EASA College, Coimbatore. Specialized in Generative AI, Cloud Computing & Advanced Systems with 100% research & placement guidance.",
        seoKeywords: "M.E Computer Science Coimbatore, ME CSE College, Best PG Engineering Colleges Tamil Nadu, Anna University ME Computer Science, Advanced AI PG Course, EASA College of Engineering and Technology, ME CSE syllabus, PG Placements Coimbatore",
        hod: {
            name: "Dr. M.G Dinesh",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/IMG-20251204-WA0010.jpg",
            designation: "Head of PG Studies",
            message: "Our PG program is tailored to meet the research and development needs of the IT industry. We encourage innovation, high-impact research, and critical thinking."
        },
        faculty: [
            {
                name: "Mr. Abhijit V",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Computer Science and Engineering",
                order: 1
            },
            {
                name: "Mr. Karthikeyan",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Computer Science and Engineering",
                order: 2
            },
            {
                name: "Ms. Sangeetha Poorani",
                designation: "Assistant Professor",
                qualification: "M.E.",
                subject: "Computer Science and Engineering",
                order: 3
            }
        ],
        studentCount: "50+",
        facultyCount: "10+",
        labCount: "5+",
        labs: [
            {
                name: "High-Performance AI & Cloud Systems Research Lab",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
                description: "Post-graduate research computing facility dedicated to large language model fine-tuning, zero-trust cloud microservices, and high-performance distributed computing.",
                equipment: "NVIDIA Multi-GPU Compute Server Node, OpenStack Private Cloud, PyTorch/TensorFlow Enterprise, Apache Kafka Streaming Cluster"
            },
            {
                name: "Advanced Data Intelligence & Cryptographic Security Lab",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
                description: "Master-level research center for privacy-preserving federated machine learning, blockchain smart contracts, and malware decompilation analysis.",
                equipment: "Cloudera Enterprise Big Data Sandbox, Ethereum/Hyperledger Testnet, Ghidra Reverse Engineering Suite, Deep Learning Defense Toolkits"
            }
        ]
    },

    //construction engineering and management
    {
        id: "construction-engineering-and-management",
        name: "Construction Engineering and Management",
        slug: "construction-engineering-and-management",
        type: "PG",
        degree: "M.E.",
        heroImage: "https://i.pinimg.com/736x/b6/c7/42/b6c742669563327b00c4c7ba42278d09.jpg",
        overview: "The M.E. in Construction Engineering and Management at EASA College is a cutting-edge postgraduate program delivering advanced competencies in smart infrastructure planning, BIM (Building Information Modeling), AI in construction automation, and sustainable green building technologies.",
        vision: "To be a center of excellence in modern construction engineering, smart project analytics, and sustainable infrastructure management, developing visionary construction leaders and techno-managers for global infrastructure development.",
        mission: [
            "M1: To deliver advanced education in digital project scheduling, BIM methodologies, construction economics, and smart contract management.",
            "M2: To promote high-impact research in sustainable building materials, green construction practices, and AI-driven site safety automation.",
            "M3: To cultivate strategic corporate partnerships with leading infrastructure developers, EPC enterprises, and project management consultancies.",
            "M4: To instill managerial agility, ethical professional leadership, and life-cycle sustainability standards in complex construction ecosystems."
        ],
        peo: [
            "PEO1: Graduates will lead and manage complex mega-infrastructure projects utilizing modern digital construction tools, BIM, and automated workflow techniques.",
            "PEO2: Graduates will implement innovative, sustainable, and cost-effective construction technologies adhering to global green standards and safety protocols.",
            "PEO3: Graduates will demonstrate entrepreneurial competence, ethical leadership, and continuous professional mastery in multinational construction enterprises."
        ],
        pso: [
            "PSO1: Ability to formulate comprehensive project plans, risk models, BIM 4D/5D simulations, and financial structures for high-value infrastructure projects.",
            "PSO2: Ability to deploy smart construction methodologies, lean techniques, and eco-friendly structural materials for sustainable urban development."
        ],
        milestones: [
            { year: "2015", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Construction Engineering & Management | Best PG College in Coimbatore | EASA College",
        seoDescription: "Join M.E. Construction Engineering & Management at EASA College Coimbatore. Master BIM, Smart Infrastructure, Lean Construction & Project Management with 100% placement support.",
        seoKeywords: "M.E Construction Engineering Coimbatore, ME Construction Management College, Anna University ME CEM, BIM Certification PG, Smart Construction Courses Tamil Nadu, EASA College Construction PG",
        hod: {
            name: "Dr. SUNILAA GEORGE",
            image: "",
            designation: "Head of PG Studies",
            message: "Building resilient and sustainable infrastructure through innovative engineering and strategic project management."
        },
        studentCount: "30+",
        facultyCount: "5+",
        labCount: "2+",
        labs: [
            {
                name: "BIM & Smart Infrastructure Simulation Lab",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
                description: "State-of-the-art facility for 4D/5D Building Information Modeling (BIM), clash detection, project schedule forecasting, and virtual construction site walkthroughs.",
                equipment: "Autodesk Revit 2025 Enterprise, Primavera P6 Professional, Navisworks Manage, MS Project, VR Immersion Headsets, High-Performance BIM Modeling Workstations"
            },
            {
                name: "Advanced Concrete Testing & NDT Materials Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Postgraduate testing center for high-performance concrete mix design, non-destructive ultrasonic evaluation, self-healing bio-concrete, and durability index profiling.",
                equipment: "Digital Compression Testing Machine (2000 kN), Ultrasonic Pulse Velocity (UPV) Meter, Concrete Rebound Hammer, Diamond Core Drilling Machine, Permeability Cell"
            }
        ]
    },

    //PG COMMUNICATION -SYSTEMS
    {
        id: "communication-systems",
        name: "Communication Systems",
        slug: "communication-systems",
        type: "PG",
        degree: "M.E.",
        heroImage: "https://i.pinimg.com/736x/79/bd/d7/79bdd7afb48cd18004d3cda295e9670a.jpg",
        overview: "The M.E. in Communication Systems at EASA College is an advanced postgraduate program designed to develop cutting-edge expertise in 5G/6G wireless networks, optical communication, IoT architectures, RF/Microwave engineering, and AI-driven signal processing.",
        vision: "To emerge as a premier hub for research and advanced education in next-generation telecommunications, 5G/6G wireless ecosystems, and intelligent signal processing, empowering postgraduates to lead breakthroughs in global digital connectivity.",
        mission: [
            "M1: To impart advanced theoretical and practical knowledge in 5G/6G architectures, cognitive radio, smart antenna arrays, and high-speed photonics.",
            "M2: To foster state-of-the-art research in wireless networks, satellite communications, and edge-AI telecommunication protocols resulting in patents and Scopus publications.",
            "M3: To establish robust linkages with leading telecom conglomerates, semiconductor giants, and R&D institutions for applied industry projects.",
            "M4: To nurture ethical, innovative, and socially conscious communication engineers capable of solving modern connectivity challenges."
        ],
        peo: [
            "PEO1: Graduates will excel as telecommunication system architects, RF specialists, and researchers designing next-generation wireless and optical networks.",
            "PEO2: Graduates will pioneer innovations in communication signal processing, cognitive networks, and IoT telematics through patenting and research.",
            "PEO3: Graduates will exhibit professional leadership, global engineering ethics, and lifelong technical adaptability in multinational telecom enterprises."
        ],
        pso: [
            "PSO1: Ability to design, simulate, and optimize complex 5G/6G wireless transceivers, MIMO arrays, and high-frequency RF systems using industry-standard tools.",
            "PSO2: Ability to conduct cutting-edge research in optical, satellite, and cyber-secure communication networks for industrial and defense applications."
        ],
        milestones: [
            { year: "2014", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Communication Systems | Top 5G & Wireless PG College in Coimbatore | EASA College",
        seoDescription: "Pursue M.E. in Communication Systems at EASA College Coimbatore. Advanced specialization in 5G/6G Networks, RF Design, Optical Systems & IoT with 100% placement assistance.",
        seoKeywords: "M.E Communication Systems Coimbatore, ME Wireless Communication College Tamil Nadu, 5G Telecommunications PG Anna University, RF Engineering Masters, EASA College ECE PG",
        hod: {
            name: "Dr. CS Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Empowering seamless next-generation connectivity through cutting-edge telecommunications and intelligent signal networks."
        },
        studentCount: "25+",
        facultyCount: "4+",
        labCount: "3+",
        labs: [
            {
                name: "5G Wireless & Software Defined Radio (SDR) Lab",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
                description: "Research facility for prototyping 5G NR physical layer protocols, massive MIMO beamforming arrays, cognitive radio sensing, and wireless channel modeling.",
                equipment: "National Instruments USRP-2901 SDR Transceivers, MATLAB 5G Toolbox, GNU Radio Workstations, Keysight RF Spectrum Analyzers (6 GHz), Planar Antenna Arrays"
            },
            {
                name: "Advanced Photonics & Optical Networks Lab",
                image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
                description: "Equipped for dense wavelength division multiplexing (DWDM) simulation, optical fiber dispersion compensation, and high-speed optical transceivers.",
                equipment: "OptiSystem Optical Communication Simulator, Multi-Wavelength Laser Diode Modules, Optical Spectrum Analyzers, Precision Fiber Fusion Splicing Stations"
            }
        ]
    },

    //PG MANUFACTURING ENGINEERING
    {
        id: "manufacturing-engineering",
        name: "Manufacturing Engineering",
        slug: "manufacturing-engineering",
        type: "PG",
        degree: "M.E.",
        heroImage: "https://i.pinimg.com/1200x/cf/1d/1a/cf1d1a92f456ed718d362b6a5b84e03d.jpg",
        overview: "The M.E. in Manufacturing Engineering program at EASA College equips postgraduates with advanced competencies in Industry 4.0, additive manufacturing (3D printing), robotics, digital twins, and smart sustainable production systems.",
        vision: "To be a globally recognized center of excellence in advanced manufacturing, Industry 4.0 automation, and smart factory technologies, producing innovative manufacturing technocrats and industrial researchers.",
        mission: [
            "M1: To impart high-level education in additive manufacturing, digital twin modeling, automated robotics, and precision machining.",
            "M2: To foster impactful research in sustainable materials, micro-manufacturing, and AI-enabled quality control yielding patents and Scopus publications.",
            "M3: To cultivate dynamic industrial partnerships with aerospace, automotive, and smart-manufacturing conglomerates for collaborative R&D.",
            "M4: To instil entrepreneurial acumen, ethical management principles, and circular economy practices in industrial manufacturing."
        ],
        peo: [
            "PEO1: To prepare students to know and utilize modern smart manufacturing facilities in order to enhance productivity and digital agility.",
            "PEO2: To impart skills in smart machines, robotics, and cyber-physical production systems for societal and industrial progress.",
            "PEO3: To develop integrated problem-solving techniques for optimizing manufacturing resources toward sustainable, zero-defect production.",
            "PEO4: To cultivate research aptitude, new product development, and innovation to solve complex industrial manufacturing challenges."
        ],
        po: [
            "PO1: An ability to independently carry out research/investigation and development work to solve practical problems",
            "PO2: An ability to write and present a substantial technical report/document",
            "PO3: Students should be able to demonstrate a degree of mastery over the area as per the specialization of the program. The mastery should be at a level higher than the requirements in the appropriate bachelor program",
            "PO4: An ability to design systems, components, or processes meeting specified needs for the manufacturing industry and to improve its efficiency.",
            "PO5: To use modern equipment and problem-solving tools for improving the manufacturing systems and processes in all aspects including technical, financial and management",
            "PO6: To pursue higher studies / pursue their career or entrepreneur in manufacturing and allied industries"
        ],
        pso: [
            "PSO1: Apply the knowledge gained in Manufacturing Engineering for manufacture of smart engineering systems.",
            "PSO2: Apply the knowledge acquired to investigate research-oriented problems in Manufacturing engineering with due consideration for environmental and social impacts.",
            "PSO3: Use engineering analysis, additive manufacturing, and digital management tools for effective execution of multidisciplinary projects."
        ],
        milestones: [
            { year: "2016", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Manufacturing Engineering | Industry 4.0 & Robotics PG in Coimbatore | EASA College",
        seoDescription: "Enroll in M.E. Manufacturing Engineering at EASA College Coimbatore. Master Additive Manufacturing, Smart Automation & Digital Twins with top placements and live industry labs.",
        seoKeywords: "M.E Manufacturing Engineering Coimbatore, Industry 4.0 PG Course Tamil Nadu, Additive Manufacturing Masters, Robotics and Automation College, Anna University ME Manufacturing, EASA College",
        hod: {
            name: "Dr. Mfg Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Innovating modern manufacturing through automation, additive technology, and smart factory engineering."
        },
        studentCount: "20+",
        facultyCount: "4+",
        labCount: "3+",
        labs: [
            {
                name: "Industry 4.0 & Smart Robotics Lab",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
                description: "Postgraduate testbed for simulating cyber-physical production lines, digital twin development, industrial IoT sensorization, and cobot automation.",
                equipment: "Industrial Collaborative Robot (Cobot), Siemens MindSphere IoT Gateway, Siemens Process Simulate, OPC-UA Telemetry Modules"
            },
            {
                name: "Additive Manufacturing & Rapid Prototyping Research Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Advanced research in functional 3D printed polymer/composite components, topology optimization, metamaterials, and precision surface metrology.",
                equipment: "Industrial Stereolithography (SLA) 3D Printer, High-Temperature FDM 3D Printer, Materialise Magics Software, Non-Contact Optical 3D Scanner"
            }
        ]
    },

    //PG POWER ELECTRONICS AND DRIVES
    {
        id: "power-electronics-and-drives",
        name: "Power Electronics and Drives",
        slug: "power-electronics-and-drives",
        type: "PG",
        degree: "M.E.",
        po: [
            "PO1: An ability to independently carry out research/investigation and development work to solve practical problems",
            "PO2: An ability to write and present a substantial technical report/document.",
            "PO3: Students should be able to demonstrate a degree of mastery over the area as per the specialization of the program. The mastery should be at a level higher than the requirements in the appropriate bachelor program.",
            "PO4: Apply knowledge of basic science and engineering in design and testing of power electronic systems and drives.",
            "PO5: Interact with Industry in a professional and ethical manner to meet the requirements of societal needs and to contribute sustainable development of the society.",
            "PO6: Implement cost effective and cutting edge technologies in power electronics and drives system."
        ],
        heroImage: "https://i.pinimg.com/736x/d1/71/92/d17192262b72c69cddb76efdc68bba6d.jpg",
        overview: "The M.E. in Power Electronics and Drives at EASA College provides specialized master-level expertise in Electric Vehicle (EV) powertrains, smart grid integration, wide-bandgap semiconductors, and renewable energy conversion systems.",
        vision: "To be a leader in power electronics education and clean-energy research, producing world-class power engineers and innovators committed to global decarbonization and smart energy revolutions.",
        mission: [
            "M1: To provide advanced education in modern power converters, EV motor drives, battery management systems, and smart grid automation.",
            "M2: To drive high-impact research in renewable energy integration, high-efficiency power topologies, and wide-bandgap semiconductor applications.",
            "M3: To establish active research collaborations with EV manufacturers, clean-tech industries, and power utilities for cutting-edge consultancy.",
            "M4: To foster ethical engineering leadership, sustainable energy stewardship, and lifelong technical mastery."
        ],
        peo: [
            "PEO1: Graduates will design advanced, high-efficiency power electronic converter systems and EV powertrains for clean-tech industries.",
            "PEO2: Graduates will spearhead breakthroughs in renewable energy integration, battery management, and smart microgrids.",
            "PEO3: Graduates will serve in executive technical roles in electric mobility, power management, and industrial automation sectors."
        ],
        pso: [
            "PSO1: Ability to model, simulate, and hardware-prototype advanced power electronic circuits, inverters, and digital drive control algorithms.",
            "PSO2: Ability to engineer intelligent energy conversion and power conditioning solutions for electric vehicles and renewable microgrids."
        ],
        milestones: [
            { year: "2015", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Power Electronics and Drives | EV & Smart Grid PG in Coimbatore | EASA College",
        seoDescription: "Pursue M.E. Power Electronics & Drives at EASA College Coimbatore. Specialized in Electric Vehicles (EV), Smart Power Grids & Renewable Energy with 100% placement support.",
        seoKeywords: "M.E Power Electronics Coimbatore, EV Powertrain PG Course, Smart Grid Masters Tamil Nadu, Anna University ME PED, Clean Energy Engineering PG, EASA College EEE PG",
        hod: {
            name: "Dr. PED Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Driving the global clean-energy and electric mobility revolution through high-efficiency power electronic innovations."
        },
        studentCount: "25+",
        facultyCount: "4+",
        labCount: "3+",
        labs: [
            {
                name: "Electric Vehicle & Smart Powertrain Lab",
                image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
                description: "Postgraduate electric mobility research center for testing permanent magnet synchronous motor (PMSM) drives, bidirectional DC-DC converters, and BMS state-of-charge algorithms.",
                equipment: "EV Powertrain Dynamometer Testbed, PMSM & BLDC High-Torque Drives, Battery Management System (BMS) Hardware Simulator, dSPACE MicroLabBox Controller"
            },
            {
                name: "Smart Microgrid & Digital Control Lab",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
                description: "Real-time digital simulation of grid-tied multi-level inverters, active power filters, GaN/SiC wide-bandgap converter topologies, and harmonic compensation.",
                equipment: "OPAL-RT Real-Time Grid Simulator, Multi-Level Grid-Tied Inverter, Hardware-in-the-Loop (HIL) Platform, Fluke 435 Series II Power Quality Analyzer"
            }
        ]
    },

    //PG STRUCTURAL ENGINEERING
    {
        id: "structural-engineering",
        name: "Structural Engineering",
        slug: "structural-engineering",
        type: "PG",
        degree: "M.E.",
        heroImage: "https://i.pinimg.com/736x/ca/6d/d6/ca6dd63f1ea5fc871ec8e36d510516d6.jpg",
        overview: "The M.E. in Structural Engineering program at EASA College delivers advanced master-level training in seismic-resilient design, tall building aerodynamics, advanced composite materials, finite element modeling, and structural health monitoring.",
        vision: "To achieve national distinction in advanced structural engineering, disaster-resilient infrastructure design, and sustainable materials research, producing globally competitive structural designers and researchers.",
        mission: [
            "M1: To deliver high-level pedagogical rigor in computational structural mechanics, earthquake engineering, dynamic blast analysis, and forensic engineering.",
            "M2: To foster cutting-edge research in smart sensor-based structural health monitoring, high-performance concrete, and sustainable composite matrices.",
            "M3: To establish active corporate synergy with premier structural design firms, infrastructure consultants, and research laboratories.",
            "M4: To instill unwavering ethical responsibility, safety-first professional leadership, and resilient engineering principles."
        ],
        peo: [
            "PEO1: Graduates will engineer safe, resilient, and aesthetically distinguished structures withstanding extreme seismic and dynamic environmental loads.",
            "PEO2: Graduates will solve complex structural challenges utilizing advanced computational finite element tools and modern composite materials.",
            "PEO3: Graduates will lead premier structural design consultancies and research bodies with exemplary professional ethics."
        ],
        pso: [
            "PSO1: Ability to analyze and design complex high-rise, long-span, and specialized structures under seismic, wind, and dynamic loading conditions.",
            "PSO2: Ability to deploy non-destructive testing, structural health monitoring, and retrofit methodologies for heritage and modern infrastructure."
        ],
        milestones: [
            { year: "2013", desc: "PG Program Started" }
        ],
        seoTitle: "M.E. Structural Engineering | Best PG Civil College in Coimbatore | EASA College",
        seoDescription: "Enroll in M.E. Structural Engineering at EASA College Coimbatore. Master Earthquake Engineering, Tall Structures, FEA & Smart Materials with 100% placement assistance.",
        seoKeywords: "M.E Structural Engineering Coimbatore, Earthquake Engineering Masters Tamil Nadu, Anna University ME Structural, Tall Buildings Design PG, EASA College Civil PG",
        hod: {
            name: "Dr. Structural Head",
            image: "",
            designation: "Head of PG Studies",
            message: "Building safe, disaster-resilient, and future-ready structures that stand the test of time and nature."
        },
        studentCount: "40+",
        facultyCount: "6+",
        labCount: "3+",
        labs: [
            {
                name: "Computational Structural Mechanics & FEA Lab",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
                description: "Advanced simulation environment for non-linear push-over analysis, wind dynamic response of high-rise skyscrapers, and spatial bridge modeling.",
                equipment: "ETABS Ultimate 2024, SAP2000 Advanced, ANSYS Structural Mechanics, STAAD.Pro Advanced, High-Performance Multi-Core FEA Workstations"
            },
            {
                name: "Structural Dynamics & Experimental Mechanics Lab",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
                description: "Equipped for real-time seismic vibration testing of scaled model frames, base isolation damper efficiency, and strain gauge telemetry.",
                equipment: "Single-Axis Electro-Dynamic Shake Table, Multi-Channel Dynamic Strain Amplifiers, Piezoelectric Accelerometers, 1000 kN Universal Testing Machine"
            }
        ]
    },


    //UG SCIENCE AND HUMANITIES
    {
        id: "science-and-humanities",
        name: "Science and Humanities",
        slug: "science-and-humanities",
        type: "UG",
        heroImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Science and Humanities plays a vital role in laying the strongest foundation for engineering students. It comprises of Mathematics, Physics, Chemistry and English. The department provides a comprehensive education in basic sciences and humanities to engineering students.",
        milestones: [
            { year: "2008", desc: "Department Established" }
        ],
        hod: {
            title: "Dean",
            name: "Dr. RATHINAM S",
            image: "/images/dean-sh.jpg",
            designation: "Professor & Dean, School of Science & Humanities",
            message: "Welcome to the School of Sciences and Humanities at EASA College of Engineering and Technology. As the intellectual heart of our institution, our school brings together the analytical rigor of the sciences and the deep reflection of the humanities to foster both technical discovery and human understanding. Whether you are uncovering the fundamental laws of nature or exploring complex cultural and ethical questions, you will find here a collaborative community, dedicated faculty, and endless opportunities to think critically and innovate. Be curious, embrace new challenges, and make the most of your journey with us."
        },
        studentCount: "300+",
        facultyCount: "17+",
        labCount: "4+",
        labs: [
            {
                name: "Engineering Physics & Optics Lab",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
                description: "Hands-on verification of wave optics, laser diffraction phenomena, ultrasonic velocity propagation in liquids, and Hall effect semiconductor physics.",
                equipment: "He-Ne Gas Lasers, Digital Ultrasonic Interferometers, Optical Spectrometers with Gratings, Hall Effect Probes, Traveling Microscopes"
            },
            {
                name: "Engineering Chemistry & Materials Lab",
                image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
                description: "Analytical water quality determination, alloy electro-chemistry, polymer viscosity profiling, and spectrophotometric colorimetric analysis.",
                equipment: "Digital Flame Photometers, UV-Visible Spectrophotometers, Digital pH Meters, Conductivity Meters, Redwood Viscometers, COD/BOD Incubators"
            },
            {
                name: "Digital Language & Professional Communication Lab",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                description: "Multimedia interactive lab dedicated to phonetics training, vocabulary enhancement, group discussion practice, and presentation confidence.",
                equipment: "Interactive Hi-Class Language Software, HD Audio Headsets with Noise Cancellation, Multi-Client Audio Console, Video Recording Booths"
            }
        ],
        faculty: [
            {
                name: "Dr. SIVAKUMAR M",
                designation: "Professor & Dean R & D",
                qualification: "",
                subject: "Physics",
                order: 1
            },
            {
                name: "Dr. SHIAMA J",
                designation: "Professor",
                qualification: "M.Sc., PGDCA., M.Phil., Ph.D",
                subject: "Mathematics",
                order: 2
            },
            {
                name: "Dr. MANICKASUNDARAM S",
                designation: "Associate Professor",
                qualification: "M.Sc., Ph.D",
                subject: "Chemistry",
                order: 3
            },
            {
                name: "Dr. Ethina V",
                designation: "Associate Professor",
                qualification: "M.Sc., Ph.D",
                subject: "English",
                order: 4
            },
            {
                name: "Ms. BHAGYA SHREE R",
                designation: "Assistant Professor",
                qualification: "M.Sc., M.Phil",
                subject: "Physics",
                order: 5
            },
            {
                name: "Dr. DHIVYA P",
                designation: "Assistant Professor",
                qualification: "M.Sc., M.Phil., Ph.D",
                subject: "Physics",
                order: 6
            },
            {
                name: "Dr. HARSHINI M",
                designation: "Assistant Professor",
                qualification: "M.Sc., Ph.D",
                subject: "Chemistry",
                order: 7
            },
            {
                name: "Dr. SUNITHA M",
                designation: "Assistant Professor",
                qualification: "M.Sc., Ph.D",
                subject: "Chemistry",
                order: 8
            },
            {
                name: "Ms. DHAVAMANI P",
                designation: "Assistant Professor",
                qualification: "M.Sc., B.Ed",
                subject: "Mathematics",
                order: 9
            },
            {
                name: "Ms. ELCY A",
                designation: "Assistant Professor",
                qualification: "M.Sc., M.Phil",
                subject: "Mathematics",
                order: 10
            },
            {
                name: "Ms. SUJITHRA N",
                designation: "Assistant Professor",
                qualification: "M.Sc., M.Phil",
                subject: "Mathematics",
                order: 11
            },
            {
                name: "Dr. JANNATH BEGAM P",
                designation: "Assistant Professor",
                qualification: "M.Sc., PGDCA., M.Phil., Ph.D",
                subject: "Mathematics",
                order: 12
            },
            {
                name: "Dr. SANTHIYA S",
                designation: "Assistant Professor",
                qualification: "M.Phil., Ph.D",
                subject: "Mathematics",
                order: 13
            },
            {
                name: "Ms. JAYANTHI V B",
                designation: "Assistant Professor",
                qualification: "M.A., M.Phil., B.Ed",
                subject: "English",
                order: 14
            },
            {
                name: "Dr. SUDHA N",
                designation: "Assistant Professor",
                qualification: "M.A., B.Ed., M.Phil., Ph.D",
                subject: "Tamil",
                order: 15
            },
            {
                name: "Mr. RACSAGAN",
                designation: "Assistant Professor",
                qualification: "M.A., M.Ed., NET",
                subject: "Tamil",
                order: 16
            },
            {
                name: "Dr. SATHIYASEELAN T",
                designation: "Assistant Professor",
                qualification: "M.A., PGDPRM., Ph.D",
                subject: "Tamil",
                order: 17
            }
        ]
    },

    // MBA - Master of Business Administration
    {
        id: "master-of-business-administration",
        name: "Master of Business Administration",
        slug: "master-of-business-administration",
        type: "PG",
        degree: "MBA",
        heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "MBA is a flagship program of EASA College of Engineering and Technology to develop influential leaders. The department of Master of Business Administration equips students in their personal and professional front to assume corporate and entrepreneurial responsibilities. The curriculum of our MBA program and our competent faculty members, who have the right combination of Academic and Industrial experiences have prepared our students to global standards. Our MBA program enables the students to attain successful employment for key positions in Financial, Human Resources, Marketing, Operations and Logistics. The School is on a progressive path with strict adherence to Quality Standards. The program nurtures rising managers to attain the realm of success. We are well equipped with state-of-art infrastructure, qualified, friendly teaching staff, who help students realize and achieve their potential. Our program provides opportunities for the students to pursue overseas higher education or in relevant domain leading to Ph. D. EASA's MBA course facilitates the learners to become socially and ethically responsible leaders. The department has a well-stocked library with International journals and the latest computers to promote our students' research and development. Through this course, we develop young men and women who take up responsibility effectively as management leaders, executives in the industry, and senior administrators.",
        vision: "To inspire and empower individuals to become global leaders, entrepreneurs and change makers, creating value for society through ethical and innovative management practices.",
        mission: [
            "M1: To foster a culture of academic excellence, intellectual and personal growth and practical training in the field of management studies.",
            "M2: To prepare individuals to become effective, ethical and socially responsible leaders, entrepreneurs and managers who can create value for the society and drive economic growth.",
            "M3: To acquire knowledge and drive innovation through cutting-edge research and development in the field of management studies.",
            "M4: To bridge the gap between academia and industry by offering industry aligned programs, practical experience and hands on training that prepare students to lead, innovate and thrive in an ever evolving global landscape.",
            "M5: To prioritize diversity, equity and inclusion to create a welcoming and inclusive environment that produces socially responsible leaders."
        ],
        peo: [
            "PEO1: To have a thorough understanding of the core aspects of the business.",
            "PEO2: To provide the learners with the management tools to identify, analyze and create business opportunities as well as solve business problems.",
            "PEO3: To prepare them to have a holistic approach towards management functions.",
            "PEO4: To inspire and make them practice ethical standards in business."
        ],
        po: [
            "PO1: Ability to apply the business acumen gained in practice.",
            "PO2: Ability to understand and solve managerial issues.",
            "PO3: Ability to communicate and negotiate effectively, to achieve organizational and individual goals.",
            "PO4: Ability to understand one’s own ability to set achievable targets and complete them.",
            "PO5: Ability to fulfill social outreach.",
            "PO6: Ability to take up challenging assignments."
        ],
        pso: [
            "PSO1: To apply the fundamental knowledge of management domains to optimally solve the complex business problems.",
            "PSO2: To inculcate the ability in students to gain multi-disciplinary knowledge through simulated problems, case analysis, projects and industrial training.",
            "PSO3: To develop competent management professionals with strong ethical values with an understanding of societal and ecological issues relevant to professional managerial practice through life-long learning."
        ],
        documents: [
            { title: "Vision & Mission Portal", url: "https://www.easacollege.com/best-mba-colleges-in-coimbatore-tamil-nadu#vision", type: "Web" },
            { title: "PEO, PO, PSO (PDF)", url: "https://www.easacollege.com/assets/dept/mba/PEO,%20PO,%20PSO.pdf", type: "PDF" },
            { title: "Course Outcomes (CO.pdf)", url: "https://www.easacollege.com/assets/dept/mba/CO.pdf", type: "PDF" }
        ],
        milestones: [
            { year: "2009", desc: "MBA Department Inception & AICTE Approval" },
            { year: "2015", desc: "State-of-the-Art Management Research & Case Study Lab Launched" },
            { year: "2024", desc: "Autonomous Curriculum Introduced with Industry Specializations" }
        ],
        hod: {
            name: "Dr. S. Saira Banu",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/mba.jpeg",
            designation: "Associate Professor & Director - MBA",
            message: "Greetings from Department of Management Studies, EASA College of Engineering and Technology. The Department is dedicated to nurturing future business leaders, entrepreneurs and change-makers through a strong blend of academic excellence, ethical values, leadership development and real-world readiness. With a learner-centric approach, the MBA Program focuses on building managerial competence, critical thinking, innovation and problem-solving skills required in today's dynamic global business environment."
        },
        studentCount: "120+",
        facultyCount: "15+",
        labCount: "3+",
        labs: [
            {
                name: "FinTech & Financial Markets Trading Lab",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
                description: "Simulated stock exchange trading environment for portfolio optimization, algorithmic risk modeling, technical equity charting, and derivatives valuation.",
                equipment: "Real-Time Market Data Terminals, NSE/BSE Trading Simulation Platform, IBM SPSS Statistics, Python for Finance Analytics, Advanced Corporate Financial Modeling Suite"
            },
            {
                name: "Business Analytics & Executive Decision Intelligence Lab",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                description: "Executive decision-making workspace for consumer analytics, supply chain predictive modeling, dynamic KPI dashboarding, and ERP simulations.",
                equipment: "Tableau Desktop Pro, Microsoft Power BI Premium, SAP ERP Simulation Suites, Google Analytics 4, IBM SPSS Modeler Enterprise"
            }
        ],
        specializations: [
            { title: "Financial Management & FinTech", desc: "Corporate valuation, algorithmic trading, risk analytics, derivatives & investment banking.", icon: "FaChartLine", tag: "High Demand" },
            { title: "Human Resource Management", desc: "Strategic HR, talent acquisition, people analytics, industrial relations & organizational design.", icon: "FaUsers", tag: "Core Track" },
            { title: "Marketing Management & Digital Growth", desc: "Brand management, AI-driven digital marketing, consumer psychology & growth hacking.", icon: "FaBullseye", tag: "Trending" },
            { title: "Operations & Supply Chain", desc: "Lean manufacturing, global logistics, enterprise ERP, procurement & Total Quality Management.", icon: "FaBoxes", tag: "Industry 4.0" },
            { title: "Business Analytics & Systems", desc: "Predictive modeling, data visualization, business intelligence (PowerBI/Tableau) & cloud strategy.", icon: "FaLaptopCode", tag: "Tech Edge" }
        ],
        programFeatures: [
            { title: "Harvard & IIM Case Pedagogy", desc: "Experiential learning through real corporate dilemmas and strategic simulation games." },
            { title: "CXO Executive Mentorship", desc: "Direct 1-on-1 mentorship with Fortune 500 business leaders, entrepreneurs, and alumni." },
            { title: "Venture Incubation & Seed Funding", desc: "Incubate startups on campus with access to angel investor networks and patent support." },
            { title: "Global Dual Certifications", desc: "Integrated industry certifications in SAP ERP, Six Sigma Green Belt, and Google Analytics." }
        ],
        careerPaths: [
            "Management Consultant",
            "Investment Banker & Equity Analyst",
            "HR Business Partner (HRBP)",
            "Brand & Digital Marketing Strategist",
            "Supply Chain & Logistics Director",
            "FinTech Solutions Architect",
            "Corporate Strategy Executive"
        ],
        keyMetrics: [
            { label: "Placement Success", value: "96%", desc: "Track record with top MNCs" },
            { label: "Corporate Partners", value: "150+", desc: "Active recruiting companies" },
            { label: "Highest CTC Package", value: "16 LPA", desc: "Top tier placement offer" },
            { label: "Paid Internships", value: "100%", desc: "Hands-on corporate exposure" }
        ],
        courseOutcomes: [
            {
                code: "BA5101",
                name: "Economic Analysis for Business",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C101.1", text: "Apply the concept of opportunity cost", kLevel: "K3" },
                    { id: "C101.2", text: "Employ marginal analysis for decision making", kLevel: "K2" },
                    { id: "C101.3", text: "Analyze operations of markets under varying competitive conditions", kLevel: "K4" },
                    { id: "C101.4", text: "Analyze causes and consequences of unemployment, inflation and economic growth", kLevel: "K4" },
                    { id: "C101.5", text: "Apply the concept of opportunity cost", kLevel: "K2" }
                ]
            },
            {
                code: "BA5102",
                name: "Principles of Management",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C102.1", text: "Describe and discuss the elements of effective management", kLevel: "K2" },
                    { id: "C102.2", text: "Discuss and apply the planning, organizing and control processes", kLevel: "K2" },
                    { id: "C102.3", text: "Describe various theories related to the development of leadership skills, motivation techniques, teamwork and effective communication", kLevel: "K2" },
                    { id: "C102.4", text: "Communicate effectively through both oral and written presentation", kLevel: "K2" },
                    { id: "C102.5", text: "Integrate management principles into management practices", kLevel: "K3" }
                ]
            },
            {
                code: "BA4103",
                name: "Accounting for Management",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C103.1", text: "Possess a managerial outlook at accounts", kLevel: "K2" },
                    { id: "C103.2", text: "Preparation of financial statement analysis", kLevel: "K3" },
                    { id: "C103.3", text: "Understand the management and cost accounting techniques", kLevel: "K2" },
                    { id: "C103.4", text: "Apply the management and cost accounting techniques for decision making", kLevel: "K3" },
                    { id: "C103.5", text: "Assess the accountancy standards of practices in India", kLevel: "K2" }
                ]
            },
            {
                code: "BA5104",
                name: "Legal Aspects of Business",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C104.1", text: "Understand the fundamental legal principles in developing various contracts and commercial laws in the business world", kLevel: "K2" },
                    { id: "C104.2", text: "Identify the common forms of business associations and elements of corporate governance", kLevel: "K2" },
                    { id: "C104.3", text: "Develop insights regarding the laws related to industrial environment", kLevel: "K3" },
                    { id: "C104.4", text: "Ability to understand the fundamentals of corporate tax and GST", kLevel: "K2" },
                    { id: "C104.5", text: "Understand the role of consumer rights and cyber laws in the modern business environment", kLevel: "K2" }
                ]
            },
            {
                code: "BA5105",
                name: "Organisational Behaviour",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C105.1", text: "Understanding of various management concepts and skills required in the business world", kLevel: "K2" },
                    { id: "C105.2", text: "In-depth knowledge of various functions of management in a real time management context", kLevel: "K2" },
                    { id: "C105.3", text: "Understanding of the complexities associated with management of individual behavior in the organizations", kLevel: "K2" },
                    { id: "C105.4", text: "Develop the skillset to have manage group behaviour in Organizations", kLevel: "K2" },
                    { id: "C105.5", text: "Insights about the current trends in managing organizational behaviour", kLevel: "K2" }
                ]
            },
            {
                code: "BA5106",
                name: "Statistics for Management",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C106.1", text: "Summarize data visually and numerically", kLevel: "K1" },
                    { id: "C106.2", text: "Build and assess data-based models", kLevel: "K2" },
                    { id: "C106.3", text: "Learn and apply the tools of formal inference", kLevel: "K3" },
                    { id: "C106.4", text: "Mathematical and probabilistic foundations of statistical inference", kLevel: "K2" },
                    { id: "C106.5", text: "Execute statistical analyses with professional software", kLevel: "K4" }
                ]
            },
            {
                code: "BA5107",
                name: "Total Quality Management",
                semester: "Semester I",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C107.1", text: "Understanding of the evolution of operations management practices and world class manufacturing processes", kLevel: "K2" },
                    { id: "C107.2", text: "Knowledge about capacity planning, strategic sourcing and procurement in organizations", kLevel: "K2" },
                    { id: "C107.3", text: "Enhances the understanding of product development and design process", kLevel: "K1" },
                    { id: "C107.4", text: "Ability to forecast demand and overcome bottlenecks", kLevel: "K1" },
                    { id: "C107.5", text: "Provides insight to Quality management tools and practices", kLevel: "K2" }
                ]
            },
            {
                code: "BA5201",
                name: "Applied Operations Research",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C108.1", text: "Formulate and obtain the optimal solution for Linear Programming problems", kLevel: "K2" },
                    { id: "C108.2", text: "Determine the optimal solution for Transportation problems", kLevel: "K2" },
                    { id: "C108.3", text: "Determine the optimal solution for Assignment problems", kLevel: "K2" },
                    { id: "C108.4", text: "Determine the best strategy and value of the given game model", kLevel: "K2" },
                    { id: "C108.5", text: "Plan, Schedule and Control the given project", kLevel: "K2" }
                ]
            },
            {
                code: "BA5202",
                name: "Business Research Methods",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C109.1", text: "Students will understand and appreciate scientific inquiry", kLevel: "K2" },
                    { id: "C109.2", text: "Students would know to write research proposals", kLevel: "K1" },
                    { id: "C109.3", text: "Undertake a systematic outlook towards business situation for objective decision making and scientific inquiry to solve organizational problems", kLevel: "K2" },
                    { id: "C109.4", text: "Students would be able to analyze data and find solutions to the problems", kLevel: "K4" },
                    { id: "C109.5", text: "Students could prepare research reports", kLevel: "K3" }
                ]
            },
            {
                code: "BA5203",
                name: "Financial Management",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C110.1", text: "Identify the concepts of financial decision of an organization", kLevel: "K2" },
                    { id: "C110.2", text: "Recognize the time value of money", kLevel: "K2" },
                    { id: "C110.3", text: "Learn the capital budgeting and cost of capital techniques", kLevel: "K2" },
                    { id: "C110.4", text: "Understand how to decide the decision of capital structure and distribution of dividend", kLevel: "K2" },
                    { id: "C110.5", text: "Assess the short-term and long-term sources of finance", kLevel: "K2" }
                ]
            },
            {
                code: "BA5204",
                name: "Human Resource Management",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C111.1", text: "Gained knowledge on the various aspects of HRM", kLevel: "K2" },
                    { id: "C111.2", text: "Gain knowledge needed for success as a human resources professional", kLevel: "K2" },
                    { id: "C111.3", text: "Develop the skills needed for a successful HR manager", kLevel: "K3" },
                    { id: "C111.4", text: "Prepared to implement the concepts learned in the workplace", kLevel: "K3" },
                    { id: "C111.5", text: "Aware of the emerging concepts in the field of HRM", kLevel: "K1" }
                ]
            },
            {
                code: "BA5205",
                name: "Information Management",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C112.1", text: "Learn the basics of data and information system", kLevel: "K1" },
                    { id: "C112.2", text: "Understand the system development methodologies", kLevel: "K2" },
                    { id: "C112.3", text: "Understand database management system and its types", kLevel: "K2" },
                    { id: "C112.4", text: "Learn the various technologies in information system and its security", kLevel: "K1" },
                    { id: "C112.5", text: "Gains knowledge on effective applications of information systems in business", kLevel: "K2" }
                ]
            },
            {
                code: "BA5206",
                name: "Operations Management",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C113.1", text: "Understanding of the evolution of operations management practices and world class manufacturing processes", kLevel: "K2" },
                    { id: "C113.2", text: "Knowledge about capacity planning, strategic sourcing and procurement in organizations", kLevel: "K1" },
                    { id: "C113.3", text: "Enhances the understanding of product development and design process", kLevel: "K2" },
                    { id: "C113.4", text: "Ability to forecast demand and overcome bottlenecks", kLevel: "K1" },
                    { id: "C113.5", text: "Provides insight to Quality management tools and practices", kLevel: "K2" }
                ]
            },
            {
                code: "BA5207",
                name: "Marketing Management",
                semester: "Semester II",
                year: "2019-2020",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C114.1", text: "Applied knowledge of contemporary marketing theories to the demands of business and management practice", kLevel: "K1" },
                    { id: "C114.2", text: "Enhanced knowledge of marketing strategies for consumer and industrial marketing", kLevel: "K2" },
                    { id: "C114.3", text: "Deep understanding of choice of marketing mix elements and managing integrated marketing channels", kLevel: "K1" },
                    { id: "C114.4", text: "Ability to analyze the nature of consumer buying behavior", kLevel: "K2" },
                    { id: "C114.5", text: "Understanding of the marketing research and new trends in the arena of marketing", kLevel: "K1" }
                ]
            },
            {
                code: "BA5301",
                name: "International Business Management",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C201.1", text: "In-depth knowledge of driving factors of international business", kLevel: "K1" },
                    { id: "C201.2", text: "Understanding of theories of trade and investment practiced in the global world", kLevel: "K2" },
                    { id: "C201.3", text: "Deep insights into various market entry strategies followed by Global Organizations", kLevel: "K2" },
                    { id: "C201.4", text: "Ability to identify various global production and supply chain issues and understand foreign exchange determination system", kLevel: "K3" },
                    { id: "C201.5", text: "Enhance cognitive knowledge of managing business across cultures", kLevel: "K1" }
                ]
            },
            {
                code: "BA5302",
                name: "Strategic Management",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C202.1", text: "Ability to understand the Strategic management process and social responsibility of business organizations", kLevel: "K1" },
                    { id: "C202.2", text: "In-depth understanding about the need for developing competitive advantage for organizations", kLevel: "K2" },
                    { id: "C202.3", text: "Provides insights into various corporate and business level strategies", kLevel: "K2" },
                    { id: "C202.4", text: "Facilitates identifying various control systems required for organizational strategy implementation process", kLevel: "K1" },
                    { id: "C202.5", text: "Enhances cognitive knowledge about various strategic issues and development of new business models", kLevel: "K2" }
                ]
            },
            {
                code: "BA5002",
                name: "Consumer Behaviour",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C203.1", text: "Consumer orientation and consumption analysis", kLevel: "K2" },
                    { id: "C203.2", text: "Intrinsic influences on buyer decision making", kLevel: "K3" },
                    { id: "C203.3", text: "Effects of external and social influences", kLevel: "K1" },
                    { id: "C203.4", text: "Models of consumer and industrial buying", kLevel: "K2" },
                    { id: "C203.5", text: "The comprehensive consumer decision making process", kLevel: "K2" }
                ]
            },
            {
                code: "BA5005",
                name: "Retail Marketing",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "B204.1", text: "Provide insights on retail operations and structure", kLevel: "K1" },
                    { id: "B204.2", text: "Understand effective methods and strategies required for retail management", kLevel: "K2" },
                    { id: "B204.3", text: "Understand how to utilize resources and techniques used in retail management", kLevel: "K2" },
                    { id: "B204.4", text: "Understand analysis of store location, merchandising, products and pricing", kLevel: "K2" },
                    { id: "B204.5", text: "Gain knowledge about shopper behavior patterns", kLevel: "K1" }
                ]
            },
            {
                code: "BA5006",
                name: "Service Marketing",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C205.1", text: "Demonstrate an extended understanding of the similarities and differences in service-based and physical product based marketing activities", kLevel: "K1" },
                    { id: "C205.2", text: "Develop and justify marketing planning and control systems appropriate to service-based activities", kLevel: "K2" },
                    { id: "C205.3", text: "Demonstrate integrative knowledge of marketing issues associated with service productivity, perceived quality, customer satisfaction and loyalty", kLevel: "K1" },
                    { id: "C205.4", text: "Develop blueprint for the services sector and create strategies for service excellence", kLevel: "K2" },
                    { id: "C205.5", text: "Recognise challenges faced in services delivery as outlined in the services gap model", kLevel: "K1" }
                ]
            },
            {
                code: "BA45008",
                name: "Banking and Financial Services",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C206.1", text: "Understand the overall structure and functions of Indian financial system", kLevel: "K2" },
                    { id: "C206.2", text: "Gain knowledge about regulations governing Indian banking system", kLevel: "K1" },
                    { id: "C206.3", text: "Price various types of loans proposed by banks and evaluate bank performance", kLevel: "K3" },
                    { id: "C206.4", text: "Familiarise with concepts of modern e-banking and digital banking", kLevel: "K1" },
                    { id: "C206.5", text: "In-depth understanding of fee-based and fund-based financial services in India", kLevel: "K2" }
                ]
            },
            {
                code: "BA5010",
                name: "Derivatives Management",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C207.1", text: "Possess good skills in hedging risks using derivatives", kLevel: "K1" },
                    { id: "C207.2", text: "Understand about futures contract and option mechanisms", kLevel: "K2" },
                    { id: "C207.3", text: "Learning in-depth about option pricing models and swaps", kLevel: "K3" },
                    { id: "C207.4", text: "Knowing about the evolution and structure of derivative markets", kLevel: "K2" },
                    { id: "C207.5", text: "Develop in-depth knowledge about stock options and index futures in NSE", kLevel: "K1" }
                ]
            },
            {
                code: "BA4001",
                name: "Security Analysis and Portfolio Management",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C208.1", text: "Understand the concept of investment and identify investment alternatives for investors", kLevel: "K2" },
                    { id: "C208.2", text: "Learn the nuances of fundamental analyses and technical analyses", kLevel: "K2" },
                    { id: "C208.3", text: "Analyse and evaluate the intrinsic value of securities", kLevel: "K4" },
                    { id: "C208.4", text: "Explain how to construct an efficient investment portfolio", kLevel: "K1" },
                    { id: "C208.5", text: "Explore various methods through which portfolio evaluation is executed", kLevel: "K5" }
                ]
            },
            {
                code: "BA4032",
                name: "Entrepreneurship Development",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C209.1", text: "Gain entrepreneurial competence to run business ventures efficiently", kLevel: "K1" },
                    { id: "C209.2", text: "Undertake businesses in the dynamic entrepreneurial ecosystem", kLevel: "K2" },
                    { id: "C209.3", text: "Capable of preparing robust business plans and feasible projects", kLevel: "K2" },
                    { id: "C209.4", text: "Efficient in launching and scaling business ventures successfully", kLevel: "K1" },
                    { id: "C209.5", text: "Monitor business metrics effectively towards growth and sustained development", kLevel: "K2" }
                ]
            },
            {
                code: "BA5015",
                name: "Industrial Relations and Labour Welfare",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C210.1", text: "Industrial relations systems and Trade union operations", kLevel: "K1" },
                    { id: "C210.2", text: "Industrial Disputes resolution and labour welfare measures", kLevel: "K2" },
                    { id: "C210.3", text: "Labour legislation introduction and legal provisions for factory workers, wages and Bonus", kLevel: "K3" },
                    { id: "C210.4", text: "Legal provisions for equal remuneration, gratuity, compensation and Apprenticeship", kLevel: "K2" },
                    { id: "C210.5", text: "Legal provisions for EPF, ESI, Maternity, contract labours and child labour prevention", kLevel: "K1" }
                ]
            },
            {
                code: "BA5019",
                name: "Strategic Human Resource Management",
                semester: "Semester III",
                year: "2020-2021",
                regulations: "Regulations 2017",
                cos: [
                    { id: "C211.1", text: "Understand the relationship of HR strategy with overall corporate strategy and the strategic role of HR systems", kLevel: "K2" },
                    { id: "C211.2", text: "Appreciate SHRM in changing organizational forms with modern tools and techniques", kLevel: "K1" },
                    { id: "C211.3", text: "Develop cross-cultural sensitivity and international HRM comparative perspectives", kLevel: "K2" },
                    { id: "C211.4", text: "Provide counselling and coaching processes with alternative problem-solving strategies", kLevel: "K1" },
                    { id: "C211.5", text: "Understand career development theories and models to become effective strategic HR managers", kLevel: "K2" }
                ]
            }
        ]
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
const researchItemsData = [
    {
        title: "International Research Webinar on Deep Learning & Medical Imaging",
        category: "department-research",
        type: "Research Seminar",
        author: "Dr. A. R. Ramanathan (Resource Person, IIT Madras)",
        department: "Computer Science and Engineering",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        description: "Special researcher session on applying convolutional neural networks and transformer models for early diagnostic cancer detection in medical radiology datasets.",
        link: "https://easacollege.ac.in/research/medical-imaging-session"
    },
    {
        title: "Research Colloquium on Renewable Energy Micro-Grids",
        category: "department-research",
        type: "Colloquium",
        author: "Dr. K. Meenakshi & Research Team",
        department: "Electrical & Electronics Engineering",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop",
        description: "Deliberation on smart grid communication protocols, peak load forecasting algorithms, and solar PV integration into rural power distribution grids.",
        link: "https://easacollege.ac.in/research/microgrid-colloquium"
    },
    {
        title: "Faculty Development Programme (FDP) on High-Impact Research Paper Writing",
        category: "faculty-research",
        type: "FDP / Workshop",
        author: "Dr. S. K. Sundaram (NIT Trichy)",
        department: "R&D Cell & Faculty Research Wing",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
        description: "Comprehensive 5-day research methodology workshop focusing on Scopus/WoS journal indexing standards, latex formatting, citation analytics, and handling peer reviewer comments.",
        link: "https://easacollege.ac.in/research/fdp-paper-writing"
    },
    {
        title: "Grant Proposal & Funded Project Formulation Session",
        category: "faculty-research",
        type: "Expert Lecture",
        author: "Dr. V. Rajeshwari (DST Representative)",
        department: "R&D Cell",
        year: "2025",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
        description: "Guidance session for faculty members on securing research funding from DST, SERB, AICTE, and CSIR for institutional innovation projects.",
        link: "https://easacollege.ac.in/research/grant-formulation"
    },
    {
        title: "Annual Student Research Symposium (ASRS 2026) - Smart IoT Solutions",
        category: "student-research",
        type: "Symposium",
        author: "CSE & ECE Student Researchers",
        department: "Computer Science & Engineering",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
        description: "Exhibition and presentation of student-led research papers and working prototypes in industrial automation, agricultural IoT, and environmental monitoring.",
        link: "https://easacollege.ac.in/research/asrs-2026"
    },
    {
        title: "Paper Presentation Session on Autonomous Robotics & Drones",
        category: "student-research",
        type: "Paper Presentation",
        author: "Mechanical & Mechatronics Student Forum",
        department: "Mechanical Engineering",
        year: "2025",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
        description: "Student research presentations discussing drone path planning algorithms, payload balancing, and lightweight composite drone frame design.",
        link: "https://easacollege.ac.in/research/drones-paper-presentation"
    },
    {
        title: "Joint Industrial Research Workshop on Cyber Security & Digital Forensics",
        category: "industrial-research",
        type: "Industry-Academia Workshop",
        author: "Maxbite Technologies & Cyber Defense Experts",
        department: "Cyber Security & IT",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        description: "Collaborative research session with industry engineers addressing threat hunting, zero-day vulnerability analysis, and ethical hacking protocols.",
        link: "https://easacollege.ac.in/research/industrial-cybersecurity"
    },
    {
        title: "Interactive Awareness Session on Intellectual Property Rights & Patent Drafting",
        category: "ipr-cell",
        type: "IPR Workshop",
        author: "Adv. M. Vignesh (Registered Patent Agent)",
        department: "IPR Cell",
        year: "2026",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
        description: "Step-by-step guidance on novelty searching using Indian Patent Office databases, filing provisional specifications, and commercializing academic patents.",
        link: "https://easacollege.ac.in/research/ipr-patent-workshop"
    },
    {
        title: "AI-Powered Smart Agricultural Crop Disease Detection System",
        category: "rd-projects",
        type: "Funded Project",
        author: "Dr. P. Chandran & R&D Team",
        department: "AI & Data Science",
        year: "2025-2026",
        status: "Ongoing",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop",
        description: "Ongoing sponsored research project aimed at developing low-cost edge AI devices for real-time leaf spot detection and yield prediction for local farmers.",
        link: "https://easacollege.ac.in/research/crop-disease-ai"
    },
    {
        title: "Patent Granted: Smart Automated Biomedical Waste Disposal & Sterilization Device",
        category: "patents",
        type: "Patent",
        author: "Dept. of Biomedical Engineering & IPR Cell",
        department: "Biomedical Engineering",
        year: "2025",
        status: "Granted",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        description: "Official Indian Patent granted for compact eco-friendly hospital waste treatment system using automated UV-C sterilization and automated shredding.",
        link: "https://easacollege.ac.in/research/patents/biomedical-disposal"
    }
];
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
        { label: "Highest Package", value: "16 LPA", icon: "FaRocket" },
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
        email: "placement@ecetonline.com",
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
                heading: 'Entrepreneurship Development Cell (EDC)',
                body: `**Overview**
The ECET EDC functioning in our college to cultivate entrepreneurial culture among our students. It provides budding innovators with the training, mentorship, and resources needed to transform raw ideas into viable, market-ready startups.

**Vision**
To create an entrepreneurial ecosystem that transforms innovative minds into ethical, responsible and successful business leaders and job creators.

**Mission**
Foster creativity, innovation, and an entrepreneurial mindset by conducting mentorship programmes, practical workshops, networking events, and guidance to transform from ideation to incubation and collaborating with outside world to deliver real-world solutions.

**EC Committee**
• Faculty Coordinator: Mr. T Gunasekaran, Assistant Professor / Mechanical Engineering
• Student Secretary: Mr. Sharukesavan, Final Year Agricultural Engg
• Joint Secretary: Ms. Metha, Final Year Agricultural Engg

**Major Events**
• 1. World Entrepreneurship Day – 21-8-25
• 2. Design Thinking – 1-9-25
• 3. Sustainable Engineering in Core Industry – 22-9-25
• 4. Meet the CEO – 19-11-25
• 5. Research Publication and Patents – 9-08-25
• 6. Workshop on Design Thinking – 1-9-25
• 7. DISRUPT e-leader Workshop – 30-10-25
• 8. Quality Concepts for Life Skills – 3/3/26

**Contact**
• Faculty Coordinator: Mr. T Gunasekaran, Coordinator, ECET EDC
• Email: edc@ecetonline.com
• Phone: 86673 05824
• Social: Instagram.com/edcecet`,
                image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070&auto=format&fit=crop'
            },
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
    },
    {
        slug: 'center-of-excellence',
        title: 'Center of Excellence',
        subtitle: 'Advancing Frontier Research, Emerging Technologies & Industry Innovation',
        heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
        content: `EASA College of Engineering and Technology has established high-caliber Centers of Excellence (CoE) to serve as epicenters of technological innovation, multi-disciplinary research, and industry-aligned competency building.
        Designed in tandem with premier technology corporations and regulatory frameworks, these centers empower students to work on live industrial problem statements, file intellectual patents, and emerge as leaders in deep-tech domains.`,
        sections: [
            {
                heading: 'AI, Machine Learning & Data Analytics Hub',
                body: `Equipped with NVIDIA RTX GPU computing nodes, deep learning accelerators, and big data clusters for LLMs, computer vision, natural language processing, and predictive analytics.\n\n• GPU Deep Learning Workstations (NVIDIA RTX/Tesla)\n• Frameworks: PyTorch, TensorFlow, OpenCV, HuggingFace, CUDA\n• Edge AI Kits: NVIDIA Jetson AGX Orin & Raspberry Pi 5\n• Research projects in automated agricultural vision and Indic healthcare NLP`,
                image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Robotics, Automation & Industrial IoT Lab',
                body: `Bridging mechanical engineering, embedded electronics, and cloud analytics for Industry 4.0 applications, collaborative robots, and autonomous mobile robotics.\n\n• 6-Axis Articulated Industrial Robotic Arm with vision guidance\n• Siemens S7-1200 / Schneider Modicon PLCs with SCADA & HMI\n• Autonomous Mobile Robots (AMR) with LiDAR & ROS2 SLAM\n• Industrial IoT gateways with MQTT, Modbus & LoRaWAN`,
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Electric Vehicles & Clean Energy Center',
                body: `Dedicated to green mobility and renewable energy systems, housing battery testing chambers, BLDC motor dynamometers, solar microgrids, and power conversion testbenches.\n\n• 5kW BLDC/PMSM Regenerative Motor Dynamometer\n• Battery Management System (BMS) testing & active balancing emulation\n• 10kW Hybrid Solar Microgrid with LiFePO4 battery bank\n• AC & DC Fast Charging test setups for EV infrastructure compliance`,
                image: 'https://images.unsplash.com/photo-1558441719-646b22ad4409?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'VLSI Design & Embedded Edge Systems',
                body: `Focusing on custom ASIC/FPGA digital design, mixed-signal layouts, and embedded firmware development on ARM Cortex and RISC-V platforms.\n\n• Xilinx Vivado, Spartan-7, Artix-7 & Zynq SoC boards\n• Cadence & ModelSim EDA CAD simulation suites\n• Keysight 4-Channel 500MHz Mixed-Signal DSOs\n• Real-Time Operating Systems (FreeRTOS, Zephyr) on 32-bit MCUs`,
                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Cyber Security & Cloud Sandbox',
                body: `Isolated air-gapped cyber range sandbox training students in penetration testing, threat detection, digital forensics, multi-cloud management, and smart contracts.\n\n• Isolated Red vs. Blue Team offensive/defensive cyber range\n• SIEM tools: Splunk, Wireshark, Metasploit, Burp Suite\n• Multi-cloud clusters with AWS Academy, GCP & Azure\n• Hyperledger & Ethereum blockchain decentralized ledger testnet`,
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Additive Manufacturing & Prototyping (IDEA Lab)',
                body: `State-of-the-art precision 3D printing, CNC machining, laser cutting, PCB milling, and optical 3D scanning to translate concepts into functional prototypes.\n\n• Industrial FDM and 4K SLA Resin 3D Printers\n• CNC PCB Prototyping machine with 60,000 RPM spindle\n• Handheld 0.02mm Optical Laser 3D Scanner\n• AICTE IDEA Lab integrated fabrication facility`,
                image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'mandatory-disclosure',
        title: 'Mandatory Disclosure',
        subtitle: 'Statutory Information as per AICTE & Regulatory Guidelines',
        heroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop',
        content: `Mandatory Disclosure under AICTE Regulations, Anna University, and Government of Tamil Nadu for EASA College of Engineering and Technology, Navakkarai, Coimbatore.\n\nThis document provides transparent, verifiable details on institution governance, approved academic programs, faculty credentials, infrastructural facilities, library resources, fee structures, and anti-ragging statutory committees.`,
        sections: [
            {
                heading: 'Institutional Information',
                body: `• **Institution Name:** EASA College of Engineering and Technology\n• **Address:** NH-47, Palakkad Main Road, Navakkarai (PO), Coimbatore - 641105, Tamil Nadu\n• **Approval Status:** Approved by AICTE, New Delhi; Affiliated to Anna University, Chennai\n• **Type of Institution:** Autonomous, Self-Financed, Linguistic Minority (Malayalam)\n• **Contact:** +91 93426 28013 | info@ecetonline.com`,
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop'
            },
            {
                heading: 'Programs Offered & Approvals',
                body: `• B.E. Computer Science and Engineering\n• B.Tech Artificial Intelligence and Data Science\n• B.Tech Information Technology\n• B.E. Electronics and Communication Engineering\n• B.E. Electrical and Electronics Engineering\n• B.E. Mechanical Engineering\n• B.E. Agriculture Engineering\n• B.E. Biomedical Engineering\n• M.E. Computer Science and Engineering\n• M.E. Structural Engineering\n• Master of Business Administration (MBA)`,
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop'
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
        fileUrl: "https://easa-backend.onrender.com/docs/autonomous_regulations.pdf",
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

const facultyResearchData = [
    {
        sNo: 1,
        department: "EEE",
        facultyName: "Mr. Ranjithkumar G",
        designation: "AP/EEE",
        qualification: "M.E",
        researchArea: "Power Systems",
        googleScholar: "https://scholar.google.com/citations?view_op=new_profile&hl=en",
        scopusId: "57205489457",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 3,
        booksCount: 0,
        patentsCount: 1,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: "IEEE & ISTE"
    },
    {
        sNo: 2,
        department: "EEE",
        facultyName: "Ms. Indumathi R",
        designation: "AP/EEE",
        qualification: "M.E",
        researchArea: "Power Systems",
        googleScholar: "https://scholar.google.com/citations?user=NxLekuMAAAAJ&hl=en&oi=ao",
        scopusId: "56907022900",
        orcidId: "http://orcid.org/0000-0002-2300-9724",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 8,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "2",
        memberships: "IEEE"
    },
    {
        sNo: 3,
        department: "EEE",
        facultyName: "Mr. Nagarajan D",
        designation: "AP/EEE",
        qualification: "M.E",
        researchArea: "Power Systems",
        googleScholar: "https://scholar.google.com/citations?user=UI0lcwMAAAAJ&hl=en&authuser=5",
        scopusId: "58363376800",
        orcidId: "https://orcid.org/0000-0002-5967-8612",
        vidwanProfile: "581932",
        researchGateProfile: "",
        publicationsCount: 9,
        booksCount: 1,
        patentsCount: 2,
        sponsoredProjects: 0,
        consultancyProjects: 1,
        awards: "",
        memberships: "ISTE"
    },
    {
        sNo: 4,
        department: "EEE",
        facultyName: "Mr. Nithiyanantham G",
        designation: "AP/EEE",
        qualification: "M.E",
        researchArea: "Power Electronics",
        googleScholar: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=nithiyanandham.g+&btnG=#d=gs_qabs&t=1785306025040&u=%23p%3D4aXzCNSKGYEJ",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 2,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 5,
        department: "CSE",
        facultyName: "Dr. P. Sasikala",
        designation: "AP/CSE",
        qualification: "Ph.D",
        researchArea: "Machine Learning, AI, Deep Learning, NLP, IoT, IoMT, Smart Healthcare",
        googleScholar: "https://scholar.google.com/citations?user=1ipKNYAAAAAJ",
        scopusId: "58500000000",
        orcidId: "https://orcid.org/0000-0002-2068-0790",
        vidwanProfile: "84623",
        researchGateProfile: "",
        publicationsCount: 3,
        booksCount: 1,
        patentsCount: 6,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "Ph.D. Awarded, Best Paper, Outstanding Thesis, Research Excellence Award",
        memberships: "ISTE, IAENG, SDIWC, SAISE, IISD"
    },
    {
        sNo: 6,
        department: "CSE",
        facultyName: "Dr S Prem Anand",
        designation: "AP/CSE",
        qualification: "Ph.D",
        researchArea: "E-Vehicle Optimization",
        googleScholar: "https://scholar.google.com/citations?user=XDHn4yQAAAAJ&hl=en&authuser=1",
        scopusId: "57221230842",
        orcidId: "https://orcid.org/0000-0002-3643-0796",
        vidwanProfile: "175392",
        researchGateProfile: "AAH-6229-2021",
        publicationsCount: 0,
        booksCount: 1,
        patentsCount: 1,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: "The Robotics Society"
    },
    {
        sNo: 7,
        department: "ECE",
        facultyName: "Dr. N. Kaleeswari",
        designation: "HoD/ECE",
        qualification: "PhD",
        researchArea: "Applied Electronics",
        googleScholar: "https://scholar.google.com/citations?user=sSXzTEAAAAAJ&hl=en",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 0,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 8,
        department: "ECE",
        facultyName: "Mr. M. Sivakumar",
        designation: "AP/ECE",
        qualification: "M.E",
        researchArea: "Applied Electronics",
        googleScholar: "",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 0,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 9,
        department: "ECE",
        facultyName: "Mrs. Sangeetha Gopinath",
        designation: "AP/ECE",
        qualification: "M.E",
        researchArea: "Communication System",
        googleScholar: "",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 0,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 10,
        department: "ECE",
        facultyName: "Mrs. J. Angeline Felicia",
        designation: "AP/ECE",
        qualification: "M.E",
        researchArea: "Embedded System",
        googleScholar: "",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 0,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 11,
        department: "ECE",
        facultyName: "Dr. V. I Mebin Jose",
        designation: "ASP/ECE",
        qualification: "PhD",
        researchArea: "Applied Electronics",
        googleScholar: "",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 0,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 12,
        department: "ECE",
        facultyName: "Dr. S. Ayyappan",
        designation: "ASP/ECE",
        qualification: "PhD",
        researchArea: "Power Electronics and Drives",
        googleScholar: "https://scholar.google.com/citations?user=wGB8MSYAAAAJ&hl=en",
        scopusId: "",
        orcidId: "0000-0001-9197-1571",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 18,
        booksCount: 0,
        patentsCount: 2,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "1",
        memberships: "IAENG"
    },
    {
        sNo: 13,
        department: "BME",
        facultyName: "Dr. Vishnu Priya",
        designation: "Associate Professor",
        qualification: "PhD",
        researchArea: "Environmental Microbiology",
        googleScholar: "https://scholar.google.com/citations?user=ZbK8LGIAAAAJ&hl=en",
        scopusId: "",
        orcidId: "",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: "3 (1 Agri, 2 BME)",
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "1",
        memberships: ""
    },
    {
        sNo: 14,
        department: "MBA",
        facultyName: "S.Saira Banu",
        designation: "Assistant Professor",
        qualification: "",
        researchArea: "",
        googleScholar: "",
        scopusId: "57200230996",
        orcidId: "0000-0001-9670-4747",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 2,
        booksCount: 0,
        patentsCount: 1,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 15,
        department: "MBA",
        facultyName: "S.Manikandan",
        designation: "Assistant Professor",
        qualification: "BBA, MBA",
        researchArea: "Human Resource Management",
        googleScholar: "",
        scopusId: "",
        orcidId: "0009-0008-2395-863X",
        vidwanProfile: "",
        researchGateProfile: "",
        publicationsCount: 1,
        booksCount: 0,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "",
        memberships: ""
    },
    {
        sNo: 16,
        department: "CSE",
        facultyName: "Dr.B.Syed Moinuddin Bokhari",
        designation: "Head of the Department-IT",
        qualification: "Ph.D",
        researchArea: "Wireless communications and Networks, Artificial Intelligence and Machine Learning",
        googleScholar: "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=Cadu1ZsAAAAJ",
        scopusId: "56737100500",
        orcidId: "0000-0002-5527-2308",
        vidwanProfile: "https://vidwan.inflibnet.ac.in/profile/572273",
        researchGateProfile: "",
        publicationsCount: 4,
        booksCount: 1,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "Best Faculty award, NPTEL Elite award",
        memberships: "ISTE, IAENG, QCFI"
    },
    {
        sNo: 17,
        department: "CSE",
        facultyName: "Dr Senoj Joseph",
        designation: "Associate Professor",
        qualification: "Ph.D",
        researchArea: "VLSI, Deep learning",
        googleScholar: "https://scholar.google.com/citations?user=O5yYASsAAAAJ",
        scopusId: "https://www.webofscience.com/wos/author/record/149692",
        orcidId: "0000-0002-5782-5498",
        vidwanProfile: "",
        researchGateProfile: "hdr_xprf",
        publicationsCount: 0,
        booksCount: 1,
        patentsCount: 0,
        sponsoredProjects: 0,
        consultancyProjects: 0,
        awards: "NPTEL believer, NPTEL motivated learner, NPTEL discipline star",
        memberships: "ISTE life, IAENG, QCFI"
    }
];

const facultyPublicationsData = [
    {
        sNo: 1,
        faculty: "G.RanjithKumar",
        department: "EEE",
        publicationCategory: "Conference proceeding",
        title: "Machine Learning for Big Data Analytics: Challenges, Trends, and Future Research Directions",
        authors: "Alamelu R; Ranjithkumar G; Chandru K; Priya R V; Aparna P; M.G.Dinesh",
        journalConferenceBook: "2025 5th International Conference on Evolutionary Computing and Mobile Sustainable Networks (ICECMSN)",
        publisher: "IEEE",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "10.1109/ICECMSN68058.2025.11383119 / 979-8-3315-8242-5",
        indexing: "Scopus Indexed"
    },
    {
        sNo: 2,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Conference",
        title: "Internet of Medical Things Integrating IoT with Healthcare for Remote Monitoring and Diagnosis",
        authors: "Suganya R., P. Sasikala, G. Vijayakumari",
        journalConferenceBook: "ITM Web of Conferences",
        publisher: "EDP Sciences",
        year: "2025",
        volume: "Volume 76, 2025",
        issue: "ITM Web Conf. Volume 76, 2025 (ICSICE-2025)",
        pageNo: "9",
        doiIsbn: "https://doi.org/10.1051/itmconf/20257603004",
        indexing: "Scopus"
    },
    {
        sNo: 3,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Conference",
        title: "Maximum Power Point Tracking Operation of PV System under Partial Shading Conditions by Using AOOA-Based Boost Converter",
        authors: "D.K. Singh et al.",
        journalConferenceBook: "IEEE SEFET 2025",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "https://doi.org/10.1109/SEFET65155.2025.11255406",
        indexing: "IEEE Xplore, Scopus"
    },
    {
        sNo: 4,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Conference",
        title: "Super Twisting Sliding Mode Controllers Based Grid Connected Hybrid Renewable Energy Sources Operated Power Supply System",
        authors: "K. Mondal et al.",
        journalConferenceBook: "IEEE ICOCT 2025",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "https://doi.org/10.1109/ICOCT64433.2025.11118849",
        indexing: "IEEE Xplore, Scopus"
    },
    {
        sNo: 5,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Journal",
        title: "A Powerful Peripheral Arterial Disease Detection Using Machine Learning-Based Severity Level Classification Model and Hyperparameter Optimization Methods",
        authors: "P. Sasikala, A. Mohanarathinam",
        journalConferenceBook: "Biomedical Signal Processing and Control",
        publisher: "Elsevier",
        year: "2024",
        volume: "90",
        issue: "105842",
        pageNo: "-",
        doiIsbn: "https://doi.org/10.1016/j.bspc.2023.105842",
        indexing: "SCI, SCI-E, Scopus, Q1"
    },
    {
        sNo: 6,
        faculty: "Dr. N. Kaleeswari",
        department: "ECE",
        publicationCategory: "Book Chapter",
        title: "Cyber Physical Energy system: AI and IoT for smart grids and sustainable Network",
        authors: "Dr. N. Kaleeswari",
        journalConferenceBook: "Book Chapter",
        publisher: "Acceptance mail received",
        year: "2026-2027",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Under Process"
    },
    {
        sNo: 7,
        faculty: "Dr. V.I. Mebin Jose",
        department: "ECE",
        publicationCategory: "Journal",
        title: "Dual Scale Boundary-Aware Vision Transformation for federated Echocardiographic Segmentation in Myocardial Infraction Diagnosis",
        authors: "Dr. V.I. Mebin Jose",
        journalConferenceBook: "Journal",
        publisher: "Springer-Machine Vision and application",
        year: "2026-2027",
        volume: "-",
        issue: "With Editor",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Under Review"
    },
    {
        sNo: 8,
        faculty: "Dr. S. Ayyappan",
        department: "ECE",
        publicationCategory: "Journal",
        title: "Emerging Trends in Electrical Engineering: Integrating smart Grid technologies, Automobiles and artificial Intelligence for sustainable power systems",
        authors: "Dr. S. Ayyappan",
        journalConferenceBook: "Journal",
        publisher: "Cerebration Science Publishing - The International Journal of Computer Information Systems and Industrial Management Applications",
        year: "2026-2027",
        volume: "-",
        issue: "Acceptance mail received",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Scopus Indexed"
    },
    {
        sNo: 9,
        faculty: "Dr. S. Ayyappan",
        department: "ECE",
        publicationCategory: "Journal",
        title: "Design Of PLC-Based Automation For A 2-Ton Hydraulic Press For Bearing Assembly Applications",
        authors: "Dr. S. Ayyappan",
        journalConferenceBook: "Journal",
        publisher: "Science Direct-Measurements",
        year: "2026-2027",
        volume: "-",
        issue: "With Editor",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Under Review"
    },
    {
        sNo: 10,
        faculty: "Dr. S. Ayyappan",
        department: "ECE",
        publicationCategory: "Book",
        title: "Electrical Machines-II",
        authors: "Dr. S. Ayyappan",
        journalConferenceBook: "Book",
        publisher: "Skyline Global Publication",
        year: "2026-2027",
        volume: "-",
        issue: "Under Process",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Textbook"
    },
    {
        sNo: 11,
        faculty: "Mr. Bose V V",
        department: "ECE",
        publicationCategory: "Conference",
        title: "A Compact Proximity-Coupled Antenna Array for Multi Band 5G and 6G Wireless Communication Systems",
        authors: "Mr. Bose V V et al.",
        journalConferenceBook: "ICECST 2025",
        publisher: "IEEE Xplore",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "979-8-3315-9480-0",
        indexing: "IEEE Xplore"
    },
    {
        sNo: 12,
        faculty: "Mrs. Angeline Felicia J",
        department: "ECE",
        publicationCategory: "Journal",
        title: "White Shark Optimization based routing protocol for reducing End to End Delay in MANET",
        authors: "Angeline Felicia et al.",
        journalConferenceBook: "IJATEM",
        publisher: "IJATEM",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "2583-7052",
        indexing: "Google Scholar Indexed"
    },
    {
        sNo: 13,
        faculty: "Dr. Vishnupriya",
        department: "BME",
        publicationCategory: "Journal",
        title: "Development of Polysaccharide-Based Hydrogels Infused with Natural Antifungal Extracts for Crop Protection",
        authors: "Dr. K. Thenmozhi, Dr. M. Vishnu Priya, Dr. Jayanand Sambhaji Khandagale, Dr. T. Sivaprakasam, Dr. Bhawana Bisht, Pooran Pragnya",
        journalConferenceBook: "JOURNAL OF APPLIED BIOANALYSIS",
        publisher: "JOURNAL OF APPLIED BIOANALYSIS",
        year: "2025",
        volume: "11",
        issue: "10",
        pageNo: "521-529",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 14,
        faculty: "Dr. Vishnupriya",
        department: "BME",
        publicationCategory: "Journal",
        title: "Engineering Sustainable Supply Chain Optimization in Resource-Constrained Environments: A Geo-Spatial and AI-Based Data Science Perspective.",
        authors: "P. Swathi, M. Vishnu Priya, K. Rajaprian, R.A Manoj Kumar",
        journalConferenceBook: "Advances in Consumer Research",
        publisher: "Advances in Consumer Research",
        year: "2025",
        volume: "2",
        issue: "5",
        pageNo: "2079-2086",
        doiIsbn: "-",
        indexing: "UGC Care"
    },
    {
        sNo: 15,
        faculty: "Dr. Vishnupriya",
        department: "BME",
        publicationCategory: "Journal",
        title: "Green Solutions: Handmade Paper from the Invasive Weed Artemisia Absinthium",
        authors: "Dr. M. Vishnu Priya, Dr. K. Rajaprian, Mr. S. Arul",
        journalConferenceBook: "Scope",
        publisher: "Scope",
        year: "2024",
        volume: "14",
        issue: "3",
        pageNo: "280-290",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 16,
        faculty: "Mr. K. Chandru",
        department: "BME",
        publicationCategory: "IEEE Conference",
        title: "Machine learning for big data analytics challenges, trends and futures research directions",
        authors: "Mr. K. Chandru, Dr. M.G. Dinesh, Ranjith kumar G",
        journalConferenceBook: "IEEE Conference",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "IEEE Xplore, Scopus"
    },
    {
        sNo: 17,
        faculty: "S.Saira Banu",
        department: "MBA",
        publicationCategory: "Peer Reviewed Journal",
        title: "A Review on Data Security in Information Management using Digitized Technology",
        authors: "S.Saira Banu, S.M.Saia Rekha",
        journalConferenceBook: "International Journal for Research in AppliedScience and Engineering Technology",
        publisher: "International Journal for Research in AppliedScience and Engineering Technology",
        year: "2024",
        volume: "12",
        issue: "11",
        pageNo: "-",
        doiIsbn: "2321-9653",
        indexing: "UGC Care"
    },
    {
        sNo: 18,
        faculty: "S.Saira Banu",
        department: "MBA",
        publicationCategory: "Peer Reviewed Journal",
        title: "A Study on Determinants of Employee Turnover in the Workplace Environment",
        authors: "S.Saira Banu",
        journalConferenceBook: "International Journal for Research in AppliedScience and Engineering Technology",
        publisher: "International Journal for Research in AppliedScience and Engineering Technology",
        year: "2025",
        volume: "13",
        issue: "6",
        pageNo: "-",
        doiIsbn: "2321-9653",
        indexing: "UGC Care"
    },
    {
        sNo: 19,
        faculty: "S.Manikandan",
        department: "MBA",
        publicationCategory: "Peer Reviewed Journal",
        title: "Optimizing DecisionMaking inBusiness Management using Mathematical Modeling and Data Analysis",
        authors: "S.Manikandan",
        journalConferenceBook: "InternationalJournal of ScientificResearch in Engineering and Management",
        publisher: "InternationalJournal of ScientificResearch in Engineering and Management",
        year: "2025",
        volume: "9",
        issue: "7",
        pageNo: "-",
        doiIsbn: "2582-3930",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 20,
        faculty: "Srikanth C Nair",
        department: "MBA",
        publicationCategory: "Peer Reviewed Journal",
        title: "DigitalTransformation in SMES: Change Management Opportunities and Challenges",
        authors: "Manikandan.S, Sriikant C Nair, Divya U",
        journalConferenceBook: "International Journal of Progressive Research in Engineering Management",
        publisher: "International Journal of Progressive Research in Engineering Management",
        year: "2026",
        volume: "10",
        issue: "6",
        pageNo: "-",
        doiIsbn: "2583-1062",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 21,
        faculty: "Srikanth C Nair",
        department: "MBA",
        publicationCategory: "Peer Reviewed Journal",
        title: "FOMA Marketing an its Psychological Effects on GenZ Digital Consumption Patterns",
        authors: "Srikanth C Nair",
        journalConferenceBook: "InternationalJournal of ScientificResearch in Engineering and Management",
        publisher: "InternationalJournal of ScientificResearch in Engineering and Management",
        year: "2026",
        volume: "10",
        issue: "2",
        pageNo: "-",
        doiIsbn: "2582-3930",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 22,
        faculty: "Dr. J. Shiama",
        department: "S&H",
        publicationCategory: "Journal",
        title: "Stationary Performance Evaluation of an M/M/2 Queue with Constant Retrials and State-Dependent Service Rate",
        authors: "Dr. J. Shiama",
        journalConferenceBook: "Journal",
        publisher: "-",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 23,
        faculty: "A. Elcy",
        department: "S&H",
        publicationCategory: "International Journal",
        title: "Advances and Applications of Graph Theory in Computing",
        authors: "A.Elcy, K.Vijaya, V.Nandhini",
        journalConferenceBook: "IJRASET",
        publisher: "IJRASET",
        year: "2025",
        volume: "13",
        issue: "VIII",
        pageNo: "321-9653",
        doiIsbn: "https://doi.org/10.22214/ijraset.2025.73671",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 24,
        faculty: "A. Elcy",
        department: "S&H",
        publicationCategory: "International Journal",
        title: "Enhancing Modern Computer Networks through Operations Research Methods",
        authors: "A.Elcy, V.Nandhini, K.vijaya",
        journalConferenceBook: "International Journal",
        publisher: "-",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Peer Reviewed Journal"
    },
    {
        sNo: 25,
        faculty: "A. Elcy",
        department: "S&H",
        publicationCategory: "Conference",
        title: "Stationary Analysis of the Characteristics of the M/M/2 Queue with Constant Repeated Attempts and State Dependent Service Rate",
        authors: "Nandhini Varatharajan, Vigneshwar, S.V.Manisekaran, Elcy.A, Muneeshwaran V, N.K.Karthikeyan, Srishana",
        journalConferenceBook: "ICCRET 2025",
        publisher: "ICCRET",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "104",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 26,
        faculty: "Dr. P. Dhivya",
        department: "S&H",
        publicationCategory: "International Journal",
        title: "Role of pH in Modulating the Physicochemical Properties of Erbium-doped MoO3/SiO2 Nanoparticles",
        authors: "L Jayanthi, P Dhivya, K Kalaivani, M Elango",
        journalConferenceBook: "J. Environ. Nanotechnol",
        publisher: "J. Environ. Nanotechnol",
        year: "2025",
        volume: "14",
        issue: "3",
        pageNo: "744-749",
        doiIsbn: "https://nanoient.org/journals/index.php/jent/article/view/2503",
        indexing: "Journal"
    },
    {
        sNo: 27,
        faculty: "Dr. B. Syed Moinuddin Bokhari",
        department: "CSE",
        publicationCategory: "Scopus indexed - International Conference",
        title: "Predicting Side Effects of Drug Reactions Using Machine Learning and Graph Neural Network",
        authors: "Dr Syed Moinuddin Bokhari",
        journalConferenceBook: "IEEE Xplore",
        publisher: "IEEE",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 28,
        faculty: "Dr. B. Syed Moinuddin Bokhari",
        department: "CSE",
        publicationCategory: "Scopus indexed - International Conference",
        title: "SMART HELMET : IOT Enabled Helmet For Safety and Accident Detection",
        authors: "Dr Syed Moinuddin Bokhari",
        journalConferenceBook: "IEEE Xplore",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 29,
        faculty: "Dr. B. Syed Moinuddin Bokhari",
        department: "CSE",
        publicationCategory: "Scopus indexed - International Conference",
        title: "Novel and Efficient classification of cardiovascular Abnormalities by Machine learning",
        authors: "Dr Syed Moinuddin Bokhari",
        journalConferenceBook: "IEEE Xplore",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 30,
        faculty: "Dr. B. Syed Moinuddin Bokhari",
        department: "CSE",
        publicationCategory: "Scopus indexed - International Conference",
        title: "Designing A Smart Device for Speech Stammer Detection Features based on Artificial Neural Network",
        authors: "Dr Syed Moinuddin Bokhari",
        journalConferenceBook: "IEEE Xplore",
        publisher: "IEEE",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Scopus"
    },
    {
        sNo: 31,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Supply Chain Performance with Disruption Considerations and the Impact of the Black Box of Supply Chain Resilience",
        authors: "Dr P Sasikala",
        journalConferenceBook: "2nd National Level Conference on Intelligent Biosystems for Healthcare Analytics at Karpagam Academy of Higher Education",
        publisher: "Karpagam Academy",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "ISBN: 978-81-956215-7-6",
        indexing: "Scopus"
    },
    {
        sNo: 32,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Using Digital Twins to Improve Computational Resource Management and Ai-Enabled Healthcare in Task Offloading Techniques",
        authors: "Dr P Sasikala, Ms.R.Mahalaxmi, Ms.N.Amutha",
        journalConferenceBook: "2nd National Level Conference on Intelligent Biosystems for Healthcare Analytics at Karpagam Academy of Higher Education",
        publisher: "Karpagam Academy",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "ISBN: 978-81-956215-7-6",
        indexing: "Scopus"
    },
    {
        sNo: 33,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Scopus indexed - International Conference",
        title: "Internet of Medical Things Integrating IOT with Healthcare for Remote Monitoring and Diagnosis",
        authors: "Dr P Sasikala",
        journalConferenceBook: "ITM Web of Conferences of the Harnessing Innovation for Sustainability in computing and Engineering Solutions (ICSICE - 2025)",
        publisher: "ITM",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "eISSN: 2271-2097",
        indexing: "Scopus"
    },
    {
        sNo: 34,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "BIG Data Analytics for Enhancing Intrusion Detection Systems",
        authors: "Dr P Sasikala",
        journalConferenceBook: "International Conference on Innovations in Engineering Computing and Smart Technologies (ICIECST - 2025)",
        publisher: "ICIECST",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 35,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "BIG AI-Powered Retinal Analysis for Early Screening of Neurodegenerative Diseases",
        authors: "Dr P Sasikala",
        journalConferenceBook: "International Conference on Innovations in Engineering Computing and Smart Technologies (ICIECST - 2025)",
        publisher: "ICIECST",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 36,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Smart Accident Detection and Tracking Framework for Vehicles Using IOT Technologies",
        authors: "Dr P Sasikala",
        journalConferenceBook: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI’25)",
        publisher: "ICETAI",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 37,
        faculty: "Ms. R. Mahalaxmi",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Using Digital Twins to Improve Computational Resource Management and Ai-Enabled Healthcare in Task Offloading Techniques",
        authors: "Dr P Sasikala, Ms.R.Mahalaxmi, Ms.N.Amutha",
        journalConferenceBook: "2nd National Level Conference on Intelligent Biosystems for Healthcare Analytics at Karpagam Academy of Higher Education",
        publisher: "Karpagam Academy",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "ISBN: 978-81-956215-7-6",
        indexing: "Scopus"
    },
    {
        sNo: 38,
        faculty: "Ms. N. Amutha",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Using Digital Twins to Improve Computational Resource Management and Ai-Enabled Healthcare in Task Offloading Techniques",
        authors: "Dr P Sasikala, Ms.R.Mahalaxmi, Ms.N.Amutha",
        journalConferenceBook: "2nd National Level Conference on Intelligent Biosystems for Healthcare Analytics at Karpagam Academy of Higher Education",
        publisher: "Karpagam Academy",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "ISBN: 978-81-956215-7-6",
        indexing: "Scopus"
    },
    {
        sNo: 39,
        faculty: "Ms. R. Mahalaxmi",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Retinal scanning to detect diseases",
        authors: "Ms.R.Mahalaxmi",
        journalConferenceBook: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI’25)",
        publisher: "ICETAI",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 40,
        faculty: "Ms. R. Mahalaxmi",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "A review of wearable and ambulatory system for healthcare application that use microcontrollers for embedded machine learning",
        authors: "Ms.R.Mahalaxmi",
        journalConferenceBook: "National Level Conference on Intelligent Biosystems for Healthcare Analytics",
        publisher: "-",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 41,
        faculty: "Ms. N. Amutha",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "LightWeight and high Accurate RR Interval Compensation for Signals from Wearable ECG Sensors.",
        authors: "Ms.N.Amutha",
        journalConferenceBook: "National Level Conference on Intelligent Biosystems for Healthcare Analytics",
        publisher: "-",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 42,
        faculty: "Ms. N. Amutha",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Smart Medical Diagnosis Prediction System with Symptom Analysis Using Random Forest Algorithm",
        authors: "Ms.N.Amutha",
        journalConferenceBook: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI’25)",
        publisher: "ICETAI",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 43,
        faculty: "Ms. Divya V",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Strategies for Mitigating Game Addiction",
        authors: "Ms.Divya V",
        journalConferenceBook: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI’25)",
        publisher: "ICETAI",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 44,
        faculty: "Mr. Dinesh Babu K J",
        department: "CSE",
        publicationCategory: "Book chapter",
        title: "Optimizing Resource Utilization in Food Waste Management Through Full Stack Development",
        authors: "Mr.Dinesh Babu K J",
        journalConferenceBook: "International Conference on Emerging Trends in Artificial Intelligence (ICETAI’25)",
        publisher: "ICETAI",
        year: "2025",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Conference Proceeding"
    },
    {
        sNo: 45,
        faculty: "Dr. B. Syed Moinuddin Bokhari",
        department: "CSE",
        publicationCategory: "Book",
        title: "Artificial Intelligence and Machine learning for Cloud applications",
        authors: "Dr.B.Syed Moinuddin Bokhari, Mr.V.Abhijith, Mrs.K.Shamini, Dr.Senoj Joseph, Ms.S.Divya",
        journalConferenceBook: "Book",
        publisher: "RK publishers",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Textbook"
    },
    {
        sNo: 46,
        faculty: "Dr. Senoj Joseph",
        department: "CSE",
        publicationCategory: "Book",
        title: "Artificial Intelligence and Machine learning for Cloud applications",
        authors: "Dr.B.Syed Moinuddin Bokhari, Mr.V.Abhijith, Mrs.K.Shamini, Dr.Senoj Joseph, Ms.S.Divya",
        journalConferenceBook: "Book",
        publisher: "RK publishers",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Textbook"
    },
    {
        sNo: 47,
        faculty: "Dr. S. Prem Anand",
        department: "CSE",
        publicationCategory: "Book",
        title: "Cyber Security Concepts with Standards and Governance Frameworks",
        authors: "Mr. S. Balaji, Dr. S. Prem Anand, Mrs. P. Jothi, Mrs. D. Francilin Doli",
        journalConferenceBook: "Cyber Security Concepts with Standards and Governance Frameworks",
        publisher: "Yatiraja Scholarly Press",
        year: "2026",
        volume: "-",
        issue: "-",
        pageNo: "-",
        doiIsbn: "-",
        indexing: "Book"
    }
];

const facultyPhdData = [
    {
        sNo: 1,
        facultyName: "Mr.Ranjithkumar.G",
        department: "EEE",
        dateOfRegistration: "01.02.2025",
        phdProgramDetails: "Electrical Engineering",
        researchAreas: "Power Systems",
        researchSupervisors: "Dr.S.JaiSiva",
        status: "Pursuing"
    },
    {
        sNo: 2,
        facultyName: "Ms.Indumathi.R",
        department: "EEE",
        dateOfRegistration: "28.01.2021",
        phdProgramDetails: "Electrical Engineering",
        researchAreas: "Power Systems",
        researchSupervisors: "Dr.A.Lakshmanan",
        status: "Pursuing"
    },
    {
        sNo: 3,
        facultyName: "Mr.Nagarajan.D",
        department: "EEE",
        dateOfRegistration: "10.02.2016",
        phdProgramDetails: "Electrical Engineering",
        researchAreas: "Power Systems",
        researchSupervisors: "Dr.B.Nagaraj",
        status: "Pursuing"
    },
    {
        sNo: 4,
        facultyName: "Mr.Nithiyanantham.G",
        department: "EEE",
        dateOfRegistration: "06.09.2020",
        phdProgramDetails: "Electrical Engineering",
        researchAreas: "Power Electronics",
        researchSupervisors: "Dr.N.Sudhakar",
        status: "Pursuing"
    },
    {
        sNo: 5,
        facultyName: "Dr. P. Sasikala",
        department: "CSE",
        dateOfRegistration: "Jun-19",
        phdProgramDetails: "Ph.D. in Information & Communication Engineering, KAHE. Topic: Efficient AI Mechanisms for Heart Disease Prediction & Severity Analysis",
        researchAreas: "Artificial Intelligence, Machine Learning, Deep Learning, Healthcare Analytics, Medical Image Processing, IoMT, Smart Healthcare",
        researchSupervisors: "Dr. A. Mohanarathinam",
        status: "Completed"
    },
    {
        sNo: 6,
        facultyName: "Dr S Prem Anand",
        department: "CSE",
        dateOfRegistration: "Jun-17",
        phdProgramDetails: "Faculty of Mechanical Engineering",
        researchAreas: "Optimization E-Vehicle",
        researchSupervisors: "Dr S Jaganathan",
        status: "Completed"
    },
    {
        sNo: 7,
        facultyName: "Dr. N. Kaleeswari",
        department: "ECE",
        dateOfRegistration: "2011",
        phdProgramDetails: "Information and Communication Engineering",
        researchAreas: "Wireless Communication",
        researchSupervisors: "Dr. K. Baskar",
        status: "Completed"
    },
    {
        sNo: 8,
        facultyName: "Dr. V.I Mebin Jose",
        department: "ECE",
        dateOfRegistration: "2016",
        phdProgramDetails: "Applied Electronics - Information Technology",
        researchAreas: "Medical Imaging",
        researchSupervisors: "Dr. Arumugam Marriyadevi",
        status: "Completed"
    },
    {
        sNo: 9,
        facultyName: "Dr. S. Ayyappan",
        department: "ECE",
        dateOfRegistration: "2020",
        phdProgramDetails: "Electrical Engineering",
        researchAreas: "Electric Vehicle",
        researchSupervisors: "Dr. R. Lal Raja Singh",
        status: "Completed"
    },
    {
        sNo: 10,
        facultyName: "Mr. K. Chandru",
        department: "BME",
        dateOfRegistration: "Jan 2025",
        phdProgramDetails: "Anna University",
        researchAreas: "Power System",
        researchSupervisors: "Dr. S. Muthu Vijaya Pandian",
        status: "Confirmation Completed"
    },
    {
        sNo: 11,
        facultyName: "S.Saira Banu",
        department: "MBA",
        dateOfRegistration: "Jan-25",
        phdProgramDetails: "PhD in Management",
        researchAreas: "Human Resource Management",
        researchSupervisors: "Dr.Khalid Waheed, Associate Professor, Dept of Management Studies, Crescent Institute of Science and Technology",
        status: "Pursuing"
    },
    {
        sNo: 12,
        facultyName: "S.Manikandan",
        department: "MBA",
        dateOfRegistration: "Jan-22",
        phdProgramDetails: "PhD in Management",
        researchAreas: "Human Resource Management",
        researchSupervisors: "Dr.P.Easwareen, Associate Professor, Dept of Commerce, Karpagam Academy of Higher Education",
        status: "Pursuing"
    }
];

const facultyPatentsData = [
    {
        sNo: 1,
        faculty: "Dr.P.Manju",
        department: "EEE",
        patents: 1,
        patentTitle: "Machine Learning Driven Adaptive Energy Optimization Architecture for Enchancing Electric Vehicle Battery Longevity and Driving Efficiency",
        inventors: "N. Narendiran, Srinivasan P, A. Ferminus Raj, Prabhu M. S, P. Manju, J. Karthika, D. Shyam, M. Balamurugan, Arjun Kumar G. B, Dhanaselvam J, Ajith. B. Singh, M. Thirunavukkarasu",
        applicationNumber: "202541123934 A",
        status: "Published",
        grantDate: "2/1/2026"
    },
    {
        sNo: 2,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "Intelligent Parking Solution for Sustainable Mobility Using IoT-Based Sensor and LoRaWAN Wireless Technology",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202441087206 A",
        status: "Published",
        grantDate: "22-Nov-24"
    },
    {
        sNo: 3,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "IoT Enabled Design Thinking Approach on Meat Spoilage Detection System Inside the Refrigerator Using Cloud Computing and AI",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202441101711 A",
        status: "Published",
        grantDate: "3-Jan-25"
    },
    {
        sNo: 4,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "Integrated Network and Energy Resource Hub AI for Medical Emergencies",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202441107672 A",
        status: "Published",
        grantDate: "24/1/2025"
    },
    {
        sNo: 5,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "Integrating Ultrasonic and X-ray sensors with AI for Robust Damage Detection in Bulletproof Materials",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202541018573 A",
        status: "Published",
        grantDate: "14/3/2025"
    },
    {
        sNo: 6,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "Iot-Enabled Machine Learning Framework for Automated Kidney Stone Detection using Medical Image Processing",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202521115148 A",
        status: "Published",
        grantDate: "2/12/2025"
    },
    {
        sNo: 7,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Granted",
        patentTitle: "Machine Learning-Based Healthcare Diagnosis Device",
        inventors: "P. Sasikala et al.",
        applicationNumber: "6494517",
        status: "Granted",
        grantDate: "08 January 2026"
    },
    {
        sNo: 8,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Granted",
        patentTitle: "AI-Based Diabetes Prediction and Monitoring Device",
        inventors: "P. Sasikala et al.",
        applicationNumber: "6489477",
        status: "Granted",
        grantDate: "08 December 2025"
    },
    {
        sNo: 9,
        faculty: "Dr. P. Sasikala",
        department: "CSE",
        patents: "Utility",
        patentTitle: "Digital Interview and Evaluation Platform for Significant Roles",
        inventors: "P. Sasikala et al.",
        applicationNumber: "202641034571a",
        status: "Published",
        grantDate: "3-Apr-26"
    },
    {
        sNo: 10,
        faculty: "Dr S Prem Anand",
        department: "CSE",
        patents: "Utility",
        patentTitle: "AI BASED SOLAR ASSISTED ELECTRIC TRICYCLE FOR MOBILITY SUPPORT OF PHYSICALLY CHALLENGED PERSONS",
        inventors: "Dr S Prem Anand",
        applicationNumber: "202641046501 A",
        status: "Published",
        grantDate: "24/04/2026"
    },
    {
        sNo: 11,
        faculty: "Mr. K. Chandru",
        department: "BME",
        patents: "Utility",
        patentTitle: "KNN Based smart BMI Monitoring system",
        inventors: "Mr. K. Chandru",
        applicationNumber: "202541030778A",
        status: "Published",
        grantDate: "-"
    },
    {
        sNo: 12,
        faculty: "S.Saira Banu",
        department: "MBA",
        patents: 1,
        patentTitle: "AI-Driven Conflict Resolution and Negotiation Assistant for Human Resource Mnagement",
        inventors: "Madan Kumar.C, Dr.S.Saira B",
        applicationNumber: "20251115768",
        status: "Published",
        grantDate: ""
    },
    {
        sNo: 13,
        faculty: "A.Elcy",
        department: "S&H",
        patents: 1,
        patentTitle: "Biometric Authentication Device for Secure Transactions",
        inventors: "Ms.K.Vijaya, Ms.V.Nagarani, Ms.A.Elcy, Ms.V.nandhini, Ms.N.Sujithra",
        applicationNumber: "424952-001",
        status: "Published",
        grantDate: "10/24/2024"
    },
    {
        sNo: 14,
        faculty: "Ms. N. Amutha",
        department: "CSE",
        patents: 1,
        patentTitle: "Cloud Enhanced Machine Learning and wireless sensor networks for pollution prediction and management in Smart cities",
        inventors: "Ms. N. Amutha",
        applicationNumber: "202511003284",
        status: "Published",
        grantDate: "-"
    }
];

const departmentResearchData = [
    {
        sNo: 1,
        department: "Agri",
        overview: "The Department of Agricultural Engineering is committed to developing practical and innovative solutions for modern agriculture. Our research focuses on areas such as farm machinery, irrigation, renewable energy, precision farming, post-harvest technology, and sustainable resource management. Faculty and students work together on research projects, publish in reputed journals, and collaborate with industries and research organizations. Through research and innovation, the department aims to improve agricultural productivity, promote sustainable farming practices, and support the needs of farmers and society.",
        domains: "Precision Agriculture, Farm Machinery, Soil Water Conservation, Renewable Energy, Food Processing, Post Harvest Technology, Remote Sensing and GIS",
        interests: "Renewable Energy, Precision Agriculture, Soil Water Conservation, Farm Machinery",
        ongoingProjects: 3,
        completedProjects: 4,
        sponsoredProjects: 1,
        publications: 3,
        patents: 2,
        books: 2,
        laboratories: "1"
    },
    {
        sNo: 2,
        department: "Civil",
        overview: "The Department of Civil Engineering is committed to advancing research that supports sustainable infrastructure and environmental management. The department focuses on areas such as structural engineering, transportation, geotechnical engineering, water resources, environmental engineering, and construction management. Faculty and students actively engage in research projects, publish in reputed journals, and collaborate with industry and research organizations. Through innovation and practical solutions, the department aims to address real-world engineering challenges and contribute to the development of safe, resilient, and sustainable infrastructure.",
        domains: "Building Materials and Concrete Technology, Construction Engineering and Management",
        interests: "Building Materials and Concrete Technology, Structural Engineering, Construction Engineering and Management",
        ongoingProjects: 2,
        completedProjects: 4,
        sponsoredProjects: 0,
        publications: 7,
        patents: 0,
        books: 3,
        laboratories: "1"
    },
    {
        sNo: 3,
        department: "CSE",
        overview: "The department actively promotes interdisciplinary research in Cyber Security, Artificial Intelligence, Machine Learning, Internet of Things, Smart Healthcare, Cloud Computing and Sustainable Computing through faculty publications, patents, funded initiatives and student innovation.",
        domains: "Cyber Security, Artificial Intelligence, Machine Learning, Deep Learning, IoT, IoMT, Cloud Computing, Network Security, Digital Forensics, Edge AI",
        interests: "Artificial Intelligence, Machine Learning, Cyber Security, Deep Learning, IoT, IoMT, Cloud Computing, Network Security, NLP, Embedded Systems",
        ongoingProjects: "AI-enabled Cyber Security Systems; Smart Healthcare using IoMT; Intelligent Transportation; Secure Cloud Computing",
        completedProjects: "Research in AI, Cyber Security, IoT, Smart Healthcare, Energy Optimization and Intelligent Systems completed by faculty members",
        sponsoredProjects: 0,
        publications: 4,
        patents: 9,
        books: 2,
        laboratories: "Cyber Security Laboratory"
    },
    {
        sNo: 4,
        department: "MBA",
        overview: "The Department of Management Studies (MBA) is committed to advancing research in core management domains including Human Resource Management, Strategic Management, Marketing, and Financial Systems to drive organizational excellence and innovation.",
        domains: "Human Resource Management",
        interests: "Human Resource Management",
        ongoingProjects: 2,
        completedProjects: 2,
        sponsoredProjects: 0,
        publications: 5,
        patents: 1,
        books: 0,
        laboratories: "Management & Business Analytics Lab"
    },
    {
        sNo: 5,
        department: "IT",
        overview: "Research in the Department of Information Technology spans a wide range of contemporary areas, with a strong focus on Artificial Intelligence, Machine Learning, and Data Science, which are applied to fields like healthcare, computer vision, and cloud computing.",
        domains: "Cloud Computing, Intelligent Automation, Web Technologies",
        interests: "Deep learning, Artificial Intelligence and Machine learning",
        ongoingProjects: "Artificial intelligence and Data Science",
        completedProjects: 0,
        sponsoredProjects: 0,
        publications: 4,
        patents: 0,
        books: 5,
        laboratories: "Information Technology Research Lab"
    }
];

const studentResearchData = [
    { sNo: 1, studentName: "Aakash A", registerNo: "720522149001", department: "CSE", academicYear: "2025–2026", projectTitle: "Detection of Offensive Messages in Social Media", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at International Conference on Explainable AI, Green Edge Computing and Autonomous Systems (ICXGA–2K26), Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 2, studentName: "Karkannan P", registerNo: "720522149014", department: "CSE", academicYear: "2025–2026", projectTitle: "Detection of Offensive Messages in Social Media", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 3, studentName: "Sanjay S", registerNo: "720522149031", department: "CSE", academicYear: "2025–2026", projectTitle: "Detection of Offensive Messages in Social Media", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 4, studentName: "Abunavas J", registerNo: "720522149002", department: "CSE", academicYear: "2025–2026", projectTitle: "Live Network Traffic Attack Prediction Using TGNN", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 5, studentName: "Hariprasath R", registerNo: "720522149010", department: "CSE", academicYear: "2025–2026", projectTitle: "Live Network Traffic Attack Prediction Using TGNN", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 6, studentName: "Kaviyarasan K", registerNo: "720522149015", department: "CSE", academicYear: "2025–2026", projectTitle: "Live Network Traffic Attack Prediction Using TGNN", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 7, studentName: "Gowsigan G", registerNo: "720522149008", department: "CSE", academicYear: "2025–2026", projectTitle: "Malware Detection with Explainability", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 8, studentName: "Praveen E", registerNo: "720522149025", department: "CSE", academicYear: "2025–2026", projectTitle: "Malware Detection with Explainability", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 9, studentName: "Vijay S", registerNo: "720522149041", department: "CSE", academicYear: "2025–2026", projectTitle: "Malware Detection with Explainability", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 10, studentName: "Mathesh V", registerNo: "720522149019", department: "CSE", academicYear: "2025–2026", projectTitle: "Medical Knowledge Chatbot using RAG", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 11, studentName: "Saratha Devi N", registerNo: "720522149032", department: "CSE", academicYear: "2025–2026", projectTitle: "Medical Knowledge Chatbot using RAG", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 12, studentName: "Kamalakkannan B", registerNo: "720522149013", department: "CSE", academicYear: "2025–2026", projectTitle: "Medical Knowledge Chatbot using RAG", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 13, studentName: "Manikandan M", registerNo: "720522149018", department: "CSE", academicYear: "2025–2026", projectTitle: "Insider Threat Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 14, studentName: "Mukil M", registerNo: "720522149021", department: "CSE", academicYear: "2025–2026", projectTitle: "Insider Threat Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 15, studentName: "Yuva Ritheesh Kumar S", registerNo: "720522149043", department: "CSE", academicYear: "2025–2026", projectTitle: "Insider Threat Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. T. Kalaiselvi" },
    { sNo: 16, studentName: "Nighil G", registerNo: "720522149022", department: "CSE", academicYear: "2025–2026", projectTitle: "AI-Based Fake Profile Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 17, studentName: "Vignesh S", registerNo: "720522149040", department: "CSE", academicYear: "2025–2026", projectTitle: "AI-Based Fake Profile Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 18, studentName: "Mavin S", registerNo: "720522149020", department: "CSE", academicYear: "2025–2026", projectTitle: "AI-Based Fake Profile Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 19, studentName: "Nitheeshwaran M", registerNo: "720522149024", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Keylogger Detection System", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 20, studentName: "Vijayaragavan N", registerNo: "720522149042", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Keylogger Detection System", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 21, studentName: "Keerthika V", registerNo: "720522149016", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Keylogger Detection System", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 22, studentName: "Rajshree G", registerNo: "720522149028", department: "CSE", academicYear: "2025–2026", projectTitle: "Sentinel AI: A Hybrid Cybersecurity Assistant", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 23, studentName: "Rubiya V", registerNo: "720522149030", department: "CSE", academicYear: "2025–2026", projectTitle: "Sentinel AI: A Hybrid Cybersecurity Assistant", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 24, studentName: "Aadhithyaa N", registerNo: "720522149003", department: "CSE", academicYear: "2025–2026", projectTitle: "Credit Card Fraud Detection Using Machine Learning", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 25, studentName: "Anbuselvan P", registerNo: "720522149005", department: "CSE", academicYear: "2025–2026", projectTitle: "Credit Card Fraud Detection Using Machine Learning", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 26, studentName: "Nishanthini A", registerNo: "720522149023", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Detection of Living-off-the-Land (LotL) Attacks Using Behavioral Sequence Learning", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 27, studentName: "Rohith C", registerNo: "720522149029", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Detection of Living-off-the-Land (LotL) Attacks Using Behavioral Sequence Learning", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 28, studentName: "Sathya Priya S", registerNo: "720522149034", department: "CSE", academicYear: "2025–2026", projectTitle: "Real-Time Detection of Living-off-the-Land (LotL) Attacks Using Behavioral Sequence Learning", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. S. Prem Anand" },
    { sNo: 29, studentName: "Gurubharath S", registerNo: "720522149009", department: "CSE", academicYear: "2025–2026", projectTitle: "Blockchain-Based Secure File Integrity Monitoring", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 30, studentName: "Jagatheeswaran S", registerNo: "720522149011", department: "CSE", academicYear: "2025–2026", projectTitle: "Blockchain-Based Secure File Integrity Monitoring", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 31, studentName: "Rahul S", registerNo: "720522149027", department: "CSE", academicYear: "2025–2026", projectTitle: "Blockchain-Based Secure File Integrity Monitoring", finalYearProject: "Yes", publications: "No", conferencePresentations: "Presented paper at ICXGA–2K26, Dhanalakshmi Srinivasan College of Engineering (Autonomous), Coimbatore, 10 April 2026.", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. N. Amutha" },
    { sNo: 32, studentName: "ARULRAJ G", registerNo: "720521106003", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR POWERED DRONE", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 33, studentName: "KAVIN KISHORE R", registerNo: "720521106014", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR POWERED DRONE", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 34, studentName: "GANESH M", registerNo: "720521106009", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR POWERED DRONE", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 35, studentName: "RAHUL PA", registerNo: "720521106022", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR POWERED DRONE", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 36, studentName: "SANJANA R", registerNo: "720521106029", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTOMATIC MEDICAL DISPATCHER USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mr. N. ARUN PRASATH" },
    { sNo: 37, studentName: "SAJITHA D", registerNo: "720521106026", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTOMATIC MEDICAL DISPATCHER USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mr. N. ARUN PRASATH" },
    { sNo: 38, studentName: "FARZANA", registerNo: "720521106008", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTOMATIC MEDICAL DISPATCHER USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mr. N. ARUN PRASATH" },
    { sNo: 39, studentName: "SHANMUGHAPRIYA V", registerNo: "720521106034", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTOMATIC MEDICAL DISPATCHER USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mr. N. ARUN PRASATH" },
    { sNo: 40, studentName: "SRIRAM T", registerNo: "720521106038", department: "ECE", academicYear: "2024–2025", projectTitle: "IOT BASED VIRTUAL DOCTOR ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR R MANIVANNAN" },
    { sNo: 41, studentName: "ARUN KUMAR M", registerNo: "720521106004", department: "ECE", academicYear: "2024–2025", projectTitle: "IOT BASED VIRTUAL DOCTOR ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR R MANIVANNAN" },
    { sNo: 42, studentName: "HARIKRISHNAN V", registerNo: "720521106011", department: "ECE", academicYear: "2024–2025", projectTitle: "IOT BASED VIRTUAL DOCTOR ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR R MANIVANNAN" },
    { sNo: 43, studentName: "SETHUPATHI M", registerNo: "720521106033", department: "ECE", academicYear: "2024–2025", projectTitle: "IOT BASED VIRTUAL DOCTOR ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR R MANIVANNAN" },
    { sNo: 44, studentName: "ARAVIND M", registerNo: "720521106002", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR K CHANDRU" },
    { sNo: 45, studentName: "BHUVAN RAJAN S", registerNo: "720521106006", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR K CHANDRU" },
    { sNo: 46, studentName: "SABARI VELAN T", registerNo: "720521106025", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR K CHANDRU" },
    { sNo: 47, studentName: "AADHAVAN K", registerNo: "720521106001", department: "ECE", academicYear: "2024–2025", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR K CHANDRU" },
    { sNo: 48, studentName: "RAMSEENA", registerNo: "720521106023", department: "ECE", academicYear: "2024–2025", projectTitle: "PLANT DISEASE DETECTION ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 49, studentName: "SATHYA", registerNo: "720521106032", department: "ECE", academicYear: "2024–2025", projectTitle: "PLANT DISEASE DETECTION ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 50, studentName: "DHIVYA K", registerNo: "720521106007", department: "ECE", academicYear: "2024–2025", projectTitle: "PLANT DISEASE DETECTION ROBOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 51, studentName: "MUKESH KRISHNAN R", registerNo: "720521106017", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR WIRELESS EV CHARGING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 52, studentName: "GNANASAMPATH G", registerNo: "720521106010", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR WIRELESS EV CHARGING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 53, studentName: "MUTHULINGAM R", registerNo: "720521106018", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR WIRELESS EV CHARGING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 54, studentName: "SAKTHI ADHAVAN V", registerNo: "720521106028", department: "ECE", academicYear: "2024–2025", projectTitle: "SOLAR WIRELESS EV CHARGING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 55, studentName: "SHEIK ABDAHIR K", registerNo: "720521106035", department: "ECE", academicYear: "2024–2025", projectTitle: "SMART VEHICLE ACCIDENT DETECTION AND ALERT SYSTEMS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR SENOJ JOSEPH" },
    { sNo: 56, studentName: "KARTHIK M", registerNo: "720521106701", department: "ECE", academicYear: "2024–2025", projectTitle: "SMART VEHICLE ACCIDENT DETECTION AND ALERT SYSTEMS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR SENOJ JOSEPH" },
    { sNo: 57, studentName: "SAJOB BABU NK", registerNo: "720521106006", department: "ECE", academicYear: "2024–2025", projectTitle: "SMART VEHICLE ACCIDENT DETECTION AND ALERT SYSTEMS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR SENOJ JOSEPH" },
    { sNo: 58, studentName: "AADHITHYA A", registerNo: "720522106001", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART FOLDABLE ALUMINIUM AXILLARY CRUTCH WITH IOT INTEGRATION FOR ENHANCED MOBILITY AND REHABILIATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 59, studentName: "KAMESH R", registerNo: "720522106027", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART FOLDABLE ALUMINIUM AXILLARY CRUTCH WITH IOT INTEGRATION FOR ENHANCED MOBILITY AND REHABILIATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 60, studentName: "SETHU PANDI M", registerNo: "720522106049", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART FOLDABLE ALUMINIUM AXILLARY CRUTCH WITH IOT INTEGRATION FOR ENHANCED MOBILITY AND REHABILIATION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 61, studentName: "AARTHI A", registerNo: "720522106002", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART EV CHARGING AND BILLING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 62, studentName: "ANBUMANI L", registerNo: "720522106006", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART EV CHARGING AND BILLING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 63, studentName: "PON SANTHOSH KUMAR B", registerNo: "720522106035", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART EV CHARGING AND BILLING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 64, studentName: "ABINAS K", registerNo: "720522106003", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATED WASTE MONITORING AND GARBAGE MANAGEMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 65, studentName: "MANIKANDAN M", registerNo: "720522106030", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATED WASTE MONITORING AND GARBAGE MANAGEMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 66, studentName: "NATARAJAN R", registerNo: "720522106033", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATED WASTE MONITORING AND GARBAGE MANAGEMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 67, studentName: "ABISHEIK KUMAR P", registerNo: "720522106004", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED SMART GRANARY MONITORING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 68, studentName: "VEERA MAHESWARI K", registerNo: "720522106057", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED SMART GRANARY MONITORING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 69, studentName: "HEMALATHA M", registerNo: "720522106023", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED SMART GRANARY MONITORING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 70, studentName: "AJAY M", registerNo: "720522106005", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART HELMET BASED ACCIDENT DETECTION AND NOTIFICATION SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 71, studentName: "BARATHRAJ R", registerNo: "720522106010", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART HELMET BASED ACCIDENT DETECTION AND NOTIFICATION SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 72, studentName: "SATHISH M", registerNo: "720522106048", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART HELMET BASED ACCIDENT DETECTION AND NOTIFICATION SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 73, studentName: "ARUN KUMAR S", registerNo: "720522106007", department: "ECE", academicYear: "2025–2026", projectTitle: "LANDSLIDE MONITORING USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 74, studentName: "SANTHOSH KUMAR N", registerNo: "720522106046", department: "ECE", academicYear: "2025–2026", projectTitle: "LANDSLIDE MONITORING USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 75, studentName: "PRAVEEN K", registerNo: "720522106037", department: "ECE", academicYear: "2025–2026", projectTitle: "LANDSLIDE MONITORING USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 76, studentName: "SWETHA A", registerNo: "720522106053", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART SAFETY JACKET FOR SOLDIER HEALTHCARE MONITORING AND TRACKING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 77, studentName: "BHARATHI S", registerNo: "720522106012", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART SAFETY JACKET FOR SOLDIER HEALTHCARE MONITORING AND TRACKING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 78, studentName: "SIVARANJINI R", registerNo: "720522106052", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART SAFETY JACKET FOR SOLDIER HEALTHCARE MONITORING AND TRACKING SYSTEM", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 79, studentName: "BIJU RAJAN S", registerNo: "720522106013", department: "ECE", academicYear: "2025–2026", projectTitle: "NEXT-GEN ENGINE SOUND SYSTEM FOR EVS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 80, studentName: "HARI SUDANESH S", registerNo: "720522106022", department: "ECE", academicYear: "2025–2026", projectTitle: "NEXT-GEN ENGINE SOUND SYSTEM FOR EVS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 81, studentName: "PUSHPARAJ S", registerNo: "720522106040", department: "ECE", academicYear: "2025–2026", projectTitle: "NEXT-GEN ENGINE SOUND SYSTEM FOR EVS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms BLESSLIN SHENI JS" },
    { sNo: 82, studentName: "KABILAN M", registerNo: "720522106025", department: "ECE", academicYear: "2025–2026", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION(SURVEILLANCE ROBOT)", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 83, studentName: "JERALD K", registerNo: "720522106024", department: "ECE", academicYear: "2025–2026", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION(SURVEILLANCE ROBOT)", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 84, studentName: "DEVA ROSHAN L", registerNo: "720522106014", department: "ECE", academicYear: "2025–2026", projectTitle: "AUTONOMOUS ROBOT FOR HEALTH CARE APPLICATION(SURVEILLANCE ROBOT)", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "DR N KALEESWARI" },
    { sNo: 85, studentName: "DINESH G", registerNo: "720522106015", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATIC RAILWAY GATE CONTROL WITH OBJECT DETECTION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 86, studentName: "NAVEEN R", registerNo: "720522106034", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATIC RAILWAY GATE CONTROL WITH OBJECT DETECTION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 87, studentName: "SHYAM SUNDAR K", registerNo: "720522106050", department: "ECE", academicYear: "2025–2026", projectTitle: "IOT BASED AUTOMATIC RAILWAY GATE CONTROL WITH OBJECT DETECTION", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 88, studentName: "ROSELINE MARIE S", registerNo: "720522106042", department: "ECE", academicYear: "2025–2026", projectTitle: "ENSURING DRUG SAFETY AND EXPOSING COUNTERFEIT DRUGS USING BLOCKCHAIN AND IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 89, studentName: "GOWTHAM RAJ S", registerNo: "720522106018", department: "ECE", academicYear: "2025–2026", projectTitle: "ENSURING DRUG SAFETY AND EXPOSING COUNTERFEIT DRUGS USING BLOCKCHAIN AND IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 90, studentName: "SANTHIYA S", registerNo: "720522106045", department: "ECE", academicYear: "2025–2026", projectTitle: "ENSURING DRUG SAFETY AND EXPOSING COUNTERFEIT DRUGS USING BLOCKCHAIN AND IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms.ANGELINE FELICIA J" },
    { sNo: 91, studentName: "PRAVEEN P", registerNo: "720522106038", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART AUTOMATED KITCHEN INTERNET OF THINGS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 92, studentName: "PRAVEEN P", registerNo: "720522106039", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART AUTOMATED KITCHEN INTERNET OF THINGS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 93, studentName: "HARIHARAN S", registerNo: "720522106020", department: "ECE", academicYear: "2025–2026", projectTitle: "SMART AUTOMATED KITCHEN INTERNET OF THINGS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 94, studentName: "KIRAN SANJAI V M", registerNo: "720522106028", department: "ECE", academicYear: "2025–2026", projectTitle: "PELTIER BASED AIR TO WATER EXPERIMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 95, studentName: "RAKESH SHARMA R", registerNo: "720522106041", department: "ECE", academicYear: "2025–2026", projectTitle: "PELTIER BASED AIR TO WATER EXPERIMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 96, studentName: "UNISON J", registerNo: "720522106055", department: "ECE", academicYear: "2025–2026", projectTitle: "PELTIER BASED AIR TO WATER EXPERIMENT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR M SIVA KUMAR" },
    { sNo: 97, studentName: "MAGENDHIRAN K", registerNo: "720522106029", department: "ECE", academicYear: "2025–2026", projectTitle: "ADVANCED DUAL AUTOMATIC SPEED CONTROL OF EV BASED ON HIGH PRIORITY ZONE AND HUMAN STRESS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 98, studentName: "VENKATESH L", registerNo: "720522106058", department: "ECE", academicYear: "2025–2026", projectTitle: "ADVANCED DUAL AUTOMATIC SPEED CONTROL OF EV BASED ON HIGH PRIORITY ZONE AND HUMAN STRESS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 99, studentName: "MOHAMED FAIZAL S", registerNo: "720522106032", department: "ECE", academicYear: "2025–2026", projectTitle: "ADVANCED DUAL AUTOMATIC SPEED CONTROL OF EV BASED ON HIGH PRIORITY ZONE AND HUMAN STRESS", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 100, studentName: "HARISH BABU K", registerNo: "720522106021", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED HYBRID EV ASSISTIVE SYSTEM FOR FUEL AND ELECTRIC SWITCHING", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 101, studentName: "MANOJ KUMAR S", registerNo: "720522106031", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED HYBRID EV ASSISTIVE SYSTEM FOR FUEL AND ELECTRIC SWITCHING", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 102, studentName: "PUSHPARAJ A", registerNo: "720522106039", department: "ECE", academicYear: "2025–2026", projectTitle: "AI BASED HYBRID EV ASSISTIVE SYSTEM FOR FUEL AND ELECTRIC SWITCHING", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms SANGEETHA GOPINATH" },
    { sNo: 103, studentName: "SABARISH YADHAV D", registerNo: "720522106043", department: "ECE", academicYear: "2025–2026", projectTitle: "FINGER-PRINT BASED BIOMETRIC SMART ELECTRONIC VOTING MACHINE USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 104, studentName: "SAKTHIVEL M", registerNo: "720522106044", department: "ECE", academicYear: "2025–2026", projectTitle: "FINGER-PRINT BASED BIOMETRIC SMART ELECTRONIC VOTING MACHINE USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 105, studentName: "POORNA KARTHICK S", registerNo: "720522106036", department: "ECE", academicYear: "2025–2026", projectTitle: "FINGER-PRINT BASED BIOMETRIC SMART ELECTRONIC VOTING MACHINE USING IOT", finalYearProject: "Yes", publications: "No", conferencePresentations: "Not Available", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "MR BOSE VV" },
    { sNo: 106, studentName: "Akkash Kannan K, Riyaz Ahamed D, Andrew Fernandos S", registerNo: "720521205002, 720521205021, 720521205003", department: "CSE", academicYear: "2024–2025", projectTitle: "Advances in Retinal Imaging for Early Disease Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. R. Mahalaxmi" },
    { sNo: 107, studentName: "Prasanth R, Ragul D, Saranraj S", registerNo: "720521205017, 720521205018, 720521205024", department: "CSE", academicYear: "2024–2025", projectTitle: "Smart Accident Detection and Tracking Framework for Vehicles Using IoT Technologies", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 108, studentName: "Abraham Richardson R, Harikrishnan N, Vijaya Bharathi", registerNo: "720521205001, 720521205010, 720521205028", department: "CSE", academicYear: "2024–2025", projectTitle: "Gossip-Based Protocol for Sensor Failure Prevention in Iot-Enabled Agricultural Storage Systems", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. B. Syed Moinuddin Bokhari" },
    { sNo: 109, studentName: "Karthikeyan S, Muthu Kumar P, Tamilarasi M", registerNo: "720521205012, 720521205016, 720521205026", department: "CSE", academicYear: "2024–2025", projectTitle: "Integrated Platform for Disease Exploration and Analysis", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms. N. Amutha" },
    { sNo: 110, studentName: "Karthik K, Sanjai Kumar J, Hariharasudhan", registerNo: "720521205011, 720521205022, 720521205009", department: "CSE", academicYear: "2024–2025", projectTitle: "Optimizing Resource Utilization in Food Waste Management Through Full Stack Development", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mr. K.J. Dinesh Babu" },
    { sNo: 111, studentName: "Anuja M, Divahar P, Tamilmaran R", registerNo: "720521205004, 720521205008, 720521205027", department: "CSE", academicYear: "2024–2025", projectTitle: "Strategies for Mitigating Game Addiction", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Ms. V. Divya" },
    { sNo: 112, studentName: "Manikandan M, Rajadurai R, Sethupathi S", registerNo: "720521205014, 720521205019, 720521205025", department: "CSE", academicYear: "2024–2025", projectTitle: "Revolutionizing Metabolic Health with Innovative Devices", finalYearProject: "Yes", publications: "No", conferencePresentations: "International Conference on Emerging Trends in AI (ICETAI’25)", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Dr. P. Sasikala" },
    { sNo: 113, studentName: "Akkash Kannan K, Riyaz Ahamed D, Andrew Fernandos S", registerNo: "720521205002, 720521205021, 720521205003", department: "CSE", academicYear: "2024–2025", projectTitle: "Advances in Retinal Imaging for Early Disease Detection", finalYearProject: "Yes", publications: "No", conferencePresentations: "ICIECAST’25", patentFiled: "No", patentGranted: "No", projectAwards: "Not Available", hackathons: "Not Available", startupActivities: "Not Available", facultyGuide: "Mrs. R. Mahalaxmi" }
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
    facultyResearchData,
    facultyPublicationsData,
    facultyPhdData,
    facultyPatentsData,
    departmentResearchData,
    studentResearchData,
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
