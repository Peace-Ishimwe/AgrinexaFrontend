// AuthContext.ts
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../utils/storage';
import { useRouter } from 'expo-router';

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the context value interface
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create a default context with default values
const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
});

// Create a provider component for AuthContext
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter()

  // Simulate checking if a user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUser = await getData('authUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to fetch user from AsyncStorage', error);
      }
    };
    fetchUser();
  }, []);

  const login = async (user: User) => {
    try {
      setUser(user);
      await storeData('authUser', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to AsyncStorage', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.clear();
      router.replace("/Welcome")
    } catch (error) {
      console.error('Failed to remove user from AsyncStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };