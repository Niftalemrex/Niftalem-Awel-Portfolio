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
  Brain,
  Cloud,
  Cpu,
  Link as LinkIcon,
  X,
  Copy,
  Check,
  Send
} from "lucide-react";
import "./portfolio.css";

// Skills data from resume
const skills = [
  { name: "Frontend Development", icon: <Code size={24} />, level: 90, color: "#6366f1", 
    tools: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "PHP"] },
  { name: "Backend Development", icon: <Server size={24} />, level: 88, color: "#8b5cf6",
    tools: ["Node.js", "Express.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "MySQL", "Firebase"] },
  { name: "AI/ML Engineering", icon: <Brain size={24} />, level: 85, color: "#ec4899",
    tools: ["Scikit-learn", "XGBoost", "LightGBM", "PyTorch", "TensorFlow", "Keras", "OpenCV", "YOLO", "NLTK", "SpaCy"] },
  { name: "Mobile Development", icon: <Smartphone size={24} />, level: 82, color: "#14b8a6",
    tools: ["Flutter", "React Native", "Dart", "Android"] },
  { name: "DevOps & Cloud", icon: <Cloud size={24} />, level: 75, color: "#f59e0b",
    tools: ["Docker", "AWS", "Supabase", "Auth0"] },
  { name: "System Architecture", icon: <Cpu size={24} />, level: 80, color: "#ef4444",
    tools: ["Microservices", "REST APIs", "System Design", "Clean Architecture"] }
];

// Experience data – NEW NiCol entry added at the top
const experiences = [
  {
    title: "Full Stack Developer",
    company: "NiCol",
    employmentType: "Freelance",
    period: "11/2025 - 12/2025",
    location: "Addis Ababa, Ethiopia",
    icon: <Code size={20} />,
    description:
      "Built and deployed a personal portfolio and technology blog platform using modern web technologies, focusing on performance, SEO, and user experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel"
    ],
    achievements: [
      "Developed a responsive portfolio with server-side rendering and static generation",
      "Implemented authentication and data management with Supabase",
      "Optimized SEO with Google sitemap and metadata",
      "Deployed on Vercel with continuous integration",
      "Achieved 90+ Lighthouse scores for performance and accessibility"
    ],
    github: "https://github.com/Niftalemrex/NiCol-Technology",
    demo: "https://nicol-technology.vercel.app"
  },
  {
    title: "Frontend Developer",
    company: "WEMS (Wedding Event Management System)",
    employmentType: "Freelance",
    period: "02/2025 - 05/2025",
    location: "Addis Ababa, Ethiopia",
    icon: <Code size={20} />,
    description:
      "Built a modern multi-role wedding management platform that helps couples, vendors, and event managers organize weddings efficiently.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Django",
      "PostgreSQL",
      "TailwindCSS"
    ],
    achievements: [
      "Implemented complex form handling and validation flows",
      "Developed JWT-based authentication system",
      "Built multi-role dashboards (Admin, Couples, Vendors, Managers)",
      "Optimized UI performance for mobile and desktop users"
    ],
    github: "https://github.com/Niftalemrex/WEMS-Wedding-Events-Management-System",
    demo: "https://niftalemrex.github.io/WEMS-Wedding-Events-Management-System/"
  },
  {
    title: "Full Stack Developer",
    company: "LIMS Project",
    employmentType: "Internship",
    period: "02/2024 - 09/2025",
    location: "Addis Ababa, Ethiopia",
    icon: <Briefcase size={20} />,
    description:
      "Developed an enterprise Laboratory Information Management System for managing lab workflows, sample tracking, and test reporting.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Django",
      "PostgreSQL",
      "REST API"
    ],
    achievements: [
      "Developed multi-role dashboard interfaces for laboratory staff",
      "Implemented secure authentication and role-based access control",
      "Designed laboratory workflow system for sample lifecycle tracking",
      "Integrated REST APIs for real-time test result management"
    ],
    github: "https://github.com/Niftalemrex/LIMS-Laboratory-Information-Management-System",
    demo: "https://niftalemrex.github.io/LIMS-Laboratory-Information-Management-System/"
  }
];




// Education data
const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "St. Mary's University",
    period: "2022 - 2026",
    location: "Addis Ababa, Ethiopia",
    description: "Graduated with a strong foundation in Computer Science, focusing on software engineering, algorithms, and data structures.",
    icon: <GraduationCap size={20} />
  }
];

