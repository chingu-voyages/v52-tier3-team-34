import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Building2, CalendarPlus, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/_protect/dashboard/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Link
        to="/dashboard/register-venue"
        className="flex items-center gap-3 p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors group"
      >
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Building2 size={24} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">Register New Venue</h2>
          <p className="text-sm text-gray-500">Add and manage a new venue in the system</p>
        </div>

        <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
      </Link>

      <Link
        to="/dashboard/add-event"
        className="flex items-center gap-3 p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors group mt-4"
      >
        <div className="p-2 rounded-lg bg-green-50 text-green-600">
          <CalendarPlus size={24} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">Add New Event</h2>
          <p className="text-sm text-gray-500">Create and schedule a new event</p>
        </div>

        <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
      </Link>
    </div>
  );
}

export default RouteComponent;
