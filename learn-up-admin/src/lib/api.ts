const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// Users API
export const usersAPI = {
  getUsers: () => fetchAPI('/users'),
  getUser: (id: string) => fetchAPI(`/users/${id}`),
  updateUser: (id: string, userData: any) =>
    fetchAPI(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  deleteUser: (id: string) =>
    fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => fetchAPI('/categories'),
  getCategory: (id: string) => fetchAPI(`/categories/${id}`),
  createCategory: (categoryData: any) =>
    fetchAPI('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    }),
  updateCategory: (id: string, categoryData: any) =>
    fetchAPI(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    }),
  deleteCategory: (id: string) =>
    fetchAPI(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// Tags API
export const tagsAPI = {
  getTags: (params?: string) => fetchAPI(`/tags${params ? `?${params}` : ''}`),
  getTag: (id: string) => fetchAPI(`/tags/${id}`),
  getTagsByCategory: (categoryId: string) => fetchAPI(`/tags/category/${categoryId}`),
  createTag: (tagData: any) =>
    fetchAPI('/tags', {
      method: 'POST',
      body: JSON.stringify(tagData),
    }),
  updateTag: (id: string, tagData: any) =>
    fetchAPI(`/tags/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tagData),
    }),
  deleteTag: (id: string) =>
    fetchAPI(`/tags/${id}`, {
      method: 'DELETE',
    }),
};

// Programs API
export const programsAPI = {
  getPrograms: (params?: string) => fetchAPI(`/programs${params ? `?${params}` : ''}`),
  getProgram: (id: string) => fetchAPI(`/programs/${id}`),
  updateProgram: (id: string, programData: any) =>
    fetchAPI(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programData),
    }),
  deleteProgram: (id: string) =>
    fetchAPI(`/programs/${id}`, {
      method: 'DELETE',
    }),
};

