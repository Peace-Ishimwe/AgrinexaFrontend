import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Define the shape of the user object
interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// Define the context value interface
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;  // Added isLoading flag
  login: (access_token: string, refresh_token: string, user: User) => void;
  logout: () => void;
}

// Create a default context with initial values
const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,  // Start with a loading state
  login: () => {},
  logout: () => {},
});

// Create a provider component for AuthContext
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Loading state
  const router = useRouter();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        const savedUser = await AsyncStorage.getItem('user');
        if (storedToken && savedUser) {
          setToken(storedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage', error);
      } finally {
        setIsLoading(false);  // Authentication check complete
      }
    };

    fetchAuthData();
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (access_token: string, refresh_token: string, user: User) => {
    try {
      setUser(user);
      setToken(access_token);
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('refresh_token', refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save data to AsyncStorage', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      router.replace('/Welcome');  // Redirect to the Welcome page
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };