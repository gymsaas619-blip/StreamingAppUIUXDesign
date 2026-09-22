import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { channels } from '../data/mock';
import { TVChannelRow } from '../components/ContentCard';
import { SearchIcon, HeartIcon } from '../components/Icons';

const CATEGORIES = ['All', 'News', 'Sports', 'Movies', 'Documentary', 'Kids', 'Music', 'Anime', 'Science'];

export function LiveTVScreen() {
  const { navigate, tvMode } = useApp();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = channels.filter(c => {
    const matchCat = category === 'All' || c.channelCategory === category;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFav = (id: string) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6 flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Preview area */}
      <div
        className="relative mx-4 md:mx-12 mt-8 rounded-2xl overflow-hidden"
        style={{ aspectRatio: tvMode ? '21/9' : '16/9', maxHeight: 420 }}
      >
        <img
          src={activeChannel.hero}
          alt={activeChannel.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,8,12,0.9) 0%, transparent 60%)' }} />

        {/* Live badge */}
        <div
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--color-red-live)', color: 'white' }}
        >
          <div className="w-2 h-2 rounded-full bg-white live-dot" />
          <span className="text-xs font-bold tracking-wider">LIVE</span>
        </div>

        {/* Channel info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <p
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              {activeChannel.title}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{activeChannel.channelCategory}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => toggleFav(activeChannel.id)}
              className="w-11 h-11 rounded-full glass flex items-center justify-center transition-all"
              style={{ color: favorites.includes(activeChannel.id) ? 'var(--color-red-live)' : 'white' }}
            >
              <HeartIcon size={18} />
            </button>
            <button
              onClick={() => navigate('player', { content: activeChannel, isLive: true })}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              ▶ Watch
            </button>
          </div>
        </div>
      </div>

      {/* Channel list */}
      <div className="flex-1 px-4 md:px-12 mt-8">
        {/* Search + category filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' } as React.CSSProperties} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search channels…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: category === cat ? 'var(--color-red-live)' : 'var(--color-surface-3)',
                  color: category === cat ? 'white' : 'var(--color-text-muted)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Favorites section */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-subtle)' }}>
              ❤ Favorites
            </p>
            <div className="space-y-2">
              {channels.filter(c => favorites.includes(c.id)).map(ch => (
                <div key={ch.id} onClick={() => setActiveChannel(ch)}>
                  <TVChannelRow content={ch} isActive={activeChannel.id === ch.id} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All channels */}
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-subtle)' }}>
          All Channels ({filtered.length})
        </p>
        <div className="space-y-2 pb-4">
          {filtered.map(ch => (
            <div key={ch.id} onClick={() => setActiveChannel(ch)}>
              <TVChannelRow content={ch} isActive={activeChannel.id === ch.id} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="text-4xl">📡</div>
              <p style={{ color: 'var(--color-text-muted)' }}>No channels found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
