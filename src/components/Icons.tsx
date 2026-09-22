interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

const Ic = ({ size = 20, children, className = '', strokeWidth = 1.8, style }: IconProps & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    {children}
  </svg>
);

export const HomeIcon = (p: IconProps) => <Ic {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></Ic>;
export const TvIcon = (p: IconProps) => <Ic {...p}><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17,2 12,7 7,2"/></Ic>;
export const FilmIcon = (p: IconProps) => <Ic {...p}><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/></Ic>;
export const SeriesIcon = (p: IconProps) => <Ic {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></Ic>;
export const StarIcon = (p: IconProps) => <Ic {...p}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></Ic>;
export const SearchIcon = (p: IconProps) => <Ic {...p}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></Ic>;
export const UserIcon = (p: IconProps) => <Ic {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></Ic>;
export const PlayIcon = (p: IconProps) => <Ic {...p} strokeWidth={0}><polygon points="5,3 19,12 5,21" fill="currentColor"/></Ic>;
export const PauseIcon = (p: IconProps) => <Ic {...p}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></Ic>;
export const ChevronLeftIcon = (p: IconProps) => <Ic {...p}><polyline points="15,18 9,12 15,6"/></Ic>;
export const ChevronRightIcon = (p: IconProps) => <Ic {...p}><polyline points="9,18 15,12 9,6"/></Ic>;
export const ChevronDownIcon = (p: IconProps) => <Ic {...p}><polyline points="6,9 12,15 18,9"/></Ic>;
export const PlusIcon = (p: IconProps) => <Ic {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Ic>;
export const CheckIcon = (p: IconProps) => <Ic {...p}><polyline points="20,6 9,17 4,12"/></Ic>;
export const XIcon = (p: IconProps) => <Ic {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ic>;
export const InfoIcon = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Ic>;
export const SettingsIcon = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 00-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></Ic>;
export const HeartIcon = (p: IconProps) => <Ic {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></Ic>;
export const BookmarkIcon = (p: IconProps) => <Ic {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></Ic>;
export const VolumeIcon = (p: IconProps) => <Ic {...p}><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></Ic>;
export const VolumeOffIcon = (p: IconProps) => <Ic {...p}><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></Ic>;
export const MaximizeIcon = (p: IconProps) => <Ic {...p}><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></Ic>;
export const MinimizeIcon = (p: IconProps) => <Ic {...p}><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></Ic>;
export const SkipForwardIcon = (p: IconProps) => <Ic {...p}><polygon points="5,4 15,12 5,20"/><line x1="19" y1="5" x2="19" y2="19"/></Ic>;
export const SkipBackIcon = (p: IconProps) => <Ic {...p}><polygon points="19,20 9,12 19,4"/><line x1="5" y1="19" x2="5" y2="5"/></Ic>;
export const SubtitleIcon = (p: IconProps) => <Ic {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/></Ic>;
export const AudioIcon = (p: IconProps) => <Ic {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></Ic>;
export const RefreshIcon = (p: IconProps) => <Ic {...p}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></Ic>;
export const TrashIcon = (p: IconProps) => <Ic {...p}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></Ic>;
export const EditIcon = (p: IconProps) => <Ic {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></Ic>;
export const PlusCircleIcon = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></Ic>;
export const WifiOffIcon = (p: IconProps) => <Ic {...p}><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></Ic>;
export const AlertIcon = (p: IconProps) => <Ic {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Ic>;
export const LockIcon = (p: IconProps) => <Ic {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Ic>;
export const LinkIcon = (p: IconProps) => <Ic {...p}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></Ic>;
export const UploadIcon = (p: IconProps) => <Ic {...p}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></Ic>;
export const MonitorIcon = (p: IconProps) => <Ic {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Ic>;
export const SmartphoneIcon = (p: IconProps) => <Ic {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></Ic>;
export const ForwardIcon = (p: IconProps) => <Ic {...p}><polyline points="13,17 18,12 13,7"/><path d="M6 17l5-5-5-5"/></Ic>;
export const NextIcon = (p: IconProps) => <Ic {...p}><polygon points="5,4 15,12 5,20"/><line x1="19" y1="5" x2="19" y2="19"/></Ic>;
export const GridIcon = (p: IconProps) => <Ic {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Ic>;
export const ListIcon = (p: IconProps) => <Ic {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Ic>;
export const ShieldIcon = (p: IconProps) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Ic>;
export const EyeOffIcon = (p: IconProps) => <Ic {...p}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Ic>;
export const SunIcon = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Ic>;
export const GlobeIcon = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Ic>;
