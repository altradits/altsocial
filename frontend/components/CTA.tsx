import React from 'react';

export const CTA: React.FC = () => {
  return (
    <section className="bg-brand-900 py-20 sm:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to step away from the screen?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-100">
            Join creators and founders who use Altradits to inspire, educate, and entertain their audience while actually living the life they post about.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#dashboard"
              className="w-full sm:w-auto rounded-lg bg-white px-8 py-4 text-base font-semibold text-brand-900 shadow-sm hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Open App (Local Demo)
            </a>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto rounded-lg px-8 py-4 text-base font-semibold leading-6 text-white ring-1 ring-white/20 hover:bg-white/10 transition-colors"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-brand-200">
            No backend required. Try the functional UI right now.
          </p>
        </div>
      </div>
    </section>
  );
};