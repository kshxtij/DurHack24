"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import dynamic from "next/dynamic";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: persister }}
      >
        <UserProvider>{children}</UserProvider>
      </PersistQueryClientProvider>
    </QueryClientProvider>
  );
}

const Provider = dynamic(() => Promise.resolve(Providers), {
  ssr: false,
});

export default Provider;
