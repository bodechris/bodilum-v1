'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

type GlobalAppState = {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  currency: string;
  setCurrency: (value: string) => void;
};

const GlobalAppStateContext = createContext<GlobalAppState | undefined>(undefined);

export function GlobalAppVarProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [currency, setCurrency] = useState('R');

  const value = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      currency,
      setCurrency,
    }),
    [isSignedIn],
  );

  return (
    <GlobalAppStateContext.Provider value={value}>
      {children}
    </GlobalAppStateContext.Provider>
  );
}

export function useGlobalAppStates() {
  const context = useContext(GlobalAppStateContext);

  if (!context) {
    throw new Error('useGlobalAppStates must be used within GlobalAppVarProvider');
  }

  return context;
}