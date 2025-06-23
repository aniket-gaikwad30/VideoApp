"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-[#181818]/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">VideoApp</Link>
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</Link>
          <Link href="/upload" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Upload</Link>
          {session?.user ? (
            <div className="relative group">
              <button className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition flex items-center gap-2">
                <span className="inline-block w-8 h-8 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold uppercase">
                  {session.user.email?.[0]}
                </span>
                <span className="hidden sm:inline">{session.user.email}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#181818] border border-gray-200 dark:border-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222]">Profile</Link>
                <button onClick={() => signOut()} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#222]">Sign Out</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
} 