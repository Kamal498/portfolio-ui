const API_BASE_URL = 'http://localhost:8080/api';

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // For DELETE requests, return success without parsing JSON
    if (options.method === 'DELETE') {
      return { success: true };
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Personal Info API
export const personalInfoApi = {
  get: () => apiRequest('/personal-info'),
  update: (data) => apiRequest('/personal-info', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Skills API
export const skillsApi = {
  getAll: () => apiRequest('/skills'),
};

// Projects API
export const projectsApi = {
  getAll: () => apiRequest('/projects'),
  getFeatured: () => apiRequest('/projects?featured=true'),
  getById: (id) => apiRequest(`/projects/${id}`),
  create: (data) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Achievements API
export const achievementsApi = {
  getAll: () => apiRequest('/achievements'),
};

// Experience API
export const experienceApi = {
  getAll: () => apiRequest('/experiences'),
};

// Education API
export const educationApi = {
  getAll: () => apiRequest('/education'),
};

// Blogs API
export const blogsApi = {
  getAll: () => apiRequest('/blogs'),
  getPublished: () => apiRequest('/blogs?published=true'),
  getById: (id) => apiRequest(`/blogs/${id}`),
  getBySlug: (slug) => apiRequest(`/blogs/slug/${slug}`),
  search: (query) => apiRequest(`/blogs/search?query=${encodeURIComponent(query)}`),
  create: (data) => apiRequest('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};
