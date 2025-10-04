import { create } from 'zustand';
import { blogsApi } from '../services/api';

const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,

  // Fetch all blogs from API
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const blogs = await blogsApi.getAll();
      set({ blogs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
      
  // Get all published blogs
  getPublishedBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const blogs = await blogsApi.getPublished();
      set({ blogs, loading: false });
      return blogs;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },
      
  // Get blog by slug
  getBlogBySlug: async (slug) => {
    try {
      return await blogsApi.getBySlug(slug);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },
  
  // Get blog by id
  getBlogById: async (id) => {
    try {
      return await blogsApi.getById(id);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },
      
  // Add new blog
  addBlog: async (blog) => {
    try {
      const newBlog = await blogsApi.create(blog);
      set(state => ({ blogs: [...state.blogs, newBlog] }));
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },
      
  // Update existing blog
  updateBlog: async (id, updatedBlog) => {
    try {
      const updated = await blogsApi.update(id, updatedBlog);
      set(state => ({
        blogs: state.blogs.map(blog => blog.id === id ? updated : blog),
      }));
      return updated;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },
      
  // Delete blog
  deleteBlog: async (id) => {
    try {
      await blogsApi.delete(id);
      set(state => ({
        blogs: state.blogs.filter(blog => blog.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
      
  // Search blogs
  searchBlogs: async (query) => {
    if (!query) {
      await get().fetchBlogs();
      return get().blogs;
    }
    try {
      const blogs = await blogsApi.search(query);
      set({ blogs });
      return blogs;
    } catch (error) {
      console.error('Error searching blogs:', error);
      return [];
    }
  },
}));

export default useBlogStore;
