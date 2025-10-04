import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Code, Sparkles, Zap } from 'lucide-react';
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
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Available for opportunities</span>
            </div>
            
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">{personalInfo.name}</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="typing-effect">{personalInfo.title}</span>
            </h2>
            <p className="hero-description">{personalInfo.bio}</p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <Code size={20} />
                <div>
                  <strong>5+</strong>
                  <span>Years Experience</span>
                </div>
              </div>
              <div className="stat-item">
                <Zap size={20} />
                <div>
                  <strong>50+</strong>
                  <span>Projects Completed</span>
                </div>
              </div>
            </div>
            
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
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              <img 
                src={personalInfo.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(personalInfo.name) + "&size=400&background=667eea&color=fff&bold=true"}
                alt={personalInfo.name}
                className="profile-image"
              />
            </div>
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
