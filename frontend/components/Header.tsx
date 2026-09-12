import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-xl shadow-sm">
            A
          </div>
          <a href="#" className="text-xl font-bold tracking-tight text-slate-900">Altradits</a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4 border-l border-slate-200 pl-4">
            <a
              href="#dashboard"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Log in
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              Open App
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-brand-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="#dashboard"
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-100 px-5 py-3 text-base font-medium text-slate-900 hover:bg-slate-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </a>
              <a
                href="#dashboard"
                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-base font-medium text-white hover:bg-brand-700 shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Open App
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};