import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlayIcon, PlusIcon, CheckIcon, StarIcon } from './Icons';
import type { Content } from '../types';

interface PosterCardProps {
  content: Content;
  width?: number;
}

export function PosterCard({ content, width = 160 }: PosterCardProps) {
  const { navigate, toggleMyList, isInMyList, tvMode } = useApp();
  const [hovered, setHovered] = useState(false);
  const inList = isInMyList(content.id);

  return (
    <div
      className={`relative cursor-pointer group rounded-xl overflow-hidden card-hover flex-shrink-0 ${tvMode ? 'tv-focus-ring' : ''}`}
      style={{ width, background: 'var(--color-surface-2)' }}
      tabIndex={tvMode ? 0 : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('detail', { content })}
    >
      <div className="relative" style={{ aspectRatio: '2/3' }}>
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-200"
          style={{
            background: 'linear-gradient(to top, rgba(7,8,12,0.95) 0%, transparent 60%)',
            opacity: hovered || tvMode ? 1 : 0,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); navigate('player', { content }); }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold mb-2 transition-colors"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            <PlayIcon size={12} />
            Play
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMyList(content); }}
            className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: inList ? 'rgba(45,212,191,0.15)' : 'rgba(255,255,255,0.1)',
              color: inList ? 'var(--color-teal)' : 'var(--color-text-muted)',
              border: `1px solid ${inList ? 'rgba(45,212,191,0.3)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {inList ? <CheckIcon size={12} /> : <PlusIcon size={12} />}
            {inList ? 'In My List' : 'My List'}
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {content.isNew && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--color-green)', color: 'white' }}>NEW</span>
          )}
          {content.isTrending && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--color-gold)', color: '#1a1000' }}>TOP</span>
          )}
        </div>

        {/* Progress bar for continue watching */}
        {content.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full"
              style={{ width: `${content.progress}%`, background: 'var(--color-primary)' }}
            />
          </div>
        )}
      </div>

      <div className="p-2">
        <p className="text-xs font-semibold leading-tight truncate" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>{content.year}</span>
          {content.score > 0 && (
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: 'var(--color-gold)' }}>
              <StarIcon size={9} />
              {content.score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface LandscapeCardProps {
  content: Content;
  width?: number;
  showProgress?: boolean;
}

export function LandscapeCard({ content, width = 280, showProgress = false }: LandscapeCardProps) {
  const { navigate, tvMode } = useApp();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer rounded-xl overflow-hidden card-hover flex-shrink-0 ${tvMode ? 'tv-focus-ring' : ''}`}
      style={{ width, background: 'var(--color-surface-2)' }}
      tabIndex={tvMode ? 0 : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('detail', { content })}
    >
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        <img
          src={content.hero}
          alt={content.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Play button on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0, background: 'rgba(0,0,0,0.4)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(124,108,243,0.9)' }}
          >
            <PlayIcon size={18} />
          </div>
        </div>

        {/* Live badge */}
        {content.isLive && (
          <div
            className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{ background: 'var(--color-red-live)', color: 'white' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white live-dot" />
            <span className="text-[10px] font-bold tracking-wider">LIVE</span>
          </div>
        )}

        {/* Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '50%', background: 'linear-gradient(to top, rgba(7,8,12,1), transparent)' }}
        />

        {/* Progress bar */}
        {showProgress && content.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-0.5 bg-white/15">
              <div className="h-full" style={{ width: `${content.progress}%`, background: 'var(--color-primary)' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </p>
        {showProgress && content.progressLabel && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{content.progressLabel}</p>
        )}
        {!showProgress && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{content.genres?.[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface ChannelCardProps {
  content: Content;
  width?: number;
}

export function ChannelCard({ content, width = 200 }: ChannelCardProps) {
  const { navigate, tvMode } = useApp();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer rounded-xl overflow-hidden card-hover flex-shrink-0 ${tvMode ? 'tv-focus-ring' : ''}`}
      style={{ width, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
      tabIndex={tvMode ? 0 : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('player', { content, isLive: true })}
    >
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        <img src={content.hero} alt={content.title} className="w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0, background: 'rgba(0,0,0,0.5)' }}
        >
          <PlayIcon size={28} />
        </div>
        <div
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold"
          style={{ background: 'var(--color-red-live)', color: 'white' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white live-dot inline-block" />
          LIVE
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{content.title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-subtle)' }}>{content.channelCategory}</p>
      </div>
    </div>
  );
}

interface TVChannelRowProps {
  content: Content;
  isActive?: boolean;
}

export function TVChannelRow({ content, isActive = false }: TVChannelRowProps) {
  const { navigate, tvMode } = useApp();

  return (
    <button
      onClick={() => navigate('player', { content, isLive: true })}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left ${tvMode ? 'tv-focus-ring' : ''}`}
      style={{
        background: isActive ? 'var(--color-primary-dim)' : 'var(--color-surface-2)',
        border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
      }}
    >
      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
        <img src={content.poster} alt={content.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{content.title}</p>
        <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{content.channelCategory}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--color-red-live)' }} />
        <span className="text-[10px] font-bold" style={{ color: 'var(--color-red-live)' }}>LIVE</span>
      </div>
    </button>
  );
}
