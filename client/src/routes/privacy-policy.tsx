import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy-policy')({
  component: RouteComponent
});

function RouteComponent() {
  return 'Hello /privacy-policy!';
}
