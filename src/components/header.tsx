'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMenu } from '@/context/menu-provider';
import { Button } from './ui/button';

export default function Header() {
  const pathname = usePathname();
  const { isDataLoaded } = useMenu();

  const navLinks = [
    { href: '/', label: 'Upload' },
    { href: '/editor', label: 'Editor', disabled: !isDataLoaded },
    { href: '/preview', label: 'Preview', disabled: !isDataLoaded },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Utensils className="h-6 w-6" />
            <span className="font-bold sm:inline-block">AllergenWise</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.disabled ? '#' : link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60',
                  link.disabled && 'pointer-events-none opacity-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
