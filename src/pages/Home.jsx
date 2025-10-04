import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { usePersonalInfo, useProjects } from '../hooks/usePortfolioData';
import './Home.css';

const Home = () => {
  const { data: personalInfo, loading: personalLoading } = usePersonalInfo();
  const { data: featuredProjects, loading: projectsLoading } = useProjects(true);

  if (personalLoading || projectsLoading) {
    return (
      <div className="home">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!personalInfo) return null;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle">{personalInfo.title}</h2>
          <p className="hero-description">{personalInfo.bio}</p>
          <div className="hero-actions">
            <Link to="/projects">
              <Button size="large">
                View My Work <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="large">
                Get In Touch
              </Button>
            </Link>
          </div>
          <div className="hero-social">
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={24} />
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${personalInfo.email}`}>
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <Link to="/projects" className="view-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="projects-grid">
            {featuredProjects.map(project => (
              <Card key={project.id} hover className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="small">
                        <Github size={16} /> Code
                      </Button>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="small">
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Let's Work Together</h2>
          <p>I'm always interested in hearing about new projects and opportunities.</p>
          <Link to="/contact">
            <Button size="large">Contact Me</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
