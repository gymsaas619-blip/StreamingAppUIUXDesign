import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlayIcon, PlusIcon, CheckIcon, ChevronLeftIcon, StarIcon, ChevronDownIcon } from '../components/Icons';
import type { Content } from '../types';

export function ContentDetailScreen() {
  const { params, navigate, goBack, toggleMyList, isInMyList } = useApp();
  const content = params.content as Content;
  const [selectedSeason, setSelectedSeason] = useState(0);

  if (!content) return null;
  const inList = isInMyList(content.id);
  const hasSeries = (content.seasons?.length ?? 0) > 0;
  const currentSeason = content.seasons?.[selectedSeason];

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--color-bg)' }}>
      {/* Hero */}
      <div className="relative" style={{ height: 'min(70vh, 600px)' }}>
        <img src={content.hero} alt={content.title} className="w-full h-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-gradient-bottom absolute inset-0" />

        {/* Back button */}
        <button
          onClick={goBack}
          className="absolute top-20 left-4 md:top-6 md:left-6 w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:brightness-125"
          style={{ color: 'var(--color-text)' }}
        >
          <ChevronLeftIcon size={20} />
        </button>

        {/* Content info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
          {/* Type badge */}
          <div className="flex gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary-light)' }}
            >
              {content.type === 'series' ? 'Series' : content.type === 'anime' ? 'Anime' : 'Movie'}
            </span>
            {content.isNew && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: 'var(--color-green)', color: 'white' }}>New</span>
            )}
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
          >
            {content.title}
          </h1>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
            <span style={{ color: 'var(--color-text-muted)' }}>{content.year}</span>
            {content.duration && <span style={{ color: 'var(--color-text-muted)' }}>· {content.duration}</span>}
            {content.rating && (
              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-text-muted)' }}>
                {content.rating}
              </span>
            )}
            {content.score > 0 && (
              <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--color-gold)' }}>
                <StarIcon size={13} /> {content.score}
              </span>
            )}
            {content.status && (
              <span style={{ color: content.status === 'Ongoing' ? 'var(--color-teal)' : 'var(--color-text-subtle)' }}>
                · {content.status}
              </span>
            )}
            {content.episodeCount && (
              <span style={{ color: 'var(--color-text-muted)' }}>· {content.episodeCount} episodes</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('player', { content })}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
              style={{ background: 'var(--color-primary)', color: 'white', boxShadow: '0 4px 20px rgba(124,108,243,0.4)' }}
            >
              <PlayIcon size={16} />
              {content.progress ? 'Resume' : 'Play'}
            </button>

            <button
              onClick={() => toggleMyList(content)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all glass-light"
              style={{ color: inList ? 'var(--color-teal)' : 'var(--color-text)' }}
            >
              {inList ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
              {inList ? 'In My List' : 'My List'}
            </button>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="px-6 md:px-12 mt-8 grid md:grid-cols-3 gap-8">
        {/* Main info */}
        <div className="md:col-span-2">
          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-5">
            {content.genres.map(g => (
              <span key={g} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}>
                {g}
              </span>
            ))}
          </div>

          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {content.description}
          </p>

          {/* Cast & crew */}
          {content.director && (
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>Director</span>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{content.director}</p>
            </div>
          )}
          {content.cast && content.cast.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-subtle)' }}>Cast</span>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{content.cast.join(' · ')}</p>
            </div>
          )}
        </div>

        {/* Side info */}
        <div className="space-y-4">
          {[
            { label: 'Type', value: content.type === 'movie' ? 'Feature Film' : content.type === 'series' ? 'TV Series' : 'Anime Series' },
            { label: 'Year', value: String(content.year) },
            ...(content.duration ? [{ label: 'Duration', value: content.duration }] : []),
            ...(content.rating ? [{ label: 'Rating', value: content.rating }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-xl" style={{ background: 'var(--color-surface-2)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-subtle)' }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Episodes section for series/anime */}
      {hasSeries && (
        <div className="px-6 md:px-12 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Episodes</h2>

            {/* Season selector */}
            {(content.seasons?.length ?? 0) > 1 && (
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={e => setSelectedSeason(Number(e.target.value))}
                  className="appearance-none pl-4 pr-10 py-2 rounded-xl text-sm font-medium cursor-pointer"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-text)', border: '1px solid var(--color-border-strong)' }}
                >
                  {content.seasons?.map((s, i) => (
                    <option key={i} value={i}>Season {s.number}</option>
                  ))}
                </select>
                <ChevronDownIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-muted)' } as React.CSSProperties} />
              </div>
            )}
          </div>

          <div className="space-y-3">
            {currentSeason?.episodes.map(ep => (
              <button
                key={ep.id}
                onClick={() => navigate('player', { content, episode: ep })}
                className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <PlayIcon size={20} />
                  </div>
                  {ep.progress !== undefined && ep.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <div className="h-full" style={{ width: `${ep.progress}%`, background: 'var(--color-primary)' }} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-4)', color: 'var(--color-text-subtle)' }}>
                      Ep {ep.number}
                    </span>
                    {ep.progress === 100 && (
                      <span className="text-xs" style={{ color: 'var(--color-teal)' }}>✓ Watched</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-text)' }}>{ep.title}</p>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-text-subtle)' }}>{ep.description}</p>
                </div>

                <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-subtle)' }}>{ep.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
