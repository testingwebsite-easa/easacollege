// Program Outcomes (PO), Program Educational Objectives (PEO), 
// Program Specific Outcomes (PSO), and Work Knowledge (WK) for all departments

export const COMMON_UG_PO = [
    { id: 'PO1', code: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.' },
    { id: 'PO2', code: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)' },
    { id: 'PO3', code: 'PO3', title: 'Design/Development of Solutions', description: 'Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)' },
    { id: 'PO4', code: 'PO4', title: 'Conduct Investigations of Complex Problems', description: 'Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions.(WK8).' },
    { id: 'PO5', code: 'PO5', title: 'Engineering Tool Usage', description: 'Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)' },
    { id: 'PO6', code: 'PO6', title: 'The Engineer and The World', description: 'Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment.(WK1, WK5, and WK7).' },
    { id: 'PO7', code: 'PO7', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws. (WK9)' },
    { id: 'PO8', code: 'PO8', title: 'Individual and Collaborative Team work', description: 'Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.' },
    { id: 'PO9', code: 'PO9', title: 'Communication', description: 'Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.' },
    { id: 'PO10', code: 'PO10', title: 'Project Management and Finance', description: 'Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to one’s own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.' },
    { id: 'PO11', code: 'PO11', title: 'Life-Long Learning', description: 'Recognize the need for, and have the preparation and ability for i) independent and life-long learning ii) adaptability to new and emerging technologies and iii) critical thinking in the broadest context of technological change. (WK8)' }
];

export const COMMON_UG_PEO = [
    { id: 'PEO1', code: 'PEO1', title: 'Professional Practice', description: 'Graduates will apply technical knowledge and skills to solve real-world problems in their respective domains with professional competence and ethical responsibility.' },
    { id: 'PEO2', code: 'PEO2', title: 'Leadership & Innovation', description: 'Graduates will demonstrate leadership qualities, innovation, and entrepreneurship in designing and developing solutions that create sustainable value.' },
    { id: 'PEO3', code: 'PEO3', title: 'Continuous Learning', description: 'Graduates will engage in lifelong learning and professional development to adapt to rapid technological advancements and evolving industry needs.' },
    { id: 'PEO4', code: 'PEO4', title: 'Societal Contribution', description: 'Graduates will contribute to society through their professional practice while maintaining high ethical standards and environmental consciousness.' }
];

export const COMMON_UG_WK = [
    { id: 'WK1', code: 'WK1', title: 'Natural & Social Sciences', description: 'A systematic, theory-based understanding of the natural sciences applicable to the discipline and awareness of relevant social sciences.' },
    { id: 'WK2', code: 'WK2', title: 'Mathematics & Computing Analysis', description: 'Conceptually-based mathematics, numerical analysis, data analysis, statistics and formal aspects of computer and information science to support detailed analysis and modelling applicable to the discipline.' },
    { id: 'WK3', code: 'WK3', title: 'Engineering Fundamentals', description: 'A systematic, theory-based formulation of engineering fundamentals required in the engineering discipline.' },
    { id: 'WK4', code: 'WK4', title: 'Specialist Engineering Knowledge', description: 'Engineering specialist knowledge that provides theoretical frameworks and bodies of knowledge for the accepted practice areas in the engineering discipline; much is at the forefront of the discipline.' },
    { id: 'WK5', code: 'WK5', title: 'Sustainable Engineering & Operations', description: 'Knowledge, including efficient resource use, environmental impacts, whole-life cost, re-use of resources, net zero carbon, and similar concepts, that supports engineering design and operations in a practice area.' },
    { id: 'WK6', code: 'WK6', title: 'Engineering Practice (Technology)', description: 'Knowledge of engineering practice (technology) in the practice areas in the engineering discipline.' },
    { id: 'WK7', code: 'WK7', title: 'Societal Role, Safety & Sustainability', description: 'Knowledge of the role of engineering in society and identified issues in engineering safety and sustainable development.' },
    { id: 'WK8', code: 'WK8', title: 'Research Literature & Critical Thinking', description: 'Engagement with selected knowledge in the current research literature of the discipline, awareness of the power of critical thinking and creative approaches to evaluate emerging issues.' },
    { id: 'WK9', code: 'WK9', title: 'Ethics & Inclusive Conduct', description: 'Ethics, inclusive behavior and conduct. Knowledge of professional ethics, responsibilities, and norms of engineering practice. Awareness of the need for diversity by reason of ethnicity, gender, age, physical ability etc. with mutual understanding and respect, and of inclusive attitudes.' }
];

// Department-Specific Program Specific Outcomes (PSO)
export const departmentPSO = {
    'computer-science-and-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Design & Automation', description: 'Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.' },
        { id: 'PSO2', code: 'PSO2', title: 'Theoretical Foundation & Research', description: 'Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems.' },
        { id: 'PSO3', code: 'PSO3', title: 'Multidisciplinary System Development', description: 'Ability to work effectively with various engineering fields as a team to design, build and develop system applications.' }
    ],
    'artificial-intelligence-and-data-science': [
        { id: 'PSO1', code: 'PSO1', title: 'Domain-Specific AI Decision Making', description: 'Exhibit proficiency of Artificial Intelligence and Data Science to evolve AI based efficient domain specific processes for effective decision making in several domains such as business and governance domains.' },
        { id: 'PSO2', code: 'PSO2', title: 'Sustainable & Ethical AI Solutions', description: 'Exhibit proficiency of Artificial Intelligence and Data Science in providing sustainable solutions by adapting to societal, environmental and ethical concerns to real world problems.' },
        { id: 'PSO3', code: 'PSO3', title: 'Data Analytics & Knowledge Engineering', description: 'Develop data analytics and data visualization skills, skills pertaining to knowledge acquisition, knowledge representation and knowledge engineering, and hence be capable of coordinating complex projects.' }
    ],
    'artificial-intelligence-and-machine-learning': [
        { id: 'PSO1', code: 'PSO1', title: 'AI & ML Problem Solving', description: 'Ability to apply AI & ML techniques to solve real-world problems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Intelligent Agents', description: 'Ability to design and implement intelligent agents.' }
    ],
    'computer-science-and-engineering-cyber-security': [
        { id: 'PSO1', code: 'PSO1', title: 'Design & Automation', description: 'Exhibit design and programming skills to build and automate business solutions using cutting edge technologies.' },
        { id: 'PSO2', code: 'PSO2', title: 'Theoretical Foundation & Research', description: 'Strong theoretical foundation leading to excellence and excitement towards research, to provide elegant solutions to complex problems.' }
    ],
    'information-technology': [
        { id: 'PSO1', code: 'PSO1', title: 'Programming & Problem Solving', description: 'Have proficiency in programming skills to design, develop and apply appropriate techniques, to solve complex engineering problems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Build & Manage IT Solutions', description: 'Have knowledge to build, automate and manage IT solutions using cutting-edge technologies.' },
        { id: 'PSO3', code: 'PSO3', title: 'Research & Industry Innovation', description: 'Have the ability to research, create, and build new technology solutions that solve real-world problems and move the industry forward.' }
    ],
    'electronics-and-communication-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Electronic Systems Design', description: 'Apply electronic, mathematical, and engineering principles to design, develop, and analyse sophisticated electronic systems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Communication Systems Optimization', description: 'Design, simulate, and optimize communication systems.' },
        { id: 'PSO3', code: 'PSO3', title: 'Groundbreaking Solutions', description: 'Leverage latest advancements in electronics and communication to design and develop ground breaking solutions.' }
    ],
    'electrical-and-electronics-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Circuit Design & Problem Solving', description: 'Understand electrical and electronics devices / instruments and to design circuits and provide innovative methodologies to solve real time / industrial problems.' }
    ],
    'mechanical-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Design & Manufacturing of Engineering Systems', description: 'Apply the knowledge gained in Mechanical Engineering for design and development and manufacture of engineering systems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Research & Environmental Investigation', description: 'Apply the knowledge acquired to investigate research-oriented problems in mechanical engineering with due consideration for environmental and social impacts.' },
        { id: 'PSO3', code: 'PSO3', title: 'Engineering Analysis & Multidisciplinary Management', description: 'Use the engineering analysis and data management tools for effective management of multidisciplinaryprojects.' }
    ],
    'agriculture-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Design & Problem Solving in Agriculture', description: 'To make expertise in design and engineering problem solving approach in agriculture with proper knowledge and skill.' },
        { id: 'PSO2', code: 'PSO2', title: 'Sustainable Agricultural Solutions', description: 'To enhance the ability of the students to formulate solutions to real-world problems pertaining to sustained agricultural productivity using modern technologies.' },
        { id: 'PSO3', code: 'PSO3', title: 'Industry-Institution Entrepreneurship', description: 'To inculcate entrepreneurial skills through strong Industry-Institution linkage.' }
    ],
    'biomedical-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Ergonomic Medical Device Design', description: 'Graduates will be able to design ergonomic medical devices that support clinicians, reduce workload, and enhance patient care using biomedical engineering principles.' },
        { id: 'PSO2', code: 'PSO2', title: 'Cost-Effective Indigenous Healthcare Solutions', description: 'Graduates will be equipped to leverage software tools and emerging technologies to develop cost-effective, indigenous healthcare solutions addressing real-world clinical and societal needs.' }
    ],
    'manufacturing-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Manufacture of Engineering Systems', description: 'Apply the knowledge gained in Manufacturing Engineering for manufacture of engineering systems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Research & Environmental Investigation', description: 'Apply the knowledge acquired to investigate research-oriented problems in Manufacturing engineering with due consideration for environmental and social impacts.' },
        { id: 'PSO3', code: 'PSO3', title: 'Engineering Analysis & Multidisciplinary Management', description: 'Use the engineering analysis and data management tools for effective management of multidisciplinary projects.' }
    ],
    'master-of-business-administration': [
        { id: 'PSO1', code: 'PSO1', title: 'Management Domains & Complex Problem Solving', description: 'To apply the fundamental knowledge of management domains to optimally solve the complex business problems.' },
        { id: 'PSO2', code: 'PSO2', title: 'Multidisciplinary Case Analysis & Training', description: 'To inculcate the ability in students to gain multi-disciplinary knowledge through simulated problems, case analysis, projects and industrial training.' },
        { id: 'PSO3', code: 'PSO3', title: 'Ethical, Societal & Ecological Management', description: 'To develop competent management professionals with strong ethical values with an understanding of societal and ecological issues relevant to professional managerial practice through life-long learning.' }
    ]
};
