import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRightIcon, TvIcon, FilmIcon, PlayIcon } from '../components/Icons';

const STEPS = [
  {
    icon: <FilmIcon size={56} />,
    color: '#7C6CF3',
    title: 'Add Your Content Sources',
    description:
      'Connect your IPTV provider by adding M3U playlists or loading a local file. Nova organizes everything automatically — movies, series, anime, and live channels.',
    hint: 'Settings → Sources → Add List',
  },
  {
    icon: <TvIcon size={56} />,
    color: '#2DD4BF',
    title: 'Organize Your Library',
    description:
      'Nova automatically categorizes your content into Movies, Series, Anime, and Live TV. Build your personal watchlist and pick up exactly where you left off.',
    hint: 'My List · Continue Watching · History',
  },
  {
    icon: <PlayIcon size={56} />,
    color: '#D4A853',
    title: 'Watch on Any Screen',
    description:
      'Stream on your phone, tablet, or TV. Nova adapts its interface to every screen size, and supports D-Pad navigation for Android TV and Google TV.',
    hint: 'Mobile · Tablet · Android TV · Google TV',
  },
];

export function OnboardingScreen() {
  const { navigate } = useApp();
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else navigate('profiles');
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Skip */}
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate('profiles')}
          className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface-2)' }}
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 text-center max-w-lg mx-auto w-full">
        {/* Illustration */}
        <div
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-10 fade-in"
          key={step}
          style={{
            background: `radial-gradient(circle at center, ${current.color}20, ${current.color}08)`,
            border: `2px solid ${current.color}30`,
            color: current.color,
          }}
        >
          {current.icon}
        </div>

        <h2
          className="text-3xl font-bold mb-4 fade-in"
          key={`t${step}`}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          {current.title}
        </h2>

        <p
          className="text-base leading-relaxed mb-6 fade-in"
          key={`d${step}`}
          style={{ color: 'var(--color-text-muted)' }}
        >
          {current.description}
        </p>

        <div
          className="text-xs font-medium px-4 py-2 rounded-full mb-10"
          style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-subtle)' }}
        >
          {current.hint}
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="rounded-full transition-all"
              style={{
                width: i === step ? 28 : 8,
                height: 8,
                background: i === step ? 'var(--color-primary)' : 'var(--color-surface-4)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={next}
          className="flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-base w-full justify-center transition-all hover:brightness-110"
          style={{ background: 'var(--color-primary)', color: 'white', boxShadow: '0 4px 20px rgba(124,108,243,0.35)' }}
        >
          {step < STEPS.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
