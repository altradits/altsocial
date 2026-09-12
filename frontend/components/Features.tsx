import React from 'react';
import { workflowData } from '../data';
import { Icon } from './Icons';
import { CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-brand-600">How it Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your social media, running smoothly.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Share your journey to inspire, educate, and entertain, without spending all day at your desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowData.map((step) => (
            <div 
              key={step.id} 
              className="relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-brand-200 transition-all duration-300 flex flex-col"
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shadow-sm">
                {step.stepNumber}
              </div>
              
              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Icon name={step.iconName} size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-600 mb-8 flex-grow">
                {step.description}
              </p>
              
              <div className="bg-slate-50 rounded-xl p-5 mt-auto border border-slate-100">
                <ul className="space-y-3">
                  {step.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-brand-500 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};