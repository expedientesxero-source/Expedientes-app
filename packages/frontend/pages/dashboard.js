import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const userRes = await axios.get('http://localhost:3001/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <Link href="#">
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">📊 Overview</button>
            </Link>
            <Link href="/ai-agent">
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">🤖 AI Agent</button>
            </Link>
            <Link href="/videos">
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">🎥 Videos</button>
            </Link>
            <Link href="/subscription">
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">💳 Subscription</button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome, {user.name}!</h1>

          {/* User Info Card */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company || 'Not set'}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/ai-agent">
              <button className="p-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">🤖 Create with AI</button>
            </Link>
            <Link href="/pricing">
              <button className="p-6 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">💳 Upgrade Plan</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
