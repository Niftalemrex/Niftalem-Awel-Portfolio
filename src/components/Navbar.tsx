import { motion, useSpring, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import {
 
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import "./navbar.css";

const navItems = [
  { name: "Home",           href: "portfolio-hero",           icon: <Home size={14} /> },
  { name: "Profile",        href: "portfolio-about",          icon: <User size={14} /> },
  { name: "Skills",         href: "portfolio-skills",         icon: <Code2 size={14} /> },
  { name: "Experience",     href: "portfolio-experience",     icon: <Briefcase size={14} /> },
  { name: "Education",      href: "portfolio-education",      icon: <GraduationCap size={14} /> },
  { name: "Certifications", href: "portfolio-certifications", icon: <Award size={14} /> },
  { name: "GitHub",         href: "portfolio-github",         icon: <BookOpen size={14} /> },
];

const socials = [
  { href: "https://github.com/Niftalemrex",       icon: <Github size={16} />,   label: "GitHub"   },
  { href: "https://linkedin.com/in/niftalem-awel", icon: <Linkedin size={16} />, label: "LinkedIn" },
  { href: "mailto:niftalemawel@gmail.com",          icon: <Mail size={16} />,     label: "Email"    },
];

export default function Navbar() {
  const [isOpen,         setIsOpen]         = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("portfolio-hero");

  // Smooth scroll progress using Framer Motion's useScroll + useSpring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map(i => i.href);
      for (const section of sections) {
        const el = document.querySelector(`.${section}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section: string) => {
    setIsOpen(false);
    document.querySelector(`.${section}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Nav bar ──────────────────────────────────────────── */}
      <motion.nav
        className={`navbar${scrolled ? " navbar-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar-container">

          {/* Logo */}
          <button
            className="logo"
            onClick={() => scrollTo("portfolio-hero")}
            aria-label="Go to top"
          >
            <span className="logo-name">N</span>
            <span className="logo-sep" />
            <span className="logo-sub">Awel</span>
          </button>

          {/* Desktop nav */}
          <ul className="nav-links" role="list">
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1,  y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              >
                <button
                  className={`nav-link${activeSection === item.href ? " active" : ""}`}
                  onClick={() => scrollTo(item.href)}
                >
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.name}</span>
                  {activeSection === item.href && (
                    <motion.span
                      className="nav-link-dot"
                      layoutId="nav-dot"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Desktop socials */}
          <div className="nav-social">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Hamburger */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="burger-line"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="burger-line"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="burger-line"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={!isOpen}
      >
        {/* Top rule */}
        <div className="mobile-menu-rule" />

        <div className="mobile-menu-content">

          {/* Mono label */}
          <p className="mobile-menu-label">Navigation</p>

          <ul className="mobile-nav-links" role="list">
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              >
                <button
                  className={`mobile-nav-link${activeSection === item.href ? " active" : ""}`}
                  onClick={() => scrollTo(item.href)}
                >
                  <span className="mobile-nav-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.name}</span>
                  {activeSection === item.href && (
                    <span className="mobile-active-rule" />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Divider */}
          <div className="mobile-divider" />

          {/* Socials */}
          <div className="mobile-social">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="mobile-social-icon"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact strip */}
          <div className="mobile-contact">
            <span>niftalemawel@gmail.com</span>
            <span className="mobile-contact-sep">·</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </motion.div>

      {/* Click-outside backdrop */}
      {isOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Scroll progress bar ───────────────────────────────── */}
      <motion.div className="scroll-progress" style={{ scaleX }} />
    </>
  );
}
