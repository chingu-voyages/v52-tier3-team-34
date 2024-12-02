import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import Dashboard from '@/pages/Dashboard';

export const Route = createFileRoute('/_protect/dashboard/')({
  component: RouteComponent
});

function RouteComponent() {
  return <Dashboard />;
}

export default RouteComponent;
