import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code,
  Smartphone,
  Server,
  ArrowRight,
  Github,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Shield,      
  Cloud,
  Cpu,
  Lock,        
  Link as LinkIcon,
  X,
  Copy,
  Check,
  Send,
  Target      // ← Added icon for Hack The Box
} from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";
import type { CarouselProject } from './ProjectCard';
import "./portfolio.css";

/* ── Data ──────────────────────────────────────────────────── */

const skills = [
  { name: "Frontend Development", icon: <Code size={22} />, level: 90, color: "#c9a84c",
    tools: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "PHP"] },
  { name: "Backend Development", icon: <Server size={22} />, level: 88, color: "#c9a84c",
    tools: ["Node.js", "Express.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "MySQL", "Firebase"] },
  { name: "AI / ML Engineering", icon: <Shield size={22} />, level: 85, color: "#c9a84c",
    tools: ["Scikit-learn", "XGBoost", "LightGBM", "PyTorch", "TensorFlow", "Keras", "OpenCV", "YOLO", "NLTK", "SpaCy"] },
  { name: "Mobile Development", icon: <Smartphone size={22} />, level: 82, color: "#c9a84c",
    tools: ["Flutter", "React Native", "Dart", "Android"] },
  { name: "DevOps & Cloud", icon: <Cloud size={22} />, level: 75, color: "#c9a84c",
    tools: ["Docker", "AWS", "Supabase", "Auth0"] },
  { name: "System Architecture", icon: <Cpu size={22} />, level: 80, color: "#c9a84c",
    tools: ["Microservices", "REST APIs", "System Design", "Clean Architecture"] },
  { 
    name: "Cyber Security & DevSecOps", 
    icon: <Lock size={22} />, 
    level: 78, 
    color: "#c9a84c",
    tools: ["JWT / OAuth 2.0", "CORS & CSRF Protection", "Data Encryption", "Input Sanitization", "Helmet.js", "OWASP Top 10", "Secure Cookies", "HTTPS/TLS"] 
  }
];

const experiences = [
  {
    title: "Full Stack Developer",
    company: "XDose",
    employmentType: "For Sell",
    period: "03/2026",
    location: "Addis Ababa, Ethiopia",
    icon: <Briefcase size={18} />,
    description: "A B2B pharmaceutical marketplace bridging the gap between pharmacies — enabling real-time exchange of medicines, especially overstock and near-expiry products. The platform improves inventory utilization, reduces waste, and ensures medicine availability across locations.",
    technologies: ["React", "TypeScript", "Vite", "Supabase"],
    achievements: [
      "Developed multi-role dashboard and inventory listing system",
      "Implemented secure authentication and smart matching engine",
      "Solved the overstock/shortage imbalance across pharmacy chains",
      "Eliminated revenue loss from expired drug stock",
      "Implemented JWT blacklisting and strict CORS policies to protect sensitive medical data"
    ],
    github: "https://github.com/Niftalemrex/XDose-B2B",
    demo: "https://x-dose-b2b.vercel.app"
  },
  {
    title: "Full Stack Developer",
    company: "NiCol",
    employmentType: "Freelance",
    period: "11–12/2025",
    location: "Addis Ababa, Ethiopia",
    icon: <Code size={18} />,
    description: "Built and deployed a personal portfolio and technology blog platform using modern web technologies — focusing on performance, SEO, and user experience.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    achievements: [
      "Developed responsive portfolio with SSR and static generation",
      "Implemented authentication and data management with Supabase",
      "Optimized SEO with Google sitemap and structured metadata",
      "Achieved 90+ Lighthouse scores for performance and accessibility",
      "Secured API endpoints and implemented HTTPS enforcement for all data transactions"
    ],
    github: "https://github.com/Niftalemrex/NiCol-Technology",
    demo: "https://nicol-technology.vercel.app"
  },
  {
    title: "Frontend Developer",
    company: "WEMS",
    employmentType: "Freelance",
    period: "02–05/2025",
    location: "Addis Ababa, Ethiopia",
    icon: <Code size={18} />,
    description: "Built a modern multi-role wedding management platform helping couples, vendors, and event managers organize weddings efficiently.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Django", "PostgreSQL", "Tailwind CSS"],
    achievements: [
      "Implemented complex form handling and validation flows",
      "Developed JWT-based authentication system",
      "Built multi-role dashboards for Admin, Couples, Vendors, Managers",
      "Optimized UI performance for both mobile and desktop users",
      "Implemented role-based access control (RBAC) and encrypted session management"
    ],
    github: "https://github.com/Niftalemrex/WEMS-Wedding-Events-Management-System",
    demo: "https://niftalemrex.github.io/WEMS-Wedding-Events-Management-System/"
  },
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "St. Mary's University",
    period: "2022 – 2026",
    location: "Addis Ababa, Ethiopia",
    description: "Strong foundation in Computer Science with focus on software engineering, algorithms, and data structures.",
    icon: <GraduationCap size={20} />
  }
];

