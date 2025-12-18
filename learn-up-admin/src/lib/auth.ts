// Authentication utilities for admin
export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
};

export const saveUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_user', JSON.stringify(user));
  }
};

export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === 'admin';
};

