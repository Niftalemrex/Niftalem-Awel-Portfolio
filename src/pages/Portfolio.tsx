import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Code,
  Smartphone,
  Server,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Shield,      
  Cloud,
  Lock,        
  X,
  Copy,
  Check,
  Send,
  Target,
  Download,
  FileText,
  Eye,
  Phone,
  CheckCircle2
} from "lucide-react";
import profileImg from "../assets/profile.jpg";
import tiletLogo from "../assets/Tilet.png";
import warrenLogo from "../assets/Warren.png";
import insaLogo from "../assets/insa.jpg";
import phoenixLogo from "../assets/phoenixopia.png";
import pedsLogo from "../assets/peds.png";
import cvPDF from "../File/Niftalem Awel Resume.pdf";
import ProjectCarousel from "./ProjectCarousel";
import type { CarouselProject } from './ProjectCard';
import "./portfolio.css";
import "./intro.css";

/* ── CountUp Component ─────────────────────────────────────── */
function CountUp({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const interval = Math.max(Math.floor(duration / target), 280);
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ── Data: Technical Skills (Consistent White Aesthetic) ───── */
const skills = [
  {
    name: "Cyber Security & Pentesting",
    icon: <Lock size={20} />,
    color: "#ffffff",
    description: "Ethical hacking, web vulnerability assessments, OWASP Top 10 mitigation, and confidential banking system security audits.",
    tools: ["Penetration Testing", "OWASP Top 10", "Burp Suite", "JWT / OAuth 2.0", "Vulnerability Assessment", "CORS & CSRF Defense", "Data Encryption", "HTTPS / TLS"]
  },
  {
    name: "Full Stack & Frontend",
    icon: <Code size={20} />,
    color: "#ffffff",
    description: "Responsive, high-performance web applications built with modern component architectures, state management, and optimized SEO.",
    tools: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "PHP", "HTML5 / CSS3"]
  },
  {
    name: "Backend & Systems",
    icon: <Server size={20} />,
    color: "#ffffff",
    description: "Scalable backend architectures, RESTful APIs, relational & NoSQL databases, and secure token-based authentication pipelines.",
    tools: ["Node.js", "Express.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "MySQL", "Supabase", "Firebase"]
  },
  {
    name: "Mobile App Development",
    icon: <Smartphone size={20} />,
    color: "#ffffff",
    description: "Cross-platform mobile applications with smooth native performance, state synchronization, and offline-first capabilities.",
    tools: ["Flutter", "Dart", "React Native", "Android SDK", "REST Integration", "Mobile Security"]
  },
  {
    name: "AI & Machine Learning",
    icon: <Shield size={20} />,
    color: "#ffffff",
    description: "Predictive machine learning models, computer vision, data analysis pipelines, and deep neural network classification.",
    tools: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "OpenCV", "YOLO", "Keras"]
  },
  {
    name: "DevSecOps & Cloud Systems",
    icon: <Cloud size={20} />,
    color: "#ffffff",
    description: "Automated security integration, CI/CD pipeline hardening, container security, vulnerability scanning, and secure cloud infrastructure.",
    tools: ["Docker Hardening", "CI/CD Security", "AWS", "Git / GitHub", "Linux / Bash", "Secrets Management", "SAST / DAST", "Vercel"]
  }
];

/* ── Data: Work Experience (Internships with Real Logos) ─────── */
const experiences = [
  {
    title: "Cybersecurity & Penetration Testing Intern",
    company: "INSA",
    companyFullName: "Information Network Security Administration",
    period: "2 Months",
    employmentType: "Internship",
    location: "Addis Ababa, Ethiopia",
    logo: insaLogo,
    icon: <Shield size={20} />,
    badge: "Legitimate International Systems & Confidential Banking Systems",
    description: "Conducted security audits, vulnerability scanning, and authorized penetration testing on legitimate international systems and confidential banking platforms.",
    technologies: ["Penetration Testing", "OWASP Top 10", "Burp Suite", "Confidential Banking Systems", "Network Security", "Vulnerability Assessment", "Linux"],
    achievements: [
      "Conducted authorized penetration tests on legitimate international platforms and confidential banking systems.",
      "Identified and cataloged critical OWASP Top 10 vulnerabilities, delivering actionable mitigation roadmaps to leadership."
    ]
  },
  {
    title: "Full Stack Developer Intern",
    company: "Phoenixopia Solution",
    companyFullName: "Phoenixopia Solution",
    period: "2 Months",
    employmentType: "Internship",
    location: "Addis Ababa, Ethiopia",
    logo: phoenixLogo,
    icon: <Code size={20} />,
    badge: "LIMS · Laboratory Information Management System",
    description: "Engineered full-stack features for a comprehensive Laboratory Information Management System (LIMS) using Flutter, React, Django, and PostgreSQL.",
    technologies: ["Flutter", "React", "Django", "PostgreSQL", "LIMS", "REST APIs", "TypeScript", "Python"],
    achievements: [
      "Engineered responsive UI and mobile features in Flutter and React for laboratory clinical operations.",
      "Developed secure Django RESTful APIs with RBAC and optimized PostgreSQL queries for patient records and test workflows."
    ]
  },
  {
    title: "Software Implementation Intern",
    company: "PEDS",
    companyFullName: "PEDS",
    period: "8 Months",
    employmentType: "Internship",
    location: "Addis Ababa, Ethiopia",
    logo: pedsLogo,
    icon: <Briefcase size={20} />,
    badge: "Enterprise POS & IMS Implementation",
    description: "Led client deployments, configuration, and end-to-end software implementation of enterprise Point of Sale (POS) and Inventory Management Systems (IMS).",
    technologies: ["POS Implementation", "IMS Systems", "Software Deployment", "Database Configuration", "Hardware Integration", "Client Support"],
    achievements: [
      "Executed an 8-month software implementation lifecycle for enterprise Point of Sale (POS) and Inventory Management Systems (IMS).",
      "Configured local databases, fiscal terminal hardware integration, and delivered comprehensive operational training to client staff."
    ]
  }
];

/* ── Data: Projects (XDose, NiCol, WEMS) ─────────────────────── */
const projects = [
  {
    title: "Full Stack Developer",
    company: "XDose",
    employmentType: "For Sell",
    period: "03/2026",
    location: "Addis Ababa, Ethiopia",
    icon: <Briefcase size={18} />,
    description: "A B2B pharmaceutical marketplace bridging the gap between pharmacies — enabling real-time exchange of medicines, especially overstock and near-expiry products to improve inventory utilization and eliminate drug waste.",
    technologies: ["React", "TypeScript", "Vite", "Supabase"],
    achievements: [
      "Developed multi-role dashboard and real-time inventory exchange engine for pharmaceutical supply chains.",
      "Implemented secure JWT authentication and strict CORS policies to eliminate medicine expiration waste."
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
    description: "Built and deployed a personal portfolio and technology blog platform using modern web technologies — focusing on performance, SEO, and seamless user experience.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    achievements: [
      "Engineered personal portfolio and tech blog platform with Next.js, TypeScript, and Supabase data layer.",
      "Achieved 90+ Google Lighthouse scores for performance, SEO metadata, and responsive accessibility."
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
    description: "Built a modern multi-role wedding management platform helping couples, vendors, and event managers organize weddings efficiently with structured workflows.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Django", "PostgreSQL", "Tailwind CSS"],
    achievements: [
      "Built comprehensive wedding events management system with multi-role RBAC for vendors, couples, and admins.",
      "Developed secure JWT session pipelines and high-throughput PostgreSQL schemas with Django & React."
    ],
    github: "https://github.com/Niftalemrex/WEMS-Wedding-Events-Management-System",
    demo: "https://niftalemrex.github.io/WEMS-Wedding-Events-Management-System/"
  },
];

/* ── Data: Education (AAU and St. Mary's University below AAU) ─ */
const education = [
  {
    degree: "Cybersecurity",
    institution: "Addis Ababa University",
    period: "2026",
    location: "Addis Ababa, Ethiopia",
    description: "Specialized cybersecurity program mentored by INSA | Information Network Security Administration.",
    icon: <Shield size={20} />
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "St. Mary's University",
    period: "2022 – 2026",
    location: "Addis Ababa, Ethiopia",
    description: "Strong foundation in Computer Science with focus on software engineering, algorithms, and data structures.",
    icon: <GraduationCap size={20} />
  }
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
  {
    id: 5,
    title: "Security Research Hub",
    video: "",
    image: "https://placehold.co/300x450/0b0f19/10b981?text=Security+Reports",
    backgroundImage: "/videos/XDose-bg.png",
    technologies: ["Penetration Testing", "Vulnerability Assessment", "OWASP Top 10", "Web Testing"],
    github: "https://github.com/Niftalemrex",
    demo: "https://cybersecurity-report-gray.vercel.app/",
    securityBadge: "Classified Reports · 100% Verified",
    securityScore: "A+ Research Hub"
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
  const [showCVModal, setShowCVModal]           = useState(false);
  const [isDownloading, setIsDownloading]       = useState(false);
  const [copiedField, setCopiedField]           = useState<string | null>(null);
  const [carouselBgImage, setCarouselBgImage]   = useState<string>(
    carouselProjects[0]?.backgroundImage || carouselProjects[0]?.image || ''
  );

  const handleDownloadCV = useCallback(() => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = cvPDF;
      link.download = "Niftalem_Awel_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      setShowCVModal(false);
    }, 800);
  }, []);

  const handleViewCV = useCallback(() => {
    window.open(cvPDF, "_blank");
    setShowCVModal(false);
  }, []);

  const handleCarouselFocusChange = (project: CarouselProject) => {
    setCarouselBgImage(project.backgroundImage || project.image || '');
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactInfo = [
    {
      type: "Email",
      label: "Direct Email",
      tag: "Primary",
      value: "niftalemawel@gmail.com",
      displayValue: "niftalemawel@gmail.com",
      icon: <Mail size={16} />,
      action: "mailto:niftalemawel@gmail.com",
      actionLabel: "Send Email"
    },
    {
      type: "Telegram",
      label: "Telegram",
      tag: "Fastest Response",
      value: "@Zz_nicol",
      displayValue: "@Zz_nicol",
      icon: <Send size={16} />,
      action: "https://t.me/Zz_nicol",
      actionLabel: "Open Chat",
      username: "Zz_nicol"
    },
    {
      type: "Phone",
      label: "Direct Phone",
      tag: "Call Directly",
      value: "0939193603",
      displayValue: "+251 939 193 603",
      icon: <Phone size={16} />,
      action: "tel:0939193603",
      actionLabel: "Call Now"
    },
    {
      type: "Location",
      label: "Location",
      tag: "Remote / Hybrid",
      value: "Addis Ababa, Ethiopia",
      displayValue: "Addis Ababa, Ethiopia",
      icon: <MapPin size={16} />
    },
  ];

  return (
    <>
      <Navbar onOpenContact={() => setShowContactModal(true)} />

      {/* ── HERO / INTRO (Kirubel Kibru Reference Design) ────── */}
      <section id="hero" className="portfolio-hero">
        <motion.div
          className="kirubel-hero-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          {/* ── Section 0: Profile Intro ── */}
          <motion.div variants={fadeInUp} className="kirubel-hero-section">
            <div className="kirubel-avatar-wrap">
              <img src={profileImg} alt="Niftalem Awel" className="kirubel-avatar" />
            </div>

            <div className="kirubel-info-body">
              <div className="kirubel-eyebrow-row">
                <p className="kirubel-eyebrow">
                  {/* Glowing Green Dot on Cyber Security · Full Stack · AI */}
                  <span className="kirubel-live-dot" />
                  <span>Cyber Security · Full Stack · AI</span>
                </p>

                {/* Circular Overlapping Startup Logos: Warren behind, Tilet in front */}
                <div className="kirubel-startup-pill" title="Tilet & Warren">
                  <div className="kirubel-overlapping-logos">
                    <div className="kirubel-logo-wrapper warren-back">
                      <img src={warrenLogo} alt="Warren Startup" className="kirubel-startup-img" />
                    </div>
                    <div className="kirubel-logo-wrapper tilet-front">
                      <img src={tiletLogo} alt="Tilet Startup" className="kirubel-startup-img" />
                    </div>
                  </div>
                  <span className="kirubel-startup-pill-title">Tilet &amp; Warren</span>
                </div>
              </div>

              <h1 className="kirubel-title">Niftalem Awel</h1>

              <p className="kirubel-subtitle">
                Tilet &amp; Warren · AI &amp; Cyber Security Engineer · Full-Stack Developer
              </p>

              <p className="kirubel-bio">
                Founder of tech startups <strong>Tilet</strong> and <strong>Warren</strong>. Builds secure, scalable web and mobile applications using modern technologies — specialized in clean architecture, AI/ML integration, and robust security protocols.
              </p>

              {/* Kirubel Tech Stack Pills — Infinite Horizontal Marquee */}
              <div className="kirubel-hero-marquee-wrapper" title="Scrolls continuously">
                <div className="kirubel-hero-marquee-track">
                  {[
                    { name: "TypeScript", color: "#3178C6" },
                    { name: "React", color: "#61DAFB" },
                    { name: "Next.js", color: "#ffffff" },
                    { name: "Nest.js", color: "#E0234E" },
                    { name: "Python", color: "#3776AB" },
                    { name: "Django", color: "#44B78B" },
                    { name: "PostgreSQL", color: "#4169E1" },
                    { name: "Prisma", color: "#5A67D8" },
                    { name: "TypeORM", color: "#FE0803" },
                    { name: "Flutter", color: "#02569B" },
                    { name: "Bash", color: "#4EAA25" },
                    { name: "Nmap", color: "#ffffff" },
                    { name: "Penetration Testing", color: "#ffffff" },
                    { name: "OWASP Top 10", color: "#ef4444" },
                    { name: "Node.js", color: "#5FA04E" },
                  ].map((s, idx) => (
                    <span key={`h1-${idx}`} className="kirubel-stack-item">
                      <span className="kirubel-stack-dot" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </span>
                  ))}
                  {[
                    { name: "TypeScript", color: "#3178C6" },
                    { name: "React", color: "#61DAFB" },
                    { name: "Next.js", color: "#ffffff" },
                    { name: "Nest.js", color: "#E0234E" },
                    { name: "Python", color: "#3776AB" },
                    { name: "Django", color: "#44B78B" },
                    { name: "PostgreSQL", color: "#4169E1" },
                    { name: "Prisma", color: "#5A67D8" },
                    { name: "TypeORM", color: "#FE0803" },
                    { name: "Flutter", color: "#02569B" },
                    { name: "Bash", color: "#4EAA25" },
                    { name: "Nmap", color: "#ffffff" },
                    { name: "Penetration Testing", color: "#ffffff" },
                    { name: "OWASP Top 10", color: "#ef4444" },
                    { name: "Node.js", color: "#5FA04E" },
                  ].map((s, idx) => (
                    <span key={`h2-${idx}`} className="kirubel-stack-item">
                      <span className="kirubel-stack-dot" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </span>
                  ))}
                  {[
                    { name: "TypeScript", color: "#3178C6" },
                    { name: "React", color: "#61DAFB" },
                    { name: "Next.js", color: "#ffffff" },
                    { name: "Nest.js", color: "#E0234E" },
                    { name: "Python", color: "#3776AB" },
                    { name: "Django", color: "#44B78B" },
                    { name: "PostgreSQL", color: "#4169E1" },
                    { name: "Prisma", color: "#5A67D8" },
                    { name: "TypeORM", color: "#FE0803" },
                    { name: "Flutter", color: "#02569B" },
                    { name: "Bash", color: "#4EAA25" },
                    { name: "Nmap", color: "#ffffff" },
                    { name: "Penetration Testing", color: "#ffffff" },
                    { name: "OWASP Top 10", color: "#ef4444" },
                    { name: "Node.js", color: "#5FA04E" },
                  ].map((s, idx) => (
                    <span key={`h3-${idx}`} className="kirubel-stack-item">
                      <span className="kirubel-stack-dot" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Security Reports & Certificates Hub */}
              <div className="kirubel-actions">
                <motion.a
                  href="https://cybersecurity-report-gray.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-btn-report"
                  whileTap={{ scale: 0.97 }}
                >
                  <Shield size={14} />
                  <span>Security Reports</span>
                  <ArrowUpRight size={14} />
                </motion.a>

                <motion.a
                  href="https://niftalem-certificates.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-btn-certs"
                  whileTap={{ scale: 0.97 }}
                >
                  <Award size={14} />
                  <span>Certificates Hub</span>
                  <ArrowUpRight size={14} />
                </motion.a>

                <motion.button
                  onClick={() => setShowCVModal(true)}
                  className="kirubel-btn-cv"
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={14} />
                  <span>Download CV</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ── Section 1: Kirubel Stats Grid with CountUp & Vertical Moving Logos Card ── */}
          <motion.div variants={fadeInUp} className="kirubel-stats-grid">
            <div className="kirubel-stat-card">
              <span className="kirubel-stat-val">
                <CountUp target={3} duration={1000} />+
              </span>
              <span className="kirubel-stat-lbl">Years Experience</span>
            </div>

            <div className="kirubel-stat-card kirubel-startup-stat-card">
              <div className="kirubel-stat-startup-header">
                <div className="kirubel-overlapping-logos-stat">
                  <div className="kirubel-logo-wrapper warren-back">
                    <img src={warrenLogo} alt="Warren" className="kirubel-startup-img" />
                  </div>
                  <div className="kirubel-logo-wrapper tilet-front">
                    <img src={tiletLogo} alt="Tilet" className="kirubel-startup-img" />
                  </div>
                </div>
                <span className="kirubel-stat-val" style={{ color: "#ffffff", fontSize: "1.05rem" }}>Tilet &amp; Warren</span>
              </div>
              <span className="kirubel-stat-lbl">Startups</span>
            </div>

            {/* Slot 3: Trusted Experience with Vertical Moving Logos */}
            <div
              className="kirubel-stat-card kirubel-vertical-marquee-card"
              onClick={() => document.querySelector('.portfolio-experience')?.scrollIntoView({ behavior: 'smooth' })}
              title="Click to view Experience"
            >
              <div className="kirubel-stat-header">
                <div className="kirubel-vertical-marquee-viewport">
                  <div className="kirubel-vertical-marquee-track">
                    {[
                      { name: "INSA", logo: insaLogo },
                      { name: "Phoenixopia", logo: phoenixLogo },
                      { name: "PEDS", logo: pedsLogo },
                      { name: "INSA", logo: insaLogo },
                      { name: "Phoenixopia", logo: phoenixLogo },
                      { name: "PEDS", logo: pedsLogo },
                    ].map((c, idx) => (
                      <div key={idx} className="kirubel-v-item">
                        <img src={c.logo} alt={c.name} className="kirubel-v-logo" />
                        <span className="kirubel-v-name">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ArrowUpRight size={16} className="kirubel-stat-arrow" />
              </div>
              <span className="kirubel-stat-lbl">Trusted Experience</span>
            </div>

            <motion.a
              href="https://cybersecurity-report-gray.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-stat-card"
            >
              <div className="kirubel-stat-header">
                <span className="kirubel-stat-val" style={{ color: "#ffffff" }}>A+</span>
                <ArrowUpRight size={16} className="kirubel-stat-arrow" />
              </div>
              <span className="kirubel-stat-lbl">Security Reports Hub</span>
            </motion.a>
          </motion.div>

          {/* ── Section 2: Kirubel Contact & Quick Connect Card ── */}
          <motion.div variants={fadeInUp} className="kirubel-contact-box">
            <div className="kirubel-contact-top">
              <div className="kirubel-contact-meta">
                <span className="kirubel-contact-meta-item">
                  <Mail size={13} />
                  <span>niftalemawel@gmail.com</span>
                </span>
                <span>·</span>
                <span className="kirubel-contact-meta-item">
                  <Phone size={13} />
                  <span>0939193603</span>
                </span>
                <span>·</span>
                <span className="kirubel-contact-meta-item">
                  <MapPin size={13} />
                  <span>Addis Ababa, Ethiopia</span>
                </span>
              </div>

              <div className="kirubel-contact-actions">
                <a href="mailto:niftalemawel@gmail.com" className="kirubel-pill-btn">
                  Email Me
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("niftalemawel@gmail.com", "Email")}
                  className="kirubel-pill-btn"
                >
                  {copiedField === "Email" ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedField === "Email" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <ul className="kirubel-socials-grid">
              <li className="kirubel-social-li">
                <a
                  href="https://linkedin.com/in/niftalem-awel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-social-link"
                >
                  <span>
                    <Linkedin size={14} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li className="kirubel-social-li">
                <a
                  href="https://github.com/Niftalemrex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-social-link"
                >
                  <span>
                    <Github size={14} />
                    GitHub
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li className="kirubel-social-li">
                <a
                  href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-social-link"
                >
                  <span>
                    <Target size={14} />
                    Hack The Box
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li className="kirubel-social-li">
                <a
                  href="https://t.me/Zz_nicol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kirubel-social-link"
                >
                  <span>
                    <Send size={14} />
                    Telegram
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="portfolio-about">
        <motion.div
          className="about-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Who I am</span>
            <h2 className="section-title">Profile</h2>
            <div className="section-divider" />
            
            {/* Security Stats Bar (Clean White Accents) */}
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

            {/* Link to Security Assessment Reports Hub */}
            <motion.div
              variants={fadeInUp}
              className="security-hub-callout"
              style={{ marginTop: '1.25rem' }}
            >
              <motion.a
                href="https://cybersecurity-report-gray.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="security-hub-callout-link"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="security-hub-callout-icon">
                  <Shield size={18} />
                </div>
                <div className="security-hub-callout-body">
                  <span className="security-hub-callout-title">Security Assessment Reports &amp; Analyses</span>
                  <span className="security-hub-callout-desc">
                    Penetration tests, vulnerability evaluations, and classified security research
                  </span>
                </div>
                <span className="security-hub-callout-action">
                  <span>Open Hub</span>
                  <ExternalLink size={13} />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="about-text">
            <p>
              I am a <strong>Full Stack, AI, and Cyber Security Engineer</strong> and founder of startups <strong>Tilet</strong> and <strong>Warren</strong>, specializing in scalable web and mobile applications. I focus on clean architecture, secure systems, penetration testing, performance optimization, and integrating machine learning into real-world solutions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS (Kirubel Kibru Reference Design - Modern Bento Cards) ── */}
      <section id="skills" className="portfolio-skills">
        <motion.div
          className="skills-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Expertise</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="kirubel-skills-grid">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className="kirubel-skill-card"
                variants={scaleIn}
              >
                <div className="kirubel-skill-top">
                  <div className="kirubel-skill-icon-wrap" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="kirubel-skill-name">{skill.name}</h3>
                  </div>
                </div>

                <p className="kirubel-skill-desc">{skill.description}</p>

                <ul className="kirubel-skill-pills">
                  {skill.tools.map((t, j) => (
                    <li key={j} className="kirubel-skill-pill">
                      <span className="kirubel-skill-pill-dot" style={{ backgroundColor: skill.color }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── EXPERIENCE (Internships with Real Logos) ───────────────── */}
      <section id="experience" className="portfolio-experience">
        <motion.div
          className="experience-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Career Journey</span>
            <h2 className="section-title">Work Experience</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="kirubel-exp-list">
            {experiences.map((exp, i) => (
              <motion.div key={i} className="kirubel-exp-card" variants={fadeInUp}>
                <div className="kirubel-exp-header">
                  <div className="kirubel-exp-title-block">
                    <div className="kirubel-exp-icon-pill">
                      <img src={exp.logo} alt={exp.company} className="kirubel-exp-logo-img" />
                    </div>
                    <div>
                      <h3 className="kirubel-exp-role">{exp.title}</h3>
                      <div className="kirubel-exp-company-row">
                        <span className="kirubel-exp-company">{exp.company}</span>
                        <span className="kirubel-exp-dot">·</span>
                        <span className="kirubel-exp-type">{exp.employmentType}</span>
                        <span className="kirubel-exp-dot">·</span>
                        <span className="kirubel-exp-loc">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="kirubel-exp-period">{exp.period}</span>
                </div>

                {exp.badge && (
                  <div className="kirubel-exp-highlight-badge">
                    <CheckCircle2 size={13} />
                    <span>{exp.badge}</span>
                  </div>
                )}

                <p className="kirubel-exp-description">{exp.description}</p>

                <div className="kirubel-exp-achievements">
                  <h4 className="kirubel-exp-section-title">Key Responsibilities &amp; Impact</h4>
                  <ul>
                    {exp.achievements.map((a, j) => (
                      <li key={j}>
                        <span className="kirubel-exp-bullet">›</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Infinite Horizontal Marquee Ticker for Tech Tags */}
                <div className="kirubel-exp-marquee-wrapper" title="Scrolls continuously">
                  <div className="kirubel-exp-marquee-track">
                    {exp.technologies.map((t, j) => (
                      <span key={`a-${j}`} className="kirubel-exp-tag">{t}</span>
                    ))}
                    {exp.technologies.map((t, j) => (
                      <span key={`b-${j}`} className="kirubel-exp-tag">{t}</span>
                    ))}
                    {exp.technologies.map((t, j) => (
                      <span key={`c-${j}`} className="kirubel-exp-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS (Serpentine / Snake Curved Light Connector) ─── */}
      <section id="projects" className="portfolio-projects">
        <motion.div
          className="projects-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Production Applications</span>
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="timeline snake-timeline">
            {/* Unique Snake / Serpentine Curved Timeline SVG Connector with Golden Glow Light */}
            <svg
              className="snake-timeline-svg"
              viewBox="0 0 54 850"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="snakeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#8a6d2f" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.25" />
                </linearGradient>
                <filter id="glowLight" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 23 20 C 46 110, 0 200, 23 290 C 46 380, 0 470, 23 560 C 46 650, 0 740, 23 830"
                stroke="#c9a84c"
                strokeWidth="4"
                strokeOpacity="0.2"
                filter="url(#glowLight)"
              />
              <path
                d="M 23 20 C 46 110, 0 200, 23 290 C 46 380, 0 470, 23 560 C 46 650, 0 740, 23 830"
                stroke="url(#snakeGrad)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <circle cx="23" cy="23" r="5" fill="#c9a84c" filter="url(#glowLight)" />
              <circle cx="23" cy="290" r="5" fill="#c9a84c" filter="url(#glowLight)" />
              <circle cx="23" cy="560" r="5" fill="#c9a84c" filter="url(#glowLight)" />
            </svg>

            {projects.map((proj, i) => (
              <motion.div key={i} className="timeline-item" variants={fadeInUp}>
                <div className="timeline-icon">{proj.icon}</div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{proj.title}</h3>
                    <span className="timeline-period">{proj.period}</span>
                  </div>
                  <h4>{proj.company} · {proj.employmentType} · {proj.location}</h4>
                  <p className="timeline-description">{proj.description}</p>

                  <div className="project-technologies">
                    {proj.technologies.map((t, j) => (
                      <span key={j} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="experience-achievements">
                    <h5>Key Achievements</h5>
                    <ul>
                      {proj.achievements.map((a, j) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-profile-link"
                      whileTap={{ scale: 0.97 }}
                    >
                      <Github size={14} />
                      <span>Repository</span>
                      <ExternalLink size={11} />
                    </motion.a>
                    {proj.demo && proj.demo !== '#' && (
                      <motion.a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        whileTap={{ scale: 0.97 }}
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

      {/* ── EDUCATION (AAU & St. Mary's University below AAU) ─────── */}
      <section id="education" className="portfolio-education">
        <motion.div
          className="education-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
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

      {/* ── CERTIFICATIONS (Unified Live Platform Card - No Gold Border) ─ */}
      <section id="certifications" className="portfolio-certifications">
        <motion.div
          className="certifications-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-divider" />
          </motion.div>

          {/* Kirubel-Style Certificates Hub Showcase Card with White Border */}
          <motion.div variants={fadeInUp} className="kirubel-certs-card">
            <div className="kirubel-certs-header">
              <div className="kirubel-certs-icon-wrap">
                <Award size={26} />
              </div>
              <div className="kirubel-certs-meta">
                <span className="kirubel-certs-badge">
                  <span className="kirubel-certs-dot" /> Verified Credentials Platform
                </span>
                <h3 className="kirubel-certs-title">Official Certificates &amp; Accreditations</h3>
              </div>
            </div>

            <p className="kirubel-certs-desc">
              All official academic degrees, Nanodegrees (Udacity Artificial Intelligence, Programming &amp; Android), ALX Africa accreditations, and systems security credentials are systematically organized and verifiable on my live platform.
            </p>

            <div className="kirubel-certs-footer">
              <motion.a
                href="https://niftalem-certificates.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="kirubel-certs-btn"
                whileTap={{ scale: 0.97 }}
              >
                <Award size={15} />
                <span>Explore Live Platform</span>
                <ArrowUpRight size={15} />
              </motion.a>
              <span className="kirubel-certs-url">niftalem-certificates.vercel.app</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CAROUSEL SHOWCASE ────────────────────────────────── */}
      <section
        id="carousel"
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
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

      {/* ── CONTACT MODAL (Kirubel Luxury Modern Redesign) ───── */}
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
              initial={{ scale: 0.94, opacity: 0, y: 28 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 28 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="contact-modal-title-group">
                  <div className="contact-modal-badge">
                    <span className="kirubel-live-dot" />
                    <span>Available for Full-time Roles &amp; Contracts</span>
                  </div>
                  <h2 className="contact-modal-heading">Let's Connect</h2>
                  <p className="contact-modal-desc">
                    Reach out directly for software engineering, cybersecurity penetration testing, or AI integration.
                  </p>
                </div>
                <motion.button
                  className="modal-close"
                  onClick={() => setShowContactModal(false)}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="modal-body">
                {/* 2x2 Modern Contact Cards Grid */}
                <div className="contact-cards-grid">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      className="contact-card-modern"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="contact-card-top">
                        <div className="contact-card-label-wrap">
                          <div className="contact-card-icon">{info.icon}</div>
                          <span className="contact-card-label">{info.label}</span>
                        </div>
                        <span className="contact-card-tag">{info.tag}</span>
                      </div>

                      <div className="contact-card-val">{info.displayValue || info.value}</div>

                      <div className="contact-card-actions">
                        {info.action && (
                          <motion.a
                            href={info.action}
                            target={info.type === "Telegram" ? "_blank" : undefined}
                            rel={info.type === "Telegram" ? "noopener noreferrer" : undefined}
                            className="contact-card-btn primary-action"
                            whileTap={{ scale: 0.96 }}
                          >
                            <span>{info.actionLabel}</span>
                            <ArrowUpRight size={12} />
                          </motion.a>
                        )}
                        {info.type !== "Location" && (
                          <motion.button
                            className="contact-card-btn"
                            onClick={() => handleCopy(
                              info.type === "Telegram" ? info.username ?? info.value : info.value,
                              info.type
                            )}
                            whileTap={{ scale: 0.96 }}
                          >
                            {copiedField === info.type
                              ? <><Check size={12} /> <span>Copied</span></>
                              : <><Copy size={12} /> <span>Copy</span></>
                            }
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Modal Footer: Verified Profiles & Hubs */}
                <div className="contact-modal-footer">
                  <div className="contact-footer-platforms">
                    <span className="contact-footer-lbl">Verified Profiles &amp; Hubs</span>
                    <div className="contact-pills-row">
                      <a href="https://github.com/Niftalemrex" target="_blank" rel="noopener noreferrer" className="contact-footer-pill">
                        <Github size={13} />
                        <span>GitHub</span>
                        <ExternalLink size={10} />
                      </a>
                      <a href="https://linkedin.com/in/niftalem-awel" target="_blank" rel="noopener noreferrer" className="contact-footer-pill">
                        <Linkedin size={13} />
                        <span>LinkedIn</span>
                        <ExternalLink size={10} />
                      </a>
                      <a href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb" target="_blank" rel="noopener noreferrer" className="contact-footer-pill">
                        <Target size={13} />
                        <span>Hack The Box</span>
                        <ExternalLink size={10} />
                      </a>
                      <a href="https://cybersecurity-report-gray.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-footer-pill">
                        <Shield size={13} />
                        <span>Security Reports Hub</span>
                        <ExternalLink size={10} />
                      </a>
                      <a href="https://niftalem-certificates.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-footer-pill">
                        <Award size={13} />
                        <span>Certificates Hub</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  <div className="contact-modal-bottom-note">
                    <span>Addis Ababa, Ethiopia (UTC+3)</span>
                    <span>·</span>
                    <span>Founder @ Tilet &amp; Warren</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CV MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {showCVModal && (
          <motion.div 
            className="intro-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCVModal(false)}
          >
            <motion.div 
              className="intro-modal"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="intro-modal-rule" />

              <div className="intro-modal-header">
                <div className="intro-modal-icon">
                  <FileText size={20} />
                </div>
                <h3 className="intro-modal-title">Curriculum Vitae</h3>
                <button className="intro-modal-close" onClick={() => setShowCVModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="intro-modal-body">
                <p className="intro-modal-desc">How would you like to view Niftalem's CV?</p>

                <div className="intro-modal-options">
                  <motion.button
                    className="intro-modal-option"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                  >
                    <div className="intro-modal-option-icon">
                      {isDownloading
                        ? <motion.div className="intro-spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                        : <Download size={24} />
                      }
                    </div>
                    <div>
                      <h4>Download CV</h4>
                      <p>Save to your device — PDF</p>
                    </div>
                  </motion.button>

                  <motion.button
                    className="intro-modal-option"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewCV}
                  >
                    <div className="intro-modal-option-icon">
                      <Eye size={24} />
                    </div>
                    <div>
                      <h4>View in Browser</h4>
                      <p>Open CV in a new tab</p>
                    </div>
                  </motion.button>
                </div>

                <div className="intro-modal-footer">
                  <span>Last updated: 2026</span>
                  <span className="intro-modal-sep">·</span>
                  <span>PDF · Optimised for web &amp; print</span>
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
