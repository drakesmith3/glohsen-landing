import { soundManager } from './SoundManager';

export class AudioPlayer {
  private static instance: AudioPlayer;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  private constructor() {}

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) AudioPlayer.instance = new AudioPlayer();
    return AudioPlayer.instance;
  }

  public play(src: string, volume: number = 0.2): Promise<void> {
    if (soundManager.isMuted()) return Promise.resolve();
    return new Promise((resolve) => {
      try {
        let audio = this.audioCache.get(src);
        if (!audio) {
          audio = new Audio(src);
          this.audioCache.set(src, audio);
        }
        audio.currentTime = 0;
        const masterVolume = soundManager.getVolume();
        audio.volume = Math.max(0, Math.min(1, volume * masterVolume));
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => resolve()).catch(() => resolve());
        } else {
          resolve();
        }
      } catch {
        resolve();
      }
    });
  }

  public preload(sources: string[]): void {
    sources.forEach(src => {
      if (!this.audioCache.has(src)) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.audioCache.set(src, audio);
      }
    });
  }

  public toggleMute(): boolean {
    soundManager.toggleMute();
    return soundManager.isMuted();
  }
}

export const audioPlayer = AudioPlayer.getInstance();
audioPlayer.preload(['/page-turn.mp3']);
