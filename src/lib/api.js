// API Configuration
const API_CONFIG = {
  // Get API URL from environment variables or use default
  baseURL: import.meta.env.VITE_API_URL || 'https://ar-project-5ojn.onrender.com',
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      profile: '/api/auth/profile',
      changePassword: '/api/auth/change-password'
    },
    users: {
      all: '/api/users/',
      admin: '/api/users/admin/all'
    },
    quiz: {
      categories: '/api/quiz/categories',
      byCategoryKey: (key) => `/api/quiz/category/${key}`,
      admin: {
        upsertCategory: '/api/quiz/admin/category',
        createQuestion: '/api/quiz/admin/question'
      }
    }
  },
  
  // Helper function to get full URL
  getUrl: (endpoint) => {
    return `${API_CONFIG.baseURL}${endpoint}`;
  },
  
  // Helper function to get auth headers
  getAuthHeaders: (token) => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },
  
  // Helper function to get default headers
  getDefaultHeaders: () => {
    return {
      'Content-Type': 'application/json'
    };
  }
};

export default API_CONFIG;
