import React from 'react';
import { Github, ExternalLink, Lock, Shield } from 'lucide-react';
import './ProjectCard.css';

export interface CarouselProject {
  id: number;
  title: string;
  image?: string;
  video?: string;
  backgroundImage?: string;
  technologies: string[];
  github: string;
  demo: string;
  securityBadge?: string;
  securityScore?: string;
}

interface ProjectCardProps {
  project: CarouselProject;
  offset: number;
  isFocused: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, offset, isFocused, onClick }) => {
  const absOffset = Math.abs(offset);

  // ★ FIX: Calculate if we are on a mobile screen
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;

  // ★ FIX: If offset is too far, push it completely out of sight so it doesn't cause zoom-out
  // On mobile, offsets of 2 are completely hidden to prevent "pushing" the screen
  const safeOffset = isMobile && absOffset > 1 ? Math.sign(offset) * 2 : offset;
  const safeAbsOffset = Math.abs(safeOffset);

  const style: React.CSSProperties = {
    transform: `
      translateX(${safeOffset * (isMobile ? 120 : 200)}px)
      scale(${isFocused ? 1 : 1 - safeAbsOffset * 0.08})
      translateZ(${isFocused ? 0 : -safeAbsOffset * 40}px)
      rotateY(${safeOffset * (isMobile ? 1 : 3)}deg)
    `,
    zIndex: isFocused ? 20 : 10 - safeAbsOffset,
    // ★ FIX: Fade out cards that are offset too far (makes them invisible & stops pushing)
    opacity: safeAbsOffset > 1.5 ? 0 : safeAbsOffset === 1 ? 0.5 : 1,
    pointerEvents: safeAbsOffset > 1.5 ? 'none' : 'auto',
    filter: isFocused ? 'none' : `blur(${safeAbsOffset * 0.5}px)`,
    transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, filter 0.45s ease',
  };

  return (
    <article
      className={`project-card${isFocused ? ' project-card--focused' : ''}`}
      onClick={onClick}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      {/* ── Media ── */}
      <div className="project-card__media">
        {project.video ? (
          <video
            className="project-poster"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="project-poster"
          />
        )}

        {/* Gold top border — only on focused */}
        {isFocused && <div className="project-card__top-rule" />}
      </div>

      {/* ── Info overlay (focused only) ── */}
      {isFocused && (
        <div className="project-info">
          {/* Corner ornament */}
          <div className="project-info__corner" />

          <p className="project-info__label">Featured Project</p>
          <h3 className="project-info__title">{project.title}</h3>

          {/* Security Badge (Gold) */}
          {project.securityBadge && (
            <div className="project-security-badge">
              <Lock size={12} />
              <span>{project.securityBadge}</span>
            </div>
          )}

          {/* ★ NEW: Security Score (Green) */}
          {project.securityScore && (
            <div className="project-security-score">
              <Shield size={12} /> {project.securityScore}
            </div>
          )}

          <div className="project-tech">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="project-tech__tag">{tech}</span>
            ))}
          </div>

          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label="View source on GitHub"
                onClick={e => e.stopPropagation()}
              >
                <Github size={15} />
                <span>Source</span>
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link--demo"
                aria-label="View live demo"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={15} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── Unfocused title strip ── */}
      {!isFocused && absOffset <= 2 && (
        <div className="project-card__strip">
          <span>{project.title}</span>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;