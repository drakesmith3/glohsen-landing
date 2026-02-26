import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';

// 1. Define the context type
interface SoundContextType {
  playClickSound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

// 2. Create the context with a default value
const SoundContext = createContext<SoundContextType | null>(null);

// 3. Create the SoundProvider component
interface SoundProviderProps {
  children: ReactNode;
  playClickSound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, playClickSound, isSoundEnabled, toggleSound, volume, setVolume }) => {
  const memoizedPlayClickSound = useCallback(() => {
    if (playClickSound) {
      playClickSound();
    }
  }, [playClickSound]);

  const memoizedToggleSound = useCallback(() => {
    if (toggleSound) {
      toggleSound();
    }
  }, [toggleSound]);

  const contextValue = useMemo(
    () => ({
      playClickSound: memoizedPlayClickSound,
      isSoundEnabled: isSoundEnabled,
      toggleSound: memoizedToggleSound,
      volume,
      setVolume,
    }),
    [memoizedPlayClickSound, isSoundEnabled, memoizedToggleSound, volume, setVolume]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

// 4. Create the custom hook useSound
export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === null) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
