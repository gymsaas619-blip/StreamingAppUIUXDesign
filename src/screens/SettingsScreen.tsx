import { useApp } from '../context/AppContext';
import {
  UserIcon, ShieldIcon, LinkIcon, PlayIcon, GlobeIcon, SubtitleIcon,
  AudioIcon, SunIcon, MonitorIcon, SmartphoneIcon, AlertIcon, EyeOffIcon
} from '../components/Icons';

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  toggle?: boolean;
  toggled?: boolean;
  onToggle?: (v: boolean) => void;
}

function SettingRow({ icon, label, value, onClick, toggle, toggled, onToggle }: SettingRowProps) {
  return (
    <button
      onClick={toggle ? () => onToggle?.(!toggled) : onClick}
      className="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-colors text-left"
      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--color-surface-4)', color: 'var(--color-primary-light)' }}
      >
        {icon}
      </div>
      <span className="flex-1 font-medium text-sm" style={{ color: 'var(--color-text)' }}>{label}</span>
      {value && <span className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>{value}</span>}
      {toggle && (
        <div
          className="w-11 h-6 rounded-full relative transition-colors"
          style={{ background: toggled ? 'var(--color-primary)' : 'var(--color-surface-4)' }}
        >
          <div
            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
            style={{ left: toggled ? '1.5rem' : '0.25rem' }}
          />
        </div>
      )}
      {!toggle && <span style={{ color: 'var(--color-text-subtle)' }}>›</span>}
    </button>
  );
}

export function SettingsScreen() {
  const { navigate, tvMode, setTvMode, activeProfile } = useApp();

  const SECTIONS = [
    {
      title: 'Account',
      items: [
        { icon: <UserIcon size={16} />, label: 'Profile', value: activeProfile?.name, onClick: () => navigate('profiles') },
        { icon: <ShieldIcon size={16} />, label: 'Parental Controls', onClick: () => navigate('parental') },
      ],
    },
    {
      title: 'Content Sources',
      items: [
        { icon: <LinkIcon size={16} />, label: 'M3U Playlists', value: '4 sources', onClick: () => navigate('m3u') },
      ],
    },
    {
      title: 'Playback',
      items: [
        { icon: <PlayIcon size={16} />, label: 'Autoplay', toggle: true, toggled: true },
        { icon: <PlayIcon size={16} />, label: 'Default Quality', value: '1080p' },
        { icon: <SubtitleIcon size={16} />, label: 'Default Subtitles', value: 'Off' },
        { icon: <AudioIcon size={16} />, label: 'Preferred Audio', value: 'Original' },
      ],
    },
    {
      title: 'Display',
      items: [
        {
          icon: <MonitorIcon size={16} />,
          label: 'Android TV Mode',
          toggle: true,
          toggled: tvMode,
          onToggle: setTvMode,
        },
        { icon: <SunIcon size={16} />, label: 'Theme', value: 'Dark' },
      ],
    },
    {
      title: 'Language & Region',
      items: [
        { icon: <GlobeIcon size={16} />, label: 'Interface Language', value: 'English' },
        { icon: <SubtitleIcon size={16} />, label: 'Subtitle Language', value: 'Auto' },
        { icon: <AudioIcon size={16} />, label: 'Audio Language', value: 'Original' },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: <AlertIcon size={16} />, label: 'About NOVA', value: 'v2.0.0' },
        { icon: <EyeOffIcon size={16} />, label: 'Privacy Policy' },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-24 md:pb-6" style={{ background: 'var(--color-bg)' }}>
      <div className="px-4 md:px-12 pt-8 pb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Settings
        </h1>

        {/* Profile card */}
        <div
          className="mt-6 mb-8 p-5 rounded-2xl flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-dim) 0%, var(--color-surface-2) 100%)', border: '1px solid var(--color-border-strong)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'var(--color-primary-dim)' }}
          >
            {activeProfile?.avatar}
          </div>
          <div className="flex-1">
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{activeProfile?.name}</p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Standard Profile</p>
          </div>
          <button
            onClick={() => navigate('profiles')}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}
          >
            Switch
          </button>
        </div>
      </div>

      <div className="px-4 md:px-12 space-y-8 pb-6">
        {SECTIONS.map(section => (
          <div key={section.title}>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              {section.title}
            </p>
            <div className="space-y-2">
              {section.items.map(item => (
                <SettingRow key={item.label} {...item} icon={item.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
