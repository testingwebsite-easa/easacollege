import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Smartphone, 
    Sparkles, 
    Compass, 
    Layers, 
    Terminal, 
    Wrench, 
    Users, 
    Award, 
    Rocket, 
    Calendar, 
    CheckCircle2, 
    ArrowRight, 
    Star, 
    Coffee, 
    Palette, 
    Cpu, 
    ShieldCheck, 
    HelpCircle, 
    Code2, 
    Zap,
    ExternalLink,
    QrCode
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import './MADClubDetail.css';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/4/d/e/1FAIpQLSea-CcfzHVk2gKZwvak-4JOHdetzzT8uEjlk0TYFLil4hdFWA/viewform?usp=header";

const MADClubDetail = () => {
    const [activePhase, setActivePhase] = useState(1);

    const teamMembers = [
        {
            role: "FACULTY MENTOR",
            name: "Mr. C. G. Kirubhanandhan",
            designation: "Club In-Charge · Assistant Professor",
            dept: "Department of AI & DS",
            initials: "CG",
            featured: true
        },
        {
            role: "PRESIDENT",
            name: "Yogeswarn A.",
            year: "IV Year",
            dept: "AI & DS",
            initials: "YA"
        },
        {
            role: "VICE PRESIDENT",
            name: "Deepak S.",
            year: "III Year",
            dept: "AI & DS",
            initials: "DS"
        },
        {
            role: "SECRETARY",
            name: "Santhosh S",
            year: "II Year",
            dept: "CSE",
            initials: "SS"
        },
        {
            role: "OFFICE BEARER 1",
            name: "Ajay S",
            year: "IV Year",
            dept: "AI & DS",
            initials: "AS"
        }
    ];

    const pillars = [
        {
            id: "01",
            title: "Platform Literacy",
            desc: "Capabilities and limitations of the Android platform for app development and deployment.",
            icon: Smartphone,
            gradient: "from-blue-500/20 to-cyan-500/10"
        },
        {
            id: "02",
            title: "Industry Awareness",
            desc: "Understanding the technology and business trends shaping modern mobile app development.",
            icon: Compass,
            gradient: "from-amber-500/20 to-yellow-500/10"
        },
        {
            id: "03",
            title: "Hands-on Modeling",
            desc: "Learning to model and manage mobile app development using Android Studio and modern frameworks.",
            icon: Layers,
            gradient: "from-emerald-500/20 to-teal-500/10"
        },
        {
            id: "04",
            title: "Tools & Testing",
            desc: "Working with software and hardware tools to develop, test and debug mobile apps systematically.",
            icon: Wrench,
            gradient: "from-purple-500/20 to-pink-500/10"
        }
    ];

    const phaseData = {
        1: {
            title: "Phase 1 — Foundation & Exposure",
            subtitle: "Aug – Oct • NO CODING NEEDED",
            tag: "NO CODING NEEDED",
            goal: "Literacy, motivation, and idea generation — no app-building expected at this stage.",
            events: [
                {
                    badge: "ORIENTATION",
                    title: "App Dev 101",
                    desc: "Native vs. cross-platform vs. no-code, and mobile career paths. No prerequisite required.",
                    icon: Rocket
                },
                {
                    badge: "WORKSHOP",
                    title: "Design Thinking Framework",
                    desc: "Structured framework for framing real-world problems before any building begins.",
                    icon: Palette
                },
                {
                    badge: "IDEATHON",
                    title: "Campus Problem Ideathon",
                    desc: "Pitch ideas for real campus problems — no building required. Winners feed Phase 2 & 3.",
                    icon: Zap
                },
                {
                    badge: "AWARENESS",
                    title: "Responsible AI & Cyber Security",
                    desc: "Ethical AI use and cyber hygiene / data-safety awareness sessions.",
                    icon: ShieldCheck
                },
                {
                    badge: "COMPETITION",
                    title: "Tech Quiz",
                    desc: "General technology knowledge contest, open to all skill levels.",
                    icon: HelpCircle
                },
                {
                    badge: "COMPETITION",
                    title: "Logo Design & Brandstorm 360",
                    desc: "Creative branding contests for club and event identity.",
                    icon: Sparkles
                }
            ]
        },
        2: {
            title: "Phase 2 — Guided Skill Building",
            subtitle: "Nov – Jan • NO-CODE FIRST",
            tag: "NO-CODE FIRST",
            goal: "Introduce building through no-code and design tools, so lacking a coding background is not a blocker.",
            events: [
                {
                    badge: "3–4 SESSIONS",
                    title: "No-Code to MVP Series",
                    desc: "Turn a Phase 1 idea into a working prototype with FlutterFlow / Adalo — completely code-free.",
                    icon: Layers
                },
                {
                    badge: "MULTI-DAY SPRINT",
                    title: "UI/UX Design Sprint",
                    desc: "Wireframing, user-journey mapping and Figma prototyping, reviewed by industry designers.",
                    icon: Palette
                },
                {
                    badge: "1-DAY CHALLENGE",
                    title: "App Reverse Engineering",
                    desc: "Analyse popular apps’ UI/UX and feature set to build deep product-thinking skills.",
                    icon: Smartphone
                },
                {
                    badge: "WEEKLY · INFORMAL",
                    title: "Code & Coffee",
                    desc: "Peer-led casual coding practice and debugging meetups, at your own comfortable pace.",
                    icon: Coffee
                }
            ]
        },
        3: {
            title: "Phase 3 — Structured Build & Showcase",
            subtitle: "Feb – Apr • BUILD & LAUNCH",
            tag: "BUILD & LAUNCH",
            goal: "Introduce real coding — scaffolded and mentor-guided — with a no-code track still open for non-coders.",
            events: [
                {
                    badge: "MULTI-WEEK",
                    title: "Beginner Flutter / Kotlin Track",
                    desc: "Step-by-step mentored build of one simple mobile application across several guided sessions.",
                    icon: Code2
                },
                {
                    badge: "WORKSHOP SERIES",
                    title: "AI-Powered Mobile Apps",
                    desc: "Call existing AI APIs — ML Kit, OCR, intelligent chatbots — inside a no-code or beginner app.",
                    icon: Cpu
                },
                {
                    badge: "24-HR · 2 TRACKS",
                    title: "HACKASTORM (Restructured)",
                    desc: "No-Code/Design track for beginners + an Advanced Build track — nobody is filtered out!",
                    icon: Zap
                },
                {
                    badge: "YEAR-END SHOWCASE",
                    title: "Mobile Innovation Expo",
                    desc: "Wireframes, no-code MVPs and fully coded apps proudly displayed side by side.",
                    icon: Award
                }
            ]
        }
    };

    const roadmapItems = [
        {
            title: "One Month – One Prototype",
            desc: "A scaled-down build challenge: wireframe → no-code MVP → simple feature, growing in complexity across the year."
        },
        {
            title: "Startup App Incubation Programme",
            desc: "A semester-long idea-to-MVP mentorship track for students who’ve completed Phases 1–3."
        },
        {
            title: "App Store Launch Week",
            desc: "Publishing, ASO, beta testing and analytics sessions for teams with a genuinely deployable app."
        },
        {
            title: "Appathon 48 (Advanced Track)",
            desc: "The full 48-hour, single-track national hackathon, once a strong beginner pipeline exists."
        }
    ];

    const awards = [
        { title: "Best UI/UX Design", desc: "For the most thoughtful, user-centred design work." },
        { title: "Best No-Code MVP", desc: "For the strongest working prototype built without code." },
        { title: "Best App Idea", desc: "For the most original, high-impact concept pitched." },
        { title: "Best First-Year Participant", desc: "Celebrating standout freshers — this could be you!" },
        { title: "People’s Choice Award", desc: "Voted by the whole MAD Club community." },
        { title: "Mobile Innovator of the Year", desc: "Advanced Track — the club’s top overall achievement." }
    ];

    const socialLinks = [
        { name: "Instagram", handle: "@Mad_club_off", url: "https://instagram.com/Mad_club_off", icon: FaInstagram, color: "#E1306C" },
        { name: "LinkedIn", handle: "Mobileapp Club", url: "https://linkedin.com", icon: FaLinkedin, color: "#0A66C2" },
        { name: "Facebook", handle: "Madclub Madclub", url: "https://facebook.com", icon: FaFacebook, color: "#1877F2" },
        { name: "YouTube", handle: "MADCLUB@ECET", url: "https://youtube.com", icon: FaYoutube, color: "#FF0000" }
    ];

    return (
        <div className="mad-club-container">
            {/* Induction Header Badge */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mad-hero-header"
            >
                <div className="mad-induction-badge">
                    <span className="badge-pulse"></span>
                    <span>Freshers' Induction 2026</span>
                </div>
                <h1 className="mad-main-title">
                    Mobile Application Development <span className="text-[#FCCA26]">(MAD) Club</span>
                </h1>
                <p className="mad-motto">
                    IMAGINE • DESIGN • DEVELOP • DEPLOY
                </p>
                <p className="mad-lead-text">
                    A student-led club training <strong>every branch</strong>, <strong>every skill level</strong>, to build real mobile apps — from your very first idea to a published launch.
                </p>

                <div className="mad-quick-stats">
                    <div className="mad-stat-pill">
                        <Users className="w-4 h-4 text-[#FCCA26]" />
                        <span>Open to All Branches</span>
                    </div>
                    <div className="mad-stat-pill">
                        <Code2 className="w-4 h-4 text-[#FCCA26]" />
                        <span>No Coding Required to Start</span>
                    </div>
                    <div className="mad-stat-pill">
                        <Rocket className="w-4 h-4 text-[#FCCA26]" />
                        <span>3-Phase Learning Journey</span>
                    </div>
                </div>

                <div className="mad-hero-actions">
                    <a 
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mad-hero-cta-btn"
                    >
                        <Zap className="w-4 h-4 text-black" />
                        <span>Join MAD Club (Registration Form)</span>
                        <ExternalLink className="w-4 h-4 text-black/70" />
                    </a>
                </div>
            </motion.div>

            {/* Vision Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mad-vision-card"
            >
                <div className="mad-vision-icon">
                    <Sparkles className="w-6 h-6 text-[#FCCA26]" />
                </div>
                <div>
                    <h3 className="mad-vision-heading">Our Vision</h3>
                    <p className="mad-vision-text">
                        "Empowering students of every branch to design and build innovative, user-centric mobile applications — and to learn by creating, not just studying."
                    </p>
                </div>
            </motion.div>

            {/* Leadership & Team Section */}
            <section className="mad-section">
                <div className="mad-section-header">
                    <span className="mad-section-kicker">WHO RUNS THE CLUB</span>
                    <h2 className="mad-section-title">Meet the Team & Leadership</h2>
                    <div className="mad-section-divider"></div>
                </div>

                <div className="mad-team-grid">
                    {teamMembers.map((member, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className={`mad-member-card ${member.featured ? 'mad-mentor-card' : ''}`}
                        >
                            <div className="mad-avatar-circle">
                                <span>{member.initials}</span>
                            </div>
                            <span className="mad-member-role">{member.role}</span>
                            <h4 className="mad-member-name">{member.name}</h4>
                            <p className="mad-member-dept">
                                {member.designation ? member.designation : `${member.year} – ${member.dept}`}
                            </p>
                            {member.featured && (
                                <span className="mad-faculty-badge">FACULTY MENTOR</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4 Core Pillars */}
            <section className="mad-section">
                <div className="mad-section-header">
                    <span className="mad-section-kicker">WHY WE EXIST</span>
                    <h2 className="mad-section-title">Our 4 Core Pillars</h2>
                    <p className="mad-quote">“Curious beats experienced”</p>
                    <p className="mad-section-desc">
                        The student-led club advocates for educating and creating modern applications within the mobile space — demystifying mobile app development for every single branch.
                    </p>
                    <div className="mad-section-divider"></div>
                </div>

                <div className="mad-pillars-grid">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div key={pillar.id} className="mad-pillar-card">
                                <div className="mad-pillar-top">
                                    <span className="mad-pillar-number">{pillar.id}</span>
                                    <div className="mad-pillar-icon-box">
                                        <Icon className="w-5 h-5 text-[#FCCA26]" />
                                    </div>
                                </div>
                                <h3 className="mad-pillar-title">{pillar.title}</h3>
                                <p className="mad-pillar-desc">{pillar.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Rebuilt for 2026-27: 3-Phase Interactive Journey */}
            <section className="mad-section">
                <div className="mad-section-header">
                    <span className="mad-section-kicker">REBUILT FOR 2026–27</span>
                    <h2 className="mad-section-title">Skills First: No Code to Pro</h2>
                    <div className="mad-rebuild-rationale">
                        <p>
                            <strong>Why we restructured the calendar this year:</strong> Last year mixed bootcamps, webinars, awareness sessions and a flagship hackathon — but advanced topics assumed members could already code. If most students don’t yet have that foundation, that’s the real gap to close.
                        </p>
                        <p className="mt-2 text-[#FCCA26]/90">
                            Instead of adding build-heavy flagship events immediately, skills are earned before they’re expected across 3 progressive phases:
                        </p>
                    </div>
                    <div className="mad-section-divider"></div>
                </div>

                {/* Phase Selection Tabs */}
                <div className="mad-phase-tabs">
                    {[
                        { id: 1, label: "Phase 1: Foundation & Exposure", timing: "Aug – Oct", badge: "No Coding Needed" },
                        { id: 2, label: "Phase 2: Guided Skill Building", timing: "Nov – Jan", badge: "No-Code First" },
                        { id: 3, label: "Phase 3: Structured Build & Showcase", timing: "Feb – Apr", badge: "Build & Launch" }
                    ].map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setActivePhase(phase.id)}
                            className={`mad-phase-tab-btn ${activePhase === phase.id ? 'active' : ''}`}
                        >
                            <div className="mad-phase-tab-num">0{phase.id}</div>
                            <div className="text-left">
                                <div className="mad-phase-tab-title">{phase.label}</div>
                                <div className="mad-phase-tab-sub">{phase.timing} • <span className="text-[#FCCA26]">{phase.badge}</span></div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Phase Content Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="mad-phase-card"
                    >
                        <div className="mad-phase-header-bar">
                            <div>
                                <span className="mad-phase-tag">{phaseData[activePhase].tag}</span>
                                <h3 className="mad-phase-current-title">{phaseData[activePhase].title}</h3>
                                <p className="mad-phase-goal">
                                    <strong>Goal:</strong> {phaseData[activePhase].goal}
                                </p>
                            </div>
                        </div>

                        <div className="mad-events-grid">
                            {phaseData[activePhase].events.map((evt, eIdx) => {
                                const IconComponent = evt.icon;
                                return (
                                    <div key={eIdx} className="mad-event-item">
                                        <div className="mad-event-top">
                                            <span className="mad-event-badge">{evt.badge}</span>
                                            <div className="mad-event-icon-wrap">
                                                <IconComponent className="w-4 h-4 text-[#FCCA26]" />
                                            </div>
                                        </div>
                                        <h4 className="mad-event-title">{evt.title}</h4>
                                        <p className="mad-event-desc">{evt.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Future Roadmap & Awards Grid */}
            <div className="mad-two-col-grid">
                {/* Future Roadmap */}
                <section className="mad-section-card">
                    <div className="mad-card-header">
                        <Rocket className="w-5 h-5 text-[#FCCA26]" />
                        <h3 className="mad-card-title">Future Roadmap (Year 2 & Beyond)</h3>
                    </div>
                    <p className="mad-card-intro">
                        Strong flagship initiatives held back until a skilled base of members exists from Phases 1–3:
                    </p>
                    <div className="mad-roadmap-list">
                        {roadmapItems.map((item, idx) => (
                            <div key={idx} className="mad-roadmap-item">
                                <div className="mad-roadmap-bullet">
                                    <ArrowRight className="w-4 h-4 text-[#FCCA26]" />
                                </div>
                                <div>
                                    <h4 className="mad-roadmap-name">{item.title}</h4>
                                    <p className="mad-roadmap-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Awards & Recognition */}
                <section className="mad-section-card">
                    <div className="mad-card-header">
                        <Award className="w-5 h-5 text-[#FCCA26]" />
                        <h3 className="mad-card-title">How to Win: Awards & Recognition</h3>
                    </div>
                    <p className="mad-card-intro">
                        A trimmed, meaningful list — with a realistic path for <em>every skill level</em> to win something:
                    </p>
                    <div className="mad-awards-list">
                        {awards.map((award, idx) => (
                            <div key={idx} className="mad-award-item">
                                <div className="mad-award-star">
                                    <Star className="w-4 h-4 text-[#FCCA26] fill-[#FCCA26]" />
                                </div>
                                <div>
                                    <h4 className="mad-award-title">{award.title}</h4>
                                    <p className="mad-award-desc">{award.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Join & Social Connect Banner */}
            <section className="mad-join-section">
                <div className="mad-join-wrapper">
                    <div className="mad-join-info">
                        <span className="mad-section-kicker">LET'S BUILD TOGETHER</span>
                        <h2 className="mad-join-title">Scan, Connect & Join MAD Club!</h2>
                        
                        <div className="mad-join-criteria mb-6">
                            <h4 className="text-white font-semibold mb-3">Who can join?</h4>
                            <ul className="space-y-2 text-sm text-white/80">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#FCCA26] flex-shrink-0" />
                                    <span>Open to students of <strong>all departments and branches</strong>.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#FCCA26] flex-shrink-0" />
                                    <span>Basic understanding of programming / design helps, but isn't required.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#FCCA26] flex-shrink-0" />
                                    <span>Most of all — be <strong>curious and excited</strong> to learn mobile app development!</span>
                                </li>
                            </ul>
                        </div>

                        {/* Registration QR Card */}
                        <div className="mad-qr-action-card">
                            <div className="mad-qr-box">
                                <QRCodeSVG 
                                    value={GOOGLE_FORM_URL}
                                    size={110}
                                    bgColor="#ffffff"
                                    fgColor="#0a0f1d"
                                    level="Q"
                                    includeMargin={true}
                                />
                                <span className="mad-qr-scan-label">Scan to Apply</span>
                            </div>
                            <div className="mad-qr-details">
                                <span className="mad-reg-badge">ONLINE REGISTRATION</span>
                                <h4 className="mad-qr-title">Official Induction Form</h4>
                                <p className="mad-qr-sub">Fill out the quick Google Form to officially register for MAD Club 2026–27.</p>
                                <a 
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mad-form-cta-btn"
                                >
                                    <span>Open Registration Google Form</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mad-social-box">
                        <h4 className="mad-social-title">Follow Us & Stay Connected</h4>
                        <p className="mad-social-sub">For reels, event photos & behind-the-scenes:</p>
                        
                        <div className="mad-social-grid">
                            {socialLinks.map((social, sIdx) => {
                                const SocialIcon = social.icon;
                                return (
                                    <a 
                                        key={sIdx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mad-social-btn"
                                    >
                                        <SocialIcon className="w-5 h-5" style={{ color: social.color }} />
                                        <div className="text-left">
                                            <span className="mad-social-name">{social.name}</span>
                                            <span className="mad-social-handle">{social.handle}</span>
                                        </div>
                                        <ExternalLink className="w-3.5 h-3.5 text-white/40 ml-auto" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MADClubDetail;
