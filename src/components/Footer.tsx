import { Github, Linkedin, Target, Send, Shield, Award } from "lucide-react";
import "./footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="kirubel-footer">
      <div className="kirubel-footer-inner">
        {/* Left Side: Brand and social icons */}
        <div className="kirubel-footer-left">
          <div className="kirubel-footer-brand-row">
            <span className="kirubel-footer-brand-name">Niftalem Awel</span>
            <span className="kirubel-footer-dash">—</span>
            <span className="kirubel-footer-role">Tilet &amp; Warren · Cyber Security &amp; Full Stack</span>
          </div>

          <div className="kirubel-footer-socials-row">
            <a
              href="https://github.com/Niftalemrex"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill"
              title="GitHub"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://profile.hackthebox.com/profile/019ecb1f-d7a4-7071-b515-989292ede1fb"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill htb-pill"
              title="Hack The Box"
            >
              <Target size={14} />
              <span>HTB</span>
            </a>
            <a
              href="https://linkedin.com/in/niftalem-awel"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill"
              title="LinkedIn"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://t.me/Zz_nicol"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill"
              title="Telegram"
            >
              <Send size={14} />
              <span>Telegram</span>
            </a>
            <a
              href="https://cybersecurity-report-gray.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill report-pill"
              title="Security Reports Hub"
            >
              <Shield size={14} />
              <span>Security Reports ↗</span>
            </a>
            <a
              href="https://niftalem-certificates.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="kirubel-footer-icon-pill cert-pill"
              title="Certificates Platform"
            >
              <Award size={14} />
              <span>Certificates ↗</span>
            </a>
          </div>
        </div>

        {/* Right Side: Made with ♡ and Copyright */}
        <div className="kirubel-footer-right">
          <p className="kirubel-footer-made">Made with ♡</p>
          <p className="kirubel-footer-copy">© 2026 Niftalem Awel</p>
          <button onClick={scrollToTop} className="kirubel-footer-top-btn" aria-label="Back to top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
