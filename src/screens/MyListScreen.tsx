import { useApp } from '../context/AppContext';
import { PosterCard } from '../components/ContentCard';
import { BookmarkIcon } from '../components/Icons';
import type { Content } from '../types';

export function MyListScreen() {
  const { myList, navigate } = useApp();

  const movies = myList.filter(c => c.type === 'movie');
  const series = myList.filter(c => c.type === 'series');
  const anime = myList.filter(c => c.type === 'anime');
  const channels = myList.filter(c => c.type === 'channel');

  if (myList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-24" style={{ background: 'var(--color-bg)' }}>
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-subtle)' }}
        >
          <BookmarkIcon size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Your list is empty
        </h2>
        <p className="text-sm text-center mb-8 max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
          Add movies, series, anime, and channels to your list and they'll appear here.
        </p>
        <button
          onClick={() => navigate('home')}
          className="px-8 py-3.5 rounded-xl font-semibold text-sm"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          Browse Content
        </button>
      </div>
    );
  }

  const Section = ({ title, items }: { title: string; items: Content[] }) => {
    if (!items.length) return null;
    return (
      <section className="mb-8">
        <h2 className="text-base font-bold px-4 md:px-12 mb-4" style={{ color: 'var(--color-text)' }}>
          {title} <span className="text-sm font-normal" style={{ color: 'var(--color-text-subtle)' }}>({items.length})</span>
        </h2>
        <div className="px-4 md:px-12 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
          {items.map(item => <PosterCard key={item.id} content={item} />)}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      <div className="px-4 md:px-12 pt-8 pb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          My List
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {myList.length} saved {myList.length === 1 ? 'title' : 'titles'}
        </p>
      </div>

      <Section title="Movies" items={movies} />
      <Section title="Series" items={series} />
      <Section title="Anime" items={anime} />
      <Section title="Channels" items={channels} />
    </div>
  );
}
