import React, { createContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config';

interface User {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, { withCredentials: true });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/auth/signin`, { email, password }, { withCredentials: true });
      await checkAuth(); 
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch {
      // Handle logout failure if needed
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
