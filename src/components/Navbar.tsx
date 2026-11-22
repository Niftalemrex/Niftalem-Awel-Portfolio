import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Shield,
  Award,
  Github,
  Linkedin,
  Target,
  Send
} from "lucide-react";
import "./navbar.css";

interface NavbarProps {
  onOpenContact?: () => void;
}

const navItems = [
  { name: "About",          href: "portfolio-about" },
  { name: "Skills",         href: "portfolio-skills" },
  { name: "Experience",     href: "portfolio-experience" },
  { name: "Projects",       href: "portfolio-projects" },
  { name: "Education",      href: "portfolio-education" },
  { name: "Certifications", href: "portfolio-certifications" },
];

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map(i => i.href);
      for (const section of sections) {
        const el = document.querySelector(`.${section}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
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
    <header className="kirubel-header">
      <div className="kirubel-header-inner">
        {/* Brand */}
        <button
          className="kirubel-header-brand"
          onClick={() => scrollTo("portfolio-hero")}
          aria-label="Go to top"
        >
          <span className="kirubel-brand-name">Niftalem</span>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="kirubel-header-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`kirubel-header-link ${activeSection === item.href ? "active" : ""}`}
              onClick={() => scrollTo(item.href)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right: Socials (GitHub, HTB, LinkedIn, Telegram) + Contact */}
        <div className="kirubel-header-actions">
          <div className="kirubel-header-socials">
            <a
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-header-icon-link"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-header-icon-link htb-icon"
              title="Hack The Box"
              aria-label="Hack The Box"
            >
              <Target size={15} />
            </a>
            <a
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-header-icon-link"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://t.me/Zz_nicol"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-header-icon-link"
              title="Telegram"
              aria-label="Telegram"
            >
              <Send size={15} />
            </a>
          </div>

          <button
            type="button"
            className="kirubel-header-contact-btn"
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              } else {
                scrollTo("portfolio-cta");
              }
            }}
          >
            <Mail size={12} />
            <span>Contact</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="kirubel-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          className="kirubel-mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="kirubel-mobile-menu-inner">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="kirubel-mobile-link"
                onClick={() => scrollTo(item.href)}
              >
                {item.name}
              </button>
            ))}

            <div className="kirubel-mobile-divider" />

            <div className="kirubel-mobile-socials-row">
              <a
                href="https://github.com/Niftalemrex"
                target="_blank"
                rel="noopener noreferrer"
                className="kirubel-mobile-icon-pill"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb"
                target="_blank"
                rel="noopener noreferrer"
                className="kirubel-mobile-icon-pill"
              >
                <Target size={14} />
                <span>Hack The Box</span>
              </a>
              <a
                href="https://linkedin.com/in/niftalem-awel"
                target="_blank"
                rel="noopener noreferrer"
                className="kirubel-mobile-icon-pill"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://t.me/Zz_nicol"
                target="_blank"
                rel="noopener noreferrer"
                className="kirubel-mobile-icon-pill"
              >
                <Send size={14} />
                <span>Telegram</span>
              </a>
            </div>

            <div className="kirubel-mobile-divider" />

            <a
              href="https://cybersecurity-report-gray.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-mobile-ext-link"
            >
              <Shield size={14} />
              <span>Security Reports Hub</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href="https://niftalem-certificates.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-mobile-ext-link"
            >
              <Award size={14} />
              <span>Certificates Platform</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
