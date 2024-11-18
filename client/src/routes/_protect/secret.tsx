import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/_protect/secret')({
  component: RouteComponent
});

function RouteComponent() {
  const auth = useAuth();
  return (
    <section className="grid gap-2 p-2">
      <p>Hi {auth.user}!</p>
      <p>
        This is a <span className="bg-red-600 text-white px-1">SECRET</span> dashboard
      </p>
      <p className="max-w-lg">
        <span className="font-semibold">Fun fact</span> : NASA once bought “supercomputer” parts from eBay to keep the
        space shuttle program running! By 2002, the space shuttle computers were considered ancient tech (from the
        1980s), and since new parts weren't being manufactured anymore, NASA had to get creative. Engineers tracked down
        old computer parts on eBay to maintain the aging shuttle systems, including items like 8-inch floppy disks!
      </p>
    </section>
  );
}
