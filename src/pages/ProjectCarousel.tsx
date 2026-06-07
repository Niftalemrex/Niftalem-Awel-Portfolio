import React, { useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import type { CarouselProject } from './ProjectCard';
import './ProjectCarousel.css';

interface ProjectCarouselProps {
  projects: CarouselProject[];
  onFocusChange?: (project: CarouselProject) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onFocusChange }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const prev = useCallback(() => {
    setFocusedIndex(i => (i - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const next = useCallback(() => {
    setFocusedIndex(i => (i + 1) % projects.length);
  }, [projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Notify parent on change
  useEffect(() => {
    if (onFocusChange && projects[focusedIndex]) {
      onFocusChange(projects[focusedIndex]);
    }
  }, [focusedIndex, projects, onFocusChange]);

  return (
    <div className="project-carousel" role="region" aria-label="Featured projects carousel">

      {/* ── Cards ── */}
      <div className="carousel-container">
        {projects.map((project, index) => {
          const offset    = index - focusedIndex;
          const isFocused = offset === 0;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              offset={offset}
              isFocused={isFocused}
              onClick={() => setFocusedIndex(index)}
            />
          );
        })}
      </div>

      {/* ── Controls ── */}
      <div className="carousel-controls">

        {/* Prev */}
        <button
          className="carousel-arrow carousel-arrow--prev"
          onClick={prev}
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="carousel-indicators" role="tablist">
          {projects.map((p, idx) => (
            <button
              key={idx}
              className={`indicator${idx === focusedIndex ? ' active' : ''}`}
              onClick={() => setFocusedIndex(idx)}
              role="tab"
              aria-selected={idx === focusedIndex}
              aria-label={`Go to project: ${p.title}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          className="carousel-arrow carousel-arrow--next"
          onClick={next}
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </button>

      </div>

      {/* ── Counter ── */}
      <p className="carousel-counter" aria-live="polite">
        <span>{String(focusedIndex + 1).padStart(2, '0')}</span>
        <span className="carousel-counter-sep" />
        <span>{String(projects.length).padStart(2, '0')}</span>
      </p>

    </div>
  );
};

export default ProjectCarousel;
