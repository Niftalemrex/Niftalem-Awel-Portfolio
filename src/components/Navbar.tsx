import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Home, User, Code2, Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "portfolio-hero",
        "portfolio-about",
        "portfolio-skills",
        "portfolio-experience",
        "portfolio-education",
        "portfolio-certifications",
        "portfolio-github"
      ];
      
      for (const section of sections) {
        const element = document.querySelector(`.${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: <Home size={18} />, section: "portfolio-hero" },
    { name: "Profile", href: "#about", icon: <User size={18} />, section: "portfolio-about" },
    { name: "Skills", href: "#skills", icon: <Code2 size={18} />, section: "portfolio-skills" },
    { name: "Experience", href: "#experience", icon: <Briefcase size={18} />, section: "portfolio-experience" },
    { name: "Education", href: "#education", icon: <GraduationCap size={18} />, section: "portfolio-education" },
    { name: "Certifications", href: "#certifications", icon: <Award size={18} />, section: "portfolio-certifications" },
    { name: "GitHub", href: "#github", icon: <BookOpen size={18} />, section: "portfolio-github" }
  ];

  const scrollToSection = (sectionClass: string) => {
    setIsOpen(false);
    const element = document.querySelector(`.${sectionClass}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="navbar-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("portfolio-hero")}
          >
            <span className="logo-text">NIFTALEM</span>
            <span className="logo-dot"></span>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.section);
                  }}
                  whileHover={{ y: -2 }}
                  className={`nav-link ${activeSection === item.section ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Desktop Social Links */}
          <div className="nav-social">
            <motion.a
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon"
              title="GitHub"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="mailto:niftalemawel@gmail.com"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="social-icon"
              title="Email"
            >
              <Mail size={18} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isOpen ? "open" : ""}`}
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.section);
                  }}
                  className={`mobile-nav-link ${activeSection === item.section ? "active" : ""}`}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="mobile-social">
            <motion.a
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="mobile-social-icon"
              title="GitHub"
            >
              <Github size={22} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="mobile-social-icon"
              title="LinkedIn"
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a
              href="mailto:niftalemawel@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="mobile-social-icon"
              title="Email"
            >
              <Mail size={22} />
            </motion.a>
          </div>

          <div className="mobile-contact">
            <p>niftalemawel@gmail.com</p>
            <p>0939193603</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="scroll-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}