import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';

export default function AudioNarration({ title, text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported || !text) return null;

  const handleTogglePlay = () => {
    const synth = window.speechSynthesis;

    if (isPlaying) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
      return;
    }

    synth.cancel(); // clear queue
    const spokenContent = `${title}. ${text}`;
    const utterance = new SpeechSynthesisUtterance(spokenContent);
    utterance.rate = 0.95; // Slightly slower, calm storytelling cadence
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-xs font-medium">
      <span className="flex items-center gap-1.5 font-semibold text-forest-900">
        <Volume2 className="w-4 h-4 text-forest-600 animate-pulse" />
        Audio Story:
      </span>

      <button
        type="button"
        onClick={handleTogglePlay}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-700 text-white hover:bg-forest-800 transition-colors shadow-sm"
        title={isPlaying && !isPaused ? 'Pause narration' : 'Play narration'}
      >
        {isPlaying && !isPaused ? (
          <>
            <Pause className="w-3 h-3" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 fill-current" />
            <span>{isPaused ? 'Resume' : 'Listen'}</span>
          </>
        )}
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={handleStop}
          className="p-1 rounded-lg text-forest-700 hover:bg-forest-100 transition-colors"
          title="Stop narration"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

