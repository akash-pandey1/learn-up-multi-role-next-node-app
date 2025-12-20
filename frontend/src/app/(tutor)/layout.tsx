'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { isAuthenticated, removeToken } from '@/lib/auth';

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }
      setIsLoggedIn(true);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Loading...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Programs', href: '/programs', icon: '📚' },
    { name: 'Insights', href: '/insights', icon: '📈' },
    { name: 'Account', href: '/account', icon: '👤' },
    { name: 'Notifications', href: '/notifications', icon: '🔔' },
    { name: 'Chat', href: '/chat', icon: '💬' },
  ];

  const tutorNavigation = [
    { name: 'Dashboard', href: '/tutor/dashboard', icon: '📊' },
    { name: 'Programs', href: '/tutor/programs', icon: '📚' },
    { name: 'Insights', href: '/tutor/insights', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-app">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-secondary/20">
          <Link href="/" className="text-2xl font-bold text-heading">
            Learn-Up
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-body hover:text-primary p-1"
          >
            ✕
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-secondary/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="text-heading font-medium">John Doe</p>
              <p className="text-body text-sm">Instructor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Tutor Panel</p>
            {tutorNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-body hover:text-primary hover:bg-softPurple'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="border-t border-secondary/20 my-6"></div>

            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">General</p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-body hover:text-primary hover:bg-softPurple'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-secondary/20">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <span>🚪</span>
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-card shadow-sm border-b border-secondary/20 px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-body hover:text-primary p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1 lg:flex-initial">
              <h1 className="text-xl font-semibold text-heading">
                {tutorNavigation.find(item => item.href === pathname)?.name ||
                 navigation.find(item => item.href === pathname)?.name ||
                 'Tutor Panel'}
              </h1>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-body hover:text-primary p-2">
                🔔
              </button>
              <button className="text-body hover:text-primary p-2">
                💬
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
