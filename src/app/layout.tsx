import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { MenuProvider } from '@/context/menu-provider';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'AllergenWise',
  description: 'Simplify Your Menu Allergen Labeling',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <MenuProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </MenuProvider>
      </body>
    </html>
  );
}