// Certifications with actual links
const certifications = [
  {
    name: "Artificial Intelligence Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "02/2025 - 12/2025",
    icon: <Award size={20} />,
    link: "https://www.udacity.com/certificate/e/ff19f39c-0f27-11f1-a148-7346d43a164b"
  },
  {
    name: "AI Career Essentials",
    issuer: "ALX Africa",
    period: "03/2025 - 09/2025",
    icon: <Award size={20} />,
    link: "https://savanna.alxafrica.com/certificates/6NJmEHZRL5"
  },
  {
    name: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "03/2025 - 08/2025",
    icon: <Award size={20} />,
    link: "https://confirm.udacity.com/e/3b779c46-4c41-11ef-ae47-9fdfa866c280"
  },
  {
    name: "Android Developer Fundamentals Nanodegree",
    issuer: "Udacity",
    period: "03/2025 - 08/2025",
    icon: <Award size={20} />,
    link: "https://confirm.udacity.com/NACDEU4C"
  }
];

// GitHub repositories
const githubRepos = [
  { name: "WEMS-Wedding-Events-Management-System", description: "Wedding Events Management System", language: "TypeScript", stars: 8, forks: 7 },
  { name: "Stroke-Prediction-ML", description: "ML model for stroke risk prediction", language: "Python", stars: 9, forks: 6 },
  { name: "LIMS-Laboratory-Information-Management-System", description: "Laboratory Information Management System", language: "TypeScript", stars: 7, forks: 6 },
  { name: "HIDS", description: "Hospital Information Dissemination System", language: "PHP", stars: 7, forks: 1 },
  { name: "Webcam_recognize_faces-eyes", description: "Real-time face and eye recognition", language: "Python", stars: 9, forks: 8 },
  {
    name: "NiCol-Technology",
    description: "My personal portfolio website built with Next.js, TypeScript, Supabase, and Google sitemap.",
    language: "TypeScript",
    stars: 10,
    forks: 7
  }
];

