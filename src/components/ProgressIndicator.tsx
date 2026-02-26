import React, { useState, memo, useMemo } from "react";
import { BookOpen, ChevronsUp, ChevronsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from '../contexts/SoundContext';

export interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  scrollToSection: (sectionIndex: number) => void;
  chapterTitles?: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = memo(({
  currentSection,
  totalSections,
  scrollToSection,
  chapterTitles = [],
}) => {
  const { playClickSound } = useSound();
  const [hoverSection, setHoverSection] = useState<number | null>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);

  const handleIndicatorClick = (index: number): void => {
    playClickSound();
    scrollToSection(index);
  };

  const handleIndicatorMouseEnter = (index: number) => {
    setHoverSection(index);
  };

  const handleIndicatorMouseLeave = () => {
    setHoverSection(null);
  };

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  const getChapterTitle = useMemo(() => (index: number) => {
    return chapterTitles[index] || `Section ${index + 1}`;
  }, [chapterTitles]);

  return (
    <div
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-3"
      role="navigation"
      aria-label="Story navigation"
    >
      {currentSection > 0 && (
        <button
          onClick={() => scrollToSection(0)}
          className="p-3 bg-gold-500 text-black rounded-full shadow-lg hover:bg-gold-600 dark:bg-gold-400 dark:hover:bg-gold-500 dark:text-black transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-400 dark:focus:ring-gold-300"
          aria-label="Back to Header"
          title="Back to Header"
        >
          <ChevronsUp className="w-5 h-5" />
        </button>
      )}

      <div className="flex flex-col items-center bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm p-2 rounded-lg shadow-xl">
        <button
          onClick={toggleNavigation}
          className="p-1 mb-1 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-amber-400"
          aria-label={showNavigation ? "Hide navigation dots" : "Show navigation dots"}
          title={showNavigation ? "Hide navigation dots" : "Show navigation dots"}
        >
          {showNavigation ? <ChevronsDown className="h-5 w-5" /> : <ChevronsUp className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {showNavigation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center space-y-2"
            >
              {Array.from({ length: totalSections }).map((_, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleIndicatorMouseEnter(index)}
                  onMouseLeave={handleIndicatorMouseLeave}
                  onClick={() => handleIndicatorClick(index)}
                  className="relative flex items-center cursor-pointer group"
                  role="button"
                  aria-label={`Go to ${getChapterTitle(index)}`}
                  tabIndex={0}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-200 ease-in-out group-hover:scale-125
                      ${currentSection === index
                        ? "bg-red-600 dark:bg-amber-400 scale-125 shadow-md"
                        : "bg-gray-400 dark:bg-gray-500 group-hover:bg-red-500 dark:group-hover:bg-amber-500"}`}
                  />
                  {hoverSection === index && (
                    <motion.span
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-full mr-3 px-2.5 py-1 bg-black dark:bg-neutral-900 text-white dark:text-gray-100 text-xs rounded-md shadow-lg whitespace-nowrap z-10"
                    >
                      {getChapterTitle(index)}
                    </motion.span>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default ProgressIndicator;
