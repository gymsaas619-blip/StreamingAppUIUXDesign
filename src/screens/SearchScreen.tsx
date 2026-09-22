import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SearchIcon, XIcon } from '../components/Icons';
import { PosterCard } from '../components/ContentCard';
import { allContent, channels } from '../data/mock';
import type { Content } from '../types';

export function SearchScreen() {
  const { navigate } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const matched = [...allContent, ...channels].filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        c.genres.some(g => g.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q)
    );
    return {
      movies: matched.filter(c => c.type === 'movie'),
      series: matched.filter(c => c.type === 'series'),
      anime: matched.filter(c => c.type === 'anime'),
      channels: matched.filter(c => c.type === 'channel'),
    };
  }, [query]);

  const hasResults = results && Object.values(results).some(arr => arr.length > 0);

  const TRENDING_SEARCHES = ['Sci-Fi', 'Action', 'Anime', 'Thriller', 'Drama', 'Cyberpunk', 'Horror'];

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      <div className="px-4 md:px-12 pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Search
        </h1>

        {/* Search input */}
        <div className="relative mb-8">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' } as React.CSSProperties} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies, series, anime, or channels…"
            className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm font-medium transition-all outline-none"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--color-primary)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--color-border)';
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full"
              style={{ background: 'var(--color-surface-4)', color: 'var(--color-text-muted)' }}
            >
              <XIcon size={12} />
            </button>
          )}
        </div>

        {/* No query: show trending */}
        {!query && (
          <div className="fade-in">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-subtle)' }}>
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {TRENDING_SEARCHES.map(t => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:brightness-125"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-subtle)' }}>
              Browse Categories
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Movies', color: '#7C6CF3', icon: '🎬' },
                { label: 'Series', color: '#2DD4BF', icon: '📺' },
                { label: 'Anime', color: '#D4A853', icon: '⛩️' },
                { label: 'Live TV', color: '#EF4444', icon: '📡' },
              ].map(({ label, color, icon }) => (
                <button
                  key={label}
                  onClick={() => navigate(label === 'Movies' ? 'movies' : label === 'Series' ? 'series' : label === 'Anime' ? 'anime' : 'live')}
                  className="p-4 rounded-2xl flex items-center gap-3 font-semibold text-sm transition-all hover:brightness-110 text-left"
                  style={{ background: `${color}14`, border: `1px solid ${color}22`, color: 'var(--color-text)' }}
                >
                  <span className="text-2xl">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && !hasResults && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 fade-in">
            <div className="text-5xl">🔍</div>
            <p className="font-semibold text-lg" style={{ color: 'var(--color-text-muted)' }}>
              No results for "{query}"
            </p>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-subtle)' }}>
              Try different keywords or browse the categories above
            </p>
          </div>
        )}

        {hasResults && results && (
          <div className="space-y-10 fade-in">
            {([
              { key: 'movies', label: 'Movies' },
              { key: 'series', label: 'Series' },
              { key: 'anime', label: 'Anime' },
              { key: 'channels', label: 'Live TV' },
            ] as { key: keyof typeof results; label: string }[]).map(({ key, label }) => {
              const items = results[key] as Content[];
              if (!items.length) return null;
              return (
                <div key={key}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{label}</h2>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}
                    >
                      {items.length}
                    </span>
                  </div>
                  <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                    {items.map(item => (
                      <PosterCard key={item.id} content={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
