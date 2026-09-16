
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

export const departments = [

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


const departmentSlugMapping = {
    "cse": "computer-science-and-engineering",
    "ece": "electronics-and-communication-engineering",
    "mech": "mechanical-engineering",
    "eee": "electrical-and-electronics-engineering",
    "me-cse": "me-computer-science-and-engineering",
    "mba": "master-of-business-administration",
    "ai-ml": "artificial-intelligence-and-machine-learning",
    "ai-ds": "artificial-intelligence-and-data-science",
    "cse-cyber-security": "computer-science-and-engineering-cyber-security",
    "biomedical": "biomedical-engineering",
    "it": "information-technology",
    "agri": "agriculture-engineering",
    "construction-mgmt": "construction-engineering-and-management",
    "manufacturing": "manufacturing-engineering",
    "ped": "power-electronics-and-drives",
    "structural": "structural-engineering",
    "sh": "science-and-humanities"
};

export const getDepartment = (slugOrId) => {
    // 1. Direct match
    let dept = departments.find(d => d.slug === slugOrId || d.id === slugOrId);
    if (dept) return dept;

    // 2. Legacy match via mapping
    const newSlug = departmentSlugMapping[slugOrId];
    if (newSlug) {
        return departments.find(d => d.slug === newSlug || d.id === newSlug);
    }

    return undefined;
};
