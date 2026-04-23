import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './ProjectCard.css';

export interface CarouselProject {
  id: number;
  title: string;
  image?: string;           // card thumbnail / fallback
  video?: string;           // video shown inside card
  backgroundImage?: string; // large background for carousel section
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

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, offset, isFocused, onClick 
}) => {
  const style: React.CSSProperties = {
    transform: `
      translateX(${offset * 120}px)
      scale(${1 - Math.abs(offset) * 0.08})
      translateZ(${-Math.abs(offset) * 60}px)
      rotateY(${offset * 2}deg)
    `,
    zIndex: 10 - Math.abs(offset),
    opacity: Math.abs(offset) > 3 ? 0 : 1,
    pointerEvents: 'auto',
  };

  return (
    <div className="project-card" onClick={onClick} style={style}>
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
      
      {isFocused && (
        <div className="project-info">
          <h3>{project.title}</h3>
          <div className="project-tech">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={18} />
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;