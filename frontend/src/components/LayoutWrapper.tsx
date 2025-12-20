'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide header/footer only on auth pages
  const hideHeaderFooter = pathname.startsWith('/login') ||
                          pathname.startsWith('/signup') ||
                          pathname.startsWith('/forgot-password');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className={hideHeaderFooter ? "flex-1" : ""}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
