import React from 'react';
import { SectionProps } from '../types';
import ReturnToTopButton from './ReturnToTopButton';

export const withReturnToTopButton = (
  WrappedComponent: React.ComponentType<SectionProps>
) => {
  const WithReturnToTopButton = (props: SectionProps) => {
    const { scrollToSection, sectionName, ...restProps } = props;
    
    const shouldShowButton = sectionName !== "Header" && scrollToSection;
    
    return (
      <div className="relative w-full h-full">
        {shouldShowButton && <ReturnToTopButton scrollToSection={scrollToSection} />}
        <WrappedComponent {...props} />
      </div>
    );
  };
  
  return WithReturnToTopButton;
};
