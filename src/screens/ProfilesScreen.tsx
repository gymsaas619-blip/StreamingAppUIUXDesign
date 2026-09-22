import { useApp } from '../context/AppContext';
import { PlusIcon, EditIcon } from '../components/Icons';
import { profiles } from '../data/mock';

export function ProfilesScreen() {
  const { setActiveProfile, navigate } = useApp();

  const handleSelect = (profile: typeof profiles[0]) => {
    setActiveProfile(profile);
    navigate('home');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Nova logo */}
      <div className="flex items-center gap-3 mb-12">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }}
        >
          N
        </div>
        <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          NOVA
        </span>
      </div>

      <h1
        className="text-2xl md:text-3xl font-semibold mb-2 text-center"
        style={{ color: 'var(--color-text)' }}
      >
        Who's watching?
      </h1>
      <p className="text-sm mb-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
        Select your profile to continue
      </p>

      {/* Profile grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-2xl">
        {profiles.map(profile => (
          <button
            key={profile.id}
            onClick={() => handleSelect(profile)}
            className="flex flex-col items-center gap-3 group"
          >
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-4xl md:text-5xl transition-all group-hover:scale-110 group-hover:brightness-110"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${profile.color}30, ${profile.color}10)`,
                border: `2px solid ${profile.color}30`,
                boxShadow: `0 4px 20px ${profile.color}15`,
              }}
            >
              {profile.avatar}
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{profile.name}</p>
              {profile.isKids && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}
                >
                  KIDS
                </span>
              )}
            </div>
          </button>
        ))}

        {/* Add profile */}
        <button
          onClick={() => navigate('settings')}
          className="flex flex-col items-center gap-3 group"
        >
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
            style={{
              background: 'var(--color-surface-2)',
              border: '2px dashed var(--color-border-strong)',
              color: 'var(--color-text-subtle)',
            }}
          >
            <PlusIcon size={28} />
          </div>
          <p className="font-semibold text-sm" style={{ color: 'var(--color-text-muted)' }}>Add Profile</p>
        </button>
      </div>

      {/* Manage link */}
      <button
        onClick={() => navigate('settings')}
        className="flex items-center gap-2 mt-12 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        style={{
          border: '1px solid var(--color-border-strong)',
          color: 'var(--color-text-muted)',
        }}
      >
        <EditIcon size={15} />
        Manage Profiles
      </button>
    </div>
  );
}
