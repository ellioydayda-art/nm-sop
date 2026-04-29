'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  IconPlay,
  IconPause,
  IconEnterFullscreen,
  IconExitFullscreen,
  IconChevronUp,
  IconCheck,
} from './Icons';

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2] as const;
type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

type FsCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

function getFullscreenElement(): Element | null {
  const d = document as FsDocument;
  return (
    document.fullscreenElement ??
    d.webkitFullscreenElement ??
    d.mozFullScreenElement ??
    d.msFullscreenElement ??
    null
  );
}

async function requestElementFullscreen(el: HTMLElement): Promise<void> {
  const e = el as FsCapableElement;
  if (typeof el.requestFullscreen === 'function') {
    await el.requestFullscreen();
    return;
  }
  if (typeof e.webkitRequestFullscreen === 'function') {
    await e.webkitRequestFullscreen();
    return;
  }
  if (typeof e.mozRequestFullScreen === 'function') {
    await e.mozRequestFullScreen();
    return;
  }
  if (typeof e.msRequestFullscreen === 'function') {
    await e.msRequestFullscreen();
  }
}

async function exitDocumentFullscreen(): Promise<void> {
  const d = document as FsDocument;
  if (typeof document.exitFullscreen === 'function') {
    await document.exitFullscreen();
    return;
  }
  if (typeof d.webkitExitFullscreen === 'function') {
    await d.webkitExitFullscreen();
    return;
  }
  if (typeof d.mozCancelFullScreen === 'function') {
    await d.mozCancelFullScreen();
    return;
  }
  if (typeof d.msExitFullscreen === 'function') {
    await d.msExitFullscreen();
  }
}

interface VideoPlayerProps {
  url: string;
  title: string;
}

