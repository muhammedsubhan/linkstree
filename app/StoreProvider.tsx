"use client";

import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./lib/store/store";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
