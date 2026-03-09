import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, MapPin, Phone } from "lucide-react";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-logo">
              NIFTALEM <span className="footer-logo-dot"></span>
            </h3>
            <p className="footer-tagline">
              Full Stack & AI Engineer building scalable web and mobile applications with modern technologies.
            </p>
            
            {/* Contact Info */}
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>niftalemawel@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>0939193603</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-links"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); document.querySelector('.portfolio-hero')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('.portfolio-about')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  About
                </a>
              </li>
              <li>
                <a href="#skills" onClick={(e) => { e.preventDefault(); document.querySelector('.portfolio-skills')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" onClick={(e) => { e.preventDefault(); document.querySelector('.portfolio-experience')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('.portfolio-projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Projects
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="footer-social"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Connect With Me</h4>
            <div className="footer-social-icons">
              <motion.a
                href="https://github.com/Niftalemrex"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="footer-social-icon github"
                title="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/niftalem-awel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="footer-social-icon linkedin"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:niftalemawel@gmail.com"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="footer-social-icon email"
                title="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>

            {/* Call to Action */}
            <div className="footer-cta">
              <p>Have a project in mind?</p>
              <motion.a
                href="mailto:niftalemawel@gmail.com"
                className="footer-cta-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="footer-copyright">
            <p>
              © {currentYear} Niftalem Awel. All rights reserved.
            </p>
            <p className="footer-made-with">
              Made with <Heart size={14} className="footer-heart" /> in Ethiopia
            </p>
          </div>

          {/* Back to Top Button */}
          <motion.button
            className="footer-back-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            title="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* Background Gradient */}
      <div className="footer-background">
        <div className="footer-gradient"></div>
      </div>
    </motion.footer>
  );
}