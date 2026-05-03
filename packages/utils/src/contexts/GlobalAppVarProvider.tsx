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
};

const GlobalAppStateContext = createContext<GlobalAppState | undefined>(undefined);

export function GlobalAppVarProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const value = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
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
  return useContext(GlobalAppStateContext);
}