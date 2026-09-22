import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { PosterCard, LandscapeCard, ChannelCard } from './ContentCard';
import type { Content } from '../types';

interface CarouselProps {
  title: string;
  items: Content[];
  variant?: 'poster' | 'landscape' | 'channel' | 'continue';
  badge?: string;
}

export function Carousel({ title, items, variant = 'poster', badge }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = variant === 'poster' ? 160 : variant === 'landscape' || variant === 'continue' ? 280 : 200;

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = (cardWidth + 12) * 3;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  return (
    <section className="mb-8 md:mb-10">
      <div className="flex items-center justify-between px-4 md:px-8 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base md:text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {title}
          </h2>
          {badge && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
              style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary-light)' }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: canScrollLeft ? 'var(--color-surface-3)' : 'transparent',
              color: canScrollLeft ? 'var(--color-text-muted)' : 'var(--color-text-subtle)',
              opacity: canScrollLeft ? 1 : 0.3,
            }}
          >
            <ChevronLeftIcon size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: canScrollRight ? 'var(--color-surface-3)' : 'transparent',
              color: canScrollRight ? 'var(--color-text-muted)' : 'var(--color-text-subtle)',
            }}
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="carousel-scroll pl-4 md:pl-8"
        style={{ paddingRight: '16px' }}
      >
        {items.map(item => (
          <div key={item.id}>
            {variant === 'poster' && <PosterCard content={item} width={cardWidth} />}
            {(variant === 'landscape' || variant === 'continue') && (
              <LandscapeCard content={item} width={cardWidth} showProgress={variant === 'continue'} />
            )}
            {variant === 'channel' && <ChannelCard content={item} width={cardWidth} />}
          </div>
        ))}
      </div>
    </section>
  );
}
