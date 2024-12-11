import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AuthContextType } from '@/auth/auth';
import Navbar from '@/components/Navbar';

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
});

function RootComponent() {
  return (
    <div className="bg-[#1c1c1c] text-white w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
