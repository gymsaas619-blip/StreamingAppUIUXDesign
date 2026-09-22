import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon,
  VolumeIcon, VolumeOffIcon, MaximizeIcon, MinimizeIcon,
  ChevronLeftIcon, SubtitleIcon, AudioIcon, NextIcon, SettingsIcon
} from '../components/Icons';
import type { Content } from '../types';

export function PlayerScreen() {
  const { params, goBack, tvMode } = useApp();
  const content = params.content as Content;
  const isLive = params.isLive as boolean;
  const episodeNumber = (params.episode as { number?: number } | undefined)?.number;

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(isLive ? 0 : (content?.progress ?? 0));
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState<null | 'subtitle' | 'audio' | 'quality'>(null);
  const [buffering, setBuffering] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [subtitle, setSubtitle] = useState('Off');
  const [audioTrack, setAudioTrack] = useState('Original');
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const resetHideTimer = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowControls(true);
    hideTimeout.current = setTimeout(() => setShowControls(false), 3500);
  };

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current); };
  }, []);

  useEffect(() => {
    if (!playing || isLive) return;
    const timer = setInterval(() => setProgress(p => Math.min(p + 0.3, 100)), 300);
    return () => clearInterval(timer);
  }, [playing, isLive]);

  const formatTime = (pct: number, totalMin: number = 120) => {
    const sec = Math.floor((pct / 100) * totalMin * 60);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!content) return null;

  const QUALITIES = ['4K UHD', '1080p', '720p', '480p', 'Auto'];
  const SUBTITLES = ['Off', 'English', 'Spanish', 'French', 'Portuguese', 'Japanese'];
  const AUDIO = ['Original', 'English Dub', 'Spanish Dub', 'French Dub'];

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center cursor-none"
      style={{ cursor: showControls ? 'default' : 'none' }}
      onMouseMove={resetHideTimer}
      onClick={() => { if (!showSubMenu) setPlaying(p => !p); setShowSubMenu(null); }}
    >
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#000' }}>
        <img
          src={content.hero}
          alt={content.title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.6, filter: 'brightness(0.5) saturate(0.8)' }}
        />
      </div>

      {/* Buffering spinner */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: `var(--color-primary) transparent transparent transparent` }}
          />
        </div>
      )}

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-30 px-6 pt-6 pb-16 flex items-center gap-4 transition-opacity duration-300"
        style={{
          opacity: showControls ? 1 : 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); goBack(); }}
          className="w-10 h-10 rounded-full glass flex items-center justify-center"
          style={{ color: 'white' }}
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-lg truncate" style={{ fontFamily: 'var(--font-display)' }}>
            {content.title}
          </p>
          {episodeNumber && (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Season {content.seasons?.[0]?.number} · Episode {episodeNumber}
            </p>
          )}
          {isLive && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-red-500 live-dot" />
              <span className="text-xs font-bold text-red-400">LIVE</span>
            </div>
          )}
        </div>

        {/* Quality indicator */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowSubMenu(showSubMenu === 'quality' ? null : 'quality'); }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold glass"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          {quality}
        </button>
      </div>

      {/* Center play/pause flash */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(124,108,243,0.9)', boxShadow: '0 0 40px rgba(124,108,243,0.5)' }}
          >
            <PlayIcon size={32} />
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-8 pt-16 transition-opacity duration-300"
        style={{
          opacity: showControls ? 1 : 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        {!isLive && (
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span>{formatTime(progress)}</span>
              <span>{formatTime(100)}</span>
            </div>
          </div>
        )}

        {isLive && (
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)' }}>
              <div className="w-2 h-2 rounded-full bg-red-500 live-dot" />
              <span className="text-xs font-bold text-red-400">LIVE</span>
            </div>
            <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div className="h-full rounded-full" style={{ width: '100%', background: 'var(--color-red-live)' }} />
            </div>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Skip back */}
          <button
            onClick={() => setProgress(p => Math.max(0, p - 3.3))}
            className={`text-white transition-transform hover:scale-110 ${tvMode ? 'tv-focus-ring' : ''}`}
          >
            <SkipBackIcon size={tvMode ? 32 : 24} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setPlaying(p => !p)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${tvMode ? 'tv-focus-ring w-16 h-16' : ''}`}
            style={{ background: 'var(--color-primary)', boxShadow: '0 0 20px rgba(124,108,243,0.5)' }}
          >
            {playing ? <PauseIcon size={tvMode ? 26 : 22} /> : <PlayIcon size={tvMode ? 26 : 22} />}
          </button>

          {/* Skip forward */}
          <button
            onClick={() => setProgress(p => Math.min(100, p + 3.3))}
            className={`text-white transition-transform hover:scale-110 ${tvMode ? 'tv-focus-ring' : ''}`}
          >
            <SkipForwardIcon size={tvMode ? 32 : 24} />
          </button>

          {/* Volume */}
          <button
            onClick={() => setMuted(m => !m)}
            className="text-white transition-transform hover:scale-110"
          >
            {muted ? <VolumeOffIcon size={22} /> : <VolumeIcon size={22} />}
          </button>

          {/* Volume slider (desktop) */}
          <div className="hidden md:flex items-center w-28">
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : volume}
              onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
              style={{ accentColor: 'var(--color-primary)' }}
            />
          </div>

          <div className="flex-1" />

          {/* Subtitle button */}
          <div className="relative">
            <button
              onClick={() => setShowSubMenu(showSubMenu === 'subtitle' ? null : 'subtitle')}
              className="text-white transition-colors hover:text-purple-300"
              title="Subtitles"
            >
              <SubtitleIcon size={22} />
            </button>
            {showSubMenu === 'subtitle' && (
              <div
                className="absolute bottom-12 right-0 rounded-xl py-2 min-w-36 z-50"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)' }}
              >
                <p className="text-xs font-bold px-3 pb-2" style={{ color: 'var(--color-text-subtle)' }}>SUBTITLES</p>
                {SUBTITLES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSubtitle(s); setShowSubMenu(null); }}
                    className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
                    style={{ color: subtitle === s ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
                  >
                    {subtitle === s && '✓ '}{s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audio track */}
          <div className="relative">
            <button
              onClick={() => setShowSubMenu(showSubMenu === 'audio' ? null : 'audio')}
              className="text-white transition-colors hover:text-purple-300"
              title="Audio track"
            >
              <AudioIcon size={22} />
            </button>
            {showSubMenu === 'audio' && (
              <div
                className="absolute bottom-12 right-0 rounded-xl py-2 min-w-40 z-50"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)' }}
              >
                <p className="text-xs font-bold px-3 pb-2" style={{ color: 'var(--color-text-subtle)' }}>AUDIO</p>
                {AUDIO.map(a => (
                  <button
                    key={a}
                    onClick={() => { setAudioTrack(a); setShowSubMenu(null); }}
                    className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
                    style={{ color: audioTrack === a ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
                  >
                    {audioTrack === a && '✓ '}{a}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quality */}
          {showSubMenu === 'quality' && (
            <div
              className="absolute bottom-24 right-24 rounded-xl py-2 min-w-32 z-50"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)' }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-xs font-bold px-3 pb-2" style={{ color: 'var(--color-text-subtle)' }}>QUALITY</p>
              {QUALITIES.map(q => (
                <button
                  key={q}
                  onClick={() => { setQuality(q); setShowSubMenu(null); }}
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
                  style={{ color: quality === q ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
                >
                  {quality === q && '✓ '}{q}
                </button>
              ))}
            </div>
          )}

          {/* Next episode */}
          {(content.type === 'series' || content.type === 'anime') && (
            <button className="text-white transition-colors hover:text-purple-300" title="Next episode">
              <NextIcon size={22} />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={() => setFullscreen(f => !f)}
            className="text-white transition-transform hover:scale-110"
          >
            {fullscreen ? <MinimizeIcon size={22} /> : <MaximizeIcon size={22} />}
          </button>
        </div>
      </div>

      {/* TV D-Pad guide overlay */}
      {tvMode && showControls && (
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 z-40 rounded-2xl p-4"
          style={{ background: 'rgba(13,15,24,0.85)', border: '1px solid var(--color-border-strong)' }}
        >
          <p className="text-xs font-bold mb-3 text-center" style={{ color: 'var(--color-text-subtle)' }}>D-PAD</p>
          <div className="grid grid-cols-3 gap-1 text-center">
            {['', '▲ Vol+', '', '◀ -10s', 'OK Play', '▶ +10s', '', '▼ Vol-', ''].map((label, i) => (
              <div key={i} className="text-[10px] px-1 py-1 rounded" style={{ background: label ? 'var(--color-surface-3)' : 'transparent', color: 'var(--color-text-muted)', minWidth: 44, minHeight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
