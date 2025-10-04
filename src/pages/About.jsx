import { Mail, MapPin, Phone } from 'lucide-react';
import Card from '../components/common/Card';
import { usePersonalInfo, useSkills, useExperiences, useEducation } from '../hooks/usePortfolioData';
import './About.css';

const About = () => {
  const { data: personalInfo, loading: personalLoading } = usePersonalInfo();
  const { data: skills, loading: skillsLoading } = useSkills();
  const { data: experience, loading: experienceLoading } = useExperiences();
  const { data: education, loading: educationLoading } = useEducation();

  if (personalLoading || skillsLoading || experienceLoading || educationLoading) {
    return (
      <div className="about">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!personalInfo) return null;
  return (
    <div className="about">
      <div className="container">
        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-content">
            <div className="profile-image">
              <img src={personalInfo.avatar} alt={personalInfo.name} />
            </div>
            <div className="profile-info">
              <h1>{personalInfo.name}</h1>
              <h2>{personalInfo.title}</h2>
              <p className="bio">{personalInfo.bio}</p>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={20} />
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            {skills.map((skillCategory, index) => (
              <Card key={index} className="skill-category">
                <h3>{skillCategory.category}</h3>
                <div className="skill-items">
                  {skillCategory.items.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="timeline">
            {experience.map((job) => (
              <Card key={job.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{job.title}</h3>
                  <h4>{job.company}</h4>
                  <div className="timeline-meta">
                    <span>{job.location}</span>
                    <span>{job.duration}</span>
                  </div>
                  <ul className="timeline-description">
                    {job.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            {education.map((edu) => (
              <Card key={edu.id} className="education-card">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <div className="education-meta">
                  <span>{edu.location}</span>
                  <span>{edu.duration}</span>
                </div>
                {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