export default function Portfolio() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const certificationsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isAboutInView = useInView(aboutRef, { once: true });
  const isSkillsInView = useInView(skillsRef, { once: true });
  const isExperienceInView = useInView(experienceRef, { once: true });
  const isEducationInView = useInView(educationRef, { once: true });
  const isCertificationsInView = useInView(certificationsRef, { once: true });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactInfo = [
    {
      type: "Email",
      value: "niftalemawel@gmail.com",
      icon: <Mail size={24} />,
      action: "mailto:niftalemawel@gmail.com",
      color: "#ea4335"
    },
    {
      type: "Phone",
      value: "0939193603",
      icon: <Smartphone size={24} />,
      action: "tel:0939193603",
      color: "#34a853"
    },
    {
      type: "Telegram",
      value: "@Ni_Col67",
      username: "Ni_Col67",
      icon: <Send size={24} />,
      action: "https://t.me/Ni_Col67",
      color: "#0088cc"
    },
    {
      type: "Location",
      value: "Addis Ababa, Ethiopia",
      icon: <MapPin size={24} />,
      color: "#4285f4"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Parallax */}
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
          <motion.div variants={fadeInUp} className="hero-badge">
            <span className="badge-pulse"></span>
            <span>Full Stack | App & AI Engineer</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp}>
            <span className="gradient-text">Niftalem</span>
            <br />
            <span className="gradient-text-alt">Awel</span>
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="hero-contact">
            <span><Mail size={16} /> niftalemawel@gmail.com</span>
            <span>•</span>
            <span>0939193603</span>
            <span>•</span>
            <span><Send size={16} /> @Ni_Col67</span>
            <span>•</span>
            <span><MapPin size={16} /> Addis Ababa, Ethiopia</span>
          </motion.div>
          
          <motion.p variants={fadeInUp}>
            I build scalable web and mobile applications using modern technologies.
            Focused on clean architecture, secure systems, performance optimization,
            and integrating machine learning into real-world solutions.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="hero-buttons">
            <motion.a 
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              whileHover={{ scale: 1.05 }}
            >
              <Github size={20} />
              GitHub
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink size={20} />
              LinkedIn
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">Year Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Certifications</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="portfolio-about">
        <motion.div
          className="about-container"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Get to know me</span>
            <h2 className="section-title">Profile</h2>
            <div className="section-divider"></div>
          </motion.div>

          <motion.div 
            className="about-text"
            variants={fadeInUp}
          >
            <p>
              I am a Full Stack and AI Engineer specializing in building scalable web 
              and mobile applications using modern technologies. I focus on clean 
              architecture, secure systems, performance optimization, and integrating 
              machine learning into real-world solutions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="portfolio-skills">
        <motion.div
          className="skills-container"
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">What I do best</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-progress">
                  <motion.div 
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={isSkillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    style={{ background: skill.color }}
                  />
                </div>
                <span className="skill-level">{skill.level}%</span>
                
                <div className="tools-container">
                  {skill.tools.slice(0, 5).map((tool, i) => (
                    <span key={i} className="tool-tag">{tool}</span>
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

      {/* Experience Section with Detailed Projects */}
      <section ref={experienceRef} className="portfolio-experience">
        <motion.div
          className="experience-container"
          initial="hidden"
          animate={isExperienceInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">My Journey</span>
            <h2 className="section-title">Professional Experience</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={fadeInUp}
              >
                <div className="timeline-icon">
                  {exp.icon}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <h4>
                    {exp.company} • {exp.location}
                  </h4>
                  <p className="timeline-description">
                    {exp.description}
                  </p>
                  <div className="project-technologies">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="experience-achievements">
                    <h5>Key Achievements</h5>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="experience-links" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <motion.a
                      href={exp.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-profile-link"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github size={18} />
                      <span>View Repository</span>
                      <ExternalLink size={14} />
                    </motion.a>
                    {exp.demo && (
                      <motion.a
                        href={exp.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        whileHover={{ scale: 1.05 }}
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                      >
                        <ExternalLink size={18} />
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

      {/* Education Section */}
      <section ref={educationRef} className="portfolio-education">
        <motion.div
          className="education-container"
          initial="hidden"
          animate={isEducationInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-subtitle">Academic background</span>
            <h2 className="section-title">Education</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="education-grid">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                variants={scaleIn}
              >
                <div className="education-icon">
                  {edu.icon}
                </div>
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

      {/* Certifications Section with Links */}
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
            <div className="section-divider"></div>
          </motion.div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-card"
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <div className="certification-icon">
                  {cert.icon}
                </div>
                <div className="certification-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <span className="certification-period">{cert.period}</span>
                  <div className="certification-link">
                    <LinkIcon size={12} />
                    <span>View Certificate</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* GitHub Repositories Section */}
      <section className="portfolio-github">
        <motion.div
          className="github-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <span className="section-subtitle">Open source</span>
            <h2 className="section-title">GitHub Repositories</h2>
            <div className="section-divider"></div>
          </div>

          <div className="github-repos-grid">
            {githubRepos.map((repo, index) => (
              <motion.a
                key={index}
                href={`https://github.com/Niftalemrex/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="repo-header">
                  <Github size={20} />
                  <h3>{repo.name}</h3>
                </div>
                <p className="repo-description">{repo.description}</p>
                <div className="repo-stats">
                  <span className="repo-language">
                    <span className="language-dot" style={{ 
                      backgroundColor: 
                        repo.language === 'Python' ? '#3572A5' :
                        repo.language === 'JavaScript' ? '#F7DF1E' :
                        repo.language === 'TypeScript' ? '#3178C6' :
                        repo.language === 'CSS' ? '#563D7C' : '#6e7681'
                    }} />
                    {repo.language}
                  </span>
                  <span className="repo-stars">
                    <span>⭐</span> {repo.stars}
                  </span>
                  <span className="repo-forks">
                    <span>⑂</span> {repo.forks}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? Let's bring your ideas to life.</p>
          <motion.button
            onClick={() => setShowContactModal(true)}
            className="primary-btn cta-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Conversation
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Modal */}
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
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Contact Information</h2>
                <motion.button
                  className="modal-close"
                  onClick={() => setShowContactModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="modal-body">
                <p className="modal-subtitle">
                  Let's collaborate! Reach out to me through any of these channels:
                </p>

                <div className="contact-cards">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="contact-card"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ borderLeftColor: info.color }}
                    >
                      <div className="contact-icon" style={{ color: info.color }}>
                        {info.icon}
                      </div>
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
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {info.type === "Email" && "Send Email"}
                              {info.type === "Phone" && "Call Now"}
                              {info.type === "Telegram" && "Message on Telegram"}
                              {info.type === "Location" && "View on Map"}
                            </motion.a>
                          )}
                          {info.type !== "Location" && (
                            <motion.button
                              className="contact-action-btn copy-btn"
                              onClick={() => handleCopy(info.type === "Telegram" ? info.username || info.value : info.value, info.type)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {copiedField === info.type ? (
                                <>
                                  <Check size={16} />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={16} />
                                  <span>Copy</span>
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="modal-footer">
                  <p>Connect with me on other platforms:</p>
                  <div className="social-links-modal">
                    <motion.a
                      href="https://github.com/Niftalemrex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link github"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/niftalem-awel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a
                      href="https://t.me/Ni_Col67"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link telegram"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Send size={20} />
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