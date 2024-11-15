import * as React from 'react';
import { Link, Outlet, createRootRoute, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { useAuth, type AuthContext } from '../auth';
import Navbar from '../components/Navbar';

interface MyRouterContext {
  auth: AuthContext;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
