type Listener = (...args: unknown[]) => void;

class SimpleEventEmitter {
  private listeners: { [event: string]: Listener[] } = {};

  public on(event: string, listener: Listener): this {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
    return this;
  }

  public off(event: string, listener: Listener): this {
    if (!this.listeners[event]) return this;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    return this;
  }

  public emit(event: string, ...args: unknown[]): boolean {
    if (!this.listeners[event]) return false;
    this.listeners[event].forEach(listener => listener(...args));
    return true;
  }
}

class SoundManager extends SimpleEventEmitter {
  private static instance: SoundManager;
  private muted: boolean = false;
  private volume: number = 0.5;
  private storageKeyMuted = 'app_sound_muted';
  private storageKeyVolume = 'app_sound_volume';
  private storageKeyPrevVolume = 'app_sound_prev_volume';
  private prevVolume: number = 0.5;

  private constructor() {
    super();
    this.loadState();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKeyMuted) {
          this.muted = e.newValue === 'true';
          this.emit('muteChange', this.muted);
        } else if (e.key === this.storageKeyVolume) {
          this.volume = parseFloat(e.newValue || '0.5');
          this.emit('volumeChange', this.volume);
        }
      });
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) SoundManager.instance = new SoundManager();
    return SoundManager.instance;
  }

  private loadState() {
    if (typeof window === 'undefined') return;
    const storedVolume = localStorage.getItem(this.storageKeyVolume);
    const storedPrevVolume = localStorage.getItem(this.storageKeyPrevVolume);
    this.volume = storedVolume ? parseFloat(storedVolume) : 0.5;
    this.prevVolume = storedPrevVolume ? parseFloat(storedPrevVolume) : (this.volume > 0 ? this.volume : 0.5);
    this.muted = true;
    localStorage.setItem(this.storageKeyMuted, JSON.stringify(true));
  }

  public isMuted(): boolean { return this.muted; }
  public getVolume(): number { return this.volume; }

  public setMuted(muted: boolean) {
    const prevMuted = this.muted;
    const prevVolume = this.volume;
    let nextVolume = this.volume;
    if (!muted && nextVolume === 0) nextVolume = this.prevVolume > 0 ? this.prevVolume : 0.5;
    this.muted = muted;
    this.volume = nextVolume;
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeyMuted, JSON.stringify(this.muted));
      if (prevVolume !== this.volume) localStorage.setItem(this.storageKeyVolume, this.volume.toString());
    }
    if (prevMuted !== this.muted) this.emit('muteChange', this.muted);
    if (prevVolume !== this.volume) this.emit('volumeChange', this.volume);
    this.emit('stateChange', { muted: this.muted, volume: this.volume });
  }

  public toggleMute() { this.setMuted(!this.muted); }

  public setVolume(volume: number) {
    const prevMuted = this.muted;
    const prevVolume = this.volume;
    const newVolume = Math.max(0, Math.min(1, volume));
    if (newVolume > 0) {
      this.prevVolume = newVolume;
      if (typeof window !== 'undefined') localStorage.setItem(this.storageKeyPrevVolume, this.prevVolume.toString());
    }
    let nextMuted = this.muted;
    if (newVolume === 0) nextMuted = true;
    else if (newVolume > 0 && this.muted) nextMuted = false;
    this.volume = newVolume;
    this.muted = nextMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeyVolume, this.volume.toString());
      localStorage.setItem(this.storageKeyMuted, JSON.stringify(this.muted));
    }
    if (prevMuted !== this.muted) this.emit('muteChange', this.muted);
    if (prevVolume !== this.volume) this.emit('volumeChange', this.volume);
    this.emit('stateChange', { muted: this.muted, volume: this.volume });
  }
}

export const soundManager = SoundManager.getInstance();
