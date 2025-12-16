const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

// User API calls
export const userAPI = {
  register: (userData: { name: string; email: string; password: string; role?: string }) =>
    fetchAPI('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials: { email: string; password: string }) =>
    fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getUsers: () => fetchAPI('/users'),

  getUser: (id: string) => fetchAPI(`/users/${id}`),

  updateUser: (id: string, userData: Partial<{ name: string; email: string; role: string }>) =>
    fetchAPI(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  deleteUser: (id: string) =>
    fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Course API calls
export const courseAPI = {
  getCourses: () => fetchAPI('/courses'),

  getCourse: (id: string) => fetchAPI(`/courses/${id}`),

  createCourse: (courseData: {
    title: string;
    description: string;
    instructor: string;
    price: number;
    duration: number;
    level?: string;
    category: string;
  }) =>
    fetchAPI('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    }),

  updateCourse: (id: string, courseData: Partial<{ title: string; description: string; price: number }>) =>
    fetchAPI(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    }),

  deleteCourse: (id: string) =>
    fetchAPI(`/courses/${id}`, {
      method: 'DELETE',
    }),

  enrollInCourse: (courseId: string, userId: string) =>
    fetchAPI(`/courses/${courseId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Health check
export const healthCheck = () => fetchAPI('/health');

