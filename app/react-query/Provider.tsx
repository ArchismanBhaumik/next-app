"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import useLoadUser from "@/app/hooks/useLoadUser";

const LoadUserBootstrap = () => {
  useLoadUser();
  return null;
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <LoadUserBootstrap />
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Provider>
  );
};
