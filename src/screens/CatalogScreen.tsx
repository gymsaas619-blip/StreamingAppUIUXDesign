import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PosterCard } from '../components/ContentCard';
import { movies, series, animeList } from '../data/mock';
import { GridIcon, ListIcon, ChevronDownIcon } from '../components/Icons';
import type { Content } from '../types';

type SortKey = 'popular' | 'newest' | 'rating' | 'az';

const GENRES_MOVIE = ['All', 'Action', 'Sci-Fi', 'Drama', 'Horror', 'Comedy', 'Adventure', 'Thriller'];
const GENRES_SERIES = ['All', 'Drama', 'Thriller', 'Sci-Fi', 'Mystery', 'Comedy', 'Crime'];
const GENRES_ANIME = ['All', 'Action', 'Fantasy', 'Mecha', 'Isekai', 'Horror', 'Romance'];

interface CatalogScreenProps {
  type: 'movies' | 'series' | 'anime';
}

export function CatalogScreen({ type }: CatalogScreenProps) {
  const { navigate } = useApp();
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState<SortKey>('popular');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const rawItems: Content[] = type === 'movies' ? movies : type === 'series' ? series : animeList;
  const genres = type === 'movies' ? GENRES_MOVIE : type === 'series' ? GENRES_SERIES : GENRES_ANIME;

  const filtered = rawItems.filter(c => genre === 'All' || c.genres.includes(genre));
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'rating') return b.score - a.score;
    if (sort === 'newest') return b.year - a.year;
    if (sort === 'az') return a.title.localeCompare(b.title);
    return b.isTrending ? 1 : -1;
  });

  const title = type === 'movies' ? 'Movies' : type === 'series' ? 'Series' : 'Anime';

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="px-6 md:px-12 pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          {title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {sorted.length} titles available
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 px-4 md:px-12 py-3 flex items-center gap-3 overflow-x-auto glass border-b" style={{ borderColor: 'var(--color-border)' }}>
        {/* Genre chips */}
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: genre === g ? 'var(--color-primary)' : 'var(--color-surface-3)',
                color: genre === g ? 'white' : 'var(--color-text-muted)',
              }}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
              style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
              <option value="az">A–Z</option>
            </select>
            <ChevronDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-muted)' } as React.CSSProperties} />
          </div>

          <button
            onClick={() => setLayout(l => l === 'grid' ? 'list' : 'grid')}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}
          >
            {layout === 'grid' ? <ListIcon size={14} /> : <GridIcon size={14} />}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`px-4 md:px-12 mt-6 ${layout === 'grid' ? 'grid gap-4' : 'flex flex-col gap-3'}`}
        style={{ gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(150px, 1fr))' : undefined }}
      >
        {sorted.map(item => (
          layout === 'grid' ? (
            <PosterCard key={item.id} content={item} />
          ) : (
            <button
              key={item.id}
              onClick={() => navigate('detail', { content: item })}
              className="flex items-center gap-4 p-3 rounded-xl transition-colors text-left"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
            >
              <img src={item.poster} alt={item.title} className="w-14 h-20 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.year} · {item.genres.join(', ')}</p>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-subtle)' }}>{item.description}</p>
              </div>
              <div className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--color-gold)' }}>
                {item.score > 0 ? `★ ${item.score}` : ''}
              </div>
            </button>
          )
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="text-4xl">🎬</div>
          <p className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>No titles match this filter</p>
          <button onClick={() => setGenre('All')} className="text-sm" style={{ color: 'var(--color-primary-light)' }}>
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
