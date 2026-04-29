'use client';

import { useRef, useState } from 'react';
import { IconPlay, IconPause } from './Icons';

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2] as const;
type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

interface VideoPlayerProps {
  url: string;
  title: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function onTimeUpdate() {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100 || 0);
  }

  function onLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    v.playbackRate = playbackSpeed;
  }

  function applyPlaybackSpeed(speed: PlaybackSpeed) {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
  }

  function onEnded() {
    setPlaying(false);
    setProgress(0);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  const currentTime = duration ? (progress / 100) * duration : 0;

  return (
    <div className="rounded-xl overflow-hidden border border-[#27272a] bg-black group">
      {/* Video element */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={url}
          className="w-full max-h-[480px] object-contain bg-black"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          preload="metadata"
          playsInline
        />

        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            hovered || !playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            {playing
              ? <IconPause className="text-white" size={18} />
              : <IconPlay className="text-white ml-0.5" size={18} />
            }
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-[#111113] px-4 py-3">
        <p className="text-xs text-zinc-400 font-medium mb-2 truncate">{title}</p>

        {/* Progress bar */}
        <div
          className="h-1 bg-zinc-800 rounded-full cursor-pointer mb-2 group/bar hover:h-1.5 transition-all"
          onClick={seek}
        >
          <div
            className="h-full bg-indigo-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 text-[11px] text-zinc-600 font-mono">
          <span className="tabular-nums">{fmt(currentTime)}</span>
          <div
            className="flex flex-wrap items-center justify-center gap-1"
            role="group"
            aria-label="Playback speed"
            onClick={(e) => e.stopPropagation()}
          >
            {PLAYBACK_SPEEDS.map((speed) => {
              const label = speed === 1 ? '1×' : `${speed}×`;
              const active = playbackSpeed === speed;
              return (
                <button
                  key={speed}
                  type="button"
                  onClick={() => applyPlaybackSpeed(speed)}
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <span className="tabular-nums text-right">{fmt(duration)}</span>
        </div>
      </div>
    </div>
  );
}
