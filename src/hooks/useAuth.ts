import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  userType: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, userData: AuthUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    setUser(userData);
    setShowLoginModal(false);
    
    // Redirect if there was a pending redirect
    if (redirectAfterLogin) {
      router.push(redirectAfterLogin);
      setRedirectAfterLogin(null);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setUser(null);
    router.push('/');
  };

  const requireAuth = (redirectPath: string) => {
    if (!user) {
      setRedirectAfterLogin(redirectPath);
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    login,
    logout,
    showLoginModal,
    setShowLoginModal,
    requireAuth,
    redirectAfterLogin,
    isAuthenticated: !!user
  };
}