const certifications = [
  {
    name: "Artificial Intelligence Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "02/2025 – 12/2025",
    icon: <Award size={18} />,
    link: "https://www.udacity.com/certificate/e/ff19f39c-0f27-11f1-a148-7346d43a164b"
  },
  {
    name: "AI Career Essentials",
    issuer: "ALX Africa",
    period: "03/2025 – 09/2025",
    icon: <Award size={18} />,
    link: "https://savanna.alxafrica.com/certificates/6NJmEHZRL5"
  },
  {
    name: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "03/2025 – 08/2025",
    icon: <Award size={18} />,
    link: "https://confirm.udacity.com/e/3b779c46-4c41-11ef-ae47-9fdfa866c280"
  },
  {
    name: "Android Developer Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "03/2025 – 08/2025",
    icon: <Award size={18} />,
    link: "https://confirm.udacity.com/NACDEU4C"
  }
];

const githubRepos = [
  { name: "WEMS-Wedding-Events-Management-System", description: "Wedding Events Management System", language: "TypeScript", stars: 8, forks: 7 },
  { name: "Stroke-Prediction-ML", description: "ML model for stroke risk prediction", language: "Python", stars: 9, forks: 6 },
  { name: "LIMS-Laboratory-Information-Management-System", description: "Laboratory Information Management System", language: "TypeScript", stars: 7, forks: 6 },
  { name: "HIDS", description: "Hospital Information Dissemination System", language: "PHP", stars: 7, forks: 1 },
  { name: "Webcam_recognize_faces-eyes", description: "Real-time face and eye recognition", language: "Python", stars: 9, forks: 8 },
  { name: "NiCol-Technology", description: "Personal portfolio built with Next.js, TypeScript, Supabase, and Google sitemap.", language: "TypeScript", stars: 10, forks: 7 }
];

const carouselProjects: CarouselProject[] = [
  {
    id: 1,
    title: "XDose B2B Pharma",
    video: "/videos/XDose.mp4",
    image: "https://placehold.co/300x450/c9a84c/0a0a0a?text=XDose",
    backgroundImage: "/videos/XDose-bg.png",
    technologies: ["React", "TypeScript", "Supabase"],
    github: "https://github.com/Niftalemrex/XDose-B2B",
    demo: "https://x-dose-b2b.vercel.app",
    securityBadge: "JWT Auth · CORS Protected",
    securityScore: "A+ (OWASP Compliant)"
  },
  {
    id: 2,
    title: "NiCol Technology",
    video: "/videos/NiCol SEO.mp4",
    image: "https://placehold.co/300x450/8a6d2f/f0ece2?text=NiCol",
    backgroundImage: "/videos/NiCol-bg.png",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/Niftalemrex/NiCol-Technology",
    demo: "https://nicol-technology.vercel.app",
    securityBadge: "Supabase Auth · HTTPS",
    securityScore: "A+ (OWASP Compliant)"
  },
  {
    id: 3,
    title: "NiCol IMS",
    video: "/videos/IMS.mp4",
    image: "https://placehold.co/300x450/3a3730/f0ece2?text=IMS",
    backgroundImage: "/videos/IMS-bg.png",
    technologies: ["Flutter", "Mysql"],
    github: "https://github.com/Niftalemrex/Stroke-Prediction-ML",
    demo: "#"
  },
  {
    id: 4,
    title: "WEMS Wedding",
    video: "/videos/WEMS.mp4",
    image: "https://placehold.co/300x450/1e1e1e/c9a84c?text=WEMS",
    backgroundImage: "/videos/WEMS-bg.png",
    technologies: ["React", "Django", "PostgreSQL"],
    github: "https://github.com/Niftalemrex/WEMS-Wedding-Events-Management-System",
    demo: "https://niftalemrex.github.io/WEMS-Wedding-Events-Management-System/",
    securityBadge: "JWT · RBAC",
    securityScore: "A (RBAC & JWT)"
  },
];

/* ── Animation Variants ─────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const scaleIn = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } }
};

/* ── Component ─────────────────────────────────────────────── */
export default function Portfolio() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedField, setCopiedField]           = useState<string | null>(null);
  const [carouselBgImage, setCarouselBgImage]   = useState<string>(
    carouselProjects[0]?.backgroundImage || carouselProjects[0]?.image || ''
  );

  const handleCarouselFocusChange = (project: CarouselProject) => {
    setCarouselBgImage(project.backgroundImage || project.image || '');
  };

  const heroRef           = useRef(null);
  const aboutRef          = useRef(null);
  const skillsRef         = useRef(null);
  const experienceRef     = useRef(null);
  const educationRef      = useRef(null);
  const certificationsRef = useRef(null);
  const carouselRef       = useRef(null);

  const isHeroInView           = useInView(heroRef,           { once: true });
  const isAboutInView          = useInView(aboutRef,          { once: true });
  const isSkillsInView         = useInView(skillsRef,         { once: true });
  const isExperienceInView     = useInView(experienceRef,     { once: true });
  const isEducationInView      = useInView(educationRef,      { once: true });
  const isCertificationsInView = useInView(certificationsRef, { once: true });
  const isCarouselInView       = useInView(carouselRef,       { once: true });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactInfo = [
    { type: "Email",    value: "niftalemawel@gmail.com",  icon: <Mail size={20} />,      action: "mailto:niftalemawel@gmail.com" },
    { type: "Phone",    value: "0939193603",               icon: <Smartphone size={20} />, action: "tel:0939193603" },
    { type: "Telegram", value: "@Zz_nicol",                icon: <Send size={20} />,       action: "https://t.me/Ni_Col67", username: "Ni_Col67" },
    { type: "Location", value: "Addis Ababa, Ethiopia",    icon: <MapPin size={20} /> },
  ];

  const langColor: Record<string, string> = {
    Python: '#3572A5', TypeScript: '#3178C6', PHP: '#8892BE', JavaScript: '#F7DF1E'
  };

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="portfolio-hero">
        <div className="hero-background">
          <div className="hero-shape shape-1" />
          <div className="hero-shape shape-2" />
          <div className="hero-shape shape-3" />
        </div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Network Topology */}
          <motion.div 
            className="network-topology"
            variants={fadeInUp}
          >
            <svg viewBox="0 0 200 100" width="80" height="40">
              <circle cx="20" cy="50" r="3" fill="#c9a84c" />
              <circle cx="100" cy="30" r="3" fill="#f0ece2" />
              <circle cx="180" cy="70" r="3" fill="#c9a84c" />
              <line x1="20" y1="50" x2="100" y2="30" stroke="rgba(201,168,76,0.4)" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="100" y1="30" x2="180" y2="70" stroke="rgba(201,168,76,0.4)" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-badge">
            {/* ★ GREEN BLINKING DOT (using Shield icon) */}
            <span className="badge-pulse">
              <Shield size={12} />
            </span>
            <span>Full Stack · App · AI </span>
            
            {/* Cyber Security Gold Tag */}
            <motion.span 
              className="hero-badge-cyber"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Lock size={12} /> Cyber Security
            </motion.span>
          </motion.div>

          <motion.h1 variants={fadeInUp}>
            <span className="gradient-text">Niftalem</span>
            <br />
            <span className="gradient-text-alt">Awel</span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="hero-contact">
            <span><Mail size={12} /> niftalemawel@gmail.com</span>
            <span>·</span>
            <span>0939193603</span>
            <span>·</span>
            <span><Send size={12} /> @Ni_Col67</span>
            <span>·</span>
            <span><MapPin size={12} /> Addis Ababa, Ethiopia</span>
          </motion.div>

          <motion.p variants={fadeInUp}>
            I build secure, scalable web and mobile applications using modern technologies. 
            Expert in clean architecture, AI/ML integration, and implementing 
            <strong> robust security protocols </strong> to protect data and systems 
            in real-world environments.
          </motion.p>

          {/* ── HERO BUTTONS ─────────────────────────────────────── */}
          <motion.div variants={fadeInUp} className="hero-buttons">
            <motion.a
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              whileTap={{ scale: 0.97 }}
            >
              <Github size={16} /> GitHub
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={16} /> LinkedIn
            </motion.a>
            {/* ★ NEW: Hack The Box Button */}
            <motion.a
              href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb"
              target="_blank"
              rel="noopener noreferrer"
              className="htb-link"
              whileTap={{ scale: 0.97 }}
            >
              <Target size={16} /> HTB
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-stats">
            {[
              { number: "1",  label: "Year Experience" },
              { number: "5",  label: "Projects Shipped" },
              { number: "5+", label: "Certifications"   },
            ].map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section ref={aboutRef} className="portfolio-about">
        <motion.div
          className="about-container"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Who I am</span>
            <h2 className="section-title">Profile</h2>
            <div className="section-divider" />
            
            {/* Security Stats Bar */}
            <motion.div 
              className="security-stats-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
              style={{ marginTop: '1.5rem' }}
            >
              <div className="security-stat-item">
                <Shield size={16} /> 
                <span><strong>100%</strong> Secure API Rate</span>
              </div>
              <div className="security-stat-item">
                <Lock size={16} /> 
                <span><strong>0</strong> OWASP Top 10 Vulnerabilities</span>
              </div>
              <div className="security-stat-item">
                <Code size={16} /> 
                <span><strong>JWT / RBAC</strong> Implemented</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="about-text">
            <p>
              I am a <strong>Full Stack, AI, and Cyber Security Engineer</strong> specializing in scalable web
              and mobile applications. I focus on clean architecture, secure systems,
              performance optimization, and integrating machine learning into
              real-world solutions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section ref={skillsRef} className="portfolio-skills">
        <motion.div
          className="skills-container"
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Capabilities</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className="skill-card"
                variants={scaleIn}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-progress">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={isSkillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: EASE }}
                  />
                </div>
                <span className="skill-level">{skill.level}%</span>
                <div className="tools-container">
                  {skill.tools.slice(0, 5).map((t, j) => (
                    <span key={j} className="tool-tag">{t}</span>
                  ))}
                  {skill.tools.length > 5 && (
                    <span className="tool-tag">+{skill.tools.length - 5}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────── */}
      <section ref={experienceRef} className="portfolio-experience">
        <motion.div
          className="experience-container"
          initial="hidden"
          animate={isExperienceInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Track record</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="timeline">
            {experiences.map((exp, i) => (
              <motion.div key={i} className="timeline-item" variants={fadeInUp}>
                <div className="timeline-icon">{exp.icon}</div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <h4>{exp.company} · {exp.employmentType} · {exp.location}</h4>
                  <p className="timeline-description">{exp.description}</p>

                  <div className="project-technologies">
                    {exp.technologies.map((t, j) => (
                      <span key={j} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="experience-achievements">
                    <h5>Key Achievements</h5>
                    <ul>
                      {exp.achievements.map((a, j) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <motion.a
                      href={exp.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-profile-link"
                      whileTap={{ scale: 0.97 }}
                    >
                      <Github size={14} />
                      <span>Repository</span>
                      <ExternalLink size={11} />
                    </motion.a>
                    {exp.demo && exp.demo !== '#' && (
                      <motion.a
                        href={exp.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        whileTap={{ scale: 0.97 }}
                        style={{ borderColor: 'rgba(201,168,76,0.35)', color: '#c9a84c' }}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────── */}
      <section ref={educationRef} className="portfolio-education">
        <motion.div
          className="education-container"
          initial="hidden"
          animate={isEducationInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Foundation</span>
            <h2 className="section-title">Education</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="education-grid">
            {education.map((edu, i) => (
              <motion.div key={i} className="education-card" variants={scaleIn}>
                <div className="education-icon">{edu.icon}</div>
                <div className="education-content">
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  <span className="education-period">{edu.period}</span>
                  <p>{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────── */}
      <section ref={certificationsRef} className="portfolio-certifications">
        <motion.div
          className="certifications-container"
          initial="hidden"
          animate={isCertificationsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-card"
                variants={scaleIn}
              >
                <div className="certification-icon">{cert.icon}</div>
                <div className="certification-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <span className="certification-period">{cert.period}</span>
                  <div className="certification-link">
                    <LinkIcon size={11} />
                    <span>View Certificate</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── GITHUB REPOS ─────────────────────────────────────── */}
      <section className="portfolio-github">
        <motion.div
          className="github-container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <span className="section-subtitle">Open Source</span>
            <h2 className="section-title">Repositories</h2>
            <div className="section-divider" />
          </div>

          <div className="github-repos-grid">
            {githubRepos.map((repo, i) => (
              <motion.a
                key={i}
                href={`https://github.com/Niftalemrex/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="repo-header">
                  <Github size={16} />
                  <h3>{repo.name}</h3>
                </div>
                <p className="repo-description">{repo.description}</p>
                <div className="repo-stats">
                  <span className="repo-language">
                    <span className="language-dot" style={{ backgroundColor: langColor[repo.language] ?? '#6e7681' }} />
                    {repo.language}
                  </span>
                  <span className="repo-stars">⭐ {repo.stars}</span>
                  <span className="repo-forks">⑂ {repo.forks}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CAROUSEL SHOWCASE ────────────────────────────────── */}
      <section
        ref={carouselRef}
        className="portfolio-carousel-showcase"
        style={{
          backgroundImage: `url(${carouselBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          isolation: 'isolate',
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(5,5,5,0.82)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1,
        }} />

        <motion.div
          className="carousel-showcase-container"
          initial="hidden"
          animate={isCarouselInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Interactive Showcase</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ProjectCarousel
              projects={carouselProjects}
              onFocusChange={handleCarouselFocusChange}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="portfolio-cta">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Let's build something remarkable.</h2>
          <p>Have a vision? I'll help you engineer it into reality.</p>
          <motion.button
            onClick={() => setShowContactModal(true)}
            className="primary-btn cta-btn"
            whileTap={{ scale: 0.97 }}
          >
            Start a Conversation
            <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </section>

      {/* ── CONTACT MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.92, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 32 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Get in Touch</h2>
                <motion.button
                  className="modal-close"
                  onClick={() => setShowContactModal(false)}
                  whileTap={{ scale: 0.93 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="modal-body">
                <p className="modal-subtitle">
                  Let's collaborate. Reach out through any of these channels.
                </p>

                <div className="contact-cards">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      className="contact-card"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="contact-icon">{info.icon}</div>
                      <div className="contact-details">
                        <h3>{info.type}</h3>
                        <p>{info.value}</p>
                        <div className="contact-actions">
                          {info.action && (
                            <motion.a
                              href={info.action}
                              target={info.type === "Telegram" ? "_blank" : undefined}
                              rel={info.type === "Telegram" ? "noopener noreferrer" : undefined}
                              className="contact-action-btn"
                              whileTap={{ scale: 0.96 }}
                            >
                              {info.type === "Email"    && "Send Email"}
                              {info.type === "Phone"    && "Call Now"}
                              {info.type === "Telegram" && "Message on Telegram"}
                            </motion.a>
                          )}
                          {info.type !== "Location" && (
                            <motion.button
                              className="contact-action-btn copy-btn"
                              onClick={() => handleCopy(
                                info.type === "Telegram" ? (info as any).username ?? info.value : info.value,
                                info.type
                              )}
                              whileTap={{ scale: 0.96 }}
                            >
                              {copiedField === info.type
                                ? <><Check size={13} /> <span>Copied</span></>
                                : <><Copy size={13} />  <span>Copy</span></>
                              }
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="modal-footer">
                  <p>Also on</p>
                  <div className="social-links-modal">
                    <motion.a href="https://github.com/Niftalemrex" target="_blank" rel="noopener noreferrer" className="social-link github" whileTap={{ scale: 0.93 }}>
                      <Github size={18} />
                    </motion.a>
                    <motion.a href="https://linkedin.com/in/niftalem-awel" target="_blank" rel="noopener noreferrer" className="social-link linkedin" whileTap={{ scale: 0.93 }}>
                      <ExternalLink size={18} />
                    </motion.a>
                    <motion.a href="https://t.me/Zz_nicol" target="_blank" rel="noopener noreferrer" className="social-link telegram" whileTap={{ scale: 0.93 }}>
                      <Send size={18} />
                    </motion.a>
                    {/* ★ NEW: Hack The Box in Contact Modal */}
                    <motion.a href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb" target="_blank" rel="noopener noreferrer" className="social-link htb" whileTap={{ scale: 0.93 }}>
                      <Target size={18} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}