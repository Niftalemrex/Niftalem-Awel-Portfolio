import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useInView, } from "framer-motion";
import { useRef, useState, } from "react";
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

// Experience data from resume with detailed project information
export const experiences = [

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

    github: "https://github.com/Niftalemrex/LIMS"
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

    github: "https://github.com/Niftalemrex/HapplyEver-WEMS-Backend-Microservice"
  }
];

export const projects = [

  {
    name: "Laboratory Information Management System (LIMS)",
    icon: <Briefcase size={18} />,
    description:
      "Enterprise laboratory management platform designed to manage laboratory workflows, samples, test results, and reporting securely.",

    technologies: [
      "Django",
      "PostgreSQL",
      "React",
      "REST API"
    ],

    features: [
      "Sample tracking system",
      "Automated laboratory workflow management",
      "Secure test result storage and reporting",
      "Role-based access control for lab staff",
      "Audit logs for regulatory compliance"
    ],

    github: "https://github.com/Niftalemrex/LIMS"
  },

  {
    name: "Stroke Prediction System",
    icon: <Code size={18} />,
    description:
      "Machine learning system that predicts stroke risk using patient health data and provides insights for preventive healthcare.",

    technologies: [
      "Python",
      "Scikit-learn",
      "Django",
      "PostgreSQL"
    ],

    features: [
      "ML model for stroke risk prediction",
      "Data preprocessing pipeline",
      "Health data visualization",
      "Risk scoring system",
      "Exportable medical reports"
    ],

    github: "https://github.com/Niftalemrex/Stroke-Prediction-ML"
  },

  {
    name: "Wedding Event Management System",
    icon: <Code size={18} />,
    description:
      "Full-stack event planning platform for organizing weddings with multiple user roles and event workflows.",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Django",
      "PostgreSQL"
    ],

    features: [
      "Multi-role system (Super Admin, Admin, Couples, Vendors)",
      "Guest list and RSVP management",
      "Vendor booking system",
      "Event scheduling and planning",
      "Budget tracking dashboard"
    ],

    github: "https://github.com/Niftalemrex/HapplyEver-WEMS-Backend-Microservice"
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
  { name: "HapplyEver-WEMS-Backend-Microservice", description: "Wedding Management System Backend Microservice", language: "JavaScript", stars: 12, forks: 4 },
  { name: "Wedding-Events-Management-System-Frontend", description: "Frontend for Wedding Events Management System", language: "CSS", stars: 8, forks: 3 },
  { name: "Stroke-Prediction-ML", description: "ML model for stroke risk prediction", language: "Python", stars: 15, forks: 6 },
  { name: "LIMS", description: "Laboratory Information Management System", language: "TypeScript", stars: 10, forks: 2 },
  { name: "HIDS", description: "Hospital Information Dissemination System", language: "Python", stars: 7, forks: 1 },
  { name: "Webcam_recognize_faces-eyes", description: "Real-time face and eye recognition", language: "Python", stars: 20, forks: 8 }
];

export default function Portfolio() {
  const [] = useState<string | null>(null);
  
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
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
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

            {/* Technologies */}
            <div className="project-technologies">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            {/* Achievements */}
            <div className="experience-achievements">

              <h5>Key Achievements</h5>

              <ul>
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>

            </div>

            {/* Repository Link */}
            <div className="experience-github">

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
          <motion.a
            href="mailto:niftalemawel@gmail.com"
            className="primary-btn cta-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Conversation
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
