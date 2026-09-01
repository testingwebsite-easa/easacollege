
const COMMON_UG_PO = [
    "PO1 Engineering Knowledge: Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.",
    "PO2 Problem Analysis: Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)",
    "PO3 Design/Development of Solutions: Design creative solutions for complex problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)",
    "PO4 Conduct Investigations of Complex Problems: Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions. (WK8).",
    "PO5 Engineering Tool Usage: Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)",
    "PO6 The Engineer and The World: Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment. (WK1, WK5, and WK7).",
    "PO7 Ethics: Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws. (WK9)",
    "PO8 Individual and Collaborative Team work: Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.",
    "PO9 Communication: Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions."
];

export const departments = [

    //AI DS 

    {
        id: "artificial-intelligence-and-data-science",
        name: "Artificial Intelligence & Data Science",
        slug: "artificial-intelligence-and-data-science",
        type: "UG",
        po: COMMON_UG_PO,

        heroImage: "https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg",
        overview: "The Department of AI & Data Science combines the power of artificial intelligence with the analytical capabilities of data science to solve complex problems.",
        vision: "The Vision of the department is to produce competent graduates suitable for industries and organizations at global level including research and development with social responsibility.",
        mission: [
            "Fostering excellence in education, innovation and entrepreneurship to create change agents for inclusive growth.",
            "Encouraging inter-disciplinary studies and research to embrace the changing dimensions of the society and industry",
            "Providing academic and research facilities with ambience that conform to global benchmarks.",
            "Partnering with national and international institutions for leveraging synergies.",
            "Engaging communities through extension activities for neighborhood development.",
            "Supporting policy development and practices through continuous engagement with stakeholders."
        ],
        peo: [
            "Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "Conduct cutting edge research and develop solutions on problems of social relevance",
            "Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "Ability to apply AI & ML techniques to solve real-world problems.",
            "Ability to design and implement intelligent agents."
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
        heroImage: "https://i.pinimg.com/1200x/dd/b1/78/ddb1781bd633b45439f140e0437e1480.jpg",
        overview: "The Department of Computer Science and Engineering was established with the vision of producing high-quality computer science professionals who can adapt to the changing needs of the industry and society. The department has state-of-the-art laboratories and highly qualified faculty members.",
        vision: "To be a globally pre - eminent hub for education and research in Computer Science and Engineering, equipping students with the expertise, knowledge and creative mind set to become leaders and catalysts for positive change in the fast-changing global technology arena.",
        mission: [
            "To provide a dynamic learning environment that fosters academic excellence, personal growth and practical training in the field of Computer Science Engineering, preparing students for successful careers and fulfilling lives.",
            "To advance knowledge and drive innovation in Computer Science Engineering through cutting-edge research and development, contributing to the technological progress of society.",
            "To bridge the gap between academia and industry by offering industry aligned programs, hands-on training and practical experience in Computer Science Engineering, preparing students to lead, innovate and thrive in a rapidly evolving technological landscape.",
            "To promote diversity, equity and inclusion in all aspects of Computer Science Engineering education and research, creating a welcoming and inclusive environment that produces socially responsible citizens.",
            "To instill ethical principles and a commitment to social responsibility in our students, equipping them with the knowledge, skills and leadership qualities needed to contribute to the betterment of society through Computer Science Engineering."
        ],
        peo: [
            "Graduates will be able to analyze, design, and develop software solutions for real-world problems.",
            "Graduates will demonstrate professional ethics, leadership skills, and team spirit in their career.",
            "Graduates will pursue higher education and research to adapt to technological advancements."
        ],
        pso: [
            "Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.",
            "Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems.",
            "Ability to work effectively with various engineering fields as a team to design, build and develop system applications."
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
        heroImage: "https://i.pinimg.com/736x/3f/68/48/3f684852a3474b0127539eeede3f72d5.jpg",
        overview: "The Department of AI & ML focuses on the study of intelligent agents and the construction of such agents, which are systems that perceive their environment and take actions that maximize their chances of achieving their goals.",
        vision: "The Vision of the department is to produce competent graduates suitable for industries and organizations at global level including research and development with social responsibility.",
        mission: [
            "Fostering excellence in education, innovation and entrepreneurship to create change agents for inclusive growth.",
            "Encouraging inter-disciplinary studies and research to embrace the changing dimensions of the society and industry",
            "Providing academic and research facilities with ambience that conform to global benchmarks.",
            "Partnering with national and international institutions for leveraging synergies.",
            "Engaging communities through extension activities for neighborhood development.",
            "Supporting policy development and practices through continuous engagement with stakeholders."
        ],

        peo: [
            "Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "Conduct cutting edge research and develop solutions on problems of social relevance",
            "Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "Ability to apply AI & ML techniques to solve real-world problems.",
            "Ability to design and implement intelligent agents."
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
        heroImage: "https://img.freepik.com/free-photo/cyber-security-concept-digital-art_23-2151637760.jpg?semt=ais_wordcount_boost&w=740&q=80",
        overview: "The Department of CSE (Cyber Security) is dedicated to training professionals who can protect information systems and networks from cyber threats.",
        vision: "To be a centre of excellence in Cyber Security, fostering innovation, ethics, and technological advancements to empower students for a secure digital future.",
        mission: [
            "To impart strong theoretical foundations and practical skills in computer science and cyber security, preparing students for the evolving technological landscape.",
            "To foster innovation, critical thinking, and problem-solving abilities in addressing modern cyber threats.",
            "To promote industry collaboration, research, and continuous learning in areas of cyber security, ethical hacking, digital forensics, and secure software development.",
            "To inculcate ethical responsibility, leadership qualities, and social awareness among graduates to safeguard the digital world.",
            "To contribute to the nation’s cyber defence ecosystem through skilled manpower and impactful research."
        ],
        peo: [
            "Apply their technical competence in computer science to solve real world problems, with technical and people leadership.",
            "Conduct cutting edge research and develop solutions on problems of social relevance.",
            "Work in a business environment, exhibiting team skills, work ethics, adaptability and lifelong learning."
        ],
        pso: [
            "Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.",
            "Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems."
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
        heroImage: "https://i.pinimg.com/736x/63/3e/64/633e646d4b03b384ddf2c316e920fbde.jpg",
        overview: "The Department of Information Technology focuses on the management and processing of information using computer systems.",
        vision: "To be a world-class hub of excellence in Information Technology, fostering higher-level learning, cutting-edge research, and innovative technologies that transform students into global IT leaders and innovators.",
        mission: [
            "DELIVER high-quality IT education that aligns with student aspirations and potential, equipping them with cutting-edge skills for a dynamic digital world.",
            "INSPIRE a passion for learning and innovation by fostering creativity, problem-solving, and hands-on experience with emerging technologies.",
            "TRANSFORM talents into socially responsible IT professionals who leverage technology to address real-world challenges and serve society ethically."
        ],
        peo: [
            "Graduates will have sound foundation in the mathematical, scientific and engineering fundamentals to formulate, solve, and analyze problems related to Information and Technology.",
            "Graduates will have employment in IT industries who are socially responsible and integrated with professional and ethical skills.",
            "Graduates will involve in research, higher studies and/or to become entrepreneurs in the long run."
        ],
        pso: [
            "Ability to develop and maintain software applications.",
            "Ability to manage networks and databases."
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
        heroImage: "https://static.vecteezy.com/system/resources/thumbnails/029/767/602/small/ict-information-and-communications-technology-on-modern-server-room-background-virtual-screen-photo.jpg",
        overview: "The Department of Electronics and Communication Engineering is dedicated to imparting quality education in the field of electronics and communication. The department focuses on the overall development of students by providing them with practical exposure and industry interaction.",
        vision: "To be a leading hub in Electronics and communication engineering, driving innovation, interdisciplinary collaboration, and socially impactful solutions through cutting – edge Education, Research and Entrepreneurship.",
        mission: [
            "To advance knowledge and practice in Electronics and Communication Engineering Through hands on, industry relevant education that prepares students for innovation, Entrepreneurship and multidisciplinary collaboration.",
            "To foster a culture of research and development that addresses real world challenges and creates transformative solutions at the intersection of the Electronics, Communication and Computing.",
            "To empower individuals and communities by leveraging technology for positive social impact through inclusive education, collaborative outreach and interdisciplinary teamwork."
        ],
        peo: [
            "Graduates will have thorough grounding in the fundamental sciences, facilitating their future academic pursuits in Electronics and Communication Engineering.",
            "Graduates will demonstrate expertise in Electronics and Communication Engineering, empowering individuals to excel in industry applications, advanced studies, and innovative research.",
            "Graduates will have spirit of inquiry and learning, empowering individuals to stay current with industry trends and technological breakthroughs.",
            "Graduates will have the ability to critically assess literature, identify knowledge gaps, and develop novel, ethics-guided research approaches to tackle complex challenges.",
            "Graduates will have the ability to integrate professional ethics with social awareness, addressing engineering challenges in a holistic manner."
        ],
        pso: [
            "Apply electronic, mathematical, and engineering principles to design, develop, and analyse sophisticated electronic systems",
            "Design, simulate, and optimize communication systems.",
            "Leverage latest advancements in electronics and communication to design and develop ground breaking solutions"
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
        heroImage: "https://csdieselgenerators.com/wp-content/uploads/2023/05/4-768x512.png",
        overview: "The Department of Electrical and Electronics Engineering is committed to providing high-quality education and research opportunities in the fields of electrical, electronics, and power engineering. We aim to produce competent engineers who can contribute effectively to the technological advancement of society.",
        vision: "To create and sustain a centre of excellence in Electrical & Electronics Engineering that enables students to experience an unparalleled educational journey that is intellectually, socially, and personally transformative.",
        mission: [
            "To provide a comprehensive education in electrical and electronics engineering principles and applications.",
            "To promote research and development in emerging technologies required for the power and energy sectors.",
            "To prepare students for successful careers in industry, academia, and research organizations."
        ],
        peo: [
            "Graduates will demonstrate technical competence in analyzing and designing electrical and electronic systems.",
            "Graduates will exhibit professional ethics, leadership qualities, and communication skills.",
            "Graduates will engage in lifelong learning to adapt to technological changes."
        ],
        pso: [
            "Ability to design, simulate, and analyze electrical and electronic circuits and systems.",
            "Ability to limit the usage of power and energy by implementing energy conservation techniques."
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
        heroImage: "https://i.pinimg.com/736x/fc/09/a1/fc09a17dacc7858942e496384864b6b9.jpg",
        overview: "The Department of Biomedical Engineering integrates engineering principles with medical sciences to improve healthcare diagnosis and treatment.",
        vision: "To empower ethical biomedical innovation through education and research that bridges engineering and healthcare for community well-being.",
        mission: [
            "Build biomedical invention through focused education and practical skills imbibed with ethics.",
            "Motivate students for interdisciplinary learning to solve real world health care challenges.",
            "Engage with industry, hospitals, and research institutions to enhance collective welfare through accessible healthcare innovations."
        ],
        peo: [
            "Graduates will be able to develop the ability to identify healthcare challenges in society and apply analytical and design skills to create effective, practical solutions.",
            "Graduates will be able to be biomedical innovators who can lead sustainable startups for impactful healthcare solutions.",
            "Graduates will be able to demonstrate a lifelong learning attitude to adapt and succeed in evolving multidisciplinary careers in Engineering and medicine."
        ],
        pso: [
            "Graduates will be able to design ergonomic medical devices that support clinicians, reduce workload, and enhance patient care using biomedical engineering principles.",
            "Graduates will be equipped to leverage software tools and emerging technologies to develop cost-effective, indigenous healthcare solutions addressing real-world clinical and societal needs."

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
        heroImage: "https://anandice.ac.in/wp-content/uploads/2025/07/human-hand-passing-gear-robotic-hand-scaled.jpg",
        overview: "The Department of Mechanical Engineering was established in the year of 2009 with an intake of 60 UG students. The Department has grown significantly and offers B.E. Mechanical Engineering with sanctioned intake increased to 180 during the year 2012-13. Post graduate M.E. Computer Aided Design in the year 2013-14 and Manufacturing Engineering in the year 2014-15 courses are introduced with an intake of 18 students. Department of Mechanical Engineering is recognized as approved Research Centre of Anna University, Chennai. The department has state of art equipment's in the laboratories to provide deep experimental knowledge to the students. The department has well-qualified, industry oriented and experienced team of faculty members with specialized in different fields of Mechanical Engineering committed to provide quality education. The department is also committed to provide industry oriented research/consultancy work by the experienced faculty members. The department is also having tie-up with Maxbite Technologies Pvt. Ltd, Rabwin industry, CADD centre, Thirumaarul machinist and Prakash Gears Coimbatore etc., for training and placements.",
        vision: "To provide a comprehensive education and research environment that prepares students to design, develop and innovate mechanical systems and technologies that address real-world challenges, while promoting sustainability, safety, ethical and social responsibility.",
        mission: [
            "To provide a challenging and engaging learning experience that prepares students for careers in mechanical engineering and collaborate with industry partners for a relevant curriculum.",
            "To empower students with technical skills, critical thinking, and leadership qualities. Provide industry internships and professional experiences.",
            "To conduct interdisciplinary research on energy systems, robotics, biomedical engineering, materials science and sustainability Collaborate with industry partners for research solutions.",
            "To promote excellence in teaching, research, service and outreach. Connect students with industry partners and alumni for job placement support.",
            "To foster collaboration and diversity among faculty, students and stakeholders. Collaborate with industry partners for real-world projects and research experiences, while enhancing the department’s reputation."
        ],
        peo: [
            "Effectuating success in careers by exploring with the design, digital and computational analysis of engineering systems, experimentation and testing, smart manufacturing, technical services, and research.",
            "Amalgamating effectively with stakeholders to update and improve their core competencies and abilities to ethically compete in the ever-changing multicultural global enterprise.",
            "To encourage multi-disciplinary research and development to foster advanced technology, and to nurture innovation and entrepreneurship in order to compete successfully in the global economy.",
            "To globally share and apply technical knowledge to create new opportunities that proactively advances our society through team efforts and to solve various challenging technical, environmental and societal problems.",
            "To create world class mechanical engineers capable of practice engineering ethically with a solid vision to become great leaders in academia, industries and society."
        ],
        pso: [
            "Apply the knowledge gained in Mechanical Engineering for design and development and manufacture of engineering systems.",
            "Apply the knowledge acquired to investigate research-oriented problems in mechanical engineering with due consideration for environmental and social impacts.",
            "Use the engineering analysis and data management tools for effective management of multidisciplinaryprojects."
        ],
        milestones: [
            { year: "2008", desc: "Department Established" },
            { year: "2016", desc: "Research Center Status" }
        ],
        hod: {
            name: "Dr.S.Rajesh Ruban",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/mech-hod.jpeg",
            designation: "Associate Professor & Head",
            message: "Design, build, and create the future! Learn manufacturing, thermal engineering, and machine design. Gain hands-on skills through labs, projects, and workshops. Step into careers in automotive, production, and mechanical industries."
        },
        studentCount: "125++",
        facultyCount: "12+",
        labCount: "6+",
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
        heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        overview: "The Department of Agriculture Engineering applies engineering principles to agricultural production and processing.",
        vision: "To be a global leader in the research, education, and application of innovative engineering solutions for sustainable agriculture, with a focus on creating a more food-secure and resilient world.",
        mission: [
            "To advance the frontier of knowledge and practice in agricultural engineering.",
            "To equip students with the skills and knowledge to design and implement sustainable engineering solutions for the agriculture sector.",
            "To foster a culture of innovation, collaboration, and excellence in research that addresses real-world problems and creates new opportunities at the intersection of engineering, agriculture, and the environment.",
            "To empower individuals, communities, and nations to achieve food security and environmental sustainability through our education, research, and outreach programs.",
            "To value diversity, inclusion, and ethics, creating a safe and supportive environment that produces socially responsible leaders in agricultural engineering and entrepreneurship."
        ],
        peo: [
            " To train and educate students with general knowledge and skills in agricultural water management, agricultural production process, farm machinery and farm management.",
            "To provide a sound theoretical knowledge in engineering principles applied to agriculture.",
            "To prepare students for a successful agricultural engineering career integrating all aspects of engineering in agriculture.",
            "To develop innovative capacity of students for increasing agricultural production with scarce water resources available.",
            "To impart positive and responsive out their mission as engineers. reach attitudes, initiative and creative thinking in their mission as engineers.",
            "To understand ethical issues and responsibility of serving the society and the environment at  large.",
        ],
        pso: [
            "To make expertise in design and engineering problem solving approach in agriculture with proper knowledge and skill.",
            "To enhance the ability of the students to formulate solutions to real-world problems pertaining to sustained agricultural productivity using modern technologies.",
            "To inculcate entrepreneurial skills through strong Industry-Institution linkage."
        ],
        milestones: [
            { year: "2020", desc: " Establishment of the Department The Department of Agricultural Engineering was established to address the growing technological needs of sustainable agriculture and to develop skilled agricultural engineers." }
        ],
        hod: {
            name: "GOKULDEEPAN P",
            image: "https://easa-college.s3.eu-north-1.amazonaws.com/images/hod/agri-hod.jpeg",
            designation: "Associate Professor & Head",
            message: "Grow with technology and sustainability! Learn smart farming, irrigation systems, and agricultural machinery. Explore modern agricultural practices and sustainable solutions. Build careers in the agriculture, technology, and rural development sectors."
        },
        studentCount: "110+",
        facultyCount: "9+",
        labCount: "4+"
    },

    //pg courses

    //PG ME -COMPUTER SCIENCE AND ENGINEERING
    {
        id: "me-computer-science-and-engineering",
        name: "Computer Science and Engineering",
        slug: "me-computer-science-and-engineering",
        type: "PG",
        heroImage: "https://i.pinimg.com/736x/58/34/1b/58341b7bd2f64e45cb6726f4a3ad1991.jpg",
        overview: "The M.E. Computer Science and Engineering program is designed to provide advanced knowledge and research skills in the field of computer science.",
        vision: "To produce research-oriented postgraduates in Computer Science and Engineering.",
        mission: [
            "To offer advanced courses in emerging areas of computer science.",
            "To promote research and publication in high-impact journals.",
            "To prepare students for academic and industrial research careers."
        ],
        peo: [
            "Graduates will become experts in specialized areas of computer science.",
            "Graduates will contribute to the advancement of knowledge through research.",
            "Graduates will take up leadership roles in academia and industry."
        ],
        pso: [
            "Ability to conduct independent research in computer science.",
            "Ability to develop advanced software solutions for complex problems."
        ],
        milestones: [
            { year: "2014", desc: "PG Program Started" }
        ],
        hod: {
            name: "Dr. D. Wilson",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            designation: "Head of PG Studies",
            message: "Our PG program is tailored to meet the research and development needs of the IT industry. we encourage innovation and critical thinking."
        },
        studentCount: "50+",
        facultyCount: "10+",
        labCount: "5+"
    },

    //construction engineering and management
    {
        id: "construction-engineering-and-management",
        name: "Construction Engineering and Management",
        slug: "construction-engineering-and-management",
        type: "PG",
        heroImage: "https://i.pinimg.com/736x/b6/c7/42/b6c742669563327b00c4c7ba42278d09.jpg",
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

    //PG COMMUNICATION -SYSTEMS
    {
        id: "communication-systems",
        name: "Communication Systems",
        slug: "communication-systems",
        type: "PG",
        heroImage: "https://i.pinimg.com/736x/79/bd/d7/79bdd7afb48cd18004d3cda295e9670a.jpg",
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

    //PG MANUFACTURING ENGINEERING
    {
        id: "manufacturing-engineering",
        name: "Manufacturing Engineering",
        slug: "manufacturing-engineering",
        type: "PG",
        heroImage: "https://i.pinimg.com/1200x/cf/1d/1a/cf1d1a92f456ed718d362b6a5b84e03d.jpg",
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

    //PG POWER ELECTRONICS AND DRIVES
    {
        id: "power-electronics-and-drives",
        name: "Power Electronics and Drives",
        slug: "power-electronics-and-drives",
        type: "PG",
        heroImage: "https://i.pinimg.com/736x/d1/71/92/d17192262b72c69cddb76efdc68bba6d.jpg",
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

    //PG STRUCTURAL ENGINEERING
    {
        id: "structural-engineering",
        name: "Structural Engineering",
        slug: "structural-engineering",
        type: "PG",
        heroImage: "https://i.pinimg.com/736x/ca/6d/d6/ca6dd63f1ea5fc871ec8e36d510516d6.jpg",
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


    //UG SCIENCE AND HUMANITIES
    {
        id: "science-and-humanities",
        name: "Science and Humanities",
        slug: "science-and-humanities",
        type: "UG",
        po: COMMON_UG_PO,
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
        vision: "To inspire and empower individuals to become global leaders, entrepreneurs and change-makers, creating value for society through ethical and innovative management practices.",
        mission: [
            "To foster a culture of academic excellence, intellectual and personal growth and practical training in the field of management studies.",
            "To prepare individuals to become effective, ethical and socially responsible leaders, entrepreneurs and managers who can create value for society and drive economic growth.",
            "To acquire knowledge and drive innovation through cutting-edge research and development in the field of Management Studies.",
            "To bridge the gap between academia and industry by offering industry aligned programs, practical experience and hands-on training that prepare students to lead, innovate and thrive in an ever-evolving global landscape.",
            "To prioritise diversity, equity and inclusion to create a welcoming and inclusive environment that produces socially responsible leaders."
        ],
        peo: [
            "PEO1: To have a thorough understanding of the core aspects of the business.",
            "PEO2: To provide the learners with the management tools to identify, analyze and create business opportunities as well as solve business problems.",
            "PEO3: To prepare them to have a holistic approach towards management functions.",
            "PEO4: To inspire and make them practice ethical standards in business."
        ],
        po: [
            "PO1 Management Knowledge: Demonstrate the ability to apply knowledge of management theories and practices to solve real business situations.",
            "PO2 Problem Analysis: Foster analytical and critical thinking abilities for data-based decision making.",
            "PO3 Leadership Ability: Ability to develop Value based Leadership and cross cultural skills and application of theoretical studies into real life circumstances.",
            "PO4 Ethical Business Aspect: Ability to understand, analyze and communicate global, economic, legal, and ethical aspects of business.",
            "PO5 Entrepreneurial Ability: Emanate leadership, creativity, passion, skills and learning which helps them empowering business excellence in the industry and academia.",
            "PO6 The Manager and Society: Grooming budding business professionals into true management leaders by imparting quality education, training them to challenge the modern era complications and think innovatively."
        ],
        pso: [
            "PSO1: To apply the fundamental knowledge of management domains to optimally solve the complex business problems.",
            "PSO2: To inculcate the ability in students to gain multidisciplinary knowledge through simulated problems, case analysis, projects and industrial training.",
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
