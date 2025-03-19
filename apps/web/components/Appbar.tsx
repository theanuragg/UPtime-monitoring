'use client';

import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';

export function Appbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-semibold text-primary">DPin Uptime</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {['Features', 'Pricing', 'About', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Log in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {['Features', 'Pricing', 'About', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg text-foreground/80 hover:text-foreground py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="mt-4 w-full">Log in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" className="w-full">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton  />
              </SignedIn>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Appbar;
