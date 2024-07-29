import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('user'))?.role_id);

  const login = async (email, fullName, password) => {
    try {
      const response = await axios.post('http://ivy.urbanrouteexplorer.xyz/api/user/login', {
        email,
        full_name: fullName,
        password
      });

      const { token, user } = response.data;
      setAuthToken(token);
      setRole(user.role_id);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, role }}>
      {children}
    </AuthContext.Provider>
  );
};
