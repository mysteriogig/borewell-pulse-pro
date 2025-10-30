export interface User {
  email: string;
  name: string;
  role: 'Farmer' | 'Admin';
  quota?: number;
}

export const authUtils = {
  login: (email: string, password: string): User | null => {
    const users = authUtils.getUsers();
    const user = users.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  },

  register: (email: string, password: string, name: string, role: 'Farmer' | 'Admin', quota?: number): boolean => {
    const users = authUtils.getUsers();
    
    if (users.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = { email, name, role, quota };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  getUsers: (): User[] => {
    const usersStr = localStorage.getItem('users');
    return usersStr ? JSON.parse(usersStr) : [];
  },

  isAuthenticated: (): boolean => {
    return authUtils.getCurrentUser() !== null;
  }
};
