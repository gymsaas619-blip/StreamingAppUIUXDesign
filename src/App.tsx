import { AppProvider, useApp } from './context/AppContext';
import { NavBar, BottomNav, TVSidebar } from './components/NavBar';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { ProfilesScreen } from './screens/ProfilesScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { LiveTVScreen } from './screens/LiveTVScreen';
import { ContentDetailScreen } from './screens/ContentDetailScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { SearchScreen } from './screens/SearchScreen';
import { MyListScreen } from './screens/MyListScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { M3UManagerScreen } from './screens/M3UManagerScreen';
import { ParentalScreen } from './screens/ParentalScreen';

function AppRouter() {
  const { screen, tvMode } = useApp();

  // Fullscreen screens (no nav)
  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'onboarding') return <OnboardingScreen />;
  if (screen === 'profiles') return <ProfilesScreen />;
  if (screen === 'player') return <PlayerScreen />;

  // Main app layout
  return (
    <div className={tvMode ? 'tv-mode' : ''} style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {tvMode ? <TVSidebar /> : <NavBar />}

      <main style={{ paddingLeft: tvMode ? 224 : 0 }}>
        {screen === 'home' && <HomeScreen />}
        {screen === 'movies' && <CatalogScreen type="movies" />}
        {screen === 'series' && <CatalogScreen type="series" />}
        {screen === 'anime' && <CatalogScreen type="anime" />}
        {screen === 'live' && <LiveTVScreen />}
        {screen === 'detail' && <ContentDetailScreen />}
        {screen === 'search' && <SearchScreen />}
        {screen === 'mylist' && <MyListScreen />}
        {screen === 'settings' && <SettingsScreen />}
        {screen === 'm3u' && <M3UManagerScreen />}
        {screen === 'parental' && <ParentalScreen />}
      </main>

      {!tvMode && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