function speedMenuLabel(speed: PlaybackSpeed): string {
  return speed === 1 ? 'Normal' : `${speed}×`;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  const syncFullscreenState = useCallback(() => {
    const root = containerRef.current;
    setIsFullscreen(root !== null && getFullscreenElement() === root);
  }, []);

  useEffect(() => {
    const opts = { capture: false } as const;
    document.addEventListener('fullscreenchange', syncFullscreenState, opts);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState, opts);
    document.addEventListener('mozfullscreenchange', syncFullscreenState, opts);
    document.addEventListener('MSFullscreenChange', syncFullscreenState, opts);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState, opts);
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState, opts);
      document.removeEventListener('mozfullscreenchange', syncFullscreenState, opts);
      document.removeEventListener('MSFullscreenChange', syncFullscreenState, opts);
    };
  }, [syncFullscreenState]);

  useEffect(() => {
    if (!speedMenuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const root = speedMenuRef.current;
      const t = e.target;
      if (root && t instanceof Node && !root.contains(t)) {
        setSpeedMenuOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSpeedMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [speedMenuOpen]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
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
    setSpeedMenuOpen(false);
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

  async function toggleFullscreen() {
    const root = containerRef.current;
    if (!root) return;
    try {
      if (getFullscreenElement() === root) {
        await exitDocumentFullscreen();
      } else {
        await requestElementFullscreen(root);
      }
    } catch {
      /* iOS / blocked fullscreen — ignore */
    }
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  const currentTime = duration ? (progress / 100) * duration : 0;

  const chromeBtn =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00adef]';

  return (
    <div
      ref={containerRef}
      className={`flex min-h-0 flex-col bg-black ${
        isFullscreen
          ? 'h-screen max-h-[100dvh] w-screen border-0'
          : 'max-w-full rounded-xl border border-[#27272a]'
      }`}
    >
      <div
        className={`relative flex min-h-0 cursor-pointer items-center justify-center overflow-hidden bg-black ${
          isFullscreen ? 'min-h-0 flex-1' : 'rounded-t-xl'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={url}
          className={`w-full bg-black object-contain ${
            isFullscreen
              ? 'max-h-[calc(100dvh-7.5rem)] min-h-0 max-w-full'
              : 'max-h-[480px]'
          }`}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          preload="metadata"
          playsInline
        />

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            hovered || !playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="pointer-events-none flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm">
            {playing ? (
              <IconPause className="text-white" size={18} />
            ) : (
              <IconPlay className="ml-0.5 text-white" size={18} />
            )}
          </div>
        </div>
      </div>

      {/* Vimeo-style chrome: title, scrubber, play + time + speed menu + fullscreen */}
      <div
        className={`relative z-20 shrink-0 overflow-visible border-t border-white/[0.06] bg-[#1a1a1c] px-3 py-2.5 sm:px-4 ${
          isFullscreen
            ? 'pb-[max(0.625rem,env(safe-area-inset-bottom))]'
            : 'rounded-b-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-2 truncate text-left text-[11px] font-medium tracking-wide text-zinc-500">
          {title}
        </p>

        <div
          className="group/bar mb-2.5 h-1 cursor-pointer rounded-full bg-zinc-700/80 transition-all hover:h-1.5"
          onClick={seek}
        >
          <div
            className="relative h-full rounded-full bg-[#00adef]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#4dcfff] opacity-0 shadow-sm transition-opacity group-hover/bar:opacity-100" />
          </div>
        </div>

        <div className="grid min-h-[2.25rem] grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1">
          <button
            type="button"
            className={chromeBtn}
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <IconPause className="text-zinc-100" size={20} />
            ) : (
              <IconPlay className="ml-0.5 text-zinc-100" size={20} />
            )}
          </button>

          <span className="shrink-0 font-mono text-[11px] tabular-nums text-zinc-400">
            <span className="text-zinc-200">{fmt(currentTime)}</span>
            <span className="text-zinc-600"> / </span>
            <span>{fmt(duration)}</span>
          </span>

          <div
            ref={speedMenuRef}
            className="relative flex min-w-0 justify-center justify-self-center"
          >
            <button
              type="button"
              className="flex h-9 max-w-full shrink-0 items-center gap-1 rounded-md px-2.5 text-[12px] font-medium tabular-nums text-zinc-100 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00adef]"
              aria-haspopup="listbox"
              aria-expanded={speedMenuOpen}
              aria-controls="vimeo-speed-menu"
              id="vimeo-speed-trigger"
              onClick={() => setSpeedMenuOpen((o) => !o)}
            >
              <span>{speedMenuLabel(playbackSpeed)}</span>
              <IconChevronUp
                className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
                  speedMenuOpen ? 'rotate-0' : 'rotate-180'
                }`}
                size={14}
              />
            </button>

            {speedMenuOpen ? (
              <div
                id="vimeo-speed-menu"
                role="listbox"
                aria-labelledby="vimeo-speed-trigger"
                className="absolute bottom-full left-1/2 z-30 mb-2 w-[11.5rem] -translate-x-1/2 rounded-lg border border-white/[0.08] bg-[#2c2c30] py-1 shadow-[0_-8px_32px_rgba(0,0,0,0.45)]"
              >
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Speed
                </p>
                <div className="pb-1">
                  {PLAYBACK_SPEEDS.map((speed) => {
                    const selected = playbackSpeed === speed;
                    return (
                      <button
                        key={speed}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[13px] transition-colors ${
                          selected
                            ? 'bg-white/[0.06] text-white'
                            : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                        onClick={() => applyPlaybackSpeed(speed)}
                      >
                        <span>{speedMenuLabel(speed)}</span>
                        {selected ? (
                          <IconCheck className="shrink-0 text-[#00adef]" size={16} />
                        ) : (
                          <span className="w-4 shrink-0" aria-hidden />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className={chromeBtn}
            onClick={() => void toggleFullscreen()}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <IconExitFullscreen className="text-zinc-100" size={20} />
            ) : (
              <IconEnterFullscreen className="text-zinc-100" size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
