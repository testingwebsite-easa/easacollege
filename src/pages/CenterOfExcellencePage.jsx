import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBrain, FaRobot, FaCarBattery, FaMicrochip, FaShieldAlt, FaCubes,
    FaCheckCircle, FaAward, FaHandshake, FaFlask, FaRocket, FaLaptopCode,
    FaArrowRight, FaDownload, FaCertificate, FaIndustry, FaUsers, FaLightbulb,
    FaSearch, FaChevronRight, FaStar, FaTools, FaFileAlt, FaExternalLinkAlt,
    FaGraduationCap, FaLayerGroup, FaServer, FaCogs
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';

const CenterOfExcellencePage = () => {
    const [activeCenter, setActiveCenter] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');

    const coeStats = [
        { label: "Specialized Centers", value: "6+", icon: <FaBrain />, desc: "Cutting-edge technology hubs" },
        { label: "High-End Labs & Rigs", value: "25+", icon: <FaFlask />, desc: "GPU clusters, robotics & EV benches" },
        { label: "Industry Partners & MoUs", value: "40+", icon: <FaHandshake />, desc: "Global tech leaders & ecosystems" },
        { label: "Patents & Innovations", value: "65+", icon: <FaAward />, desc: "Student & faculty led breakthroughs" }
    ];

    const centers = [
        {
            id: 'ai-ml',
            title: 'AI, Machine Learning & Data Analytics Hub',
            subtitle: 'Empowering Next-Generation Intelligent Computing & Generative AI',
            category: 'computing',
            icon: <FaBrain />,
            color: '#6366f1',
            accent: 'rgba(99, 102, 241, 0.15)',
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop',
            overview: 'The AI & Data Science Center of Excellence at EASA provides an enterprise-grade ecosystem equipped with high-throughput NVIDIA GPU workstations, deep learning accelerators, and big data clusters to foster research in generative artificial intelligence, computer vision, natural language processing, and predictive analytics.',
            keyHighlights: [
                'NVIDIA RTX & Tesla GPU computing nodes for training LLMs and complex neural networks',
                'Pre-configured frameworks: PyTorch, TensorFlow, OpenCV, HuggingFace, CUDA & Apache Spark',
                'Dedicated data pipeline testbeds for IoT stream processing and edge AI inference',
                'Collaborative research with global tech giants and national defense/smart city applications'
            ],
            facilities: [
                { name: 'GPU Deep Learning Cluster', spec: 'NVIDIA RTX 4090 / A5000 Workstations with 128GB RAM' },
                { name: 'Vision Computing Testbed', spec: 'Intel RealSense 3D Depth Cameras, FLIR Thermal Sensors' },
                { name: 'Edge AI Development Kits', spec: 'NVIDIA Jetson AGX Orin, Jetson Nano, Raspberry Pi 5 AI Kits' },
                { name: 'Big Data Sandbox', spec: 'Hadoop/Spark Distributed Cluster for Large Scale Analytics' }
            ],
            projects: [
                { title: 'Autonomous Agricultural Crop Disease Detection', tag: 'Computer Vision', status: 'Published Patent' },
                { title: 'Predictive Energy Optimization for Smart Grids', tag: 'Deep Learning', status: 'Funded Research' },
                { title: 'Multilingual Indic Healthcare Chatbot Assistant', tag: 'Generative AI & NLP', status: 'Live Prototype' }
            ],
            certifications: ['AWS Certified Machine Learning Specialist', 'TensorFlow Developer Certificate', 'NVIDIA Deep Learning Institute (DLI)'],
            leadFaculty: 'Dr. A. Saravanan, Ph.D. (AI & Neural Networks)'
        },
        {
            id: 'robotics-iot',
            title: 'Robotics, Automation & Industrial IoT Center',
            subtitle: 'Pioneering Industry 4.0, Autonomous Systems & Smart Automation',
            category: 'automation',
            icon: <FaRobot />,
            color: '#3b82f6',
            accent: 'rgba(59, 130, 246, 0.15)',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
            overview: 'Bridging mechanical design, embedded electronics, and cloud analytics, this center focuses on industrial automation, collaborative robots (Cobots), autonomous mobile robots (AMRs), SCADA systems, and interconnected cyber-physical architectures.',
            keyHighlights: [
                'Multi-axis articulated robotic arms and programmable logic controller (PLC) trainers',
                'ROS 2 (Robot Operating System) simulation benches and LiDAR mapping environments',
                'Industrial IoT gateways with MQTT, Modbus, OPC-UA, and LoRaWAN protocol suites',
                'Hands-on assembly lines simulating smart automated factory floors'
            ],
            facilities: [
                { name: '6-Axis Industrial Robotic Arm', spec: 'Payload 5kg with precision gripping and vision guidance' },
                { name: 'PLC & SCADA Automation Rig', spec: 'Siemens S7-1200 / Schneider Electric Modicon PLCs with HMI' },
                { name: 'Autonomous Mobile Robot (AMR)', spec: 'LiDAR, SLAM navigation, ROS2 controller on differential drive' },
                { name: 'Industrial IoT Sensor Matrix', spec: 'Vibration, temperature, ultrasonic, wireless strain gauges' }
            ],
            projects: [
                { title: 'Automated Guided Vehicle (AGV) for Warehouse Logistics', tag: 'AMR / SLAM', status: 'Industry Deployed' },
                { title: 'IoT-Based Vibration & Fault Diagnostic in Heavy Motors', tag: 'Industry 4.0', status: 'Ongoing Trial' },
                { title: 'Vision-Guided Robotic Sorter for Manufacturing Defects', tag: 'Robotic Vision', status: 'Patent Pending' }
            ],
            certifications: ['Siemens Certified Automation Associate', 'FANUC Robotics Operator', 'Cisco Industrial IoT Specialist'],
            leadFaculty: 'Dr. S. Santhosh, M.E., Ph.D. (Robotics & Mechatronics)'
        },
        {
            id: 'ev-clean-energy',
            title: 'Electric Vehicles (EV) & Sustainable Energy Center',
            subtitle: 'Engineering Green Mobility, Smart Battery Systems & Power Electronics',
            category: 'energy',
            icon: <FaCarBattery />,
            color: '#10b981',
            accent: 'rgba(16, 185, 129, 0.15)',
            image: 'https://images.unsplash.com/photo-1558441719-646b22ad4409?q=80&w=2070&auto=format&fit=crop',
            overview: 'Dedicated to clean transportation and renewable energy systems, the EV Center houses state-of-the-art battery testing chambers, BLDC/PMSM motor dynamometers, solar microgrid testbeds, and power conversion testbenches for automotive innovation.',
            keyHighlights: [
                'Complete EV powertrain simulation and dynamometer testing setups',
                'Battery Management System (BMS) design, thermal runaway analysis, and cell balancing',
                'Grid-tied solar PV simulator with bidirectional smart inverters and energy storage systems',
                'Fast DC and AC Type-2 charging station test benches for EV infrastructure compliance'
            ],
            facilities: [
                { name: 'BLDC/PMSM Motor Test Rig', spec: '5kW Regenerative Dynamometer with torque-speed profiling' },
                { name: 'BMS Testing & Emulation Bench', spec: 'Active/Passive balancing, CAN-bus telemetry, cell simulators' },
                { name: 'Solar PV & Microgrid Simulator', spec: '10kW Hybrid Rooftop Solar with LiFePO4 battery bank' },
                { name: 'EV Powertrain Prototyping Kit', spec: 'Modular 48V/72V chassis with customizable motor controllers' }
            ],
            projects: [
                { title: 'Smart Dual-Source Solar & Regenerative EV Charger', tag: 'Clean Tech', status: 'Published Patent' },
                { title: 'High-Efficiency Adaptive BMS for Lithium Iron Phosphate Cells', tag: 'Battery Tech', status: 'Research Grant' },
                { title: 'Lightweight Retrofit Electric 2-Wheeler Conversion Kit', tag: 'EV Conversion', status: 'Student Startup' }
            ],
            certifications: ['Automotive Skill Development Council (ASDC) EV Certification', 'MATLAB & Simulink for EV Modeling', 'Schneider Solar PV Specialist'],
            leadFaculty: 'Dr. R. Vignesh Kumar, M.E., Ph.D. (Power Electronics & EV)'
        },
        {
            id: 'vlsi-embedded',
            title: 'VLSI Design, Embedded Systems & Edge Computing',
            subtitle: 'Silicon Architecture, System-on-Chip (SoC) & High-Speed Hardware',
            category: 'hardware',
            icon: <FaMicrochip />,
            color: '#f59e0b',
            accent: 'rgba(245, 158, 11, 0.15)',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
            overview: 'This center empowers students and researchers to master electronic design automation (EDA), custom ASIC/FPGA digital architecture design, mixed-signal layout, and embedded firmware development on ARM Cortex and RISC-V platforms.',
            keyHighlights: [
                'Industry-standard EDA CAD tools for synthesis, place-and-route, and timing verification',
                'Xilinx Vivado, Spartan-7, Artix-7, and Zynq SoC development boards with PCIe/Gigabit ethernet',
                'Embedded RTOS programming (FreeRTOS, Zephyr) on 32-bit ARM and open-source RISC-V cores',
                'High-bandwidth digital storage oscilloscopes, logic analyzers, and RF signal generators'
            ],
            facilities: [
                { name: 'FPGA Development Workstations', spec: 'Xilinx Zynq-7000 / Spartan-7 development boards' },
                { name: 'EDA Simulation Suite', spec: 'Cadence / Mentor Graphics / ModelSim EDA Licenses' },
                { name: 'Mixed-Signal Oscilloscopes', spec: 'Keysight 4-Channel 500MHz DSO with protocol decoders' },
                { name: 'Embedded Hardware Prototyping', spec: 'STM32 Nucleo, ESP32-S3, Raspberry Pi Compute Module 4' }
            ],
            projects: [
                { title: 'Hardware Accelerated AES Cryptographic Core on FPGA', tag: 'FPGA / VLSI', status: 'Published Paper' },
                { title: 'Ultra-Low Power RISC-V SoC for Biomedical Implants', tag: 'SoC Design', status: 'National Contest Finalist' },
                { title: 'Real-Time Edge Audio Classifier using TinyML', tag: 'Edge AI / Embedded', status: 'Prototype Ready' }
            ],
            certifications: ['Cadence Certified VLSI Associate', 'Arm Education Accredited Engineer', 'Xilinx FPGA Design Specialist'],
            leadFaculty: 'Prof. K. Chandrasekar, M.E. (VLSI & Embedded Systems)'
        },
        {
            id: 'cyber-cloud',
            title: 'Cyber Security, Cloud & Blockchain Lab',
            subtitle: 'Securing the Cyber Frontier, Cloud Infrastructures & Decentralized Web',
            category: 'security',
            icon: <FaShieldAlt />,
            color: '#ec4899',
            accent: 'rgba(236, 72, 153, 0.15)',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
            overview: 'Operating in an isolated network sandbox, the Cyber Security & Cloud CoE trains students in ethical hacking, penetration testing, threat detection, digital forensics, multi-cloud infrastructure orchestration, and smart contracts.',
            keyHighlights: [
                'Isolated Air-Gapped Cyber Range sandbox for attack/defense Red Team vs. Blue Team drills',
                'Security Information and Event Management (SIEM) tools: Splunk, Wireshark, Metasploit, Burp Suite',
                'Multi-cloud development clusters using AWS Academy, Google Cloud Platform, and Microsoft Azure',
                'Decentralized blockchain testnet for Ethereum smart contracts and Hyperledger Fabric enterprise dApps'
            ],
            facilities: [
                { name: 'Cyber Range Defense Pods', spec: 'Isolated LAN sandbox with virtual target machines' },
                { name: 'Enterprise Cloud Gateway', spec: 'OpenStack / Kubernetes private cloud infrastructure' },
                { name: 'Digital Forensics Station', spec: 'Autopsy, EnCase, hardware write-blockers for forensic imaging' },
                { name: 'Blockchain Ledger Node', spec: 'Ethereum testnet & Hyperledger Fabric multi-peer network' }
            ],
            projects: [
                { title: 'Zero-Trust Identity & Access Architecture for Hybrid Cloud', tag: 'Cloud Security', status: 'Case Study' },
                { title: 'Automated Phishing & Malware Detection using Graph Neural Networks', tag: 'Cyber Threat Intel', status: 'Ongoing Research' },
                { title: 'Decentralized Academic Credential Verification on Polygon', tag: 'Blockchain / dApp', status: 'Campus Live' }
            ],
            certifications: ['Certified Ethical Hacker (CEH)', 'CompTIA Security+', 'AWS Certified Solutions Architect', 'Red Hat Certified System Administrator'],
            leadFaculty: 'Dr. M. Deepa, Ph.D. (Information Security & Cryptography)'
        },
        {
            id: 'additive-manufacturing',
            title: 'Additive Manufacturing & Prototyping (IDEA Lab)',
            subtitle: 'From Concept to Functional Reality with Advanced 3D Fabrication',
            category: 'manufacturing',
            icon: <FaCubes />,
            color: '#8b5cf6',
            accent: 'rgba(139, 92, 246, 0.15)',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
            overview: 'Integrated with the AICTE IDEA Lab, this center houses high-precision additive manufacturing equipment, CNC machines, laser cutters, PCB prototyping mills, and optical 3D scanners to accelerate mechanical and electronic hardware development.',
            keyHighlights: [
                'Multi-material FDM, SLA resin, and industrial-grade high-temperature 3D printers',
                'Precision 3-axis CNC vertical milling machine and CO2 laser engraving/cutting systems',
                'Rapid automated chemical-free PCB prototyping machine for instant circuit board fabrication',
                'High-resolution laser 3D scanner for reverse engineering and metrology inspection'
            ],
            facilities: [
                { name: 'Industrial FDM 3D Printers', spec: 'Dual extruder, heated chamber up to 350°C, 400x400x500mm' },
                { name: 'High-Res SLA Resin Printer', spec: '4K Monochrome LCD, 25-micron layer resolution for micro-models' },
                { name: 'CNC PCB Prototyping Machine', spec: 'Auto-tool changer, 60,000 RPM spindle for sub-millimeter traces' },
                { name: 'Optical Laser 3D Scanner', spec: 'Handheld 0.02mm accuracy scanner with CAD export pipeline' }
            ],
            projects: [
                { title: 'Custom 3D-Printed Prosthetic Bionic Hand with Myoelectric Sensors', tag: 'Biomedical / 3D', status: 'Clinical Prototype' },
                { title: 'Aerodynamic Lightweight Drone Frame with Generative Design', tag: 'Aerospace / CAD', status: 'National Award' },
                { title: 'Rapid Prototype Enclosure for Hazardous Gas Detectors', tag: 'Industrial Design', status: 'Industry Transfer' }
            ],
            certifications: ['Autodesk Certified Professional (Fusion 360 & Inventor)', 'SolidWorks Mechanical Design Associate (CSWA)', 'Additive Manufacturing Specialist'],
            leadFaculty: 'Dr. P. Ramesh, M.E., Ph.D. (Advanced Manufacturing & CAD/CAM)'
        }
    ];

    const industryPartners = [
        { name: 'NVIDIA Deep Learning', focus: 'AI & GPU Research', domain: 'Artificial Intelligence' },
        { name: 'AWS Academy', focus: 'Cloud & DevOps Infrastructure', domain: 'Cloud & Big Data' },
        { name: 'Siemens Automation', focus: 'PLC & Industrial Automation', domain: 'Industry 4.0' },
        { name: 'Cisco Networking Academy', focus: 'Cyber Security & Networks', domain: 'Networking' },
        { name: 'Texas Instruments', focus: 'Embedded Systems & Analog', domain: 'Microcontrollers' },
        { name: 'Autodesk Education', focus: 'Design & Additive Prototyping', domain: 'CAD/CAM' },
        { name: 'Schneider Electric', focus: 'Energy Management & Solar PV', domain: 'Clean Energy' },
        { name: 'IBM Academic Initiative', focus: 'Data Science & Enterprise Cloud', domain: 'Enterprise Tech' }
    ];

    const currentCenter = centers[activeCenter];

    return (
        <div className="coe-page" style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO
                title="Center of Excellence | EASA College of Engineering and Technology"
                description="Explore EASA's cutting-edge Centers of Excellence in AI & Data Analytics, Robotics, Electric Vehicles, VLSI & Embedded Systems, Cyber Security, and Additive Manufacturing."
            />
            <Navbar />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="center-of-excellence"
                defaultTitle="Center of Excellence"
                defaultSubtitle="Advancing Frontier Research, Emerging Technologies & Industry Innovation"
                title="Center of Excellence"
                subtitle="Advancing Frontier Research, Emerging Technologies & Industry Innovation"
            />

            <div className="coe-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>

                {/* 1. STATS METRICS GRID WITH 3D DEPTH */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }} className="perspective-container">
                        {coeStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="card-3d-subtle"
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2rem 1.8rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '14px',
                                    background: 'rgba(217, 119, 6, 0.12)',
                                    color: 'var(--secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    flexShrink: 0,
                                    border: '1px solid rgba(217, 119, 6, 0.25)',
                                    boxShadow: '0 8px 16px -4px rgba(217, 119, 6, 0.2)'
                                }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--secondary)', marginTop: '0.2rem' }}>
                                        {stat.label}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        {stat.desc}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 2. OVERVIEW & MISSION STATEMENT */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card-3d-subtle"
                    style={{
                        background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(30, 41, 59, 0.5) 100%)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        marginBottom: '4.5rem',
                        position: 'relative'
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.35rem 1rem',
                                borderRadius: '30px',
                                background: 'rgba(217, 119, 6, 0.12)',
                                color: 'var(--secondary)',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                                border: '1px solid rgba(217, 119, 6, 0.3)'
                            }}>
                                <FaRocket /> Center of Excellence Vision
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.2rem', lineHeight: '1.3' }}>
                                Driving Technological Sovereignty & Hands-On Engineering Mastery
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.2rem' }}>
                                EASA College of Engineering and Technology has established high-caliber Centers of Excellence (CoE) to serve as epicenters of technological innovation, multi-disciplinary research, and industry-aligned competency building. 
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                Designed in tandem with premier technology corporations and regulatory frameworks like AICTE and Anna University, these centers empower students to work on live industrial problem statements, file intellectual patents, and emerge as leaders in deep-tech domains.
                            </p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.2rem'
                        }}>
                            {[
                                { title: 'Hands-on Deep Tech', desc: 'No abstract theory; direct interaction with industry-standard hardware & tools.' },
                                { title: 'Patent Facilitation', desc: 'Dedicated mentoring and funding for student-invented provisional & utility patents.' },
                                { title: 'Global Certifications', desc: 'Aligned with AWS, Siemens, Cisco, Cadence & ASDC global credentials.' },
                                { title: 'Interdisciplinary Labs', desc: 'Uniting CSE, ECE, EEE, Mech, AI/ML, and Cyber Security for unified breakthroughs.' }
                            ].map((pillar, i) => (
                                <div key={i} style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '14px',
                                    padding: '1.2rem',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                                        <FaCheckCircle />
                                    </div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{pillar.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{pillar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 3. INTERACTIVE CENTERS OF EXCELLENCE SELECTOR */}
                <section style={{ marginBottom: '4.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            color: 'var(--secondary)',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem'
                        }}>
                            SPECIALIZED DOMAINS
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                            Explore Our Centers of Excellence
                        </h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.6rem auto 0', fontSize: '0.95rem' }}>
                            Select a center below to explore infrastructure, ongoing research projects, industrial tools, and professional certifications.
                        </p>
                    </div>

                    {/* DESKTOP/MOBILE TAB SELECTOR */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}>
                        {centers.map((c, idx) => {
                            const isSelected = activeCenter === idx;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveCenter(idx)}
                                    style={{
                                        background: isSelected ? 'var(--bg-card)' : 'rgba(30, 41, 59, 0.4)',
                                        border: isSelected ? `2px solid ${c.color}` : '1px solid var(--glass-border)',
                                        padding: '1.2rem 1rem',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        boxShadow: isSelected ? `0 12px 24px -6px ${c.accent}, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
                                        transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem'
                                    }}
                                    className="coe-tab-btn"
                                >
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '10px',
                                        background: isSelected ? c.color : 'rgba(255,255,255,0.05)',
                                        color: isSelected ? '#ffffff' : c.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        transition: '0.3s'
                                    }}>
                                        {c.icon}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            fontWeight: '700',
                                            color: isSelected ? 'var(--text-main)' : 'var(--text-muted)',
                                            lineHeight: '1.3'
                                        }}>
                                            {c.title.split('&')[0]}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: isSelected ? c.color : 'var(--text-muted)', fontWeight: '600' }}>
                                            View Details →
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* ACTIVE CENTER EXPANDED VIEW */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentCenter.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35 }}
                            className="card-3d-subtle"
                            style={{
                                background: 'var(--bg-card)',
                                border: `1px solid ${currentCenter.color}40`,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: `0 20px 40px -15px ${currentCenter.accent}`
                            }}
                        >
                            {/* TOP BANNER */}
                            <div style={{
                                position: 'relative',
                                minHeight: '220px',
                                background: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75)), url(${currentCenter.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: currentCenter.color,
                                    color: '#ffffff',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    width: 'fit-content',
                                    marginBottom: '0.8rem',
                                    textTransform: 'uppercase'
                                }}>
                                    {currentCenter.icon} Center of Excellence
                                </div>
                                <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: '800', color: '#ffffff', marginBottom: '0.4rem' }}>
                                    {currentCenter.title}
                                </h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', maxWidth: '800px', margin: 0 }}>
                                    {currentCenter.subtitle}
                                </p>
                            </div>

                            {/* MAIN BODY GRID */}
                            <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                
                                {/* LEFT COLUMN: OVERVIEW & HIGHLIGHTS */}
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <FaLightbulb style={{ color: currentCenter.color }} /> Overview & Vision
                                    </h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1.8rem' }}>
                                        {currentCenter.overview}
                                    </p>

                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <FaStar style={{ color: currentCenter.color }} /> Core Focus Areas
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                                        {currentCenter.keyHighlights.map((hl, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                <FaCheckCircle style={{ color: currentCenter.color, marginTop: '0.2rem', flexShrink: 0 }} />
                                                <span>{hl}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* FACULTY IN CHARGE */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '14px',
                                        padding: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <div style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%',
                                            background: currentCenter.color,
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            <FaUsers />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>
                                                Lead Faculty Coordinator
                                            </div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                                {currentCenter.leadFaculty}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: LAB RIGS, PROJECTS & CERTIFICATIONS */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                    
                                    {/* FACILITIES & RIGS */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        padding: '1.5rem'
                                    }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaTools style={{ color: currentCenter.color }} /> Laboratory Infrastructure
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {currentCenter.facilities.map((fac, idx) => (
                                                <div key={idx} style={{
                                                    background: 'rgba(255, 255, 255, 0.02)',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    padding: '0.8rem 1rem',
                                                    borderRadius: '10px'
                                                }}>
                                                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                                        {fac.name}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                                        {fac.spec}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ACTIVE RESEARCH PROJECTS */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        padding: '1.5rem'
                                    }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaFlask style={{ color: currentCenter.color }} /> Flagship Innovations & Patents
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                            {currentCenter.projects.map((proj, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '1rem',
                                                    padding: '0.6rem 0',
                                                    borderBottom: idx === currentCenter.projects.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)'
                                                }}>
                                                    <div>
                                                        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)' }}>
                                                            {proj.title}
                                                        </div>
                                                        <span style={{ fontSize: '0.75rem', color: currentCenter.color, fontWeight: '700' }}>
                                                            {proj.tag}
                                                        </span>
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        padding: '0.25rem 0.6rem',
                                                        borderRadius: '12px',
                                                        background: 'rgba(217, 119, 6, 0.15)',
                                                        color: 'var(--secondary)',
                                                        border: '1px solid rgba(217, 119, 6, 0.3)',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {proj.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CERTIFICATION TRACK */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        padding: '1.5rem'
                                    }}>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaCertificate style={{ color: 'var(--secondary)' }} /> Industry Certification Pathways
                                        </h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {currentCenter.certifications.map((cert, idx) => (
                                                <span key={idx} style={{
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    padding: '0.35rem 0.8rem',
                                                    borderRadius: '20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid var(--glass-border)',
                                                    color: 'var(--text-main)'
                                                }}>
                                                    ✓ {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* 4. INDUSTRY COLLABORATIONS & MOU ECOSYSTEM */}
                <section style={{ marginBottom: '4.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            color: 'var(--secondary)',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem'
                        }}>
                            CORPORATE ALLIANCES
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                            Industry MoUs & Technology Partners
                        </h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.6rem auto 0', fontSize: '0.95rem' }}>
                            Our Centers of Excellence maintain active collaborations with premier technology giants to co-develop curricula, mentor capstone projects, and sponsor hackathons.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {industryPartners.map((partner, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                className="card-3d-subtle"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(217, 119, 6, 0.1)',
                                    color: 'var(--secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    flexShrink: 0,
                                    border: '1px solid rgba(217, 119, 6, 0.2)'
                                }}>
                                    <FaIndustry />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {partner.domain}
                                    </span>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem', marginBottom: '0.3rem' }}>
                                        {partner.name}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                                        {partner.focus}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. CALL TO ACTION & INQUIRY BANNER */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="card-3d-subtle"
                    style={{
                        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(30, 41, 59, 0.7) 100%)',
                        border: '1px solid rgba(217, 119, 6, 0.4)',
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 1rem',
                            borderRadius: '30px',
                            background: 'rgba(217, 119, 6, 0.2)',
                            color: 'var(--secondary)',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1rem'
                        }}>
                            <FaHandshake /> Partner with Our CoE
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>
                            Ready to Collaborate, Innovate, or Tour Our Facilities?
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                            Whether you are an industry partner seeking applied research solutions, a student eager to embark on deep-tech innovation, or a visiting researcher, our Centers of Excellence welcome you.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <a
                                href="mailto:research@ecetonline.com?subject=Inquiry regarding Center of Excellence"
                                className="btn-3d"
                                style={{
                                    background: 'var(--secondary)',
                                    color: '#000000',
                                    fontWeight: '700',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    boxShadow: '0 8px 20px -4px rgba(217, 119, 6, 0.5)'
                                }}
                            >
                                <FaFlask /> Inquire / Propose Project
                            </a>
                            <a
                                href="https://docs.google.com/document/d/1APC44Ed6-unX82A5RonU4qU54ykSuiF_exREfvrzJMg/edit?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: 'var(--text-main)',
                                    fontWeight: '700',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                <FaFileAlt /> View Institutional MoUs <FaExternalLinkAlt size={12} />
                            </a>
                        </div>
                    </div>
                </motion.section>

            </div>

            <Footer />
        </div>
    );
};

export default CenterOfExcellencePage;
