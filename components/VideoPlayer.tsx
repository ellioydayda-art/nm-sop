'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  IconPlay,
  IconPause,
  IconEnterFullscreen,
  IconExitFullscreen,
  IconCheck,
  IconSettings,
  IconVolume2,
  IconVolumeX,
} from './Icons';

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2] as const;
type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number];

/** MediaError.code — use literals so WebViews without MediaError statics still match. */
const MEDIA_ERR_ABORTED = 1;
const MEDIA_ERR_NETWORK = 2;
const MEDIA_ERR_DECODE = 3;
const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

const ERROR_CONFIRM_MS = 400;

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
  const volumeInputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const errorConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Only show errors after the user has clicked play at least once. */
  const hasAttemptedPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [volumePopoverOpen, setVolumePopoverOpen] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

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
      const t = e.target;
      if (!(t instanceof Node)) return;
      const player = containerRef.current;
      const sm = speedMenuRef.current;
      if (sm && sm.contains(t)) return;
      if (player && player.contains(t)) return;
      setSpeedMenuOpen(false);
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

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
    el.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    return () => {
      if (errorConfirmTimerRef.current) {
        clearTimeout(errorConfirmTimerRef.current);
        errorConfirmTimerRef.current = null;
      }
    };
  }, []);

  function clearPendingErrorConfirmation() {
    if (errorConfirmTimerRef.current) {
      clearTimeout(errorConfirmTimerRef.current);
      errorConfirmTimerRef.current = null;
    }
  }

  function persistentMediaErrorText(code: number): string {
    switch (code) {
      case MEDIA_ERR_NETWORK:
        return 'The video could not finish loading (network or firewall).';
      case MEDIA_ERR_DECODE:
      case MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'This browser could not play the file in the embedded player.';
      default:
        return 'The video could not be loaded.';
    }
  }

  function handleVideoError() {
    const el = videoRef.current;
    const err = el?.error;
    if (!el || !err) return;
    const code = err.code;
    if (code === MEDIA_ERR_ABORTED) return;

    /* Never surface an error if the user has not tried to play yet.
       preload="metadata" can fire error on slow / restricted networks
       before any interaction — those are false alarms we must hide. */
    if (!hasAttemptedPlay.current) return;

    clearPendingErrorConfirmation();
    errorConfirmTimerRef.current = setTimeout(() => {
      errorConfirmTimerRef.current = null;
      if (!hasAttemptedPlay.current) return;
      const v = videoRef.current;
      const pending = v?.error;
      if (!v || !pending) return;
      const confirmed = pending.code;
      if (confirmed === MEDIA_ERR_ABORTED) return;
      setMediaError(persistentMediaErrorText(confirmed));
      setPlaying(false);
    }, ERROR_CONFIRM_MS);
  }

  function retryVideoLoad() {
    clearPendingErrorConfirmation();
    setMediaError(null);
    hasAttemptedPlay.current = false;
    const v = videoRef.current;
    if (v) {
      v.load();
    }
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (!v.paused) {
      v.pause();
      return;
    }
    hasAttemptedPlay.current = true;
    setMediaError(null);
    const tryPlay = () => v.play();

    void tryPlay().catch((err: unknown) => {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        v.muted = true;
        setMuted(true);
        void tryPlay().catch(() => {
          setPlaying(false);
        });
        return;
      }
      setPlaying(false);
    });
  }

  function onTimeUpdate() {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100 || 0);
  }

  function onLoadedMetadata() {
    clearPendingErrorConfirmation();
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    v.playbackRate = playbackSpeed;
    setMediaError(null);
  }

  function applyPlaybackSpeed(speed: PlaybackSpeed) {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
    setSpeedMenuOpen(false);
  }

  function toggleMute() {
    if (muted) {
      if (volume < 0.05) {
        setVolume(0.75);
      }
      setMuted(false);
      return;
    }
    setMuted(true);
  }

  function onVolumeSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    if (Number.isNaN(v)) return;
    const clamped = Math.min(1, Math.max(0, v));
    setVolume(clamped);
    setMuted(clamped === 0);
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
        className={`relative flex cursor-pointer items-center justify-center overflow-hidden bg-black ${
          isFullscreen
            ? 'min-h-0 flex-1'
            : 'min-h-[180px] rounded-t-xl sm:min-h-[220px]'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={togglePlay}
      >
        <video
          key={url}
          ref={videoRef}
          src={url}
          className={`w-full bg-black object-contain ${
            isFullscreen
              ? 'max-h-[calc(100dvh-7.5rem)] min-h-0 max-w-full'
              : 'max-h-[480px]'
          }`}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onLoadedData={() => {
            clearPendingErrorConfirmation();
            setMediaError(null);
          }}
          onCanPlay={() => {
            clearPendingErrorConfirmation();
            setMediaError(null);
          }}
          onEnded={onEnded}
          onPlay={() => {
            setPlaying(true);
            setMediaError(null);
          }}
          onPause={() => setPlaying(false)}
          onError={handleVideoError}
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
        {mediaError ? (
          <div className="mb-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-2 text-left text-[11px] leading-snug text-amber-100">
            <p className="mb-2">{mediaError}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7dd3fc] underline decoration-[#7dd3fc]/50 underline-offset-2 hover:text-white"
              >
                Open video in new tab
              </a>
              <button
                type="button"
                onClick={retryVideoLoad}
                className="font-medium text-[#7dd3fc] underline decoration-[#7dd3fc]/50 underline-offset-2 hover:text-white"
              >
                Reload video
              </button>
            </div>
          </div>
        ) : null}
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

        <div className="flex min-h-[2.25rem] items-center gap-x-2">
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

          <div className="min-w-0 flex-1" aria-hidden />

          <div className="flex shrink-0 items-center gap-0.5">
            <div
              className="relative"
              onMouseEnter={() => {
                setSpeedMenuOpen(false);
                setVolumePopoverOpen(true);
              }}
              onMouseLeave={() => setVolumePopoverOpen(false)}
            >
              <button
                type="button"
                className={chromeBtn}
                onClick={toggleMute}
                aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
              >
                {muted || volume === 0 ? (
                  <IconVolumeX className="text-zinc-100" size={20} />
                ) : (
                  <IconVolume2 className="text-zinc-100" size={20} />
                )}
              </button>
              {volumePopoverOpen ? (
                <div className="absolute bottom-full left-1/2 z-30 flex w-28 -translate-x-1/2 flex-col items-stretch pb-3 pt-0">
                  {/* Transparent padding below the panel stays in the hover target so
                      the cursor can reach the slider (margin outside the panel would not). */}
                  <div className="rounded-md border border-white/[0.08] bg-[#2c2c30] px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
                    <label className="sr-only" htmlFor={volumeInputId}>
                      Volume
                    </label>
                    <input
                      id={volumeInputId}
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={muted ? 0 : volume}
                      onChange={onVolumeSliderChange}
                      className="h-1.5 w-full cursor-pointer accent-[#00adef]"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div ref={speedMenuRef} className="relative flex shrink-0">
              <button
                type="button"
                className={chromeBtn}
                aria-haspopup="listbox"
                aria-expanded={speedMenuOpen}
                aria-controls="vimeo-speed-menu"
                id="vimeo-settings-trigger"
                aria-label="Playback speed"
                onClick={() => {
                  setVolumePopoverOpen(false);
                  setSpeedMenuOpen((o) => !o);
                }}
              >
                <IconSettings className="text-zinc-100" size={20} />
              </button>

              {speedMenuOpen ? (
              <div
                id="vimeo-speed-menu"
                role="listbox"
                aria-labelledby="vimeo-settings-trigger"
                className="absolute bottom-full right-0 z-30 mb-2 w-[11.5rem] rounded-lg border border-white/[0.08] bg-[#2c2c30] py-1 shadow-[0_-8px_32px_rgba(0,0,0,0.45)]"
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
    </div>
  );
}
