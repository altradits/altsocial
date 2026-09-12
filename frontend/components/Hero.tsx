import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 lg:pb-32">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Live life beyond your desk. <br className="hidden sm:block" />
          <span className="text-brand-600">We'll handle the precision.</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Manage your social media accounts from one place. Share moments to inspire, educate, and entertain your audience while you focus on living your life.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#dashboard"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all"
          >
            Open App (Local Demo)
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <p className="text-sm text-slate-500 sm:ml-4 flex items-center justify-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> No signup required
          </p>
        </div>
      </div>
    </section>
  );
};