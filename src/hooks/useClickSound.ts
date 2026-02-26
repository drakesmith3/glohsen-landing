import { useCallback } from 'react';
import { useSound } from '../contexts/SoundContext';

export const useClickSound = () => {
  const { playClickSound, isSoundEnabled } = useSound();

  const playClick = useCallback(() => {
    if (isSoundEnabled) {
      playClickSound();
    }
  }, [playClickSound, isSoundEnabled]);

  return { playClick, isSoundEnabled };
};
