export type ContentType = 'movie' | 'series' | 'anime' | 'channel';
export type Screen =
  | 'splash'
  | 'onboarding'
  | 'profiles'
  | 'home'
  | 'movies'
  | 'series'
  | 'anime'
  | 'live'
  | 'detail'
  | 'player'
  | 'search'
  | 'mylist'
  | 'settings'
  | 'm3u'
  | 'parental';

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  progress?: number; // 0-100
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  year: number;
  duration?: string;
  rating?: string;
  genres: string[];
  score: number;
  description: string;
  director?: string;
  cast?: string[];
  poster: string;
  hero: string;
  seasons?: Season[];
  episodeCount?: number;
  status?: string; // for anime: 'Ongoing' | 'Completed'
  progress?: number; // continue watching: 0-100
  progressLabel?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  channelCategory?: string;
  logo?: string;
}

export interface M3USource {
  id: string;
  name: string;
  url: string;
  lastUpdated: string;
  status: 'active' | 'error' | 'updating' | 'disabled';
  itemCount: number;
  enabled: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isKids: boolean;
  pin?: string;
}

export interface NavRoute {
  screen: Screen;
  params?: Record<string, unknown>;
}
