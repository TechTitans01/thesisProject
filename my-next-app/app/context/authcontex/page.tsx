"use client";

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './Authcontex';

export default function AuthContextPage({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
