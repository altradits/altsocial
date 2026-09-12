import React from 'react';
import { servicesData } from '../data';
import { Icon } from './Icons';
import { Check } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-brand-600">Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What can Altradits do for you?
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            As a VA with a marketing background, I don't just check boxes. I understand the *why* behind the tasks, ensuring your brand voice and strategy remain consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-brand-200 transition-all duration-300 flex flex-col"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center mb-6 text-brand-600">
                <Icon name={service.iconName} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6 flex-grow">
                {service.description}
              </p>
              
              <div className="border-t border-slate-100 pt-6 mt-auto">
                <h4 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wider">Example Tasks:</h4>
                <ul className="space-y-3">
                  {service.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="h-5 w-5 text-brand-500 shrink-0" />
                      <span>{task}</span>
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