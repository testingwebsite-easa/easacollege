// Program Outcomes (PO), Program Educational Objectives (PEO), 
// Program Specific Outcomes (PSO), and Work Knowledge (WK) for all departments

export const COMMON_UG_PO = [
    { id: 'PO1', code: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop solution of complex engineering problems.' },
    { id: 'PO2', code: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
    { id: 'PO3', code: 'PO3', title: 'Design/Development of Solutions', description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.' },
    { id: 'PO4', code: 'PO4', title: 'Conduct Investigations', description: 'Conduct investigations of complex problems using research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
    { id: 'PO5', code: 'PO5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
    { id: 'PO6', code: 'PO6', title: 'The Engineer and Society', description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
    { id: 'PO7', code: 'PO7', title: 'Environment and Sustainability', description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
    { id: 'PO8', code: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
    { id: 'PO9', code: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
    { id: 'PO10', code: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.' },
    { id: 'PO11', code: 'PO11', title: 'Project Management', description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.' },
    { id: 'PO12', code: 'PO12', title: 'Lifelong Learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' }
];

export const COMMON_UG_PEO = [
    { id: 'PEO1', code: 'PEO1', title: 'Professional Practice', description: 'Graduates will apply technical knowledge and skills to solve real-world problems in their respective domains with professional competence and ethical responsibility.' },
    { id: 'PEO2', code: 'PEO2', title: 'Leadership & Innovation', description: 'Graduates will demonstrate leadership qualities, innovation, and entrepreneurship in designing and developing solutions that create sustainable value.' },
    { id: 'PEO3', code: 'PEO3', title: 'Continuous Learning', description: 'Graduates will engage in lifelong learning and professional development to adapt to rapid technological advancements and evolving industry needs.' },
    { id: 'PEO4', code: 'PEO4', title: 'Societal Contribution', description: 'Graduates will contribute to society through their professional practice while maintaining high ethical standards and environmental consciousness.' }
];

export const COMMON_UG_WK = [
    { id: 'WK1', code: 'WK1', title: 'Mathematics', description: 'Knowledge of applied mathematics including differential equations, linear algebra, probability, and statistics relevant to the discipline.' },
    { id: 'WK2', code: 'WK2', title: 'Science', description: 'Knowledge of science including physics, chemistry, and other natural sciences relevant to the discipline.' },
    { id: 'WK3', code: 'WK3', title: 'Engineering Fundamentals', description: 'Knowledge of engineering fundamentals covering engineering graphics, computer programming, data structures, and algorithms.' },
    { id: 'WK4', code: 'WK4', title: 'Domain-Specific Knowledge', description: 'Knowledge specific to the engineering discipline covering theoretical concepts and practical applications in the domain.' }
];

// Department-Specific Program Specific Outcomes (PSO)
export const departmentPSO = {
    'computer-science-and-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Software Development', description: 'Ability to develop and maintain software applications using modern tools and frameworks.' },
        { id: 'PSO2', code: 'PSO2', title: 'System Design', description: 'Ability to design and implement scalable computing systems with focus on efficiency and security.' },
        { id: 'PSO3', code: 'PSO3', title: 'Problem Solving', description: 'Ability to analyze complex computational problems and develop optimal solutions.' }
    ],
    'artificial-intelligence-and-data-science': [
        { id: 'PSO1', code: 'PSO1', title: 'AI/ML Application', description: 'Ability to develop and deploy machine learning models for real-world applications.' },
        { id: 'PSO2', code: 'PSO2', title: 'Data Analysis', description: 'Ability to extract meaningful insights from large datasets using statistical and analytical techniques.' },
        { id: 'PSO3', code: 'PSO3', title: 'Intelligent Systems', description: 'Ability to design intelligent systems that learn and adapt to changing environments.' }
    ],
    'information-technology': [
        { id: 'PSO1', code: 'PSO1', title: 'IT Infrastructure', description: 'Ability to design, deploy, and manage IT infrastructure and networks.' },
        { id: 'PSO2', code: 'PSO2', title: 'Database Management', description: 'Ability to design and optimize database systems for efficient data management.' },
        { id: 'PSO3', code: 'PSO3', title: 'IT Security', description: 'Ability to implement security measures and protocols to protect IT systems.' }
    ],
    'electronics-and-communication-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Circuit Design', description: 'Ability to design and analyze electronic circuits for various applications.' },
        { id: 'PSO2', code: 'PSO2', title: 'Communication Systems', description: 'Ability to design and implement communication systems with focus on signal processing.' },
        { id: 'PSO3', code: 'PSO3', title: 'Signal Processing', description: 'Ability to process and analyze signals for practical applications in communication and control.' }
    ],
    'mechanical-engineering': [
        { id: 'PSO1', code: 'PSO1', title: 'Mechanical Design', description: 'Ability to design mechanical systems and components for real-world applications.' },
        { id: 'PSO2', code: 'PSO2', title: 'Manufacturing', description: 'Ability to understand and implement modern manufacturing processes and techniques.' },
        { id: 'PSO3', code: 'PSO3', title: 'Thermal Systems', description: 'Ability to design and analyze thermal and power systems.' }
    ]
};
