'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import { isAuthenticated, isAdmin } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push('/login');
    }
  }, [router]);

  return <AdminLayout>{children}</AdminLayout>;
}

