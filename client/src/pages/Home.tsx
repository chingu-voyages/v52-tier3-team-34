import React from 'react';
import { Headphones, MapPin, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useHealth } from '@/hooks/useHealth';
import logoWithText from '@/assets/Logo-with-text.svg';

export default function Home() {
  const { data, isPending, isError } = useHealth();

  return (
    <div className="min-h-screen flex flex-col items-start justify-center p-6 ">
      {/* Server Status Indicator */}
      <div className="flex justify-center items-center mb-6">
        <div
          className={`w-4 h-4 rounded-full animate-pulse 
              ${isPending ? 'bg-yellow-500' : data?.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
        />
        <span className="ml-3 text-lg font-semibold text-gray-300">
          {isPending ? 'Checking Server...' : data?.status === 'up' ? "Server is Rockin'" : 'Server Took a Lunch Break'}
        </span>
      </div>

      <p className="text-gray-200 mb-10 italic text-lg">"Find your next eargasm before your ears get bored!"</p>

      <div className="space-y-6">
        <div className="space-y-4 w-full">
          <Link
            to="/map"
            search={{ lat: 41.390205, lng: 2.154007, radius: 20 }}
            className="relative w-full block group"
          >
            {/* Background div with blur and color shift effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-75 group-hover:opacity-100 transition-all duration-300 blur-sm group-hover:blur-lg"></div>

            <div className="relative flex items-center justify-center bg-gray-900 text-white py-4 rounded-lg hover:bg-transparent transition-colors duration-300 ease-in-out">
              <MapPin className="mr-3 transition-transform group-hover:rotate-12 group-hover:text-pink-400" size={24} />
              <span className="font-semibold tracking-wider group-hover:text-pink-300 transition-colors">
                Explore Live Music Map
              </span>
            </div>
          </Link>

          <Link to="/dashboard" className="relative w-full block group">
            {/* Background div with blur and color shift effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl opacity-75 group-hover:opacity-100 transition-all duration-300 blur-sm group-hover:blur-lg"></div>

            <div className="relative px-6 flex items-center justify-center bg-gray-900 text-white py-4 rounded-lg hover:bg-transparent transition-colors duration-300 ease-in-out">
              <Plus
                className="mr-3 transition-transform group-hover:rotate-45 group-hover:text-emerald-400"
                size={24}
              />
              <span className="font-semibold tracking-wider group-hover:text-emerald-300 transition-colors ">
                Add Your Venue's Event
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-300 flex items-center justify-center">
        <Headphones size={18} className="mr-2 text-purple-400" />
        Connecting people to the heartbeat of live music. Anytime! Anywhere!
      </div>
    </div>
  );
}
