"use client";

import { ApiProvider } from "~/components/providers/api-provider";
import { Toaster } from "~/components/ui/sonner";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import * as React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function ProvidersWithoutTheme({ children }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <ApiProvider>
        {children}
        <Toaster />
        <TailwindIndicator />
      </ApiProvider>
    </ClerkProvider>
  );
}
