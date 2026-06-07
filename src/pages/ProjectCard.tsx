import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
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
}

interface ProjectCardProps {
  project: CarouselProject;
  offset: number;
  isFocused: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, offset, isFocused, onClick }) => {
  const absOffset = Math.abs(offset);

  const style: React.CSSProperties = {
    transform: `
      translateX(${offset * 200}px)
      scale(${isFocused ? 1 : 1 - absOffset * 0.1})
      translateZ(${isFocused ? 0 : -absOffset * 50}px)
      rotateY(${offset * 3}deg)
    `,
    zIndex:        isFocused ? 20 : 10 - absOffset,
    opacity:       absOffset > 2 ? 0 : absOffset === 2 ? 0.35 : absOffset === 1 ? 0.65 : 1,
    pointerEvents: absOffset > 2 ? 'none' : 'auto',
    filter:        isFocused ? 'none' : `blur(${absOffset * 0.6}px)`,
    transition:    'transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, filter 0.45s ease',
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
