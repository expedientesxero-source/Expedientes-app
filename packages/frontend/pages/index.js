import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-800">
        <h1 className="text-2xl font-bold">🚀 Expedientes SaaS</h1>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <button className="px-4 py-2 bg-white text-blue-600 rounded font-semibold">Dashboard</button>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  setIsLoggedIn(false);
                }}
                className="px-4 py-2 bg-red-500 rounded font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 bg-white text-blue-600 rounded font-semibold">Login</button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 bg-green-500 rounded font-semibold">Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-bold mb-4">AI-Powered Content Creation Platform</h2>
        <p className="text-xl mb-8">Create videos, manage documents, and grow your business with AI</p>
        <div className="space-x-4">
          {!isLoggedIn && (
            <>
              <Link href="/register">
                <button className="px-6 py-3 bg-green-500 rounded-lg text-lg font-bold">Get Started Free</button>
              </Link>
              <Link href="/pricing">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg text-lg font-bold">View Pricing</button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-blue-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">🤖 AI Agent</h3>
          <p>Intelligent automation for your business tasks</p>
        </div>
        <div className="bg-blue-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">🎥 Video Creation</h3>
          <p>Generate videos with AI avatars automatically</p>
        </div>
        <div className="bg-blue-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">💳 Flexible Billing</h3>
          <p>Simple subscription plans that grow with you</p>
        </div>
      </section>
    </div>
  );
}
