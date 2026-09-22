import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeftIcon, ShieldIcon, LockIcon, EyeOffIcon } from '../components/Icons';

type PinMode = 'idle' | 'create' | 'confirm' | 'enter' | 'change';

export function ParentalScreen() {
  const { goBack, parentalEnabled, setParentalEnabled, parentalPin, setParentalPin } = useApp();
  const [pinMode, setPinMode] = useState<PinMode>('idle');
  const [pinInput, setPinInput] = useState('');
  const [pinStep1, setPinStep1] = useState('');
  const [error, setError] = useState('');
  const [rating, setRating] = useState('PG-13');

  const RATINGS = ['G', 'PG', 'PG-13', 'R', 'TV-MA'];

  const handleDigit = (d: string) => {
    if (pinInput.length >= 4) return;
    const next = pinInput + d;
    setPinInput(next);
    setError('');

    if (next.length === 4) {
      setTimeout(() => {
        if (pinMode === 'create') {
          setPinStep1(next);
          setPinInput('');
          setPinMode('confirm');
        } else if (pinMode === 'confirm') {
          if (next === pinStep1) {
            setParentalPin(next);
            setParentalEnabled(true);
            setPinMode('idle');
            setPinInput('');
          } else {
            setError('PINs do not match. Try again.');
            setPinInput('');
          }
        } else if (pinMode === 'enter') {
          if (next === parentalPin) {
            setParentalEnabled(false);
            setPinMode('idle');
            setPinInput('');
          } else {
            setError('Incorrect PIN');
            setPinInput('');
          }
        } else if (pinMode === 'change') {
          if (next === parentalPin) {
            setPinMode('create');
            setPinInput('');
          } else {
            setError('Incorrect current PIN');
            setPinInput('');
          }
        }
      }, 120);
    }
  };

  const handleDelete = () => setPinInput(p => p.slice(0, -1));

  const PIN_TITLE: Record<PinMode, string> = {
    idle: '',
    create: 'Create your PIN',
    confirm: 'Confirm your PIN',
    enter: 'Enter your PIN to disable',
    change: 'Enter current PIN',
  };

  if (pinMode !== 'idle') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center px-6" style={{ background: 'var(--color-bg)' }}>
        <button
          onClick={() => { setPinMode('idle'); setPinInput(''); setError(''); }}
          className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
        >
          <ChevronLeftIcon size={18} />
        </button>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary-light)' }}
        >
          <LockIcon size={28} />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>
          {PIN_TITLE[pinMode]}
        </h2>

        {error && (
          <p className="text-sm mb-4 font-medium" style={{ color: 'var(--color-red-live)' }}>{error}</p>
        )}

        {/* PIN dots */}
        <div className="flex gap-4 mb-10 mt-4">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-4 h-4 rounded-full transition-all"
              style={{
                background: i < pinInput.length ? 'var(--color-primary)' : 'var(--color-surface-4)',
                boxShadow: i < pinInput.length ? '0 0 8px rgba(124,108,243,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs w-full">
          {['1','2','3','4','5','6','7','8','9','',  '0','⌫'].map((d, i) => (
            d === '' ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                onClick={() => d === '⌫' ? handleDelete() : handleDigit(d)}
                className="h-16 rounded-2xl text-xl font-semibold transition-all active:scale-95"
                style={{
                  background: d === '⌫' ? 'var(--color-surface-3)' : 'var(--color-surface-2)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {d}
              </button>
            )
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      <div className="px-4 md:px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}>
            <ChevronLeftIcon size={18} />
          </button>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            Parental Controls
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-12 space-y-4">
        {/* Main toggle */}
        <div className="p-5 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: parentalEnabled ? 'var(--color-primary-dim)' : 'var(--color-surface-3)', color: parentalEnabled ? 'var(--color-primary-light)' : 'var(--color-text-subtle)' }}>
                <ShieldIcon size={20} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Parental Controls</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {parentalEnabled ? 'Enabled · PIN protected' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (parentalEnabled) setPinMode('enter');
                else setPinMode('create');
              }}
              className="w-12 h-6 rounded-full relative transition-colors"
              style={{ background: parentalEnabled ? 'var(--color-primary)' : 'var(--color-surface-4)' }}
            >
              <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: parentalEnabled ? '1.625rem' : '0.25rem' }} />
            </button>
          </div>
        </div>

        {parentalEnabled && (
          <>
            {/* Max rating */}
            <div className="p-5 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Maximum Allowed Rating</p>
              <div className="flex gap-2 flex-wrap">
                {RATINGS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRating(r)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: rating === r ? 'var(--color-primary)' : 'var(--color-surface-3)',
                      color: rating === r ? 'white' : 'var(--color-text-muted)',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--color-text-subtle)' }}>
                Content rated above {rating} will be hidden from non-protected profiles.
              </p>
            </div>

            {/* Kids mode */}
            <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Kids Profile Mode</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Restrict to G and PG content</p>
              </div>
              <div className="w-12 h-6 rounded-full" style={{ background: 'var(--color-surface-4)', position: 'relative' }}>
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>

            {/* Hide restricted */}
            <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <EyeOffIcon size={18} style={{ color: 'var(--color-text-muted)' } as React.CSSProperties} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Hide Restricted Content</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Don't show restricted titles at all</p>
                </div>
              </div>
              <div className="w-12 h-6 rounded-full relative transition-colors" style={{ background: 'var(--color-primary)' }}>
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>

            {/* Change PIN */}
            <button
              onClick={() => setPinMode('change')}
              className="w-full p-4 rounded-2xl text-sm font-medium flex items-center gap-3 transition-colors"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              <LockIcon size={16} />
              Change PIN
            </button>
          </>
        )}
      </div>
    </div>
  );
}
