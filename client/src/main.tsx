import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@/index.css';

import { googleClientId } from './config';

import { AuthProvider, useAuth } from '@/auth/auth';
import { routeTree } from '@/routeTree.gen';

// Create a client
const queryClient = new QueryClient();

type MyRouterContext = {
  auth: ReturnType<typeof useAuth>;
};

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined as unknown as MyRouterContext['auth'] // Initial placeholder
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
