import * as React from 'react';
import { Outlet, createFileRoute, redirect, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/_protect')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: AuthLayout
});

function AuthLayout() {
  return <Outlet />;
}
