import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SongTrack, SONGS } from '../data/storyData';

interface AudioContextType {
  currentSong: SongTrack | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  hasStarted: boolean;
  startAudioExperience: () => void;
  playSong: (song: SongTrack, forcePlay?: boolean) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  seekTo: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<SongTrack | null>(SONGS[1]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTransitioningRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Sync volume unless muting
  useEffect(() => {
    if (audioRef.current && !isTransitioningRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Fade Out helper
  const fadeOut = (durationMs: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current || audioRef.current.paused) {
        resolve();
        return;
      }
      isTransitioningRef.current = true;
      const audio = audioRef.current;
      const initialVol = audio.volume;
      const steps = 20;
      const stepTime = durationMs / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const newVol = Math.max(0, initialVol * (1 - step / steps));
        audio.volume = newVol;

        if (step >= steps) {
          clearInterval(timer);
          audio.pause();
          resolve();
        }
      }, stepTime);
    });
  };

  // Fade In helper
  const fadeIn = (targetVol: number, durationMs: number = 1200): void => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      const steps = 20;
      const stepTime = durationMs / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const newVol = Math.min(targetVol, targetVol * (step / steps));
        audio.volume = isMuted ? 0 : newVol;

        if (step >= steps) {
          clearInterval(timer);
          isTransitioningRef.current = false;
        }
      }, stepTime);
    }).catch(err => {
      console.log('Fade in playback error:', err);
      isTransitioningRef.current = false;
    });
  };

  const startAudioExperience = () => {
    setHasStarted(true);
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.src;
      if (currentSong.startTime) {
        audioRef.current.currentTime = currentSong.startTime;
      }
      fadeIn(volume, 1500);
    }
  };

  const playSong = async (song: SongTrack, forcePlay: boolean = false) => {
    if (!audioRef.current) return;

    // Don't restart if already playing the exact same track
    if (currentSong?.id === song.id && isPlaying && !forcePlay) {
      return;
    }

    // Fade out current song smoothly
    await fadeOut(1000);

    setCurrentSong(song);
    audioRef.current.src = song.src;
    if (song.startTime) {
      audioRef.current.currentTime = song.startTime;
    }

    if (hasStarted || forcePlay) {
      fadeIn(volume, 1200);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeOut(600).then(() => {
        setIsPlaying(false);
        isTransitioningRef.current = false;
      });
    } else {
      fadeIn(volume, 800);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (isMuted && val > 0) setIsMuted(false);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        hasStarted,
        startAudioExperience,
        playSong,
        togglePlay,
        toggleMute,
        setVolume,
        seekTo,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
