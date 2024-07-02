"use client";

import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: any;
  loginAction: (data: LoginData, str: string) => Promise<void>;
  signupAction: (data: SignupData) => Promise<void>;
  logOut: () => void;
  fetchUser: (userId: number) => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw  Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user")||'') );
  const [token, setToken] = useState<string>(localStorage.getItem("token") as string);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        if (decoded && decoded.id) {
          fetchUser(decoded.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logOut();
      }
    }
  }, []);

  const fetchUser = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/getone/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };

  const loginAction = async (data: LoginData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);

      if (response.data && response.data.token && response.data.user) {
        const userData = response.data.user.id;
        console.log('Login response:', response.data);

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        throw new Error('Invalid login response structure');
      }
    } catch (err: any) {
      console.error("An error occurred during login:", err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error("Error message:", err.response.data.message);
      }
      throw new Error('Login failed');
    }
  };
  

  const signupAction = async (data: SignupData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', data);
     
      const userData = response.data.newUser

      setUser(response.data.newUser);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      router.push('/');
    } catch (err: any) {
      console.error("An error occurred during signup:", err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      }
    }
  };

  const logOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, loginAction, signupAction, fetchUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
//all done