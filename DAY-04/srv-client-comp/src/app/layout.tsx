import React from 'react';
import type { Metadata } from "next";
import ErrorBoundary from '@/components/ErrorBoundary';
import "./globals.css";


export const metadata: Metadata = {
  title: "Demo Componenti",
  description: "Componenti Server/Client + altro ancora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
  );
}
