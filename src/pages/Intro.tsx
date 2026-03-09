import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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
  ExternalLink
} from "lucide-react";
import "./intro.css";

// ✅ Import images (important in Vite)
import codeImg from "../assets/code.jpg";
import pcvImg from "../assets/pcv.jpg";
import peneImg from "../assets/pene.jpg";
import vbvImg from "../assets/vbv.jpg";
import img1 from "../assets/pexels-caio-56759.jpg";
import img2 from "../assets/pexels-medhat-ayad-122846-447592.jpg";

// Import profile image
import profileImg from "../assets/profile.jpg"; // Add your profile image

// Import CV PDF
import cvPDF from "../File/Niftalem Awel Resume.pdf";

type Role = {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  gradient: string;
};

// Define proper variants type
const floatingVariants: Variants = {
  initial: { y: 0, opacity: 0.3 },
  animate: (i: number) => ({
    y: [0, -15, 0],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      delay: i * 0.15,
      ease: "easeInOut"
    }
  }),
  hover: {
    scale: 1.1,
    opacity: 0.8,
    transition: { duration: 0.3 }
  }
};

const particleVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 0.8, 0],
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    transition: {
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeInOut"
    }
  })
};

export default function Intro() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse move tracking for parallax effect with throttling
  useEffect(() => {
    // Use number type for browser setTimeout/clearTimeout
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const { clientX, clientY } = e;
          const rect = containerRef.current?.getBoundingClientRect();
          
          // Add null check for rect
          if (rect) {
            const { width, height, left, top } = rect;
            
            // Calculate relative position
            const x = ((clientX - left) / width - 0.5) * 40;
            const y = ((clientY - top) / height - 0.5) * 40;
            
            setMousePosition({ x, y });
            setCursorPosition({ x: clientX - left, y: clientY - top });
          }
        }, 10);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  const roles: Role[] = [
    { 
      label: "AI Engineer", 
      icon: <Sparkles size={18} />, 
      description: "Building intelligent systems with ML & NLP",
      color: "#6366f1",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)"
    },
    { 
      label: "Full-Stack Engineer", 
      icon: <Code size={18} />, 
      description: "Creating scalable web applications",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
    },
    { 
      label: "Mobile App Engineer", 
      icon: <Smartphone size={18} />, 
      description: "Crafting native & cross-platform experiences",
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899, #f43f5e)"
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
    true // loop
  );

  // ✅ Use imported images
  const images = [codeImg, pcvImg, peneImg, vbvImg, img1, img2];

  // Parallax transforms with proper typing and spring physics
  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  
  const cardX = useSpring(useTransform(() => mousePosition.x * 0.3), springConfig);
  const cardY = useSpring(useTransform(() => mousePosition.y * 0.3), springConfig);
  const cardRotateX = useSpring(useTransform(() => mousePosition.y * 0.02), springConfig);
  const cardRotateY = useSpring(useTransform(() => mousePosition.x * -0.02), springConfig);
  
  const backgroundX = useSpring(useTransform(() => mousePosition.x * -0.1), springConfig);
  const backgroundY = useSpring(useTransform(() => mousePosition.y * -0.1), springConfig);
  
  const glareX = useSpring(useTransform(() => (mousePosition.x / 40 + 0.5) * 100), springConfig);
  const glareY = useSpring(useTransform(() => (mousePosition.y / 40 + 0.5) * 100), springConfig);

  // Updated CV download handler using imported PDF
  const handleDownloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = cvPDF;
    link.download = "Niftalem_Awel_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Safe to access window for initial particle positions
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <motion.div 
      ref={containerRef}
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Custom Cursor Glow */}
      {!isMobile && (
        <motion.div 
          className="cursor-glow"
          animate={{
            x: cursorPosition.x - 150,
            y: cursorPosition.y - 150,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Animated Background Grid with Parallax */}
      <motion.div 
        className="background-grid"
        style={{ 
          x: backgroundX, 
          y: backgroundY 
        }}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.div
            key={index}
            className="grid-item"
            style={{
              backgroundImage: `url(${images[index % images.length]})`,
            }}
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div 
                  className="grid-item-overlay"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Project {index + 1}</span>
                  <ExternalLink size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient Overlay with Animated Pattern */}
      <div className="background-overlay">
        <div className="animated-gradient" />
        <div className="noise-overlay" />
      </div>

      {/* Floating Particles System */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
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

      {/* Glass Card with 3D Tilt Effect */}
      <motion.div
        ref={cardRef}
        className="glass-card"
        style={{ 
          x: cardX, 
          y: cardY,
          rotateX: cardRotateX,
          rotateY: cardRotateY,
        }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2
        }}
        onHoverStart={() => setIsHoveringCard(true)}
        onHoverEnd={() => setIsHoveringCard(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated Border Gradient */}
        <div className="card-border-gradient" />
        
        {/* Glare Effect */}
        {!isMobile && (
          <motion.div 
            className="card-glare"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          />
        )}

        {/* Profile Image */}
        <motion.div 
          className="profile-image-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="profile-image">
            <img src={profileImg} alt="Niftalem Awel" />
          </div>
          <div className="profile-status">
            <span className="status-dot" />
            <span>Available for work</span>
          </div>
        </motion.div> 

        {/* Role Badge with Icon Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            className="ai-badge"
            style={{ 
              borderColor: roles[currentRole].color,
              background: `linear-gradient(135deg, ${roles[currentRole].color}20, transparent)`
            }}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ 
                rotate: isHoveringCard ? 360 : 0,
                scale: isHoveringCard ? 1.2 : 1
              }}
              transition={{ duration: 0.5 }}
              className="badge-icon"
            >
              {roles[currentRole].icon}
            </motion.span>
            {roles[currentRole].label}
          </motion.div>
        </AnimatePresence>

        {/* Name with Gradient Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="gradient-text"
        >
          Niftalem Awel
        </motion.h1>

        {/* Location and Experience */}
        <motion.div 
          className="info-row"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="info-item">
            <MapPin size={14} />
            Addis Ababa, Ethiopia
          </span>
          <span className="info-item">
            <Briefcase size={14} />
            3+ Years Experience
          </span>
          <span className="info-item">
            <Award size={14} />
            5+ Certifications
          </span>
        </motion.div>

        {/* Role Description */}
        <motion.p
          className="role-description"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          style={{ color: roles[currentRole].color }}
        >
          {roles[currentRole].description}
        </motion.p>

        {/* Typewriter Text with Enhanced Cursor */}
        <motion.div 
          className="typewriter-container"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="ai-text">
            {aiText}
            <motion.span 
              className="cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
        >
          {[
            { icon: <Github size={20} />, href: "https://github.com/Niftalemrex", label: "GitHub", color: "#333" },
            { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/niftalem-awel", label: "LinkedIn", color: "#0077b5" },
            { icon: <Mail size={20} />, href: "mailto:niftalemawel@gmail.com", label: "Email", color: "#ea4335" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => navigate("/portfolio")}
            className="primary-btn"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Portfolio</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight size={18} />
            </motion.span>
          </motion.button>

          <motion.button
            onClick={handleDownloadCV}
            className="secondary-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            <span>Download CV</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>Scroll</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}