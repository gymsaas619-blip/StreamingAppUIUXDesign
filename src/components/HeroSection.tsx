import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PlayIcon, PlusIcon, CheckIcon, InfoIcon, StarIcon } from './Icons';
import type { Content } from '../types';

interface HeroSectionProps {
  items: Content[];
}

export function HeroSection({ items }: HeroSectionProps) {
  const { navigate, toggleMyList, isInMyList } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = items[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % items.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!featured) return null;
  const inList = isInMyList(featured.id);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'min(75vh, 680px)' }}>
      {/* Background image with crossfade */}
      {items.map((item, i) => (
        <div
          key={item.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        >
          <img
            src={item.hero}
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-bottom absolute inset-0" />
      <div className="absolute inset-0" style={{ background: 'rgba(7,8,12,0.3)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex items-end md:items-center pb-16 md:pb-0">
        <div className="px-6 md:px-12 lg:px-16 max-w-2xl fade-in" key={featured.id}>
          {/* Genre chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {featured.genres.map(g => (
              <span
                key={g}
                className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(124,108,243,0.2)', color: 'var(--color-primary-light)', border: '1px solid rgba(124,108,243,0.3)' }}
              >
                {g}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          >
            {featured.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>{featured.year}</span>
            {featured.duration && (
              <span style={{ color: 'var(--color-text-subtle)' }}>·</span>
            )}
            {featured.duration && (
              <span style={{ color: 'var(--color-text-muted)' }}>{featured.duration}</span>
            )}
            {featured.rating && (
              <>
                <span style={{ color: 'var(--color-text-subtle)' }}>·</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-text-muted)' }}
                >
                  {featured.rating}
                </span>
              </>
            )}
            {featured.score > 0 && (
              <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--color-gold)' }}>
                <StarIcon size={13} />
                {featured.score}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed mb-7 max-w-lg"
            style={{ color: 'rgba(241,245,249,0.75)' }}
          >
            {featured.description.length > 160
              ? `${featured.description.slice(0, 160)}…`
              : featured.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('player', { content: featured })}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:brightness-110"
              style={{ background: 'var(--color-primary)', color: 'white', boxShadow: '0 4px 20px rgba(124,108,243,0.4)' }}
            >
              <PlayIcon size={16} />
              Play Now
            </button>

            <button
              onClick={() => toggleMyList(featured)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all glass-light hover:brightness-125"
              style={{ color: inList ? 'var(--color-teal)' : 'var(--color-text)' }}
            >
              {inList ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
              {inList ? 'In My List' : 'My List'}
            </button>

            <button
              onClick={() => navigate('detail', { content: featured })}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all glass-light hover:brightness-125"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <InfoIcon size={16} />
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-6 md:right-12 flex items-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="transition-all rounded-full"
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 6,
              background: i === activeIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
