import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import Button from '../components/common/Button';
import useBlogStore from '../store/blogStore';
import './Blog.css';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { blogs, loading, fetchBlogs, getPublishedBlogs, searchBlogs } = useBlogStore();

  useEffect(() => {
    getPublishedBlogs();
  }, [getPublishedBlogs]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      await searchBlogs(query);
    } else {
      await getPublishedBlogs();
    }
  };

  return (
    <div className="blog">
      <div className="container">
        <div className="blog-header">
          <div>
            <h1>Blog</h1>
            <p>Thoughts, tutorials, and insights about web development and technology.</p>
          </div>
          <Link to="/blog/create">
            <Button>
              <Plus size={20} /> Write New Post
            </Button>
          </Link>
        </div>

        <div className="blog-search">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading blogs...</div>
        ) : blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="no-blogs">
            <p>No blog posts found.</p>
            <Link to="/blog/create">
              <Button>Write Your First Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
