import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import type { CarouselProject } from './ProjectCard';
import './ProjectCarousel.css';

interface ProjectCarouselProps {
  projects: CarouselProject[];
  onFocusChange?: (project: CarouselProject) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onFocusChange }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleCardClick = (index: number) => {
    setFocusedIndex(index);
  };

  // Notify parent when focused project changes
  useEffect(() => {
    if (onFocusChange && projects[focusedIndex]) {
      onFocusChange(projects[focusedIndex]);
    }
  }, [focusedIndex, projects, onFocusChange]);

  return (
    <div className="project-carousel">
      <div className="carousel-container">
        {projects.map((project, index) => {
          const offset = index - focusedIndex;
          const isFocused = offset === 0;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              offset={offset}
              isFocused={isFocused}
              onClick={() => handleCardClick(index)}
            />
          );
        })}
      </div>
      <div className="carousel-indicators">
        {projects.map((_, idx: number) => (
          <button
            key={idx}
            className={`indicator ${idx === focusedIndex ? 'active' : ''}`}
            onClick={() => setFocusedIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;