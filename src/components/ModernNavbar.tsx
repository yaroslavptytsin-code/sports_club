'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  User, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Menu,
  X,
  Globe,
  Dumbbell,
  LogOut,
  User as UserIcon,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Mock i18n
const i18n = {
  t: (key: string) => {
    const translations: { [key: string]: string } = {
      'nav_home': 'Home',
      'nav_my_page': 'My Page',
      'nav_my_club': 'My Club',
      'nav_workouts': 'Workouts',
      'nav_analytics': 'Analytics',
      'nav_settings': 'Settings',
      'nav_login': 'Login',
      'nav_get_started': 'Get Started',
      'nav_admin': 'Admin',
      'nav_profile': 'Profile',
      'nav_logout': 'Logout'
    };
    return translations[key] || key;
  },
  getLanguages: () => [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ],
  setLanguage: (code: string) => console.log('Language changed to:', code)
};

interface ModernNavbarProps {
  onLoginClick?: () => void;
  onAdminClick?: () => void;
}

export default function ModernNavbar({ onLoginClick, onAdminClick }: ModernNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, requireAuth } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Check if admin is logged in
  useEffect(() => {
    const checkAdminStatus = () => {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        setIsAdmin(true);
        setAdminUser(JSON.parse(adminData));
      } else {
        setIsAdmin(false);
        setAdminUser(null);
      }
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    return () => window.removeEventListener('storage', checkAdminStatus);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { href: '/', label: i18n.t('nav_home'), icon: Home },
    { href: '/my-page', label: i18n.t('nav_my_page'), icon: User, protected: true },
    { href: '/my-club', label: i18n.t('nav_my_club'), icon: Users, protected: true },
    { href: '/workouts', label: i18n.t('nav_workouts'), icon: Calendar, protected: true },
    { href: '/analytics', label: i18n.t('nav_analytics'), icon: BarChart3, protected: true },
    { href: '/settings', label: i18n.t('nav_settings'), icon: Settings, protected: true },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  const languages = i18n.getLanguages();

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const handleAdminLogout = () => {
    // Clear admin credentials
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    setAdminUser(null);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    
    // Redirect to homepage
    router.push('/');
  };

  const handleProfileClick = () => {
    if (user?.userType === 'ATHLETE') {
      router.push('/my-page');
    } else {
      router.push('/my-club');
    }
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleProtectedLinkClick = (href: string, event: React.MouseEvent) => {
    const menuItem = menuItems.find(item => item.href === href);
    
    if (menuItem?.protected && !isAuthenticated) {
      event.preventDefault();
      event.stopPropagation();
      onLoginClick();
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
    setIsMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (onAdminClick) {
      onAdminClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Premium Main Navigation */}
      <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-600">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Top Bar with Contact Info & Language */}
          <div className="flex justify-between items-center py-3 border-b border-cyan-500 border-opacity-30">
            {/* Contact Information */}
            <div className="flex items-center space-x-6 text-sm text-cyan-100">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="font-medium">info@movesbook.com</span>
              </div>
            </div>

            {/* Language & Social */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 text-cyan-100 hover:text-white transition-all duration-200 px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">EN</span>
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            i18n.setLanguage(lang.code);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-700 font-medium"
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3 border-l border-cyan-500 border-opacity-30 pl-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`text-cyan-100 ${social.color} transition-all duration-300 transform hover:scale-110`}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Movesbook
                </h1>
                <p className="text-cyan-200 text-xs font-light">Elite Training Platform</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-1 w-full max-w-4xl justify-center">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleProtectedLinkClick(item.href, e)}
                      className={`flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex-1 justify-center min-w-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl'
                          : item.protected && !isAuthenticated
                          ? 'text-cyan-100 opacity-70 cursor-not-allowed'
                          : 'text-cyan-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              {isAdmin ? (
                /* Admin Logged In - Show Logout Button */
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-red-500 bg-opacity-10 rounded-xl border border-red-500 border-opacity-30">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span className="text-white font-medium">{adminUser?.name || 'Admin'}</span>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center space-x-2 px-4 py-3 bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-white rounded-xl transition-all duration-300 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : isAuthenticated ? (
                /* User Dropdown */
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white truncate max-w-32">
                        {user?.name}
                      </p>
                    </div>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      
                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4 mr-3" />
                          {i18n.t('nav_profile')}
                        </button>
                        
                        <button
                          onClick={handleAdminClick}
                          className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          {i18n.t('nav_admin')}
                        </button>

                        <div className="border-t border-gray-100 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          {i18n.t('nav_logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Login Buttons */
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleLoginClick}
                    className="text-cyan-100 hover:text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-white hover:bg-opacity-10 whitespace-nowrap"
                  >
                    {i18n.t('nav_login')}
                  </button>
                  <button
                    onClick={handleAdminClick}
                    className="text-red-100 hover:text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-red-500 hover:bg-opacity-20 whitespace-nowrap flex items-center space-x-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 bg-white bg-opacity-10 rounded-2xl hover:bg-opacity-20 transition-all duration-300 text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-cyan-500 border-opacity-30">
              <div className="flex flex-col space-y-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleProtectedLinkClick(item.href, e)}
                      className={`flex items-center px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl'
                          : item.protected && !isAuthenticated
                          ? 'text-cyan-100 opacity-70 cursor-not-allowed'
                          : 'text-cyan-100 hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-cyan-500 border-opacity-30 space-y-3">
                  {isAdmin ? (
                    /* Admin Logged In - Mobile View */
                    <>
                      <div className="px-6 py-3 bg-red-500 bg-opacity-10 rounded-2xl border border-red-500 border-opacity-30">
                        <div className="flex items-center space-x-2 mb-1">
                          <Shield className="w-4 h-4 text-red-400" />
                          <p className="text-white font-semibold text-sm">Admin Access</p>
                        </div>
                        <p className="text-white font-semibold text-sm">{adminUser?.name}</p>
                        <p className="text-red-200 text-xs">{adminUser?.email}</p>
                      </div>
                      <button
                        onClick={handleAdminLogout}
                        className="w-full flex items-center px-6 py-4 text-red-300 hover:bg-red-500 hover:bg-opacity-20 rounded-2xl transition-all duration-300 font-semibold"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Admin Logout
                      </button>
                    </>
                  ) : isAuthenticated ? (
                    <>
                      <div className="px-6 py-3 bg-white bg-opacity-10 rounded-2xl">
                        <p className="text-white font-semibold text-sm">{user?.name}</p>
                        <p className="text-cyan-200 text-xs">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-6 py-4 text-cyan-100 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300 font-semibold"
                      >
                        <User className="w-5 h-5 mr-3" />
                        {i18n.t('nav_profile')}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-6 py-4 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-2xl transition-all duration-300 font-semibold"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        {i18n.t('nav_logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="w-full text-center px-6 py-4 text-cyan-100 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300 font-semibold"
                      >
                        {i18n.t('nav_login')}
                      </button>
                      <button
                        onClick={handleAdminClick}
                        className="w-full flex items-center justify-center px-6 py-4 text-red-100 hover:bg-red-500 hover:bg-opacity-20 rounded-2xl transition-all duration-300 font-semibold"
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        Admin Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}