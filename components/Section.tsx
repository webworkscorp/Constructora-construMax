
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'black';
  id?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  background = 'white', 
  id,
  className = ''
}) => {
  const bgClass = background === 'black' ? 'bg-brand-black text-white' : 'bg-brand-white text-brand-black';
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:py-32 md:px-12 transition-colors duration-500 ${bgClass} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};
