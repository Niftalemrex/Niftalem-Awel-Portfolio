import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "../hooks/useTypewriter";
import { useEffect, useState, useRef, useCallback } from "react";
import { 
  Sparkles, 
  Code, 
  Smartphone, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight,
  Download,
  MapPin,
  Briefcase,
  Award,
  FileText,
  Eye,
  X
} from "lucide-react";
import "./intro.css";

import profileImg from "../assets/profile.jpg";
import cvPDF from "../File/Niftalem Awel Resume.pdf";

type Role = {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

const particleVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 0.4, 0],
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    transition: {
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay: i * 0.05,
      ease: "easeInOut"
    }
  })
};

export default function Intro() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const { width, height, left, top } = rect;
            setMousePosition({
              x: ((e.clientX - left) / width - 0.5) * 20,
              y: ((e.clientY - top) / height - 0.5) * 20,
            });
            setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
          }
        }, 10);
      }
    };
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  const roles: Role[] = [
    { 
      label: "AI Engineer", 
      icon: <Sparkles size={14} />, 
      description: "Building intelligent systems with ML & NLP",
      color: "#c9a84c",
    },
    { 
      label: "Full-Stack Engineer", 
      icon: <Code size={14} />, 
      description: "Creating scalable web applications",
      color: "#b09060",
    },
    { 
      label: "Mobile App Engineer", 
      icon: <Smartphone size={14} />, 
      description: "Crafting native & cross-platform experiences",
      color: "#d4b86a",
    },
  ];

  const [currentRole, setCurrentRole] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const aiText = useTypewriter(
    "Designing scalable systems, intelligent AI solutions, and beautiful mobile experiences.",
    40,
    true
  );

  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const cardX = useSpring(useTransform(() => mousePosition.x * 0.2), springConfig);
  const cardY = useSpring(useTransform(() => mousePosition.y * 0.2), springConfig);
  const cardRotateX = useSpring(useTransform(() => mousePosition.y * 0.01), springConfig);
  const cardRotateY = useSpring(useTransform(() => mousePosition.x * -0.01), springConfig);
  const glareX = useSpring(useTransform(() => (mousePosition.x / 20 + 0.5) * 100), springConfig);
  const glareY = useSpring(useTransform(() => (mousePosition.y / 20 + 0.5) * 100), springConfig);

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

  return (
    <motion.div 
      ref={containerRef}
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="intro-bg" />
      <div className="intro-gradient-overlay" />

      {/* Floating Particles */}
      <div className="intro-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="intro-particle"
            custom={i}
            variants={particleVariants}
            initial="initial"
            animate="animate"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Cursor Glow */}
      {!isMobile && (
        <motion.div 
          className="intro-cursor-glow"
          animate={{ x: cursorPosition.x - 100, y: cursorPosition.y - 100 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className="intro-card"
        style={{ x: cardX, y: cardY, rotateX: cardRotateX, rotateY: cardRotateY }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        onHoverStart={() => setIsHoveringCard(true)}
        onHoverEnd={() => setIsHoveringCard(false)}
        whileHover={{ scale: 1.01 }}
      >
        {/* Gold top rule */}
        <div className="intro-card-rule" />

        {/* Glare */}
        {!isMobile && (
          <motion.div 
            className="intro-card-glare"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,168,76,0.06) 0%, transparent 60%)`
            }}
          />
        )}

        {/* Profile Image */}
        <motion.div 
          className="intro-profile-wrap"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="intro-profile-img">
            <img src={profileImg} alt="Niftalem Awel" />
          </div>
          <div className="intro-status">
            <span className="intro-status-dot" />
            <span>Available for work</span>
          </div>
        </motion.div>

        {/* Role Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            className="intro-role-badge"
            initial={{ opacity: 0, y: -16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.35, type: "spring" }}
          >
            <motion.span
              animate={{ rotate: isHoveringCard ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="intro-badge-icon"
            >
              {roles[currentRole].icon}
            </motion.span>
            {roles[currentRole].label}
          </motion.div>
        </AnimatePresence>

        {/* Name */}
        <motion.h1
          className="intro-name"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          Niftalem <span className="intro-name-gold">Awel</span>
        </motion.h1>

        {/* Info Row */}
        <motion.div 
          className="intro-info-row"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="intro-info-item">
            <MapPin size={12} />
            Addis Ababa, Ethiopia
          </span>
          <span className="intro-info-sep">·</span>
          <span className="intro-info-item">
            <Briefcase size={12} />
            3+ Years
          </span>
          <span className="intro-info-sep">·</span>
          <span className="intro-info-item">
            <Award size={12} />
            5+ Certs
          </span>
        </motion.div>

        {/* Role Description */}
        <motion.p
          className="intro-role-desc"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        >
          {roles[currentRole].description}
        </motion.p>

        {/* Typewriter */}
        <motion.div 
          className="intro-typewriter"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="intro-typewriter-text">
            {aiText}
            <motion.span 
              className="intro-cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >|</motion.span>
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="intro-socials"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
        >
          {[
            { icon: <Github size={18} />, href: "https://github.com/Niftalemrex", label: "GitHub" },
            { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/niftalem-awel", label: "LinkedIn" },
            { icon: <Mail size={18} />, href: "mailto:niftalemawel@gmail.com", label: "Email" }
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="intro-social-icon"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -16 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.08 }}
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="intro-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => navigate("/portfolio")}
            className="intro-btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>View Portfolio</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight size={16} />
            </motion.span>
          </motion.button>

          <motion.button
            onClick={() => setShowCVModal(true)}
            className="intro-btn-secondary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={16} />
            <span>Download CV</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="intro-scroll"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="intro-scroll-bar"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>Scroll</span>
        </motion.div>
      </motion.div>

      {/* CV Modal */}
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
              {/* Gold rule */}
              <div className="intro-modal-rule" />

              {/* Header */}
              <div className="intro-modal-header">
                <div className="intro-modal-icon">
                  <FileText size={20} />
                </div>
                <h3 className="intro-modal-title">Curriculum Vitae</h3>
                <button className="intro-modal-close" onClick={() => setShowCVModal(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
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
                      <p>Save to your device — PDF, 2.4 MB</p>
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
                  <span>Last updated: March 2026</span>
                  <span className="intro-modal-sep">·</span>
                  <span>PDF · Optimised for web & print</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
