import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

function HomeComponent() {
  return (
    <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
      <h3 className="text-2xl font-bold">Home page</h3>
      <p>This page is under development</p>
    </div>
  );
}
