import React from 'react';
import { Headphones, MapPin, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useHealth } from '@/hooks/useHealth';

export default function Home() {
  const { data, isPending, isError } = useHealth();

  console.log(data?.status);

  return (
    <div className="min-h-screen bg-gradient-to-r text-white from-slate-900 to-slate-700 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full rounded-sm border-b-[1px] p-8 transform hover:scale-105 transition-transform duration-300">
        {/* Server Status Indicator */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-6 h-6 rounded-full animate-pulse 
              ${isPending ? 'bg-yellow-500' : data?.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="ml-2 text-sm text-gray-200">
            {isPending
              ? 'Checking Server...'
              : data?.status === 'up'
                ? "Server is Rockin'"
                : 'Server Took a Lunch Break'}
          </span>
        </div>

        <h1 className="text-4xl font-black text-slate-100 mb-4">🎸 LiveScape 🎤</h1>

        <p className="text-gray-100 mb-8 italic">"Find your next eargasm before your ears get bored!"</p>

        <div className="space-y-4">
          <Link
            to="/map"
            search={{ lat: 41.390205, lng: 2.154007, radius: 20 }}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors group"
          >
            <MapPin className="mr-2 group-hover:rotate-12 transition-transform" />
            Explore Live Music Map
          </Link>

          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors group"
          >
            <Plus className="mr-2 group-hover:rotate-45 transition-transform" />
            Add Your Venue's Event
          </Link>
        </div>

        <div className="mt-8 text-xs text-gray-200 flex items-center justify-center">
          <Headphones size={16} className="mr-2 text-purple-500" />
          Connecting people to the heartbeat of live music. Anytime! Anywhere!
        </div>
      </div>
    </div>
  );
}
