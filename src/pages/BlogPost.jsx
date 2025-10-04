import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import Button from '../components/common/Button';
import useBlogStore from '../store/blogStore';
import './BlogPost.css';
import 'highlight.js/styles/github-dark.min.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getBlogBySlug, deleteBlog } = useBlogStore();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [slug, getBlogBySlug]);

  if (loading) {
    return (
      <div className="blog-post">
        <div className="container">
          <div className="loading">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-post">
        <div className="container">
          <div className="not-found">
            <h1>Blog Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(blog.id);
        navigate('/blog');
      } catch (error) {
        alert('Failed to delete blog post');
      }
    }
  };

  return (
    <div className="blog-post">
      <div className="container">
        <Link to="/blog" className="back-link">
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        <article className="post-content">
          <header className="post-header">
            <h1>{blog.title}</h1>
            <div className="post-meta">
              <span className="meta-item">
                <Calendar size={18} />
                {formattedDate}
              </span>
              <span className="meta-item">
                <Clock size={18} />
                {blog.readTime}
              </span>
              <span className="meta-item">
                By {blog.author}
              </span>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="post-tags">
                <Tag size={18} />
                {blog.tags.map((tag, index) => (
                  <span key={index} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="post-body">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              remarkPlugins={[remarkGfm, remarkBreaks]}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          <footer className="post-footer">
            <div className="post-actions">
              <Link to={`/blog/edit/${blog.id}`}>
                <Button variant="outline">
                  <Edit size={18} /> Edit Post
                </Button>
              </Link>
              <Button variant="secondary" onClick={handleDelete}>
                <Trash2 size={18} /> Delete Post
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
