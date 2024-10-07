import React, { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

enum Role {
  END_USER = "END_USER",
  ADMIN = "ADMIN",
  HELPER = "HELPER",
}

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  role: Role;
  points: number;
  password: string;
  reportedPosts: Post[];
  assignedPosts: Post[];
}
interface Post {
  id: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  address: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo?: User;
  completionTime?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signupData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSignupData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [signupData, setSignupData] = useState(null);
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
      });
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
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      if(response.status == 200){
        await checkAuth();
        return true;
      }
      else{
        setIsAuthenticated(false);
        return false;
      }

    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      navigate("/")
    } catch {
      // Handle logout failure if needed
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    signupData,
    setSignupData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
