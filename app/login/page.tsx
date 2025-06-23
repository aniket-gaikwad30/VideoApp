"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    // This is a placeholder for the login page component
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                return;
            }
            router.push('/');
        } catch {
            // Handle login failure
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-background">
            <div className="w-full max-w-md bg-white dark:bg-[#181818] rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaEnvelope /></span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#222] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#222] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <span className="mx-3 text-gray-400 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>
                <button
                    onClick={() => signIn('google')}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded hover:bg-gray-50 dark:hover:bg-[#333] transition font-semibold"
                >
                    <FaGoogle /> Sign in with Google
                </button>
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
