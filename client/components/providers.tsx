"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";

export default function Providers({ children }: PropsWithChildren) {
  const [qc] = useState(new QueryClient());
  return (
    <QueryClientProvider client={qc}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}
