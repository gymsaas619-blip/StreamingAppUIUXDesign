import { useApp } from '../context/AppContext';
import { HomeIcon, TvIcon, FilmIcon, SeriesIcon, SearchIcon, UserIcon, SettingsIcon } from './Icons';
import type { Screen } from '../types';

const NAV_ITEMS: { label: string; screen: Screen; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { label: 'Home', screen: 'home', Icon: HomeIcon },
  { label: 'TV', screen: 'live', Icon: TvIcon },
  { label: 'Movies', screen: 'movies', Icon: FilmIcon },
  { label: 'Series', screen: 'series', Icon: SeriesIcon },
  { label: 'Anime', screen: 'anime', Icon: SeriesIcon },
];

export function NavBar() {
  const { screen, navigate, tvMode } = useApp();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${tvMode ? 'hidden' : ''}`}>
      <div
        className="glass border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center h-16 px-6 max-w-screen-2xl mx-auto gap-8">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }}
            >
              N
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              NOVA
            </span>
          </button>

          {/* Main nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(({ label, screen: s, Icon }) => (
              <button
                key={s}
                onClick={() => navigate(s)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: screen === s ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: screen === s ? 'var(--color-surface-3)' : 'transparent',
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => navigate('search')}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: screen === 'search' ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
            >
              <SearchIcon size={18} />
            </button>
            <button
              onClick={() => navigate('settings')}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: screen === 'settings' ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
            >
              <SettingsIcon size={18} />
            </button>
            <button
              onClick={() => navigate('profiles')}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary-light)' }}
            >
              <UserIcon size={17} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function BottomNav() {
  const { screen, navigate } = useApp();
  const BOTTOM_ITEMS: typeof NAV_ITEMS = [
    { label: 'Home', screen: 'home', Icon: HomeIcon },
    { label: 'TV', screen: 'live', Icon: TvIcon },
    { label: 'Search', screen: 'search', Icon: SearchIcon },
    { label: 'My List', screen: 'mylist', Icon: SeriesIcon },
    { label: 'Profile', screen: 'profiles', Icon: UserIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div
        className="glass border-t px-2 pb-safe"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex">
          {BOTTOM_ITEMS.map(({ label, screen: s, Icon }) => (
            <button
              key={s}
              onClick={() => navigate(s)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
              style={{ color: screen === s ? 'var(--color-primary-light)' : 'var(--color-text-subtle)' }}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function TVSidebar() {
  const { screen, navigate } = useApp();
  const TV_ITEMS = [
    { label: 'Home', screen: 'home' as Screen, Icon: HomeIcon },
    { label: 'TV Live', screen: 'live' as Screen, Icon: TvIcon },
    { label: 'Movies', screen: 'movies' as Screen, Icon: FilmIcon },
    { label: 'Series', screen: 'series' as Screen, Icon: SeriesIcon },
    { label: 'Anime', screen: 'anime' as Screen, Icon: SeriesIcon },
    { label: 'Search', screen: 'search' as Screen, Icon: SearchIcon },
    { label: 'Settings', screen: 'settings' as Screen, Icon: SettingsIcon },
  ];

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col py-8 px-4 w-56"
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center gap-3 px-3 mb-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }}
        >
          N
        </div>
        <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>NOVA</span>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        {TV_ITEMS.map(({ label, screen: s, Icon }) => (
          <button
            key={s}
            onClick={() => navigate(s)}
            className="tv-focus-ring flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all text-left"
            style={{
              color: screen === s ? 'var(--color-text)' : 'var(--color-text-muted)',
              background: screen === s
                ? 'linear-gradient(135deg, var(--color-primary-dim), transparent)'
                : 'transparent',
              borderLeft: screen === s ? '3px solid var(--color-primary)' : '3px solid transparent',
            }}
          >
            <Icon size={22} />
            {label}
          </button>
        ))}
      </div>

      <div className="px-3 mt-6">
        <div
          className="rounded-xl p-3 text-sm flex items-center gap-3"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base"
            style={{ background: 'var(--color-primary-dim)' }}
          >
            🎬
          </div>
          <div>
            <div className="font-medium text-xs" style={{ color: 'var(--color-text)' }}>Alex</div>
            <div className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>TV Mode</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
