import { HeroSection } from '../components/HeroSection';
import { Carousel } from '../components/Carousel';
import { movies, series, animeList, channels, continueWatching } from '../data/mock';

export function HomeScreen() {
  const featured = [movies[0], movies[8], series[0], animeList[0]];
  const trending = [...movies, ...series, ...animeList].filter(c => c.isTrending);
  const newContent = [...movies, ...series, ...animeList].filter(c => c.isNew);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <HeroSection items={featured} />

      <div className="py-6 md:py-8">
        <Carousel
          title="Continue Watching"
          items={continueWatching}
          variant="continue"
          badge="Recent"
        />
        <Carousel
          title="Trending on NOVA"
          items={trending}
          variant="poster"
          badge="Hot"
        />
        <Carousel
          title="New Releases"
          items={newContent}
          variant="poster"
          badge="New"
        />
        <Carousel
          title="Live TV"
          items={channels.slice(0, 8)}
          variant="channel"
        />
        <Carousel
          title="Top Movies"
          items={movies}
          variant="poster"
        />
        <Carousel
          title="Series to Watch"
          items={series}
          variant="landscape"
        />
        <Carousel
          title="Anime"
          items={animeList}
          variant="poster"
        />
      </div>
    </div>
  );
}
