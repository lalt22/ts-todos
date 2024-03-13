import React, { createContext, useState } from 'react';

export interface RefreshCtx {
  refresh: number;
  setRefresh: (newRefresh: number) => any;
}

export const RefreshContext = createContext<RefreshCtx>({
  refresh: 0,
  setRefresh: () => true,
});

const RefreshContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refresh, setRefresh] = useState(0);

  const refreshCtx: RefreshCtx = {
    refresh,
    setRefresh,
  };

  return (
    <RefreshContext.Provider value={refreshCtx}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContextProvider;
