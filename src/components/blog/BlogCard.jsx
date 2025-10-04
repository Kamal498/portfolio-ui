import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import Card from '../common/Card';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card hover className="blog-card">
      <div className="blog-card-header">
        <h3 className="blog-card-title">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
      </div>
      <p className="blog-card-excerpt">{blog.excerpt}</p>
      <div className="blog-card-meta">
        <span className="blog-meta-item">
          <Calendar size={16} />
          {formattedDate}
        </span>
        <span className="blog-meta-item">
          <Clock size={16} />
          {blog.readTime}
        </span>
      </div>
      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-card-tags">
          <Tag size={16} />
          {blog.tags.map((tag, index) => (
            <span key={index} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BlogCard;
