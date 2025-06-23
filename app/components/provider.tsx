"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";

const urlEndPoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
        <ImageKitProvider urlEndpoint={urlEndPoint}>
          <SessionProvider refetchInterval={5*60}>{children}</SessionProvider>
        </ImageKitProvider>
    </div>
  );
}