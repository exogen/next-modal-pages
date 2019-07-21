import React, { useMemo } from "react";

const Context = React.createContext({ thisLevel: 0, topLevel: 0 });

export default function StackInfoProvider({ children, thisLevel, topLevel }) {
  const value = useMemo(
    () => {
      return { thisLevel, topLevel };
    },
    [thisLevel, topLevel]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

StackInfoProvider.Context = Context;
