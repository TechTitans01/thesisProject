"use client";

import { AuthProvider } from './Authcontex';

export default function AuthContextPage({ children }: { children: React.ReactNode }) {
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
