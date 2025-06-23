"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.replace("/login");
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-[#181818] rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Profile</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-3xl font-bold uppercase">
          {session.user.email?.[0]}
        </div>
        <div className="text-lg font-semibold">{session.user.email}</div>
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 