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
  const [volume, setVolumeState] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create persistent HTML5 Audio element
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      // Loop or play next
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const startAudioExperience = () => {
    setHasStarted(true);
    if (audioRef.current && currentSong) {
      if (audioRef.current.src !== window.location.origin + currentSong.src) {
        audioRef.current.src = currentSong.src;
        if (currentSong.startTime) {
          audioRef.current.currentTime = currentSong.startTime;
        }
      }
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Audio playback prevented:', err));
    }
  };

  const playSong = (song: SongTrack, forcePlay: boolean = true) => {
    if (!audioRef.current) return;

    if (currentSong?.id === song.id && isPlaying && !forcePlay) {
      return;
    }

    setCurrentSong(song);

    // Fade out slightly before switching
    const audio = audioRef.current;
    audio.src = song.src;
    if (song.startTime) {
      audio.currentTime = song.startTime;
    }

    if (hasStarted || forcePlay) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Autoplay error:', err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Playback error:', err));
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
