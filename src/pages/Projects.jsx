import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useProjects } from '../hooks/usePortfolioData';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { data: projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="projects">
        <div className="container">
          <div className="loading">Loading projects...</div>
        </div>
      </div>
    );
  }

  const allTags = [...new Set(projects.flatMap(project => project.tags || []))];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tags && project.tags.includes(filter));

  return (
    <div className="projects">
      <div className="container">
        <div className="projects-header">
          <h1>My Projects</h1>
          <p>A collection of projects I've worked on, showcasing various technologies and skills.</p>
        </div>

        {/* Filter */}
        <div className="projects-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {allTags.map((tag, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <Card key={project.id} hover className="project-card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <div className="project-overlay-actions">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="small">
                          <Github size={18} />
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="small">
                          <ExternalLink size={18} />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found with the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
