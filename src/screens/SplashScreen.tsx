import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding'), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-5 fade-in">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-black"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              boxShadow: '0 0 60px rgba(124,108,243,0.45)',
            }}
          >
            N
          </div>
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              boxShadow: '0 0 0 2px rgba(124,108,243,0.3)',
              animation: 'ping 2s ease-out infinite',
            }}
          />
        </div>

        <div className="text-center">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            NOVA
          </h1>
          <p className="text-sm mt-1 tracking-widest font-medium" style={{ color: 'var(--color-text-subtle)' }}>
            STREAM · DISCOVER · ENJOY
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--color-primary)',
                animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <p
        className="absolute bottom-8 text-xs tracking-widest"
        style={{ color: 'var(--color-text-subtle)' }}
      >
        NOVA STREAMING · v2.0.0
      </p>
    </div>
  );
}
