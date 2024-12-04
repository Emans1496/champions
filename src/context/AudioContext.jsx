// AudioContext.js
import React, { createContext, useRef, useEffect } from 'react';
import jerkitout from '../assets/sounds/jerkitout.mp3';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
    }
  }, []);

  return (
    <AudioContext.Provider value={audioRef}>
      {children}
      <audio ref={audioRef} loop>
        <source src={jerkitout} type="audio/mp3" />
        Il tuo browser non supporta l'elemento audio.
      </audio>
    </AudioContext.Provider>
  );
};
