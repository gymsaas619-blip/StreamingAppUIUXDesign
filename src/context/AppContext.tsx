import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Screen, Content, UserProfile } from '../types';
import { profiles as defaultProfiles } from '../data/mock';

interface AppState {
  screen: Screen;
  params: Record<string, unknown>;
  history: Array<{ screen: Screen; params: Record<string, unknown> }>;
  tvMode: boolean;
  activeProfile: UserProfile | null;
  myList: Content[];
  parentalEnabled: boolean;
  parentalPin: string;
}

interface AppContextValue extends AppState {
  navigate: (screen: Screen, params?: Record<string, unknown>) => void;
  goBack: () => void;
  setTvMode: (v: boolean) => void;
  setActiveProfile: (p: UserProfile) => void;
  toggleMyList: (c: Content) => void;
  isInMyList: (id: string) => boolean;
  setParentalEnabled: (v: boolean) => void;
  setParentalPin: (pin: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: 'splash',
    params: {},
    history: [],
    tvMode: false,
    activeProfile: defaultProfiles[0],
    myList: [],
    parentalEnabled: false,
    parentalPin: '1234',
  });

  const navigate = (screen: Screen, params: Record<string, unknown> = {}) => {
    setState(s => ({
      ...s,
      history: [...s.history, { screen: s.screen, params: s.params }],
      screen,
      params,
    }));
  };

  const goBack = () => {
    setState(s => {
      if (s.history.length === 0) return s;
      const prev = s.history[s.history.length - 1];
      return {
        ...s,
        history: s.history.slice(0, -1),
        screen: prev.screen,
        params: prev.params,
      };
    });
  };

  const setTvMode = (v: boolean) => setState(s => ({ ...s, tvMode: v }));

  const setActiveProfile = (p: UserProfile) =>
    setState(s => ({ ...s, activeProfile: p }));

  const toggleMyList = (c: Content) =>
    setState(s => ({
      ...s,
      myList: s.myList.find(x => x.id === c.id)
        ? s.myList.filter(x => x.id !== c.id)
        : [...s.myList, c],
    }));

  const isInMyList = (id: string) => state.myList.some(x => x.id === id);

  const setParentalEnabled = (v: boolean) =>
    setState(s => ({ ...s, parentalEnabled: v }));

  const setParentalPin = (pin: string) =>
    setState(s => ({ ...s, parentalPin: pin }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        navigate,
        goBack,
        setTvMode,
        setActiveProfile,
        toggleMyList,
        isInMyList,
        setParentalEnabled,
        setParentalPin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
