import { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { usePersonalInfo } from '../hooks/usePortfolioData';
import './Contact.css';

const Contact = () => {
  const { data: personalInfo, loading } = usePersonalInfo();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="contact">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!personalInfo) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>Have a project in mind or just want to chat? Feel free to reach out!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <Card className="info-card">
              <h2>Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                  <Mail size={24} />
                  <div>
                    <h3>Email</h3>
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={24} />
                  <div>
                    <h3>Phone</h3>
                    <p>{personalInfo.phone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin size={24} />
                  <div>
                    <h3>Location</h3>
                    <p>{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="social-card">
              <h2>Follow Me</h2>
              <div className="social-links">
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
                <a href={personalInfo.twitterUrl} target="_blank" rel="noopener noreferrer">
                  <Twitter size={24} />
                  <span>Twitter</span>
                </a>
              </div>
            </Card>
          </div>

          <Card className="contact-form-card">
            <h2>Send Me a Message</h2>
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Your message..."
                  />
                </div>

                <Button type="submit" size="large">
                  <Send size={20} /> Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
