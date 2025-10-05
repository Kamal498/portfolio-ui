import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/common/Button';
import RichTextEditor from '../components/blog/RichTextEditor';
import useBlogStore from '../store/blogStore';
import { usePersonalInfo } from '../hooks/usePortfolioData';
import { htmlToMarkdown, markdownToHtml } from '../utils/contentConverter';
import './BlogEditor.css';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, addBlog, updateBlog } = useBlogStore();
  const { data: personalInfo } = usePersonalInfo();
  
  const isEdit = Boolean(id);
  const existingBlog = isEdit ? getBlogById(parseInt(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: '',
    readTime: '5 min read',
    published: true,
  });

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (isEdit && id) {
        const blog = await getBlogById(parseInt(id));
        if (blog) {
          setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            tags: blog.tags.join(', '),
            readTime: blog.readTime,
            published: blog.published,
          });
          // Convert markdown to HTML for the editor
          setHtmlContent(markdownToHtml(blog.content));
        }
      }
    };
    fetchBlog();
  }, [isEdit, id, getBlogById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (html) => {
    setHtmlContent(html);
    // Convert HTML to Markdown for backend storage
    const markdown = htmlToMarkdown(html);
    setFormData(prev => ({ ...prev, content: markdown }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      if (isEdit) {
        await updateBlog(parseInt(id), blogData);
      } else {
        await addBlog(blogData);
      }
      navigate('/blog');
    } catch (error) {
      alert('Failed to save blog post: ' + error.message);
    }
  };

  return (
    <div className="blog-editor">
      <div className="container">
        <Link to="/blog" className="back-link">
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        <div className="editor-header">
          <h1>{isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
          <p>Write and format your blog post using Markdown.</p>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter your blog title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Brief description of your blog post"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <RichTextEditor 
              content={htmlContent}
              onChange={handleContentChange}
            />
            <small>
              Use the toolbar to format your content. What you see is what you get!
            </small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Author name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="readTime">Read Time</label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 5 min read"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, JavaScript, Web Development"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Publish this post</span>
            </label>
          </div>

          <div className="form-actions">
            <Button type="submit" size="large">
              <Save size={20} />
              {isEdit ? 'Update Post' : 'Create Post'}
            </Button>
            <Link to="/blog">
              <Button type="button" variant="outline" size="large">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
