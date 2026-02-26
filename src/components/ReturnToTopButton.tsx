import React from 'react';
import { ChevronUp } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface ReturnToTopButtonProps {
  scrollToSection: (sectionIndex: number) => void;
  position?: 'top-right' | 'bottom-right';
}

const ReturnToTopButton: React.FC<ReturnToTopButtonProps> = ({ 
  scrollToSection,
  position = 'top-right' 
}) => {
  const { playClickSound } = useSound();

  const handleClick = () => {
    playClickSound();
    scrollToSection(0);
  };

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'bottom-right': 'bottom-6 right-6',
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} z-20 cursor-pointer group`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label="Return to top"
    >
      <div className="bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transform hover:-translate-y-1 transition-all duration-200 ease-in-out flex items-center justify-center">
        <ChevronUp className="w-6 h-6" />
      </div>
      <span className="absolute whitespace-nowrap right-full mr-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">Return to Top</span>
    </div>
  );
};

export default ReturnToTopButton;
