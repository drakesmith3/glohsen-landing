import React, { useCallback, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SoundProvider } from "./contexts/SoundContext";
import { audioPlayer } from "./utils/AudioPlayer";
import { soundManager } from "./utils/SoundManager";
import Home from "./pages/Home";

// ============================================================
// STANDALONE LANDING APP - No backend, no auth, no Supabase.
// This is a self-contained entry point that wraps the landing
// page with only the minimal contexts it needs (Theme + Sound).
// When the full app is ready, swap this for the main App.tsx.
// ============================================================

const LandingApp: React.FC = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [volume, setVolumeState] = useState(0.5);

  const playClickSound = useCallback(() => {
    if (!soundManager.isMuted()) {
      audioPlayer.play('/click.mp3', volume).catch(console.warn);
    }
  }, [volume]);

  const toggleSound = useCallback(() => {
    soundManager.toggleMute();
    setIsSoundEnabled((prev) => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    soundManager.setVolume(newVolume);
  }, []);

  return (
    <ThemeProvider>
      <SoundProvider
        playClickSound={playClickSound}
        isSoundEnabled={isSoundEnabled}
        toggleSound={toggleSound}
        volume={volume}
        setVolume={setVolume}
      >
        {/* Render the full landing page directly */}
        <Home />
      </SoundProvider>
    </ThemeProvider>
  );
};

export default LandingApp;
